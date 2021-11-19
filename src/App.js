import { useDispatch } from "react-redux";
import "./App.scss";
import Courses from "./components/Courses/Courses.js";
import Users from "./components/Users/Users.js";
import { getCourses } from "./actions/courses";
import { getUsers } from "./actions/users";
import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import Chapters from "./components/Chapters/Chapters";
import Lessons from "./components/Lessons/Lessons";
import Quiz from "./components/Quizes/Quizes";
import Exercises from "./components/Exercises/Exercises";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCourses());
    dispatch(getUsers());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Auth} />
        <Route path="/admin" exact component={Home} />
        <Route path="/admin/kursy" exact component={Courses} />
        <Route path="/admin/użytkownicy" exact component={Users} />
        <Route path="/admin/rozdziały" exact component={Chapters} />
        <Route path="/admin/lekcje" exact component={Lessons} />
        <Route path="/admin/quizy" exact component={Quiz} />
        <Route path="/admin/zadania" exact component={Exercises} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
