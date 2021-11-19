import React, { useState } from "react";
import "./chapter.scss";
import { Link } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import Button from "../../Button/Button";
import CloseIcon from "@material-ui/icons/Close";
import Pen from "../../../images/pen.svg";
import Lesson from "../../../images/board.svg";
import Exercise from "../../../images/exercise.svg";
import {
  changeActualChapter,
  updateChapter,
  deleteChapter,
} from "../../../actions/courses";

import "../../../modal.scss";
import Delete from "../../../images/delete.svg";
import { useDispatch, useSelector } from "react-redux";
import Quiz from "../../../images/quiz.svg";
import { jssPreset } from "@material-ui/styles";
function importAll(r) {
  let images = [];
  r.keys().map((item, index) => {
    images.push(r(item));
  });
  return images;
}

function importAll2(r) {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}
let images;
let images2;

const Icon = (props) => {
  return (
    <>
      {images.map((image, id) => {
        return (
          <img
            src={image.default}
            alt={image.default}
            key={id}
            className="modal-icon"
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
    exercises: chapter.exercises,
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
    let newIcon = "";
    for (var i = 35; i < icon.length; i++) {
      if (icon.charAt(i) === ".") {
        break;
      }
      newIcon += icon.charAt(i);
    }
    newIcon += ".svg";
    setForm({ ...form, [e.target.name]: newIcon });
  };
  switch (actualCourse) {
    case 0:
      images = importAll(
        require.context("./icons/html", false, /\.(png|jpe?g|svg)$/)
      );
      break;
    case 1:
      images = importAll(
        require.context("./icons/css", false, /\.(png|jpe?g|svg)$/)
      );
      break;
    case 2:
      images = importAll(
        require.context("./icons/javascript", false, /\.(png|jpe?g|svg)$/)
      );
      break;
    default:
      images = "";
      break;
  }
  switch (actualCourse) {
    case 0:
      images2 = importAll2(
        require.context("./icons/html", false, /\.(png|jpe?g|svg)$/)
      );
      break;
    case 1:
      images2 = importAll2(
        require.context("./icons/css", false, /\.(png|jpe?g|svg)$/)
      );
      break;
    case 2:
      images2 = importAll2(
        require.context("./icons/javascript", false, /\.(png|jpe?g|svg)$/)
      );
      break;
    default:
      images2 = "";
      break;
  }
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
              <h3 style={{ marginBottom: "10px" }}>Wybierz zdjęcie:</h3>
              <div className="images-container">
                <Icon chooseIcon={(e) => chooseIcon(e)} />
              </div>
              {/* <div className="modal-button-container">
                <Button
                  type="submit"
                  color={courses[actualCourse].color}
                  text="Zatwierdź zmiany"
                  class="btn modal-button"
                ></Button>
              </div> */}
            </form>
            <div className="modal-bottom">
              <div className="modal-button-container">
                <Button
                  type="submit"
                  text="Zatwierdź zmiany"
                  class="btn modal-button"
                ></Button>
              </div>
            </div>
          </div>
        </Modal>
        <h2 className="futura" style={{ color: courses[actualCourse].color }}>
          {chapter.name}
        </h2>
        <img
          style={{ width: "50%", marginLeft: "25%" }}
          src={images2[chapter.icon].default}
          alt={chapter.icon}
        />
        <div
          className="chapters-lessons-container"
          style={{ marginTop: "50px" }}
        >
          <Link className="link" to="/admin/lekcje">
            <h4
              style={{
                cursor: "pointer",
                backgroundColor: courses[actualCourse].color,
              }}
              onClick={() => dispatch(changeActualChapter(id))}
              className="chapter-link"
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
              className="chapter-link"
            >
              <img src={Quiz} alt="lesson" />
              <p className="italic ">Quizy</p>
            </h4>
          </Link>
          <Link className="link" to="/admin/zadania">
            <h4
              style={{
                cursor: "pointer",
                backgroundColor: courses[actualCourse].color,
              }}
              onClick={() => dispatch(changeActualChapter(id))}
              className="chapter-link"
            >
              <img src={Exercise} alt="exercise" />
              <p className="italic ">Zadania</p>
            </h4>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Chapter;
