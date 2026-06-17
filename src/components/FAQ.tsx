import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./FAQ.css";

const mindbodyLink =
  "https://clients.mindbodyonline.com/classic/mainclass?fl=true&tabID=7";

const faqs = [
  {
    category: "Getting Started",
    question: "How do I book a class or appointment?",
    answer:
      "You can book through Mindbody using any Book Now button on the website. The booking page opens in a new tab so you do not lose your spot on the site.",
    link: { label: "Open booking schedule", url: mindbodyLink, external: true },
  },
  {
    category: "Getting Started",
    question: "Do you offer a free trial class?",
    answer:
      "Yes. New visitors can start with a free trial class so they can experience the gym, meet the trainers, and see if Fusion House is a good fit.",
    link: { label: "Book a free trial", url: mindbodyLink, external: true },
  },
  {
    category: "Getting Started",
    question: "I am new to fitness. Can I still join?",
    answer:
      "Yes. Fusion House works with people at different fitness levels. The goal is to help you start safely, build confidence, and stay consistent.",
  },
  {
    category: "Getting Started",
    question: "What should I bring to my first visit?",
    answer:
      "Bring comfortable workout clothes, athletic shoes, water, and anything else you normally need to feel ready for a workout.",
  },
  {
    category: "Getting Started",
    question: "Can I visit before signing up?",
    answer:
      "Yes. The best first step is to book a free trial or contact the gym so the team can help you choose the right option.",
    link: { label: "Book a free trial", url: mindbodyLink, external: true },
  },
  {
    category: "Getting Started",
    question: "Do I need to be in shape before joining?",
    answer:
      "No. You do not need to be in shape before starting. The point of training is to help you build strength, confidence, and consistency over time.",
  },

  {
    category: "Booking",
    question: "Do I need a Mindbody account?",
    answer:
      "For online booking, Mindbody may ask you to sign in or create an account. This helps manage class reservations, appointments, and schedule details.",
    link: { label: "Open Mindbody", url: mindbodyLink, external: true },
  },
  {
    category: "Booking",
    question: "Can I book directly from this website?",
    answer:
      "The website sends you to the official Mindbody booking page. This is the safest way to make sure appointments and classes are properly reserved.",
    link: { label: "Book through Mindbody", url: mindbodyLink, external: true },
  },
  {
    category: "Booking",
    question: "Can I book same-day appointments?",
    answer:
      "Same-day booking depends on trainer availability, class schedule, and open spots in Mindbody.",
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
    question: "What happens if I am late?",
    answer:
      "Arriving on time is recommended so you can get the most out of your session or class. If you are running late, contact the gym as soon as possible.",
  },
  {
    category: "Booking",
    question: "How far in advance can I book?",
    answer:
      "Booking availability is handled through Mindbody and may vary depending on class schedules, trainer availability, and service type.",
    link: { label: "View schedule", url: mindbodyLink, external: true },
  },

  {
    category: "Personal Training",
    question: "Do you offer personal training?",
    answer:
      "Yes. Personal training includes a focused approach based on your goals, current fitness level, schedule, and needs. It can include assessment, individualized programming, and accountability coaching.",
    link: { label: "View personal training", url: "/services#personal" },
  },
  {
    category: "Personal Training",
    question: "How long is a personal training session?",
    answer: "Most personal training sessions are approximately one hour.",
    link: { label: "View personal training", url: "/services#personal" },
  },
  {
    category: "Personal Training",
    question: "Will I receive a customized workout plan?",
    answer:
      "Yes. Personal training is designed around your goals, experience level, schedule, and individual needs.",
    link: { label: "View personal training", url: "/services#personal" },
  },
  {
    category: "Personal Training",
    question: "Can personal training help me lose weight?",
    answer:
      "Yes. Personal training can provide structure, accountability, and guidance for fat loss goals.",
    link: { label: "View personal training", url: "/services#personal" },
  },
  {
    category: "Personal Training",
    question: "Can personal training help me build muscle?",
    answer:
      "Yes. Strength and muscle-building programs can be customized based on your goals and current fitness level.",
    link: { label: "View personal training", url: "/services#personal" },
  },
  {
    category: "Personal Training",
    question: "Can trainers help with sports performance?",
    answer:
      "Training can be adjusted for athletic goals, strength, conditioning, and performance needs.",
    link: { label: "View personal training", url: "/services#personal" },
  },
  {
    category: "Personal Training",
    question: "Can I train if I have an injury?",
    answer:
      "Always check with a healthcare professional first. Depending on your situation, trainers may be able to modify exercises and work around limitations.",
  },

  {
    category: "Group Classes",
    question: "Do you offer group classes?",
    answer:
      "Yes. Group training classes focus on strength, structure, accountability, and community. They are designed for people who want guided workouts without having to plan everything themselves.",
    link: { label: "View memberships", url: "/services#memberships" },
  },
  {
    category: "Group Classes",
    question: "What types of classes do you offer?",
    answer:
      "Fusion House offers structured strength and conditioning classes focused on accountability and long-term progress.",
    link: { label: "View class options", url: "/services#memberships" },
  },
  {
    category: "Group Classes",
    question: "Do I need experience before joining a class?",
    answer:
      "No. Classes can accommodate different fitness levels, and trainers can help guide you through the workout.",
  },
  {
    category: "Group Classes",
    question: "Can I switch classes?",
    answer:
      "If availability allows, you may be able to change reservations through Mindbody.",
    link: { label: "Manage classes", url: mindbodyLink, external: true },
  },

  {
    category: "Pricing",
    question: "How much is an individual personal training session?",
    answer:
      "The current listed price for an individual one-hour personal training session is $150. Prices may change and may vary depending on trainer, package, and availability.",
    link: { label: "View pricing", url: "/services#pricing" },
  },
  {
    category: "Pricing",
    question: "What personal training packages are available?",
    answer:
      "Current listed options include an individual session, 12-session package, 8-session package, and 4-session package.",
    link: { label: "View pricing", url: "/services#pricing" },
  },
  {
    category: "Pricing",
    question: "Do you offer monthly memberships?",
    answer:
      "Yes. Membership options include unlimited sessions, three times a week, VIP membership, and a 10-class package.",
    link: { label: "View membership options", url: "/services#membership-options" },
  },
  {
    category: "Pricing",
    question: "Can I pay monthly?",
    answer:
      "Monthly membership options are available. Exact terms depend on the membership you choose.",
    link: { label: "View membership options", url: "/services#membership-options" },
  },
  {
    category: "Pricing",
    question: "Are personal training and memberships the same thing?",
    answer:
      "Not always. Personal training and group memberships may be separate unless a specific package includes both.",
    link: { label: "Compare services", url: "/services#personal" },
  },

  {
    category: "Memberships",
    question: "Can I cancel my membership?",
    answer:
      "Membership policies can vary depending on the plan selected. Contact Fusion House directly for the most current cancellation information.",
    link: { label: "Contact Fusion House", url: "/contact" },
  },
  {
    category: "Memberships",
    question: "Can I upgrade my membership later?",
    answer:
      "Yes. Members can discuss upgrading to a different membership or training package with the staff.",
    link: { label: "View membership options", url: "/services#membership-options" },
  },
  {
    category: "Memberships",
    question: "Are memberships automatically renewed?",
    answer:
      "Some memberships may renew automatically. Review membership terms before enrolling.",
    link: { label: "View membership options", url: "/services#membership-options" },
  },

  {
    category: "Facility",
    question: "Where is Fusion House located?",
    answer:
      "Fusion House is located at 126 South Lexington Avenue, White Plains, NY 10606.",
    link: { label: "View contact page", url: "/contact" },
  },
  {
    category: "Facility",
    question: "How large is the gym?",
    answer:
      "The current website states that the facility has about 4,000 square feet of dynamic, well-stocked fitness space.",
    link: { label: "View space rental", url: "/services#rental" },
  },
  {
    category: "Facility",
    question: "What equipment do you have?",
    answer:
      "Fusion House offers equipment for strength training, conditioning, and functional fitness.",
    link: { label: "View services", url: "/services#personal" },
  },

  {
    category: "Hours & Contact",
    question: "What are the gym hours?",
    answer:
      "Hours may vary by day and schedule. Visitors should check the contact page or call the gym to confirm current hours.",
    link: { label: "View contact info", url: "/contact" },
  },
  {
    category: "Hours & Contact",
    question: "How can I contact the gym?",
    answer:
      "You can call the gym, send a message through the contact form, use WhatsApp, or reach out through social media.",
    link: { label: "Contact Fusion House", url: "/contact" },
  },

  {
    category: "Nutrition",
    question: "Do you offer nutrition coaching?",
    answer:
      "Some programs include nutrition guidance, accountability, and support.",
    link: { label: "View memberships", url: "/services#membership-options" },
  },
  {
    category: "Nutrition",
    question: "Do you create meal plans?",
    answer:
      "Certain programs may include meal planning guidance or nutrition support. Contact the gym for current options.",
    link: { label: "Contact Fusion House", url: "/contact" },
  },

  {
    category: "Space Rental",
    question: "Do you rent out the space?",
    answer:
      "Yes. Fusion House offers space rental for trainers, physical therapists, massage therapists, wellness professionals, and events.",
    link: { label: "View space rental", url: "/services#rental" },
  },
  {
    category: "Space Rental",
    question: "Who can rent the space?",
    answer:
      "Trainers, therapists, wellness professionals, and event organizers may inquire about rental opportunities.",
    link: { label: "View space rental", url: "/services#rental" },
  },
  {
    category: "Space Rental",
    question: "Can I host a workshop or event?",
    answer:
      "Workshop or event availability depends on scheduling and space needs. Contact Fusion House for details.",
    link: { label: "Contact Fusion House", url: "/contact" },
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
    <main className="faq-page">
      <section className="faq-hero">
        <div className="faq-hero-inner">
          <p className="faq-eyebrow">FAQ</p>
          <h1>Quick answers before you reach out.</h1>
          <p>
            Search common questions about training, memberships, pricing,
            booking, contact information, nutrition, results, and space rental.
          </p>

          <div className="faq-search">
            <input
              type="text"
              placeholder="Search questions, pricing, booking, classes..."
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