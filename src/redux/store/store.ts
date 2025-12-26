import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../slice/AuthSlice";
import { usersSlice } from "../slice/UserSlice";
import { profileSlice } from "../slice/ProfileSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    users: usersSlice.reducer,
    profile: profileSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
