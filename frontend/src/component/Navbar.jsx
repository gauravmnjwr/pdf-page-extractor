import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

function NavbarComponent({ signIn, signUp }) {
  const [userInfo, setuserInfo] = useState("");

  useEffect(() => {
    let data = localStorage?.getItem("userDetails");
    if (data) {
      const user = JSON.parse(data);
      setuserInfo(user);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("userDetails");
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <Navbar.Brand className="m-4">
                <b>Home</b>
              </Navbar.Brand>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {userInfo ? (
                <NavDropdown title={userInfo.email} id="username">
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Container className="d-flex justify-content-between">
                  {!signIn && (
                    <LinkContainer to="/login">
                      <Nav.Link>Login</Nav.Link>
                    </LinkContainer>
                  )}
                  {!signUp && (
                    <LinkContainer to="/signup">
                      <Nav.Link>Sign Up</Nav.Link>
                    </LinkContainer>
                  )}
                </Container>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default NavbarComponent;
