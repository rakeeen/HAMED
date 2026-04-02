import React from 'react';
import { useSiteContext } from '../../context/SiteContext';
import { useLang } from '../../context/LangContext';
import { MascotFace } from '../ui/MascotFace';

export const Footer = () => {
  const { siteConfig } = useSiteContext();
  const { t } = useLang();

  return (
    <footer style={{
      borderTop: '1.5px dashed var(--tape)',
      padding: '3rem 1.5rem',
      textAlign: 'center',
      marginTop: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      alignItems: 'center'
    }}>
      {/* Socials mapped from Dashboard */}
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {siteConfig.socials && Object.entries(siteConfig.socials).map(([key, url]) => (
            url ? (
                <a key={key} href={url as string} target="_blank" rel="noreferrer" style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--ink)", textDecoration: "none", borderBottom: '1px solid var(--sepia)', textTransform: "capitalize", padding: "0.2rem 0.6rem" }}>
                    {key}
                </a>
            ) : null
        ))}
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
         <MascotFace size={24} color="var(--ink)" />
         <p style={{ fontFamily: "var(--font-sketch)", fontSize: "1.1rem", color: "var(--ink-faded)" }}>
            {t('madeBy')}
         </p>
      </div>
    </footer>
  );
};
