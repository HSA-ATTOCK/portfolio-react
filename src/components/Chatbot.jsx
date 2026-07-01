"use client";
import React, { useState, useEffect, useRef } from "react";
import "../styles/chatbot.css";

const WEBHOOK_URL = process.env.NEXT_PUBLIC_CHAT_WEBHOOK_URL;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Convert **bold** within a string to <strong> elements
function parseBold(str, key) {
  const parts = str.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1
      ? <strong key={`${key}-b${i}`}>{part}</strong>
      : part
  );
}

// Render basic markdown: **bold**, * bullets, blank-line paragraphs
function renderMarkdown(text) {
  const lines = text.split("\n");
  const output = [];
  let listItems = [];

  const flushList = (idx) => {
    if (listItems.length) {
      output.push(<ul key={`ul${idx}`} className="cb-md-list">{listItems}</ul>);
      listItems = [];
    }
  };

  lines.forEach((raw, i) => {
    const line = raw.trim();

    if (line.startsWith("* ") || line.startsWith("- ")) {
      listItems.push(
        <li key={`li${i}`}>{parseBold(line.slice(2), `li${i}`)}</li>
      );
    } else {
      flushList(i);
      if (line === "") {
        // skip consecutive blanks that were already flushed
      } else {
        output.push(
          <p key={`p${i}`} className="cb-md-p">
            {parseBold(line, `p${i}`)}
          </p>
        );
      }
    }
  });

  flushList("end");
  return output;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState("intro"); // "intro" | "chat"
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [introErrors, setIntroErrors] = useState({});
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const userMessageCount = useRef(0);
  const transcriptSent   = useRef(false);
  const transcriptTimer  = useRef(null);

  const messagesEndRef = useRef(null);
  const chatInputRef = useRef(null);
  const sessionId = useRef(
    typeof crypto !== "undefined"
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2),
  );

  // Load stored user on mount
  useEffect(() => {
    const storedName = localStorage.getItem("cb_name");
    const storedEmail = localStorage.getItem("cb_email");
    if (storedName && storedEmail) {
      setUserName(storedName);
      setUserEmail(storedEmail);
      setStep("chat");
    }
  }, []);

  // Welcome message when entering chat for first time
  useEffect(() => {
    if (step === "chat" && messages.length === 0 && userName) {
      setMessages([
        {
          id: "welcome",
          type: "bot",
          text: `Hi ${userName}! 👋 I'm Haider's AI assistant. Ask me anything about his work, skills, or availability.`,
        },
      ]);
    }
  }, [step, userName, messages.length]);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && step === "chat") {
      setTimeout(() => chatInputRef.current?.focus(), 150);
      setHasUnread(false);
    }
  }, [isOpen, step]);

  // ---------- Transcript sending ----------
  const sendTranscript = (msgs, name, email) => {
    if (transcriptSent.current) return;
    const hasUserMsg = msgs.some((m) => m.type === "user");
    if (!hasUserMsg || !email) return;
    transcriptSent.current = true;

    fetch("/api/send-chat-transcript", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: msgs, userName: name, userEmail: email }),
    }).catch(() => {});
  };

  // Schedule transcript after 1 minute of inactivity (chat closed)
  const scheduleTranscript = (msgs, name, email) => {
    // Cancel any existing timer first
    if (transcriptTimer.current) clearTimeout(transcriptTimer.current);

    transcriptTimer.current = setTimeout(() => {
      sendTranscript(msgs, name, email);
      transcriptTimer.current = null;
    }, 60000); // 1 minute
  };

  // Cancel the scheduled transcript (user reopened chat)
  const cancelTranscriptTimer = () => {
    if (transcriptTimer.current) {
      clearTimeout(transcriptTimer.current);
      transcriptTimer.current = null;
    }
  };

  // On page/tab close — send immediately via sendBeacon (no delay possible)
  useEffect(() => {
    const handleUnload = () => {
      // Cancel the 1-min timer since we're sending now
      if (transcriptTimer.current) clearTimeout(transcriptTimer.current);

      if (transcriptSent.current) return;
      const hasUserMsg = messages.some((m) => m.type === "user");
      if (!hasUserMsg || !userEmail) return;
      transcriptSent.current = true;

      navigator.sendBeacon(
        "/api/send-chat-transcript",
        new Blob(
          [JSON.stringify({ messages, userName, userEmail })],
          { type: "application/json" }
        )
      );
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, [messages, userName, userEmail]);

  // ---------- Intro form ----------
  const validateIntro = () => {
    const errs = {};
    if (!nameInput.trim()) errs.name = "Name is required.";
    if (!emailInput.trim()) errs.email = "Email is required.";
    else if (!EMAIL_REGEX.test(emailInput)) errs.email = "Enter a valid email.";
    return errs;
  };

  const handleIntroSubmit = (e) => {
    e.preventDefault();
    const errs = validateIntro();
    if (Object.keys(errs).length) {
      setIntroErrors(errs);
      return;
    }
    const name = nameInput.trim();
    const email = emailInput.trim();
    localStorage.setItem("cb_name", name);
    localStorage.setItem("cb_email", email);
    setUserName(name);
    setUserEmail(email);
    setStep("chat");
  };

  // ---------- Messaging ----------
  const sendMessage = async () => {
    const text = inputValue.trim();
    if (!text || isLoading) return;

    const userMsg = { id: Date.now(), type: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    const currentIndex = userMessageCount.current;
    userMessageCount.current += 1;

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          name: userName,
          email: userEmail,
          sessionId: sessionId.current,
          messageIndex: currentIndex, // 0 = first message, 1+ = subsequent
        }),
      });

      let botText = "Sorry, I didn't get a response. Please try again.";

      if (res.ok) {
        const raw = await res.text();
        try {
          const data = JSON.parse(raw);
          botText =
            // Standard n8n output formats
            data.output ??
            data.message ??
            data.text ??
            data.reply ??
            data.response ??
            // Array wrapping (n8n sometimes wraps in array)
            (Array.isArray(data) && data[0]?.output) ??
            (Array.isArray(data) && data[0]?.message) ??
            (Array.isArray(data) && data[0]?.text) ??
            // Google Gemini format: [{content:{parts:[{text:"..."}]}}]
            (Array.isArray(data) && data[0]?.content?.parts?.[0]?.text) ??
            botText;
        } catch {
          // n8n returned plain text
          if (raw.trim()) botText = raw.trim();
        }
      }

      const botMsg = { id: Date.now() + 1, type: "bot", text: String(botText) };
      setMessages((prev) => [...prev, botMsg]);
      if (!isOpen) setHasUnread(true);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: "bot",
          text: "Connection error. Please check your network and try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleChat = () => {
    if (isOpen) {
      // Closing — start 1-minute countdown
      scheduleTranscript(messages, userName, userEmail);
    } else {
      // Opening — cancel any pending transcript timer (user is back)
      cancelTranscriptTimer();
    }
    setIsOpen((prev) => !prev);
    if (!isOpen) setHasUnread(false);
  };

  // ---------- Render ----------
  return (
    <>
      {/* ── Chat Window ── */}
      <div className={`cb-window ${isOpen ? "cb-window--open" : ""}`}>
        {/* Header */}
        <div className="cb-header">
          <div className="cb-header-left">
            <div className="cb-avatar">
              <span>H</span>
              <span className="cb-status-dot" />
            </div>
            <div className="cb-header-text">
              <p className="cb-header-name">Haider&apos;s Assistant</p>
              <p className="cb-header-status">AI Powered · Online</p>
            </div>
          </div>
          <button
            className="cb-close-btn"
            onClick={toggleChat}
            aria-label="Close chat"
          >
            <i className="bx bx-x" />
          </button>
        </div>

        {/* ── Intro Form ── */}
        {step === "intro" && (
          <div className="cb-intro">
            <div className="cb-intro-icon">
              <i className="bx bx-bot" />
            </div>
            <h3>Before we chat</h3>
            <p>Please introduce yourself so I can assist you better.</p>
            <form onSubmit={handleIntroSubmit} noValidate>
              <div className="cb-field">
                <input
                  type="text"
                  placeholder="Your Name *"
                  value={nameInput}
                  autoFocus
                  onChange={(e) => {
                    setNameInput(e.target.value);
                    setIntroErrors((p) => ({ ...p, name: undefined }));
                  }}
                  className={introErrors.name ? "cb-input-error" : ""}
                />
                {introErrors.name && (
                  <span className="cb-field-error">{introErrors.name}</span>
                )}
              </div>
              <div className="cb-field">
                <input
                  type="email"
                  placeholder="Your Email *"
                  value={emailInput}
                  onChange={(e) => {
                    setEmailInput(e.target.value);
                    setIntroErrors((p) => ({ ...p, email: undefined }));
                  }}
                  className={introErrors.email ? "cb-input-error" : ""}
                />
                {introErrors.email && (
                  <span className="cb-field-error">{introErrors.email}</span>
                )}
              </div>
              <button type="submit" className="cb-start-btn">
                Start Chatting <i className="bx bx-right-arrow-alt" />
              </button>
            </form>
          </div>
        )}

        {/* ── Messages ── */}
        {step === "chat" && (
          <>
            <div className="cb-messages">
              {messages.map((msg) => (
                <div key={msg.id} className={`cb-msg cb-msg--${msg.type}`}>
                  {msg.type === "bot" && <div className="cb-msg-avatar">H</div>}
                  <div className="cb-msg-bubble">
                    {msg.type === "bot" ? renderMarkdown(msg.text) : msg.text}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="cb-msg cb-msg--bot">
                  <div className="cb-msg-avatar">H</div>
                  <div className="cb-msg-bubble cb-typing">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="cb-input-area">
              <input
                ref={chatInputRef}
                type="text"
                placeholder="Type a message…"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !inputValue.trim()}
                aria-label="Send message"
                className="cb-send-btn"
              >
                <i className="bx bxs-send" />
              </button>
            </div>
          </>
        )}
      </div>

      {/* ── Toggle Bubble ── */}
      <button
        className={`cb-toggle ${isOpen ? "cb-toggle--open" : ""}`}
        onClick={toggleChat}
        aria-label="Open chat"
      >
        <i className={`bx ${isOpen ? "bx-x" : "bx-chat"}`} />
        {hasUnread && !isOpen && <span className="cb-unread-dot" />}
        {!isOpen && <span className="cb-pulse" />}
      </button>
    </>
  );
}
