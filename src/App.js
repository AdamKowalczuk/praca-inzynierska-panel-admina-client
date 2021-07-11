// import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.scss";
import AddCourseForm from "./components/AddCourseForm/AddCourseForm";
import Courses from "./components/Courses/Courses.js";
import Users from "./components/Users/Users.js";

import { getCourses } from "./actions/courses";
import { getUsers } from "./actions/users";

import React, { useState, useEffect } from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

const App = () => {
  // const [count, setCount] = useState(0);
  // const cos = 0;
  const [currentId, , setCurrentId] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCourses());
    dispatch(getUsers());
  }, [currentId, dispatch]);
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Auth} />
        <Route path="/admin" exact component={Home} />
        <Route path="/admin/kursy" exact component={Courses} />
        <Route path="/admin/uzytkownicy" exact component={Users} />
      </Switch>
    </BrowserRouter>
  );

  // {/* <AddCourseForm /> */}
};

export default App;
