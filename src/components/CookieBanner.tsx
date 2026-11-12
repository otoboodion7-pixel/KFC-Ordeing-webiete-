import React, { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('kfc_cookies_accepted');
    if (!accepted) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('kfc_cookies_accepted', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-900 border-t border-zinc-800 text-white p-4 sm:p-6 shadow-2xl"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-[#E4002B]/20 border border-[#E4002B]/40 rounded-xl flex items-center justify-center shrink-0 text-[#E4002B]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              <strong className="text-white block mb-0.5">We value your privacy</strong>
              We use cookies to enhance your browsing experience, serve personalized offers (like Zinger Wednesday deals), and analyze our traffic. By clicking &quot;Accept All&quot;, you consent to our use of cookies.
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleAccept}
              className="bg-zinc-800 hover:bg-zinc-700 text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition"
            >
              Manage Preferences
            </button>
            <button
              onClick={handleAccept}
              className="bg-[#E4002B] hover:bg-red-700 text-white px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md transition"
            >
              Accept All Cookies
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
