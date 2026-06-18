import { Link } from "react-router-dom";
import "./Home.css";
import gympic2 from "../assets/FHgympic2.webp";
import gympic5 from "../assets/FHgympic5.webp";
import gympic11 from "../assets/FHgympic11.jpg";
import fusionimg4 from "../assets/fusionimg4.jpg";

import { track } from "@vercel/analytics";

const carouselImages = Object.entries(
  import.meta.glob("../assets/carousel/*.{jpg,JPG,jpeg,JPEG,png,PNG}", {
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
    <main className="home">
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
          <div>
            <p className="eyebrow dark">Built For Adults</p>
            <h2>Training for adults 30, 40, 50 and beyond.</h2>
            <p>
              Fusion House is made for people who want to get stronger without
              feeling rushed, judged, or thrown into workouts that do not match
              their body, goals, or experience level.
            </p>
          </div>

          <div className="audience-cards">
            <article>
              <h3>Getting back into fitness</h3>
              <p>Perfect for adults returning after time away from the gym.</p>
            </article>

            <article>
              <h3>Strength without intimidation</h3>
              <p>
                Coached training in a supportive environment, not a crowded gym
                floor.
              </p>
            </article>

            <article>
              <h3>Smart training for real life</h3>
              <p>
                Build strength, balance, mobility, and confidence at a
                sustainable pace.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="programs">
        <div className="program-card">
          <img
            src={fusionimg4}
            alt="Personal training at Fusion House Fitness"
            className="program-image"
          />
          <h3>Personal Training</h3>
          <p>
            One-on-one coaching built around your goals, ability, and schedule.
          </p>
          <Link
            to="/services"
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
          <img
            src={gympic2}
            alt="Group training at Fusion House Fitness"
            className="program-image"
          />
          <h3>Group Training</h3>
          <p>
            Structured strength classes with energy, accountability, and
            community.
          </p>
          <Link
            to="/services"
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
          <img
            src={gympic11}
            alt="Fusion House Fitness memberships"
            className="program-image"
          />
          <h3>Memberships</h3>
          <p>
            Flexible options for people ready to commit to long-term
            consistency.
          </p>
          <Link
            to="/services"
            onClick={() =>
              track("Memberships See Options Home", {
                section: "Programs",
              })
            }
          >
            See Options
          </Link>
        </div>
      </section>

      <section className="community-carousel-section">
        <div className="community-carousel-heading">
          <p className="eyebrow dark">Real Members. Real Progress.</p>
          <h2>A gym built around people, not pressure.</h2>
          <p>
            From first workouts to stronger routines, Fusion House is designed
            for adults who want coaching, confidence, and a community that meets
            them where they are.
          </p>
        </div>

        <div className="community-carousel">
          <div className="carousel-track">
            {[...carouselImages, ...carouselImages].map((image, index) => (
              <div className="carousel-photo-card" key={`${image}-${index}`}>
                <img src={image} alt="Fusion House member training" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="reviews-preview">
        <p className="eyebrow dark">Social Proof</p>
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
        <h2>Ready to try Fusion House?</h2>
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
