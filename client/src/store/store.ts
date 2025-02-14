import { configureStore } from "@reduxjs/toolkit";
import toastSlice from "./slices/ToastSlice";
import authSlice from "./slices/AuthSlice";
import accountSlice from "./slices/AccountSlice";
import transactionSlice from "./slices/TransactionSlice";
const store = configureStore({
  reducer: {
    toast: toastSlice,
    auth: authSlice,
    account: accountSlice,
    transaction: transactionSlice,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
