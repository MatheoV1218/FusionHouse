import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import "./Navbar.css";

import { track } from "@vercel/analytics";

import FusionLogo from "../assets/FusionLogo.png";

// Mindbody booking link — temporarily swapped for the internal /reserve page
// this month so signups can be tracked directly. Restore this href when the
// promo period ends.
// const mindbodyLink =
//   "https://clients.mindbodyonline.com/classic/ws?studioid=470306&stype=-7&sView=week&sLoc=1";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const isSpanish = i18n.language === "es";
  const closeMenu = () => setOpen(false);

  const localizedPath = (path: string) => {
    if (!isSpanish) return path;
    return path === "/" ? "/es" : `/es${path}`;
  };

  const switchLanguage = () => {
    const currentPath = location.pathname + location.search + location.hash;

    if (isSpanish) {
      const englishPath = currentPath.replace(/^\/es/, "") || "/";
      i18n.changeLanguage("en");
      navigate(englishPath);
    } else {
      const spanishPath = currentPath === "/" ? "/es" : `/es${currentPath}`;
      i18n.changeLanguage("es");
      navigate(spanishPath);
    }

    closeMenu();
  };

  return (
    <header className="navbar">
      <Link to={localizedPath("/")} className="nav-logo" onClick={closeMenu}>
        <img src={FusionLogo} alt="Fusion House Fitness" />
      </Link>

      <nav className={`nav-menu ${open ? "show" : ""}`}>
        <NavLink to={localizedPath("/")} end onClick={closeMenu}>
          {t("nav.home")}
        </NavLink>

        <NavLink to={localizedPath("/services")} onClick={closeMenu}>
          {t("nav.services")}
        </NavLink>

        <NavLink to={localizedPath("/about")} onClick={closeMenu}>
          {t("nav.about")}
        </NavLink>

        <NavLink to={localizedPath("/faq")} onClick={closeMenu}>
          {t("nav.faq")}
        </NavLink>

        <NavLink to={localizedPath("/contact")} onClick={closeMenu}>
          {t("nav.contact")}
        </NavLink>

        <button type="button" className="mobile-book" onClick={switchLanguage}>
          {t("nav.language")}
        </button>

        <Link
          to={localizedPath("/reserve")}
          className="mobile-book"
          onClick={() => {
            track("Book Now", {
              location: "Navbar Mobile",
            });
            closeMenu();
          }}
        >
          {t("nav.bookNow")}
        </Link>
      </nav>

      <div className="nav-right">
        <button type="button" className="nav-book" onClick={switchLanguage}>
          {t("nav.language")}
        </button>

        <Link
          to={localizedPath("/reserve")}
          className="nav-book"
          onClick={() =>
            track("Book Now", {
              location: "Navbar Desktop",
            })
          }
        >
          {t("nav.bookNow")}
        </Link>

        <button
          className="hamburger"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation menu"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>
    </header>
  );
}

export default Navbar;