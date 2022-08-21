import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./components/login/login";
import Register from "./components/registration/register";
import Dashboard from "./components/Admin dashboard/admin";
import AdminLogin from "./components/Admin Login/adminlogin";
import Apply from "./components/apply/apply";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const userToken = localStorage.getItem("token");
function App() {
  // Check if user if logged in and get user data
  const [user, setUser] = useState(userToken || null);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* USER ROUTES */}
          <Route index element={user ? <Apply /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ADMIN ROUTES */}
          <Route path="/admin" element={<AdminLogin />} />

          <Route path="/manage" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
