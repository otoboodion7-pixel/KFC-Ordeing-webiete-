import React, { useState } from 'react';
import { Tag, Copy, Check, Sparkles, Flame } from 'lucide-react';
import { motion } from 'motion/react';

export const BrandDeals: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const deals = [
    {
      code: 'COLONEL20',
      title: '20% OFF Zinger Wednesday',
      description: 'Get 20% off any Zinger Burger meal or bucket when ordering online.',
      badge: 'Bestseller'
    },
    {
      code: 'STARK10',
      title: '$10 Off Family Feast',
      description: 'Save $10 on any 10-piece or 15-piece Family Feast bucket.',
      badge: 'Limited Time'
    },
    {
      code: 'FINGERLICKIN',
      title: 'Free Delivery + Free Dip',
      description: 'Enjoy free delivery and your choice of signature garlic ranch or BBQ dip.',
      badge: 'Exclusive'
    }
  ];

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <section className="py-12 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 text-[#E4002B] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#E4002B]" />
              <span>Official Brand Deals & Promo Codes</span>
            </div>
            <h2 className="text-3xl font-black tracking-tight text-zinc-900 mt-2">
              Save Big on Your Favorite Bucket
            </h2>
            <p className="text-sm text-zinc-600 mt-1">
              Copy active promo codes below and apply them instantly at checkout.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {deals.map((deal, index) => (
            <motion.div
              key={deal.code}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-gradient-to-br from-zinc-900 to-zinc-950 text-white rounded-3xl p-6 border border-zinc-800 shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#E4002B]/10 rounded-full blur-2xl pointer-events-none"></div>

              <div className="space-y-3 relative z-10">
                <span className="bg-[#E4002B] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                  {deal.badge}
                </span>
                <h3 className="text-xl font-black">{deal.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-medium">{deal.description}</p>
              </div>

              <div className="pt-4 border-t border-zinc-800 flex items-center justify-between relative z-10">
                <div className="bg-zinc-800 px-3.5 py-2 rounded-xl border border-zinc-700 font-mono text-sm font-bold text-amber-400 tracking-wider">
                  {deal.code}
                </div>
                <button
                  onClick={() => handleCopy(deal.code)}
                  className="flex items-center gap-1.5 bg-[#E4002B] hover:bg-red-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition shadow-md"
                >
                  {copiedCode === deal.code ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedCode === deal.code ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
