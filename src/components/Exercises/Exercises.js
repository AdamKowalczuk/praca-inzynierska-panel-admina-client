import React, { useState } from "react";
import Topbar from "../Topbar/Topbar";
import Sidebar from "../Sidebar/Sidebar";
import Pen from "../../images/pen.svg";
import Plus from "../../images/plus.svg";
import Delete from "../../images/delete.svg";
import { useDispatch, useSelector } from "react-redux";
import { createExercise } from "../../actions/exercise";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
import Button from "../Button/Button";
import "../../modal.scss";
import Exercise from "./Exercise/Exercise";

const Exercises = () => {
  const dispatch = useDispatch();

  const courses = useSelector((state) => state.courses);
  const actualCourse = useSelector((state) => state.actualCourse);
  const actualChapter = useSelector((state) => state.actualChapter);
  const courseId = courses[actualCourse]._id;
  const chapterId = courses[actualCourse].chapters[actualChapter]._id;
  const chapter = courses[actualCourse].chapters[actualChapter];
  const initialState = {
    description: "",
    option1: "",
    correctNumber1: "",
    option2: "",
    correctNumber2: "",
    option3: "",
    correctNumber3: "",
    option4: "",
    correctNumber4: "",
    option5: "",
    correctNumber5: "",
    option6: "",
    correctNumber6: "",
    option7: "",
    correctNumber7: "",
    option8: "",
    correctNumber8: "",
    option9: "",
    correctNumber9: "",
    option10: "",
    correctNumber10: "",
    options: [],
    isFinished: false,
    _id: GenerateObjectId(),
    actualChapter: actualChapter,
  };
  const [form, setForm] = useState(initialState);
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

  const [open, setOpen] = React.useState(false);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.option1 !== "") {
      form.options.push({
        name: form.option1,
        correctNumber: form.correctNumber1,
        isUsed: false,
        selectedNumber: "",
      });
    }
    if (form.option2 !== "") {
      form.options.push({
        name: form.option2,
        correctNumber: form.correctNumber2,
        isUsed: false,
        selectedNumber: "",
      });
    }
    if (form.option3 !== "") {
      form.options.push({
        name: form.option3,
        correctNumber: form.correctNumber3,
        isUsed: false,
        selectedNumber: "",
      });
    }
    if (form.option4 !== "") {
      form.options.push({
        name: form.option4,
        correctNumber: form.correctNumber4,
        isUsed: false,
        selectedNumber: "",
      });
    }
    if (form.option5 !== "") {
      form.options.push({
        name: form.option5,
        correctNumber: form.correctNumber5,
        isUsed: false,
        selectedNumber: "",
      });
    }
    if (form.option6 !== "") {
      form.options.push({
        name: form.option6,
        correctNumber: form.correctNumber6,
        isUsed: false,
        selectedNumber: "",
      });
    }
    if (form.option7 !== "") {
      form.options.push({
        name: form.option7,
        correctNumber: form.correctNumber7,
        isUsed: false,
        selectedNumber: "",
      });
    }
    if (form.option8 !== "") {
      form.options.push({
        name: form.option8,
        correctNumber: form.correctNumber8,
        isUsed: false,
        selectedNumber: "",
      });
    }
    if (form.option9 !== "") {
      form.options.push({
        name: form.option9,
        correctNumber: form.correctNumber9,
        isUsed: false,
        selectedNumber: "",
      });
    }
    if (form.option10 !== "") {
      form.options.push({
        name: form.option10,
        correctNumber: form.correctNumber10,
        isUsed: false,
        selectedNumber: "",
      });
    }

    delete form.option1;
    delete form.option2;
    delete form.option3;
    delete form.option4;
    delete form.option5;
    delete form.option6;
    delete form.option7;
    delete form.option8;
    delete form.option9;
    delete form.option10;

    delete form.correctNumber1;
    delete form.correctNumber2;
    delete form.correctNumber3;
    delete form.correctNumber4;
    delete form.correctNumber5;
    delete form.correctNumber6;
    delete form.correctNumber7;
    delete form.correctNumber8;
    delete form.correctNumber9;
    delete form.correctNumber10;
    dispatch(createExercise(form, courseId, chapterId));
    handleClose();
    setForm({ ...initialState });
  };

  return (
    <>
      <Topbar name="Zadania" />
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

          <form action="patch" onSubmit={handleSubmit}>
            <label htmlFor="description">
              <h3>Opis</h3>
            </label>
            <textarea
              type="text"
              value={form.description}
              onChange={handleChange}
              name="description"
            />
            <label htmlFor="option1">
              <h3>Opcja1</h3>
            </label>
            <textarea
              type="text"
              value={form.option1}
              onChange={handleChange}
              name="option1"
            />
            <label htmlFor="correctNumber1">
              <h3>Poprawny numer1</h3>
            </label>
            <input
              type="number"
              value={form.correctNumber1}
              onChange={handleChange}
              name="correctNumber1"
            />
            <label htmlFor="option2">
              <h3>Opcja2</h3>
            </label>
            <textarea
              type="text"
              value={form.option2}
              onChange={handleChange}
              name="option2"
            />
            <label htmlFor="correctNumber2">
              <h3>Poprawny numer2</h3>
            </label>
            <input
              type="number"
              value={form.correctNumber2}
              onChange={handleChange}
              name="correctNumber2"
            />
            <label htmlFor="option3">
              <h3>Opcja3</h3>
            </label>
            <textarea
              type="text"
              value={form.option3}
              onChange={handleChange}
              name="option3"
            />
            <label htmlFor="correctNumber3">
              <h3>Poprawny numer3</h3>
            </label>
            <input
              type="number"
              value={form.correctNumber3}
              onChange={handleChange}
              name="correctNumber3"
            />
            <label htmlFor="option4">
              <h3>Opcja4</h3>
            </label>
            <textarea
              type="text"
              value={form.option4}
              onChange={handleChange}
              name="option4"
            />
            <label htmlFor="correctNumber4">
              <h3>Poprawny numer4</h3>
            </label>
            <input
              type="number"
              value={form.correctNumber4}
              onChange={handleChange}
              name="correctNumber4"
            />
            <label htmlFor="option5">
              <h3>Opcja5</h3>
            </label>
            <textarea
              type="text"
              value={form.option5}
              onChange={handleChange}
              name="option5"
            />
            <label htmlFor="correctNumber5">
              <h3>Poprawny numer5</h3>
            </label>
            <input
              type="number"
              value={form.correctNumber5}
              onChange={handleChange}
              name="correctNumber5"
            />
            <label htmlFor="option1">
              <h3>Opcja6</h3>
            </label>
            <textarea
              type="text"
              value={form.option6}
              onChange={handleChange}
              name="option6"
            />
            <label htmlFor="correctNumber6">
              <h3>Poprawny numer6</h3>
            </label>
            <input
              type="number"
              value={form.correctNumber6}
              onChange={handleChange}
              name="correctNumber6"
            />
            <label htmlFor="option7">
              <h3>Opcja7</h3>
            </label>
            <textarea
              type="text"
              value={form.option7}
              onChange={handleChange}
              name="option7"
            />
            <label htmlFor="correctNumber7">
              <h3>Poprawny numer7</h3>
            </label>
            <input
              type="number"
              value={form.correctNumber7}
              onChange={handleChange}
              name="correctNumber7"
            />
            <label htmlFor="option8">
              <h3>Opcja8</h3>
            </label>
            <textarea
              type="text"
              value={form.option8}
              onChange={handleChange}
              name="option8"
            />
            <label htmlFor="correctNumber8">
              <h3>Poprawny numer8</h3>
            </label>
            <input
              type="number"
              value={form.correctNumber8}
              onChange={handleChange}
              name="correctNumber8"
            />
            <label htmlFor="option9">
              <h3>Opcja9</h3>
            </label>
            <textarea
              type="text"
              value={form.option9}
              onChange={handleChange}
              name="option9"
            />
            <label htmlFor="correctNumber9">
              <h3>Poprawny numer9</h3>
            </label>
            <input
              type="number"
              value={form.correctNumber9}
              onChange={handleChange}
              name="correctNumber9"
            />
            <label htmlFor="option10">
              <h3>Opcja10</h3>
            </label>
            <textarea
              type="text"
              value={form.option10}
              onChange={handleChange}
              name="option10"
            />
            <label htmlFor="correctNumber10">
              <h3>Poprawny numer10</h3>
            </label>
            <input
              type="number"
              value={form.correctNumber10}
              onChange={handleChange}
              name="correctNumber10"
            />

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
      <div className="home-container">
        <div className="courses-container">
          {chapter.exercises.map((exercise, id) => (
            <Exercise exercise={exercise} id={id} key={exercise._id} />
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

export default Exercises;
