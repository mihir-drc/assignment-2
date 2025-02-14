/* eslint-disable no-undef */
import { API_URL } from "../../constant";
export async function fetchGet(
  pathName: string,
  token: string | null = null,
  method = "GET"
) {
  try {
    const request = await fetch(API_URL + pathName, {
      method,
      headers: { Authorization: "Bearer " + token },
    });
    if (request.status == 405) {
      localStorage.removeItem("role");
      localStorage.removeItem("token");
      window.open("/", "_self");
      return { success: false, message: "Session Expired!!" };
    }
    const response = await request.json();
    return response;
  } catch (error) {
    return { success: false, internet: true, message: "Connection Issue" };
  }
}

export async function fetchPost(
  pathName: string,
  token: string | null = null,
  body: string,
  method = "POST",
  contentType = "application/json"
) {
  try {
    const request = await fetch(API_URL + pathName, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": contentType,
      },
      method,
      body,
    });
    // if (request.status == 405) {
    //   localStorage.removeItem("role");
    //   localStorage.removeItem("token");
    //   window.open("/", "_self");
    //   return { success: false, message: "Session Expired!!" };
    // }
    const response = await request.json();
    return response;
  } catch (error) {
    return { success: false, internet: true, message: "Connection Issue" };
  }
}

export async function fetchUpload(
  pathName: string,
  token: string | null = null,
  body: string
) {
  // if (!navigator.onLine) {
  //   return { success: false, internet: true, message: "Connection Issue" };
  // }
  try {
    const request = await fetch(API_URL + pathName, {
      headers: {
        Authorization: "Bearer " + token,
      },
      method: "POST",
      body,
    });
    // if (request.status == 405) {
    //   localStorage.removeItem("role");
    //   localStorage.removeItem("token");
    //   window.open("/", "_self");
    //   return { success: false, message: "Session Expired!!" };
    // }
    const response = await request.json();
    return response;
  } catch (error) {
    return { success: false, internet: true, message: "Connection Issue" };
  }
}
