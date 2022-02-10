import React from "react";
import { Nav, Navbar, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useUserContext } from "../auth/userContext";

export default function AppNavbar({ authLevel }) {
  const { logout } = useUserContext();

  async function handleLogout() {
    await logout();
  }

  return (
    <Navbar bg="light" expand={true}>
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          Sugar
        </Navbar.Brand>
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
              <Button
                variant="link"
                onClick={handleLogout}
                className="w-100 text-center"
              >
                Log Out
              </Button>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
