import React, { useState } from 'react';
import { CartItem, Order } from './types';
import { Navbar } from './components/Navbar';
import { AdBannerSlider } from './components/AdBannerSlider';
import { Promotions } from './components/Promotions';
import { BrandDeals } from './components/BrandDeals';
import { ScrollMarqueeBanner } from './components/ScrollMarqueeBanner';
import { ScrollBurgerBanner } from './components/ScrollBurgerBanner';
import { PickYourFoodBanner } from './components/PickYourFoodBanner';
import { RedFoodScrollSection } from './components/RedFoodScrollSection';
import { MenuSection } from './components/MenuSection';
import { CartDrawer } from './components/CartDrawer';
import { OrderTracker } from './components/OrderTracker';
import { StoreLocatorModal } from './components/StoreLocatorModal';
import { CookieBanner } from './components/CookieBanner';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedStore, setSelectedStore] = useState('KFC Downtown - 5th Avenue');

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isStoreLocatorOpen, setIsStoreLocatorOpen] = useState(false);
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);

  const handleAddToCart = (newItem: CartItem) => {
    const existingIndex = cartItems.findIndex(
      (ci) =>
        ci.item.id === newItem.item.id &&
        ci.selectedSpiciness === newItem.selectedSpiciness &&
        ci.selectedSide === newItem.selectedSide &&
        ci.selectedDrink === newItem.selectedDrink &&
        JSON.stringify(ci.selectedDips) === JSON.stringify(newItem.selectedDips)
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      const existing = updated[existingIndex];
      const newQty = existing.quantity + newItem.quantity;
      const unitPrice = existing.totalItemPrice / existing.quantity;
      existing.quantity = newQty;
      existing.totalItemPrice = Number((unitPrice * newQty).toFixed(2));
      setCartItems(updated);
    } else {
      setCartItems([...cartItems, newItem]);
    }
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems(
      cartItems.map((ci) => {
        if (ci.cartItemId === cartItemId) {
          const unitPrice = ci.totalItemPrice / ci.quantity;
          return {
            ...ci,
            quantity: newQty,
            totalItemPrice: Number((unitPrice * newQty).toFixed(2))
          };
        }
        return ci;
      })
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems(cartItems.filter((ci) => ci.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOrderCompleted = (order: Order) => {
    setLatestOrder(order);
    setIsOrdersOpen(true);
  };

  const totalCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-[#E4002B] selection:text-white">
      {/* Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenOrders={() => setIsOrdersOpen(true)}
        onOpenStoreLocator={() => setIsStoreLocatorOpen(true)}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        selectedStore={selectedStore}
      />

      {/* Ad Campaigns, Slideshow, Promotions, Brand Deals, Marquee, Scroll Animation, Food Picker & Red Scroll Section (Shown when 'all' category is selected) */}
      {activeCategory === 'all' && (
        <>
          <AdBannerSlider
            onOrderNow={() => {
              const el = document.getElementById('menu-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
          <Promotions onAddToCart={handleAddToCart} />
          <BrandDeals />
          <ScrollMarqueeBanner />
          <ScrollBurgerBanner />
          <PickYourFoodBanner onSelectCategory={setActiveCategory} />
          <RedFoodScrollSection
            onExploreMenu={() => {
              const el = document.getElementById('menu-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </>
      )}

      {/* Menu Section */}
      <div id="menu-section">
        <MenuSection
          activeCategory={activeCategory}
          onAddToCart={handleAddToCart}
        />
      </div>

      {/* Footer */}
      <footer className="bg-zinc-900 text-white py-16 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#E4002B] rounded-lg flex items-center justify-center text-white font-black italic">
                KFC
              </div>
              <span className="font-bold text-white text-sm">KENTUCKY FRIED CHICKEN</span>
            </div>
            <p className="text-zinc-400 leading-relaxed">
              Finger Lickin&apos; Good quality fried chicken prepared fresh daily with secret herbs and spices.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-3 text-sm">Menu Categories</h4>
            <ul className="space-y-2 text-zinc-400">
              <li><button onClick={() => setActiveCategory('buckets')} className="hover:text-white transition">Buckets & Feasts</button></li>
              <li><button onClick={() => setActiveCategory('burgers')} className="hover:text-white transition">Zinger Burgers</button></li>
              <li><button onClick={() => setActiveCategory('chicken')} className="hover:text-white transition">Chicken & Wings</button></li>
              <li><button onClick={() => setActiveCategory('sides')} className="hover:text-white transition">Sides & Gravy</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-3 text-sm">Customer Support</h4>
            <ul className="space-y-2 text-zinc-400">
              <li><button onClick={() => setIsOrdersOpen(true)} className="hover:text-white transition">Track Your Order</button></li>
              <li><button onClick={() => setIsStoreLocatorOpen(true)} className="hover:text-white transition">Find a KFC Store</button></li>
              <li><a href="#menu-section" className="hover:text-white transition">Nutrition Information</a></li>
              <li><a href="#menu-section" className="hover:text-white transition">Terms & Privacy Policy</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white mb-3 text-sm">Quality Commitment</h4>
            <p className="text-zinc-400">
              100% real whole chicken from trusted local farmers, hand-breaded and freshly prepared all day long.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-zinc-800 text-center text-zinc-500">
          © 2026 KFC Corporation. All rights reserved. Finger Lickin&apos; Good.
        </div>
      </footer>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* Order Tracker Modal */}
      <OrderTracker
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
        latestOrder={latestOrder}
      />

      {/* Store Locator Modal */}
      <StoreLocatorModal
        isOpen={isStoreLocatorOpen}
        onClose={() => setIsStoreLocatorOpen(false)}
        onSelectStore={setSelectedStore}
      />

      {/* Cookie Policy Banner */}
      <CookieBanner />
    </div>
  );
}
