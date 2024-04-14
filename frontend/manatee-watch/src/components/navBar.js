import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/esm/Button";
import { userLogout } from "./utilities";
import "bootstrap/dist/css/bootstrap.css";
import logo from "../assets/manateeLogo.png";

// if user exists we are logged in
function NavBar({ user, setUser }) {
  const handleUserLogout = async () => {
    const loggedOut = await userLogout();
    if (loggedOut) {
      setUser(null);
    }
  };
  console.log(user)
  return (
<Navbar expand="lg" className="bg-body-tertiary navBar" >
  <Container className="navContainer d-flex align-items-center justify-content-between" >
    <div className="d-flex align-items-center">
      <img src={logo} alt={'manateewatch logo'} className="logo" style={{height:"100%", maxHeight:"100px", minHeight:"50px", width:"auto"}}/>
      <Navbar.Brand className="title" style={{fontFamily: "Caveat, sans-serif"}} as={Link} to="/">ManateeWatch</Navbar.Brand>
    </div>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
       <Nav className="me-auto links"> {/*me-auto pushes the menu all the way to the right */}
        <Nav.Link as={Link} to="/sightingImage/">Submit a Sighting!</Nav.Link>
        {user ? null : <Nav.Link as={Link} to="/login/">Log In</Nav.Link>}
      </Nav>
      <div className="d-flex align-items-center menu">
        <NavDropdown title="Menu" id="nav-dropdown" align="end" className="dropdown-menu-end"> 
        {/* align the dropdown menu with the right edge of the menu icon*/}
          <NavDropdown.Item href={`profile/${user.id}`}>Profile Page</NavDropdown.Item>
          <NavDropdown.Divider />
          {user && <NavDropdown.Item onClick={handleUserLogout} variant="outline-danger">Log Out</NavDropdown.Item>}
        </NavDropdown>
      </div>
    </Navbar.Collapse>
  </Container>
</Navbar>
  );
}

export default NavBar;
