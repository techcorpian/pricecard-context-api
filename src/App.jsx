import React from 'react';
import { CartProvider } from './context/CartContext.jsx'; // Adjust path as necessary
import CartPage from './CartPage'; // Adjust path as necessary

function App() {
  return (
    <CartProvider>
      <CartPage />
    </CartProvider>
  );
}

export default App;
