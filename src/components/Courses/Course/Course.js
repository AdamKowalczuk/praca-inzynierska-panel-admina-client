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
} from "../../../actions/courses";
import "../../../modal.scss";
import { useDispatch } from "react-redux";
import Delete from "../../../images/delete.svg";
import icons from "./icons";
const Course = ({ course, id }) => {
  const dispatch = useDispatch();
  const initialState = {
    name: course.name,
    description: course.description,
    isFinished: course.isFinished,
    chapters: course.chapters,
    primaryColor: course.primaryColor,
    secondaryColor: course.secondaryColor,
    thirdColor: course.thirdColor,
    _id: course._id,
    icon: course.icon,
  };
  const [form, setForm] = useState(initialState);
  const chapters = course.chapters;

  function importAll(r) {
    let images = {};
    r.keys().map((item, index) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  }

  const images = importAll(
    require.context("./icons", false, /\.(png|jpe?g|svg)$/)
  );

  function sumLessons() {
    let sum = 0;
    chapters.forEach((chapter) => {
      sum += chapter.lessons.length;
    });
    return sum;
  }

  const [open, setOpen] = React.useState(false);
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

  function hexToRGB20(h) {
    let r = 0,
      g = 0,
      b = 0;
    r = "0x" + h[1] + h[2];
    g = "0x" + h[3] + h[4];
    b = "0x" + h[5] + h[6];
    return "rgb(" + +r + "," + +g + "," + +b + ",20%)";
  }
  function hexToRGB40(h) {
    let r = 0,
      g = 0,
      b = 0;
    r = "0x" + h[1] + h[2];
    g = "0x" + h[3] + h[4];
    b = "0x" + h[5] + h[6];
    return "rgb(" + +r + "," + +g + "," + +b + ",40%)";
  }
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    form.secondaryColor = hexToRGB20(form.primaryColor);
    form.thirdColor = hexToRGB40(form.primaryColor);
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
            <div
              className="modal-top"
              style={{
                backgroundColor: course.color,
              }}
            >
              <CloseIcon
                className="close-icon"
                style={{
                  color: course.color,
                }}
                onClick={() => handleClose()}
              />
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
              <label htmlFor="primaryColor">
                <h3>Wybierz kolor podstawowy</h3>
              </label>
              <input
                type="text"
                id="primaryColor"
                onChange={handleChange}
                name="primaryColor"
              />

              <div className="images-container">
                {icons.map((icon, id) => {
                  console.log(icon.default);
                  return (
                    <img
                      src={icon.default}
                      alt={icon.default}
                      key={id}
                      style={{
                        width: "25%",
                        backgroundColor: "#000",
                      }}
                      onClick={chooseIcon}
                      id="icon"
                      name="icon"
                    />
                  );
                })}
              </div>
              <div className="modal-button-container">
                <Button
                  type="submit"
                  text="Zatwierdź zmiany"
                  color={course.color}
                  class="btn modal-button"
                ></Button>
              </div>
            </form>
          </div>
        </Modal>
        <h2 style={{ marginTop: "-15px" }} className="bungee">
          {course.name}
        </h2>
        <img
          style={{ width: "40%", marginLeft: "30%" }}
          src={images[course.icon].default}
          alt={course.icon}
        />
        <h3 className="course-h3">{course.description}</h3>
        <div className="chapters-lessons-container">
          <Link className="link" to="/admin/rozdziały">
            <h4
              style={{
                cursor: "pointer",
              }}
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
