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
            <h1>More than a gym. A community built on accountability.</h1>
            <p>
              The Fusion House was created to help people build stronger,
              healthier, and more connected lives through personal coaching,
              group training, and a fitness environment that feels supportive
              from day one.
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
          <h2>Built one step at a time.</h2>
        </div>

        <div className="timeline-path">
          <div className="timeline-item">
            <div className="timeline-bubble">2018</div>
            <h3>The Beginning</h3>
            <p>
              Anthony turned his dream of owning a gym into reality, starting in
              a modest private studio with donated gear and six clients.
            </p>
          </div>

          <div className="timeline-item">
            <div className="timeline-bubble">Growth</div>
            <h3>The Team Expanded</h3>
            <p>
              As the business grew, The Fusion House added new trainers and
              built a loyal client base focused on health and consistency.
            </p>
          </div>

          <div className="timeline-item">
            <div className="timeline-bubble">COVID</div>
            <h3>Adapting Forward</h3>
            <p>
              During COVID-19, the gym adapted through challenges and eventually
              relocated into a new space.
            </p>
          </div>

          <div className="timeline-item">
            <div className="timeline-bubble">Today</div>
            <h3>A Community Hub</h3>
            <p>
              The Fusion House is now a vibrant fitness community focused on
              growth, accountability, and expert guidance.
            </p>
          </div>
        </div>
      </section>

      <section className="values-section">
        <div className="section-header">
          <p className="about-eyebrow dark">What We Believe</p>
          <h2>Fitness should feel personal.</h2>
        </div>

        <div className="values-grid">
          <article>
            <h3>Personal Support</h3>
            <p>
              Every person walks in with different goals, so coaching should be
              tailored to the individual.
            </p>
          </article>

          <article>
            <h3>Community</h3>
            <p>
              Fitness is not just exercise. It is about building a stronger,
              healthier, more connected community.
            </p>
          </article>

          <article>
            <h3>Consistency</h3>
            <p>
              Long-term progress comes from routine, accountability, and support
              through every step of the way.
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
            Anthony Moreno is the founder of The Fusion House and a fitness
            industry leader with more than fifteen years of experience helping
            adults build strength, confidence, and long-term success through
            coaching, education, and mentorship.
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
            <summary>Read Anthony's full story</summary>

            <p>
              Anthony was born and raised in Gibraltar, known as “The Rock of
              Gibraltar,” a British territory located at the southern tip of
              Spain. With a British father and Spanish mother, he grew up moving
              between Gibraltar, England, and Spain before relocating to the
              United States in 2013.
            </p>

            <p>
              Anthony is the founder of The Fusion House and a leader in the
              coaching industry with more than fifteen years of experience
              developing people — not just clients, but coaches and business
              owners as well. His career spans military service, firefighting,
              lifeguarding, and high-intensity coaching, giving him a rare,
              real-world understanding of human performance, discipline, and
              resilience.
            </p>

            <p>
              As a coach, Anthony is known for helping everyday adults build
              strength, confidence, and capability without intimidation or ego.
              As a mentor, he trains and develops other fitness professionals,
              teaching them how to coach with clarity, communicate with impact,
              and build sustainable businesses rooted in service and integrity.
            </p>

            <p>
              His work extends beyond the gym floor into education, leadership,
              and professional development for trainers and entrepreneurs.
              Anthony's work is centered around helping people improve not only
              physically, but also professionally and personally.
            </p>

            <p>
              Anthony is also the author of <em>Fitness Sucks!</em>, a book that
              challenges the fitness industry's noise, gimmicks, and
              misinformation by teaching people how to build a healthier
              identity — not just a better workout routine.
            </p>

            <p>
              Today, Anthony leads The Fusion House with a mission to help,
              develop, and empower individuals through fitness. His work blends
              technical expertise, mentorship, and a deep commitment to helping
              people grow physically, mentally, and professionally.
            </p>

            <a
              href="https://publishizer.com/fitness-sucks/preview/"
              target="_blank"
              rel="noopener noreferrer"
              className="owner-book-cta"
            >
              Pre-Order Fitness Sucks →
            </a>
          </details>
        </div>
      </section>
    </main>
  );
}

export default About;
