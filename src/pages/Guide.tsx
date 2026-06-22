import { Link } from "react-router-dom";
import "./Guide.css";

import grainyBackground from "../assets/grainyBackground.png";
import fusiontest1 from "../assets/fusiontest1.png";
import fusiontest2 from "../assets/fusiontest2.png";
import fusiontest3 from "../assets/fusiontest3.png";
import fusiontest4 from "../assets/fusiontest4.png";
import fusiontest5 from "../assets/fusiontest5.png";
import fusiontest6 from "../assets/fusiontest6.png";
import fusiontest7 from "../assets/fusiontest7.png";

import { track } from "@vercel/analytics";

const mindbodyLink =
  "https://clients.mindbodyonline.com/classic/ws?studioid=470306&stype=-7&sView=week&sLoc=1";

const guideSteps = [
  {
    number: "01",
    title: "Open the booking schedule",
    text: "When you click a reservation button, Mindbody opens the weekly class schedule. Choose the class time that works best for you.",
    image: fusiontest1,
  },
  {
    number: "02",
    title: "Create or sign into your Mindbody account",
    text: "If this is your first time booking, Mindbody will ask you to create an account using your email, Google, or Apple login.",
    image: fusiontest2,
  },
  {
    number: "03",
    title: "Complete your account details",
    text: "Enter your name, password, and country. This creates the profile Mindbody uses for class reservations.",
    image: fusiontest3,
  },
  {
    number: "04",
    title: "Return to the class schedule",
    text: "After signing in, you’ll be brought back to the schedule. Pick the class you want and click Sign Up Now.",
    image: fusiontest4,
  },
  {
    number: "05",
    title: "Confirm your reservation type",
    text: "Mindbody will show your selected class, teacher, time, and date. Choose whether you want a single reservation or recurring reservation.",
    image: fusiontest5,
  },
  {
    number: "06",
    title: "Choose your service or trial option",
    text: "Select the service that applies to you. New visitors can choose the Free Trial Class option when available.",
    image: fusiontest6,
  },
  {
    number: "07",
    title: "Review your cart and check out",
    text: "Confirm your cart details, then click Check Out to complete your reservation.",
    image: fusiontest7,
  },
];

function Guide() {
  return (
    <main
      className="guide-page"
      style={{ backgroundImage: `url(${grainyBackground})` }}
    >
      <section className="guide-hero">
        <div className="guide-hero-inner">
          <p className="guide-eyebrow">Reservation Walkthrough</p>
          <h1>How to reserve your session through Mindbody.</h1>
          <p>
            This guide shows exactly what to expect when booking a class,
            creating your account, choosing your service, and completing your
            reservation.
          </p>

          <div className="guide-actions">
            <a
              href={mindbodyLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                track("Open Mindbody From Guide", {
                  location: "Guide Hero",
                })
              }
            >
              Open Booking Schedule
            </a>

            <Link to="/contact">Need Help?</Link>
          </div>
        </div>
      </section>

      <section className="guide-intro">
        <div>
          <span>Simple Process</span>
          <h2>From schedule to checkout, step by step.</h2>
        </div>

        <p>
          Mindbody handles reservations for The Fusion House. The process may
          look different from the main website, but the steps are simple once
          you know what to expect.
        </p>
      </section>

      <section className="guide-steps">
        {guideSteps.map((step) => (
          <article className="guide-step" key={step.number}>
            <div className="guide-step-copy">
              <span>{step.number}</span>
              <h2>{step.title}</h2>
              <p>{step.text}</p>
            </div>

            <div className="guide-step-image">
              <img src={step.image} alt={`${step.title} screenshot`} />
            </div>
          </article>
        ))}
      </section>

      <section className="guide-final">
        <h2>Ready to reserve your session?</h2>
        <p>
          Open the Mindbody schedule, choose your class, and follow the steps in
          this guide.
        </p>

        <a
          href={mindbodyLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            track("Open Mindbody From Guide", {
              location: "Guide Final CTA",
            })
          }
        >
          Open Booking Schedule
        </a>
      </section>
    </main>
  );
}

export default Guide;