import { useState, useEffect, useRef } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "https://domesticpro-backend-dev.vercel.app";

const TYPE_STYLES = {
  Client: { pill: "bg-[#FAECE7] text-[#993C1D]", avatar: "bg-[#FAECE7] text-[#D85A30]" },
  Helper: { pill: "bg-blue-50 text-blue-700", avatar: "bg-blue-50 text-blue-700" },
  Agent:  { pill: "bg-amber-50 text-amber-700", avatar: "bg-amber-50 text-amber-700" },
  Unknown:{ pill: "bg-gray-100 text-gray-500", avatar: "bg-gray-100 text-gray-500" },
};

function groupMessagesByDate(messages) {
  const groups = [];
  let currentDate = null;
  for (const msg of messages) {
    const msgDate = new Date(msg.timestamp).toDateString();
    if (msgDate !== currentDate) {
      currentDate = msgDate;
      const d = new Date(msg.timestamp);
      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);
      const label =
        d.toDateString() === today.toDateString() ? "Today" :
        d.toDateString() === yesterday.toDateString() ? "Yesterday" :
        d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
      groups.push({ type: "date-separator", label });
    }
    groups.push({ type: "message", ...msg });
  }
  return groups;
}

function Avatar({ name, type, size = "md" }) {
  const s = TYPE_STYLES[type] || TYPE_STYLES.Unknown;
  const sz = size === "sm" ? "w-9 h-9 text-sm" : "w-10 h-10 text-sm";
  return (
    <div className={`${sz} rounded-full flex items-center justify-center font-semibold flex-shrink-0 ${s.avatar}`}>
      {(name || "?")[0].toUpperCase()}
    </div>
  );
}

