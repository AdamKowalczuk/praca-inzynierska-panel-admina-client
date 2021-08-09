import React, { useState } from "react";
import "./chapter.scss";
import { Link } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import Button from "../../Button/Button";
import CloseIcon from "@material-ui/icons/Close";
import Pen from "../../../images/pen.svg";
import Lesson from "../../../images/board.svg";
import {
  changeActualChapter,
  updateChapter,
  deleteChapter,
  // deleteChapter,
  // setCourseName,
} from "../../../actions/courses";
import "../../../modal.scss";
import Delete from "../../../images/delete.svg";
import { useDispatch, useSelector } from "react-redux";
const Chapter = ({ chapter, id }) => {
  const dispatch = useDispatch();
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
  const courses = useSelector((state) => state.courses);
  const actualCourse = useSelector((state) => state.actualCourse);
  const courseId = courses[actualCourse]._id;
  const initialState = {
    name: chapter.name,
    description: chapter.description,
    isFinished: chapter.isFinished,
    lessons: chapter.lessons,
    _id: GenerateObjectId(),
    actualChapter: id,
  };
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = useState(initialState);
  const handleOpen = () => {
    dispatch(changeActualChapter(id));
    setOpen(true);
  };
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("ChapterFORM", form);
    dispatch(updateChapter(form, courseId, form._id));
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
          onClick={() =>
            dispatch(
              deleteChapter(courseId, chapter._id, { actualChapter: id })
            )
          }
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
                <h3>Nazwa rozdziału</h3>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={handleChange}
                name="name"
              />

              <label htmlFor="description">
                <h3>Opis rozdziału</h3>
              </label>
              <textarea
                type="text"
                value={form.description}
                onChange={handleChange}
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
        <h2 className="futura ">{chapter.name}</h2>
        <h3>{chapter.description}</h3>
        <div className="chapters-lessons-container">
          <Link className="link" to="/admin/lekcje">
            <h4
              style={{ cursor: "pointer" }}
              onClick={() => dispatch(changeActualChapter(id))}
            >
              <img src={Lesson} alt="lesson" />
              <p className="italic ">liczba lekcji</p>
              <p>{chapter.lessons.length}</p>
            </h4>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Chapter;
