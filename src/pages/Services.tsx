import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./Services.css";
import gympic8 from "../assets/FHgympic8.webp";
// import gympic9 from "../assets/FHgympic9.webp";
import membership from "../assets/FHmembership.jpg";
import personalPic from "../assets/fusionimg4.jpg";
import grainyBackground from "../assets/grainyBackground.png";

import { track } from "@vercel/analytics";

export const mindbodyLink =
  "https://clients.mindbodyonline.com/classic/ws?studioid=470306&stype=-7&sView=week&sLoc=1";

function Services() {
  const { t } = useTranslation();

  const personalPoints = t("services.personal.points", {
    returnObjects: true,
  }) as string[];

  const personalOptions = t("services.personal.options", {
    returnObjects: true,
  }) as {
    className?: string;
    tag?: string;
    title: string;
    text: string;
    price: string;
  }[];

  const membershipPoints = t("services.memberships.points", {
    returnObjects: true,
  }) as string[];

  const membershipOptions = t("services.memberships.options", {
    returnObjects: true,
  }) as {
    className?: string;
    tag?: string;
    title: string;
    text: string;
    price: string;
  }[];

  const rentalPoints = t("services.rental.points", {
    returnObjects: true,
  }) as string[];

  useEffect(() => {
    if (window.location.hash) {
      const section = document.querySelector(window.location.hash);
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, []);

  return (
    <main
      className="services-page"
      style={{ backgroundImage: `url(${grainyBackground})` }}
    >
      <section className="services-hero">
        <div className="services-hero-inner">
          <p className="services-eyebrow">{t("services.hero.eyebrow")}</p>
          <h1>{t("services.hero.title")}</h1>
          <p>{t("services.hero.text")}</p>

          <div className="services-hero-actions">
            <a
              href={mindbodyLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                track("Reserve Your Session Services", {
                  location: "Services Hero",
                })
              }
            >
              {t("services.hero.primaryButton")}
            </a>

            <a
              href="#personal"
              className="secondary-service-btn"
              onClick={() =>
                track("View Services Pricing", {
                  location: "Services Hero",
                })
              }
            >
              {t("services.hero.secondaryButton")}
            </a>
          </div>
        </div>
      </section>

      <section className="services-grid-section">
        <article className="service-card-large" id="personal">
          <div className="service-image-placeholder">
            <img
              src={personalPic}
              alt={t("services.personal.imageAlt")}
              className="personal-service-image"
            />
          </div>

          <div className="service-content">
            <span>01</span>
            <h2>{t("services.personal.title")}</h2>

            <p>{t("services.personal.text")}</p>

            <div className="service-points">
              {personalPoints.map((point) => (
                <p key={point}>{point}</p>
              ))}
            </div>
          </div>

          <details className="service-dropdown" id="pricing">
            <summary>{t("services.personal.dropdownTitle")}</summary>

            <div className="dropdown-grid">
              {personalOptions.map((option) => (
                <div
                  className={`option-card ${option.className || ""}`.trim()}
                  key={option.title}
                >
                  {option.tag && <div className="tag">{option.tag}</div>}
                  <div>
                    <h3>{option.title}</h3>
                    <p>{option.text}</p>
                  </div>
                  <strong>{option.price}</strong>
                </div>
              ))}
            </div>
          </details>
        </article>

        <article className="service-card-large" id="memberships">
          <div className="service-image-placeholder">
            <img src={membership} alt={t("services.memberships.imageAlt")} />
          </div>

          <div className="service-content">
            <span>02</span>

            <h2>{t("services.memberships.title")}</h2>

            <p>{t("services.memberships.text")}</p>

            <div className="service-points">
              {membershipPoints.map((point) => (
                <p key={point}>{point}</p>
              ))}
            </div>
          </div>

          <details className="service-dropdown" id="membership-options">
            <summary>{t("services.memberships.dropdownTitle")}</summary>

            <div className="dropdown-grid">
              {membershipOptions.map((option) => (
                <div
                  className={`option-card ${option.className || ""}`.trim()}
                  key={option.title}
                >
                  {option.tag && <div className="tag">{option.tag}</div>}
                  <div>
                    <h3>{option.title}</h3>
                    <p>{option.text}</p>
                  </div>
                  <strong>{option.price}</strong>
                </div>
              ))}
            </div>
          </details>
        </article>

        <article className="service-card-large" id="rental">
          <div className="service-image-placeholder">
            <img src={gympic8} alt={t("services.rental.imageAlt")} />
          </div>

          <div className="service-content">
            <span>03</span>
            <h2>{t("services.rental.title")}</h2>
            <p>{t("services.rental.text")}</p>

            <div className="service-points">
              {rentalPoints.map((point) => (
                <p key={point}>{point}</p>
              ))}
            </div>
          </div>
        </article>
      </section>

      <section className="services-booking" id="booking">
        <h2>{t("services.booking.title")}</h2>
        <p>{t("services.booking.text")}</p>

        <a
          href={mindbodyLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            track("Open Booking Schedule", {
              location: "Services Bottom CTA",
            })
          }
        >
          {t("services.booking.button")}
        </a>
      </section>
    </main>
  );
}

export default Services;