import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavComponent from "./NavComponent";

const Login = () => {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/login",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );

      console.log(data);

      const { success, message } = data;
      if (success) {
        alert(message);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        alert(message);
      }
    } catch (error) {
      console.log(error);
    }

    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
  };

  return (
    <div>
      <NavComponent />
      <form
        className="w-25 position-absolute top-50 start-50 translate-middle bg-body-secondary rounded p-5"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center mb-3">Login</h1>
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
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
