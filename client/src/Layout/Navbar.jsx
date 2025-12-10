import { NavLink } from "react-router";

import { useAuth } from "../auth/AuthContext";

import "./navbar.css";

export default function Navbar() {
  const { token, logout } = useAuth();
  return (
    <header id="navbar">
      <NavLink id="brand" to="/">
        <p>ReviewHub</p>
      </NavLink>
      <NavLink to="register">
        <button>Register</button>
      </NavLink>
      <nav>
        {token ? (
          <button onClick={logout}>Log out</button>
        ) : (
          <NavLink to="/login">Log in</NavLink>
        )}
      </nav>
    </header>
  );
}
