import {
  FETCH_ALL_COURSES,
  FETCH_COURSE,
  CREATE_COURSE,
  DELETE_COURSE,
  DELETE_CHAPTER,
  DELETE_LESSON,
  CREATE_CHAPTER,
  CREATE_LESSON,
  UPDATE_COURSE,
  UPDATE_CHAPTER,
  UPDATE_LESSON,
} from "../constants/actionTypes";

import * as api from "../api/index.js";

export const getCourses = () => async (dispatch) => {
  try {
    const { data } = await api.fetchCourses();
    dispatch({ type: FETCH_ALL_COURSES, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
export const getCourse = (id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_COURSE });

    const { data } = await api.fetchCourse(id);

    dispatch({ type: FETCH_COURSE, payload: { course: data } });
  } catch (error) {
    console.log(error);
  }
};

export const createCourse = (course) => async (dispatch) => {
  try {
    const { data } = await api.createCourse(course);
    dispatch({ type: CREATE_COURSE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
export const updateCourse = (course, courseId) => async (dispatch) => {
  try {
    const { data } = await api.updateCourse(course, courseId);

    dispatch({ type: UPDATE_COURSE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateChapter =
  (chapter, courseId, chapterId) => async (dispatch) => {
    try {
      const { data } = await api.updateChapter(chapter, courseId, chapterId);
      dispatch({
        type: UPDATE_CHAPTER,
        chapter: chapter,
        courseId: courseId,
        actualChapter: chapter.actualChapter,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
export const updateLesson =
  (lesson, courseId, chapterId, lessonId) => async (dispatch) => {
    try {
      const { data } = await api.updateLesson(
        lesson,
        courseId,
        chapterId,
        lessonId
      );
      dispatch({
        type: UPDATE_LESSON,
        lesson: lesson,
        courseId: courseId,
        actualChapter: lesson.actualChapter,
        actualLesson: lesson.actualLesson,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
export const createChapter = (chapter, id) => async (dispatch) => {
  try {
    const { data } = await api.createChapter(chapter, id);
    dispatch({ type: CREATE_CHAPTER, payload: chapter, id: id });
  } catch (error) {
    console.log(error.message);
  }
};

export const createLesson =
  (lesson, courseId, chapterId, actualChapter) => async (dispatch) => {
    try {
      const { data } = await api.createLesson(lesson, courseId, chapterId);

      dispatch({
        type: CREATE_LESSON,
        payload: lesson,
        courseId: courseId,
        chapterId: chapterId,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

export const deleteCourse = (courseId) => async (dispatch) => {
  try {
    await api.deleteCourse(courseId);

    dispatch({ type: DELETE_COURSE, payload: courseId });
  } catch (error) {
    console.log(error.message);
  }
};
export const deleteChapter =
  (courseId, chapterId, actualChapter) => async (dispatch) => {
    try {
      await api.deleteChapter(courseId, chapterId, actualChapter);

      dispatch({
        type: DELETE_CHAPTER,
        courseId: courseId,
        chapterId: chapterId,
        actualChapter: actualChapter.actualChapter,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
export const deleteLesson =
  (courseId, chapterId, lessonId, actualLesson) => async (dispatch) => {
    try {
      await api.deleteLesson(courseId, chapterId, lessonId, actualLesson);
      dispatch({
        type: DELETE_LESSON,
        courseId: courseId,
        chapterId: chapterId,
        lessonId: lessonId,
        actualLesson: actualLesson.actualLesson,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

export const changeActualCourse = (actualCourse) => {
  return {
    type: "CHANGE_ACTUAL_COURSE",
    payload: actualCourse,
  };
};
export const changeActualChapter = (actualChapter) => {
  return {
    type: "CHANGE_ACTUAL_CHAPTER",
    payload: actualChapter,
  };
};
export const changeActualLesson = (actualLesson) => {
  return {
    type: "CHANGE_ACTUAL_LESSON",
    payload: actualLesson,
  };
};
