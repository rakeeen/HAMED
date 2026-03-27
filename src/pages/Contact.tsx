import React, { useRef, useState } from 'react';
import { Button } from '../components/ui/Button';
import { Send, Mail, Linkedin, Twitter, Palette, ArrowUpRight } from 'lucide-react';
import { useSiteContext } from '../context/SiteContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, doc, updateDoc, increment, getDoc, setDoc } from 'firebase/firestore';

export const Contact = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { siteConfig } = useSiteContext();
  const [submitted, setSubmitted] = useState(false);
  
  useScrollReveal(containerRef);

  React.useEffect(() => {
    document.title = "Contact | Hamed Walid";
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    };
    
    if (data.name && data.email && data.message) {
      try {
        await addDoc(collection(db, 'inquiries'), {
          ...data,
          createdAt: serverTimestamp(),
          read: false
        });

        const ref = doc(db, 'analytics', 'main');
        const snap = await getDoc(ref);
        if (snap.exists()) {
           await updateDoc(ref, { inquiries: increment(1) });
        } else {
           await setDoc(ref, { visitors: 1, inquiries: 1 });
        }

        setSubmitted(true);
        e.currentTarget.reset();
        setTimeout(() => setSubmitted(false), 5000);
      } catch (error) {
        console.error("Error submitting form", error);
        alert("Failed to send message. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto" ref={containerRef}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
        {/* Headline Section */}
        <div className="gsap-reveal lg:col-span-12 mb-8">
          <span className="font-label text-secondary uppercase tracking-widest text-xs mb-4 block">Get in touch</span>
          <h1 className="font-sans text-5xl md:text-7xl font-extrabold tracking-tighter text-white">
            Let's build<br />something great.
          </h1>
        </div>

        {/* Contact Form Section */}
        <div className="gsap-reveal lg:col-span-7">
          <div className="gsap-reveal bg-surface-container rounded-3xl p-8 md:p-12 border border-white/5">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="font-label text-[10px] uppercase tracking-[0.2em] text-secondary">Full Name</label>
                <input 
                  name="name"
                  required
                  className="w-full bg-transparent border-0 border-b border-outline-variant/30 py-4 focus:ring-0 focus:border-primary transition-colors placeholder:text-surface-variant text-white outline-none" 
                  placeholder="John Doe" 
                  type="text"
                />
              </div>
              <div className="space-y-2">
                <label className="font-label text-[10px] uppercase tracking-[0.2em] text-secondary">Email Address</label>
                <input 
                  name="email"
                  required
                  className="w-full bg-transparent border-0 border-b border-outline-variant/30 py-4 focus:ring-0 focus:border-primary transition-colors placeholder:text-surface-variant text-white outline-none" 
                  placeholder="hello@example.com" 
                  type="email"
                />
              </div>
              <div className="space-y-2">
                <label className="font-label text-[10px] uppercase tracking-[0.2em] text-secondary">Message</label>
                <textarea 
                  name="message"
                  required
                  className="w-full bg-transparent border-0 border-b border-outline-variant/30 py-4 focus:ring-0 focus:border-primary transition-colors placeholder:text-surface-variant text-white resize-none outline-none" 
                  placeholder="Tell us about the project architecture..." 
                  rows={4}
                />
              </div>

              <div className="flex items-center gap-6 pt-4">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-white text-on-primary px-10 py-4 rounded-full font-bold hover:bg-neutral-200 transition-all flex items-center gap-3 active:scale-95 disabled:opacity-50"
                >
                  <Send size={18} />
                  {isSubmitting ? 'Sending...' : submitted ? 'Message Sent!' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Sidebar / Social Links */}
        <div className="gsap-reveal lg:col-span-5 space-y-16 lg:pl-12">
          <div>
            <h3 className="font-sans text-xl font-bold text-white mb-8">Connections</h3>
            <div className="grid grid-cols-1 gap-4">
              {[
                { name: 'X (Twitter)', label: 'Follow on', icon: <Twitter size={24} />, url: siteConfig.socials?.x || '#' },
                { name: 'Behance', label: 'View Works', icon: <Palette size={24} />, url: siteConfig.socials?.behance || '#' },
                { name: 'LinkedIn', label: 'Network on', icon: <Linkedin size={24} />, url: siteConfig.socials?.linkedin || '#' },
              ].map((social) => (
                <a 
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  className="group flex items-center justify-between p-6 bg-surface-container rounded-lg border border-white/5 hover:bg-surface-container-high transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-6">
                    <div className="text-secondary group-hover:text-white transition-colors">
                      {social.icon}
                    </div>
                    <div>
                      <p className="font-label text-[10px] uppercase tracking-widest text-secondary">{social.label}</p>
                      <p className="font-sans font-bold text-white">{social.name}</p>
                    </div>
                  </div>
                  <ArrowUpRight className="text-secondary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" size={20} />
                </a>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-outline-variant/10">
            <p className="font-label text-[10px] uppercase tracking-widest text-secondary mb-4">Contact Info</p>
            <div className="space-y-2 font-sans font-medium text-white mb-8">
              <p>{siteConfig.email}</p>
              <p>+20 111 204 6671</p>
            </div>
            
            <p className="font-label text-[10px] uppercase tracking-widest text-secondary mb-4">Location</p>
            <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-surface-container-lowest">
              <img 
                src={siteConfig.siteImages?.contactBackground || '/old_road.png'} 
                alt="Old vintage road" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="font-label text-[10px] text-white uppercase">{siteConfig.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
