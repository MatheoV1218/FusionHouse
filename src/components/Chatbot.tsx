import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FaCommentDots,
  FaTimes,
  FaPaperPlane,
  FaChevronDown,
} from "react-icons/fa";
import "./Chatbot.css";

const ownerEmail = "Infofusionhouse@gmail.com";

// const mindbodyLink =
//   "https://clients.mindbodyonline.com/classic/ws?studioid=470306&stype=-7&sView=week&sLoc=1";

type Message = {
  sender: "bot" | "user";
  text: string;
  linkText?: string;
  linkUrl?: string;
  external?: boolean;
};

type KnowledgeItem = {
  keywords: string[];
  answer: string;
  linkText?: string;
  linkUrl?: string;
  external?: boolean;
};

function Chatbot() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const isSpanish = i18n.language === "es";

  const knowledgeBase = t("chatbot.knowledgeBase", {
    returnObjects: true,
  }) as KnowledgeItem[];

  const quickOptions = t("chatbot.quickOptions", {
    returnObjects: true,
  }) as string[];

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"chat" | "contact">("chat");
  const [question, setQuestion] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: t("chatbot.introMessage"),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      {
        sender: "bot",
        text: t("chatbot.introMessage"),
      },
    ]);
  }, [i18n.language, t]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    document.body.style.overflow =
      open && window.innerWidth <= 768 ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function localizedInternalUrl(url: string) {
    if (!isSpanish || url.startsWith("http") || url.startsWith("tel:")) {
      return url;
    }

    const [path, hash] = url.split("#");
    const localizedPath = path === "/" ? "/es" : `/es${path}`;

    return hash ? `${localizedPath}#${hash}` : localizedPath;
  }

  function normalizeText(text: string) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[¿?¡!.,]/g, "")
      .trim();
  }

  function findAnswer(input: string) {
    const cleanInput = normalizeText(input);

    return knowledgeBase.find((item) => {
      const keywordMatch = item.keywords.some((keyword) =>
        cleanInput.includes(normalizeText(keyword)),
      );

      const quickOptionMatch = item.keywords.some((keyword) =>
        normalizeText(keyword).includes(cleanInput),
      );

      return keywordMatch || quickOptionMatch;
    });
  }

  function handleInternalLink(url: string) {
    const finalUrl = localizedInternalUrl(url);
    const [path, hash] = finalUrl.split("#");

    setOpen(false);
    navigate(path || (isSpanish ? "/es" : "/"));

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

    if (
      userQuestion.toLowerCase().includes("contact owner") ||
      userQuestion.toLowerCase().includes("contact team") ||
      userQuestion.toLowerCase().includes("contactar")
    ) {
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
          text: t("chatbot.fallback"),
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
        aria-label={t("chatbot.openLabel")}
      >
        <FaCommentDots />
      </button>

      {open && (
        <div className="chatbot-widget">
          <div className="chatbot-header">
            <div>
              <h3>{t("chatbot.headerTitle")}</h3>
              <p>{t("chatbot.headerText")}</p>
            </div>

            <button
              onClick={() => setOpen(false)}
              aria-label={t("chatbot.closeLabel")}
            >
              <FaTimes />
            </button>
          </div>

          <div className="chatbot-tabs">
            <button
              className={mode === "chat" ? "active" : ""}
              onClick={() => setMode("chat")}
            >
              {t("chatbot.askTab")}
            </button>

            <button
              className={mode === "contact" ? "active" : ""}
              onClick={() => setMode("contact")}
            >
              {t("chatbot.contactTab")}
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
                  <span>{t("chatbot.quickQuestions")}</span>
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
                  placeholder={t("chatbot.inputPlaceholder")}
                />

                <button
                  onClick={() => handleAsk()}
                  aria-label={t("chatbot.sendLabel")}
                >
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
                {t("chatbot.form.name")}
                <input type="text" name="name" required />
              </label>

              <label>
                {t("chatbot.form.email")}
                <input type="email" name="email" required />
              </label>

              <label>
                {t("chatbot.form.message")}
                <textarea name="message" required></textarea>
              </label>

              <button type="submit">{t("chatbot.form.button")}</button>

              <p>{t("chatbot.form.note")}</p>
            </form>
          )}
        </div>
      )}
    </>
  );
}

export default Chatbot;
