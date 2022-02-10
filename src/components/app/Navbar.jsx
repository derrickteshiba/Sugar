import React from "react"
import { Nav, Navbar, Container } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function AppNavbar({authLevel}) {
  return (
    <Navbar bg="light" expand={true}>
      <Container fluid>
        <Navbar.Brand as={Link} to='/'>Sugar</Navbar.Brand> 
        <Navbar.Collapse className="d-flex justify-content-end">
          {authLevel === 2 && (
            <Nav>
              <Nav.Link as={Link} to="/search">
                Search
              </Nav.Link>
              <Nav.Link as={Link} to="/matches">
                Matches
              </Nav.Link>
              <Nav.Link as={Link} to="/profile">
                Profile
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
