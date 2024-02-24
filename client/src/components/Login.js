import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Stack from "react-bootstrap/esm/Stack";
import { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  return (
    <Form className="w-25 position-absolute top-50 start-50 translate-middle bg-body-secondary rounded p-5">
      <h1 className="text-center mb-3">Login</h1>
      <Form.Group className="mb-3" controlId="loginForm.email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="loginForm.password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
      </Form.Group>
      <Form.Group className="mb-4" controlId="loginForm.login">
        <Button className="d-grid mx-auto" variant="primary" type="submit">
          Login
        </Button>
      </Form.Group>
      <Stack className="col-md-8 mx-auto" direction="horizontal" gap={2}>
        <div>
          <LinkContainer to="/register">
            <Nav.Link>Go to register</Nav.Link>
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

export default Login;
