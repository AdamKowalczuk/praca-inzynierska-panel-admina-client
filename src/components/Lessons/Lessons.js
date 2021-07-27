import React from "react";
import "./lessons.scss";
import { useSelector } from "react-redux";
import Lesson from "./Lesson/Lesson.js";
import Topbar from "../Topbar/Topbar";
import Sidebar from "../Sidebar/Sidebar";
import Plus from "../../images/plus.svg";
const Lessons = () => {
  const actualCourse = useSelector((state) => state.actualCourse);
  const actualChapter = useSelector((state) => state.actualChapter);
  const lessons = useSelector(
    (state) => state.courses[actualCourse].chapters[actualChapter].lessons
  );

  return (
    <>
      <Topbar name="Rodziały" />
      <Sidebar />
      <div className="home-container">
        <div className="courses-container">
          {lessons.map((lesson, id) => (
            <Lesson key={lesson._id} id={id} lesson={lesson} />
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

export default Lessons;
