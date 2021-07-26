import React from "react";
import Topbar from "../Topbar/Topbar";
import Sidebar from "../Sidebar/Sidebar";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Partying from "../../images/partying.svg";
import DoneChecking from "../../images/done-checking.svg";

import "./home.scss";
const Home = () => {
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
              <h1 className="futura">150</h1>
              <ExpandLessIcon className="arrow-up" />
            </div>
          </div>
          <div className="users-number users-number-left">
            <h2>Liczba nowych użytkowników</h2>
            <div className="users-number-box">
              <h1 className="futura">30</h1>
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
                10
              </h1>
            </div>
            <div className="acomplished-box">
              <h2 className="acomplished-name">Rozdziałów</h2>
              <h1 className="acomplished-number acomplished-number-2 futura">
                22
              </h1>
            </div>
            <div className="acomplished-box">
              <h2 className="acomplished-name">Lekcji</h2>
              <h1 className="acomplished-number acomplished-number-3 futura">
                150
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
