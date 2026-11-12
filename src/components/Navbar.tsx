import React from 'react';
import { ShoppingBag, Clock, Flame, MapPin, Terminal } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenOrders: () => void;
  onOpenStoreLocator: () => void;
  onOpenPythonModal?: () => void;
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedStore: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenOrders,
  onOpenStoreLocator,
  onOpenPythonModal,
  activeCategory,
  onSelectCategory,
  selectedStore
}) => {
  const categories = [
    { id: 'all', label: 'All Menu' },
    { id: 'buckets', label: 'Buckets' },
    { id: 'burgers', label: 'Burgers & Wraps' },
    { id: 'meals', label: 'Box Meals' },
    { id: 'chicken', label: 'Chicken & Wings' },
    { id: 'sides', label: 'Sides & Gravy' },
    { id: 'drinks', label: 'Drinks' },
    { id: 'desserts', label: 'Desserts' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-zinc-200 text-zinc-900 shadow-sm">
      {/* Top Utility Bar */}
      <div className="bg-[#E4002B] text-white px-4 py-2 text-xs font-bold flex items-center justify-between">
        <div className="flex items-center gap-3 overflow-x-auto whitespace-nowrap">
          <span className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-amber-300 fill-amber-300 animate-pulse" />
            FREE DELIVERY ON ORDERS OVER $35 • USE CODE <strong className="underline uppercase">COLONEL20</strong>
          </span>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={onOpenStoreLocator}
            className="flex items-center gap-1.5 bg-black/20 hover:bg-black/30 px-3 py-1 rounded-lg text-white transition"
          >
            <MapPin className="w-3.5 h-3.5 text-amber-300" />
            <span>{selectedStore}</span>
          </button>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSelectCategory('all')}>
          <div className="w-12 h-12 bg-[#E4002B] rounded-2xl flex items-center justify-center shadow-md shadow-red-600/20">
            <span className="font-black text-xl italic tracking-tighter text-white">KFC</span>
          </div>
          <div>
            <div className="font-black tracking-tight text-xl text-zinc-900 leading-none">
              KENTUCKY FRIED CHICKEN
            </div>
            <p className="text-xs text-zinc-500 font-medium mt-1">Official Online Ordering</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {onOpenPythonModal && (
            <button
              onClick={onOpenPythonModal}
              className="hidden lg:flex items-center gap-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 px-3 py-2 rounded-xl text-xs font-bold transition"
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-600" />
              <span>API Backend</span>
            </button>
          )}

          <button
            onClick={onOpenOrders}
            className="flex items-center gap-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 px-4 py-2.5 rounded-xl text-sm font-semibold transition"
          >
            <Clock className="w-4 h-4 text-zinc-600" />
            <span className="hidden sm:inline">My Orders</span>
          </button>

          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2.5 bg-[#E4002B] hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-red-600/25 transition transform active:scale-95"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-amber-400 text-zinc-950 text-xs font-black w-6 h-6 rounded-full flex items-center justify-center shadow-md">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="border-t border-zinc-100 bg-zinc-50 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-2 py-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#E4002B] text-white shadow-md shadow-red-600/30'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
