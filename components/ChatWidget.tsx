/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState, useRef } from "react";
import { Send, MessageSquare, Sparkles, ChevronDown, Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";

function generateSessionId(length = 12) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length))
  ).join("");
}

type Message = {
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
};

const ChatWidget = () => {
  const [sessionId, setSessionId] = useState<string | null>("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize session and welcome message
  useEffect(() => {
    const existingSessionId =
      localStorage.getItem("wigChatSessionId") ||
      (generateSessionId() as unknown as string);
    localStorage.setItem("wigChatSessionId", existingSessionId);
    setSessionId(existingSessionId);

    setMessages([
      {
        sender: "bot",
        text: "Hello, beautiful! 👑 I’m your Perfect Strands virtual stylist — here to help iconic queens like you find the perfect wig.\nAsk me anything about human hair, lace fronts, or styling tips. Ready to slay? Let’s crown your confidence. 💁‍♀️✨",
        timestamp: new Date(),
      },
    ]);
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      sender: "user",
      text: input,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({
          question: input,
          sessionId,
          context: "wig-consultation",
        }),
      });
      const data = await res.json();
      const botText =
        data.answer ||
        data.output ||
        "Hmm... I didn’t catch that. Can you rephrase?";

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: botText,
          timestamp: new Date(),
        },
      ]);
    } catch (error: unknown) {
      console.error("Error sending message:", (error as Error).message);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Oops! My styling tools are tangled. Try again in a moment!",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-[#D4AF37] to-[#f5c542] text-white p-3 rounded-full shadow-lg hover:scale-105 transition-transform group"
        aria-label="Open wig consultation chat"
      >
        <Bot size={28} />
        <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
          ✨
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[90vw] max-w-md h-[70vh] min-h-[400px] max-h-[600px] flex flex-col bg-white rounded-2xl shadow-xl overflow-hidden border border-[#f3e8f1]">
      {/* Header */}
      <div
        className="bg-gradient-to-r from-[#D4AF37] to-[#f5c542] p-3 text-white flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(false)}
      >
        <div className="flex items-center">
          <MessageSquare className="mr-2" />
        </div>
        <div className="flex items-center">
          <Sparkles className="mr-2 text-white/80" size={16} />
          <ChevronDown size={18} />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gradient-to-b from-[#fff9fb] to-[#fdf2f8]">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${
              msg.sender === "user" ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`p-3 rounded-2xl max-w-[90%] break-words whitespace-pre-wrap ${
                msg.sender === "user"
                  ? "bg-[#3b1f2b] text-white rounded-br-none"
                  : "bg-white text-[#3b1f2b] rounded-bl-none border border-[#f3e8f1]"
              }`}
            >
              <ReactMarkdown
                components={{
                  img: ({ node, ...props }) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      {...props}
                      src={props.src || "/placeholder-product.jpg"}
                      className="my-4 rounded-xl border border-gray-200 shadow-md w-full max-w-md mx-auto"
                      alt="Product image"
                    />
                  ),
                  a: ({ node, ...props }) => (
                    <a
                      {...props}
                      className="text-pink-600 underline hover:text-pink-800 font-semibold"
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3
                      className="text-xl font-bold text-gray-900 my-2"
                      {...props}
                    />
                  ),
                  strong: ({ node, ...props }) => (
                    <strong
                      className="text-gray-700 font-semibold"
                      {...props}
                    />
                  ),
                }}
              >
                {msg.text}
              </ReactMarkdown>
            </div>
            <span className="text-xs text-gray-400 mt-1">
              {msg.timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        ))}
        {isTyping && (
          <div className="p-3 rounded-2xl max-w-max bg-white text-[#3b1f2b] rounded-bl-none border border-[#f3e8f1]">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 border-t border-[#f3e8f1] bg-white">
        <div className="flex gap-2 items-end">
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full border border-[#f3e8f1] rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 resize-none min-h-[44px] max-h-[120px]"
              placeholder="Ask about wigs, colors, or styles..."
              aria-label="Type your wig question"
              rows={1}
            />
          </div>
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isTyping}
            className="bg-[#D4AF37] hover:bg-[#c59e2f] text-white p-2 rounded-full disabled:opacity-50 transition-all h-[44px] w-[44px] flex-shrink-0 flex items-center justify-center disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;
