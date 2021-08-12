import React, { useState } from "react";

import { useHistory, Link } from "react-router-dom";

import { registerUserForm } from "../api";

import "bootstrap/dist/css/bootstrap.min.css";

import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const Register = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  return (
    <div className="RegisterForm">
      <Form
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "250px",
          marginTop: "150px",
          margin: "auto",
        }}
        onSubmit={async (event) => {
          event.preventDefault();

          try {
            const data = await registerUserForm(username, password);
            if (data) {
              setUser(data);
              history.push("/alcohol");
            } else {
              alert("Username already taken! Please try again!");
            }
          } catch (error) {}
        }}
      >
        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            type="text"
            id="username"
            placeholder="Enter Username"
            required={true}
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="Enter Password"
            required={true}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormGroup>
        <Button style={{ marginTop: "10px" }} type="submit">
          Register
        </Button>
        <h6>Already have an account? <Link to="loginUser">Login Here</Link></h6>
      </Form>
    </div>
  );
};

export default Register;