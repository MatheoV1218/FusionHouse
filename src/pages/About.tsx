import "./About.css";
import gympic1 from "../assets/FHgympic1.webp";
import ownerpic from "../assets/owner.jpg";
import grainyBackground from "../assets/grainyBackground.png";

function About() {
  return (
    <main
      className="about-page"
      style={{ backgroundImage: `url(${grainyBackground})` }}
    >
      <section className="about-hero">
        <div className="about-container">
          <div className="about-hero-text">
            <p className="about-eyebrow">About The Fusion House</p>
            <h1>More than a gym — a coaching‑driven community built on accountability and growth.</h1>
            <p>
              The Fusion House was created to help adults build stronger, healthier, and more connected lives through expert coaching, small‑group training, and a fitness environment grounded in professionalism, support, and real human connection.
            </p>
          </div>

          <div className="about-image-placeholder">
            <img src={gympic1} alt="The Fusion House Gym" />
          </div>
        </div>
      </section>

      <section className="timeline-section">
        <div className="section-header">
          <p className="about-eyebrow dark">Our Journey</p>
          <h2>Built with intention. Grown through community.</h2>
        </div>

        <div className="timeline-path">
          <div className="timeline-item">
            <div className="timeline-bubble">2018</div>
            <h3>The Beginning</h3>
            <p>
              Anthony opened The Fusion House in a small private studio, coaching six clients with a clear mission: create a space where adults could train with confidence, clarity, and expert guidance.
            </p>
          </div>

          <div className="timeline-item">
            <div className="timeline-bubble">Growth</div>
            <h3>Expanding the Team</h3>
            <p>
              As demand grew, The Fusion House added coaches who shared the same values: professionalism, accountability, and a commitment to long‑term client success.
            </p>
          </div>

          <div className="timeline-item">
            <div className="timeline-bubble">COVID</div>
            <h3>Adapting Forward</h3>
            <p>
              During the challenges of COVID‑19, the gym evolved, adapted, and ultimately transitioned into a larger space designed to better serve the community.
            </p>
          </div>

          <div className="timeline-item">
            <div className="timeline-bubble">Today</div>
            <h3>A Community Hub</h3>
            <p>
              The Fusion House is now a thriving training environment where adults build strength, consistency, and connection through coaching that meets them where they are and helps them grow.
            </p>
          </div>
        </div>
      </section>

      <section className="values-section">
        <div className="section-header">
          <p className="about-eyebrow dark">What We Believe</p>
          <h2>Fitness should feel personal, purposeful, and supported.</h2>
        </div>

        <div className="values-grid">
          <article>
            <h3>Personal Support</h3>
            <p>
              Every person arrives with different goals, histories, and abilities — coaching should reflect that. We tailor every experience to the individual.
            </p>
          </article>

          <article>
            <h3>Community</h3>
            <p>
              Fitness is more than exercise. It’s connection, belonging, and being surrounded by people who want to see you succeed.
            </p>
          </article>

          <article>
            <h3>Consistency</h3>
            <p>
              Real progress comes from routine, accountability, and support through every stage of the journey.
            </p>
          </article>
        </div>
      </section>

      <section className="owner-section">
        <div className="owner-image-placeholder">
          <img src={ownerpic} alt="Anthony Moreno, owner of The Fusion House" />
        </div>

        <div className="owner-content">
          <p className="about-eyebrow dark">Meet The Owner</p>

          <h2>Anthony Moreno</h2>

          <p className="owner-title">
            Founder, Coach, Educator, and Author of <em>Fitness Sucks!</em>
          </p>

          <p>
            Anthony Moreno is the founder of The Fusion House and a leader in the coaching industry with more than fifteen years of experience helping adults build strength, confidence, and long‑term success. His work spans coaching, education, mentorship, and professional development for both clients and fitness professionals.
          </p>


          <a
            href="https://publishizer.com/fitness-sucks/preview/"
            target="_blank"
            rel="noopener noreferrer"
            className="owner-book-cta"
          >
            Pre-Order Fitness Sucks →
          </a>

          <details>
            <summary>Read Anthony's Full Story</summary>

            <p>
              Born and raised in Gibraltar — “The Rock of Gibraltar” — Anthony
              grew up between Gibraltar, England, and Spain before relocating to
              the United States in 2013. His background includes military
              service, firefighting, lifeguarding, and high‑intensity coaching,
              giving him a grounded, real‑world understanding of human
              performance, discipline, and resilience.
            </p>

            <p>
              As a coach, Anthony is known for helping everyday adults train
              with clarity, confidence, and capability — without intimidation or
              ego. As a mentor, he develops other fitness professionals,
              teaching them how to coach effectively, communicate with impact,
              and build sustainable businesses rooted in service and integrity.
            </p>

            <p>
              Anthony is also the author of <em>Fitness Sucks!</em>, a book that
              challenges the industry’s noise and misinformation by teaching
              people how to build a healthier identity — not just a better
              workout routine.
            </p>

            <p>
              Today, Anthony leads The Fusion House with a mission to help,
              develop, and empower individuals through fitness. His work blends
              technical expertise, mentorship, and a deep commitment to helping
              people grow physically, mentally, and professionally.
            </p>
          </details>
        </div>
      </section>
    </main>
  );
}

export default About;
