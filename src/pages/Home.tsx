import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Home.css";
import gympic5 from "../assets/FHgympic5.webp";
import grainyBackground from "../assets/grainyBackground.png";
import { googleReviews, googleReviewsLink } from "../data";

import BCW from "../assets/BCW.png";
import NASM from "../assets/NASM.png";
import NYSBDC from "../assets/nysbc.png";

import { track } from "@vercel/analytics";

const carouselImages = Object.entries(
  import.meta.glob(
    "../assets/carousel/*.{jpg,JPG,jpeg,JPEG,png,PNG,webp,WEBP}",
    {
      eager: true,
      query: "?url",
      import: "default",
    },
  ),
)
  .sort(([a], [b]) => {
    const numA = Number(a.match(/FH(\d+)/i)?.[1] ?? 0);
    const numB = Number(b.match(/FH(\d+)/i)?.[1] ?? 0);
    return numA - numB;
  })
  .map(([, src]) => src as string);

type CardText = {
  number: string;
  title: string;
  text: string;
};

type ProgramText = {
  label: string;
  title: string;
  text: string;
  link: string;
};

function Home() {
  const { t, i18n } = useTranslation();
  const isSpanish = i18n.language === "es";

  const localizedPath = (path: string) => {
    if (!isSpanish) return path;
    return path === "/" ? "/es" : `/es${path}`;
  };

  const actions = t("home.actions", { returnObjects: true }) as CardText[];
  const audienceCards = t("home.audienceCards", {
    returnObjects: true,
  }) as CardText[];
  const programs = t("home.programs", {
    returnObjects: true,
  }) as ProgramText[];

  return (
    <main
      className="home"
      style={{ backgroundImage: `url(${grainyBackground})` }}
    >
      <section
        className="home-hero"
        style={{ backgroundImage: `url(${gympic5})` }}
      >
        <div className="hero-inner">
          <p className="eyebrow">{t("home.heroEyebrow")}</p>

          <h1>{t("home.heroTitle")}</h1>

          <p className="hero-subtitle">{t("home.heroSubtitle")}</p>

          <div className="hero-buttons">
            {/* Mindbody booking link — temporarily swapped for the internal
                /reserve page this month so signups can be tracked directly.
                Restore this href when the promo period ends.
            <a
              href="https://clients.mindbodyonline.com/classic/ws?studioid=470306&stype=-7&sView=week&sLoc=1"
              target="_blank"
              rel="noreferrer"
              className="btn primary"
            >
              {t("home.reserveYourSession")}
            </a>
            */}
            <Link
              to={localizedPath("/reserve")}
              className="btn primary"
              onClick={() =>
                track("Book Free Trial Home", {
                  location: "Hero",
                })
              }
            >
              {t("home.reserveYourSession")}
            </Link>

            <Link
              to={localizedPath("/services")}
              className="btn secondary"
              onClick={() =>
                track("Explore Memberships Home", {
                  location: "Hero",
                })
              }
            >
              {t("home.exploreMemberships")}
            </Link>
          </div>

          <div className="action-cards">
            <Link
              to={localizedPath("/reserve")}
              onClick={() =>
                track("Book Now Home", {
                  location: "Action Card",
                })
              }
            >
              <span>{actions[0].number}</span>
              <h3>{actions[0].title}</h3>
              <p>{actions[0].text}</p>
            </Link>

            <Link
              to={localizedPath("/faq")}
              onClick={() =>
                track("FAQ Opened Home", {
                  location: "Action Card",
                })
              }
            >
              <span>{actions[1].number}</span>
              <h3>{actions[1].title}</h3>
              <p>{actions[1].text}</p>
            </Link>

            <a
              href="tel:9145529619"
              onClick={() =>
                track("Call Gym Home", {
                  location: "Action Card",
                })
              }
            >
              <span>{actions[2].number}</span>
              <h3>{actions[2].title}</h3>
              <p>{actions[2].text}</p>
            </a>

            <Link
              to={localizedPath("/guide")}
              onClick={() =>
                track("Reservation Guide Opened Home", {
                  location: "Action Card",
                })
              }
            >
              <span>{actions[3].number}</span>
              <h3>{actions[3].title}</h3>
              <p>{actions[3].text}</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="audience-section">
        <div className="audience-inner">
          <div className="audience-copy">
            <p className="eyebrow dark">{t("home.builtForAdults")}</p>
            <h2>{t("home.audienceTitle")}</h2>
            <p>{t("home.audienceText")}</p>
          </div>

          <div className="audience-cards">
            {audienceCards.map((card) => (
              <article key={card.number}>
                <span>{card.number}</span>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </div>

          <div className="programs-overview">
            <div className="program-card">
              <span>{programs[0].label}</span>
              <h3>{programs[0].title}</h3>
              <p>{programs[0].text}</p>
              <Link
                to={localizedPath("/services#personal")}
                onClick={() =>
                  track("Personal Training Explore Private Coaching Home", {
                    section: "Programs",
                  })
                }
              >
                {programs[0].link}
              </Link>
            </div>

            <div className="program-card">
              <span>{programs[1].label}</span>
              <h3>{programs[1].title}</h3>
              <p>{programs[1].text}</p>
              <Link
                to={localizedPath("/services#memberships")}
                onClick={() =>
                  track("Group Training Explore Small-Group Training Home", {
                    section: "Programs",
                  })
                }
              >
                {programs[1].link}
              </Link>
            </div>

            <div className="program-card">
              <span>{programs[2].label}</span>
              <h3>{programs[2].title}</h3>
              <p>{programs[2].text}</p>
              <Link
                to={localizedPath("/services#membership-options")}
                onClick={() =>
                  track("Memberships Explore Memberships Home", {
                    section: "Programs",
                  })
                }
              >
                {programs[2].link}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="community-carousel-section">
        <div className="community-carousel-heading">
          <p className="eyebrow dark">{t("home.realMembers")}</p>
          <h2>{t("home.carouselTitle")}</h2>
          <p>{t("home.carouselText")}</p>
        </div>

        <div className="community-carousel">
          <div className="carousel-track">
            {[...carouselImages, ...carouselImages].map((image, index) => (
              <div className="carousel-photo-card" key={`${image}-${index}`}>
                <img
                  src={image}
                  alt={t("home.memberAlt")}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="partners-section">
        <div className="partners-heading">
          <p className="eyebrow dark">{t("home.communityPartners")}</p>

          <h2>{t("home.partnersTitle")}</h2>

          <p>{t("home.partnersText")}</p>
        </div>

        <div className="partners-grid">
          <div className="partner-card">
            <img
              src={BCW}
              alt="Business Council of Westchester Partner"
              loading="lazy"
            />
          </div>

          <div className="partner-card">
            <img src={NASM} alt="NASM Approved Provider" loading="lazy" />
          </div>

          <div className="partner-card">
            <img
              src={NYSBDC}
              alt="New York Small Business Development Center"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="reviews-preview">
        <p className="eyebrow dark">{t("home.googleReviews")}</p>
        <h2>{t("home.reviewsTitle")}</h2>

        <div className="google-review-summary">
          <div>
            <span className="google-badge">Google</span>
            <strong>4.9</strong>
            <div className="stars">★★★★★</div>
            <p>{t("home.basedReviews")}</p>
          </div>

          <a
            href={googleReviewsLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              track("View All Google Reviews", {
                location: "Home Reviews",
              })
            }
          >
            {t("home.readAllReviews")}
          </a>
        </div>

        <div className="reviews-scroll">
          <div className="reviews-track">
            {[...googleReviews, ...googleReviews].map((review, index) => (
              <article
                className="google-review-card"
                key={`${review.name}-${index}`}
              >
                <div className="review-top">
                  <div className="review-avatar">{review.name.charAt(0)}</div>

                  <div>
                    <h3>{review.name}</h3>
                    <p>{review.date}</p>
                  </div>
                </div>

                <div className="stars">{"★".repeat(review.rating)}</div>

                <p className="review-text">“{review.text}”</p>

                <a
                  href={googleReviewsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    track("Read Google Review", {
                      reviewer: review.name,
                    })
                  }
                >
                  {t("home.viewOnGoogle")}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="final-home-cta">
        <h2>{t("home.finalTitle")}</h2>
        <p>{t("home.finalText")}</p>

        {/* Mindbody booking link — temporarily swapped for the internal
            /reserve page this month so signups can be tracked directly.
            Restore this href when the promo period ends.
        <a
          href="https://clients.mindbodyonline.com/classic/ws?studioid=470306&stype=-7&sView=week&sLoc=1"
          target="_blank"
          rel="noreferrer"
          className="btn primary"
        >
          {t("home.reserveYourSession")}
        </a>
        */}
        <Link
          to={localizedPath("/reserve")}
          className="btn primary"
          onClick={() =>
            track("Book Free Trial Home", {
              location: "Final CTA",
            })
          }
        >
          {t("home.reserveYourSession")}
        </Link>
      </section>
    </main>
  );
}

export default Home;
