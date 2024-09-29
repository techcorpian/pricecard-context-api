import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state with an empty products array
const initialState = {
  products: [],
};

// Define actions for the cart
const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload.map(product => ({ ...product, quantity: 0 })), // Initialize quantity to 0
      };
    case 'INCREASE_QUANTITY':
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload
            ? { ...product, quantity: product.quantity + 1 }
            : product
        ),
      };
    case 'DECREASE_QUANTITY':
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload && product.quantity > 0
            ? { ...product, quantity: product.quantity - 1 }
            : product
        ),
      };
    default:
      return state;
  }
};

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load products from JSON file using fetch
  useEffect(() => {
    fetch('/product.json')
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: 'SET_PRODUCTS', payload: data.products });
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const increaseQuantity = (id) => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: id });
  };

  const decreaseQuantity = (id) => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: id });
  };

  return (
    <CartContext.Provider value={{ cart: state, increaseQuantity, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook to use the Cart Context
export const useCart = () => {
  return useContext(CartContext);
};
