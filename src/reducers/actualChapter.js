import { CHANGE_ACTUAL_CHAPTER } from "../constants/actionTypes.js";
const actualChapter = (actualChapter = "", action) => {
  switch (action.type) {
    case CHANGE_ACTUAL_CHAPTER:
      return action.payload;
    default:
      return actualChapter;
  }
};

export default actualChapter;
