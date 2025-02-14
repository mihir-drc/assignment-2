import { redirect } from "react-router-dom";
import { fetchGet } from "../api/fetch";
import store from "../store/store";
import { setData } from "../store/slices/AuthSlice";
// import store from "../store/store";

export const loginLoader = async () => {
  // const state = store.getState();
  // const dispatch = store.dispatch;

  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  } else {
    const result = await fetchGet("verify", token);
    if (result.success && result.data.id) {
      store.dispatch(
        setData({ id: result.data.id, loggedIn: true, ...result.data })
      );

      return redirect("/user");
    } else {
      localStorage.clear();

      return null;
    }
  }
};
export const verifyLoader = async () => {
  const state = store.getState();
  const dispatch = store.dispatch;
  const userData = state.auth;

  const token = localStorage.getItem("token");
  // const role = userData.role;

  if (!token) {
    return redirect("/");
  } else {
    const result = await fetchGet("verify", token);
    if (result.success && result.data.id) {
      dispatch(
        setData({
          loggedIn: true,
          ...result.data,
        })
      );

      return null;
    } else {
      localStorage.clear();

      return redirect("/");
    }
  }
};
