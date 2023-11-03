import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import helper from "../helper/helper";
import "./styles.css";
import NavbarComponent from "../component/Navbar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage?.getItem("token");
    if (data) {
      navigate("/");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${helper}/api/login`, {
        email,
        password,
      });
      const { token, userDetails } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userDetails", JSON.stringify(userDetails));

      setToken(localStorage.getItem("token", token));
      setMessage("");
      setEmail("");
      setPassword("");
      navigate("/");
      window.location.reload(false);
    } catch (error) {
      setMessage("Invalid Email or Password");
    }
  };

  return (
    <>
      <NavbarComponent signIn={true} />
      <div className="login">
        {!token && (
          <>
            <h2>Login</h2>
            <div className="login-form">
              <form onSubmit={handleLogin}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="on"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="sign-message">{message && message}</div>
                <button type="submit">Login</button>
              </form>
            </div>
            <div className="is-new-user">
              New User? <a href="/signup">Sign Up</a>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Login;
