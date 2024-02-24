import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Stack from "react-bootstrap/Stack";
import { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";

const Register = () => {
  // useState a hook to catch the value of input form
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  return (
    <Form className="w-25 position-absolute top-50 start-50 translate-middle bg-body-secondary rounded p-5">
      <h1 className="text-center mb-3">Register</h1>
      <Form.Group className="mb-3" controlId="registerForm.firstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="First Name"
          value={form.firstName}
          onChange={(e) => {
            setForm({ ...form, firstName: e.target.value });
          }}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="registerForm.lastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Last Name"
          value={form.lastName}
          onChange={(e) => {
            setForm({ ...form, lastName: e.target.value });
          }}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="registerForm.email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => {
            setForm({ ...form, email: e.target.value });
          }}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="registerForm.password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => {
            setForm({ ...form, password: e.target.value });
          }}
          required
        />
      </Form.Group>
      <Form.Group className="mb-4" controlId="registerForm.register">
        <Button className="d-grid mx-auto" variant="primary" type="submit">
          Register
        </Button>
      </Form.Group>
      <Stack className="col-md-7 mx-auto" direction="horizontal" gap={2}>
        <div>
          <LinkContainer to="/login">
            <Nav.Link>Go to login</Nav.Link>
          </LinkContainer>
        </div>
        <div className="vr"></div>
        <div>
          <LinkContainer to="/">
            <Nav.Link>Back to home</Nav.Link>
          </LinkContainer>
        </div>
      </Stack>
    </Form>
  );
};

export default Register;
