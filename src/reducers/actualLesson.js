import { CHANGE_ACTUAL_LESSON } from "../constants/actionTypes.js";
const actualLesson = (actualLesson = "", action) => {
  switch (action.type) {
    case CHANGE_ACTUAL_LESSON:
      return action.payload;
    default:
      return actualLesson;
  }
};

export default actualLesson;
