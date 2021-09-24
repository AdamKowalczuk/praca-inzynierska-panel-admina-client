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
} from "../../../actions/courses";

import "../../../modal.scss";
import Delete from "../../../images/delete.svg";
import { useDispatch, useSelector } from "react-redux";
import Quiz from "../../../images/quiz.svg";

import icons2 from "./icons";

function importAll(r) {
  let images = [];
  r.keys().map((item, index) => {
    images.push(r(item));
  });
  return images;
}

const images = importAll(
  require.context("./icons", false, /\.(png|jpe?g|svg)$/)
);
function importAll2(r) {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

const images2 = importAll2(
  require.context("./icons", false, /\.(png|jpe?g|svg)$/)
);

const Icon = (props) => {
  console.log(props.chooseIcon);
  return (
    <>
      {images.map((image, id) => {
        return (
          <img
            src={image.default}
            alt={image.default}
            key={id}
            style={{ width: "50%" }}
            onClick={props.chooseIcon}
            id="icon"
            name="icon"
          />
        );
      })}
    </>
  );
};

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
    icon: chapter.icon,
    _id: GenerateObjectId(),
    quiz: chapter.quiz,
    isQuizCompleted: chapter.isQuizCompleted,
    isExerciseCompleted: chapter.isExerciseCompleted,
    actualChapter: id,
  };
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = useState(initialState);
  const handleOpen = () => {
    dispatch(changeActualChapter(id));
    setOpen(true);
  };
  const chooseIcon = (e) => {
    let icon = e.target.src;
    console.log(icon);
    let newIcon = "";
    for (var i = 35; i < icon.length; i++) {
      if (icon.charAt(i) === ".") {
        break;
      }
      newIcon += icon.charAt(i);
    }
    newIcon += ".svg";
    setForm({ ...form, [e.target.name]: newIcon });
    console.log(newIcon);
  };
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
              <div className="images-container">
                <Icon chooseIcon={(e) => chooseIcon(e)} />
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
          {chapter.name}
        </h2>
        <img
          style={{ width: "70%", marginLeft: "15%" }}
          src={images2[chapter.icon].default}
          alt={chapter.icon}
        />
        <h3 className="course-h3">{chapter.description}</h3>
        <div className="chapters-lessons-container">
          <Link className="link" to="/admin/lekcje">
            <h4
              style={{
                cursor: "pointer",
                backgroundColor: courses[actualCourse].color,
              }}
              onClick={() => dispatch(changeActualChapter(id))}
            >
              <img src={Lesson} alt="lesson" />
              <p className="italic ">Lekcje</p>
            </h4>
          </Link>
          <Link className="link" to="/admin/quizy">
            <h4
              style={{
                cursor: "pointer",
                backgroundColor: courses[actualCourse].color,
              }}
              onClick={() => dispatch(changeActualChapter(id))}
            >
              <img src={Quiz} alt="lesson" />
              <p className="italic ">Quizy</p>
            </h4>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Chapter;
