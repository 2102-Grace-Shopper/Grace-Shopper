import React, { useEffect } from "react";

import { getUsers } from "../api/index";

const GetAllUsers = (props) => {
  const { users, setUsers } = props;

  useEffect(() => {
    getUsers()
      .then((users) => {
        setUsers(users);
      })
      .catch(console.error);
  }, [setUsers]);

  return (
    <div className="Users">
      {users.map((user, index) => {
        return (
          <div key={index}>
            <h1>Users: {user.username}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default GetAllUsers;