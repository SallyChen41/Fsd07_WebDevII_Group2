import React from "react";
import {} from "firebase/auth";

const Auth = () => {
  return (
    <div>
      <input
        type="text"
        id="email"
        class="fadeIn second"
        name="login"
        placeholder="Email..."
      />
      <input
        type="text"
        id="password"
        class="fadeIn third"
        name="login"
        placeholder="Password..."
      />
      <button>Sign In</button>
    </div>
  );
};

export default Auth;
