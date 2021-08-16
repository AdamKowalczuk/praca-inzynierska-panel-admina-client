import React, { useState } from "react";
import "../quiz.scss";
import Pen from "../../../images/pen.svg";
import Delete from "../../../images/delete.svg";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
import Button from "../../Button/Button";
import "../../../modal.scss";
import {
  changeActualQuiz,
  deleteQuiz,
  updateQuiz,
} from "../../../actions/quiz";

const Quiz = ({ quiz, id, key }) => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses);
  const actualCourse = useSelector((state) => state.actualCourse);
  const actualChapter = useSelector((state) => state.actualChapter);
  console.log(quiz._id);
  const courseId = courses[actualCourse]._id;
  const chapterId = courses[actualCourse].chapters[actualChapter]._id;

  const initialState = {
    question: quiz.question,
    answers: [],
    answer1: quiz.answers[0],
    answer2: quiz.answers[1],
    answer3: quiz.answers[2],
    answer4: quiz.answers[3],
    isFinished: quiz.isFinished,
    _id: quiz._id,
    correctAnswer: quiz.correctAnswer,
    actualChapter: actualChapter,
    actualQuiz: id,
  };
  const [form, setForm] = useState(initialState);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    console.log("Quiz Form:", form);
    form.answers = [];
    e.preventDefault();
    if (form.answer1 !== undefined || form.answer1 === "")
      form.answers.push(form.answer1);
    if (form.answer2 !== undefined || form.answer1 === "")
      form.answers.push(form.answer2);
    if (form.answer3 !== undefined || form.answer1 === "")
      form.answers.push(form.answer3);
    if (form.answer4 !== undefined || form.answer1 === "")
      form.answers.push(form.answer4);
    dispatch(updateQuiz(form, courseId, chapterId, form._id));
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
            dispatch(changeActualQuiz(id));
            handleOpen();
          }}
          style={{ backgroundColor: courses[actualCourse].color }}
        />
        <img
          src={Delete}
          alt="delete"
          className="modal-delete-icon"
          onClick={() => {
            dispatch(changeActualQuiz(id));
            dispatch(
              deleteQuiz(
                courseId,
                courses[actualCourse].chapters[actualChapter]._id,
                quiz._id,
                { actualQuiz: id }
              )
            );
          }}
          style={{ backgroundColor: courses[actualCourse].color }}
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

        <h2 className="futura quiz-question" style={{ color: "#fff" }}>
          {quiz.question}
        </h2>
        {quiz.answers.map((answer, id) => {
          return (
            <h3
              key={id}
              className={
                answer === quiz.correctAnswer
                  ? "quiz-answer correct-answer"
                  : "quiz-answer bad-answer"
              }
            >
              {answer}
            </h3>
          );
        })}
      </div>
    </>
  );
};

export default Quiz;
