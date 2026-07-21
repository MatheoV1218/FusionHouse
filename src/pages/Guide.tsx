import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Guide.css";

import grainyBackground from "../assets/grainyBackground.png";
import fusiontest1 from "../assets/fusiontest1.png";
import fusiontest2 from "../assets/fusiontest2.png";
import fusiontest3 from "../assets/fusiontest3.png";
import fusiontest4 from "../assets/fusiontest4.png";
import fusiontest5 from "../assets/fusiontest5.png";
import fusiontest6 from "../assets/fusiontest6.png";
import fusiontest7 from "../assets/fusiontest7.png";

import { track } from "@vercel/analytics";

// Mindbody booking link — temporarily swapped for the internal /reserve page
// this month so signups can be tracked directly. Restore this href when the
// promo period ends.
// const mindbodyLink =
//   "https://clients.mindbodyonline.com/classic/ws?studioid=470306&stype=-7&sView=week&sLoc=1";

const stepImages = [
  fusiontest1,
  fusiontest2,
  fusiontest3,
  fusiontest4,
  fusiontest5,
  fusiontest6,
  fusiontest7,
];

function Guide() {
  const { t, i18n } = useTranslation();
  const isSpanish = i18n.language === "es";

  const localizedPath = (path: string) => {
    if (!isSpanish) return path;
    return path === "/" ? "/es" : `/es${path}`;
  };

  const guideSteps = t("guide.steps", {
    returnObjects: true,
  }) as {
    number: string;
    title: string;
    text: string;
  }[];

  return (
    <main
      className="guide-page"
      style={{ backgroundImage: `url(${grainyBackground})` }}
    >
      <section className="guide-hero">
        <div className="guide-hero-inner">
          <p className="guide-eyebrow">{t("guide.hero.eyebrow")}</p>
          <h1>{t("guide.hero.title")}</h1>
          <p>{t("guide.hero.text")}</p>

          <div className="guide-actions">
            <Link
              to={localizedPath("/reserve")}
              onClick={() =>
                track("Open Mindbody From Guide", {
                  location: "Guide Hero",
                })
              }
            >
              {t("guide.hero.primaryButton")}
            </Link>

            <Link to={localizedPath("/contact")}>
              {t("guide.hero.secondaryButton")}
            </Link>
          </div>
        </div>
      </section>

      <section className="guide-intro">
        <div>
          <span>{t("guide.intro.eyebrow")}</span>
          <h2>{t("guide.intro.title")}</h2>
        </div>

        <p>{t("guide.intro.text")}</p>
      </section>

      <section className="guide-steps">
        {guideSteps.map((step, index) => (
          <article className="guide-step" key={step.number}>
            <div className="guide-step-copy">
              <span>{step.number}</span>
              <h2>{step.title}</h2>
              <p>{step.text}</p>
            </div>

            <div className="guide-step-image">
              <img
                src={stepImages[index]}
                alt={`${step.title} screenshot`}
              />
            </div>
          </article>
        ))}
      </section>

      <section className="guide-final">
        <h2>{t("guide.final.title")}</h2>
        <p>{t("guide.final.text")}</p>

        <Link
          to={localizedPath("/reserve")}
          onClick={() =>
            track("Open Mindbody From Guide", {
              location: "Guide Final CTA",
            })
          }
        >
          {t("guide.final.button")}
        </Link>
      </section>
    </main>
  );
}

export default Guide;