import React, { useState } from "react";
import Topbar from "../Topbar/Topbar";
import Sidebar from "../Sidebar/Sidebar";
import "./quiz.scss";
import Pen from "../../images/pen.svg";
import Plus from "../../images/plus.svg";
import Delete from "../../images/delete.svg";
import { useDispatch, useSelector } from "react-redux";
import { createQuiz } from "../../actions/quiz";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
import Button from "../Button/Button";
import "../../modal.scss";
import Quiz from "./Quiz/Quiz";

const Quizes = () => {
  const dispatch = useDispatch();

  const courses = useSelector((state) => state.courses);
  const actualCourse = useSelector((state) => state.actualCourse);
  const actualChapter = useSelector((state) => state.actualChapter);
  const courseId = courses[actualCourse]._id;
  const chapterId = courses[actualCourse].chapters[actualChapter]._id;
  const chapter = courses[actualCourse].chapters[actualChapter];
  const initialState = {
    question: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    answers: [],
    correctAnswer: "",
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
    console.log(form);
    e.preventDefault();
    setForm({ ...form, _id: GenerateObjectId() });
    if (form.answer1 !== "") form.answers.push(form.answer1);
    if (form.answer2 !== "") form.answers.push(form.answer2);
    if (form.answer3 !== "") form.answers.push(form.answer3);
    if (form.answer4 !== "") form.answers.push(form.answer4);
    // setForm({ ...form, answers: [] });
    dispatch(createQuiz(form, courseId, chapterId));
    handleClose();
  };
  return (
    <>
      <Topbar name="Quizy" />
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
            <label htmlFor="question">
              <h3>Pytanie</h3>
            </label>

            <input
              type="text"
              value={form.question}
              onChange={handleChange}
              name="question"
            />

            <label htmlFor="answer1">
              <h3>Odpowiedź 1</h3>
            </label>
            <textarea
              type="text"
              value={form.answer1}
              onChange={handleChange}
              name="answer1"
            />
            <label htmlFor="answer2">
              <h3>Odpowiedź 2</h3>
            </label>
            <textarea
              type="text"
              value={form.answer2}
              onChange={handleChange}
              name="answer2"
            />
            <label htmlFor="answer3">
              <h3>Odpowiedź 3</h3>
            </label>
            <textarea
              type="text"
              value={form.answer3}
              onChange={handleChange}
              name="answer3"
            />
            <label htmlFor="answer4">
              <h3>Odpowiedź 4</h3>
            </label>
            <textarea
              type="text"
              value={form.answer4}
              onChange={handleChange}
              name="answer4"
            />
            <label htmlFor="correctAnswer">
              <h3>Poprawna odpowiedź</h3>
            </label>
            <textarea
              type="text"
              value={form.correctAnswer}
              onChange={handleChange}
              name="correctAnswer"
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
          {chapter.quiz.map((quiz, id) => (
            <Quiz quiz={quiz} id={id} key={quiz._id} />
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

export default Quizes;
