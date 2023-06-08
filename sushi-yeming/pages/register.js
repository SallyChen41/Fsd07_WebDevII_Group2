import React, { useState } from "react";
import { useRouter } from "next/router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../config/firebase";
import FlashMessage from "../components/FlashMessage";
import ErrorMessage from "../components/ErrorMessage";

const Register = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalcode, setPostalcode] = useState("");

  const [showFlash, setShowFlash] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhoneNumChange = (e) => {
    setPhoneNum(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handlePostalcodeChange = (e) => {
    setPostalcode(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      //   console.log(auth);
      const authResult = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = authResult;

      // Save additional user data to Firestore
      const userData = {
        userId: user.uid,
        role: "customer", // Set the default role to 'customer'
        username,
        email,
        name,
        phoneNum,
        address,
        city,
        postalcode,
      };

      // creates a document reference for the "users" collection
      // with the user's UID as the document ID and then sets the userData
      // object as the data for that document in the Firestore database
      await setDoc(doc(firestore, "users", user.uid), userData);
      // Registration successful
      console.log("Registered successfully");
      setShowFlash(true);
      setTimeout(() => {
        router.push("/");
      }, 2000);

      // Reset form fields after successful registration
      setUsername("");
      setEmail("");
      setPassword("");
      setName("");
      setPhoneNum("");
      setAddress("");
      setCity("");
      setPostalcode("");
      setErrorMessage(""); // Clear any previous error messages
    } catch (error) {
      // Handle registration error
      console.log("Registration error:", error.message);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="container">
      <h1>Register</h1>
      {showFlash && !errorMessage && (
        <FlashMessage message="Registered successfully!" />
      )}

      {errorMessage && <ErrorMessage message={errorMessage} />}
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            className="form-control"
            placeholder="Username"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            className="form-control"
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            className="form-control"
            placeholder="Password"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleNameChange}
            className="form-control"
            placeholder="Name"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="phoneNum"
            value={phoneNum}
            onChange={handlePhoneNumChange}
            className="form-control"
            placeholder="Phone Number"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="address"
            value={address}
            onChange={handleAddressChange}
            className="form-control"
            placeholder="Address"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="city"
            value={city}
            onChange={handleCityChange}
            className="form-control"
            placeholder="City"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="postalcode"
            value={postalcode}
            onChange={handlePostalcodeChange}
            className="form-control"
            placeholder="Postal Code"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mb-3">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
