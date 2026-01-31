import { Product } from '../types';

export const products: Product[] = [
  // Electronics
  {
    id: '1',
    name: 'crema#1',
    description: 'lorem ipsum dolor sit amet',
    price: 199.99,
    category: 'cuidado facial',
    type: 'physical',
    image: 'crema_1',
    stock: 15,
    badge: 'new',
    features: ['Hidratación profunda', 'Anti-edad', 'Vitamina C', 'Ácido hialurónico', 'Protección solar SPF 30'],
    rating: 4.5,
    reviews: 23
  },
  {
    id: '2',
    name: 'crema#2',
    description: 'lorem ipsum dolor sit amet',
    price: 349.99,
    category: 'cuidado facial',
    type: 'physical',
    image: 'crema_2',
    stock: 8,
    badge: 'trending',
    features: ['Efecto lifting', 'Colágeno natural', 'Retinol', 'Nutrición intensiva', 'Piel radiante'],
    rating: 4.8,
    reviews: 45
  },
  {
    id: '3',
    name: 'crema#3',
    description: 'lorem ipsum dolor sit amet',
    price: 49.99,
    category: 'cuidado facial',
    type: 'physical',
    image: 'crema_3',
    stock: 25,
    badge: 'sale',
    features: ['Piel sensible', 'Hipoalergénico', 'Dermatológicamente testado', 'Rápida absorción', 'Sin fragancias'],
    rating: 4.2,
    reviews: 12
  },

  // Clothing
  {
    id: '4',
    name: 'Cotton T-Shirt',
    description: 'Soft organic cotton t-shirt, available in multiple colors',
    price: 29.99,
    category: 'ropa',
    type: 'physical',
    image: 'shirt_1',
    stock: 50,
    colors: ['#e3a7c0', '#bad5f0', '#c2d5a8', '#f3b1cd'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.3,
    reviews: 67
  },
  {
    id: '5',
    name: 'Denim Jacket',
    description: 'Classic vintage-style denim jacket with modern fit',
    price: 89.99,
    category: 'ropa',
    type: 'physical',
    image: 'jacket_1',
    stock: 20,
    badge: 'sale',
    colors: ['#2d3748', '#4a5568'],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.6,
    reviews: 34
  },
  {
    id: '6',
    name: 'Yoga Leggings',
    description: 'High-waisted yoga leggings with four-way stretch',
    price: 54.99,
    category: 'ropa',
    type: 'physical',
    image: 'yoga_1',
    stock: 30,
    colors: ['#b0abcb', '#f8d7e8', '#000000'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.7,
    reviews: 89
  },

  // Productos comestibles
  {
    id: '7',
    name: 'comestibles',
    description: 'lorem ipsum dolor sit amet',
    price: 79.99,
    category: 'comestibles',
    type: 'physical',
    image: 'comestibles_1',
    stock: 999,
    badge: 'new',
    rating: 4.9,
    reviews: 156
  },
  /*{
    id: '8',
    name: 'Design Templates Pack',
    description: '500+ professional design templates for social media and marketing',
    price: 39.99,
    category: 'digital',
    type: 'digital',
    image: 'design-templates',
    stock: 999,
    badge: 'limited',
    rating: 4.4,
    reviews: 78
  },*/
  /*{
    id: '9',
    name: 'Ebook: Web Development',
    description: 'Complete guide to modern web development with React and Node.js',
    price: 29.99,
    category: 'digital',
    type: 'digital',
    image: 'ebook',
    stock: 999,
    rating: 4.6,
    reviews: 92
  },*/

  // Home & Living
  {
    id: '10',
    name: 'maquillaje',
    description: 'lorem ipsum dolor sit amet',
    price: 69.99,
    category: 'maquillaje',
    type: 'physical',
    image: 'maquilla_1',
    stock: 12,
    colors: ['#f8efe6', '#d6eff6', '#fae4cd'],
    rating: 4.8,
    reviews: 21
  },
  /*
  {
    id: '11',
    name: 'Throw Pillow Collection',
    description: 'Soft cotton throw pillows with removable covers',
    price: 34.99,
    category: 'home',
    type: 'physical',
    image: 'pillows',
    stock: 40,
    colors: ['#e3a7c0', '#c2d5a8', '#b0abcb', '#f3b1cd'],
    rating: 4.5,
    reviews: 43
  },
  {
    id: '12',
    name: 'Wall Art Print',
    description: 'Abstract art print on high-quality canvas',
    price: 44.99,
    category: 'home',
    type: 'physical',
    image: 'wall-art',
    stock: 18,
    rating: 4.3,
    reviews: 15
  },

  // perfumeria
  {
    id: '13',
    name: 'perfume_1',
    description: 'lorem ipsum dolor sit amet',
    price: 59.99,
    category: 'perfumes',
    type: 'physical',
    image: 'perfume_1',
    stock: 25,
    badge: 'trending',
    rating: 4.7,
    reviews: 134
  },
  /*
  {
    id: '14',
    name: 'Cookbook: Healthy Recipes',
    description: '200+ healthy recipes with nutritional information',
    price: 24.99,
    category: 'books',
    type: 'physical',
    image: 'cookbook',
    stock: 35,
    rating: 4.4,
    reviews: 56
  },
  {
    id: '15',
    name: 'Self-Help Guide',
    description: 'Transform your life with proven personal development strategies',
    price: 19.99,
    category: 'books',
    type: 'physical',
    image: 'self-help',
    stock: 45,
    badge: 'sale',
    rating: 4.1,
    reviews: 28
  }
  */
];

export const categories = [
  { id: 'all', name: 'All Products', color: '#e3a7c0' },
  { id: 'cuidado facial', name: 'cuidado facial', color: '#bad5f0' },
  { id: 'ropa', name: 'ropa', color: '#c2d5a8' },
  { id: 'comestibles', name: 'comestibles', color: '#b0abcb' },
  { id: 'maquillaje', name: 'maquillaje', color: '#f3b1cd' },
  { id: 'perfumes', name: 'perfumes', color: '#f0d5ba' }
];

export const whatsappNumber = '+46729018793'; // Replace with your actual WhatsApp number