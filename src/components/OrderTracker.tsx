import React, { useEffect, useState } from 'react';
import { Order } from '../types';
import { getLocalOrders } from '../lib/supabase';
import { X, Clock, CheckCircle2, ChefHat, Flame, Bike, PackageCheck, ShieldCheck } from 'lucide-react';

interface OrderTrackerProps {
  isOpen: boolean;
  onClose: () => void;
  latestOrder: Order | null;
}

export const OrderTracker: React.FC<OrderTrackerProps> = ({ isOpen, onClose, latestOrder }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const list = getLocalOrders();
    setOrders(list);
    if (latestOrder) {
      setSelectedOrder(latestOrder);
    } else if (list.length > 0) {
      setSelectedOrder(list[0]);
    }
  }, [isOpen, latestOrder]);

  if (!isOpen) return null;

  const statuses: Order['status'][] = [
    'Order Placed',
    'Kitchen Preparing',
    'Frying & Seasoning',
    'Out for Delivery',
    'Delivered'
  ];

  const getCurrentStepIndex = (status: Order['status']) => {
    return statuses.indexOf(status);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white border border-zinc-200 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] text-zinc-900">
        
        {/* Header */}
        <div className="p-6 border-b border-zinc-100 flex items-center justify-between bg-zinc-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 border border-amber-300 rounded-xl flex items-center justify-center text-amber-700">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-zinc-900">Live Order Tracking</h2>
              <p className="text-xs text-zinc-500 font-medium">Real-time status updates for your delivery</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-900 p-2 rounded-xl bg-zinc-200/60 hover:bg-zinc-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {orders.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <Clock className="w-16 h-16 text-zinc-300 mx-auto" />
              <p className="font-bold text-zinc-600">No active orders found.</p>
              <p className="text-xs text-zinc-400">Place an order to monitor its delivery status.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Order selector pills */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                {orders.map((ord) => (
                  <button
                    key={ord.id}
                    onClick={() => setSelectedOrder(ord)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                      selectedOrder?.id === ord.id
                        ? 'bg-[#E4002B] text-white shadow-md shadow-red-600/30'
                        : 'bg-zinc-100 text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    {ord.id} (${ord.total.toFixed(2)})
                  </button>
                ))}
              </div>

              {selectedOrder && (
                <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-6 space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-4 border-b border-zinc-200">
                    <div>
                      <span className="text-xs bg-red-100 text-[#E4002B] border border-red-200 px-2.5 py-1 rounded-md font-mono font-bold">
                        {selectedOrder.id}
                      </span>
                      <h3 className="text-xl font-black mt-2 text-zinc-900">Delivery to {selectedOrder.customer_name}</h3>
                      <p className="text-xs text-zinc-500">{selectedOrder.address}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-zinc-400 font-medium">Total Amount</div>
                      <div className="text-lg font-black text-[#E4002B]">${selectedOrder.total.toFixed(2)}</div>
                    </div>
                  </div>

                  {/* Status Banner */}
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div className="text-xs text-emerald-900 font-medium leading-relaxed">
                      <strong>Order Status: {selectedOrder.status}</strong>. Your crispy chicken is freshly prepared and packaged according to Colonel Sanders&apos; precise specifications.
                    </div>
                  </div>

                  {/* Progress Timeline */}
                  <div className="space-y-4 pt-2">
                    <h4 className="text-sm font-bold text-zinc-900">Order Progress Timeline</h4>
                    <div className="space-y-3">
                      {statuses.map((st, idx) => {
                        const currentIndex = getCurrentStepIndex(selectedOrder.status);
                        const isDone = idx <= currentIndex;
                        const isCurrent = idx === currentIndex;

                        return (
                          <div key={st} className="flex items-center gap-4">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition ${
                                isDone
                                  ? 'bg-[#E4002B] text-white shadow-md shadow-red-600/30'
                                  : 'bg-zinc-200 text-zinc-500'
                              } ${isCurrent ? 'ring-4 ring-red-600/20 animate-pulse' : ''}`}
                            >
                              {idx === 0 && <Clock className="w-4 h-4" />}
                              {idx === 1 && <ChefHat className="w-4 h-4" />}
                              {idx === 2 && <Flame className="w-4 h-4" />}
                              {idx === 3 && <Bike className="w-4 h-4" />}
                              {idx === 4 && <PackageCheck className="w-4 h-4" />}
                            </div>
                            <div className="flex-1">
                              <div className={`text-sm font-bold ${isDone ? 'text-zinc-900' : 'text-zinc-400'}`}>
                                {st}
                              </div>
                              <div className="text-xs text-zinc-500">
                                {idx === 0 && 'Order successfully received'}
                                {idx === 1 && 'Kitchen staff assembling your bucket'}
                                {idx === 2 && 'Marinating in 11 secret herbs and spices'}
                                {idx === 3 && 'Courier dispatched for lightning delivery'}
                                {idx === 4 && 'Delivered hot and fresh. Enjoy your meal!'}
                              </div>
                            </div>
                            {isDone && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Items summary */}
                  <div className="pt-4 border-t border-zinc-200">
                    <h4 className="text-sm font-bold text-zinc-900 mb-2">Ordered Items</h4>
                    <div className="space-y-2">
                      {selectedOrder.items.map((ci) => (
                        <div key={ci.cartItemId} className="flex justify-between text-xs text-zinc-700 bg-white border border-zinc-200 px-3 py-2 rounded-xl">
                          <span>{ci.quantity}x {ci.item.name}</span>
                          <span className="text-[#E4002B] font-mono font-bold">${ci.totalItemPrice.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
