import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
import "./course.scss";
// import Accordion from "@material-ui/core/Accordion";
// import AccordionSummary from "@material-ui/core/AccordionSummary";
// import AccordionDetails from "@material-ui/core/AccordionDetails";
// import Typography from "@material-ui/core/Typography";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
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
  // setCourseName,
} from "../../../actions/courses";
import { useDispatch, useSelector } from "react-redux";

const Course = ({ course, id, setCurrentId }) => {
  let [courseName, courseDescription] = useState(false);
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses);

  courseName = courses[id].name;
  courseDescription = courses[id].description;
  console.log("COURSE NAME", courseName);
  // dispatch(changeCourseName(courseName));

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
    // var test = document.getElementsByName("courseName")[0].baseURI;

    // console.log("Test:", test);
    setOpen(true);
  };

  const handleClose = (course, id) => {
    setOpen(false);
    // courses=

    console.log("LOL", courses[id].name);
    console.log("CLOSE:", course);
  };

  const changeName = async (e) => {
    console.log(e.target.value.value);
    dispatch(changeCourseName(e.target.value));
    courseName = e.target.value;
    console.log(courseName);
  };

  function changeDescription(e) {
    dispatch(changeCourseDescription(e.target.value));
    courseDescription = e.target.value;
    console.log(e.target.value);
  }
  const handleSubmit = async (e, id) => {
    // e.preventDefault();
    // dispatch(updateCourse(id, { ...courseData, name: user?.result?.name }));
  };

  return (
    <>
      <div className="course-container">
        {/* <EditIcon onClick={() => handleOpen()} className="edit-icon" /> */}
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
            <CloseIcon
              className="close-icon"
              onClick={() => handleClose(courseName, id)}
            />
            <form
              action="post"
              // onSubmit={handleSubmit()}
            >
              <label htmlFor="name">
                <h3>Nazwa kursu</h3>
              </label>
              <input
                type="text"
                value={courseName}
                // placeholder={courseName}
                // id="courseName"
                name="courseName"
                // className="courseName"
                onChange={(e) => changeName(e)}
              />

              <label htmlFor="description">
                <h3>Opis kursu</h3>
              </label>
              <textarea
                type="text"
                value={courseDescription}
                id="description"
                name="description"
                onChange={(e) => changeDescription(e)}
                // onChange={(e) =>
                //   function changeName2(e) {
                //     console.log(e.target.value.value);
                //   }
                // }
              />

              <Button
                type="submit"
                text="Zatwierdź zmiany"
                class="btn modal-button"
              ></Button>
            </form>
          </div>
        </Modal>
        <h2 className="futura">{courseName}</h2>
        <h3>{courseDescription}</h3>
        <div className="chapters-lessons-container">
          <h4>
            {/* <AssessmentIcon /> */}
            <img src={OpenBook} alt="lesson" />
            <p>{chapters.length}</p>
            <p className="italic">rozdziały</p>
          </h4>
          <h4>
            {/* <AssignmentIcon /> */}
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
