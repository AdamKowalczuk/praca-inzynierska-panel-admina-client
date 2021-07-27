import React from "react";
import "./lesson.scss";
import { Link } from "react-router-dom";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AssessmentIcon from "@material-ui/icons/Assessment";
import EditIcon from "@material-ui/icons/Edit";
import Modal from "@material-ui/core/Modal";
import Button from "../../Button/Button";
import CloseIcon from "@material-ui/icons/Close";
import Pen from "../../../images/pen.svg";
import OpenBook from "../../../images/open-book.svg";
import {
  changeCourseName,
  changeCourseDescription,
  changeActualCourse,
  changeActualChapter,
  // setCourseName,
} from "../../../actions/courses";
import { useDispatch, useSelector } from "react-redux";
const Lesson = ({ lesson, id }) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="course-container">
        <img
          src={Pen}
          alt="pen"
          className="edit-icon"
          // onClick={() => handleOpen()}
        />
        <h2 className="futura ">{lesson.name}</h2>
        <img
          style={{ width: "70%", marginLeft: "15%" }}
          src={OpenBook}
          alt={lesson.name}
        />
        <h3>{lesson.description}</h3>
        {/* <div className="chapters-lessons-container">

  </div> */}
      </div>
    </>
  );
};

export default Lesson;
