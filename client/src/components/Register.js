import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavComponent from "./NavComponent";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const { firstName, lastName, email, password } = form;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/register",
        {
          ...form,
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        alert(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        alert(message);
      }
    } catch (error) {
      console.log(error);
    }
    setForm({
      ...form,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  };

  return (
    <>
      <NavComponent />

      <form
        className="w-25 position-absolute top-50 start-50 translate-middle bg-body-secondary rounded p-5"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center mb-3">Register</h1>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="First Name"
          name="firstName"
          value={firstName}
          onChange={handleOnChange}
          autoComplete="firstName"
          required
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Last Name"
          name="lastName"
          value={lastName}
          onChange={handleOnChange}
          autoComplete="lastName"
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleOnChange}
          autoComplete="email"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleOnChange}
          autoComplete="password"
          required
        />
        <button className="btn btn-primary d-grid mx-auto" type="submit">
          Register
        </button>
      </form>
    </>
  );
};

export default Register;
