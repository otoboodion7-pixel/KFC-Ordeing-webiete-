import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Order } from '../types';

// Initialize Supabase client using environment variables or fallback
const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL as string) || 'https://placeholder.supabase.co';
const SUPABASE_ANON_KEY = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder';

export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export function isSupabaseConnected(): boolean {
  return !SUPABASE_URL.includes('placeholder');
}

export async function saveOrderToStorage(order: Order): Promise<Order> {
  // Save to local storage for instant feedback
  const existingOrders = getLocalOrders();
  const updatedOrders = [order, ...existingOrders];
  localStorage.setItem('kfc_orders', JSON.stringify(updatedOrders));

  // Sync with Supabase if connected
  if (isSupabaseConnected()) {
    try {
      await supabase.from('orders').insert([
        {
          id: order.id,
          customer_name: order.customer_name,
          email: order.email,
          phone: order.phone,
          address: order.address,
          items: order.items,
          subtotal: order.subtotal,
          total: order.total,
          status: order.status,
          payment_method: order.payment_method
        }
      ]);
    } catch (err) {
      console.warn('Supabase sync warning:', err);
    }
  }

  return order;
}

export function getLocalOrders(): Order[] {
  try {
    const raw = localStorage.getItem('kfc_orders');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
