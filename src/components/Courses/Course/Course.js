import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
import "./course.scss";
// import Accordion from "@material-ui/core/Accordion";
// import AccordionSummary from "@material-ui/core/AccordionSummary";
// import AccordionDetails from "@material-ui/core/AccordionDetails";
// import Typography from "@material-ui/core/Typography";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link } from "react-router-dom";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AssessmentIcon from "@material-ui/icons/Assessment";
import EditIcon from "@material-ui/icons/Edit";
import Modal from "@material-ui/core/Modal";
import Button from "../../Button/Button";
import CloseIcon from "@material-ui/icons/Close";
import Pen from "../../../images/pen.svg";
import OpenBook from "../../../images/open-book.svg";
import Lesson from "../../../images/board.svg";
import {
  changeCourseName,
  changeCourseDescription,
  changeActualCourse,
  // setCourseName,
} from "../../../actions/courses";
import "../../../modal.scss";
import { useDispatch, useSelector } from "react-redux";

const Course = ({ course, id }) => {
  let [courseName, courseDescription] = useState(false);
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses);

  courseName = courses[id].name;
  courseDescription = courses[id].description;

  const chapters = course.chapters;
  function sumLessons() {
    let sum = 0;
    chapters.forEach((chapter) => {
      sum += chapter.lessons.length;
    });
    return sum;
  }

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    // console.log(courseName);
    dispatch(changeCourseName(courseName));
    dispatch(changeCourseDescription(courseDescription));
    console.log("Open");
    setOpen(true);
  };

  const handleClose = (course, id) => {
    setOpen(false);
  };

  const handleSubmit = async (e, id) => {
    // e.preventDefault();
  };

  return (
    <>
      <div className="course-container">
        <img
          src={Pen}
          alt="pen"
          className="edit-icon"
          onClick={() => handleOpen()}
        />

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className="modal">
            <div className="modal-top">
              <CloseIcon
                className="close-icon"
                onClick={() => handleClose(courseName, id)}
              />
            </div>

            <form action="post">
              <label htmlFor="name">
                <h3>Nazwa kursu</h3>
              </label>
              <input type="text" value={courseName} name="courseName" />

              <label htmlFor="description">
                <h3>Opis kursu</h3>
              </label>
              <textarea
                type="text"
                value={courseDescription}
                id="description"
                name="description"
              />
              <div className="modal-button-container">
                <Button
                  type="submit"
                  text="Zatwierdź zmiany"
                  class="btn modal-button"
                ></Button>
              </div>
            </form>
          </div>
        </Modal>
        <h2 className="futura ">{courseName}</h2>
        <h3>{courseDescription}</h3>
        <div className="chapters-lessons-container">
          <Link className="link" to="/admin/rozdziały">
            <h4
              style={{ cursor: "pointer" }}
              onClick={() => dispatch(changeActualCourse(id))}
            >
              <img src={OpenBook} alt="lesson" />
              <p>{chapters.length}</p>
              <p className="italic">rozdziały</p>
            </h4>
          </Link>
          <h4>
            <img src={Lesson} alt="lesson" />
            <p>{sumLessons()}</p>
            <p className="italic ">lekcje</p>
          </h4>
        </div>
      </div>
    </>
  );
};

export default Course;
