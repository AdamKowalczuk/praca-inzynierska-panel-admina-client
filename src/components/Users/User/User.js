import React from "react";
import { useDispatch } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteUser } from "../../../actions/users";

const User = ({ user, index, setCurrentId }) => {
  const dispatch = useDispatch();
  // const user = JSON.parse(localStorage.getItem("profile"));
  console.log("Single User:", user);

  return (
    <>
      <th className="table-index">
        <h3>{index}</h3>
      </th>
      <th>
        <h3>{user.name}</h3>
      </th>
      <th>
        <h3>{user.email}</h3>
      </th>
      <th>
        <DeleteIcon onClick={() => dispatch(deleteUser(user._id))} />
      </th>
    </>
  );
};

export default User;
