import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../constants/actionTypes.js";

export default (courses = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;

    case CREATE:
      return [...courses, action.payload];
    case UPDATE:
      return courses.map((course) =>
        course._id === action.payload._id ? action.payload : course
      );
    case DELETE:
      return courses.filter((course) => course._id !== action.payload);
    default:
      return courses;
  }
};
