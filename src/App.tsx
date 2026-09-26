import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { BottomNavDock } from './components/common/BottomNavDock';
import { Footer } from './components/common/Footer';
import { EnquiryCartDrawer } from './components/cart/EnquiryCartDrawer';
import { Toast } from './components/common/Toast';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { EquipmentPage } from './pages/EquipmentPage';
import { ManpowerPage } from './pages/ManpowerPage';
import { ServicesPage } from './pages/ServicesPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { AdminHeader } from './components/admin/AdminHeader';

const MainContent: React.FC = () => {
  const { currentPage, navigateTo } = useApp();

  // Developer & Admin Keyboard Hotkey: Ctrl + Shift + A (or Cmd + Shift + A)
  useEffect(() => {
    const handleAdminHotkey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        navigateTo('admin');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', handleAdminHotkey);
    return () => window.removeEventListener('keydown', handleAdminHotkey);
  }, [navigateTo]);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }

    try {
      // Initialize buttery-smooth momentum / inertia scrolling
      const lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        infinite: false,
      });

      let rafId: number;
      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }

      rafId = requestAnimationFrame(raf);

      return () => {
        cancelAnimationFrame(rafId);
        lenis.destroy();
      };
    } catch {
      // Fallback gracefully
    }
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'equipment':
        return <EquipmentPage />;
      case 'manpower':
        return <ManpowerPage />;
      case 'services':
        return <ServicesPage />;
      case 'contact':
        return <ContactPage />;
      case 'admin':
        return <AdminPage />;
      default:
        return <HomePage />;
    }
  };

  const isAdmin = currentPage === 'admin';

  return (
    <div className="min-h-screen bg-[#0F1926] text-[#E8E8E8] flex flex-col justify-between selection:bg-[#E8E8E8] selection:text-[#0F1926] font-sans antialiased pb-28 sm:pb-32">
      {isAdmin ? <AdminHeader /> : <Navbar />}
      <div className="flex-1">{renderPage()}</div>
      {!isAdmin && <Footer />}
      <EnquiryCartDrawer />
      <Toast />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
