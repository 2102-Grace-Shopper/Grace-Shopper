import React from "react"
import {Navbar, Nav, Container, NavDropdown, Button} from 'react-bootstrap';
import {logoutUser} from '../api/index';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavReact = ({user, setUser}) => {
    return(
    <Navbar bg="light" expand="lg">
    <Container>
        <Navbar.Brand href="/home">Doge Adoption Center</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
            <Nav.Link href="/dogs">Dogs</Nav.Link>
            <Nav.Link href="/products">Products</Nav.Link>
            <NavDropdown title="User" id="basic-nav-dropdown">
            <NavDropdown.Item href="/orders">Cart</NavDropdown.Item>
            <NavDropdown.Divider />
            {user
                ?<Button className = "outButton" onClick={() => {
                        logoutUser()
                        setUser(null)
                        alert("You've been logged out")
                    }
                    }>Logout</Button>
                :<NavDropdown.Item href="/loginUser">Login In/Out</NavDropdown.Item>
            }
            </NavDropdown>
        </Nav>
        </Navbar.Collapse>
    </Container>
    </Navbar> 
        )
}

export default NavReact;