import "./About.css";
import gympic1 from "../assets/FHgympic1.webp";
import ownerpic from "../assets/owner.png";
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
            <p className="about-eyebrow">About Fusion House</p>
            <h1>More than a gym. A community built on accountability.</h1>
            <p>
              Fusion House was created to help people build stronger, healthier,
              and more connected lives through personal coaching, group
              training, and a fitness environment that feels supportive from day
              one.
            </p>
          </div>

          <div className="about-image-placeholder">
            <img src={gympic1} alt="Fusion House Gym" />
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
              As the business grew, Fusion House added new trainers and built a
              loyal client base focused on health and consistency.
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
              Fusion House is now a vibrant fitness community focused on growth,
              accountability, and expert guidance.
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
          <img src={ownerpic} alt="Anthony Moreno, owner of Fusion House" />
        </div>

        <div className="owner-content">
          <p className="about-eyebrow dark">Meet The Owner</p>
          <h2>Anthony Moreno</h2>

          <p>
            Anthony Moreno is the CEO and owner of The Fusion House by Boutique.
            He is originally from Gibraltar, moved to the United States in 2013,
            and has spent his life learning about physical, mental, and
            spiritual health.
          </p>

          <div className="owner-highlights">
            <span>From Gibraltar</span>
            <span>U.S. since 2013</span>
            <span>Trainer & business owner</span>
          </div>

          <details>
            <summary>Read Anthony’s full story</summary>

            <p>
              Anthony came from a small place called Gibraltar, known as “The
              Rock of Gibraltar.” It is a British overseas territory located on
              the southern tip of the Iberian Peninsula. He has a British father
              and a Spanish mother, and he spent his childhood and most of his
              adult life living and working between Gibraltar, England, and
              Spain before coming to the U.S. in 2013.
            </p>

            <p>
              In terms of his work history, he has held many titles, including
              cleaner, pizza delivery boy, lifeguard, soldier, fireman, shipment
              container packer, security guard, personal trainer, group fitness
              instructor, and business owner.
            </p>

            <p>
              His main focus is to empower others to be the best version of
              themselves in all aspects of life through his business. He is
              excited to help clients reach their best selves and wishes
              everyone success in their endeavors.
            </p>
          </details>
        </div>
      </section>
    </main>
  );
}

export default About;
