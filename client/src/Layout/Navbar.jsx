import { NavLink } from "react-router";

import { useAuth } from "../auth/AuthContext";

import "./navbar.css";

export default function Navbar() {
  const { token, logout } = useAuth();
  return (
    <header id="navbar">
      <nav>
        <div id="logo">
          <p>ReviewHub</p>
          <NavLink id="browse" to="/item">
            Browse
          </NavLink>
        </div>

        <div id="buttons">
          <NavLink to="/register">
            <button id="rButton">Register</button>
          </NavLink>

          {token ? (
            <button onClick={logout}>Log out</button>
          ) : (
            <NavLink to="/login">
              <button>Log in</button>
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
}
