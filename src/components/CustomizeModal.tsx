import React, { useState } from 'react';
import { MenuItem, CartItem } from '../types';
import { X, Flame, Plus, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface CustomizeModalProps {
  item: MenuItem;
  onClose: () => void;
  onAddToCart: (cartItem: CartItem) => void;
}

export const CustomizeModal: React.FC<CustomizeModalProps> = ({ item, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSpiciness, setSelectedSpiciness] = useState<string>(
    item.options?.spiciness ? item.options.spiciness[0] : 'Original'
  );
  const [selectedSide, setSelectedSide] = useState<string>(
    item.options?.sides ? item.options.sides[0].name : ''
  );
  const [selectedDrink, setSelectedDrink] = useState<string>(
    item.options?.drinks ? item.options.drinks[0].name : ''
  );
  const [selectedDips, setSelectedDips] = useState<string[]>([]);

  // Calculate total price
  let extraPrice = 0;
  if (item.options?.sides && selectedSide) {
    const found = item.options.sides.find((s) => s.name === selectedSide);
    if (found) extraPrice += found.price;
  }
  if (item.options?.drinks && selectedDrink) {
    const found = item.options.drinks.find((d) => d.name === selectedDrink);
    if (found) extraPrice += found.price;
  }
  selectedDips.forEach((dipName) => {
    const found = item.options?.dips?.find((d) => d.name === dipName);
    if (found) extraPrice += found.price;
  });

  const unitPrice = item.price + extraPrice;
  const totalItemPrice = Number((unitPrice * quantity).toFixed(2));

  const toggleDip = (dipName: string) => {
    if (selectedDips.includes(dipName)) {
      setSelectedDips(selectedDips.filter((d) => d !== dipName));
    } else {
      setSelectedDips([...selectedDips, dipName]);
    }
  };

  const handleAdd = () => {
    const cartItem: CartItem = {
      cartItemId: `${item.id}-${Date.now()}`,
      item,
      quantity,
      selectedSpiciness: item.options?.spiciness ? selectedSpiciness : undefined,
      selectedSide: item.options?.sides ? selectedSide : undefined,
      selectedDrink: item.options?.drinks ? selectedDrink : undefined,
      selectedDips,
      totalItemPrice
    };
    onAddToCart(cartItem);
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
        
        {/* Header Image & Close */}
        <div className="relative h-52 sm:h-60 bg-zinc-100">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/60 hover:bg-black text-white p-2 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-6 right-6">
            <span className="bg-[#E4002B] text-white px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
              {item.category}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1.5">{item.name}</h2>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1 text-zinc-900">
          <p className="text-sm text-zinc-600 font-medium">{item.description}</p>
          <div className="flex items-center gap-4 text-xs text-zinc-500 font-semibold">
            <span>🔥 {item.calories} kcal</span>
            <span>⭐ {item.rating} ({item.reviewsCount} reviews)</span>
          </div>

          {/* Spiciness Options */}
          {item.options?.spiciness && (
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-[#E4002B]" /> Choose Recipe Style:
              </label>
              <div className="grid grid-cols-2 gap-3">
                {item.options.spiciness.map((style) => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => setSelectedSpiciness(style)}
                    className={`py-3 px-4 rounded-2xl border text-sm font-bold transition flex items-center justify-between ${
                      selectedSpiciness === style
                        ? 'bg-[#E4002B] border-[#E4002B] text-white shadow-md shadow-red-600/30'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100'
                    }`}
                  >
                    <span>{style}</span>
                    {selectedSpiciness === style && <Check className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sides Options */}
          {item.options?.sides && (
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900">Select Side Option:</label>
              <div className="space-y-2">
                {item.options.sides.map((side) => (
                  <button
                    key={side.name}
                    type="button"
                    onClick={() => setSelectedSide(side.name)}
                    className={`w-full py-3 px-4 rounded-2xl border text-sm font-bold transition flex items-center justify-between ${
                      selectedSide === side.name
                        ? 'bg-red-50 border-[#E4002B] text-[#E4002B]'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100'
                    }`}
                  >
                    <span>{side.name}</span>
                    <span className="text-xs font-mono font-bold">
                      {side.price > 0 ? `+$${side.price.toFixed(2)}` : 'Included'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Drinks Options */}
          {item.options?.drinks && (
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900">Select Beverage:</label>
              <div className="space-y-2">
                {item.options.drinks.map((drink) => (
                  <button
                    key={drink.name}
                    type="button"
                    onClick={() => setSelectedDrink(drink.name)}
                    className={`w-full py-3 px-4 rounded-2xl border text-sm font-bold transition flex items-center justify-between ${
                      selectedDrink === drink.name
                        ? 'bg-red-50 border-[#E4002B] text-[#E4002B]'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100'
                    }`}
                  >
                    <span>{drink.name}</span>
                    <span className="text-xs font-mono font-bold">
                      {drink.price > 0 ? `+$${drink.price.toFixed(2)}` : 'Included'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Dips Addons */}
          {item.options?.dips && (
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900">Add Extra Dips & Sauces:</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {item.options.dips.map((dip) => {
                  const isSelected = selectedDips.includes(dip.name);
                  return (
                    <button
                      key={dip.name}
                      type="button"
                      onClick={() => toggleDip(dip.name)}
                      className={`py-2.5 px-3.5 rounded-xl border text-xs font-bold transition flex items-center justify-between ${
                        isSelected
                          ? 'bg-amber-50 border-amber-500 text-amber-800'
                          : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100'
                      }`}
                    >
                      <span>{dip.name}</span>
                      <span className="font-mono">+${dip.price.toFixed(2)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
            <span className="text-sm font-bold text-zinc-900">Quantity</span>
            <div className="flex items-center gap-3 bg-zinc-100 px-3 py-1.5 rounded-xl">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-lg bg-white text-zinc-900 font-bold flex items-center justify-center shadow-sm hover:bg-zinc-50"
              >
                -
              </button>
              <span className="font-black text-lg w-6 text-center text-zinc-900">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-lg bg-[#E4002B] text-white font-bold flex items-center justify-center shadow-sm hover:bg-red-700"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Footer Add Button */}
        <div className="p-5 bg-zinc-50 border-t border-zinc-200 flex items-center justify-between">
          <div>
            <div className="text-xs text-zinc-500 font-medium">Total Price</div>
            <div className="text-2xl font-black text-zinc-900">${totalItemPrice.toFixed(2)}</div>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 bg-[#E4002B] hover:bg-red-700 text-white px-8 py-3.5 rounded-2xl font-bold shadow-lg shadow-red-600/30 transition"
          >
            <Plus className="w-5 h-5" />
            <span>Add to Bucket</span>
          </button>
        </div>

      </motion.div>
    </div>
  );
};
