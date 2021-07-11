// import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.scss";
import AddCourseForm from "./components/AddCourseForm/AddCourseForm";
// import Courses from "./components/Courses/Courses";

import { getCourses } from "./actions/courses";

import React, { useState } from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

const App = () => (
  // const [count, setCount] = useState(0);
  // const cos = 0;
  // const [currentId, , setCurrentId] = useState(cos);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getCourses());
  // }, [currentId, dispatch]);

  <BrowserRouter>
    <Switch>
      <Route path="/admin" exact component={Home} />
      <Route path="/" exact component={Auth} />
    </Switch>
  </BrowserRouter>
  // {/* <AddCourseForm /> */}
);

export default App;
