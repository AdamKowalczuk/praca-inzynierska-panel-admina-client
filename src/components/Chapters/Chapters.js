import React from "react";
import "./chapters.scss";
import { useSelector } from "react-redux";
import Chapter from "./Chapter/Chapter.js";
import Topbar from "../Topbar/Topbar";
import Sidebar from "../Sidebar/Sidebar";
import Plus from "../../images/plus.svg";

const Chapters = () => {
  const courses = useSelector((state) => state.courses);
  const actualCourse = useSelector((state) => state.actualCourse);
  return (
    <>
      <Topbar name="Rodziały" />
      <Sidebar />
      <div className="home-container">
        <div className="courses-container">
          {courses[actualCourse].chapters.map((chapter, id) => (
            <Chapter key={chapter._id} id={id} chapter={chapter} />
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

export default Chapters;