export default function WhatsAppInbox() {
  const [conversations, setConversations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const bottomRef = useRef();

  const fetchConversations = async () => {
    try {
      const res = await axios.get(`${API}/api/chats`);
      setConversations(res.data.chats || []);
    } catch (e) { console.error(e); }
  };

  const fetchMessages = async (phone) => {
    try {
      const res = await axios.get(`${API}/api/chats/${phone}`);
      setMessages(res.data.chat?.messages || []);
    } catch (e) { console.error(e); }
  };

  const sendMessage = async () => {
    if (!input.trim() || !selected) return;
    await axios.post(`${API}/api/chats/${selected.phone}/send`, { message: input });
    setInput("");
    fetchMessages(selected.phone);
  };

  // Inbox SSE — real-time conversation list updates
  useEffect(() => {
    fetchConversations();
    const es = new EventSource(`${API}/api/chats/stream`);
    es.onmessage = () => fetchConversations();
    es.onerror = () => console.warn("Inbox SSE error — will auto-reconnect");
    return () => es.close();
  }, []);

  // Conversation SSE — real-time messages for open chat
  useEffect(() => {
    if (!selected) return;
    fetchMessages(selected.phone);

    const es = new EventSource(`${API}/api/chats/${selected.phone}/stream`);
    es.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === "message") {
        setMessages(prev => [...prev, data.message]);
      }
    };
    es.onerror = () => console.warn("Chat SSE error — will auto-reconnect");
    return () => es.close();
  }, [selected]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const FILTERS = ["All", "Clients", "Helpers", "Agents", "Unread"];

  const filtered = conversations.filter(c => {
    const matchType =
      filter === "All" ? true :
      filter === "Unread" ? c.unreadCount > 0 :
      c.senderType === filter.slice(0, -1);
    const matchSearch = search === "" ||
      (c.name || c.phone).toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <div className="flex h-screen bg-white overflow-hidden">

      {/* ── SIDEBAR ── */}
      <div className="w-72 flex flex-col border-r border-gray-100 bg-white">

        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-base font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#FAECE7] flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EC5F36" strokeWidth="2.5">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                </svg>
              </span>
              Inbox
            </h1>
            <span className="text-xs bg-[#EC5F36] text-white px-2 py-0.5 rounded-full font-medium">
              {conversations.filter(c => c.unreadCount > 0).length} new
            </span>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-3 py-2">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              className="bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400 w-full"
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1.5 px-3 py-2.5 border-b border-gray-100 overflow-x-auto scrollbar-hide">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs px-3 py-1 rounded-full font-medium whitespace-nowrap transition-all ${
                filter === f
                  ? "bg-[#EC5F36] text-white"
                  : "bg-gray-100 text-gray-500 hover:bg-orange-50 hover:text-[#EC5F36]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Conversation list */}
        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center h-40 text-gray-400 text-sm gap-2">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
              </svg>
              No conversations
            </div>
          )}
          {filtered.map(c => {
            const s = TYPE_STYLES[c.senderType] || TYPE_STYLES.Unknown;
            return (
              <div
                key={c.phone}
                onClick={() => setSelected(c)}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer border-b border-gray-50 transition-colors ${
                  selected?.phone === c.phone
                    ? "bg-orange-50 border-l-2 border-l-[#EC5F36]"
                    : "hover:bg-gray-50"
                }`}
              >
                <Avatar name={c.name || c.phone} type={c.senderType} />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="text-sm font-medium text-gray-800 truncate">{c.name || c.phone}</span>
                    <span className="text-[10px] text-gray-400 flex-shrink-0 ml-2">
                      {c.lastMessageTime
                        ? new Date(c.lastMessageTime).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
                        : ""}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 truncate flex-1">{c.lastMessage?.slice(0, 35)}...</span>
                    {c.unreadCount > 0 && (
                      <span className="bg-[#EC5F36] text-white text-[10px] rounded-full px-1.5 py-0.5 font-semibold ml-2 flex-shrink-0">
                        {c.unreadCount}
                      </span>
                    )}
                  </div>
                  <span className={`text-[10px] font-medium mt-1 inline-block px-2 py-0.5 rounded-full ${s.pill}`}>
                    {c.senderType}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── CHAT PANE ── */}
      <div className="flex-1 flex flex-col" style={{ background: "#FBF6F3" }}>
        {selected ? (
          <>
            {/* Chat header */}
            <div className="flex items-center gap-3 px-5 py-3 bg-white border-b border-gray-100">
              <Avatar name={selected.name || selected.phone} type={selected.senderType} size="sm" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-800">{selected.name || selected.phone}</span>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${(TYPE_STYLES[selected.senderType] || TYPE_STYLES.Unknown).pill}`}>
                    {selected.senderType}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{selected.phone}</p>
              </div>
              <div className="flex gap-2">
                {[
                  { icon: "M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16", label: "Search" },
                  { icon: "M12 5v.01M12 12v.01M12 19v.01", label: "More options" },
                ].map(({ icon, label }) => (
                  <button key={label} aria-label={label}
                    className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-200 text-gray-400 hover:border-[#EC5F36] hover:text-[#EC5F36] transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d={icon}/>
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-2.5">
              {groupMessagesByDate(messages).map((item, i) =>
                item.type === "date-separator" ? (
                  <div key={`sep-${i}`} className="flex items-center gap-3 my-2">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-[10px] text-gray-400 font-medium px-2">{item.label}</span>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>
                ) : (
                  <div key={i} className={`flex ${item.direction === "outbound" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[65%] px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
                      item.direction === "outbound"
                        ? "bg-[#EC5F36] text-white rounded-2xl rounded-br-sm"
                        : "bg-white text-gray-800 rounded-2xl rounded-bl-sm"
                    }`}>
                      {item.templateName && (
                        <p className={`text-[10px] mb-1 font-medium ${item.direction === "outbound" ? "text-orange-200" : "text-gray-400"}`}>
                          📋 {item.templateName}
                        </p>
                      )}
                      <p>{item.body || "(template message)"}</p>
                      <p className={`text-[10px] mt-1 text-right ${item.direction === "outbound" ? "text-orange-200" : "text-gray-400"}`}>
                        {new Date(item.timestamp).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                        {item.direction === "outbound" && " ✓✓"}
                      </p>
                    </div>
                  </div>
                )
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="flex items-center gap-3 px-4 py-3 bg-white border-t border-gray-100">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2.5 text-sm outline-none focus:border-[#EC5F36] transition-colors"
              />
              <button
                onClick={sendMessage}
                className="w-10 h-10 rounded-full bg-[#EC5F36] hover:bg-[#C94520] flex items-center justify-center transition-colors flex-shrink-0"
                aria-label="Send"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
                </svg>
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 text-gray-400">
            <div className="w-14 h-14 rounded-full bg-[#FAECE7] flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EC5F36" strokeWidth="1.5">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-500">Select a conversation</p>
            <p className="text-xs text-gray-400">Choose from the list to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
}