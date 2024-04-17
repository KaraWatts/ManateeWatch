import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import Image from "react-bootstrap/esm/Button";
import { userLogout } from "./utilities";
import "bootstrap/dist/css/bootstrap.css";
import logo from "../assets/manateeLogo.png";
import { Avatar } from "@mui/material";
import { Col, Row } from "react-bootstrap";

// if user exists we are logged in
function NavBar({ user, setUser }) {
  const profilePic = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate()


  const handleUserLogout = async () => {
    const loggedOut = await userLogout();
    if (loggedOut) {
      setUser(null);
      navigate('/')
    }
  };



  return (
    <Navbar expand="lg" className="bg-body-tertiary navBar">
      <Container className="navContainer d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <Navbar.Brand
            className="title"
            style={{ fontFamily: "Caveat, sans-serif" }}
            as={Link}
            to="/"
          >
            <img
              src={logo}
              alt={"manateewatch logo"}
              className="logo"
              style={{
                height: "100%",
                maxHeight: "100px",
                minHeight: "50px",
                width: "auto",
              }}
            />
            ManateeWatch
          </Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="menu">
          <Row className="nav-row" style={{width:"100%"}}>
            <Col className="links">
              {/* SPACE FOR LINKS */}
            </Col>
            <Col className="profile-icon">
              {user ? (
                <NavDropdown
                  title={
                    <Avatar
                      src={profilePic.profile_picture}
                      alt="Menu"
                      sx={{ width: 60, height: 60 }}
                    />
                  }
                  drop="down-centered"
                  id="nav-dropdown"
                  align="end"
                >
                  {/* aligns the dropdown menu with the right edge of the menu icon*/}
                    <NavDropdown.Item as={Link} to={`/profile/${user.id}`}>
                    Profile Page
                  </NavDropdown.Item>
                  
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    onClick={handleUserLogout}
                    variant="outline-danger"
                  >
                    Log Out
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={Link} to="/login/">
                  Log In
                </Nav.Link>
              )}
            </Col>
          </Row>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
