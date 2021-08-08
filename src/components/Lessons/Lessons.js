import React, { useState } from "react";
import "./lessons.scss";
import { useSelector, useDispatch } from "react-redux";
import Lesson from "./Lesson/Lesson.js";
import Topbar from "../Topbar/Topbar";
import Sidebar from "../Sidebar/Sidebar";
import Modal from "@material-ui/core/Modal";
import Plus from "../../images/plus.svg";
import Button from "../Button/Button";
import CloseIcon from "@material-ui/icons/Close";
import OpenBook from "../../images/open-book.svg";
import {
  // changeCourseName,
  // changeCourseDescription,
  // changeActualCourse,
  // changeActualLesson,
  createLesson,
  // setCourseName,
} from "../../actions/courses";
const Lessons = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses);
  const actualChapter = useSelector((state) => state.actualChapter);
  const actualCourse = useSelector((state) => state.actualCourse);
  const courseId = courses[actualCourse]._id;
  const chapterId = courses[actualCourse].chapters[actualChapter]._id;

  // const id = courses[actualCourse]._id;
  const lessons = useSelector(
    (state) => state.courses[actualCourse].chapters[actualChapter].lessons
  );
  function GenerateObjectId() {
    var ObjectId = (
      m = Math,
      d = Date,
      h = 16,
      s = (s) => m.floor(s).toString(h)
    ) =>
      s(d.now() / 1000) + " ".repeat(h).replace(/./g, () => s(m.random() * h));

    return ObjectId();
  }
  const initialState = {
    name: "",
    description: "",
    isFinished: false,
    image: "",
    _id: GenerateObjectId(),
    actualChapter: actualChapter,
  };
  const [form, setForm] = useState(initialState);
  const [open, setOpen] = React.useState(false);
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleOpen = () => {
    // dispatch(changeActualChapter(id));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    setForm({ ...form, _id: GenerateObjectId() });
    console.log("FormLessons", form);
    e.preventDefault();
    dispatch(createLesson(form, courseId, chapterId));
    handleClose();
  };

  return (
    <>
      <Topbar name="Lekcje" />
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
              <h3>Nazwa lekcji</h3>
            </label>
            <input type="text" onChange={handleChange} name="name" />

            <label htmlFor="description">
              <h3>Opis lekcji</h3>
            </label>
            <textarea type="text" onChange={handleChange} name="description" />
            <div className="add-photo-container">
              <img src={OpenBook} className="add-photo" alt="open book" />
              <p className="add-photo-text">Dodaj zdjęcie</p>
            </div>

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
      <div className="home-container">
        <div className="courses-container">
          {lessons.length > 0
            ? lessons.map((lesson, id) => (
                <Lesson key={lesson._id} id={id} lesson={lesson} />
              ))
            : null}
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

export default Lessons;
