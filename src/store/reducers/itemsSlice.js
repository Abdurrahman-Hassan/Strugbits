// reducers/itemsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const itemsSlice = createSlice({
  name: "items",
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      const newData = action.payload;
      // Update localStorage without modifying the state structure
      localStorage.setItem("data", JSON.stringify(newData));
      return action.payload; // Assuming action.payload is an array
    },
    updateItem: (state, action) => {
      const updatedItem = action.payload;
      const updatedState = state.map(item => (item.id === updatedItem.id ? updatedItem : item));
    
      console.log('Updated state:', updatedState);
    
      localStorage.setItem('data', JSON.stringify(updatedState));
    
      return updatedState;
    },
    deleteItem: (state, action) => {
      const itemId = action.payload;
      // Filter out the item to be deleted
      const updatedState = state.filter((item) => item.id !== itemId);
      // Update localStorage with the updated state
      localStorage.setItem("data", JSON.stringify(updatedState));
      return updatedState;
    },
  },
});
export const { addItem, updateItem, deleteItem } = itemsSlice.actions;

export const selectItems = (state) => state.items;

export const selectItemById = (state, itemId) =>
  state.items.find((item) => item.id === itemId);

export default itemsSlice.reducer;
