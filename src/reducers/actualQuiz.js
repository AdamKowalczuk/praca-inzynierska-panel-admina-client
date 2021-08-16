import { CHANGE_ACTUAL_QUIZ } from "../constants/actionTypes.js";
const actualQuiz = (actualQuiz = "", action) => {
  switch (action.type) {
    case CHANGE_ACTUAL_QUIZ:
      return action.payload;
    default:
      return actualQuiz;
  }
};
export default actualQuiz;
