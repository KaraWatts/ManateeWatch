import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import { userLogout } from "./utilities";
import "bootstrap/dist/css/bootstrap.css";

// if user exists we are logged in
function NavBar({ user, setUser }) {
  const handleUserLogout = async () => {
    const loggedOut = await userLogout();
    if (loggedOut) {
      setUser(null);
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link}>Manatee Watch</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/sighting/">
                Submit a Sighting!
              </Nav.Link>
            {user ? null : (
              <Nav.Link as={Link} to="/login/">
                Log In
              </Nav.Link>
            )}
            <NavDropdown title="Menu" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.3">Account Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              {!user ? null : (
              <NavDropdown.Item
                onClick={() => handleUserLogout()}
                variant="outline-danger"
              >
                Log Out
              </NavDropdown.Item>
            )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
