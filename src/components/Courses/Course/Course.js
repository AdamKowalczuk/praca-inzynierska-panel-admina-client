import React, { useState } from "react";
import "./course.scss";
import { Link } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import Button from "../../Button/Button";
import CloseIcon from "@material-ui/icons/Close";
import Pen from "../../../images/pen.svg";
import OpenBook from "../../../images/open-book.svg";
import Lesson from "../../../images/board.svg";
import {
  changeActualCourse,
  updateCourse,
  deleteCourse,
  // setCourseName,
} from "../../../actions/courses";
import "../../../modal.scss";
import { useDispatch } from "react-redux";
import Delete from "../../../images/delete.svg";

const Course = ({ course, id }) => {
  // let [courseName, courseDescription] = useState(false);
  const dispatch = useDispatch();
  // console.log(course);
  // const courses = useSelector((state) => state.courses);
  const initialState = {
    name: course.name,
    description: course.description,
    isFinished: course.isFinished,
    chapters: course.chapters,
  };
  const [form, setForm] = useState(initialState);
  const chapters = course.chapters;
  function sumLessons() {
    let sum = 0;
    chapters.forEach((chapter) => {
      sum += chapter.lessons.length;
    });
    return sum;
  }

  const [open, setOpen] = React.useState(false);
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCourse(form, course._id));
    handleClose();
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
        <img
          src={Delete}
          alt="delete"
          className="modal-delete-icon"
          onClick={() => dispatch(deleteCourse(course._id))}
        />

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

            <form action="patch" onSubmit={handleSubmit}>
              <label htmlFor="name">
                <h3>Nazwa kursu</h3>
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
              />

              <label htmlFor="description">
                <h3>Opis kursu</h3>
              </label>
              <textarea
                type="text"
                name="description"
                value={form.description}
                onChange={handleChange}
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
        <h2 className="futura ">{course.name}</h2>
        <h3>{course.description}</h3>
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
