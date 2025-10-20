import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle } from 'lucide-react'; // icon
import whatsappIcon from '../../assets/img/whatsapp.png'; 

const ChatBtn = () => {
  const [messages, setMessages] = useState(() => {
    // Load chat history from localStorage on first render
    const saved = localStorage.getItem("chat_history");
    return saved
      ? JSON.parse(saved)
      : [{ sender: "team", text: "Hello! How can we help you?", time: new Date() }];
  });

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const APP_URL = process.env.REACT_APP_URL;

  // Auto-scroll on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Save chat history to localStorage on update
  useEffect(() => {
    localStorage.setItem("chat_history", JSON.stringify(messages));
  }, [messages]);

  // Helper: Format time
  const formatTime = (date) => {
    new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const sendMessage = async () => {
    if (!query.trim()) return;

    // Add user message to chat
    setMessages((prev) => [...prev, { sender: "user", text: query, time: new Date() }]);
    const userMessage = query;
    setQuery("");
    setIsTyping(true);

    try {
      const API_URL = process.env.REACT_APP_API_URL;
      // Call Node.js chat API
      const res = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjM0LCJ1c2VyX3R5cGVfaWQiOjAsInJvbGUiOiJndWVzdCIsImlhdCI6MTc1ODg4NDcwOCwiZXhwIjoxNzY0MDY4NzA4fQ.zWg19kpqcRf0sxKzrioWP_HzogoC5fHQPeGHTE6nZpc"
        },
        body: JSON.stringify({ query: userMessage, source: "Livguard" })
      });

      // 🧩 Step 1: Check if response was ok
      if (!res.ok) {
        console.log(`HTTP error! status: ${res.status}`)
        setMessages((prev) => [
          ...prev,
          {
            sender: "team",
            text: "⚠️ Unable to find any reply",
            time: new Date(),
          },
        ]);
        setIsTyping(false);
      }

      // 🧩 Step 2: Parse the JSON body
      const data = await res.json();
      const reply = data.reply || data.message || "Sorry, I didn’t get that.";
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { sender: "team", text: reply, time: new Date() },
        ]);
        setIsTyping(false);
      }, 800); // slight delay for typing effect
    } catch (error) {
      console.log(`Syntax error! status: ${error}`)
      setMessages((prev) => [
        ...prev,
        {
          sender: "team",
          text: "⚠️ Unable to find any reply",
          time: new Date(),
        },
      ]);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  // ✅ React WhatsApp Button
  const handleWhatsAppClick = () => {
    window.open("https://api.whatsapp.com/send?phone=919716003265", "_blank");
  };

  return (
    <>
      {/* ✅ WhatsApp Floating Button */}
      <button
        onClick={handleWhatsAppClick}
        style={{
          position: "fixed",
          bottom: "74px",
          right: "20px",
          backgroundColor: "#25D366",
          border: "none",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          zIndex: 999,
          cursor: "pointer",
          padding: "10px",
        }}
        aria-label="Chat on WhatsApp"
      >
        <img
          src={whatsappIcon}
          alt="WhatsApp"
          style={{ width: "100%", height: "100%", borderRadius: "50%" }}
        />
      </button>

      {/* Toggle Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#FD7311',
          color: '#fff',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          zIndex: 999,
        }}
        aria-label="Chat"
      >
        <MessageCircle size={24} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            width: '320px',
            height: '400px',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              backgroundColor: '#FD7311',
              color: '#fff',
              padding: '10px',
              fontWeight: 'bold',
            }}
          >
            Chat with us
          </div>
          <div style={{ flex: 1, padding: "10px", overflowY: "auto", fontSize: "14px", backgroundColor: "#fafafa" }}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  textAlign: msg.sender === "user" ? "right" : "left",
                  marginBottom: "8px",
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    backgroundColor: msg.sender === "user" ? "#fd7311" : "#e0e0e0",
                    color: msg.sender === "user" ? "white" : "black",
                    borderRadius: "8px",
                    padding: "6px 10px",
                    maxWidth: "80%",
                    wordWrap: "break-word",
                  }}
                >
                  {msg.text}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#666",
                    marginTop: "2px",
                  }}
                >
                  {formatTime(msg.time)}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div style={{ textAlign: "left", color: "#666", fontSize: "13px" }}>
                <em>Team is replying</em>
                <span className="typing-dots">...</span>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>
          <div style={{ padding: '10px', borderTop: '1px solid #ccc', display: "flex", gap: "5px", backgroundColor: "white" }}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ddd',
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                backgroundColor: "#fd7311",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "8px 12px",
                cursor: "pointer",
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBtn;
