import { useMemo, useState, useEffect } from "react";
import { FaCommentDots, FaTimes, FaPaperPlane } from "react-icons/fa";
import "./Chatbot.css";

const ownerEmail = "OWNER_EMAIL_HERE";

const mindbodyLink =
  "https://clients.mindbodyonline.com/classic/mainclass?studioid=470306&tg=&vt=&lvl=&stype=-7&view=day&trn=0&page=&catid=&prodid=&date=6%2f17%2f2026&classid=0&prodGroupId=&sSU=&optForwardingLink=&qParam=&justloggedin=&nLgIn=&pMode=0&loc=1";

const knowledgeBase = [
  {
    keywords: [
      "book",
      "schedule",
      "appointment",
      "class",
      "mindbody",
      "reserve",
    ],
    answer:
      "You can book classes and appointments through Mindbody. The booking page opens in a new tab so you do not lose your place on this website.",
    linkText: "Open Booking Schedule",
    linkUrl: mindbodyLink,
    external: true,
  },
  {
    keywords: [
      "price",
      "pricing",
      "cost",
      "rate",
      "rates",
      "session",
      "package",
    ],
    answer:
      "Current listed personal training pricing includes an individual session for $150, 12 sessions for $720, 8 sessions for $640, and 4 sessions for $400. Prices may change, so confirm with Fusion House for the most current details.",
    linkText: "View Pricing",
    linkUrl: "/services#pricing",
  },
  {
    keywords: ["membership", "memberships", "monthly", "vip", "unlimited"],
    answer:
      "Fusion House offers membership options including unlimited sessions, three times a week, VIP membership, and a 10-class package.",
    linkText: "View Memberships",
    linkUrl: "/services#membership-options",
  },
  {
    keywords: [
      "personal training",
      "trainer",
      "one on one",
      "1 on 1",
      "private training",
    ],
    answer:
      "Yes, Fusion House offers personal training with a customized plan, accountability, and guidance based on your goals.",
    linkText: "View Personal Training",
    linkUrl: "/services#personal",
  },
  {
    keywords: ["group", "classes", "class", "training"],
    answer:
      "Fusion House offers group training for people who want structure, coaching, and accountability in a community setting.",
    linkText: "View Group Options",
    linkUrl: "/services#memberships",
  },
  {
    keywords: [
      "rent",
      "rental",
      "space",
      "therapist",
      "event",
      "massage",
      "physical therapist",
    ],
    answer:
      "Yes, Fusion House offers space rental for trainers, physical therapists, massage therapists, wellness professionals, and events.",
    linkText: "View Space Rental",
    linkUrl: "/services#rental",
  },
  {
    keywords: ["location", "address", "where", "directions"],
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
    keywords: ["whatsapp", "message"],
    answer: "You can message Fusion House directly through WhatsApp.",
    linkText: "Open WhatsApp",
    linkUrl:
      "https://api.whatsapp.com/send/?phone=19145529619&text&type=phone_number&app_absent=0",
    external: true,
  },
  {
    keywords: ["hours", "open", "closed", "time"],
    answer:
      "Hours may vary by day and schedule. For the most accurate hours, check the contact page or call the gym directly.",
    linkText: "View Contact Info",
    linkUrl: "/contact",
  },
  {
    keywords: ["nutrition", "meal", "diet", "food"],
    answer:
      "Some programs may include nutrition guidance, accountability, and support. For exact nutrition options, contact Fusion House directly.",
    linkText: "Contact Fusion House",
    linkUrl: "/contact",
  },
];


function Chatbot() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"chat" | "contact">("chat");
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! Ask me about pricing, memberships, booking, classes, hours, or personal training.",
      linkText: "",
      linkUrl: "",
      external: false,
    },
  ]);
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

  const suggestedQuestions = useMemo(
    () => ["Pricing", "Memberships", "Book a class", "Personal training"],
    [],
  );

  function findAnswer(input: string) {
    const cleanInput = input.toLowerCase();

    return knowledgeBase.find((item) =>
      item.keywords.some((keyword) => cleanInput.includes(keyword)),
    );
  }

  function handleAsk(customQuestion?: string) {
    const userQuestion = customQuestion || question;

    if (!userQuestion.trim()) return;

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
          text: "I do not want to guess on that. I can send your question directly to Fusion House so the owner can reply by email.",
          linkText: "",
          linkUrl: "",
          external: false,
        };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setQuestion("");

    if (!match) {
      setTimeout(() => setMode("contact"), 600);
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
              </div>

              <div className="suggested-questions">
                {suggestedQuestions.map((item) => (
                  <button key={item} onClick={() => handleAsk(item)}>
                    {item}
                  </button>
                ))}
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
              <input
                type="hidden"
                name="_subject"
                value="New Website Message"
              />
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
                <textarea
                  name="message"
                  required
                  defaultValue={question}
                ></textarea>
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
