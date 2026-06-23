import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./FAQ.css";
import grainyBackground from "../assets/grainyBackground.png";

function FAQ() {
  const { t, i18n } = useTranslation();
  const [search, setSearch] = useState("");

  const isSpanish = i18n.language === "es";

  const localizedPath = (url: string) => {
    if (!isSpanish || url.startsWith("http") || url.startsWith("tel:")) {
      return url;
    }

    const [path, hash] = url.split("#");
    const localized = path === "/" ? "/es" : `/es${path}`;

    return hash ? `${localized}#${hash}` : localized;
  };

  const faqs = t("faq.items", {
    returnObjects: true,
  }) as {
    category: string;
    question: string;
    answer: string;
    link?: {
      label: string;
      url: string;
      external?: boolean;
    };
  }[];

  const tags = t("faq.tags", {
    returnObjects: true,
  }) as string[];

  const filteredFaqs = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) return faqs;

    return faqs.filter((faq) => {
      return (
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.category.toLowerCase().includes(query)
      );
    });
  }, [search, faqs]);

  const categories = [...new Set(filteredFaqs.map((faq) => faq.category))];

  return (
    <main
      className="faq-page"
      style={{ backgroundImage: `url(${grainyBackground})` }}
    >
      <section className="faq-hero">
        <div className="faq-hero-inner">
          <p className="faq-eyebrow">{t("faq.hero.eyebrow")}</p>
          <h1>{t("faq.hero.title")}</h1>
          <p>{t("faq.hero.text")}</p>

          <div className="faq-search">
            <input
              type="text"
              placeholder={t("faq.hero.placeholder")}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="faq-tags">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                className="faq-tag"
                onClick={() => setSearch(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="faq-content">
        <div className="faq-results-count">
          {t("faq.results.showing")} {filteredFaqs.length}{" "}
          {filteredFaqs.length === 1
            ? t("faq.results.single")
            : t("faq.results.plural")}
        </div>

        {categories.map((category) => (
          <section className="faq-category" key={category}>
            <h2>{category}</h2>

            <div className="faq-list">
              {filteredFaqs
                .filter((faq) => faq.category === category)
                .map((faq) => (
                  <details className="faq-item" key={faq.question}>
                    <summary>{faq.question}</summary>
                    <p>{faq.answer}</p>

                    {faq.link &&
                      (faq.link.external ? (
                        <a
                          className="faq-link"
                          href={faq.link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {faq.link.label}
                        </a>
                      ) : (
                        <Link
                          className="faq-link"
                          to={localizedPath(faq.link.url)}
                        >
                          {faq.link.label}
                        </Link>
                      ))}
                  </details>
                ))}
            </div>
          </section>
        ))}

        {filteredFaqs.length === 0 && (
          <div className="faq-empty">
            <h2>{t("faq.empty.title")}</h2>
            <p>{t("faq.empty.text")}</p>
          </div>
        )}
      </section>
    </main>
  );
}

export default FAQ;