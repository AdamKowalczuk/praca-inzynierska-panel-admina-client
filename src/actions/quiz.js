import {
  CREATE_QUIZ,
  DELETE_QUIZ,
  UPDATE_QUIZ,
} from "../constants/actionTypes";

import * as api from "../api/index.js";

export const createQuiz =
  (quiz, courseId, chapterId, actualChapter) => async (dispatch) => {
    try {
      const { data } = await api.createQuiz(quiz, courseId, chapterId);

      dispatch({
        type: CREATE_QUIZ,
        payload: quiz,
        courseId: courseId,
        chapterId: chapterId,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
export const updateQuiz =
  (quiz, courseId, chapterId, quizId) => async (dispatch) => {
    try {
      const { data } = await api.updateQuiz(quiz, courseId, chapterId, quizId);
      dispatch({
        type: UPDATE_QUIZ,
        quiz: quiz,
        courseId: courseId,
        actualChapter: quiz.actualChapter,
        actualQuiz: quiz.actualQuiz,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
export const deleteQuiz =
  (courseId, chapterId, quizId, actualQuiz) => async (dispatch) => {
    try {
      await api.deleteQuiz(courseId, chapterId, quizId, actualQuiz);
      dispatch({
        type: DELETE_QUIZ,
        courseId: courseId,
        chapterId: chapterId,
        quizId: quizId,
        actualQuiz: actualQuiz.actualQuiz,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

export const changeActualQuiz = (actualQuiz) => {
  return {
    type: "CHANGE_ACTUAL_QUIZ",
    payload: actualQuiz,
  };
};
