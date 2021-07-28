import {
  FETCH_ALL_COURSES,
  CREATE_COURSE,
  UPDATE_COURSE,
  DELETE_COURSE,
} from "../constants/actionTypes.js";

// export default (courses = [], action) => {
//   switch (action.type) {
//     case FETCH_ALL_COURSES:
//       return action.payload;

//     case CREATE_COURSE:
//       return [...courses, action.payload];
//     case UPDATE_COURSE:
//       return courses.map((course) =>
//         course._id === action.payload._id ? action.payload : course
//       );
//     case DELETE_COURSE:
//       return courses.filter((course) => course._id !== action.payload);
//     default:
//       return courses;
//   }
// };

const courses = (courses = [], action) => {
  switch (action.type) {
    case FETCH_ALL_COURSES:
      return action.payload;

    case CREATE_COURSE:
      return [...courses, action.payload];
    case UPDATE_COURSE:
      return courses.map((course) =>
        course._id === action.payload._id ? action.payload : course
      );
    case DELETE_COURSE:
      return courses.filter((course) => course._id !== action.payload);
    default:
      return courses;
  }
};

export default courses;
