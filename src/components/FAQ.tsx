import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./FAQ.css";
import grainyBackground from "../assets/grainyBackground.png";

const mindbodyLink =
  "https://clients.mindbodyonline.com/classic/ws?studioid=470306&stype=-7&sView=week&sLoc=1";

const faqs = [
  {
    category: "Getting Started",
    question: "How do I reserve a class or private coaching session?",
    answer:
      "You can reserve any class or appointment through Mindbody using the Reserve Your Session buttons on the website. The booking page opens in a new tab for convenience.",
    link: { label: "Open booking schedule", url: mindbodyLink, external: true },
  },
  {
    category: "Getting Started",
    question: "Do you offer a complimentary trial class?",
    answer:
      "Yes. New visitors can begin with a complimentary trial class to experience the facility, meet the coaches, and see if The Fusion House is the right fit.",
    link: { label: "Reserve your trial session", url: mindbodyLink, external: true },
  },
  {
    category: "Getting Started",
    question: "Can beginners join?",
    answer:
      "Yes. We work with adults at all experience levels. Our coaching is designed to help you start safely, build confidence, and progress at a pace that fits your body and goals.",
  },
  {
    category: "Getting Started",
    question: "What should I bring to my first visit?",
    answer:
      "Wear comfortable workout clothing, athletic shoes, and bring water. Bring anything else you typically need to feel prepared.",
  },
  {
    category: "Getting Started",
    question: "Can I visit before enrolling?",
    answer:
      "Yes. You can reserve a complimentary trial class or contact our team for guidance on the best starting point.",
    link: { label: "Reserve your trial session", url: mindbodyLink, external: true },
  },
  {
    category: "Getting Started",
    question: "Do I need to be in shape before joining?",
    answer:
      "No. Our coaching is designed to help you build strength, confidence, and consistency from wherever you are right now.",
  },
  {
    category: "Booking",
    question: "Do I need a Mindbody account to book?",
    answer:
      "Mindbody may ask you to sign in or create an account to manage reservations and appointments.",
    link: { label: "Open Mindbody", url: mindbodyLink, external: true },
  },
  {
    category: "Booking",
    question: "Can I book directly from the website?",
    answer:
      "Yes. All booking buttons lead to our official Mindbody schedule to ensure your reservation is secure.",
    link: { label: "Reserve through Mindbody", url: mindbodyLink, external: true },
  },
  {
    category: "Booking",
    question: "Do you allow same‑day bookings?",
    answer:
      "Same‑day availability depends on the schedule, coach availability, and open class spots.",
    link: { label: "Check availability", url: mindbodyLink, external: true },
  },
  {
    category: "Booking",
    question: "Can I reschedule an appointment?",
    answer:
      "Rescheduling may be available through Mindbody depending on the appointment type and cancellation window.",
    link: { label: "Manage booking", url: mindbodyLink, external: true },
  },
  {
    category: "Booking",
    question: "What if I arrive late?",
    answer:
      "Arriving on time is recommended. If you’re running late, contact the gym as soon as possible.",
  },
  {
    category: "Booking",
    question: "How far in advance can I reserve sessions?",
    answer:
      "Availability varies based on class schedules and coach openings. Check the Mindbody schedule for current options.",
    link: { label: "View schedule", url: mindbodyLink, external: true },
  },
  {
    category: "Personal Training",
    question: "What personal training options do you offer?",
    answer:
      "We offer private one‑on‑one coaching tailored to your goals, experience level, and lifestyle. Sessions may include assessment, personalized programming, and accountability coaching.",
    link: { label: "View personal training", url: "/services#personal" },
  },
  {
    category: "Personal Training",
    question: "How long is a personal training session?",
    answer: "Most private coaching sessions are approximately 60 minutes.",
    link: { label: "View personal training", url: "/services#personal" },
  },
  {
    category: "Personal Training",
    question: "Will I receive a personalized training plan?",
    answer:
      "Yes. Your program is designed specifically for your goals, mobility, and training experience.",
    link: { label: "View personal training", url: "/services#personal" },
  },
  {
    category: "Personal Training",
    question: "Can personal training support fat‑loss goals?",
    answer:
      "Yes. Coaching provides structure, accountability, and guidance to support fat‑loss and body‑composition goals.",
    link: { label: "View personal training", url: "/services#personal" },
  },
  {
    category: "Personal Training",
    question: "Can personal training help me build muscle?",
    answer:
      "Yes. Strength and muscle‑building programs are tailored to your goals and current ability.",
    link: { label: "View personal training", url: "/services#personal" },
  },
  {
    category: "Personal Training",
    question: "Do you offer training for sports performance?",
    answer:
      "Yes. Programs can be adapted for athletic performance, strength, and conditioning needs.",
    link: { label: "View personal training", url: "/services#personal" },
  },
  {
    category: "Personal Training",
    question: "Can I train if I have an injury or limitation?",
    answer:
      "Consult your healthcare provider first. Depending on your situation, your coach may be able to modify movements and work around limitations safely.",
  },
  {
    category: "Group Classes",
    question: "Do you offer small‑group training classes?",
    answer:
      "Yes. Our small‑group classes focus on strength, structure, accountability, and community.",
    link: { label: "View memberships", url: "/services#memberships" },
  },
  {
    category: "Group Classes",
    question: "What types of classes do you offer?",
    answer:
      "We offer structured strength and conditioning classes designed for long‑term progress and consistency.",
    link: { label: "View class options", url: "/services#memberships" },
  },
  {
    category: "Group Classes",
    question: "Do I need prior experience to join a class?",
    answer:
      "No. Classes accommodate different fitness levels, and coaches will guide you through the session.",
  },
  {
    category: "Group Classes",
    question: "Can I switch class reservations?",
    answer:
      "If space allows, you may be able to adjust your reservation through Mindbody.",
    link: { label: "Manage classes", url: mindbodyLink, external: true },
  },
  {
    category: "Pricing",
    question: "What is the price of an individual personal training session?",
    answer:
      "The current rate for a single 60‑minute private session is $150. Rates may vary based on package selection and availability.",
    link: { label: "View personal training options", url: "/services#pricing" },
  },
  {
    category: "Pricing",
    question: "What personal training packages are available?",
    answer:
      "Options include 4‑session, 8‑session, and 12‑session packages, as well as individual sessions.",
    link: { label: "View personal training options", url: "/services#pricing" },
  },
  {
    category: "Pricing",
    question: "Do you offer monthly memberships?",
    answer:
      "Yes. Memberships include 2‑day, 3‑day, unlimited training, and class‑pack options.",
    link: { label: "Explore membership options", url: "/services#membership-options" },
  },
  {
    category: "Pricing",
    question: "Can I pay monthly?",
    answer: "Yes. Monthly billing is available for membership options.",
    link: { label: "Explore membership options", url: "/services#membership-options" },
  },
  {
    category: "Pricing",
    question: "Are personal training and memberships separate?",
    answer:
      "Yes. Personal training and group memberships are separate unless a specific offering includes both.",
    link: { label: "Compare services", url: "/services#personal" },
  },
  {
    category: "Memberships",
    question: "Can I cancel my membership?",
    answer:
      "Policies vary by membership type. Contact our team for current cancellation details.",
    link: { label: "Contact The Fusion House", url: "/contact" },
  },
  {
    category: "Memberships",
    question: "Can I upgrade my membership?",
    answer:
      "Yes. You can upgrade your membership or training package at any time.",
    link: { label: "Explore membership options", url: "/services#membership-options" },
  },
  {
    category: "Memberships",
    question: "Do memberships renew automatically?",
    answer:
      "Some memberships may renew automatically. Review the terms before enrolling.",
    link: { label: "Explore membership options", url: "/services#membership-options" },
  },
  {
    category: "Facility",
    question: "Where is The Fusion House located?",
    answer: "126 South Lexington Avenue, White Plains, NY 10606.",
    link: { label: "View contact page", url: "/contact" },
  },
  {
    category: "Facility",
    question: "How large is the facility?",
    answer:
      "The Fusion House offers approximately 4,000 square feet of open, well‑equipped training space.",
    link: { label: "View space rental", url: "/services#rental" },
  },
  {
    category: "Facility",
    question: "What equipment is available?",
    answer:
      "We offer a full range of strength, conditioning, and functional training equipment.",
    link: { label: "View services", url: "/services#personal" },
  },
  {
    category: "Hours & Contact",
    question: "What are your hours?",
    answer:
      "Hours vary by day. Visit the contact page or call the gym for the most current schedule.",
    link: { label: "View contact info", url: "/contact" },
  },
  {
    category: "Hours & Contact",
    question: "How can I contact the team?",
    answer:
      "You can call, send a message through the website, use WhatsApp, or reach out through social platforms.",
    link: { label: "Contact The Fusion House", url: "/contact" },
  },
  {
    category: "Nutrition",
    question: "Do you offer nutrition guidance?",
    answer: "Some programs include nutrition support, accountability, and guidance.",
    link: { label: "Explore memberships", url: "/services#membership-options" },
  },
  {
    category: "Nutrition",
    question: "Do you create meal plans?",
    answer:
      "Certain programs may include meal‑planning guidance. Contact the team for current options.",
    link: { label: "Contact The Fusion House", url: "/contact" },
  },
  {
    category: "Space Rental",
    question: "Do you offer professional space rental?",
    answer:
      "Yes. The Fusion House rents space to certified trainers, therapists, wellness professionals, and event organizers.",
    link: { label: "View space rental", url: "/services#rental" },
  },
  {
    category: "Space Rental",
    question: "Who can rent the space?",
    answer:
      "Credentialed professionals such as trainers, physical therapists, massage therapists, and wellness practitioners may inquire about rental opportunities.",
    link: { label: "View space rental", url: "/services#rental" },
  },
  {
    category: "Space Rental",
    question: "Can I host a workshop or event?",
    answer:
      "Yes. Workshop and event availability depends on scheduling and space needs.",
    link: { label: "Contact The Fusion House", url: "/contact" },
  },
  {
    category: "Additional Questions",
    question: "Is parking available?",
    answer:
      "Street and nearby parking options are available. Contact the team for guidance if needed.",
  },
  {
    category: "Additional Questions",
    question: "Do you offer open gym access?",
    answer:
      "Open gym access may be available depending on membership type and class schedule.",
  },
  {
    category: "Additional Questions",
    question: "Do you offer training for older adults?",
    answer:
      "Yes. We specialize in coaching adults in their 40s, 50s, 60s, and beyond with joint‑friendly, personalized programming.",
    link: { label: "View personal training", url: "/services#personal" },
  },
  {
    category: "Additional Questions",
    question: "Do you offer corporate or group partnerships?",
    answer:
      "Yes. The Fusion House partners with local organizations for wellness programs and training initiatives.",
    link: { label: "Contact The Fusion House", url: "/contact" },
  },
];

