import React, {useState} from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import {loginUser} from "../api/index";
import {Link} from "react-router-dom"

const Login = ({setUser}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
  return (
    <div
    className = "loginPage"
    onSubmit={ async (event) => {
        event.preventDefault()

        try {
            const data = await loginUser(username, password)
            setUser(data)
            console.log(data)
        } catch (error) {}
    }}
    >
    <Form inline
    onSubmit={ async (event) => {
        event.preventDefault()

        try {
            const data = await loginUser(username, password)
            setUser(data)
        } catch (error) {}
    }}>
      <FormGroup>
        <Label for="username" hidden></Label>
        <Input  type="text" 
                name="username" 
                id="username" 
                required={true} value={username}
                onChange={(event) => setUsername(event.target.value)} 
                placeholder="Username" />
      </FormGroup>
      {''}
      <FormGroup>
        <Label for="password" hidden></Label>
        <Input type="text" 
        name="password" 
        id="password" 
        placeholder="Password"
        required = {true}
        value={password}
        onChange={(event) => setPassword(event.target.value)} />
      </FormGroup>
      {' '}
      <Button type="submit">Log In</Button>
      <Link to='registerUser'>Need an Account? Sign Up!</Link>
    </Form>
    </div>
  );
}

export default Login;
