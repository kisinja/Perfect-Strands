 
"use client";

import { useEffect, useState, useRef } from "react";
import { Send, MessageSquare, Sparkles, ChevronDown } from "lucide-react";

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
        text: "Hello gorgeous! I'm your virtual wig stylist. 💁‍♀️ Ask me about colors, styles, or care tips!",
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") sendMessage();
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-[#D4AF37] to-[#f5c542] text-white p-4 rounded-full shadow-lg hover:scale-105 transition-transform group"
        aria-label="Open wig consultation chat"
      >
        <MessageSquare size={24} />
        <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
          ✨
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 h-[32rem] flex flex-col bg-white rounded-2xl shadow-xl overflow-hidden border border-[#f3e8f1]">
      {/* Header */}
      <div
        className="bg-gradient-to-r from-[#D4AF37] to-[#f5c542] p-3 text-white flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(false)}
      >
        <div className="flex items-center">
          <MessageSquare className="mr-2" />
          <h3 className="font-bold">Wig Stylist Chat</h3>
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
              className={`p-3 rounded-2xl max-w-[80%] ${
                msg.sender === "user"
                  ? "bg-[#3b1f2b] text-white rounded-br-none"
                  : "bg-white text-[#3b1f2b] rounded-bl-none border border-[#f3e8f1]"
              }`}
            >
              {msg.text}
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
          <div className="p-3 rounded-2xl max-w-[80%] bg-white text-[#3b1f2b] rounded-bl-none border border-[#f3e8f1]">
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
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 border border-[#f3e8f1] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
            placeholder="Ask about wigs, colors, or styles..."
            aria-label="Type your wig question"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isTyping}
            className="bg-[#D4AF37] hover:bg-[#c59e2f] text-white p-2 rounded-full disabled:opacity-50 transition-all"
            aria-label="Send message"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-xs text-center text-gray-400 mt-2">
          Our virtual stylist is here to help with all your wig questions!
        </p>
      </div>
    </div>
  );
};

export default ChatWidget;
