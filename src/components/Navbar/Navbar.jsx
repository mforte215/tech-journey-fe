import { FaBars, FaTimes } from "react-icons/fa";
import { useRef } from "react";
import "./Navbar.css";
import Auth from "../../../utils/auth";

const Navbar = () => {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const handleLogout = () => {
    console.log("LOGGING OUT");
    Auth.logout();
  };

  const logoClickhandler = () => {
    window.location.assign("/");
  };

  let userLinks = (
    <>
      <a className="nav-links" href="/login">
        Login
      </a>
      <a className="nav-links" href="/signup">
        Sign Up
      </a>
    </>
  );

  if (Auth.loggedIn()) {
    userLinks = (
      <>
        <a className="nav-links logout-btn" onClick={handleLogout}>
          Logout
        </a>
        <a className="nav-links" href="/profile/me">
          Profile
        </a>
        <a className="nav-links" href="/article/add">
          Add Article
        </a>
      </>
    );
  }

  return (
    <>
      <h3 className="logo-header-link" onClick={logoClickhandler}>
        Tech Journey
      </h3>
      <nav className="nav-bar" ref={navRef}>
        <a className="nav-links" href="/">
          Home
        </a>
        {userLinks}
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </>
  );
};

export default Navbar;
