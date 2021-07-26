import { CHANGE_COURSE_DESCRIPTION } from "../constants/actionTypes.js";

export default (courseDescription = [], action) => {
  switch (action.type) {
    case CHANGE_COURSE_DESCRIPTION:
      return action.payload;
    default:
      return courseDescription;
  }
};
