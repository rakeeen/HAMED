import React, { useRef, useState } from 'react';
import { Button } from '../components/ui/Button';
import { Send, Mail, Linkedin, Twitter, Palette, ArrowUpRight } from 'lucide-react';
import { useSiteContext } from '../context/SiteContext';
import { useScrollReveal } from '../hooks/useScrollReveal';


export const Contact = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { siteConfig } = useSiteContext();
  const [submitted, setSubmitted] = useState(false);
  
  useScrollReveal(containerRef);

  React.useEffect(() => {
    document.title = "Contact | Hamed Walid";
  }, []);

            <form action={`https://formsubmit.co/${siteConfig.email}`} method="POST" className="space-y-8">
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value="https://rakeeen.github.io/HAMED/#/contact" />
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
                  className="bg-white text-on-primary px-10 py-4 rounded-full font-bold hover:bg-neutral-200 transition-all flex items-center gap-3 active:scale-95 disabled:opacity-50"
                >
                  <Send size={18} />
                  Send Message
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
