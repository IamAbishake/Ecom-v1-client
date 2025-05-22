import cartReducer from './slices/cartSlice'
import authReducer from './slices/authSlice'
import wishReducer from './slices/wishSlice'
import { configureStore } from '@reduxjs/toolkit';

export const store= configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer,
        wish: wishReducer,
    },
})
export default store;