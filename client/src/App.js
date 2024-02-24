import React from "react";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route path="/register" Component={Register} />
        <Route path="/login" Component={Login} />
      </Routes>
    </Router>
  );
}

export default App;
