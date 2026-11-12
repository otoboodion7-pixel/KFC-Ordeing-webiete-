import { MenuItem } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'kfc-1',
    name: '10-Piece Family Feast Bucket',
    category: 'buckets',
    description: '10 pieces of our world-famous Colonel Sanders signature fried chicken (Original Recipe or Hot & Crispy), plus 2 large sides and a 1.5L drink.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=800&q=80',
    calories: 2450,
    rating: 4.9,
    reviewsCount: 1240,
    isPopular: true,
    options: {
      spiciness: ['Original', 'Spicy'],
      sides: [
        { name: 'Large Coleslaw & Large Fries', price: 0 },
        { name: 'Large Mashed Potato & Gravy', price: 1.50 },
        { name: 'Mac & Cheese Bowls', price: 2.00 }
      ],
      drinks: [
        { name: 'Pepsi 1.5L', price: 0 },
        { name: 'Mirinda Orange 1.5L', price: 0 },
        { name: '7Up 1.5L', price: 0 }
      ],
      dips: [
        { name: 'Garlic Ranch Dip', price: 0.75 },
        { name: 'Smoky BBQ Dip', price: 0.75 },
        { name: 'Sweet Chilli Dip', price: 0.75 }
      ]
    }
  },
  {
    id: 'kfc-2',
    name: 'Zinger Tower Burger Meal',
    category: 'burgers',
    description: 'A spicy crunchy Zinger chicken fillet topped with a hashbrown, cheese, lettuce, and fiery Zinger sauce in a sesame bun, served with fries and drink.',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    calories: 980,
    rating: 4.8,
    reviewsCount: 890,
    isPopular: true,
    isSpicy: true,
    options: {
      sides: [
        { name: 'Regular Fries', price: 0 },
        { name: 'Coleslaw', price: 0.50 },
        { name: 'Corn on the Cob', price: 0.75 }
      ],
      drinks: [
        { name: 'Pepsi Regular', price: 0 },
        { name: 'Mountain Dew', price: 0 },
        { name: 'Iced Tea', price: 0.50 }
      ]
    }
  },
  {
    id: 'kfc-3',
    name: 'Twister Wrap Supreme',
    category: 'burgers',
    description: 'Two crispy tender chicken strips wrapped in a warm tortilla with crunchy lettuce, diced tomatoes, and creamy pepper mayo.',
    price: 7.49,
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
    calories: 670,
    rating: 4.7,
    reviewsCount: 520,
    options: {
      dips: [
        { name: 'Extra Pepper Mayo', price: 0.50 },
        { name: 'Garlic Sauce', price: 0.50 }
      ]
    }
  },
  {
    id: 'kfc-4',
    name: 'Ultimate Box Master Meal',
    category: 'meals',
    description: 'Crispy fried chicken breast fillet, cheese slice, hashbrown, lettuce, and pepper mayo wrapped in a toasted tortilla, with medium fries and drink.',
    price: 11.99,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    calories: 1120,
    rating: 4.9,
    reviewsCount: 410,
    isPopular: true
  },
  {
    id: 'kfc-5',
    name: '6-Piece Hot Wings Bucket',
    category: 'chicken',
    description: 'Six fiery, crispy marinated chicken wings coated in our signature blazing hot seasoning.',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80',
    calories: 540,
    rating: 4.8,
    reviewsCount: 950,
    isSpicy: true
  },
  {
    id: 'kfc-6',
    name: 'Popcorn Chicken Share Box',
    category: 'chicken',
    description: 'Bite-sized tender pieces of 100% chicken breast, breaded and fried to golden perfection.',
    price: 8.49,
    image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=800&q=80',
    calories: 720,
    rating: 4.6,
    reviewsCount: 310
  },
  {
    id: 'kfc-7',
    name: 'Famous Mashed Potatoes & Gravy',
    category: 'sides',
    description: 'Our signature whipped potatoes smothered in savory, rich brown gravy.',
    price: 4.49,
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80',
    calories: 380,
    rating: 4.9,
    reviewsCount: 1100,
    isPopular: true
  },
  {
    id: 'kfc-8',
    name: 'Golden Seasoned French Fries',
    category: 'sides',
    description: 'Thick-cut potato fries dusted with Colonel Sanders secret herb and spice blend.',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80',
    calories: 420,
    rating: 4.7,
    reviewsCount: 780
  },
  {
    id: 'kfc-9',
    name: 'Refreshing Mountain Dew (Large)',
    category: 'drinks',
    description: 'Icy cold citrus blast soda served with crushed ice.',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80',
    calories: 250,
    rating: 4.6,
    reviewsCount: 230
  },
  {
    id: 'kfc-10',
    name: 'Chocolate Lava Krush',
    category: 'desserts',
    description: 'Rich chocolate cake with a warm, gooey molten chocolate center.',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    calories: 510,
    rating: 4.9,
    reviewsCount: 640,
    isPopular: true
  }
];

export const PROMO_CODES: Record<string, number> = {
  'STARK10': 0.10, // 10% off
  'COLONEL20': 0.20, // 20% off
  'FINGERLICKIN': 5.00 // $5 off
};
