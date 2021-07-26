import {
  FETCH_ALL_COURSES,
  CREATE_COURSE,
  UPDATE_COURSE,
  DELETE_COURSE,
} from "../constants/actionTypes";

import * as api from "../api/index.js";

export const getCourses = () => async (dispatch) => {
  try {
    const { data } = await api.fetchCourses();
    console.log("Get Courses", data);
    dispatch({ type: FETCH_ALL_COURSES, payload: data });
  } catch (error) {
    console.log(error.message);
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

export const updateCourse = (id, course) => async (dispatch) => {
  try {
    const { data } = await api.updateCourse(id, course);

    dispatch({ type: UPDATE_COURSE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const changeCourseName = (courseName) => {
  return {
    type: "CHANGE_COURSE_NAME",
    payload: courseName,
  };
};

// export const changeCourseName = (id, course) => async (dispatch) => {
//   try {
//     const { data } = await api.updatePost(id, course);

//     dispatch({ type: UPDATE, payload: data });
//   } catch (error) {
//     console.log(error);
//   }
// };
export const changeCourseDescription = (courseDescription) => {
  return {
    type: "CHANGE_COURSE_DESCRIPTION",
    payload: courseDescription,
  };
};

export const deleteCourse = (id) => async (dispatch) => {
  try {
    await api.deleteCourse(id);

    dispatch({ type: DELETE_COURSE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};
