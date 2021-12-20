import React, { useState } from "react";
import "./exercise.scss";
import Pen from "../../../images/pen.svg";
import Delete from "../../../images/delete.svg";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
import Button from "../../Button/Button";
import "../../../modal.scss";
import {
  changeActualExercise,
  deleteExercise,
  updateExercise,
} from "../../../actions/exercise";

const Exercise = ({ exercise, id }) => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses);
  const actualCourse = useSelector((state) => state.actualCourse);
  const actualChapter = useSelector((state) => state.actualChapter);
  const courseId = courses[actualCourse]._id;
  const chapterId = courses[actualCourse].chapters[actualChapter]._id;

  const initialState = {
    description: exercise.description,
    options: exercise.options,
    isFinished: exercise.isFinished,
    _id: exercise._id,
    actualCourse: actualCourse,
    actualChapter: actualChapter,
    actualExercise: id,
  };
  const [form, setForm] = useState(initialState);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleChangeOptions = (e, id) => {
    let newOptions = form.options;
    if (e.target.name[0] === "c") {
      newOptions[id].correctNumber = Number(e.target.value);
      setForm({ ...form, options: newOptions });
    } else {
      newOptions[id].name = e.target.value;
      setForm({ ...form, options: newOptions });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateExercise(form, courseId, chapterId, form._id));
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
            dispatch(changeActualExercise(id));
            handleOpen();
          }}
        />
        <img
          src={Delete}
          alt="delete"
          className="modal-delete-icon"
          onClick={() => {
            dispatch(changeActualExercise(id));
            dispatch(
              deleteExercise(
                courseId,
                courses[actualCourse].chapters[actualChapter]._id,
                exercise._id,
                { actualExercise: id }
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
                value={form.options[0].name}
                onChange={(e) => handleChangeOptions(e, 0)}
                name="option1"
              />

              <label htmlFor="correctNumber1">
                <h3>Poprawny numer1</h3>
              </label>
              <input
                type="number"
                value={form.options[0].correctNumber}
                onChange={(e) => handleChangeOptions(e, 0)}
                name="correctNumber1"
              />
              <label htmlFor="option2">
                <h3>Opcja2</h3>
              </label>
              <textarea
                type="text"
                value={form.options[1].name}
                onChange={(e) => handleChangeOptions(e, 1)}
                name="option2"
              />
              <label htmlFor="correctNumber2">
                <h3>Poprawny numer2</h3>
              </label>
              <input
                type="number"
                value={form.options[1].correctNumber}
                onChange={(e) => handleChangeOptions(e, 1)}
                name="correctNumber2"
              />
              <label htmlFor="option3">
                <h3>Opcja3</h3>
              </label>
              <textarea
                type="text"
                value={form.options[2].name}
                onChange={(e) => handleChangeOptions(e, 2)}
                name="option3"
              />
              <label htmlFor="correctNumber3">
                <h3>Poprawny numer3</h3>
              </label>
              <input
                type="number"
                value={form.options[2].correctNumber}
                onChange={(e) => handleChangeOptions(e, 2)}
                name="correctNumber3"
              />
              <label htmlFor="option4">
                <h3>Opcja4</h3>
              </label>
              <textarea
                type="text"
                value={form.options[3].name}
                onChange={(e) => handleChangeOptions(e, 3)}
                name="option4"
              />
              <label htmlFor="correctNumber4">
                <h3>Poprawny numer4</h3>
              </label>
              <input
                type="number"
                value={form.options[3].correctNumber}
                onChange={(e) => handleChangeOptions(e, 3)}
                name="correctNumber4"
              />
              <label htmlFor="option5">
                <h3>Opcja5</h3>
              </label>
              <textarea
                type="text"
                value={
                  form.options[4] !== undefined ? form.options[4].name : null
                }
                onChange={(e) => handleChangeOptions(e, 4)}
                name="option5"
              />
              <label htmlFor="correctNumber5">
                <h3>Poprawny numer5</h3>
              </label>
              <input
                type="number"
                value={
                  form.options[4] !== undefined
                    ? form.options[4].correctNumber
                    : null
                }
                onChange={(e) => handleChangeOptions(e, 4)}
                name="correctNumber5"
              />
              <label htmlFor="option1">
                <h3>Opcja6</h3>
              </label>
              <textarea
                type="text"
                value={
                  form.options[5] !== undefined ? form.options[5].name : null
                }
                onChange={(e) => handleChangeOptions(e, 5)}
                name="option6"
              />
              <label htmlFor="correctNumber6">
                <h3>Poprawny numer6</h3>
              </label>
              <input
                type="number"
                value={
                  form.options[5] !== undefined
                    ? form.options[5].correctNumber
                    : null
                }
                onChange={(e) => handleChangeOptions(e, 5)}
                name="correctNumber6"
              />
              <label htmlFor="option7">
                <h3>Opcja7</h3>
              </label>
              <textarea
                type="text"
                value={
                  form.options[6] !== undefined ? form.options[6].name : null
                }
                onChange={(e) => handleChangeOptions(e, 6)}
                name="option7"
              />
              <label htmlFor="correctNumber7">
                <h3>Poprawny numer7</h3>
              </label>
              <input
                type="number"
                value={
                  form.options[6] !== undefined
                    ? form.options[6].correctNumber
                    : null
                }
                onChange={(e) => handleChangeOptions(e, 6)}
                name="correctNumber7"
              />
              <label htmlFor="option8">
                <h3>Opcja8</h3>
              </label>

              <textarea
                type="text"
                value={
                  form.options[7] !== undefined ? form.options[7].name : null
                }
                onChange={(e) => handleChangeOptions(e, 7)}
                name="option8"
              />
              <label htmlFor="correctNumber8">
                <h3>Poprawny numer8</h3>
              </label>
              <input
                type="number"
                value={
                  form.options[7] !== undefined
                    ? form.options[7].correctNumber
                    : null
                }
                onChange={(e) => handleChangeOptions(e, 7)}
                name="correctNumber8"
              />
              <label htmlFor="option9">
                <h3>Opcja9</h3>
              </label>
              <textarea
                type="text"
                value={
                  form.options[8] !== undefined ? form.options[8].name : null
                }
                onChange={(e) => handleChangeOptions(e, 8)}
                name="option9"
              />
              <label htmlFor="correctNumber9">
                <h3>Poprawny numer9</h3>
              </label>
              <input
                type="number"
                value={
                  form.options[8] !== undefined
                    ? form.options[8].correctNumber
                    : null
                }
                onChange={(e) => handleChangeOptions(e, 8)}
                name="correctNumber9"
              />
              <label htmlFor="option10">
                <h3>Opcja10</h3>
              </label>
              <textarea
                type="text"
                value={
                  form.options[9] !== undefined ? form.options[9].name : null
                }
                onChange={(e) => handleChangeOptions(e, 9)}
                name="option10"
              />
              <label htmlFor="correctNumber10">
                <h3>Poprawny numer10</h3>
              </label>
              <input
                type="number"
                value={
                  form.options[9] !== undefined
                    ? form.options[9].correctNumber
                    : null
                }
                onChange={(e) => handleChangeOptions(e, 9)}
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

        <h3 className="futura quiz-question" style={{ color: "#fff" }}>
          {exercise.description}
        </h3>
        {exercise.options.map((option, id) => {
          return (
            <>
              <h4 key={id} className="exercise-option">
                {option.correctNumber === "" ? (
                  <div>{option.name}</div>
                ) : (
                  <div className="exercise-correct">
                    <b style={{ marginRight: "5px" }}>
                      {option.correctNumber}){" "}
                    </b>
                    {option.name}
                  </div>
                )}
              </h4>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Exercise;
