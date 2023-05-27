import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import MarketSlice from "./MarketSlice";
import Cartslice from "./Cartslice";
import ProductSlice from "./ProductSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const userConfig = {
  key: "user",
  version: 1,
  storage: AsyncStorage,
};
const marketConfig = {
  key: "market",
  version: 1,
  storage: AsyncStorage,
};
const cartConfig = {
  key: "cart",
  version: 1,
  storage: AsyncStorage,
};
const productConfig = {
  key: "product",
  version: 1,
  storage: AsyncStorage,
};

const userReducer = persistReducer(userConfig, UserSlice);
const marketReducer = persistReducer(marketConfig, MarketSlice);
const cartReducer = persistReducer(cartConfig, Cartslice);
const productReducer = persistReducer(productConfig, ProductSlice);

export const store = configureStore({
  reducer: {
    user: userReducer,
    market: marketReducer,
    cart: cartReducer,
    product: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
