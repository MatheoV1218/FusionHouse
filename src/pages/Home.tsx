import { Link } from "react-router-dom";
import "./Home.css";
import gympic5 from "../assets/FHgympic5.webp";
import grainyBackground from "../assets/grainyBackground.png";

import { track } from "@vercel/analytics";

const carouselImages = Object.entries(
  import.meta.glob("../assets/carousel/*.{jpg,JPG,jpeg,JPEG,png,PNG,webp,WEBP}", {
    eager: true,
    query: "?url",
    import: "default",
  }),
)
  .sort(([a], [b]) => {
    const numA = Number(a.match(/FH(\d+)/i)?.[1] ?? 0);
    const numB = Number(b.match(/FH(\d+)/i)?.[1] ?? 0);
    return numA - numB;
  })
  .map(([, src]) => src as string);

function Home() {
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
          <p className="eyebrow">
            White Plains, NY • Personal & Group Training
          </p>

          <h1>Stronger routines start here.</h1>

          <p className="hero-subtitle">
            Personal training, group classes, and coaching built for adults who
            want structure, accountability, and a gym experience that actually
            feels personal.
          </p>

          <div className="hero-buttons">
            <a
              href="https://clients.mindbodyonline.com/classic/ws?studioid=470306&stype=-7&sView=week&sLoc=1"
              target="_blank"
              rel="noreferrer"
              className="btn primary"
              onClick={() =>
                track("Book Free Trial Home", {
                  location: "Hero",
                })
              }
            >
              Book a Free Trial
            </a>

            <Link
              to="/services"
              className="btn secondary"
              onClick={() =>
                track("View Programs Home", {
                  location: "Hero",
                })
              }
            >
              View Programs
            </Link>
          </div>

          <div className="action-cards">
            <a
              href="https://clients.mindbodyonline.com/classic/ws?studioid=470306&stype=-7&sView=week&sLoc=1"
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                track("Book Now Home", {
                  location: "Action Card",
                })
              }
            >
              <span>01</span>
              <h3>Book Now</h3>
              <p>Reserve a class or appointment through Mindbody.</p>
            </a>

            <Link
              to="/faq"
              onClick={() =>
                track("FAQ Opened Home", {
                  location: "Action Card",
                })
              }
            >
              <span>02</span>
              <h3>Common Questions</h3>
              <p>Get quick answers before reaching out.</p>
            </Link>

            <a
              href="tel:9145529619"
              onClick={() =>
                track("Call Gym Home", {
                  location: "Action Card",
                })
              }
            >
              <span>03</span>
              <h3>Call the Gym</h3>
              <p>Speak directly with the team if you need help.</p>
            </a>
          </div>
        </div>
      </section>

      <section className="audience-section">
        <div className="audience-inner">
          <div className="audience-copy">
            <p className="eyebrow dark">Built For Adults</p>
            <h2>
              Smart, safe, personalized coaching for adults in their 40s, 50s,
              60s and beyond.
            </h2>
            <p>
              The Fusion House is built for people who want expert guidance
              without ego, intimidation, or pressure. Whether you are returning
              to fitness, building strength later in life, or simply looking for
              a supportive community, our coaching meets you where you are and
              helps you progress at a pace that fits your body, goals, and
              lifestyle.
            </p>
          </div>

          <div className="audience-cards">
            <article>
              <span>01</span>
              <h3>Guidance Without Ego</h3>
              <p>
                Coaching focused on support, encouragement, and long-term
                success instead of intimidation.
              </p>
            </article>

            <article>
              <span>02</span>
              <h3>Safe & Personalized Training</h3>
              <p>
                Programs are adapted to your goals, experience level, mobility,
                and fitness background.
              </p>
            </article>

            <article>
              <span>03</span>
              <h3>Confidence For Life</h3>
              <p>
                Build strength, balance, energy, and resilience that carry over
                into everyday living.
              </p>
            </article>
          </div>

          <div className="programs-overview">
            <div className="program-card">
              <span>Personal Training</span>
              <h3>One-on-one coaching built around you.</h3>
              <p>
                Personalized sessions designed around your goals, ability,
                schedule, and comfort level.
              </p>
              <Link
                to="/services#personal"
                onClick={() =>
                  track("Personal Training Learn More Home", {
                    section: "Programs",
                  })
                }
              >
                Learn More
              </Link>
            </div>

            <div className="program-card">
              <span>Group Training</span>
              <h3>Structured classes with real coaching.</h3>
              <p>
                Supportive group training with guidance, accountability, and a
                community that feels welcoming.
              </p>
              <Link
                to="/services#memberships"
                onClick={() =>
                  track("Group Training View Classes Home", {
                    section: "Programs",
                  })
                }
              >
                View Classes
              </Link>
            </div>

            <div className="program-card">
              <span>Memberships</span>
              <h3>Flexible options for consistency.</h3>
              <p>
                Membership choices made for adults who want long-term progress
                without confusion.
              </p>
              <Link
                to="/services#membership-options"
                onClick={() =>
                  track("Memberships See Options Home", {
                    section: "Programs",
                  })
                }
              >
                See Options
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="community-carousel-section">
        <div className="community-carousel-heading">
          <p className="eyebrow dark">Real Members. Real Progress.</p>
          <h2>A gym built around people, not pressure.</h2>
          <p>
            From first workouts to stronger routines, The Fusion House is
            designed for adults who want coaching, confidence, and a community
            that meets them where they are.
          </p>
        </div>

        <div className="community-carousel">
          <div className="carousel-track">
            {[...carouselImages, ...carouselImages].map((image, index) => (
              <div className="carousel-photo-card" key={`${image}-${index}`}>
                <img
                  src={image}
                  alt="The Fusion House member training"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="reviews-preview">
        <h2>Trusted by local members.</h2>

        <div className="review-grid">
          <article>
            <div className="stars">★★★★★</div>
            <p>
              “Amazing experience. The staff is motivating, welcoming, and the
              workouts are challenging in the best way.”
            </p>
            <strong>Google Review</strong>
          </article>

          <article>
            <div className="stars">★★★★★</div>
            <p>
              “Great trainers and a strong community feel. Perfect if you need
              structure and accountability.”
            </p>
            <strong>Google Review</strong>
          </article>

          <article>
            <div className="stars">★★★★★</div>
            <p>
              “Professional, clean, and supportive. The team actually cares
              about your progress.”
            </p>
            <strong>Google Review</strong>
          </article>
        </div>
      </section>

      <section className="final-home-cta">
        <h2>Ready to try The Fusion House?</h2>
        <p>
          Book a free trial class and take the first step toward a stronger
          routine.
        </p>

        <a
          href="https://clients.mindbodyonline.com/classic/ws?studioid=470306&stype=-7&sView=week&sLoc=1"
          target="_blank"
          rel="noreferrer"
          className="btn primary"
          onClick={() =>
            track("Book Free Trial Home", {
              location: "Final CTA",
            })
          }
        >
          Book a Free Trial
        </a>
      </section>
    </main>
  );
}

export default Home;