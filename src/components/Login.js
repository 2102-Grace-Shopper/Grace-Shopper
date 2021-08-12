import React, {useState} from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import {loginUserForm} from "../api/index";
import { useHistory, Link} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";

const Login = ({setUser}) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const history = useHistory()
  return (
    <div
    className = "loginPage"
    >
    <Form inline
    onSubmit={ async (event) => {
        event.preventDefault()

        try {
            const data = await loginUserForm(username, password)
            if (data) {
            setUser(data)
            console.log("User has signed in:", data)
            alert("Logged In")
            history.push('/products')
            } else {
                alert('Incorrect credentials')
            }
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
      {""}
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