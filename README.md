# 🛍️ ColorCart E-Commerce React App

A vibrant, colorful e-commerce web application built with React, featuring a mixed catalog of physical and digital products with WhatsApp order integration.

## 🌟 Features

- **🎨 Bold & Colorful Design**: Beautiful UI with your custom color palette
- **📦 Mixed Product Catalog**: Physical products and digital downloads
- **🔍 Category Filtering**: Browse by Electronics, Clothing, Digital, Home & Living, Books
- **🛒 Shopping Cart**: Full cart functionality with localStorage persistence
- **📱 WhatsApp Integration**: Detailed order information sent via WhatsApp
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **⚡ No Authentication**: Guest checkout for quick shopping

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **React Router** for navigation
- **CSS Variables** for theming
- **LocalStorage** for cart persistence
- **No backend required** (static data)

## 🚀 Getting Started

1. Navigate to the project directory:
```bash
cd e-commerce
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

### `npm start`
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder.

### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can't go back!**

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Navigation header with cart counter
│   ├── ProductCard.tsx # Individual product display
│   ├── ProductList.tsx # Grid of products
│   ├── CategoryFilter.tsx # Category selection
│   ├── ShoppingCart.tsx # Cart management
│   └── CheckoutForm.tsx # WhatsApp checkout form
├── pages/              # Main application pages
│   ├── Home.tsx        # Landing page
│   ├── Products.tsx    # Product listing
│   └── Cart.tsx        # Shopping cart
├── hooks/              # Custom React hooks
│   └── useCart.ts      # Cart state management
├── utils/              # Utility functions
│   ├── theme.ts        # Color scheme and design tokens
│   └── whatsapp.ts     # WhatsApp integration
├── data/               # Static data
│   └── products.ts     # Product catalog
└── types/              # TypeScript type definitions
    └── index.ts        # App interfaces
```

## 🎨 Color Scheme

The app uses your custom color palette:
- **Primary Pink**: `#e3a7c0` - buttons, CTAs, accents
- **Primary Blue**: `#bad5f0` - links, secondary actions
- **Background**: `#f8efe6` - soft peach backgrounds
- **Success**: `#c2d5a8` - mint green highlights
- **Accent**: `#b0abcb` - lavender for badges

## 📱 WhatsApp Integration

Orders are sent via WhatsApp with:
- Customer information
- Detailed product list with quantities
- Pricing breakdown (subtotal, tax, total)
- Order notes
- Professional formatting

## 🛒 Shopping Features

- **Product Display**: Grid layout with hover effects
- **Category Filtering**: Dynamic product filtering
- **Cart Management**: Add/remove items, quantity updates
- **Badge System**: New, Sale, Trending, Limited badges
- **Stock Tracking**: Physical product inventory
- **Digital Products**: Instant download indicators

## 📱 Responsive Design

- **Desktop**: Full grid layout with side cart
- **Tablet**: Adjusted grid sizes
- **Mobile**: Single column layout with stacked cart

## 🔄 Cart Persistence

Cart items are saved to localStorage automatically, so:
- Cart persists across browser sessions
- Items remain after page refresh
- No database required

## 📞 WhatsApp Setup

To use WhatsApp integration:
1. Update `whatsappNumber` in `src/data/products.ts`
2. Replace with your actual WhatsApp business number
3. Ensure number includes country code (without + or spaces)

## 🎯 Key Components

### ProductCard Component
- Displays product image, name, description, price
- Shows badges (new, sale, trending, limited)
- Star ratings and review count
- Stock status for physical products
- Add to cart functionality

### ShoppingCart Component
- List of cart items with images
- Quantity controls
- Remove items
- Price calculation with tax
- Checkout button

### CheckoutForm Component
- Customer information form
- Order summary
- WhatsApp integration
- Responsive modal design

## 🎨 Design Features

- **Bold Colors**: Vibrant color palette throughout
- **Smooth Animations**: Hover effects and transitions
- **Modern Layout**: Clean, card-based design
- **Consistent Spacing**: CSS variable system
- **Typography Hierarchy**: Clear visual structure

## 🔧 Customization

### Adding New Products
Edit `src/data/products.ts` to add new items:
```typescript
{
  id: 'unique-id',
  name: 'Product Name',
  description: 'Product description',
  price: 99.99,
  category: 'electronics',
  type: 'physical', // or 'digital'
  image: 'product-image',
  stock: 10,
  badge: 'new',
  rating: 4.5,
  reviews: 25
}
```

### Updating Colors
Modify `src/index.css` CSS variables to change the color scheme.

### Adding Categories
Update the `categories` array in `src/data/products.ts` with new categories and colors.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎉 Enjoy Your ColorCart!

Happy shopping with your beautiful, colorful e-commerce store! 🛍️✨

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
