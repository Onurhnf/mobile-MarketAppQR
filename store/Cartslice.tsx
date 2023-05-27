import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICart } from "../interfaces/Cart/ICart.interface";
import CartService from "../services/Cart.service";

interface cartState {
  cartId: string;
  isCartExists: boolean;
  cartData: ICart.IProductInCart[] | undefined;
  barkod: string;
}
const initialState: cartState = {
  cartId: "",
  isCartExists: false,
  cartData: [],
  barkod: "",
};

export const declineCart = createAsyncThunk(
  "cart/declineCart",
  async (
    { cartId, token }: { cartId: string | null; token: string | null },
    { rejectWithValue }
  ) => {
    try {
      await CartService.DeclineCart(cartId ?? "", token ?? "");
      return cartId;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const CartSlice = createSlice({
  name: "cart",
  initialState,
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
    emptyCart: (state) => {
      state.cartId = "";
      state.barkod = "";
      state.cartData = [];
      state.isCartExists = false;
    },
  },
});

export const { setCartId, setCart, emptyCart, setItemBarkod } =
  CartSlice.actions;

export default CartSlice.reducer;
