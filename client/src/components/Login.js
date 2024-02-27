import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import NavComponent from "./NavComponent";
import CarouselComponent from "./CarouselComponent";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/login", { email, password })
      .then((result) => {
        console.log(result);
        if (result.data === "Success") {
          navigate("/main");
        }
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
        <h1 className="text-center mb-3">Login</h1>
        <Form.Group className="mb-3" controlId="loginForm.email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="loginForm.password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-4" controlId="loginForm.login">
          <Button className="d-grid mx-auto" variant="primary" type="submit">
            Login
          </Button>
        </Form.Group>
      </Form>
    </>
  );
};

export default Login;
