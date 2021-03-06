import {
  FETCH_ALL_COURSES,
  FETCH_COURSE,
  CREATE_COURSE,
  CREATE_CHAPTER,
  UPDATE_COURSE,
  UPDATE_CHAPTER,
  UPDATE_LESSON,
  DELETE_COURSE,
  CREATE_LESSON,
  DELETE_CHAPTER,
  DELETE_LESSON,
  CREATE_QUIZ,
  UPDATE_QUIZ,
  DELETE_QUIZ,
  CREATE_EXERCISE,
  UPDATE_EXERCISE,
  DELETE_EXERCISE,
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
    case UPDATE_CHAPTER:
      return courses.map((course) => {
        if (course._id === action.courseId) {
          course.chapters[action.actualChapter] = action.chapter;
        }
        return course;
      });
    case UPDATE_LESSON:
      return courses.map((course) => {
        if (course._id === action.courseId) {
          course.chapters[action.actualChapter].lessons[action.actualLesson] =
            action.lesson;
        }
        return course;
      });
    case UPDATE_QUIZ:
      return courses.map((course) => {
        if (course._id === action.courseId) {
          course.chapters[action.actualChapter].quiz[action.actualQuiz] =
            action.quiz;
        }
        return course;
      });
    case UPDATE_EXERCISE:
      return courses.map((course) => {
        if (course._id === action.courseId) {
          course.chapters[action.actualChapter].exercises[
            action.actualExercise
          ] = action.exercise;
        }
        return course;
      });
    case CREATE_CHAPTER:
      return courses.map((course) => {
        if (course._id === action.id) {
          course.chapters.push(action.payload);
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
    case CREATE_QUIZ:
      return courses.map((course) => {
        if (course._id === action.courseId) {
          course.chapters.map((chapter) => {
            if (chapter._id === action.chapterId) {
              chapter.quiz.push(action.payload);
            }
          });
        }
        return course;
      });
    case CREATE_EXERCISE:
      return courses.map((course) => {
        if (course._id === action.courseId) {
          course.chapters.map((chapter) => {
            if (chapter._id === action.chapterId) {
              chapter.exercises.push(action.payload);
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
          course.chapters.splice(action.actualChapter, 1);
        }
        return course;
      });
    case DELETE_LESSON:
      return courses.map((course) => {
        if (course._id === action.courseId) {
          course.chapters.map((chapter) => {
            if (chapter._id === action.chapterId) {
              chapter.lessons.splice(action.actualLesson, 1);
            }
          });
        }
        return course;
      });
    case DELETE_QUIZ:
      return courses.map((course) => {
        if (course._id === action.courseId) {
          course.chapters.map((chapter) => {
            if (chapter._id === action.chapterId) {
              chapter.quiz.splice(action.actualQuiz, 1);
            }
          });
        }
        return course;
      });
    case DELETE_EXERCISE:
      return courses.map((course) => {
        if (course._id === action.courseId) {
          course.chapters.map((chapter) => {
            if (chapter._id === action.chapterId) {
              chapter.exercises.splice(action.actualExercise, 1);
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
