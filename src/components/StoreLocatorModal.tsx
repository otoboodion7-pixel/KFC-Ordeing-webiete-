import React, { useState } from 'react';
import { X, MapPin, Store, Check, Search } from 'lucide-react';
import { motion } from 'motion/react';

interface StoreLocatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStore: (storeName: string) => void;
}

export const StoreLocatorModal: React.FC<StoreLocatorModalProps> = ({ isOpen, onClose, onSelectStore }) => {
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState('store-1');

  if (!isOpen) return null;

  const stores = [
    { id: 'store-1', name: 'KFC Downtown - 5th Avenue', address: '742 Evergreen Terrace, Downtown', distance: '0.8 miles away', hours: '10:00 AM - 11:00 PM', open: true },
    { id: 'store-2', name: 'KFC Malibu Beach - Pacific Coast Hwy', address: '10880 Malibu Point, Malibu', distance: '3.4 miles away', hours: '10:30 AM - 10:00 PM', open: true },
    { id: 'store-3', name: 'KFC Midtown - Broadway Station', address: '450 Broadway, Midtown', distance: '4.1 miles away', hours: '9:00 AM - Midnight', open: true },
    { id: 'store-4', name: 'KFC Westside Mall Food Court', address: '1200 Westside Expressway', distance: '6.5 miles away', hours: '10:00 AM - 9:30 PM', open: false }
  ];

  const filteredStores = stores.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.address.toLowerCase().includes(search.toLowerCase()));

  const handleConfirm = () => {
    const found = stores.find(s => s.id === selectedId);
    if (found) {
      onSelectStore(found.name);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white border border-zinc-200 w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-6 border-b border-zinc-100 flex items-center justify-between bg-zinc-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 text-[#E4002B] rounded-xl flex items-center justify-center">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-zinc-900">Select KFC Restaurant</h2>
              <p className="text-xs text-zinc-500 font-medium">Choose your preferred location for pickup or delivery</p>
            </div>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-900 p-2 rounded-xl bg-zinc-200/60 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-6 pb-2">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search by city, zip code, or street..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl pl-11 pr-4 py-3 text-sm text-zinc-900 focus:outline-none focus:border-[#E4002B]"
            />
          </div>
        </div>

        {/* Store List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {filteredStores.map((store) => {
            const isSelected = selectedId === store.id;
            return (
              <div
                key={store.id}
                onClick={() => setSelectedId(store.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                  isSelected ? 'bg-red-50 border-[#E4002B]' : 'bg-zinc-50 border-zinc-200 hover:bg-zinc-100'
                }`}
              >
                <div className="flex items-start gap-3">
                  <MapPin className={`w-5 h-5 mt-0.5 ${isSelected ? 'text-[#E4002B]' : 'text-zinc-400'}`} />
                  <div>
                    <h4 className="font-bold text-sm text-zinc-900">{store.name}</h4>
                    <p className="text-xs text-zinc-500 mt-0.5">{store.address}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs font-semibold">
                      <span className="text-zinc-600">{store.distance}</span>
                      <span className={store.open ? 'text-emerald-600 font-bold' : 'text-red-500 font-bold'}>
                        {store.open ? 'Open Now' : 'Closed'}
                      </span>
                      <span className="text-zinc-400">({store.hours})</span>
                    </div>
                  </div>
                </div>

                <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                  isSelected ? 'bg-[#E4002B] border-[#E4002B] text-white' : 'border-zinc-300'
                }`}>
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-5 bg-zinc-50 border-t border-zinc-200 flex items-center justify-end">
          <button
            onClick={handleConfirm}
            className="bg-[#E4002B] hover:bg-red-700 text-white px-8 py-3 rounded-2xl font-bold shadow-md transition"
          >
            Confirm Store Location
          </button>
        </div>

      </motion.div>
    </div>
  );
};
