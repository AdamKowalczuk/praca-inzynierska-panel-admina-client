import React from "react";
import "./sidebar.scss";
import AddBoxIcon from "@material-ui/icons/AddBox";
import AssignmentIcon from "@material-ui/icons/Assignment";
import DeleteIcon from "@material-ui/icons/Delete";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";

const Sidebar = () => {
  return (
    <>
      <div className="sidebar">
        <h1 className="logo">FrontWeb</h1>
        <div className="subject">
          <h4 className="nav-header">Courses</h4>
          <h4 className="nav-item">
            <AssignmentIcon />
            <p>All courses</p>
          </h4>
          <h4 className="nav-item">
            <AddBoxIcon />
            <p>Add course</p>
          </h4>
          <h4 className="nav-item">
            <DeleteIcon />
            <p>Delete course</p>
          </h4>
        </div>
        <div className="subject">
          <h4 className="nav-header">Users</h4>
          <h4 className="nav-item">
            <AccountBoxIcon />
            <p>All users</p>
          </h4>
          <h4 className="nav-item">
            <PersonAddIcon />
            <p> Add user</p>
          </h4>
          <h4 className="nav-item">
            <PersonAddDisabledIcon />
            <p>Delete user</p>
          </h4>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
