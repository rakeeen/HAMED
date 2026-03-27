import React, { useRef, useState } from 'react';
import { Button } from '../components/ui/Button';
import { Send, Mail, Linkedin, Twitter, Palette, ArrowUpRight } from 'lucide-react';
import { useSiteContext } from '../context/SiteContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, doc, updateDoc, increment, getDoc, setDoc } from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';

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
      } catch (error: any) {
        console.error("Error submitting form", error);
        setErrorModal(error.message || "Failed to send message. Please try again.");
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
                  {isSubmitting ? 'Sending...' : 'Send Message'}
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

      <AnimatePresence>
        {submitted && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-surface-container border border-white/10 p-10 md:p-16 rounded-[2.5rem] max-w-lg w-full text-center shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8 text-primary shadow-[0_0_30px_rgba(255,255,255,0.1)] border border-primary/30">
                <Send size={32} />
              </div>
              <h3 className="font-sans text-3xl font-bold text-white mb-4">Message Sent</h3>
              <p className="text-secondary text-lg leading-relaxed font-sans mb-10">
                Thank you for reaching out. We have received your inquiry and will get back to you shortly.
              </p>
              <button 
                 onClick={() => setSubmitted(false)}
                 className="bg-white text-black font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-full hover:bg-neutral-200 transition-all w-full active:scale-95"
              >
                Close & Return
              </button>
            </motion.div>
          </motion.div>
        )}

        {errorModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-surface-container border border-red-500/20 p-10 md:p-16 rounded-[2.5rem] max-w-lg w-full text-center shadow-2xl"
            >
              <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-8 text-red-500 shadow-[0_0_30px_rgba(239,68,68,0.2)] border border-red-500/30">
                <span className="text-3xl font-black">!</span>
              </div>
              <h3 className="font-sans text-2xl font-bold text-red-400 mb-4">Delivery Failed</h3>
              <p className="text-red-200/70 text-sm leading-relaxed font-sans mb-10 font-mono whitespace-pre-wrap">
                {errorModal}
              </p>
              <button 
                 onClick={() => setErrorModal(null)}
                 className="bg-red-500/20 text-red-400 border border-red-500/30 font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-full hover:bg-red-500/30 transition-all w-full active:scale-95"
              >
                Dismiss Error
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
