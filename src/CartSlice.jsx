import { createSlice } from "@reduxjs/toolkit";

// ✅ Initial state — array to store cart items
const initialState = {
  items: [], // each item = { name, image, cost, quantity }
};

// ✅ Create the slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // 🔹 Add item to cart
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find((item) => item.name === name);

      if (existingItem) {
        // If item already exists, just increase quantity
        existingItem.quantity++;
      } else {
        // Otherwise, add new item with quantity 1
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },

    // 🔹 Remove item from cart
    removeItem: (state, action) => {
      state.items = state.items.filter(
        (item) => item.name !== action.payload
      );
    },

    // 🔹 Update quantity of an item
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find((item) => item.name === name);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    },
  },
});

// ✅ Export the action creators to use in components
export const { addItem, removeItem, updateQuantity } = cartSlice.actions;

// ✅ Export the reducer to use in store.js
export default cartSlice.reducer;
