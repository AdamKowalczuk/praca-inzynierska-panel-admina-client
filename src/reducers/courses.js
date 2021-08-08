import {
  FETCH_ALL_COURSES,
  FETCH_COURSE,
  CREATE_COURSE,
  CREATE_CHAPTER,
  UPDATE_COURSE,
  DELETE_COURSE,
  CREATE_LESSON,
  DELETE_CHAPTER,
  DELETE_LESSON,
} from "../constants/actionTypes.js";

const courses = (courses = [], action) => {
  switch (action.type) {
    case FETCH_ALL_COURSES:
      return action.payload;
    case FETCH_COURSE:
      return { ...courses, course: action.payload.course };

    case CREATE_COURSE:
      return [...courses, action.payload];
    case UPDATE_COURSE:
      return courses.map((course) =>
        course._id === action.payload._id ? action.payload : course
      );
    case CREATE_CHAPTER:
      return courses.map((course) => {
        if (course._id === action.id) {
          course.chapters.push(action.payload);
          // return course;
        }

        return course;
      });
    case CREATE_LESSON:
      return courses.map((course) => {
        if (course._id === action.courseId) {
          course.chapters.map((chapter) => {
            if (chapter._id === action.chapterId) {
              chapter.lessons.push(action.payload);
            }
          });
        }
        return course;
      });
    case DELETE_COURSE:
      return courses.filter((course) => course._id !== action.payload);
    case DELETE_CHAPTER:
      return courses.map((course) => {
        if (course._id === action.courseId) {
          course.chapters.splice(action.actualChapter.actualChapter, 1);
        }
        return course;
      });
    case DELETE_LESSON:
      return courses.map((course) => {
        if (course._id === action.courseId) {
          course.chapters.map((chapter) => {
            if (chapter._id === action.chapterId) {
              chapter.lessons.splice(action.actualLesson.actualLesson, 1);
            }
          });
        }
        return course;
      });
    default:
      return courses;
  }
};

export default courses;
