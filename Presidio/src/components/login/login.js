import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function App() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function loginUser(event) {
    event.preventDefault();
    const response = await axios.post("http://localhost:1337/api/login/", {
      email,
      password,
    });

    const data = response.data;
    if (data.status === "ok") {
      // save jwt token and other user related data to local storage
      localStorage.setItem("token", JSON.stringify(data.user));
      navigate("/");
    } else {
      alert("Please check your username and password");
    }
  }

  return (
    <div>
      <h1>User Login</h1>
      <form onSubmit={loginUser}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <br />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <br />
        <input type="submit" value="Login" />
      </form>
    </div>
  )
}

export default App;
