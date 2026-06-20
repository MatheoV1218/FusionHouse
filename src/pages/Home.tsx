import { Link } from "react-router-dom";
import "./Home.css";
import gympic5 from "../assets/FHgympic5.webp";
import grainyBackground from "../assets/grainyBackground.png";
import { googleReviews, googleReviewsLink } from "../data";

import BCW from "../assets/BCW.png";
import NASM from "../assets/NASM.png";
import NYSBDC from "../assets/nysbc.png";

import { track } from "@vercel/analytics";

const carouselImages = Object.entries(
  import.meta.glob(
    "../assets/carousel/*.{jpg,JPG,jpeg,JPEG,png,PNG,webp,WEBP}",
    {
      eager: true,
      query: "?url",
      import: "default",
    },
  ),
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
            White Plains, NY • Private & small-group coaching
          </p>

          <h1>Where smart, personalized training becomes your new normal</h1>

          <p className="hero-subtitle">
            Expert coaching and structured training experiences designed for
            adults who want clarity, accountability, and a facility that treats
            them like an individual — not a number.
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
              Reserve Your Session
            </a>

            <Link
              to="/services"
              className="btn secondary"
              onClick={() =>
                track("Explore Memberships Home", {
                  location: "Hero",
                })
              }
            >
              Explore Memberships
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
              <h3>Reserve Your Session</h3>
              <p>Secure your class or private coaching appointment.</p>
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
              <h3>Before You Begin</h3>
              <p> Clear answers to help you make an informed decision.</p>
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
              <h3>Speak With Our Team</h3>
              <p>Connect directly with a coach for guidance.</p>
            </a>
          </div>
        </div>
      </section>

      <section className="audience-section">
        <div className="audience-inner">
          <div className="audience-copy">
            <p className="eyebrow dark">Built For Adults</p>
            <h2>
              Thoughtful, joint‑friendly coaching for adults in their 40s, 50s,
              60s and beyond.
            </h2>
            <p>
              The Fusion House is designed for people who want expert guidance
              delivered with professionalism, clarity, and respect. Whether
              you’re returning to fitness, building strength later in life, or
              seeking a community that feels supportive rather than competitive,
              our coaching adapts to your body, your goals, and your pace.
            </p>
          </div>

          <div className="audience-cards">
            <article>
              <span>01</span>
              <h3>Coaching With Integrity</h3>
              <p>
                Supportive, professional guidance focused on long‑term progress.
              </p>
            </article>

            <article>
              <span>02</span>
              <h3>Training Designed Around You</h3>
              <p>
                Every program is adapted to your goals, mobility, and
                experience.
              </p>
            </article>

            <article>
              <span>03</span>
              <h3>Strength That Carries Into Life</h3>
              <p>Build confidence, balance, and resilience that last.</p>
            </article>
          </div>

          <div className="programs-overview">
            <div className="program-card">
              <span>Personal Training</span>
              <h3>
                Private coaching tailored to your body, goals, and lifestyle.
              </h3>
              <p>
                Every session is intentionally designed to support your
                progress, protect your joints, and give you the clarity and
                confidence to train with purpose.
              </p>
              <Link
                to="/services#personal"
                onClick={() =>
                  track("Personal Training Explore Private Coaching Home", {
                    section: "Programs",
                  })
                }
              >
                Explore Private Coaching
              </Link>
            </div>

            <div className="program-card">
              <span>Group Training</span>
              <h3>Small‑group training with meaningful coaching.</h3>
              <p>
                A structured, supportive environment where you receive hands‑on
                guidance, accountability, and the motivation of a community that
                trains with intention.
              </p>
              <Link
                to="/services#memberships"
                onClick={() =>
                  track("Group Training Explore Small-Group Training Home", {
                    section: "Programs",
                  })
                }
              >
                Explore Small-Group Training
              </Link>
            </div>

            <div className="program-card">
              <span>Memberships</span>
              <h3>Memberships designed for long‑term progress.</h3>
              <p>
                Clear, straightforward options created for adults who value
                consistency, structure, and a coaching relationship that evolves
                with their goals.
              </p>
              <Link
                to="/services#membership-options"
                onClick={() =>
                  track("Memberships Explore Memberships Home", {
                    section: "Programs",
                  })
                }
              >
                Explore Memberships
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="community-carousel-section">
        <div className="community-carousel-heading">
          <p className="eyebrow dark">Real Members. Real Progress.</p>
          <h2>A training environment built around your growth.</h2>
          <p>
            From your first session to your strongest seasons, The Fusion House
            is a place where adults build confidence, capability, and a
            sustainable relationship with fitness.
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

      <section className="partners-section">
        <div className="partners-heading">
          <p className="eyebrow dark">Community Partners</p>

          <h2>Partnered with respected organizations across Westchester.</h2>

          <p>
            The Fusion House collaborates with educational programs, community
            groups, and professional organizations that support fitness
            education, leadership development, and community wellness throughout
            White Plains and Westchester County.
          </p>
        </div>

        <div className="partners-grid">
          <div className="partner-card">
            <img
              src={BCW}
              alt="Business Council of Westchester Partner"
              loading="lazy"
            />
          </div>

          <div className="partner-card">
            <img src={NASM} alt="NASM Approved Provider" loading="lazy" />
          </div>

          <div className="partner-card">
            <img
              src={NYSBDC}
              alt="New York Small Business Development Center"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="reviews-preview">
        <p className="eyebrow dark">Google Reviews</p>
        <h2>Trusted by local members.</h2>

        <div className="google-review-summary">
          <div>
            <span className="google-badge">Google</span>
            <strong>4.9</strong>
            <div className="stars">★★★★★</div>
            <p>Based on 86 Google reviews</p>
          </div>

          <a
            href={googleReviewsLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              track("View All Google Reviews", {
                location: "Home Reviews",
              })
            }
          >
            Read All Reviews
          </a>
        </div>

        <div className="reviews-scroll">
          <div className="reviews-track">
            {[...googleReviews, ...googleReviews].map((review, index) => (
              <article
                className="google-review-card"
                key={`${review.name}-${index}`}
              >
                <div className="review-top">
                  <div className="review-avatar">{review.name.charAt(0)}</div>

                  <div>
                    <h3>{review.name}</h3>
                    <p>{review.date}</p>
                  </div>
                </div>

                <div className="stars">{"★".repeat(review.rating)}</div>

                <p className="review-text">“{review.text}”</p>

                <a
                  href={googleReviewsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    track("Read Google Review", {
                      reviewer: review.name,
                    })
                  }
                >
                  View on Google
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="final-home-cta">
        <h2>Ready to Begin?</h2>
        <p>
          Book a complimentary trial class and see how personalized coaching feels.
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
          Reserve Your Session
        </a>
      </section>
    </main>
  );
}

export default Home;
