import {
  FETCH_ALL_USERS,
  CREATE,
  UPDATE,
  DELETE,
} from "../constants/actionTypes";

import * as api from "../api/index.js";

export const getUsers = () => async (dispatch) => {
  try {
    const { data } = await api.fetchUsers();
    console.log("Get Users", data);
    dispatch({ type: FETCH_ALL_USERS, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
