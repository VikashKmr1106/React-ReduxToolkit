import { createSlice } from '@reduxjs/toolkit';

// Load the cart state from localStorage
const loadCartState = () => {
  try {
    const serializedState = localStorage.getItem('cart');
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (e) {
    console.warn("Could not load cart state from localStorage", e);
    return [];
  }
};

// Save the cart state to localStorage
const saveCartState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cart', serializedState);
  } catch (e) {
    console.warn("Could not save cart state to localStorage", e);
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCartState(),
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.find(item => item.id === action.payload.id);
      if (!existingItem) {
        state.push(action.payload);
        saveCartState(state); // Save the state to localStorage
      }
    },
    removeFromCart: (state, action) => {
      const newState = state.filter(item => item.id !== action.payload);
      saveCartState(newState); // Save the state to localStorage
      return newState;
    },
    removeAllCart: (state) => {
      const newState = [];
      saveCartState(newState); // Save the state to localStorage
      return newState;
    }
  }
});

// Define the selector to get the cart items count
export const selectCartItemsCount = (state) => state.cart.length;

export const { addToCart, removeFromCart, removeAllCart } = cartSlice.actions;
export default cartSlice.reducer;
