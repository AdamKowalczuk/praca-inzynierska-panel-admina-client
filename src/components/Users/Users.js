import React from "react";
import User from "./User/User";
import { useSelector } from "react-redux";
import Topbar from "../Topbar/Topbar";
import Sidebar from "../Sidebar/Sidebar";
import "./users.scss";

const Users = ({ setCurrentId }) => {
  const users = useSelector((state) => state.users);

  return (
    <>
      <Topbar name="Użytkownicy" />
      <Sidebar />
      <div className="home-container">
        <table className="table-dark">
          <thead>
            <tr>
              <th>
                <h2>#</h2>
              </th>
              <th>
                <h2>Imię i nazwisko</h2>
              </th>
              <th>
                <h2>Email</h2>
              </th>
              <th>
                <h2>Data dołączenia</h2>
              </th>
              <th className="th-delete-user">
                <h2>Usuń</h2>
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <User user={user} index={index} setCurrentId={setCurrentId} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Users;
