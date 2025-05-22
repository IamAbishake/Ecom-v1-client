import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) =>{
      const existing = state.items.find(item => item._id === action.payload._id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action)=> {
      state.items = state.items.filter(item => item._id !== action.payload);
    },
    clearCart:(state) =>{
      state.items = [];
    },
    incrementQuantity:(state, action)=>{
     const item = state.items.find((item)=> item._id === action.payload);
     if(item) item.quantity += 1;
    },
    decrementQuantity:(state, action)=>{
     const item = state.items.find((item)=> item._id === action.payload);
     if(item && item.quantity > 1) item.quantity -= 1;
    }
  },
});

export const { addToCart, removeFromCart, clearCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
