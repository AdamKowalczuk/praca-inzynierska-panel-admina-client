import {
  CHANGE_COURSE_NAME,
  SET_COURSE_NAME,
} from "../constants/actionTypes.js";

export default (courseName = [], action) => {
  switch (action.type) {
    case SET_COURSE_NAME:
      return action.payload;
    case CHANGE_COURSE_NAME:
      return action.payload;
    default:
      return courseName;
  }
};
