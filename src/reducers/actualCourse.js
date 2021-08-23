import { CHANGE_ACTUAL_COURSE } from "../constants/actionTypes.js";
const actualCourse = (actualCourse = "", action) => {
  switch (action.type) {
    case CHANGE_ACTUAL_COURSE:
      return action.payload;
    default:
      return actualCourse;
  }
};
export default actualCourse;
