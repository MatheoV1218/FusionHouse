import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaFacebookF,
  FaGoogle,
  FaWhatsapp,
  FaYelp,
} from "react-icons/fa";
import "./Footer.css";
import { track } from "@vercel/analytics";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <h2>
            <span>The Fusion</span> House
          </h2>
          <p>
            Personal training, group classes, and coaching in White Plains, NY.
          </p>

          <div className="footer-socials">
            <a
              href="https://www.instagram.com/the_fusion_house"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>

            <a
              href="https://www.facebook.com/thefusionhouseny/#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://www.bing.com/search?pglt=425&q=the+fusion+house&cvid=982d0fcb38df467e995b39beb7e68844&gs_lcrp=EgRlZGdlKgYIABBFGDkyBggAEEUYOTIGCAEQABhAMgYIAhAAGEAyBggDEAAYQDIGCAQQABhAMgYIBRAAGEAyBggGEEUYPDIGCAcQRRg8MgYICBBFGDzSAQgyMTYzajBqN6gCALACAA&FORM=ANNTA1&PC=U531"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Google"
            >
              <FaGoogle />
            </a>

            <a
              href="https://api.whatsapp.com/send/?phone=19145529619&text&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>

            <a
              href="https://www.yelp.com/biz/the-fusion-house-fitness-white-plains"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Yelp"
            >
              <FaYelp />
            </a>
          </div>
        </div>

        <div className="footer-card">
          <h3>Ready to train?</h3>
          <p>Book a free trial class and take the first step.</p>
          <a
            href="https://clients.mindbodyonline.com/classic/ws?studioid=470306&stype=-7&sView=week&sLoc=1"
            target="_blank"
            rel="noreferrer"
            className="footer-btn"
            onClick={() =>
              track("Book Now", {
                location: "Footer CTA",
              })
            }
          >
            Book Now
          </a>
        </div>

        <div className="footer-info">
          <div>
            <h4>Explore</h4>
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/about">About</Link>
          </div>

          <div>
            <h4>Visit</h4>
            <p>126 South Lexington Ave</p>
            <p>White Plains, NY</p>
            <a href="tel:9145529619">914-552-9619</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 The Fusion House by Boutique. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
