import axios from "axios";

const url = "http://localhost:5000/courses";
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
export const createCourse = (newCourse) => axios.post(url, newCourse);
export const updateCourse = (id, updatedCourse) =>
  axios.patch(`${url}/${id}`, updatedCourse);
export const deleteCourse = (id) => axios.delete(`${url}/${id}`);
