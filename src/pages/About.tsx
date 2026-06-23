import { useTranslation } from "react-i18next";
import "./About.css";
import gympic1 from "../assets/FHgympic1.webp";
import ownerpic from "../assets/owner.jpg";
import grainyBackground from "../assets/grainyBackground.png";

function About() {
  const { t } = useTranslation();

  const timeline = t("about.timeline.items", {
    returnObjects: true,
  }) as {
    bubble: string;
    title: string;
    text: string;
  }[];

  const values = t("about.values.items", {
    returnObjects: true,
  }) as {
    title: string;
    text: string;
  }[];

  const ownerStory = t("about.owner.story", {
    returnObjects: true,
  }) as string[];

  return (
    <main
      className="about-page"
      style={{ backgroundImage: `url(${grainyBackground})` }}
    >
      <section className="about-hero">
        <div className="about-container">
          <div className="about-hero-text">
            <p className="about-eyebrow">{t("about.hero.eyebrow")}</p>
            <h1>{t("about.hero.title")}</h1>
            <p>{t("about.hero.text")}</p>
          </div>

          <div className="about-image-placeholder">
            <img src={gympic1} alt={t("about.hero.imageAlt")} />
          </div>
        </div>
      </section>

      <section className="timeline-section">
        <div className="section-header">
          <p className="about-eyebrow dark">{t("about.timeline.eyebrow")}</p>
          <h2>{t("about.timeline.title")}</h2>
        </div>

        <div className="timeline-path">
          {timeline.map((item) => (
            <div className="timeline-item" key={item.title}>
              <div className="timeline-bubble">{item.bubble}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="values-section">
        <div className="section-header">
          <p className="about-eyebrow dark">{t("about.values.eyebrow")}</p>
          <h2>{t("about.values.title")}</h2>
        </div>

        <div className="values-grid">
          {values.map((value) => (
            <article key={value.title}>
              <h3>{value.title}</h3>
              <p>{value.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="owner-section">
        <div className="owner-image-placeholder">
          <img src={ownerpic} alt={t("about.owner.imageAlt")} />
        </div>

        <div className="owner-content">
          <p className="about-eyebrow dark">{t("about.owner.eyebrow")}</p>

          <h2>{t("about.owner.name")}</h2>

          <p className="owner-title">
            {t("about.owner.titleBefore")} <em>{t("about.owner.bookTitle")}</em>
          </p>

          <p>{t("about.owner.text")}</p>

          <a
            href="https://publishizer.com/fitness-sucks/preview/"
            target="_blank"
            rel="noopener noreferrer"
            className="owner-book-cta"
          >
            {t("about.owner.cta")}
          </a>

          <details>
            <summary>{t("about.owner.summary")}</summary>

            {ownerStory.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </details>
        </div>
      </section>
    </main>
  );
}

export default About;