import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import "./Navbar.css";

import { track } from "@vercel/analytics";

import FusionLogo from "../assets/FusionLogo.png";

function Navbar() {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  return (
    <header className="navbar">
      <Link to="/" className="nav-logo" onClick={closeMenu}>
        <img src={FusionLogo} alt="Fusion House Fitness" />
      </Link>

      <nav className={`nav-menu ${open ? "show" : ""}`}>
        <NavLink to="/" onClick={closeMenu}>
          Home
        </NavLink>
        <NavLink to="/services" onClick={closeMenu}>
          Services
        </NavLink>
        <NavLink to="/about" onClick={closeMenu}>
          About
        </NavLink>
        <NavLink to="/faq" onClick={closeMenu}>
          FAQ
        </NavLink>
        <NavLink to="/contact" onClick={closeMenu}>
          Contact
        </NavLink>

        <a
          href="https://clients.mindbodyonline.com/classic/ws?studioid=470306&stype=-7&sView=week&sLoc=1"
          target="_blank"
          rel="noreferrer"
          className="mobile-book"
          onClick={() => {
            track("Book Now", {
              location: "Navbar Mobile",
            });
            closeMenu();
          }}
        >
          Book Now
        </a>
      </nav>

      <div className="nav-right">
        <a
          href="https://clients.mindbodyonline.com/classic/ws?studioid=470306&stype=-7&sView=week&sLoc=1"
          target="_blank"
          rel="noreferrer"
          className="nav-book"
          onClick={() =>
            track("Book Now", {
              location: "Navbar Desktop",
            })
          }
        >
          Book Now
        </a>

        <button className="hamburger" onClick={() => setOpen(!open)}>
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>
    </header>
  );
}

export default Navbar;
