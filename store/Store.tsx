import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import MarketSlice from "./MarketSlice";

const store = configureStore({
  reducer: {
    user: UserSlice,
    market: MarketSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
