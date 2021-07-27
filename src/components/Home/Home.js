import React from "react";
import Topbar from "../Topbar/Topbar";
import Sidebar from "../Sidebar/Sidebar";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Partying from "../../images/partying.svg";
import DoneChecking from "../../images/done-checking.svg";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import DateDiff from "date-diff";

import "./home.scss";
const Home = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  let startDateYear = moment().format("YYYY");
  let startDateMonth = moment().format("MM");
  let startDateDay = moment().format("DD");
  var startDate = new Date(startDateYear, startDateMonth, startDateDay);

  function getNewUsersNumber() {
    let sum = 0;
    users.forEach((user) => {
      let year = moment(user.courses[0].createdAt).format("YYYY");
      let month = moment(user.courses[0].createdAt).format("MM");
      let day = moment(user.courses[0].createdAt).format("DD");
      var date2 = new Date(year, month, day);
      var diff = new DateDiff(startDate, date2);

      if (diff.days() < 8) {
        sum += 1;
      }
    });
    return sum;
  }
  function getAcomplishedCoursesNumber() {
    let coursesAcomplished = 0;
    let chaptersAcomplished = 0;
    let lessonsAcomplished = 0;
    users.forEach((user) => {
      user.courses.forEach((course) => {
        if (course.isFinished === true) {
          coursesAcomplished += 1;
        }
        course.chapters.forEach((chapter) => {
          if (chapter.isFinished === true) {
            chaptersAcomplished += 1;
          }

          chapter.lessons.forEach((lesson) => {
            if (lesson.isFinished === true) {
              lessonsAcomplished += 1;
            }
          });
        });
      });
    });

    console.log("coursesAcomplished", coursesAcomplished);
    console.log("chaptersAcomplished", chaptersAcomplished);
    console.log("lessonsAcomplished", lessonsAcomplished);
    return [coursesAcomplished, chaptersAcomplished, lessonsAcomplished];
    // coursesAcomplished: coursesAcomplished,
    // chaptersAcomplished: chaptersAcomplished,
    // lessonsAcomplished: lessonsAcomplished,
  }
  const acomplished = getAcomplishedCoursesNumber();
  console.log(acomplished);
  return (
    <>
      <Topbar name="Strona główna" />
      <Sidebar />
      <div className="home-container">
        <div className="information-container">
          <img src={Partying} alt="partying" />
          <div className="users-number">
            <h2>Liczba użytkowników</h2>
            <div className="users-number-box">
              <h1 className="futura">{users.length}</h1>
              <ExpandLessIcon className="arrow-up" />
            </div>
          </div>
          <div className="users-number users-number-left">
            <h2>Liczba nowych użytkowników</h2>
            <div className="users-number-box">
              <h1 className="futura">{getNewUsersNumber()}</h1>
              <ExpandLessIcon className="arrow-up" />
            </div>
          </div>
        </div>
        <div className="information-container2">
          <img src={DoneChecking} alt="done checking" />
          <h1 style={{ color: "#ff4e40" }}>Liczba ukończonych</h1>
          <div className="acomplished-container">
            <div className="acomplished-box">
              <h2 className="acomplished-name">Kursów</h2>
              <h1 className="acomplished-number acomplished-number-1 futura">
                {acomplished[0]}
              </h1>
            </div>
            <div className="acomplished-box">
              <h2 className="acomplished-name">Rozdziałów</h2>
              <h1 className="acomplished-number acomplished-number-2 futura">
                {acomplished[1]}
              </h1>
            </div>
            <div className="acomplished-box">
              <h2 className="acomplished-name">Lekcji</h2>
              <h1 className="acomplished-number acomplished-number-3 futura">
                {acomplished[2]}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
