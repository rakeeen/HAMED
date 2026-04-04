import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { Contact } from './pages/Contact';
import { ProjectDetail } from './pages/ProjectDetail';
import { About } from './pages/About';
import { CustomCursor } from './components/ui/CustomCursor';
import { SiteProvider, useSiteContext } from './context/SiteContext';
import { LangProvider } from './context/LangContext';
import { db } from './firebase';
import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { settings } = useSiteContext();

  useEffect(() => {
    const trackVisit = async () => {
      // 1. Total Sessions (Increments every time the browser is opened)
      if (!sessionStorage.getItem('hamed_session_tracked')) {
        sessionStorage.setItem('hamed_session_tracked', 'true');
        try {
          const ref = doc(db, 'analytics', 'main');
          await updateDoc(ref, { totalVisits: increment(1) });
        } catch (e) {
          // If doc doesn't exist, initialize it
          try {
            await setDoc(doc(db, 'analytics', 'main'), { totalVisits: 1, uniqueVisitors: 1, inquiries: 0 });
          } catch (err) { console.error("Init stats error", err); }
        }
      }

      // 2. Unique Visitors (Increments ONLY ONCE per device/browser ever)
      if (!localStorage.getItem('hamed_unique_id')) {
        localStorage.setItem('hamed_unique_id', `unique_${Date.now()}`);
        try {
          const ref = doc(db, 'analytics', 'main');
          await updateDoc(ref, { uniqueVisitors: increment(1) });
        } catch (e) {
          // Handled by init above
        }
      }
    };
    trackVisit();
  }, []);

  return (
    <div className="paper-texture" style={{ display: 'flex', flexDirection: 'column' }}>
      {settings?.showCursor !== false && <CustomCursor />}
      <Navbar />
      <main style={{ flexGrow: 1, paddingTop: '2rem' }}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <LangProvider>
      <SiteProvider>
        <Router>
          <ScrollToTop />
          <MainLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/project/:id" element={<ProjectDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </MainLayout>
        </Router>
      </SiteProvider>
    </LangProvider>
  );
}
