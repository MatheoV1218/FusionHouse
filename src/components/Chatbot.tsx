import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCommentDots,
  FaTimes,
  FaPaperPlane,
  FaChevronDown,
} from "react-icons/fa";
import "./Chatbot.css";

const ownerEmail = "mateovillada1@outlook.com";

const mindbodyLink =
  "https://clients.mindbodyonline.com/classic/ws?studioid=470306&stype=-7&sView=week&sLoc=1";

type Message = {
  sender: "bot" | "user";
  text: string;
  linkText?: string;
  linkUrl?: string;
  external?: boolean;
};

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
      "Personal training pricing is listed on the Services page. You can view the current options and packages there.",
    linkText: "View Personal Training Pricing",
    linkUrl: "/services#pricing",
  },
  {
    keywords: ["membership", "memberships", "monthly", "vip", "unlimited", "10 class"],
    answer:
      "Fusion House offers monthly membership options, including two times a week, three times a week, VIP membership, and a 10-class package.",
    linkText: "View Membership Options",
    linkUrl: "/services#membership-options",
  },
  {
    keywords: ["personal", "personal training", "trainer", "one on one", "1 on 1", "private"],
    answer:
      "Yes, Fusion House offers personal training with customized coaching, accountability, and guidance based on your goals.",
    linkText: "View Personal Training",
    linkUrl: "/services#personal",
  },
  {
    keywords: ["group", "group classes", "classes", "strength training", "conditioning"],
    answer:
      "Fusion House offers group training for adults who want structure, coaching, and accountability in a supportive setting.",
    linkText: "View Memberships",
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
    keywords: ["beginner", "new", "out of shape", "never worked out", "start", "older", "adult"],
    answer:
      "Beginners and adults getting back into fitness are welcome. Fusion House is built around coaching, confidence, and sustainable progress.",
    linkText: "View Services",
    linkUrl: "/services#personal",
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
  "I am a beginner",
];

function Chatbot() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"chat" | "contact">("chat");
  const [question, setQuestion] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hi! I can help with pricing, memberships, booking, classes, hours, location, personal training, and more.",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    document.body.style.overflow = open && window.innerWidth <= 768 ? "hidden" : "";

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

  function handleInternalLink(url: string) {
    const [path, hash] = url.split("#");

    setOpen(false);
    navigate(path || "/");

    if (hash) {
      setTimeout(() => {
        const section = document.getElementById(hash);
        section?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    }
  }

  function handleAsk(customQuestion?: string) {
    const userQuestion = customQuestion || question;
    if (!userQuestion.trim()) return;

    if (userQuestion.toLowerCase().includes("contact owner")) {
      setMode("contact");
      setQuestion("");
      setShowOptions(false);
      return;
    }

    const match = findAnswer(userQuestion);

    const userMessage: Message = {
      sender: "user",
      text: userQuestion,
    };

    const botMessage: Message = match
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
        aria-label="Open Fusion House assistant"
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

            <button onClick={() => setOpen(false)} aria-label="Close chatbot">
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
                        <button
                          className="chat-link-button"
                          onClick={() => handleInternalLink(message.linkUrl!)}
                        >
                          {message.linkText}
                        </button>
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

                <button onClick={() => handleAsk()} aria-label="Send message">
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