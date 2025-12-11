import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "./AuthContext";

import "./auth.css";

/** A form that allows users to log into an existing account. */
export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const onLogin = async (e) => {
    e.preventDefault(); // prevent full page reload

    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      await login({ username, password }); // calls AuthContext.login
      navigate("/item"); // go to item list after login
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <div>
        <div id="login-box">
          <h1>Log in to your account</h1>
          <form onSubmit={onLogin}>
            <label>
              Username
              <input type="username" name="username" required />
            </label>

            <label>
              Password
              <input type="password" name="password" required />
            </label>

            <button id="login-btn" type="submit">
              Login
            </button>

            {error && <output>{error}</output>}
          </form>

          <Link to="/register">Need an account? Register here.</Link>
        </div>
      </div>
    </>
  );
}
