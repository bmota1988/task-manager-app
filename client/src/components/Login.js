import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Login = () => {
  return (
    <Form className="w-25 position-absolute top-50 start-50 translate-middle bg-body-secondary rounded p-5">
      <h1 className="text-center mb-3">Login</h1>
      <Form.Group className="mb-3" controlId="loginForm.email">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Email" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="loginForm.password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="loginForm.login">
        <Button className="d-grid mx-auto" variant="primary" type="submit">
          Login
        </Button>
      </Form.Group>
      <p className="text-center">
        If you are not registered <a href="./Register.js">click here </a>to
        register.
      </p>
    </Form>
  );
};

export default Login;