const tags = [
  "Pricing",
  "Memberships",
  "Personal Training",
  "Group Classes",
  "Hours",
  "Booking",
  "Nutrition",
  "Space Rental",
];

function FAQ() {
  const [search, setSearch] = useState("");

  const filteredFaqs = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) return faqs;

    return faqs.filter((faq) => {
      return (
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.category.toLowerCase().includes(query)
      );
    });
  }, [search]);

  const categories = [...new Set(filteredFaqs.map((faq) => faq.category))];

  return (
    <main
      className="faq-page"
      style={{ backgroundImage: `url(${grainyBackground})` }}
    >
      <section className="faq-hero">
        <div className="faq-hero-inner">
          <p className="faq-eyebrow">FAQ</p>
          <h1>Quick answers before you reach out.</h1>
          <p>
            Search common questions about training, memberships, pricing, booking, nutrition, results, and space rental.
          </p>

          <div className="faq-search">
            <input
              type="text"
              placeholder="Search training, memberships, pricing, booking..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="faq-tags">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                className="faq-tag"
                onClick={() => setSearch(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="faq-content">
        <div className="faq-results-count">
          Showing {filteredFaqs.length} question
          {filteredFaqs.length === 1 ? "" : "s"}
        </div>

        {categories.map((category) => (
          <section className="faq-category" key={category}>
            <h2>{category}</h2>

            <div className="faq-list">
              {filteredFaqs
                .filter((faq) => faq.category === category)
                .map((faq) => (
                  <details className="faq-item" key={faq.question}>
                    <summary>{faq.question}</summary>
                    <p>{faq.answer}</p>

                    {faq.link &&
                      (faq.link.external ? (
                        <a
                          className="faq-link"
                          href={faq.link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {faq.link.label}
                        </a>
                      ) : (
                        <Link className="faq-link" to={faq.link.url}>
                          {faq.link.label}
                        </Link>
                      ))}
                  </details>
                ))}
            </div>
          </section>
        ))}

        {filteredFaqs.length === 0 && (
          <div className="faq-empty">
            <h2>No matching questions found.</h2>
            <p>
              Try searching for “pricing,” “book,” “membership,” “personal
              training,” “hours,” or “space rental.”
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

export default FAQ;
