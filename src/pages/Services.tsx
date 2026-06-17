import { useEffect } from "react";
import "./Services.css";

export const mindbodyLink =
  "https://clients.mindbodyonline.com/classic/mainclass?fl=true&tabID=7";

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
            Whether you want one-on-one coaching, group classes, or space rental,
            Fusion House keeps everything simple, structured, and easy to book.
          </p>

          <div className="services-hero-actions">
            <a href={mindbodyLink} target="_blank" rel="noopener noreferrer">
              Book Now
            </a>
            <a href="#pricing" className="secondary-service-btn">
              View Pricing
            </a>
          </div>
        </div>
      </section>

      <section className="services-grid-section">
        <article className="service-card-large" id="personal">
          <div className="service-image-placeholder">Image</div>
          <div>
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
        </article>

        <article className="service-card-large" id="memberships">
          <div className="service-image-placeholder">Image</div>
          <div>
            <span>02</span>
            <h2>Monthly Memberships</h2>
            <p>
              Group classes and membership options for people who want structure,
              community, and consistency.
            </p>

            <div className="service-points">
              <p>Unlimited sessions</p>
              <p>Three classes per week</p>
              <p>VIP membership options</p>
            </div>
          </div>
        </article>

        <article className="service-card-large" id="rental">
          <div className="service-image-placeholder">Image</div>
          <div>
            <span>03</span>
            <h2>Space Rental</h2>
            <p>
              Available for trainers, physical therapists, massage therapists,
              and wellness professionals.
            </p>

            <div className="service-points">
              <p>4,000 sq ft fitness space</p>
              <p>Great for professionals and events</p>
              <p>Contact the team for details</p>
            </div>
          </div>
        </article>
      </section>

      <section className="pricing-section" id="pricing">
        <div className="pricing-heading">
          <p className="services-eyebrow dark">Pricing</p>
          <h2>Simple options to get started.</h2>
          <p>
            Prices may vary depending on trainer, availability, and package type.
          </p>
        </div>

        <div className="pricing-grid">
          <div className="price-card">
            <h3>Individual Session</h3>
            <p>One-hour personal training session.</p>
            <strong>$150</strong>
          </div>

          <div className="price-card">
            <h3>12 Sessions</h3>
            <p>Three times a week training package.</p>
            <strong>$720</strong>
          </div>

          <div className="price-card">
            <h3>8 Sessions</h3>
            <p>Two times a week training package.</p>
            <strong>$640</strong>
          </div>

          <div className="price-card">
            <h3>4 Sessions</h3>
            <p>Starter package for focused training.</p>
            <strong>$400</strong>
          </div>
        </div>
      </section>

      <section className="membership-section" id="membership-options">
        <div>
          <p className="services-eyebrow dark">Memberships</p>
          <h2>Group class options without the confusion.</h2>
          <p>
            Choose from unlimited sessions, three times a week, VIP membership,
            or a 10-class package.
          </p>
        </div>

        <div className="membership-list">
          <div>
            <h3>Unlimited Sessions</h3>
            <p>Come to as many classes as you want.</p>
          </div>

          <div>
            <h3>Three Times a Week</h3>
            <p>12 classes per month.</p>
          </div>

          <div>
            <h3>VIP Membership</h3>
            <p>Includes classes, coaching perks, nutrition support, and more.</p>
          </div>

          <div>
            <h3>10 Class Package</h3>
            <p>10 classes with three months to use them.</p>
          </div>
        </div>
      </section>

      <section className="services-booking" id="booking">
        <h2>Ready to book?</h2>
        <p>View available classes and appointments through Mindbody.</p>

        <a href={mindbodyLink} target="_blank" rel="noopener noreferrer">
          Open Booking Schedule
        </a>
      </section>
    </main>
  );
}

export default Services;