import React, { useState } from "react";
import "./Login.css";
import $ from "jquery";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  let users = null;

  $.getJSON("http://localhost:8070/users", (data) => {
    users = data;
    console.log(users);
  });

  const handleLogin = (event) => {
    event.preventDefault();
    // Logic for handling login
  };

  const handleCreateAccount = (event) => {
    event.preventDefault();
    // Logic for handling create account
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {showCreateAccount ? (
        <form onSubmit={handleCreateAccount}>
          <label htmlFor="newEmail">Email:</label>
          <input type="email" id="newEmail" required />
          <label htmlFor="newPassword">Password:</label>
          <input type="password" id="newPassword" required />
          <button type="submit">Create Account</button>
        </form>
      ) : (
        <button onClick={() => setShowCreateAccount(true)}>
          Create Account
        </button>
      )}
    </div>
  );
}

export default Login;
