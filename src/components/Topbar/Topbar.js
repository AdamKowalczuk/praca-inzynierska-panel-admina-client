import "./topbar.scss";

import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import ButtonRight from "../Button/ButtonRight";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";

import * as actionType from "../../constants/actionTypes";

const Topbar = () => {
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
          <MeetingRoomIcon onClick={logout} />
          {/* <Button variant="contained" className="btn" >
            Logout
          </Button> */}
        </div>
      ) : null}
    </>
  );
};

export default Topbar;
