// src/CartSlice.jsx
import { createSlice } from "@reduxjs/toolkit";

// --- Initial State ---
const initialState = {
  items: [], // array of plants in the cart
};

// --- Create the slice ---
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // 1️⃣ Add Item to Cart
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find((item) => item.name === name);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },

    // 2️⃣ Remove Item from Cart
    removeItem: (state, action) => {
      state.items = state.items.filter(
        (item) => item.name !== action.payload
      );
    },

    // 3️⃣ Update Item Quantity
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find((item) => item.name === name);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    },
  },
});

// --- Export actions and reducer ---
export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
