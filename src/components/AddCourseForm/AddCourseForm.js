import "./AddCourseForm.scss";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button, Typography } from "@material-ui/core";
import { createCourse, updateCourse } from "../../actions/courses";
const AddCourseForm = ({ currentId, setCurrentId }) => {
  const [courseData, setCourseData] = useState({ title: "", description: "" });
  const course = useSelector((state) =>
    currentId
      ? state.courses.find((description) => description._id === currentId)
      : null
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (course) setCourseData(course);
  }, [course]);

  const clear = () => {
    setCurrentId(0);
    setCourseData({ title: "", description: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createCourse(courseData));
      clear();
    } else {
      dispatch(updateCourse(currentId, courseData));
      clear();
    }
  };
  return (
    <>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Typography variant="h6">
          {currentId ? `Editing "${course.title}"` : "Creating a Memory"}
        </Typography>

        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={courseData.title}
          onChange={(e) =>
            setCourseData({ ...courseData, title: e.target.value })
          }
        />
        <TextField
          name="description"
          variant="outlined"
          label="Description"
          fullWidth
          multiline
          rows={4}
          value={courseData.description}
          onChange={(e) =>
            setCourseData({ ...courseData, description: e.target.value })
          }
        />

        <Button
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </>
  );
};

export default AddCourseForm;
