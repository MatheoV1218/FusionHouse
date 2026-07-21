import { useState } from "react";
import type { FormEvent } from "react";
import { FaPhoneAlt, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import "./Contact.css";

import grainyBackground from "../assets/grainyBackground.png";

import { track } from "@vercel/analytics";

const ownerEmail = "Infofusionhouse@gmail.com";

type FormStatus = "idle" | "loading" | "success" | "error";

function Contact() {
  const { t } = useTranslation();
  const [status, setStatus] = useState<FormStatus>("idle");

  const hours = t("contact.info.hoursList", {
    returnObjects: true,
  }) as string[];

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    track("Contact Form Submitted Contact Page", {
      location: "Contact Page",
    });

    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("loading");

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${ownerEmail}`,
        {
          method: "POST",
          headers: { Accept: "application/json" },
          body: formData,
        },
      );

      const result = await response.json();
      if (!response.ok || result.success !== "true") {
        throw new Error("Submission failed");
      }

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <main
      className="contact-page"
      style={{ backgroundImage: `url(${grainyBackground})` }}
    >
      <section className="contact-hero">
        <div className="contact-hero-inner">
          <p className="contact-eyebrow">{t("contact.hero.eyebrow")}</p>
          <h1>{t("contact.hero.title")}</h1>
          <p>{t("contact.hero.text")}</p>
        </div>
      </section>

      <section className="contact-quick">
        <a
          href="tel:9145529619"
          className="contact-card"
          onClick={() =>
            track("Call Gym Contact", {
              location: "Contact Page",
            })
          }
        >
          <FaPhoneAlt />
          <h3>{t("contact.cards.call.title")}</h3>
          <p>914-552-9619</p>
        </a>

        <a
          href="https://api.whatsapp.com/send/?phone=19145529619&text&type=phone_number&app_absent=0"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-card"
          onClick={() =>
            track("WhatsApp Click Contact", {
              location: "Contact Page",
            })
          }
        >
          <FaWhatsapp />
          <h3>{t("contact.cards.whatsapp.title")}</h3>
          <p>{t("contact.cards.whatsapp.text")}</p>
        </a>

        <a
          href="https://www.google.com/maps/search/?api=1&query=126+South+Lexington+Avenue+White+Plains+NY+10606"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-card"
          onClick={() =>
            track("Directions Click Contact", {
              location: "Contact Page",
            })
          }
        >
          <FaMapMarkerAlt />
          <h3>{t("contact.cards.visit.title")}</h3>
          <p>{t("contact.cards.visit.text")}</p>
        </a>
      </section>

      <section className="contact-main">
        {status === "success" ? (
          <div className="contact-form form-success" role="status" aria-live="polite">
            <div className="form-success-icon">✓</div>
            <h2>{t("contact.form.successTitle")}</h2>
            <p>{t("contact.form.successText")}</p>
            <button type="button" onClick={() => setStatus("idle")}>
              {t("contact.form.sendAnother")}
            </button>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="hidden"
              name="_subject"
              value="New The Fusion House Website Message"
            />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />

            <h2>{t("contact.form.title")}</h2>

            <input
              type="text"
              name="name"
              placeholder={t("contact.form.name")}
              required
            />
            <input
              type="email"
              name="email"
              placeholder={t("contact.form.email")}
              required
            />
            <textarea
              name="message"
              placeholder={t("contact.form.message")}
              required
            ></textarea>

            <button type="submit" disabled={status === "loading"}>
              {status === "loading"
                ? t("contact.form.sending")
                : t("contact.form.button")}
            </button>

            {status === "error" && (
              <p className="form-error">{t("contact.form.errorText")}</p>
            )}

            <p className="form-note">{t("contact.form.note")}</p>
          </form>
        )}

        <div className="contact-info">
          <h2>{t("contact.info.title")}</h2>

          <div>
            <h3>{t("contact.info.addressTitle")}</h3>
            <p>126 South Lexington Avenue</p>
            <p>White Plains, NY 10606</p>
          </div>

          <div>
            <h3>{t("contact.info.phoneTitle")}</h3>
            <p>914-552-9619</p>
          </div>

          <div>
            <h3>{t("contact.info.hoursTitle")}</h3>
            {hours.map((hour) => (
              <p key={hour}>{hour}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="map-section">
        <div className="map-card">
          <iframe
            title="The Fusion House Location"
            src="https://www.google.com/maps?q=126%20South%20Lexington%20Avenue%20White%20Plains%20NY%2010606&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          ></iframe>
        </div>
      </section>
    </main>
  );
}

export default Contact;