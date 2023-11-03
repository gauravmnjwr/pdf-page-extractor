import React, { useEffect, useState } from "react";
import axios from "axios";
import helper from "../helper/helper";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../component/Navbar";

function Signup({ token, tokenChange }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage?.getItem("token");
    if (data) {
      navigate("/");
    }
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      setMessage("Password does not match");
      return;
    }
    try {
      // Send signup request to the backend
      setMessage("");
      const response = await axios.post(`${helper}/api/signup`, {
        email,
        password,
      });
      const { token, userDetails } = response.data;
      // Store the token in local storage
      localStorage.setItem("token", token);
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
      // Set the token state
      // Clear the form
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigate("/");
      window.location.reload(false);
    } catch (error) {
      setMessage("User Already Exists");
    }
  };

  return (
    <>
      <NavbarComponent signUp={true} />

      <div className="signup">
        {!token && (
          <>
            <h2>Sign up</h2>
            <form onSubmit={handleSignup}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <div className="sign-message">{message && message}</div>
              <button type="submit">Signup</button>
              <br />
            </form>
          </>
        )}
        <div className="already-user">
          Already a User? <a href="/login">Sign In</a>
        </div>
      </div>
    </>
  );
}

export default Signup;
