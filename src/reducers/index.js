import { combineReducers } from "redux";

import courses from "./courses";
import users from "./users";
import auth from "./auth";

export const reducers = combineReducers({ auth, courses, users });
