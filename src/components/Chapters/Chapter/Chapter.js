import React from "react";
import "./chapter.scss";
import { Link } from "react-router-dom";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AssessmentIcon from "@material-ui/icons/Assessment";
import EditIcon from "@material-ui/icons/Edit";
import Modal from "@material-ui/core/Modal";
import Button from "../../Button/Button";
import CloseIcon from "@material-ui/icons/Close";
import Pen from "../../../images/pen.svg";
import OpenBook from "../../../images/open-book.svg";
import Lesson from "../../../images/board.svg";
import {
  changeCourseName,
  changeCourseDescription,
  changeActualCourse,
  changeActualChapter,
  // setCourseName,
} from "../../../actions/courses";
import "../../../modal.scss";
import { useDispatch, useSelector } from "react-redux";
const Chapter = ({ chapter, id }) => {
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    // console.log(courseName);
    setOpen(true);
  };

  const handleClose = (id) => {
    setOpen(false);
  };

  const handleSubmit = async (e, id) => {
    // e.preventDefault();
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
                <h3>Nazwa rozdziału</h3>
              </label>
              <input type="text" value={chapter.name} name="courseName" />

              <label htmlFor="description">
                <h3>Opis rozdziału</h3>
              </label>
              <textarea
                type="text"
                value={chapter.description}
                id="description"
                name="description"
              />
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
        <h2 className="futura ">{chapter.name}</h2>
        <h3>{chapter.description}</h3>
        <div className="chapters-lessons-container">
          <Link className="link" to="/admin/lekcje">
            <h4
              style={{ cursor: "pointer" }}
              onClick={() => dispatch(changeActualChapter(id))}
            >
              <img src={Lesson} alt="lesson" />
              <p className="italic ">liczba lekcji</p>
              <p>{chapter.lessons.length}</p>
            </h4>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Chapter;
