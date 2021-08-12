import React, { useState } from "react";
import "./chapters.scss";
import { useSelector, useDispatch } from "react-redux";
import Chapter from "./Chapter/Chapter.js";
import Topbar from "../Topbar/Topbar";
import Sidebar from "../Sidebar/Sidebar";
import Plus from "../../images/plus.svg";
import Button from "../Button/Button";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
import { createChapter } from "../../actions/courses";

const Chapters = () => {
  const dispatch = useDispatch();

  const courses = useSelector((state) => state.courses);
  const actualCourse = useSelector((state) => state.actualCourse);
  const id = courses[actualCourse]._id;
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
    lessons: [],
    _id: GenerateObjectId(),
  };
  const [form, setForm] = useState(initialState);
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
    setForm({ ...form, _id: GenerateObjectId() });
    e.preventDefault();
    dispatch(createChapter(form, id));
    handleClose();
  };

  return (
    <>
      <Topbar name="Rodziały" />
      <Sidebar />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className="modal">
          <div
            className="modal-top"
            style={{ backgroundColor: courses[actualCourse].color }}
          >
            <CloseIcon
              className="close-icon"
              style={{ color: courses[actualCourse].color }}
              onClick={() => handleClose()}
            />
          </div>

          <form action="post" onSubmit={handleSubmit}>
            <label htmlFor="name">
              <h3>Nazwa rozdziału</h3>
            </label>
            <input type="text" onChange={handleChange} name="name" />

            <label htmlFor="description">
              <h3>Opis rozdziału</h3>
            </label>
            <textarea type="text" onChange={handleChange} name="description" />
            <div className="modal-button-container">
              <Button
                type="submit"
                color={courses[actualCourse].color}
                text="Dodaj kurs"
                class="btn modal-button"
              ></Button>
            </div>
          </form>
        </div>
      </Modal>
      <div className="home-container">
        <div className="courses-container">
          {courses[actualCourse].chapters.map((chapter, id) => (
            <Chapter
              key={chapter._id}
              id={id}
              chapter={chapter}
              course={courses[actualCourse]}
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

export default Chapters;
