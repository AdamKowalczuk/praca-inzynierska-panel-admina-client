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
import icons from "./Course/icons";

const Courses = ({ setCurrentId }) => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses);
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
    isFinished: "false",
    chapters: [],
    color: "",
    _id: GenerateObjectId(),
    icon: "",
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
  const chooseIcon = (e) => {
    let icon = e.target.src;
    let newIcon = "";
    for (var i = 21; i < icon.length; i++) {
      newIcon += icon.charAt(i);
    }
    setForm({ ...form, [e.target.name]: newIcon });
  };
  const handleSubmit = (e) => {
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
            <input type="text" onChange={handleChange} name="name" />

            <label htmlFor="description">
              <h3>Opis kursu</h3>
            </label>

            <textarea type="text" onChange={handleChange} name="description" />
            <label htmlFor="color">
              <h3>Wybierz kolor</h3>
            </label>
            <input
              type="color"
              id="color"
              onChange={handleChange}
              name="color"
              // value="#ff0000"
            />
            <h3>Wybierz zdjęcie</h3>
            <div className="icons-container">
              {icons.map((icon, id) => {
                return (
                  <img
                    src={icon.default}
                    alt={icon.default}
                    key={id}
                    style={{ width: "25%" }}
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
