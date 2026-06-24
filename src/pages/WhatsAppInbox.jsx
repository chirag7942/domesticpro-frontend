import { useState, useEffect, useRef, useCallback } from "react";
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

function HighlightText({ text, query }) {
  if (!query || !text) return <span>{text}</span>;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);
  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-yellow-200 text-gray-900 rounded px-0.5">{part}</mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
}

function Avatar({ name, type, size = "md" }) {
  const s = TYPE_STYLES[type] || TYPE_STYLES.Unknown;
  const sz = size === "sm" ? "w-10 h-10 text-base" : "w-11 h-11 text-base";
  return (
    <div className={`${sz} rounded-full flex items-center justify-center font-bold flex-shrink-0 ${s.avatar}`}>
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

  // ── In-chat search state ──
  const [chatSearchOpen, setChatSearchOpen] = useState(false);
  const [chatSearchQuery, setChatSearchQuery] = useState("");
  const [matchIndices, setMatchIndices] = useState([]);
  const [currentMatchIdx, setCurrentMatchIdx] = useState(0);

  const bottomRef = useRef();
  const chatSearchInputRef = useRef();
  const messageRefs = useRef({});

  // ── KEY FIX: stable refs so SSE closures never go stale ──
  // selectedPhoneRef always holds the CURRENT open chat's phone number.
  // The SSE effect depends on this ref instead of the `selected` object,
  // so fetchConversations() updating `conversations` (and causing a re-render)
  // does NOT tear down and recreate the SSE connection.
  const selectedPhoneRef = useRef(null);
  const chatSseRef = useRef(null);      // holds the active chat EventSource
  const inboxSseRef = useRef(null);     // holds the inbox EventSource

  // Keep selectedPhoneRef in sync whenever selected changes
  useEffect(() => {
    selectedPhoneRef.current = selected?.phone ?? null;
  }, [selected]);

  // ── Fetch helpers ──
  const fetchConversations = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/api/chats`);
      setConversations(res.data.chats || []);
    } catch (e) { console.error(e); }
  }, []);

  const fetchMessages = useCallback(async (phone) => {
    try {
      const res = await axios.get(`${API}/api/chats/${phone}`);
      setMessages(res.data.chat?.messages || []);
    } catch (e) { console.error(e); }
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || !selected) return;
    await axios.post(`${API}/api/chats/${selected.phone}/send`, { message: input });
    setInput("");
    // Don't re-fetch — the outbound SSE push from the server will append it
    // But as a fallback for send, just re-fetch once
    fetchMessages(selected.phone);
  };

  // ── In-chat search helpers ──
  const openChatSearch = () => {
    setChatSearchOpen(true);
    setChatSearchQuery("");
    setMatchIndices([]);
    setCurrentMatchIdx(0);
    setTimeout(() => chatSearchInputRef.current?.focus(), 50);
  };

  const closeChatSearch = () => {
    setChatSearchOpen(false);
    setChatSearchQuery("");
    setMatchIndices([]);
    setCurrentMatchIdx(0);
  };

  useEffect(() => {
    if (!chatSearchQuery.trim()) {
      setMatchIndices([]);
      setCurrentMatchIdx(0);
      return;
    }
    const q = chatSearchQuery.toLowerCase();
    const indices = [];
    messages.forEach((m, i) => {
      if (m.body && m.body.toLowerCase().includes(q)) indices.push(i);
    });
    setMatchIndices(indices);
    setCurrentMatchIdx(indices.length > 0 ? 0 : -1);
  }, [chatSearchQuery, messages]);

  useEffect(() => {
    if (matchIndices.length === 0 || currentMatchIdx < 0) return;
    const el = messageRefs.current[matchIndices[currentMatchIdx]];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [currentMatchIdx, matchIndices]);

  const goToPrevMatch = () => {
    if (matchIndices.length === 0) return;
    setCurrentMatchIdx(i => (i - 1 + matchIndices.length) % matchIndices.length);
  };

  const goToNextMatch = () => {
    if (matchIndices.length === 0) return;
    setCurrentMatchIdx(i => (i + 1) % matchIndices.length);
  };

  const handleChatSearchKey = (e) => {
    if (e.key === "Escape") closeChatSearch();
    if (e.key === "Enter") e.shiftKey ? goToPrevMatch() : goToNextMatch();
  };

  useEffect(() => { closeChatSearch(); }, [selected]);

  // ── INBOX SSE — mounted once, never torn down ──
  // Listens for any new message across ALL conversations.
  // When a message arrives for the currently open chat, appends it directly
  // to state. Otherwise just refreshes the conversation list (sidebar badge).
  useEffect(() => {
    fetchConversations();

    const es = new EventSource(`${API}/api/chats/stream`);
    inboxSseRef.current = es;

    es.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);

        // Always refresh sidebar so unread counts / lastMessage stay current
        fetchConversations();

        // If the message belongs to the currently open chat → append instantly
        if (
          data.type === "message" &&
          data.phone &&
          data.phone === selectedPhoneRef.current
        ) {
          setMessages(prev => {
            // Deduplicate: don't append if we already have this timestamp+body
            const last = prev[prev.length - 1];
            if (
              last &&
              last.body === data.message.body &&
              last.direction === data.message.direction &&
              Math.abs(new Date(last.timestamp) - new Date(data.message.timestamp)) < 2000
            ) {
              return prev; // duplicate — skip
            }
            return [...prev, data.message];
          });
        }
      } catch (err) {
        console.warn("Inbox SSE parse error:", err);
      }
    };

    es.onerror = () => console.warn("Inbox SSE error — will auto-reconnect");

    return () => {
      es.close();
      inboxSseRef.current = null;
    };
  }, []); // ← empty deps: mounts ONCE, never recreated

  // ── CHAT SSE — one per open conversation ──
  // Only handles messages for the specific open conversation.
  // This is a belt-and-suspenders backup to the inbox SSE above.
  // It uses selected.phone as dep so it reconnects when you switch chats.
  useEffect(() => {
    if (!selected) return;

    // Initial full load of messages
    fetchMessages(selected.phone);

    // Open conversation-level SSE
    const es = new EventSource(`${API}/api/chats/${selected.phone}/stream`);
    chatSseRef.current = es;

    es.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        if (data.type === "message") {
          setMessages(prev => {
            // Deduplicate against what the inbox SSE may have already appended
            const last = prev[prev.length - 1];
            if (
              last &&
              last.body === data.message.body &&
              last.direction === data.message.direction &&
              Math.abs(new Date(last.timestamp) - new Date(data.message.timestamp)) < 2000
            ) {
              return prev;
            }
            return [...prev, data.message];
          });
        }
      } catch (err) {
        console.warn("Chat SSE parse error:", err);
      }
    };

    es.onerror = () => console.warn("Chat SSE error — will auto-reconnect");

    return () => {
      es.close();
      chatSseRef.current = null;
    };
  }, [selected?.phone]); // ← only phone, not full object — avoids stale re-runs

  // Auto-scroll to bottom only when not in search mode
  useEffect(() => {
    if (!chatSearchOpen) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, chatSearchOpen]);

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

  const groupedItems = groupMessagesByDate(messages);
  let msgIndexCounter = -1;

  return (
    <div className="flex h-screen bg-white overflow-hidden">

      {/* ── SIDEBAR — 30% ── */}
      <div className="w-[30%] flex flex-col border-r border-gray-200 bg-white">

        <div className="px-5 py-4 border-b border-gray-100 bg-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-xl bg-[#EC5F36] flex items-center justify-center flex-shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                </svg>
              </span>
              <div>
                <h1 className="text-base font-bold text-gray-900 leading-tight">Domestic Pro</h1>
                <p className="text-xs text-gray-400 leading-tight">Chatbox</p>
              </div>
            </div>
            <span className="text-sm bg-[#EC5F36] text-white px-2.5 py-1 rounded-full font-semibold">
              {conversations.filter(c => c.unreadCount > 0).length} new
            </span>
          </div>

          <div className="flex items-center gap-2.5 bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              className="bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400 w-full"
              placeholder="Search by name or number..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button onClick={() => setSearch("")} className="text-gray-400 hover:text-gray-600 flex-shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="px-4 py-3 border-b border-gray-100 bg-white">
          <div className="grid grid-cols-5 gap-1.5">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-xs py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all text-center ${
                  filter === f
                    ? "bg-[#EC5F36] text-white shadow-sm"
                    : "bg-gray-100 text-gray-500 hover:bg-orange-50 hover:text-[#EC5F36]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="px-5 py-2 bg-gray-50 border-b border-gray-100">
          <span className="text-xs text-gray-400 font-medium">{filtered.length} conversation{filtered.length !== 1 ? "s" : ""}</span>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center h-48 text-gray-400 gap-3">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-500">No conversations</p>
            </div>
          )}
          {filtered.map(c => {
            const s = TYPE_STYLES[c.senderType] || TYPE_STYLES.Unknown;
            const isSelected = selected?.phone === c.phone;
            return (
              <div
                key={c.phone}
                onClick={() => setSelected(c)}
                className={`flex items-center gap-3 px-4 py-3.5 cursor-pointer border-b border-gray-50 transition-all ${
                  isSelected
                    ? "bg-orange-50 border-l-4 border-l-[#EC5F36]"
                    : "hover:bg-gray-50 border-l-4 border-l-transparent"
                }`}
              >
                <Avatar name={c.name || c.phone} type={c.senderType} />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <span className={`text-sm font-semibold truncate ${isSelected ? "text-[#EC5F36]" : "text-gray-800"}`}>
                      {c.name || c.phone}
                    </span>
                    <span className="text-xs text-gray-400 flex-shrink-0 ml-2">
                      {c.lastMessageTime
                        ? new Date(c.lastMessageTime).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
                        : ""}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-500 truncate flex-1 leading-relaxed">
                      {c.lastMessage?.slice(0, 40)}{c.lastMessage?.length > 40 ? "..." : ""}
                    </span>
                    {c.unreadCount > 0 && (
                      <span className="bg-[#EC5F36] text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center px-1.5 font-bold ml-2 flex-shrink-0">
                        {c.unreadCount}
                      </span>
                    )}
                  </div>
                  <span className={`text-xs font-semibold inline-block px-2 py-0.5 rounded-full ${s.pill}`}>
                    {c.senderType}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── CHAT PANE — 70% ── */}
      <div className="flex-1 flex flex-col" style={{ background: "#F7F3F0" }}>
        {selected ? (
          <>
            {/* Chat header */}
            <div className="flex items-center gap-4 px-6 py-4 bg-white border-b border-gray-100 shadow-sm">
              <Avatar name={selected.name || selected.phone} type={selected.senderType} size="sm" />
              <div className="flex-1">
                <div className="flex items-center gap-2.5">
                  <span className="text-base font-bold text-gray-900">{selected.name || selected.phone}</span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${(TYPE_STYLES[selected.senderType] || TYPE_STYLES.Unknown).pill}`}>
                    {selected.senderType}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mt-0.5">{selected.phone}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={chatSearchOpen ? closeChatSearch : openChatSearch}
                  aria-label="Search in chat"
                  className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
                    chatSearchOpen
                      ? "bg-[#EC5F36] border-[#EC5F36] text-white"
                      : "border-gray-200 text-gray-400 hover:border-[#EC5F36] hover:text-[#EC5F36] hover:bg-orange-50"
                  }`}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                  </svg>
                </button>
                <button aria-label="More options"
                  className="w-9 h-9 rounded-full flex items-center justify-center border border-gray-200 text-gray-400 hover:border-[#EC5F36] hover:text-[#EC5F36] hover:bg-orange-50 transition-all">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v.01M12 12v.01M12 19v.01"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* In-chat search bar */}
            {chatSearchOpen && (
              <div className="flex items-center gap-3 px-5 py-3 bg-white border-b border-orange-100 shadow-sm">
                <div className="flex-1 flex items-center gap-2.5 bg-orange-50 border border-orange-200 rounded-xl px-3.5 py-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EC5F36" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                  </svg>
                  <input
                    ref={chatSearchInputRef}
                    className="bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400 w-full"
                    placeholder="Search in this conversation..."
                    value={chatSearchQuery}
                    onChange={e => setChatSearchQuery(e.target.value)}
                    onKeyDown={handleChatSearchKey}
                  />
                  {chatSearchQuery && (
                    <button onClick={() => setChatSearchQuery("")} className="text-gray-400 hover:text-gray-600 flex-shrink-0">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M18 6L6 18M6 6l12 12"/>
                      </svg>
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span className="text-xs text-gray-500 font-medium min-w-[60px] text-center">
                    {chatSearchQuery
                      ? matchIndices.length === 0 ? "No results" : `${currentMatchIdx + 1} / ${matchIndices.length}`
                      : ""}
                  </span>
                  <button onClick={goToPrevMatch} disabled={matchIndices.length === 0}
                    className="w-7 h-7 rounded-lg flex items-center justify-center border border-gray-200 text-gray-400 hover:border-[#EC5F36] hover:text-[#EC5F36] disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 15l-6-6-6 6"/></svg>
                  </button>
                  <button onClick={goToNextMatch} disabled={matchIndices.length === 0}
                    className="w-7 h-7 rounded-lg flex items-center justify-center border border-gray-200 text-gray-400 hover:border-[#EC5F36] hover:text-[#EC5F36] disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
                  </button>
                </div>
                <button onClick={closeChatSearch}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-[#EC5F36] hover:bg-orange-50 transition-all flex-shrink-0">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-3">
              {groupedItems.map((item, i) => {
                if (item.type === "date-separator") {
                  return (
                    <div key={`sep-${i}`} className="flex items-center gap-3 my-3">
                      <div className="flex-1 h-px bg-gray-300" />
                      <span className="text-xs text-gray-400 font-semibold px-3 py-1 bg-white rounded-full shadow-sm border border-gray-100">
                        {item.label}
                      </span>
                      <div className="flex-1 h-px bg-gray-300" />
                    </div>
                  );
                }

                msgIndexCounter += 1;
                const msgIdx = msgIndexCounter;
                const isCurrentMatch = chatSearchOpen && matchIndices[currentMatchIdx] === msgIdx;
                const isAnyMatch = chatSearchOpen && chatSearchQuery && matchIndices.includes(msgIdx);

                return (
                  <div
                    key={i}
                    ref={el => { messageRefs.current[msgIdx] = el; }}
                    className={`flex ${item.direction === "outbound" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[60%] px-4 py-3 text-sm leading-relaxed shadow-sm transition-all ${
                      isCurrentMatch ? "ring-2 ring-[#EC5F36] ring-offset-1" :
                      isAnyMatch ? "ring-1 ring-yellow-400 ring-offset-1" : ""
                    } ${
                      item.direction === "outbound"
                        ? "bg-[#EC5F36] text-white rounded-2xl rounded-br-sm"
                        : "bg-white text-gray-800 rounded-2xl rounded-bl-sm border border-gray-100"
                    }`}>
                      {item.templateName && (
                        <p className={`text-xs mb-1.5 font-semibold ${item.direction === "outbound" ? "text-orange-200" : "text-gray-400"}`}>
                          📋 {item.templateName}
                        </p>
                      )}
                      <p className="text-sm leading-relaxed">
                        {chatSearchOpen && chatSearchQuery
                          ? <HighlightText text={item.body || "(template message)"} query={chatSearchQuery} />
                          : (item.body || "(template message)")
                        }
                      </p>
                      <p className={`text-xs mt-1.5 text-right ${item.direction === "outbound" ? "text-orange-200" : "text-gray-400"}`}>
                        {new Date(item.timestamp).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                        {item.direction === "outbound" && " ✓✓"}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="flex items-center gap-3 px-5 py-4 bg-white border-t border-gray-100">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl px-5 py-3 text-sm outline-none focus:border-[#EC5F36] focus:bg-white transition-all"
              />
              <button
                onClick={sendMessage}
                className="w-11 h-11 rounded-full bg-[#EC5F36] hover:bg-[#C94520] flex items-center justify-center transition-colors flex-shrink-0 shadow-md"
                aria-label="Send"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
                </svg>
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-gray-400">
            <div className="w-20 h-20 rounded-full bg-[#FAECE7] flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#EC5F36" strokeWidth="1.5">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
              </svg>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-gray-600">Domestic Pro Chatbox</p>
              <p className="text-sm text-gray-400 mt-1">Select a conversation from the left to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}