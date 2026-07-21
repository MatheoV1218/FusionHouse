import { useState } from "react";
import type { FormEvent } from "react";
import { useTranslation } from "react-i18next";
import {
  FaDumbbell,
  FaUsers,
  FaMedal,
  FaRegClock,
} from "react-icons/fa";
import "./Reserve.css";

import grainyBackground from "../assets/grainyBackground.png";
import heroImage from "../assets/FHgympic10.webp";

import { track } from "@vercel/analytics";

const ownerEmail = "Infofusionhouse@gmail.com";

type ClassSession = {
  time: string;
  className: string;
  trainer: string;
};

type ScheduleDay = {
  day: string;
  sessions: ClassSession[];
};

type FormStatus = "idle" | "loading" | "success" | "error";

const trustIcons = [FaDumbbell, FaUsers, FaMedal, FaRegClock];

function Reserve() {
  const { t, i18n } = useTranslation();
  const isSpanish = i18n.language === "es";
  const [status, setStatus] = useState<FormStatus>("idle");

  const schedule = t("reserve.schedule", {
    returnObjects: true,
  }) as ScheduleDay[];

  const trustPoints = t("reserve.trust.points", {
    returnObjects: true,
  }) as string[];

  const steps = t("reserve.steps.items", {
    returnObjects: true,
  }) as { title: string; text: string }[];

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    track(
      isSpanish
        ? "Reserve Page Form Submitted Spanish"
        : "Reserve Page Form Submitted English",
      {
        location: "Reserve Page",
        language: isSpanish ? "Spanish" : "English",
      },
    );

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
      className="reserve-page"
      style={{ backgroundImage: `url(${grainyBackground})` }}
    >
      <section
        className="reserve-hero"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="reserve-hero-overlay" />
        <div className="reserve-hero-inner">
          <p className="reserve-eyebrow">{t("reserve.hero.eyebrow")}</p>
          <h1>{t("reserve.hero.title")}</h1>
          <p>{t("reserve.hero.text")}</p>
          <a href="#reserve-form" className="reserve-hero-btn">
            {t("reserve.hero.button")}
          </a>
        </div>
      </section>

      <section className="reserve-trust">
        {trustPoints.map((point, index) => {
          const Icon = trustIcons[index % trustIcons.length];
          return (
            <div className="reserve-trust-item" key={point}>
              <Icon />
              <p>{point}</p>
            </div>
          );
        })}
      </section>

      <section className="reserve-main" id="reserve-form">
        <div className="reserve-info">
          <p className="reserve-eyebrow dark">{t("reserve.info.eyebrow")}</p>
          <h2>{t("reserve.info.title")}</h2>
          <p className="reserve-info-text">{t("reserve.info.text")}</p>

          <div className="reserve-schedule">
            {schedule.map((day) => (
              <div className="reserve-schedule-day" key={day.day}>
                <h3>{day.day}</h3>
                {day.sessions.length > 0 ? (
                  <ul>
                    {day.sessions.map((session) => (
                      <li key={`${day.day}-${session.time}`}>
                        <span className="reserve-schedule-time">
                          {session.time}
                        </span>
                        <span className="reserve-schedule-class">
                          {session.className}
                        </span>
                        <span className="reserve-schedule-trainer">
                          {session.trainer}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="reserve-schedule-rest">
                    {t("reserve.restDayLabel")}
                  </p>
                )}
              </div>
            ))}
          </div>

          <p className="reserve-friend">{t("reserve.info.friendNote")}</p>
        </div>

        <div className="reserve-form-card">
          {status === "success" ? (
            <div
              className="reserve-form form-success"
              role="status"
              aria-live="polite"
            >
              <div className="form-success-icon">✓</div>
              <h2>{t("reserve.form.successTitle")}</h2>
              <p>{t("reserve.form.successText")}</p>
              <button type="button" onClick={() => setStatus("idle")}>
                {t("reserve.form.signUpAnother")}
              </button>
            </div>
          ) : (
            <form className="reserve-form" onSubmit={handleSubmit}>
              <input
                type="hidden"
                name="_subject"
                value="New Priority Reservation - The Fusion House"
              />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input
                type="hidden"
                name="_autoresponse"
                value={t("reserve.form.autoresponse")}
              />

              <h2>{t("reserve.form.title")}</h2>
              <p>{t("reserve.form.subtitle")}</p>

              <input
                type="text"
                name="Name"
                placeholder={t("reserve.form.namePlaceholder")}
                required
              />
              <input
                type="tel"
                name="Phone"
                placeholder={t("reserve.form.phonePlaceholder")}
                required
              />
              <input
                type="email"
                name="email"
                placeholder={t("reserve.form.emailPlaceholder")}
                required
              />

              <select
                name="Preferred Class"
                defaultValue=""
                required
                aria-label={t("reserve.form.selectLabel")}
              >
                <option value="" disabled>
                  {t("reserve.form.selectPlaceholder")}
                </option>
                {schedule.map(
                  (day) =>
                    day.sessions.length > 0 && (
                      <optgroup label={day.day} key={day.day}>
                        {day.sessions.map((session) => (
                          <option
                            key={`${day.day}-${session.time}-${session.className}`}
                            value={`${day.day} ${session.time} — ${session.className} (${session.trainer})`}
                          >
                            {session.time} — {session.className} (
                            {session.trainer})
                          </option>
                        ))}
                      </optgroup>
                    ),
                )}
              </select>

              <button type="submit" disabled={status === "loading"}>
                {status === "loading"
                  ? t("reserve.form.sending")
                  : t("reserve.form.button")}
              </button>

              {status === "error" && (
                <p className="form-error">{t("reserve.form.errorText")}</p>
              )}

              <p className="form-note">{t("reserve.form.note")}</p>
            </form>
          )}
        </div>
      </section>

      <section className="reserve-steps">
        <h2>{t("reserve.steps.title")}</h2>

        <div className="reserve-steps-grid">
          {steps.map((step, index) => (
            <div className="reserve-step" key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Reserve;
