import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  wishItems: [],
};

const wishListSlice = createSlice({
  name: 'wish',
  initialState,
  reducers: {
    addToWishList: (state, action) => {
      const existing = state.wishItems.find(wishitem => wishitem._id === action.payload._id);
      if (!existing) {
        state.wishItems.push({ ...action.payload });
      }
    }, 
    removeFromWishList: (state, action)=> {
      state.wishItems = state.wishItems.filter(item => item._id !== action.payload);
    },
    clearWishList:(state) =>{
      state.wishItems = [];
    },
  },
});

export const { addToWishList, removeFromWishList, clearWishList } = wishListSlice.actions;
export default wishListSlice.reducer;
