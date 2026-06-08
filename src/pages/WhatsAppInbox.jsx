import { useState, useEffect, useRef } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "https://domesticpro-backend-dev.vercel.app";

export default function WhatsAppInbox() {
  const [conversations, setConversations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef();

  const fetchConversations = async () => {
    const res = await axios.get(`${API}/api/chats`);
    setConversations(res.data.chats || []);
  };

  const fetchMessages = async (phone) => {
    const res = await axios.get(`${API}/api/chats/${phone}`);
    setMessages(res.data.chat?.messages || []);
  };

  const sendMessage = async () => {
    if (!input.trim() || !selected) return;
    await axios.post(`${API}/api/chats/${selected.phone}/send`, { message: input });
    setInput("");
    fetchMessages(selected.phone);
  };

  useEffect(() => {
    fetchConversations();
    const interval = setInterval(fetchConversations, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selected) fetchMessages(selected.phone);
  }, [selected]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const typeColor = { Client: "#25D366", Helper: "#1a73e8", Agent: "#f59e0b", Unknown: "#9ca3af" };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Arial" }}>

      {/* LEFT — Conversation List */}
      <div style={{ width: 320, borderRight: "1px solid #e5e7eb", overflowY: "auto", background: "#fff" }}>
        <div style={{ padding: "16px", background: "#075E54", color: "white", fontSize: 18, fontWeight: 700 }}>
          💬 WhatsApp Inbox
        </div>
        {conversations.map(c => (
          <div key={c.phone}
            onClick={() => setSelected(c)}
            style={{
              padding: "12px 16px", borderBottom: "1px solid #f0f0f0", cursor: "pointer",
              background: selected?.phone === c.phone ? "#f0f9f0" : "white"
            }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{c.name || c.phone}</div>
              {c.unreadCount > 0 && (
                <span style={{ background: "#25D366", color: "white", borderRadius: 99, padding: "1px 7px", fontSize: 11, fontWeight: 700 }}>
                  {c.unreadCount}
                </span>
              )}
            </div>
            <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>{c.lastMessage?.slice(0, 40)}...</div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
              <span style={{ fontSize: 10, background: typeColor[c.senderType] + "22", color: typeColor[c.senderType], padding: "1px 6px", borderRadius: 99, fontWeight: 600 }}>
                {c.senderType}
              </span>
              <span style={{ fontSize: 10, color: "#999" }}>
                {c.lastMessageTime ? new Date(c.lastMessageTime).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) : ""}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT — Chat Window */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#ECE5DD" }}>
        {selected ? (
          <>
            {/* Header */}
            <div style={{ padding: "12px 16px", background: "#075E54", color: "white", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#128C7E", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
                {(selected.name || selected.phone)[0].toUpperCase()}
              </div>
              <div>
                <div style={{ fontWeight: 700 }}>{selected.name || selected.phone}</div>
                <div style={{ fontSize: 12, opacity: 0.8 }}>{selected.phone} · {selected.senderType}</div>
              </div>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
              {messages.map((m, i) => (
                <div key={i} style={{ display: "flex", justifyContent: m.direction === "outbound" ? "flex-end" : "flex-start" }}>
                  <div style={{
                    maxWidth: "65%", padding: "8px 12px", borderRadius: m.direction === "outbound" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                    background: m.direction === "outbound" ? "#DCF8C6" : "white",
                    boxShadow: "0 1px 2px rgba(0,0,0,.1)", fontSize: 14
                  }}>
                    {m.templateName && <div style={{ fontSize: 11, color: "#666", marginBottom: 4 }}>📋 {m.templateName}</div>}
                    <div>{m.body || "(template message)"}</div>
                    <div style={{ fontSize: 10, color: "#999", textAlign: "right", marginTop: 4 }}>
                      {new Date(m.timestamp).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                      {m.direction === "outbound" && " ✓✓"}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div style={{ padding: "12px 16px", background: "#F0F0F0", display: "flex", gap: 8 }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendMessage()}
                placeholder="Type a message..."
                style={{ flex: 1, padding: "10px 14px", borderRadius: 24, border: "none", outline: "none", fontSize: 14 }}
              />
              <button onClick={sendMessage}
                style={{ background: "#075E54", color: "white", border: "none", borderRadius: "50%", width: 44, height: 44, cursor: "pointer", fontSize: 18 }}>
                ➤
              </button>
            </div>
          </>
        ) : (
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "#666" }}>
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  );
}