import React from "react";
import Course from "./Course/Course";
import { useSelector } from "react-redux";
import Topbar from "../Topbar/Topbar";
import Sidebar from "../Sidebar/Sidebar";
import Plus from "../../images/plus.svg";

const Courses = ({ setCurrentId }) => {
  const courses = useSelector((state) => state.courses);
  console.log("Courses:", courses);

  return (
    <>
      <Topbar name="Kursy" />
      <Sidebar />
      <div className="home-container">
        <div className="courses-container">
          {courses.map((course, id) => (
            <Course
              key={course._id}
              id={id}
              course={course}
              setCurrentId={setCurrentId}
            />
          ))}
          <div className="course-container">
            <div className="add-container">
              <img className="add-image" src={Plus} alt="plus" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Courses;
