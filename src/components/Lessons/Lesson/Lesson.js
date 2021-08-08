import React from "react";
import "./lesson.scss";
// import { Link } from "react-router-dom";
// import AssignmentIcon from "@material-ui/icons/Assignment";
// import AssessmentIcon from "@material-ui/icons/Assessment";
// import EditIcon from "@material-ui/icons/Edit";
import Modal from "@material-ui/core/Modal";
import Button from "../../Button/Button";
import CloseIcon from "@material-ui/icons/Close";
import Pen from "../../../images/pen.svg";
import OpenBook from "../../../images/open-book.svg";
import "../../../modal.scss";
import { changeActualLesson, deleteLesson } from "../../../actions/courses";
import Delete from "../../../images/delete.svg";
import { useDispatch, useSelector } from "react-redux";
const Lesson = ({ lesson, id }) => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses);
  const actualCourse = useSelector((state) => state.actualCourse);
  const actualLesson = useSelector((state) => state.actualLesson);
  const courseId = courses[actualCourse]._id;
  const actualChapter = useSelector((state) => state.actualChapter);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (id) => {
    setOpen(false);
  };

  // const handleSubmit = async (e, id) => {
  //   e.preventDefault();
  // };
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
            <div className="modal-top">
              <CloseIcon
                className="close-icon"
                onClick={() => handleClose(id)}
              />
            </div>

            <form action="post">
              <label htmlFor="name">
                <h3>Nazwa lekcji</h3>
              </label>
              <input type="text" value={lesson.name} name="courseName" />

              <label htmlFor="description">
                <h3>Opis lekcji</h3>
              </label>
              <textarea
                type="text"
                value={lesson.description}
                id="description"
                name="description"
              />
              <div className="add-photo-container">
                <img src={OpenBook} className="add-photo" alt="open book" />
                <p className="add-photo-text">Dodaj zdjęcie</p>
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
        <h2 className="futura ">{lesson.name}</h2>
        <img
          style={{ width: "70%", marginLeft: "15%" }}
          src={OpenBook}
          alt={lesson.name}
        />
        <h3>{lesson.description}</h3>
      </div>
    </>
  );
};

export default Lesson;
