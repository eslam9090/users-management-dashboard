import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ProfileState } from "../../types/types";

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    name: "John Doe",
    phone: "+1 234 567 8900",
    jobTitle: "Software Engineer",
    yearsOfExperience: "5",
    address: "123 Main Street, New York, NY 10001",
    workingHours: "9:00 AM - 5:00 PM",
    loading: false,
    success: false,
  } as ProfileState,
  reducers: {
    updateProfileStart: (state) => {
      state.loading = true;
      state.success = false;
    },
    updateProfileSuccess: (
      state,
      action: PayloadAction<Partial<ProfileState>>
    ) => {
      Object.assign(state, action.payload);
      state.loading = false;
      state.success = true;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
  },
});
