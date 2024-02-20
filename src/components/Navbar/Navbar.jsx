import { FaBars, FaTimes } from "react-icons/fa";
import { useRef } from "react";
import "./Navbar.css";

const Navbar = () => {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <>
      <h3>Tech Journey</h3>
      <nav className="nav-bar" ref={navRef}>
        <a className="nav-links" href="/">
          Home
        </a>
        <a className="nav-links" href="/">
          Latest
        </a>
        <a className="nav-links" href="/">
          Archive
        </a>
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
