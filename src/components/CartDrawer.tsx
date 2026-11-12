import React, { useState } from 'react';
import { CartItem, Order } from '../types';
import { PROMO_CODES } from '../data/mockMenu';
import { saveOrderToStorage } from '../lib/supabase';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Check, CreditCard, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  onOrderCompleted: (order: Order) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderCompleted
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [discountRate, setDiscountRate] = useState(0);

  // Checkout form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<'cart' | 'checkout'>('cart');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, curr) => acc + curr.totalItemPrice, 0);
  const discount = appliedPromo ? subtotal * discountRate : 0;
  const deliveryFee = subtotal > 35 ? 0 : 3.99;
  const total = Math.max(0, subtotal - discount + deliveryFee);

  const handleApplyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (PROMO_CODES[code] !== undefined) {
      setAppliedPromo(code);
      setDiscountRate(PROMO_CODES[code]);
      setPromoInput('');
    } else {
      alert('Invalid promo code. Try STARK10 or COLONEL20.');
    }
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setIsSubmitting(true);

    const newOrder: Order = {
      id: `KFC-${Math.floor(100000 + Math.random() * 900000)}`,
      created_at: new Date().toISOString(),
      customer_name: name || 'Valued Customer',
      email: email || 'customer@example.com',
      phone: phone || '+1 555-0199',
      address: address || '123 Main Street, City',
      items: cartItems,
      subtotal,
      discount,
      delivery_fee: deliveryFee,
      total,
      status: 'Order Placed',
      payment_method: paymentMethod
    };

    await saveOrderToStorage(newOrder);

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });

    setIsSubmitting(false);
    onClearCart();
    onOrderCompleted(newOrder);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-screen max-w-md bg-white border-l border-zinc-200 text-zinc-900 flex flex-col shadow-2xl"
        >
          
          {/* Header */}
          <div className="p-6 border-b border-zinc-100 flex items-center justify-between bg-zinc-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#E4002B] rounded-xl flex items-center justify-center text-white font-bold">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black text-zinc-900">Your KFC Bucket</h2>
                <p className="text-xs text-zinc-500 font-medium">{cartItems.length} delicious items selected</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-zinc-900 p-2 rounded-xl bg-zinc-200/60 hover:bg-zinc-200 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {step === 'cart' ? (
              <>
                {cartItems.length === 0 ? (
                  <div className="text-center py-20 space-y-3">
                    <ShoppingBag className="w-16 h-16 text-zinc-300 mx-auto" />
                    <p className="font-bold text-zinc-700">Your bucket is currently empty.</p>
                    <p className="text-xs text-zinc-400">Add some crispy chicken to get started.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((cartItem) => (
                      <div
                        key={cartItem.cartItemId}
                        className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4 flex gap-4 items-center"
                      >
                        <img
                          src={cartItem.item.image}
                          alt={cartItem.item.name}
                          className="w-20 h-20 object-cover rounded-xl shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-sm text-zinc-900 truncate">{cartItem.item.name}</h4>
                          <div className="text-xs text-zinc-500 space-y-0.5 mt-1 font-medium">
                            {cartItem.selectedSpiciness && <p>Recipe: {cartItem.selectedSpiciness}</p>}
                            {cartItem.selectedSide && <p>Side: {cartItem.selectedSide}</p>}
                            {cartItem.selectedDrink && <p>Drink: {cartItem.selectedDrink}</p>}
                            {cartItem.selectedDips.length > 0 && (
                              <p className="text-amber-600 font-bold">Dips: {cartItem.selectedDips.join(', ')}</p>
                            )}
                          </div>
                          <div className="text-[#E4002B] font-black text-sm mt-2">
                            ${cartItem.totalItemPrice.toFixed(2)}
                          </div>
                        </div>

                        <div className="flex flex-col items-end justify-between h-20">
                          <button
                            onClick={() => onRemoveItem(cartItem.cartItemId)}
                            className="text-zinc-400 hover:text-red-600 transition p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-xl border border-zinc-200 shadow-sm">
                            <button
                              onClick={() => onUpdateQuantity(cartItem.cartItemId, cartItem.quantity - 1)}
                              className="text-zinc-600 hover:text-zinc-900 font-bold px-1"
                            >
                              -
                            </button>
                            <span className="text-xs font-black text-zinc-900">{cartItem.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(cartItem.cartItemId, cartItem.quantity + 1)}
                              className="text-zinc-600 hover:text-zinc-900 font-bold px-1"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Promo Code Input */}
                    <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4 space-y-3">
                      <label className="text-xs font-bold text-zinc-700 flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-[#E4002B]" /> Have a Promo Code?
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="e.g. COLONEL20"
                          value={promoInput}
                          onChange={(e) => setPromoInput(e.target.value)}
                          className="flex-1 bg-white border border-zinc-200 rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 uppercase placeholder-zinc-400 focus:outline-none focus:border-[#E4002B]"
                        />
                        <button
                          onClick={handleApplyPromo}
                          className="bg-zinc-900 hover:bg-zinc-800 text-white px-4 py-2 rounded-xl text-xs font-bold transition"
                        >
                          Apply
                        </button>
                      </div>
                      {appliedPromo && (
                        <div className="text-xs text-emerald-600 font-bold flex items-center gap-1 pt-1">
                          <Check className="w-3.5 h-3.5" /> Promo code <strong>{appliedPromo}</strong> applied successfully!
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Checkout Form */
              <form onSubmit={handleCheckout} id="checkout-form" className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
                  <h3 className="font-bold text-sm text-zinc-900 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#E4002B]" /> Delivery & Payment
                  </h3>
                  <button
                    type="button"
                    onClick={() => setStep('cart')}
                    className="text-xs text-[#E4002B] hover:underline font-bold"
                  >
                    ← Back to Cart
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-zinc-600 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Colonel Sanders"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm text-zinc-900 focus:outline-none focus:border-[#E4002B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-600 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="colonel@kfc.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm text-zinc-900 focus:outline-none focus:border-[#E4002B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-600 mb-1">Phone Number</label>
                    <input
                      type="text"
                      required
                      placeholder="+1 555-0199"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm text-zinc-900 focus:outline-none focus:border-[#E4002B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-600 mb-1">Delivery Address</label>
                    <textarea
                      required
                      rows={2}
                      placeholder="123 Crispy Lane, Louisville, KY"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm text-zinc-900 focus:outline-none focus:border-[#E4002B] resize-none"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-600 mb-1">Payment Method</label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm text-zinc-900 focus:outline-none focus:border-[#E4002B]"
                    >
                      <option value="Credit Card">Credit Card</option>
                      <option value="Apple Pay / Google Pay">Apple Pay / Google Pay</option>
                      <option value="Cash on Delivery">Cash on Delivery</option>
                    </select>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Footer Totals & Checkout Button */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-zinc-50 border-t border-zinc-200 space-y-4">
              <div className="space-y-1.5 text-xs text-zinc-600 font-medium">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-zinc-900 font-mono font-bold">${subtotal.toFixed(2)}</span>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Discount ({appliedPromo})</span>
                    <span className="font-mono">-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Fee {subtotal > 35 && '(Free over $35)'}</span>
                  <span className="text-zinc-900 font-mono font-bold">{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-base font-black text-zinc-900 pt-2 border-t border-zinc-200">
                  <span>Total Amount</span>
                  <span className="text-[#E4002B] font-mono">${total.toFixed(2)}</span>
                </div>
              </div>

              {step === 'cart' ? (
                <button
                  onClick={() => setStep('checkout')}
                  className="w-full flex items-center justify-center gap-2 bg-[#E4002B] hover:bg-red-700 text-white py-4 rounded-2xl font-bold shadow-lg shadow-red-600/30 transition"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  type="submit"
                  form="checkout-form"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-bold shadow-lg shadow-emerald-600/30 transition disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Processing Order...</span>
                  ) : (
                    <>
                      <ShieldCheck className="w-5 h-5" />
                      <span>Place Secure Order</span>
                    </>
                  )}
                </button>
              )}
            </div>
          )}

        </motion.div>
      </div>
    </div>
  );
};
