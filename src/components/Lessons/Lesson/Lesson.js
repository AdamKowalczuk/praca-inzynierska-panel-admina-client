import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import Button from "../../Button/Button";
import CloseIcon from "@material-ui/icons/Close";
import Pen from "../../../images/pen.svg";
import OpenBook from "../../../images/open-book.svg";

import "../../../modal.scss";
import {
  changeActualLesson,
  deleteLesson,
  updateLesson,
} from "../../../actions/courses";
import Delete from "../../../images/delete.svg";
import { useDispatch, useSelector } from "react-redux";

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

const Image = (props) => {
  return (
    <>
      {images.map((image, id) => {
        return (
          <>
            <h3>{image.default}</h3>
            <img
              className="lesson-image"
              src={image.default}
              alt={image.default}
              key={id}
              style={{ width: "50%" }}
              onClick={props.chooseImage}
              id="icon"
              name="image"
            />
          </>
        );
      })}
    </>
  );
};

const Lesson = ({ lesson, id }) => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses);
  const actualCourse = useSelector((state) => state.actualCourse);
  const actualChapter = useSelector((state) => state.actualChapter);
  const courseId = courses[actualCourse]._id;
  const chapterId = courses[actualCourse].chapters[actualChapter]._id;
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

  switch (actualCourse) {
    case 0:
      images = importAll(
        require.context("./images/html", false, /\.(png|jpe?g|bmp|svg)$/)
      );
      break;
    case 1:
      images = importAll(
        require.context("./images/css", false, /\.(png|jpe?g|bmp|svg)$/)
      );
      break;
    case 2:
      images = importAll(
        require.context("./images/javascript", false, /\.(png|jpe?g|bmp|svg)$/)
      );
      break;
    default:
      images = "";
      break;
  }

  switch (actualCourse) {
    case 0:
      images2 = importAll2(
        require.context("./images/html", false, /\.(png|jpe?g|bmp|svg)$/)
      );
      break;
    case 1:
      images2 = importAll2(
        require.context("./images/css", false, /\.(png|jpe?g|bmp|svg)$/)
      );
      break;
    case 2:
      images2 = importAll2(
        require.context("./images/javascript", false, /\.(png|jpe?g|bmp|svg)$/)
      );
      break;
    default:
      images2 = "";
      break;
  }
  const handleOpen = () => {
    setOpen(true);
  };
  const chooseImage = (e) => {
    let image = e.target.src;
    let newImage = "";
    for (var i = 35; i < image.length; i++) {
      if (image.charAt(i) === ".") {
        break;
      }
      newImage += image.charAt(i);
    }
    if (image[image.length - 1] === "p") {
      newImage += ".bmp";
    } else {
      newImage += ".svg";
    }
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
        <h2 className="futura" style={{ color: courses[actualCourse].color }}>
          {lesson.name}
        </h2>
        <img
          style={{ width: "90%", marginLeft: "5%", marginTop: "15px" }}
          src={images2[lesson.image].default}
          alt={lesson.name}
        />

        <h3 className="course-h3">{lesson.description}</h3>
      </div>
    </>
  );
};

export default Lesson;
