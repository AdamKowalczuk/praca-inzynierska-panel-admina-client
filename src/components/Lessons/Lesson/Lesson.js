import React, { useState } from "react";
import "./lesson.scss";
// import { Link } from "react-router-dom";
// import AssignmentIcon from "@material-ui/icons/Assignment";
// import AssessmentIcon from "@material-ui/icons/Assessment";
// import EditIcon from "@material-ui/icons/Edit";
import Modal from "@material-ui/core/Modal";
import Button from "../../Button/Button";
import CloseIcon from "@material-ui/icons/Close";
import Pen from "../../../images/pen.svg";
import OpenBook from "../../../images/open-book.svg";
// import images from "./images";
// import images from "./images";
import Image from "./Image";

import "../../../modal.scss";
import {
  changeActualLesson,
  deleteLesson,
  updateLesson,
} from "../../../actions/courses";
import Delete from "../../../images/delete.svg";
import { useDispatch, useSelector } from "react-redux";
const Lesson = ({ lesson, id }) => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses);
  const actualCourse = useSelector((state) => state.actualCourse);
  const actualChapter = useSelector((state) => state.actualChapter);

  const courseId = courses[actualCourse]._id;
  const chapterId = courses[actualCourse].chapters[actualChapter]._id;

  // const imageName = lesson.image;
  // const image = imageName;
  // const image = require(`./images/${imageName}`).default;

  const [open, setOpen] = React.useState(false);
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
    name: lesson.name,
    description: lesson.description,
    isFinished: lesson.isFinished,
    _id: GenerateObjectId(),
    image: lesson.image,
    actualChapter: actualChapter,
    actualLesson: id,
  };

  const [form, setForm] = useState(initialState);
  const handleOpen = () => {
    setOpen(true);
  };
  const chooseImage = (e) => {
    // console.log(e);
    let image = e.target.src;
    console.log(image);
    let newImage = "";
    for (var i = 21; i < image.length; i++) {
      newImage += image.charAt(i);
    }
    console.log(newImage);
    setForm({ ...form, [e.target.name]: newImage });
  };
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleClose = (id) => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    if (form.image === "") {
      form.image = lesson.image;
    }
    console.log(form);
    e.preventDefault();
    dispatch(updateLesson(form, courseId, chapterId, form._id));
    handleClose();
  };
  return (
    <>
      <div className="course-container">
        <img
          src={Pen}
          alt="pen"
          className="edit-icon"
          onClick={() => {
            dispatch(changeActualLesson(id));
            handleOpen();
          }}
        />
        <img
          src={Delete}
          alt="delete"
          className="modal-delete-icon"
          onClick={() => {
            dispatch(changeActualLesson(id));
            dispatch(
              deleteLesson(
                courseId,
                courses[actualCourse].chapters[actualChapter]._id,
                lesson._id,
                { actualLesson: id }
              )
            );
          }}
        />
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
                onClick={() => handleClose(id)}
                style={{ color: courses[actualCourse].color }}
              />
            </div>

            <form action="patch" onSubmit={handleSubmit}>
              <label htmlFor="name">
                <h3>Nazwa lekcji</h3>
              </label>
              <input
                type="text"
                onChange={handleChange}
                value={form.name}
                name="name"
              />

              <label htmlFor="description">
                <h3>Opis lekcji</h3>
              </label>
              <textarea
                type="text"
                value={form.description}
                onChange={handleChange}
                name="description"
              />
              <div className="images-container">
                <Image chooseImage={(e) => chooseImage(e)} />
                {/* {images.map((image, id) => {
                  return (
                    <img
                      src={image.default}
                      alt={image.default}
                      key={id}
                      style={{ width: "50%" }}
                      onClick={chooseImage}
                      id="image"
                      name="image"
                    />
                  );
                })} */}
              </div>
              <div className="modal-button-container">
                <Button
                  type="submit"
                  color={courses[actualCourse].color}
                  text="Zatwierdź zmiany"
                  class="btn modal-button"
                ></Button>
              </div>
            </form>
          </div>
        </Modal>
        <h2 className="futura" style={{ color: courses[actualCourse].color }}>
          {lesson.name}
        </h2>
        <img
          style={{ width: "70%", marginLeft: "15%" }}
          src={lesson.image}
          alt={lesson.name}
        />

        <h3 className="course-h3">{lesson.description}</h3>
      </div>
    </>
  );
};

export default Lesson;
