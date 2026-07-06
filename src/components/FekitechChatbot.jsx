import { useEffect, useMemo, useRef, useState } from "react";
import { Bot, Mic, MicOff, Send, X } from "lucide-react";

const starterChips = [
  "What does Fekitech do?",
  "Can you build a website for my business?",
  "Can you automate my website?",
  "Can you build an AI chatbot?",
  "Can you help with SEO?",
  "How do I contact Fekitech?"
];

const logoMark = "/fekitech-logo-transparent-cropped.png";

const welcomeMessage = {
  role: "assistant",
  content: "Hi, I’m the Fekitech Assistant. Ask me about services, business systems, automation, websites, AI agents, or how to contact the team."
};

function getSpeechRecognition() {
  if (typeof window === "undefined") return null;
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

function escapeMarkdownText(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderInlineMarkdown(value = "") {
  const escaped = escapeMarkdownText(value);
  return escaped
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+|mailto:[^)\s]+|\/[^)\s]+)\)/g, (_match, label, href) => {
      const target = href.startsWith("http") ? ' target="_blank" rel="noopener noreferrer"' : "";
      return `<a href="${href}"${target}>${label}</a>`;
    });
}

function InlineMarkdown({ text }) {
  return <span dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(text) }} />;
}

function normaliseAssistantMarkdown(content = "") {
  return String(content)
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/\s+(?=(?:[-*])\s+(?:\*\*)?[A-Z0-9])/g, "\n")
    .replace(/\s+(?=\d+\.\s+(?:\*\*)?[A-Z0-9])/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function renderParagraph(lines, key) {
  return (
    <p key={key}>
      {lines.map((line, lineIndex) => (
        <span key={`${line}-${lineIndex}`}>
          {lineIndex > 0 && <br />}
          <InlineMarkdown text={line} />
        </span>
      ))}
    </p>
  );
}

function renderList(lines, type, key) {
  const Tag = type === "ol" ? "ol" : "ul";
  return (
    <Tag key={key}>
      {lines.map((line) => (
        <li
          key={line}
          dangerouslySetInnerHTML={{
            __html: renderInlineMarkdown(line.replace(/^\s*(?:[-*]|\d+\.)\s+/, ""))
          }}
        />
      ))}
    </Tag>
  );
}

function renderMixedBlock(block, blockIndex) {
  const lines = block.split("\n").filter(Boolean);
  const elements = [];
  let paragraphLines = [];
  let listLines = [];
  let listType = "";

  function flushParagraph() {
    if (!paragraphLines.length) return;
    elements.push(renderParagraph(paragraphLines, `p-${blockIndex}-${elements.length}`));
    paragraphLines = [];
  }

  function flushList() {
    if (!listLines.length) return;
    elements.push(renderList(listLines, listType, `list-${blockIndex}-${elements.length}`));
    listLines = [];
    listType = "";
  }

  lines.forEach((line) => {
    const isBullet = /^\s*[-*]\s+/.test(line);
    const isNumbered = /^\s*\d+\.\s+/.test(line);

    if (isBullet || isNumbered) {
      const nextType = isNumbered ? "ol" : "ul";
      flushParagraph();
      if (listType && listType !== nextType) flushList();
      listType = nextType;
      listLines.push(line);
      return;
    }

    flushList();
    paragraphLines.push(line);
  });

  flushParagraph();
  flushList();
  return elements;
}

function MarkdownMessage({ content }) {
  const normalisedContent = normaliseAssistantMarkdown(content);
  const blocks = normalisedContent.split(/\n{2,}/).filter(Boolean);

  return (
    <div className="chatbot-markdown">
      {blocks.flatMap((block, index) => renderMixedBlock(block, index))}
    </div>
  );
}

export default function FekitechChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([welcomeMessage]);
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setSpeechSupported(Boolean(getSpeechRecognition()));
  }, []);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages, open]);

  useEffect(() => {
    if (open) {
      window.setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [open]);

  const canSend = useMemo(() => input.trim().length > 1 && !loading, [input, loading]);

  function updateLastAssistantMessage(content) {
    setMessages((current) => {
      const updated = [...current];
      updated[updated.length - 1] = { role: "assistant", content };
      return updated;
    });
  }

  async function sendMessage(text = input) {
    const clean = text.trim();
    if (!clean || loading) return;

    const nextMessages = [...messages, { role: "user", content: clean }];
    setMessages([...nextMessages, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.filter((message) => message.role !== "system") })
      });

      if (!response.ok) {
        throw new Error("Chat request failed.");
      }

      const assistantText = await response.text();

      if (!assistantText.trim()) throw new Error("Empty chat response.");
      updateLastAssistantMessage(assistantText);
    } catch {
      updateLastAssistantMessage("I’m having trouble connecting right now. You can contact Fekitech directly at info@contact.fekitech.co.uk or call +447352364942.");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage();
  }

  function toggleVoiceTyping() {
    const SpeechRecognition = getSpeechRecognition();
    if (!SpeechRecognition) return;

    if (listening && recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-GB";
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0]?.transcript || "")
        .join(" ")
        .trim();
      if (transcript) setInput(transcript);
    };

    recognitionRef.current = recognition;
    recognition.start();
  }

  return (
    <div className={`fekitech-chatbot ${open ? "is-open" : ""}`} aria-live="polite">
      {open && (
        <div className="chatbot-panel" role="dialog" aria-label="Fekitech Assistant">
          <header className="chatbot-header">
            <div className="chatbot-avatar" aria-hidden="true">
              <img src={logoMark} alt="" width="616" height="646" />
            </div>
            <div>
              <h2>Fekitech Assistant</h2>
              <p>Ask about our services, systems, or how we can help.</p>
            </div>
            <button type="button" className="chatbot-close" onClick={() => setOpen(false)} aria-label="Close chatbot">
              <X size={18} />
            </button>
          </header>

          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <article className={`chatbot-message ${message.role}`} key={`${message.role}-${index}`}>
                <MarkdownMessage content={message.content || (loading && index === messages.length - 1 ? "Thinking..." : "")} />
              </article>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-chips" aria-label="Suggested questions">
            {starterChips.map((chip) => (
              <button key={chip} type="button" onClick={() => sendMessage(chip)} disabled={loading}>
                {chip}
              </button>
            ))}
          </div>

          <form className="chatbot-input-row" onSubmit={handleSubmit}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  sendMessage();
                }
              }}
              rows="1"
              placeholder="Ask a question..."
              aria-label="Ask Fekitech a question"
            />
            {speechSupported && (
              <button
                type="button"
                className={`chatbot-icon-button ${listening ? "is-listening" : ""}`}
                onClick={toggleVoiceTyping}
                aria-label={listening ? "Stop voice typing" : "Start voice typing"}
              >
                {listening ? <MicOff size={17} /> : <Mic size={17} />}
              </button>
            )}
            <button type="submit" className="chatbot-send" disabled={!canSend} aria-label="Send message">
              <Send size={17} />
            </button>
          </form>

          <footer className="chatbot-footer">Powered by Fekitech AI</footer>
        </div>
      )}

      <button type="button" className="chatbot-launcher" onClick={() => setOpen((value) => !value)} aria-label="Ask Fekitech Assistant">
        <span className="chatbot-launcher-icon">
          <Bot size={22} />
          <i aria-hidden="true" />
        </span>
        <span className="chatbot-launcher-label">Ask us anything</span>
      </button>
    </div>
  );
}
