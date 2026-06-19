import { FaPhoneAlt, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";
import "./Contact.css";

import grainyBackground from "../assets/grainyBackground.png";

import { track } from "@vercel/analytics";

const ownerEmail = "mateovillada1@outlook.com";

function Contact() {
  return (
    <main
      className="contact-page"
      style={{ backgroundImage: `url(${grainyBackground})` }}
    >
      <section className="contact-hero">
        <div className="contact-hero-inner">
          <p className="contact-eyebrow">Contact Us</p>
          <h1>Ready to visit Fusion House?</h1>
          <p>
            Have a question, want to book, or need help choosing the right
            training option? Reach out and the team will help you get started.
          </p>
        </div>
      </section>

      <section className="contact-quick">
        <a
          href="tel:9145529619"
          className="contact-card"
          onClick={() =>
            track("Call Gym Contact", {
              location: "Contact Page",
            })
          }
        >
          <FaPhoneAlt />
          <h3>Call Us</h3>
          <p>914-552-9619</p>
        </a>

        <a
          href="https://api.whatsapp.com/send/?phone=19145529619&text&type=phone_number&app_absent=0"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-card"
          onClick={() =>
            track("WhatsApp Click Contact", {
              location: "Contact Page",
            })
          }
        >
          <FaWhatsapp />
          <h3>WhatsApp</h3>
          <p>Message the team directly.</p>
        </a>

        <a
          href="https://www.google.com/maps/search/?api=1&query=126+South+Lexington+Avenue+White+Plains+NY+10606"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-card"
          onClick={() =>
            track("Directions Click Contact", {
              location: "Contact Page",
            })
          }
        >
          <FaMapMarkerAlt />
          <h3>Visit Us</h3>
          <p>126 South Lexington Ave</p>
        </a>
      </section>

      <section className="contact-main">
        <form
          className="contact-form"
          action={`https://formsubmit.co/${ownerEmail}`}
          method="POST"
          onSubmit={() =>
            track("Contact Form Submitted Contact Page", {
              location: "Contact Page",
            })
          }
        >
          <input
            type="hidden"
            name="_subject"
            value="New Fusion House Website Message"
          />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />

          <h2>Send a message</h2>

          <input type="text" name="name" placeholder="Name" required />
          <input type="email" name="email" placeholder="Email" required />
          <textarea name="message" placeholder="Message" required></textarea>

          <button type="submit">Send Message</button>

          <p className="form-note">
            Your message will be sent by email. The team can reply directly to
            the email address you provide.
          </p>
        </form>

        <div className="contact-info">
          <h2>Gym Info</h2>

          <div>
            <h3>Address</h3>
            <p>126 South Lexington Avenue</p>
            <p>White Plains, NY 10606</p>
          </div>

          <div>
            <h3>Phone</h3>
            <p>914-552-9619</p>
          </div>

          <div>
            <h3>Hours</h3>
            <p>Mon: 5:30 AM – 8:00 PM</p>
            <p>Tue: 8:00 AM – 8:00 PM</p>
            <p>Wed: 5:30 AM – 8:00 PM</p>
            <p>Thu: 5:00 AM – 8:00 PM</p>
            <p>Fri: 5:30 AM – 8:00 PM</p>
            <p>Sat: 9:00 AM – 10:00 AM</p>
            <p>Sun: 8:00 AM – 2:00 PM</p>
          </div>
        </div>
      </section>

      <section className="map-section">
        <div className="map-card">
          <iframe
            title="Fusion House Location"
            src="https://www.google.com/maps?q=126%20South%20Lexington%20Avenue%20White%20Plains%20NY%2010606&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          ></iframe>
        </div>
      </section>
    </main>
  );
}

export default Contact;
