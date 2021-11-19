import "./topbar.scss";
import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";

import * as actionType from "../../constants/actionTypes";
// import Logout from "../../icons/012-logout.svg";

const Topbar = (props) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push("/");

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);
  return (
    <>
      {user?.result ? (
        <div className="topbar">
          <h2 className="bungee">{props.name}</h2>
          {/* <img src={Logout} alt="logout" onClick={logout} /> */}
          {/* <Logout onClick={logout} /> */}
          <MeetingRoomIcon onClick={logout} />
        </div>
      ) : null}
    </>
  );
};

export default Topbar;
