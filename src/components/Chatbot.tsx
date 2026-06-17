import { useEffect, useRef, useState } from "react";
import { FaCommentDots, FaTimes, FaPaperPlane, FaChevronDown } from "react-icons/fa";
import "./Chatbot.css";

const ownerEmail = "mateovillada1@outlook.com";

const mindbodyLink =
  "https://clients.mindbodyonline.com/classic/ws?studioid=470306&stype=-7&sView=week&sLoc=1";

const knowledgeBase = [
  {
    keywords: ["book", "schedule", "appointment", "class", "reserve", "sign up", "trial", "free trial"],
    answer:
      "You can book classes, appointments, and trial sessions through Mindbody. It opens in a new tab so you do not lose your place on this website.",
    linkText: "Open Booking Schedule",
    linkUrl: mindbodyLink,
    external: true,
  },
  {
    keywords: ["price", "pricing", "cost", "rates", "session", "package", "how much"],
    answer:
      "Current listed personal training pricing includes $150 for an individual session, $720 for 12 sessions, $640 for 8 sessions, and $400 for 4 sessions. Prices may change, so confirm with Fusion House for the latest details.",
    linkText: "View Pricing",
    linkUrl: "/services#pricing",
  },
  {
    keywords: ["membership", "memberships", "monthly", "vip", "unlimited", "10 class"],
    answer:
      "Fusion House offers membership options including unlimited sessions, three times a week, VIP membership, and a 10-class package.",
    linkText: "View Memberships",
    linkUrl: "/services#membership-options",
  },
  {
    keywords: ["personal", "personal training", "trainer", "one on one", "1 on 1", "private"],
    answer:
      "Yes, Fusion House offers personal training with a customized plan, accountability, and guidance based on your goals.",
    linkText: "View Personal Training",
    linkUrl: "/services#personal",
  },
  {
    keywords: ["group", "group classes", "classes", "strength training", "conditioning"],
    answer:
      "Fusion House offers group training for people who want structure, coaching, and accountability in a community setting.",
    linkText: "View Group Options",
    linkUrl: "/services#memberships",
  },
  {
    keywords: ["rent", "rental", "space", "therapist", "event", "massage", "physical therapist"],
    answer:
      "Yes, Fusion House offers space rental for trainers, physical therapists, massage therapists, wellness professionals, and events.",
    linkText: "View Space Rental",
    linkUrl: "/services#rental",
  },
  {
    keywords: ["location", "address", "where", "directions", "map"],
    answer:
      "Fusion House is located at 126 South Lexington Avenue, White Plains, NY 10606.",
    linkText: "View Contact Page",
    linkUrl: "/contact",
  },
  {
    keywords: ["phone", "call", "contact", "number"],
    answer: "You can call Fusion House at 914-552-9619.",
    linkText: "Call Now",
    linkUrl: "tel:9145529619",
    external: true,
  },
  {
    keywords: ["whatsapp", "message", "text"],
    answer: "You can message Fusion House directly through WhatsApp.",
    linkText: "Open WhatsApp",
    linkUrl:
      "https://api.whatsapp.com/send/?phone=19145529619&text&type=phone_number&app_absent=0",
    external: true,
  },
  {
    keywords: ["hours", "open", "closed", "time"],
    answer:
      "Hours can vary by day and schedule. For the most accurate hours, check the contact page or call the gym directly.",
    linkText: "View Contact Info",
    linkUrl: "/contact",
  },
  {
    keywords: ["nutrition", "meal", "diet", "food", "meal plan"],
    answer:
      "Some programs may include nutrition guidance, accountability, and support. For exact nutrition options, contact Fusion House directly.",
    linkText: "Contact Fusion House",
    linkUrl: "/contact",
  },
  {
    keywords: ["beginner", "new", "out of shape", "never worked out", "start"],
    answer:
      "Beginners are welcome. Fusion House helps people start safely, build confidence, and stay consistent.",
    linkText: "View Services",
    linkUrl: "/services#personal",
  },
  {
    keywords: ["injury", "hurt", "pain", "shoulder", "knee", "back"],
    answer:
      "If you have an injury, it is best to check with a healthcare professional first. Trainers may be able to modify exercises depending on your situation.",
    linkText: "Contact the Gym",
    linkUrl: "/contact",
  },
  {
    keywords: ["reviews", "google reviews", "rating"],
    answer:
      "Fusion House has strong Google reviews from local members. You can view reviews on the homepage or visit Google for the full review list.",
    linkText: "Go to Home Reviews",
    linkUrl: "/",
  },
  {
    keywords: ["owner", "anthony", "about", "story"],
    answer:
      "Fusion House is owned by Anthony Moreno. You can learn more about his story and the gym’s journey on the About page.",
    linkText: "Read About Fusion House",
    linkUrl: "/about",
  },
];

