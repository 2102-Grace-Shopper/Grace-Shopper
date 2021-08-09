import React, {useState} from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import {registerUser} from "../api/index";
import {useHistory, Link} from "react-router-dom"

const Register = ({setUser}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const history = useHistory()

  return (
    <div
    classname="registerPage"
    >
    <Form inline
        onSubmit={async (event) => {
            event.preventDefault()

            try {
                const data = await registerUser(email, password, firstName, lastName, username)
                setUsername(data)
                history.push('/dogs')
            }catch (error) {}
        }}>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="email" hidden>Email</Label>
            <Input type="email" 
            name="email" 
            id="email" 
            required = {true} value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email" />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="password" hidden>Password</Label>
            <Input type="password" 
            name="password" 
            id="password" 
            required = {true} value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password" />
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        <Label for="firstName" hidden>First Name</Label>
        <Input type="text" 
        name="firstName" 
        id="First Name"
        required = {true} value={firstName}
        onChange={(event) => setFirstName(event.target.value)}
        placeholder="First Name"/>
      </FormGroup>
      <FormGroup>
        <Label for="lastName" hidden>Last Name</Label>
        <Input type="text" 
        name="lastName" 
        id="Last Name" 
        required = {true} value={lastName}
        onChange={(event) => setLastName(event.target.value)}
        placeholder="Last Name"/>
      </FormGroup>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="username" hidden>Username</Label>
            <Input type="text" 
            name="username" 
            id="username"
            required = {true} value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="username"/>
          </FormGroup>
        </Col>
      </Row>
      <Button type="submit">Register</Button>
      <Link to='loginUser'>Have an account? Sign in!</Link>
    </Form>
    </div>
  );
}

export default Register;