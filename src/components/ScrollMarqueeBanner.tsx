import React from 'react';
import { motion } from 'motion/react';
import { Flame } from 'lucide-react';

export const ScrollMarqueeBanner: React.FC = () => {
  const items = [
    "🔥 Finger Lickin' Good",
    "🍗 11 Secret Herbs & Spices",
    "🌶️ Spicy Zinger Burger",
    "📦 10-Piece Family Feast",
    "🍟 Golden Seasoned Fries",
    "🥤 Icy Refreshing Drinks",
    "✨ Freshly Prepared Daily"
  ];

  return (
    <div className="py-8 bg-zinc-950 text-white overflow-hidden border-b border-zinc-800 relative">
      <div className="flex whitespace-nowrap overflow-hidden">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="flex gap-12 items-center text-lg sm:text-2xl font-black uppercase tracking-wider text-white"
        >
          {[...items, ...items, ...items].map((text, idx) => (
            <div key={idx} className="flex items-center gap-3 shrink-0">
              <span className="text-[#E4002B]">✦</span>
              <span className="hover:text-amber-400 transition-colors cursor-default">{text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
