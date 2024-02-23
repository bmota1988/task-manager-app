import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Register = () => {
  return (
    <Form className="w-25 position-absolute top-50 start-50 translate-middle bg-body-secondary rounded p-5">
      <h1 className="text-center mb-3">Register</h1>
      <Form.Group className="mb-3" controlId="registerForm.firstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" placeholder="First Name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="registerForm.lastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" placeholder="Last Name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="registerForm.email">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Email" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="registerForm.password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="registerForm.register">
        <Button className="d-grid mx-auto" variant="primary" type="submit">
          Register
        </Button>
      </Form.Group>
      <p className="text-center">
        If you are already registered <a href="./Login.js">click here</a> to
        login.
      </p>
    </Form>
  );
};

export default Register;
