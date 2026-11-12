export interface MenuItem {
  id: string;
  name: string;
  category: 'buckets' | 'burgers' | 'meals' | 'chicken' | 'sides' | 'drinks' | 'desserts';
  description: string;
  price: number;
  image: string;
  calories: number;
  rating: number;
  reviewsCount: number;
  isPopular?: boolean;
  isSpicy?: boolean;
  options?: {
    spiciness?: ('Original' | 'Spicy' | 'Extra Crispy')[];
    sides?: { name: string; price: number }[];
    drinks?: { name: string; price: number }[];
    dips?: { name: string; price: number }[];
  };
}

export interface CartItem {
  cartItemId: string;
  item: MenuItem;
  quantity: number;
  selectedSpiciness?: string;
  selectedSide?: string;
  selectedDrink?: string;
  selectedDips: string[];
  totalItemPrice: number;
}

export interface Order {
  id: string;
  created_at: string;
  customer_name: string;
  email: string;
  phone: string;
  address: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  delivery_fee: number;
  total: number;
  status: 'Order Placed' | 'Kitchen Preparing' | 'Frying & Seasoning' | 'Out for Delivery' | 'Delivered';
  payment_method: string;
  jarvis_notes?: string;
}
