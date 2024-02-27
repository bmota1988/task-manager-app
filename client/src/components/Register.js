import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import NavComponent from "./NavComponent";
import CarouselComponent from "./CarouselComponent";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  // useState a hook to catch the value of input form
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/register", form)
      .then((result) => {
        console.log(result);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <NavComponent />
      <CarouselComponent />
      <Form
        className="w-25 position-absolute top-50 start-50 translate-middle bg-body-secondary rounded p-5"
        onSubmit={handleSubmit}
      >
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
      </Form>
    </>
  );
};

export default Register;
