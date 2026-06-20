import { useEffect } from "react";
import "./Services.css";
// import gympic8 from "../assets/FHgympic8.webp";
import gympic8 from "../assets/FHgympic8.webp";
import gympic9 from "../assets/FHgympic9.webp";
import grainyBackground from "../assets/grainyBackground.png";

import { track } from "@vercel/analytics";

export const mindbodyLink =
  "https://clients.mindbodyonline.com/classic/ws?studioid=470306&stype=-7&sView=week&sLoc=1";

function Services() {
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
          <p className="services-eyebrow">
            Training Experiences & Membership Options
          </p>
          <h1>Coaching and training pathways designed for your goals.</h1>
          <p>
            Whether you prefer private coaching, small‑group training, or
            professional space rental, The Fusion House offers clear, structured
            options that make it easy to begin and stay consistent.
          </p>

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
              Reserve Your Session
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
              Explore Memberships
            </a>
          </div>
        </div>
      </section>

      <section className="services-grid-section">
        <article className="service-card-large" id="personal">
          <div className="service-image-placeholder">Image</div>

          <div className="service-content">
            <span>01</span>
            <h2>Personal Training</h2>

            <p>
              Private one‑on‑one coaching for adults who want clarity, accountability, and a program designed specifically for their body, goals, and lifestyle.
            </p>

            <div className="service-points">
              <p>Complimentary movement + strategy assessment</p>
              <p>Personalized training blueprint</p>
              <p>Nutrition guidance tailored to your needs</p>
              <p>Ongoing accountability and progress reviews</p>
            </div>
          </div>

          <details className="service-dropdown" id="pricing">
            <summary>View Personal Training Options</summary>

            <div className="dropdown-grid">
              <div className="option-card featured">
                <div className="tag">Most Popular</div>
                <div>
                  <h3>8 Sessions</h3>
                  <p>
                    A balanced structure that supports consistency, accountability, and steady progress.
                  </p>
                </div>
                <strong>$640</strong>
              </div>

              <div className="option-card economy">
                
                <div>
                  <h3>4‑Session Package</h3>
                  <p>
                    A focused entry option for clients beginning their training journey.
                  </p>
                </div>
                <strong>$400</strong>
              </div>

              <div className="option-card">
                <div>
                  <h3>12‑Session Package</h3>
                  <p>Ideal for clients training three times per week and committed to accelerated progress.</p>
                </div>
                <strong>$720</strong>
              </div>

              <div className="option-card">
                <div>
                  <h3>Individual Session</h3>
                  <p>A single 60‑minute private coaching session.</p>
                </div>
                <strong>$150</strong>
              </div>
            </div>
          </details>
        </article>

        <article className="service-card-large" id="memberships">
          <div className="service-image-placeholder">
            <img
              src={gympic9}
              alt="Group training and memberships at The Fusion House Fitness"
            />
          </div>

          <div className="service-content">
            <span>02</span>

            <h2>Monthly Memberships</h2>

            <p>
              Structured small‑group training and community‑driven classes designed for adults who want consistency, accountability, and a supportive environment.
            </p>

            <div className="service-points">
              <p>2‑day‑per‑week memberships</p>
              <p>Unlimited training available</p>
              <p>Member‑only benefits and priority access</p>
            </div>
          </div>

          <details className="service-dropdown" id="membership-options">
            <summary>Explore Membership Options</summary>

            <div className="dropdown-grid">
              <div className="option-card vip">
                <div className="tag">Most Popular</div>
                <div>
                  <h3>Premier Membership</h3>
                  <p>
                    Our most comprehensive membership, including unlimited classes, enhanced coaching support, nutrition guidance, weekly accountability check‑ins, and complimentary personal training sessions.
                  </p>
                </div>
                <strong>$225</strong>
              </div>

              <div className="option-card">
                <div>
                  <h3>2‑Day Membership</h3>
                  <p>
                    Eight classes per month — a consistent, sustainable training rhythm.
                  </p>
                </div>
                <strong>$175</strong>
              </div>

              <div className="option-card">
                <div>
                  <h3>3‑Day Membership</h3>
                  <p>
                    Twelve classes per month for members who want additional structure and momentum.
                  </p>
                </div>
                <strong>$196</strong>
              </div>

              <div className="option-card">
                <div>
                  <h3>10‑Class Pack</h3>
                  <p>
                    Flexible access to any group class with three months to use your sessions.
                  </p>
                </div>
                <strong>$200</strong>
              </div>
            </div>
          </details>
        </article>

        <article className="service-card-large" id="rental">
          <div className="service-image-placeholder">
            <img
              src={gympic8}
              alt="Personal training at The Fusion House Fitness"
            />
          </div>

          <div className="service-content">
            <span>03</span>
            <h2>Space Rental</h2>
            <p>
              A 2,000 sq ft private training facility available for certified trainers, physical therapists, massage therapists, and wellness professionals.
            </p>

            <div className="service-points">
              <p>Fully equipped, open‑format training space</p>
              <p>Ideal for private sessions, workshops, and small events</p>
              <p>Flexible rental options for credentialed professionals</p>
            </div>
          </div>
        </article>
      </section>

      <section className="services-booking" id="booking">
        <h2>Ready to Begin?</h2>
        <p>Browse available classes and private coaching appointments through our Mindbody schedule.</p>

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
          Open Booking Schedule
        </a>
      </section>
    </main>
  );
}

export default Services;
