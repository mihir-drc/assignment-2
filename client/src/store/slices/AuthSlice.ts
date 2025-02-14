import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchPost } from "../../api/fetch";
import { setToastInfo } from "./ToastSlice";
import en from "../../locales/en";
import fr from "../../locales/fr";
import hi from "../../locales/hi";
import gu from "../../locales/gu";
import { TranslationsInterface } from "../../interface/Interface";
export interface Translations {
  translations: {
    ADDACCOUNT: string;
    ACCOUNTNUMBER: string;
    BALANCE: string;
    CHECKMAIL: string;
    CLICKLINK: string;
    CONTACTSUPPORT: string;
    CONTACTUS: string;
    CURRENCY: string;
    CREATENEWACCOUNT: string;
    DONTHAVEACCOUNT: string;
    EMAIL: string;
    EMAILVERIFIED: string;
    ENTERYOURDETAILSTOREGISTER: string;
    ENTERYOURDETAILSTOLOGIN: string;
    EXCHANGERATE: string;
    FORGOTPASSWORD: string;
    FORSECURITY: string;
    FOOTERPRODUCT: string;
    FULLNAME: string;
    FINANCEAPP: string;
    FUTURELOGINUSE: string;
    GETHELP: string;
    LOGIN: string;
    LOGINTOYOURACCOUNT: string;
    NEEDSUPPORT: string;
    NOTGETTINGMAIL: string;
    PASSWORD: string;
    REGISTER: string;
    REGISTERFOOTER: string;
    REMEMBERME: string;
    SENDAGAIN: string;
    SIGNIN: string;
    SIGNUP: string;
    SIGNINGUP: string;
    SELECTTYPE: string;
    TERMSCONDITION: string;
    YOUREMAILADDRESS: string;
    TOKENEXPIRED: string;
    TOKENEXPIREDDESCRIPTION: string;
    CONTINUE: string;
    YOUR: string;
    YOURFINANCIALDASHBOARD: string;
    SEND: string;
    SENDING: string;
    PASSWORDFORGOT: string;
    PASSWORDFORGOTDESCRIPTION: string;
    WELCOMEBACK: string;
    DASHBOARD: string;
    CARDS: string;
    TRANSACTIONS: string;
    TRANSACTIONSDESCRIPTION: string;
    RECIEPTENTS: string;
    RECIEPTENTSDESCRIPTION: string;
    INTEGRATIONS: string;
    SETTINGS: string;
    SELECTCURRENCY: string;
    BANKNAME: string;
    IFSCCODE: string;
    ADDBANKACCOUNT: string;
    ADDRECIEPTENT: string;
    YOURACCOUNT: string;
    ADDYOURBANKACCOUNT: string;
    ADD: string;
    SAVING: string;
    CURRENT: string;
    VIEWBALANCE: string;
    INVESTMENTS: string;
    HEALTHSCORE: string;
    LOGOUT: string;
    SEARCH: string;
    MAIN: string;
    OTHERS: string;
    SETTINGSDESCRIPTION: string;
    PRIVACYANDSECURITY: string;
    ACCOUNT: string;
    PROFILE: string;
    PHOTO: string;
    PHONENUMBER: string;
    FULLNAMEDESC: string;
    EMAILDESC: string;
    PHONENUMBERDESC: string;
    LANGUAGE: string;
    LANGUAGEDESC: string;
    THEME: string;
    THEMEDESC: string;
    CHANGE: string;
    EDIT: string;
    PASSWORDDESC: string;
    ADDTRANSACTION: string;
    AMOUNT: string;
    CATEGORY: string;
    DESCRIPTION: string;
    BANK: string;
    SELECTBANK: string;
    TRANSACTIONTYPE: string;
    SELECT: string;
    DEPOSIT: string;
    WITHDRAW: string;
    TRANSFER: string;
    TRANSACTIONDATE: string;
    PICKDATE: string;
    RECIEVER: string;
    NOBANKFOUND: string;
  };
}

const translations: any = { en, fr, hi, gu };
export const login = createAsyncThunk(
  "login",
  async (data: string, dispatch) => {
    const response = await fetchPost(
      "login",
      localStorage.getItem("token"),
      data
    );

    if (!response.success) {
      dispatch.dispatch(
        setToastInfo({
          variant: response.variant,
          description: response.message,
        })
      );
    }
    return response;
  }
);
export const sendAgain = createAsyncThunk(
  "sendAgain",
  async (data: string, dispatch) => {
    const response = await fetchPost(
      "sendAgain",
      localStorage.getItem("token"),
      data
    );

    dispatch.dispatch(
      setToastInfo({
        variant: response.variant,
        description: response.message,
      })
    );
    return response;
  }
);
export const register = createAsyncThunk(
  "register",
  async (data: string, dispatch) => {
    const response = await fetchPost(
      "register",
      localStorage.getItem("token"),
      data
    );
    dispatch.dispatch(
      setToastInfo({
        variant: response.variant,
        description: response.message,
      })
    );

    return response;
  }
);
const initialState: {
  name: string;
  id: string;
  email: string;
  mode: string;
  loggedIn: boolean;
  processing: boolean;
  language: string;
  translations: TranslationsInterface;
  photo: string;
  phone: string;
} = {
  name: "",
  id: "",
  email: "",
  mode: "light",
  loggedIn: false,
  processing: false,
  language: "en",
  translations: translations["en"],
  photo: "https://github.com/shadcn.png",
  phone: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.name = action.payload.name;
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.loggedIn = action.payload.loggedIn;
      state.photo = action.payload.photo;
    },
    setTheme: (state, action) => {
      state.mode = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
      state.translations = translations[action.payload];
    },
  },
  extraReducers: (build) => {
    build.addCase(login.fulfilled, (state, action) => {
      if (action.payload.success) {
        localStorage.setItem("token", action.payload.token);
        state.name = action.payload.fullname;
        state.email = action.payload.email;
        state.id = action.payload.id;
        state.loggedIn = true;
      } else {
        state.loggedIn = false;
      }
    });
    build.addCase(sendAgain.pending, (state, action) => {
      state.processing = true;
    });
    build.addCase(sendAgain.fulfilled, (state, action) => {
      state.processing = false;
    });
    build.addCase(register.pending, (state, action) => {
      state.processing = true;
    });
    build.addCase(register.fulfilled, (state, action) => {
      state.processing = false;
    });
  },
});

export const { setData, setTheme, setLanguage } = authSlice.actions;
export default authSlice.reducer;
