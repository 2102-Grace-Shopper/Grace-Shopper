import React from "react"
import {Navbar, Nav, Container, NavDropdown, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import {logoutUser} from '../api/index'

const NavReact = ({user, setUser}) => {
    return(
    <Navbar bg="primary" variant="dark" expand="lg">
    <Container>
        <Navbar.Brand href="/">Dog Adoption</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
            <Nav.Link href="/dogs">Dogs</Nav.Link>
            <Nav.Link href="/products">Products</Nav.Link>
            <NavDropdown title="User" id="basic-nav-dropdown">
            <NavDropdown.Item href="/action/3.1">Cart</NavDropdown.Item>
            <NavDropdown.Item href="/action/3.2">Favorite Dogs</NavDropdown.Item>
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