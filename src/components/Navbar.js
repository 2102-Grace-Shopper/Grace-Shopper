import React from "react"
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const NavReact = () => {
    return(
    <Navbar bg="light" expand="lg">
    <Container>
        <Navbar.Brand href="#home">Dog Adoption</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
            <Nav.Link href="#Dogs">Dogs</Nav.Link>
            <Nav.Link href="#Products">Products</Nav.Link>
            <NavDropdown title="User" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Cart</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Favorite Dogs</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Login In/Out</NavDropdown.Item>
            </NavDropdown>
        </Nav>
        </Navbar.Collapse>
    </Container>
    </Navbar> 
        )
}

export default NavReact;