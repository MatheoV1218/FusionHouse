import { useEffect } from "react";
import "./Services.css";
// import gympic8 from "../assets/FHgympic8.webp";

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
    <main className="services-page">
      <section className="services-hero">
        <div className="services-hero-inner">
          <p className="services-eyebrow">Services & Rates</p>
          <h1>Training options built around your goals.</h1>
          <p>
            Whether you want one-on-one coaching, group classes, or space
            rental, Fusion House keeps everything simple, structured, and easy
            to book.
          </p>

          <div className="services-hero-actions">
            <a
              href={mindbodyLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                track("Book Now Services", {
                  location: "Services Hero",
                })
              }
            >
              Book Now
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
              View Options
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
              One-on-one coaching for people who want a customized plan,
              accountability, and clear guidance.
            </p>

            <div className="service-points">
              <p>Complimentary assessment</p>
              <p>Individualized training program</p>
              <p>Accountability and progress coaching</p>
            </div>
          </div>

          <details className="service-dropdown" id="pricing">
            <summary>View personal training pricing</summary>

            <div className="dropdown-grid">
              <div className="option-card">
                <div>
                  <h3>Individual Session</h3>
                  <p>One-hour personal training session.</p>
                </div>
                <strong>$150</strong>
              </div>

              <div className="option-card">
                <div>
                  <h3>12 Sessions</h3>
                  <p>Three times a week training package.</p>
                </div>
                <strong>$720</strong>
              </div>

              <div className="option-card featured">
                <div className="tag">Most Popular</div>
                <div>
                  <h3>8 Sessions</h3>
                  <p>
                    A strong balance of consistency, coaching, and schedule
                    flexibility.
                  </p>
                </div>
                <strong>$640</strong>
              </div>

              <div className="option-card economy">
                <div className="tag">Economic Option</div>
                <div>
                  <h3>4 Sessions</h3>
                  <p>
                    A simple starter package for focused training without a
                    larger commitment.
                  </p>
                </div>
                <strong>$400</strong>
              </div>
            </div>
          </details>
        </article>

        <article className="service-card-large" id="memberships">
          <div className="service-image-placeholder">Image</div>

          <div className="service-content">
            <span>02</span>

            <h2>Monthly Memberships</h2>

            <p>
              Group classes and membership options for people who want
              structure, community, and consistency.
            </p>

            <div className="service-points">
              <p>Two times a week options</p>
              <p>Unlimited training available</p>
              <p>VIP membership perks</p>
            </div>
          </div>

          <details className="service-dropdown" id="membership-options">
            <summary>View membership options</summary>

            <div className="dropdown-grid">
              <div className="option-card">
                <div>
                  <h3>Two Times a Week</h3>
                  <p>
                    A steady plan for building consistency with eight classes
                    per month.
                  </p>
                </div>
                <strong>$175</strong>
              </div>

              <div className="option-card">
                <div>
                  <h3>Three Times a Week</h3>
                  <p>
                    A stronger weekly rhythm for members who want more
                    structure.
                  </p>
                </div>
                <strong>$196</strong>
              </div>

              <div className="option-card vip">
                <div className="tag">Most Popular</div>
                <div>
                  <h3>VIP Membership</h3>
                  <p>
                    The premium option with classes, coaching perks, nutrition
                    support, and extra accountability.
                  </p>
                </div>
                <strong>$225</strong>
              </div>

              <div className="option-card">
                <div>
                  <h3>10 Class Package</h3>
                  <p>
                    Flexible class access with three months to use your
                    sessions.
                  </p>
                </div>
                <strong>$200</strong>
              </div>
            </div>
          </details>
        </article>

        <article className="service-card-large" id="rental">
          <div className="service-image-placeholder">Image</div>

          <div className="service-content">
            <span>03</span>
            <h2>Space Rental</h2>
            <p>
              Available for trainers, physical therapists, massage therapists,
              and wellness professionals.
            </p>

            <div className="service-points">
              <p>2,000 sq ft fitness space</p>
              <p>Great for professionals and events</p>
              <p>Contact the team for details</p>
            </div>
          </div>
        </article>
      </section>

      <section className="services-booking" id="booking">
        <h2>Ready to book?</h2>
        <p>View available classes and appointments through Mindbody.</p>

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
