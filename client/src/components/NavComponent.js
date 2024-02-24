import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";

const NavComponent = () => {
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <LinkContainer to="/">
          <Navbar.Brand>
            <span class="material-symbols-outlined">task</span>Task Manager App
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="home-navbar-nav" />
        <Navbar.Collapse id="home-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/register">
              <Nav.Link>Register</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavComponent;
