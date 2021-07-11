import React from "react";
import Course from "./Course/Course";
import { useSelector } from "react-redux";

const Courses = ({ setCurrentId }) => {
  const courses = useSelector((state) => state.courses);
  console.log("Courses:", courses);

  return (
    <>
      <h2 style={{ color: "red" }}>COURSES:</h2>
      {courses.map((course) => (
        <div key={course._id}>
          <Course course={course} setCurrentId={setCurrentId} />
        </div>
      ))}
    </>
  );
};

export default Courses;