const quickOptions = [
  "How do I book?",
  "What are your prices?",
  "Membership options",
  "Personal training",
  "Group classes",
  "Free trial",
  "Hours",
  "Location",
  "Contact the owner",
  "Space rental",
  "Nutrition coaching",
  "I am a beginner",
];

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"chat" | "contact">("chat");
  const [question, setQuestion] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! I can help with pricing, memberships, booking, classes, hours, location, personal training, and more.",
      linkText: "",
      linkUrl: "",
      external: false,
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open && window.innerWidth <= 768) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function findAnswer(input: string) {
    const cleanInput = input.toLowerCase();

    return knowledgeBase.find((item) =>
      item.keywords.some((keyword) => cleanInput.includes(keyword))
    );
  }

  function handleAsk(customQuestion?: string) {
    const userQuestion = customQuestion || question;
    if (!userQuestion.trim()) return;

    if (userQuestion.toLowerCase().includes("contact")) {
      setMode("contact");
      setQuestion("");
      setShowOptions(false);
      return;
    }

    const match = findAnswer(userQuestion);

    const userMessage = {
      sender: "user",
      text: userQuestion,
      linkText: "",
      linkUrl: "",
      external: false,
    };

    const botMessage = match
      ? {
          sender: "bot",
          text: match.answer,
          linkText: match.linkText,
          linkUrl: match.linkUrl,
          external: !!match.external,
        }
      : {
          sender: "bot",
          text:
            "I do not want to guess on that. You can send this question directly to Fusion House and the owner can reply by email.",
          linkText: "",
          linkUrl: "",
          external: false,
        };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setQuestion("");
    setShowOptions(false);

    if (!match) {
      setTimeout(() => setMode("contact"), 700);
    }
  }

  return (
    <>
      <button
        className={`chatbot-button ${open ? "hidden" : ""}`}
        onClick={() => setOpen(true)}
      >
        <FaCommentDots />
      </button>

      {open && (
        <div className="chatbot-widget">
          <div className="chatbot-header">
            <div>
              <h3>Fusion House Assistant</h3>
              <p>Ask a question or contact the owner.</p>
            </div>

            <button onClick={() => setOpen(false)}>
              <FaTimes />
            </button>
          </div>

          <div className="chatbot-tabs">
            <button
              className={mode === "chat" ? "active" : ""}
              onClick={() => setMode("chat")}
            >
              Ask
            </button>
            <button
              className={mode === "contact" ? "active" : ""}
              onClick={() => setMode("contact")}
            >
              Contact Owner
            </button>
          </div>

          {mode === "chat" ? (
            <>
              <div className="chatbot-messages">
                {messages.map((message, index) => (
                  <div key={index} className={`chat-message ${message.sender}`}>
                    <p>{message.text}</p>

                    {message.linkUrl &&
                      (message.external ? (
                        <a
                          href={message.linkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {message.linkText}
                        </a>
                      ) : (
                        <a href={message.linkUrl}>{message.linkText}</a>
                      ))}
                  </div>
                ))}

                <div ref={messagesEndRef} />
              </div>

              <div className={`quick-options-box ${showOptions ? "open" : ""}`}>
                <button
                  type="button"
                  className="quick-options-toggle"
                  onClick={() => setShowOptions(!showOptions)}
                >
                  <span>Quick questions</span>
                  <FaChevronDown />
                </button>

                {showOptions && (
                  <div className="quick-options-grid">
                    {quickOptions.map((item) => (
                      <button key={item} onClick={() => handleAsk(item)}>
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="chatbot-input">
                <input
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") handleAsk();
                  }}
                  placeholder="Ask about pricing, classes, booking..."
                />
                <button onClick={() => handleAsk()}>
                  <FaPaperPlane />
                </button>
              </div>
            </>
          ) : (
            <form
              className="chatbot-contact-form"
              action={`https://formsubmit.co/${ownerEmail}`}
              method="POST"
            >
              <input type="hidden" name="_subject" value="New Website Message" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />

              <label>
                Name
                <input type="text" name="name" required />
              </label>

              <label>
                Email
                <input type="email" name="email" required />
              </label>

              <label>
                Message
                <textarea name="message" required></textarea>
              </label>

              <button type="submit">Send Message</button>

              <p>
                This sends the message to Fusion House by email. The owner can
                reply directly like a normal email.
              </p>
            </form>
          )}
        </div>
      )}
    </>
  );
}

export default Chatbot;