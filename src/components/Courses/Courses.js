import React, { useState } from "react";
import Course from "./Course/Course";
import { useSelector, useDispatch } from "react-redux";
import Topbar from "../Topbar/Topbar";
import Sidebar from "../Sidebar/Sidebar";
import Plus from "../../images/plus.svg";
import Button from "../Button/Button";
import CloseIcon from "@material-ui/icons/Close";
import Modal from "@material-ui/core/Modal";
import { createCourse } from "../../actions/courses";
// import {
//   changeCourseName,
//   changeCourseDescription,
//   changeActualCourse,
//   setCourseName,
// } from "../../actions/courses";

const initialState = {
  name: "",
  description: "",
  isFinished: "false",
  chapters: [],
};
const Courses = ({ setCurrentId }) => {
  const [form, setForm] = useState(initialState);
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses);
  // console.log(courses);
  // const courseName = useSelector((state) => state.courseName);
  // const courseDescription = useSelector((state) => state.courseDescription);
  // let newCourseModal = false;
  const [open, setOpen] = React.useState(false);
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (course, id) => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    console.log("Form", form);
    e.preventDefault();
    dispatch(createCourse(form));
    handleClose();
  };
  return (
    <>
      <Topbar name="Kursy" />
      <Sidebar />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className="modal">
          <div className="modal-top">
            <CloseIcon className="close-icon" onClick={() => handleClose()} />
          </div>

          <form action="post" onSubmit={handleSubmit}>
            <label htmlFor="name">
              <h3>Nazwa kursu</h3>
            </label>
            <input
              type="text"
              onChange={handleChange}
              name="name"
              // value={courseName}
              // onChange={(e) => onChangeCourseName(e.target.value)}
            />

            <label htmlFor="description">
              <h3>Opis kursu</h3>
            </label>
            <textarea
              type="text"
              // value={courseDescription}
              // onChange={(e) => onChangeCourseDescription(e.target.value)}
              onChange={handleChange}
              name="description"
            />
            <div className="modal-button-container">
              <Button
                type="submit"
                text="Dodaj kurs"
                class="btn modal-button"
              ></Button>
            </div>
          </form>
        </div>
      </Modal>
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
            <div className="add-container" onClick={() => handleOpen()}>
              <img className="add-image" src={Plus} alt="plus" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Courses;
