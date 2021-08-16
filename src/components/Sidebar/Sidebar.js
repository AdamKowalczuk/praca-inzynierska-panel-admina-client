import React from "react";
import "./sidebar.scss";
import Home from "../../images/home.svg";
import OpenBook from "../../images/open-book.svg";
import Group from "../../images/group.svg";
import Web from "../../images/web.svg";
// import Quiz from "../../images/quiz.svg";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div className="sidebar">
        <h3 className="logo">
          <img src={Web} alt="web" />
          <p className="futura">WebFront</p>
        </h3>
        <div className="subject">
          <Link className="link" to="/admin/">
            <h4 className="nav-item">
              <img src={Home} alt="home" />
              <p className="center">Strona główna</p>
            </h4>
          </Link>
        </div>
        <div className="subject">
          <Link className="link" to="/admin/kursy">
            <h4 className="nav-item">
              <img src={OpenBook} alt="open book" />
              <p className="center">Kursy</p>
            </h4>
          </Link>
        </div>
        {/* <div className="subject">
          <Link className="link" to="/admin/quizy">
            <h4 className="nav-item">
              <img src={Quiz} alt="quiz" />
              <p className="center">Quizy</p>
            </h4>
          </Link>
        </div> */}
        <div className="subject">
          <Link className="link" to="/admin/użytkownicy">
            <h4 className="nav-item">
              <img src={Group} alt="group" />
              <p className="center">Użytkownicy</p>
            </h4>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
