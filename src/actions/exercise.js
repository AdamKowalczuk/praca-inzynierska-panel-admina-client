import {
  CREATE_EXERCISE,
  DELETE_EXERCISE,
  UPDATE_EXERCISE,
} from "../constants/actionTypes";

import * as api from "../api/index.js";

export const createExercise =
  (exercise, courseId, chapterId, actualChapter) => async (dispatch) => {
    console.log(courseId, chapterId);
    try {
      const { data } = await api.createExercise(exercise, courseId, chapterId);
      dispatch({
        type: CREATE_EXERCISE,
        payload: exercise,
        courseId: courseId,
        chapterId: chapterId,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
export const updateExercise =
  (exercise, courseId, chapterId, exerciseId) => async (dispatch) => {
    console.log(exercise, courseId, chapterId, exerciseId);
    try {
      const { data } = await api.updateExercise(
        exercise,
        courseId,
        chapterId,
        exerciseId
      );
      dispatch({
        type: UPDATE_EXERCISE,
        exercise: exercise,
        courseId: courseId,
        actualChapter: exercise.actualChapter,
        actualExercise: exercise.actualExercise,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
export const deleteExercise =
  (courseId, chapterId, exerciseId, actualExercise) => async (dispatch) => {
    try {
      await api.deleteExercise(courseId, chapterId, exerciseId, actualExercise);
      dispatch({
        type: DELETE_EXERCISE,
        courseId: courseId,
        chapterId: chapterId,
        exerciseId: exerciseId,
        actualExercise: actualExercise.actualExercise,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

export const changeActualExercise = (actualExercise) => {
  return {
    type: "CHANGE_ACTUAL_EXERCISE",
    payload: actualExercise,
  };
};
