import React from "react"
import {Navbar, Nav, Container, NavDropdown, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory} from "react-router-dom"
import {logoutUser} from '../api/index'

const NavReact = ({user, setUser}) => {
    const history = useHistory()
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
            <NavDropdown.Item href="/orders">Cart</NavDropdown.Item>
            <NavDropdown.Divider />
            {user
                ? <NavDropdown.Item className = "outButton" onClick={() => {
                        logoutUser()
                        setUser(null)
                        history.push('/loginUser')
                    }
                    }>Logout</NavDropdown.Item>
                :<NavDropdown.Item href="/loginUser">Log In</NavDropdown.Item>
            }
            </NavDropdown>
        </Nav>
        </Navbar.Collapse>
    </Container>
    </Navbar> 
    )
}

export default NavReact;