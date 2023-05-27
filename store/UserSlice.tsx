import { createSlice } from "@reduxjs/toolkit";
import { IAuth } from "../interfaces/Auth/IAuth.interface";

interface UserState {
  data: IAuth.IUser | null;
  token: string | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  data: null,
  token: null,
  isLoggedIn: false,
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.token = null;
      state.isLoggedIn = false;
      state.data = null;
    },
    setUserData: (state, action) => {
      state.data = { ...action.payload };
    },
  },
});

export const { login, logout, setUserData } = UserSlice.actions;

export default UserSlice.reducer;
