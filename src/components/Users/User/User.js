import React from "react";
import { useDispatch } from "react-redux";

const User = ({ user, setCurrentId }) => {
  const dispatch = useDispatch();
  // const user = JSON.parse(localStorage.getItem("profile"));
  console.log("Single User:", user);

  return (
    <>
      <div style={{ color: "red", padding: "20px" }}>
        <h3>{user.email}</h3>
        <p>{user.password}</p>
      </div>
    </>
  );
};

export default User;
