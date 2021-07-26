import React from "react";
import "./sidebar.scss";
import AddBoxIcon from "@material-ui/icons/AddBox";
import AssignmentIcon from "@material-ui/icons/Assignment";
import DeleteIcon from "@material-ui/icons/Delete";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import LanguageIcon from "@material-ui/icons/Language";
import Home from "../../images/home.svg";
import OpenBook from "../../images/open-book.svg";
import Group from "../../images/group.svg";
import Web from "../../images/web.svg";
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
