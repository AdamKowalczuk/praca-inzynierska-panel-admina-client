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

export const signIn = (formData) => API.post("/userAdmin/signin", formData);
// export const signUp = (formData) => API.post("/userAdmin/signup", formData);
export const createCourse = (newCourse) => axios.post(url_course, newCourse);
export const updateCourse = (id, updatedCourse) =>
  axios.patch(`${url_course}/${id}`, updatedCourse);
export const deleteCourse = (id) => axios.delete(`${url_course}/${id}`);
export const deleteUser = (id) => axios.delete(`${url_user}/${id}`);
