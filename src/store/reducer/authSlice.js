import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "authSlice",
  initialState: () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return {
        isLogged: false,
        token: null,
        user: null,
        expirationTime: 0,
      };
    }

    return {
      isLogged: true,
      token,
      user: JSON.parse(localStorage.getItem("user")),
      expirationTime: +localStorage.getItem("expirationTime"),
    };
  },
  reducers: {
    login(state, action) {
      state.isLogged = true;
      state.token = action.payload.token;
      state.user = action.payload.user;

      // get current date
      const currentTime = Date.now();

      const timeout = 1000 * 60 * 60 * 24 * 7; // 1 week
      // const timeout = 10000; // 1 week

      state.expirationTime = currentTime + timeout;

      //set data in localStorage
      localStorage.setItem("token", state.token);
      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("expirationTime", state.expirationTime + "");
    },
    logout(state, action) {
      state.isLogged = false;
      state.token = null;
      state.user = null;

      //remove data from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authSlice.actions;
