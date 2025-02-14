import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
interface toastInfo {
  variant: string;
  description: string;
}
const initialState: { isToastOpen: boolean; toastInfo: toastInfo } = {
  isToastOpen: false,
  toastInfo: { variant: "success", description: "" },
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    setToastInfo: (state, action) => {
      state.isToastOpen = true;
      state.toastInfo = action.payload;
    },
    closeToast: (state) => {
      state.isToastOpen = false;
    },
    showToast: (state, Action) => {},
  },
});

export const { setToastInfo, closeToast, showToast } = toastSlice.actions;
export default toastSlice.reducer;
