export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'cuidado facial' | 'ropa' | 'digital' | 'home' | 'books';
  type: 'physical' | 'digital';
  image: string;
  stock: number;
  badge?: 'new' | 'sale' | 'trending' | 'limited';
  colors?: string[];
  sizes?: string[];
  features?: string[];
  rating: number;
  reviews: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface OrderInfo {
  name: string;
  email: string;
  phone: string;
  address?: string;
  notes?: string;
}