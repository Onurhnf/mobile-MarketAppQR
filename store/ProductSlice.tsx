import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProductService from "../services/Product.service";

interface ProductState {
  productId: string | null;
  productName: string;
  productError: string | null;
}

const initialState: ProductState = {
  productId: null,
  productName: "",
  productError: null,
};

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async (
    { productId, token }: { productId: string; token: string | null },
    { rejectWithValue }
  ) => {
    try {
      const result = await ProductService.GetProduct(productId, token);
      return result.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      const { productId, productName } = action.payload;
      state.productId = productId;
      state.productName = productName;
    },
    removeProduct: (state) => {
      state.productId = null;
      state.productName = "";
      state.productError = null;
    },
    clearProductError: (state) => {
      state.productError = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getProduct.fulfilled,
      (state, action: { payload: { _id: string; name: string } }) => {
        const { _id, name } = action.payload;
        state.productId = _id;
        state.productName = name;
      }
    );
    builder.addCase(getProduct.rejected, (state, action) => {
      state.productError =
        (action.payload as any)?.response?.data?.message ??
        "Something went wrong!";
    });
  },
});

export const { setProduct, clearProductError, removeProduct } =
  ProductSlice.actions;

export default ProductSlice.reducer;
