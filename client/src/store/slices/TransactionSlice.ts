import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchGet, fetchPost } from "../../api/fetch";
import { setToastInfo } from "./ToastSlice";
import { RootState } from "../store";
import {
  RecieverBankAccountInterface,
  RecieverInterface,
} from "../../interface/Interface";
export const fetchRecievers = createAsyncThunk(
  "fetchRecievers",
  async (id: string, dispatch) => {
    const response = await fetchPost(
      "user/fetchRecievers",
      localStorage.getItem("token"),
      JSON.stringify({ id: id })
    );
    return response;
  }
);
export const fetchRecieversAccounts = createAsyncThunk(
  "fetchRecieversAccounts",
  async (
    { id, bankAccountId }: { id: string; bankAccountId: string },
    dispatch
  ) => {
    const response = await fetchPost(
      "user/fetchRecieversAccounts",
      localStorage.getItem("token"),
      JSON.stringify({ id, bankAccountId })
    );
    return response;
  }
);
export const fetchCategories = createAsyncThunk(
  "fetchCategories",
  async (_, dispatch) => {
    const response = await fetchGet(
      "user/fetchCategories",
      localStorage.getItem("token")
    );
    return response;
  }
);
export const addTransaction = createAsyncThunk(
  "addTransaction",
  async (data: string, dispatch) => {
    const response = await fetchPost(
      "user/addTransaction",
      localStorage.getItem("token"),
      data
    );

    dispatch.dispatch(
      setToastInfo({
        variant: response.variant,
        description: response.message,
      })
    );
    // if (response.success) {
    //   dispatch.dispatch(fetchAccounts());
    // }
    return response;
  }
);
// export const fetchAccounts = createAsyncThunk(
//   "fetchAccounts",
//   async (_, dispatch) => {
//     const { auth } = dispatch.getState() as RootState;
//     const response = await fetchGet(
//       `user/fetchAccounts?userId=${auth.id}`,
//       localStorage.getItem("token")
//     );

//     return response;
//   }
// );
const initialState: {
  transactions: [];
  processing: boolean;
  recieverId: string;
  recievers: RecieverInterface[];
  recieverAccount: RecieverBankAccountInterface[];
  categories: string[];
} = {
  transactions: [],
  recieverId: "",
  recieverAccount: [],
  recievers: [],
  processing: false,
  categories: [],
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(fetchRecievers.fulfilled, (state, action) => {
      state.recievers = action.payload.recievers;
    });
    build.addCase(fetchRecieversAccounts.fulfilled, (state, action) => {
      state.recieverAccount = action.payload.recieversBank;
    });
    build.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload.categories;
    });
  },
});

export const {} = transactionSlice.actions;
export default transactionSlice.reducer;
