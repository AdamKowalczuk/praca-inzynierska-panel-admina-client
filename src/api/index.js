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
// export const signUp = (formData) => API.post("/userAdmin/signup", formData);
export const createCourse = (newCourse) => axios.post(url_course, newCourse);
export const updateCourse = (updatedCourse, id) =>
  axios.patch(`${url_course}/${id}`, updatedCourse);
export const updateChapter = (updatedChapter, id) =>
  axios.patch(`${url_course}/${id}`, updatedChapter);
export const updateLesson = (updatedLesson, id) =>
  axios.patch(`${url_course}/${id}`, updatedLesson);

export const createChapter = (newChapter, id) =>
  axios.post(`${url_course}/${id}/chapters`, newChapter);
export const createLesson = (newLesson, courseId, chapterId) =>
  axios.post(
    `${url_course}/${courseId}/chapters/${chapterId}/lessons`,
    newLesson
  );

export const deleteCourse = (courseId) =>
  axios.delete(`${url_course}/${courseId}`);
export const deleteChapter = (courseId, chapterId, actualChapter) => {
  console.log(courseId, chapterId, actualChapter);
  axios.patch(`${url_course}/${courseId}/chapters/${chapterId}`, actualChapter);
};
export const deleteLesson = (courseId, chapterId, lessonId, actualLesson) =>
  axios.patch(
    `${url_course}/${courseId}/chapters/${chapterId}/lessons/${lessonId}`,
    actualLesson
  );

export const deleteUser = (id) => axios.delete(`${url_user}/${id}`);
