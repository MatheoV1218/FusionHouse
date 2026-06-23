import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
  const { t, i18n } = useTranslation();
  const isSpanish = i18n.language === "es";

  const localizedPath = (path: string) => {
    if (!isSpanish) return path;
    return path === "/" ? "/es" : `/es${path}`;
  };

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <h2>
            <span>{t("footer.brandA")}</span> {t("footer.brandB")}
          </h2>

          <p>{t("footer.description")}</p>

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
          <h3>{t("footer.cardTitle")}</h3>
          <p>{t("footer.cardText")}</p>

          <a
            href="https://clients.mindbodyonline.com/classic/ws?studioid=470306&stype=-7&sView=week&sLoc=1"
            target="_blank"
            rel="noreferrer"
            className="footer-btn"
            onClick={() =>
              track("Reserve Your Trial Session", {
                location: "Footer CTA",
              })
            }
          >
            {t("footer.cardButton")}
          </a>
        </div>

        <div className="footer-info">
          <div>
            <h4>{t("footer.explore")}</h4>
            <Link to={localizedPath("/")}>{t("footer.home")}</Link>
            <Link to={localizedPath("/services")}>{t("footer.services")}</Link>
            <Link to={localizedPath("/faq")}>{t("footer.faq")}</Link>
            <Link to={localizedPath("/about")}>{t("footer.about")}</Link>
          </div>

          <div>
            <h4>{t("footer.visit")}</h4>
            <p>{t("footer.address1")}</p>
            <p>{t("footer.address2")}</p>
            <a href="tel:9145529619">914-552-9619</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>{t("footer.bottom")}</p>
      </div>
    </footer>
  );
}

export default Footer;