import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/router";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import FlashMessage from "../components/FlashMessage";
import ErrorMessage from "../components/ErrorMessage";

const Login = () => {
  const router = useRouter(); // Access the router object

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showFlash, setShowFlash] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Login successful
      console.log("Logged in successfully");

      setShowFlash(true); // Show flash message
      // Redirect to the homepage after a short delay
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      // Handle login error
      console.log("Login error:", error.message);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="container">
      <h1 className="mt-4">Login</h1>

      {showFlash && !errorMessage && (
        <FlashMessage message="Logged in successfully!" />
      )}

      {errorMessage && <ErrorMessage error={errorMessage} />}

      <form className="mt-4" onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
            required
          />
        </div>
        <button className="btn btn-primary mb-3" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
