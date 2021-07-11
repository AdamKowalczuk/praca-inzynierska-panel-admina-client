import React from "react";
import { useDispatch } from "react-redux";

const Course = ({ course, setCurrentId }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  console.log("Single Course:", course);
  return (
    <>
      <div style={{ color: "red", padding: "20px" }}>
        <h3>{course.name}</h3>
        <p>{course.description}</p>
      </div>
    </>
  );
};

export default Course;
