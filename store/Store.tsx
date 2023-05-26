import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import MarketSlice from "./MarketSlice";
import Cartslice from "./Cartslice";
import ProductSlice from "./ProductSlice";

const store = configureStore({
  reducer: {
    user: UserSlice,
    market: MarketSlice,
    cart: Cartslice,
    product: ProductSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
