import React from 'react';
import './App.css';
import Homepage from './components/home page/homepage';
import Login from './components/login/login';
import Register from './components/registration/register';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Register />} />
          <Route path="/home" element={<Homepage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
