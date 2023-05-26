import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cartId: null,
    isCartExists: false,
    cartData: null,
    barkod: null,
  },
  reducers: {
    setCartId: (state, action) => {
      state.isCartExists = true;
      state.cartId = action.payload;
    },
    setItemBarkod: (state, action) => {
      state.barkod = action.payload;
    },
    setCart: (state, action) => {
      state.isCartExists = true;
      state.cartData = action.payload;
    },
    removeCart: (state) => {
      state.cartId = null;
      state.isCartExists = false;
    },
  },
});

export const { setCartId, setCart, removeCart, setItemBarkod } =
  CartSlice.actions;

export default CartSlice.reducer;
