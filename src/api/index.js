import axios from "axios";

const url_course = "http://localhost:5000/courses";
const url_user = "http://localhost:5000/users";
const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});
export const fetchUsers = () => API.get("/users");
export const fetchCourses = () => API.get("/courses");
export const fetchCourse = (id) => API.get(`/courses/${id}`);

export const signIn = (formData) => API.post("/userAdmin/signin", formData);
export const createCourse = (newCourse) => axios.post(url_course, newCourse);
export const updateCourse = (updatedCourse, courseId) =>
  axios.patch(`${url_course}/${courseId}`, updatedCourse);
export const updateChapter = (chapter, courseId, chapterId) =>
  axios.patch(`${url_course}/${courseId}/chapters/${chapterId}`, chapter);
export const updateLesson = (lesson, courseId, chapterId, lessonId) =>
  axios.patch(
    `${url_course}/${courseId}/chapters/${chapterId}/lessons/${lessonId}`,
    lesson
  );
export const updateQuiz = (quiz, courseId, chapterId, quizId) =>
  axios.patch(
    `${url_course}/${courseId}/chapters/${chapterId}/quiz/${quizId}`,
    quiz
  );
export const updateExercise = (exercise, courseId, chapterId, exerciseId) =>
  axios.patch(
    `${url_course}/${courseId}/chapters/${chapterId}/exercises/${exerciseId}`,
    exercise
  );

export const createChapter = (newChapter, id) =>
  axios.post(`${url_course}/${id}/chapters`, newChapter);
export const createLesson = (newLesson, courseId, chapterId) =>
  axios.post(
    `${url_course}/${courseId}/chapters/${chapterId}/lessons`,
    newLesson
  );
export const createQuiz = (newQuiz, courseId, chapterId) =>
  axios.post(`${url_course}/${courseId}/chapters/${chapterId}/quiz`, newQuiz);
export const createExercise = (newExercise, courseId, chapterId) =>
  axios.post(
    `${url_course}/${courseId}/chapters/${chapterId}/exercises`,
    newExercise
  );

export const deleteCourse = (courseId) =>
  axios.delete(`${url_course}/${courseId}`);
export const deleteChapter = (courseId, chapterId, actualChapter) => {
  console.log("deleteChapter api");
  console.log(courseId, chapterId, actualChapter);
  axios.post(`${url_course}/${courseId}/chapters/${chapterId}`, actualChapter);
};
export const deleteLesson = (courseId, chapterId, lessonId, actualLesson) =>
  axios.post(
    `${url_course}/${courseId}/chapters/${chapterId}/lessons/${lessonId}`,
    actualLesson
  );
export const deleteQuiz = (courseId, chapterId, quizId, actualQuiz) =>
  axios.post(
    `${url_course}/${courseId}/chapters/${chapterId}/quiz/${quizId}`,
    actualQuiz
  );
export const deleteExercise = (
  courseId,
  chapterId,
  exerciseId,
  actualExercise
) =>
  axios.post(
    `${url_course}/${courseId}/chapters/${chapterId}/exercises/${exerciseId}`,
    actualExercise
  );
export const deleteUser = (id) => axios.delete(`${url_user}/${id}`);
