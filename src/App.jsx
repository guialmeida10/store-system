import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login.jsx";
import Dashboard from "./Components/Dashboard/Dashboard.jsx";
import Registrar from "./Components/Registrar/Registrar.jsx";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router basename="/store-system">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Registrar />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
