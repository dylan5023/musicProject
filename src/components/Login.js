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
    <div id="loginPage">
      <section className="title">
        <h1>TrackFlow</h1>
        <aside>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </aside>
      </section>
      {/* Login form */}
		<section className = "container">
			<form action="#" id="loginForm">
				<h2 className="form-title">Log in</h2>
				<span className="form-message form-message-error"></span>
				<section className="input-group">
					<input type="text" className="input" autofocus placeholder="Email" />
					<span className="input-error-message"></span>
				</section>
				<section className="input-group">
					<input
					type="password"
					className="input input-error"
					placeholder="Password"
					/>
					<span className="input-error-message"></span>
				</section>
				<button className="submit-button" type="submit">Continue</button>
				<section className="link-group">
					<a className="link forgot">Forgot your password?</a>
					<a className="link noaccount" id="linkCreateAccount">
						Don't have an account? Create account
					</a>
				</section>
			</form>
			{/* Create account form */}
			<form className="hidden" id="createAccountForm">
				<h2 className="form-title">
					Create Account
				</h2>
				<span className="form-message form-message-error"></span>
				<section className="input-group">
					<input type="email" className="input" autofocus placeholder="Email" />
					<span className="input-error-message"></span>
				</section>
				<section className="input-group">
					<input type="password" id="password1" className="input input-error" placeholder="Password"/>
					<span className="input-error-message"></span>
				</section>
				<button className="form-button" type="submit">Continue</button>
					<section className="link-text">
						<a className="link account" id="linkLogin">
							Already have an account? Sign in
						</a>
					</section>
			</form>
		</section>
    </div>
  );
}

export default Login;
