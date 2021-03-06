import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index.js";

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    console.log("Data:", data);
    dispatch({ type: AUTH, data });

    router.push("/admin");
  } catch (error) {
    console.log(error);
  }
};
