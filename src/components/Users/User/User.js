import React from "react";
import { useDispatch } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteUser } from "../../../actions/users";

const User = ({ user, index }) => {
  const dispatch = useDispatch();
  return (
    <>
      <th className="table-index">
        <h3>{index + 1}</h3>
      </th>
      <th>
        <h3>{user.name}</h3>
      </th>
      <th>
        <h3>{user.email}</h3>
      </th>
      <th>
        <h3>{user.createdAt.slice(0, 10)}</h3>
      </th>
      <th>
        <DeleteIcon onClick={() => dispatch(deleteUser(user._id))} />
      </th>
    </>
  );
};

export default User;
