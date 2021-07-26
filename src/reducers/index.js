import { combineReducers } from "redux";

import courses from "./courses";
import users from "./users";
import auth from "./auth";
import courseName from "./courseName";
import courseDescription from "./courseDescription";

export const reducers = combineReducers({
  auth,
  courses,
  users,
  courseName,
  courseDescription,
});
