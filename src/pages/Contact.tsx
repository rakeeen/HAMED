import React, { useState } from 'react';
import { useSiteContext } from '../context/SiteContext';
import { useLang } from '../context/LangContext';
import { MascotFace } from '../components/ui/MascotFace';
import { SketchyButton } from '../components/ui/SketchyButton';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, doc, updateDoc, increment, getDoc, setDoc } from 'firebase/firestore';

export const Contact = () => {
  const { siteConfig } = useSiteContext();
  const { t, resolveField } = useLang();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    document.title = `${t('contact')} | ${resolveField(siteConfig.name)}`;
  }, [t, resolveField, siteConfig.name]);

  const handleSend = async () => {
    if (formData.name && formData.email && formData.message) { 
        setIsSubmitting(true);
        try {
            await addDoc(collection(db, 'inquiries'), {
              ...formData,
              createdAt: serverTimestamp(),
              read: false
            });
    
            try {
              const ref = doc(db, 'analytics', 'main');
              const snap = await getDoc(ref);
              if (snap.exists()) {
                 await updateDoc(ref, { inquiries: increment(1) });
              } else {
                 await setDoc(ref, { visitors: 1, inquiries: 1 });
              }
            } catch (e) {
              console.warn("Analytics tracking bypassed due to security rules.", e);
            }
    
            setSent(true);
          } catch (error: any) {
             console.error("Error submitting form", error);
             alert(t('error_sending'));
          } finally {
             setIsSubmitting(false);
          }
    } else {
        alert(t('fill_fields'));
    }
  };

  return (
    <div className="page-container fade-in">
      <section style={{ padding: "3rem 0 5rem", maxWidth: 700, margin: "0 auto" }}>
        <h1 style={{ fontFamily: "var(--font-sketch)", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, marginBottom: "0.5rem" }}>{t('sendLetter')}</h1>
        <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", color: "var(--ink-faded)", marginBottom: "3rem" }}>{t('oldSchool')}</p>

        {/* Postcard */}
        <div style={{ background: "var(--cream)", border: "1.5px solid var(--ink-light)", borderRadius: "8px 30px 8px 30px", padding: "2.5rem 2rem", position: "relative", boxShadow: "6px 8px 0 rgba(42,32,24,0.1)" }}>
          <div style={{ borderBottom: "1px dashed var(--ink-light)", paddingBottom: "1.5rem", marginBottom: "1.5rem" }}>
            <p style={{ fontFamily: "var(--font-sketch)", fontSize: "1rem", color: "var(--ink-light)", marginBottom: "0.3rem" }}>{t('to')} {resolveField(siteConfig.name)}</p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--ink-light)" }}>{siteConfig.email}</p>
          </div>

          {!sent ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              <div>
                <label style={{ fontFamily: "var(--font-sketch)", fontSize: "0.9rem", color: "var(--ink-light)", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: "0.3rem" }}>{t('yourName')}</label>
                <input className="input-line" placeholder={t('ph_name')} value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} disabled={isSubmitting} />
              </div>
              <div>
                <label style={{ fontFamily: "var(--font-sketch)", fontSize: "0.9rem", color: "var(--ink-light)", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: "0.3rem" }}>{t('yourEmail')}</label>
                <input className="input-line" type="email" placeholder={t('ph_email')} value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} disabled={isSubmitting} />
              </div>
              <div>
                <label style={{ fontFamily: "var(--font-sketch)", fontSize: "0.9rem", color: "var(--ink-light)", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: "0.3rem" }}>{t('yourMessage')}</label>
                <textarea className="input-line" placeholder={t('ph_message')} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} disabled={isSubmitting} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "2rem", marginTop: "1rem" }}>
                <button className="wax-btn" onClick={handleSend} disabled={isSubmitting} style={{ opacity: isSubmitting ? 0.7 : 1 }}>{isSubmitting ? '...' : <span dangerouslySetInnerHTML={{__html: t('send_it')}}/>}</button>
                <div>
                  <p style={{ fontFamily: "var(--font-sketch)", fontSize: "1rem", color: "var(--ink-faded)" }}>{t('pressWax')}</p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", fontStyle: "italic", color: "var(--ink-light)" }}>{t('iRespond')}</p>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "2rem 0" }}>
              <div style={{ display: 'flex', justifyContent: 'center' }}><MascotFace size={80} color="var(--forest)" /></div>
              <h3 style={{ fontFamily: "var(--font-sketch)", fontSize: "2rem", color: "var(--forest)", marginTop: "1rem" }}>{t('letterSent')}</h3>
              <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", color: "var(--ink-faded)" }}>{t('illGetBack', { name: formData.name })}</p>
              <SketchyButton style={{ marginTop: '2rem' }} onClick={() => { setSent(false); setFormData({name: '', email: '', message: ''}); }}>{t('sendAnother')}</SketchyButton>
            </div>
          )}
        </div>

        <hr className="sketch-divider" />
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", marginTop: "1rem" }}>
          {[
            ["Behance", siteConfig.socials.behance.replace('https://www.', '') || 'behance.net', siteConfig.socials.behance], 
            ["LinkedIn", siteConfig.socials.linkedin.replace('https://www.', '') || 'linkedin.com', siteConfig.socials.linkedin],
            ["Twitter / X", siteConfig.socials.x.replace('https://', '') || 'x.com', siteConfig.socials.x]
          ].map(([label, handle, url]) => (
            <div key={label as string}>
              <p style={{ fontFamily: "var(--font-sketch)", fontSize: "0.9rem", color: "var(--ink-light)", textTransform: "uppercase" }}>{label}</p>
              <a href={url as string} target="_blank" rel="noreferrer" style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--sepia)", textDecoration: 'none' }}>{handle}</a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
