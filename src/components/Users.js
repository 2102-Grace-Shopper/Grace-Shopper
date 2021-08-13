import React, { useEffect } from "react";

import { getUsers } from "../api/index";

const GetUsers = (props) => {
  const { users, setUsers } = props;

  useEffect(() => {
    getUsers()
      .then((users) => {
        setUsers(users);
      })
      .catch(console.error);
  }, [setUsers]);

  return (
    <div className="getAllUsers">
      {users.map((user, index) => {
        return (
          <div key={index}>
            <h1>Users: {user.firstName}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default GetUsers;