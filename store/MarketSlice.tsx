import { createSlice } from "@reduxjs/toolkit";

export const MarketSlice = createSlice({
  name: "market",
  initialState: {
    marketID: null,
    isMarketFound: false,
    marketData: null,
  },
  reducers: {
    setMarketId: (state, action) => {
      state.marketID = action.payload;
    },
    marketFaund: (state, action) => {
      state.isMarketFound = true;
      state.marketData = action.payload;
    },
    forgetMarket: (state) => {
      state.marketID = null;
      state.isMarketFound = false;
    },
  },
});

export const { setMarketId, forgetMarket, marketFaund } = MarketSlice.actions;

export default MarketSlice.reducer;
