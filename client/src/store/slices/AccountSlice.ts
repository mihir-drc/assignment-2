import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchGet, fetchPost } from "../../api/fetch";
import { setToastInfo } from "./ToastSlice";
import { RootState } from "../store";
interface BankAccount {
  id: number;
  userId: number;
  accountNumber: string;
  accountType: "SAVING" | "CURRENT"; // Assuming only these two types
  balance: string; // If balance is stored as a number, change to `balance: number;`
  currency: string; // Example: "INR", "USD"
  bankName: string;
  ifsccode: string;
  createdAt: string; // If handling dates properly, use `Date`
}
export const addAccount = createAsyncThunk(
  "addAccount",
  async (data: string, dispatch) => {
    const response = await fetchPost(
      "user/addAccount",
      localStorage.getItem("token"),
      data
    );

    dispatch.dispatch(
      setToastInfo({
        variant: response.variant,
        description: response.message,
      })
    );
    if (response.success) {
      dispatch.dispatch(fetchAccounts());
    }
    return response;
  }
);
export const fetchAccounts = createAsyncThunk(
  "fetchAccounts",
  async (_, dispatch) => {
    const { auth } = dispatch.getState() as RootState;
    const response = await fetchGet(
      `user/fetchAccounts?userId=${auth.id}`,
      localStorage.getItem("token")
    );

    return response;
  }
);
const initialState: { accounts: BankAccount[]; processing: boolean } = {
  accounts: [],

  processing: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(addAccount.pending, (state, action) => {
      state.processing = true;
    });
    build.addCase(addAccount.fulfilled, (state, action) => {
      state.processing = false;
    });
    build.addCase(fetchAccounts.fulfilled, (state, action) => {
      state.accounts = action.payload.accounts;
      state.processing = false;
    });
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
