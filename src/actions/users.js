import { FETCH_ALL_USERS, DELETE_USER } from "../constants/actionTypes";

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

export const deleteUser = (id) => async (dispatch) => {
  try {
    await api.deleteUser(id);

    dispatch({ type: DELETE_USER, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};
