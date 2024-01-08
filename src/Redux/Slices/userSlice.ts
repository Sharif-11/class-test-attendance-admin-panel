import { createSlice } from "@reduxjs/toolkit";
import { LoggedInUser, UserState } from "../../Interfaces/user.interface";
import { RootState } from "../store";

const initialState: UserState = {
  teacher: null,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: { payload: LoggedInUser | null; type: string }
    ) => {
      state.teacher = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.teacher;
export const userReducer = userSlice.reducer;
