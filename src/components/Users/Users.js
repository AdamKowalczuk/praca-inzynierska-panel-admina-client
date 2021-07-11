import React from "react";
import User from "./User/User";
import { useSelector } from "react-redux";

const Users = ({ setCurrentId }) => {
  const users = useSelector((state) => state.users);
  console.log("Users:", users);

  return (
    <>
      <h2 style={{ color: "red" }}>Users:</h2>
      {users.map((user) => (
        <div key={user._id}>
          <User user={user} setCurrentId={setCurrentId} />
        </div>
      ))}
    </>
  );
};

export default Users;
