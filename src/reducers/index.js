import { combineReducers } from "redux";

import courses from "./courses";
import users from "./users";
import auth from "./auth";
import actualCourse from "./actualCourse";
import actualChapter from "./actualChapter";
import actualLesson from "./actualLesson";

export const reducers = combineReducers({
  auth,
  courses,
  users,
  actualCourse,
  actualChapter,
  actualLesson,
});
