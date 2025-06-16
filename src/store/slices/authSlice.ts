import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";
import { AuthState, User } from "@/types/auth";

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      // Clear localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    },
    clearError: (state) => {
      state.error = null;
    },
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      state.error = null;

      // Store in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
      }
    },
    loadFromStorage: (state) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");

        if (token && user) {
          try {
            state.token = token;
            state.user = JSON.parse(user);
            state.isAuthenticated = true;
          } catch (error) {
            console.error("Error parsing stored user data:", error);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
          }
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addMatcher(authApi.endpoints.login.matchPending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;

        // Store in localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("token", action.payload.token);
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        }
      })
      .addMatcher(
        authApi.endpoints.login.matchRejected,
        (state, action: any) => {
          state.isLoading = false;
          state.error =
            action.payload?.message || action.error?.message || "Login failed";
          state.user = null;
          state.token = null;
          state.isAuthenticated = false;
        }
      )
      // Logout
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;

        // Clear localStorage
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      })
      // Refresh Token
      .addMatcher(
        authApi.endpoints.refreshToken.matchFulfilled,
        (state, action) => {
          state.token = action.payload.token;
          state.user = action.payload.user;
          state.isAuthenticated = true;

          // Update localStorage
          if (typeof window !== "undefined") {
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("user", JSON.stringify(action.payload.user));
          }
        }
      )
      // Profile Update
      .addMatcher(
        authApi.endpoints.updateProfile.matchFulfilled,
        (state, action) => {
          state.user = action.payload;

          // Update localStorage
          if (typeof window !== "undefined") {
            localStorage.setItem("user", JSON.stringify(action.payload));
          }
        }
      );
  },
});

export const { logout, clearError, setCredentials, loadFromStorage } =
  authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectCurrentUser = (state: { auth: AuthState }) =>
  state.auth.user;
export const selectCurrentToken = (state: { auth: AuthState }) =>
  state.auth.token;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;
export const selectAuthLoading = (state: { auth: AuthState }) =>
  state.auth.isLoading;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;
