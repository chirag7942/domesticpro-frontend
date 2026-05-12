import { useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_REACT_APP_API || "";

const HAPPINESS_OPTIONS = [
  { value: "Very Happy", emoji: "😊", label: "Very Happy" },
  { value: "Satisfied",  emoji: "🙂", label: "Satisfied"  },
  { value: "Unsatisfied",emoji: "😔", label: "Unsatisfied" },
];

const TRI_OPTIONS = [
  { value: "Yes",    emoji: "✅", label: "Yes"    },
  { value: "Partly", emoji: "🔄", label: "Partly" },
  { value: "No",     emoji: "❌", label: "No"     },
];

function getParam(key) {
  return new URLSearchParams(window.location.search).get(key) || "";
}

export default function FeedbackForm() {
  const helperId     = getParam("hid");
  const helperName   = getParam("hname");
  const clientName   = getParam("cname");
  const clientMobile = getParam("cmobile");
  const month        = parseInt(getParam("month")) || 1;

  const [happiness,   setHappiness]   = useState("");
  const [duties,      setDuties]      = useState("");
  const [punctual,    setPunctual]    = useState("");
  const [courteous,   setCourteous]   = useState("");
  const [feedbackTxt, setFeedbackTxt] = useState("");
  const [submitting,  setSubmitting]  = useState(false);
  const [submitted,   setSubmitted]   = useState(false);
  const [error,       setError]       = useState("");

  const allAnswered = happiness && duties && punctual && courteous;

  const handleSubmit = async () => {
    if (!allAnswered) {
      setError("Please answer all 4 questions before submitting.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      await axios.post(`${API_BASE}/submit-feedback`, {
        helper_id:         helperId,
        helper_name:       helperName,
        client_name:       clientName,
        client_mobile:     clientMobile,
        month:             month,
        overall_happiness: happiness,
        duties_done:       duties,
        punctual:          punctual,
        courteous:         courteous,
        feedback_text:     feedbackTxt,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err?.response?.data?.error || "Something went wrong. Please try again.");
    }
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div style={s.page}>
        <div style={s.card}>
          <div style={s.successWrap}>
            <div style={s.successIcon}>🙏</div>
            <h2 style={s.successTitle}>Thank you, {clientName || "valued client"}!</h2>
            <p style={s.successMsg}>
              Your feedback for Month {month} has been recorded.
              It helps us serve you better and motivate {helperName || "your helper"} to keep improving.
            </p>
            <div style={s.successBadge}>Domestic Pro</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={s.page}>
      <div style={s.card}>

        {/* ── Header ── */}
        <div style={s.header}>
          {/* Logo box */}
          <div style={s.logoBox}>
            <img
              src="/logoOnly.webp"
              alt="Domestic Pro"
              style={s.logoImg}
              onError={e => (e.target.style.display = "none")}
            />
          </div>

          {/* Title block */}
          <div style={s.headerText}>
            <div style={s.brand}>Domestic Pro</div>
            <h1 style={s.title}>Monthly Check-In</h1>
            <p style={s.subtitle}>
              Month {month} feedback for{" "}
              <strong style={{ color: "#EC5F36" }}>{helperName || "your helper"}</strong>
              <span style={s.timeBadge}>⏱ 30 seconds</span>
            </p>
          </div>

          {/* Right badge */}
          <div style={s.headerRight}>
            <div style={s.helperBadge}>{clientName || "Client"} Review</div>
          </div>
        </div>

        {/* ── Body: 2-column grid ── */}
        <div style={s.body}>
          <div style={s.grid}>

            {/* Q1 */}
            <Question
              number="1"
              label="Overall, how satisfied are you?"
              options={HAPPINESS_OPTIONS}
              selected={happiness}
              onSelect={setHappiness}
            />

            {/* Q2 */}
            <Question
              number="2"
              label="Is the helper doing all assigned duties?"
              options={TRI_OPTIONS}
              selected={duties}
              onSelect={setDuties}
            />

            {/* Q3 */}
            <Question
              number="3"
              label="Is the helper punctual and disciplined?"
              options={TRI_OPTIONS}
              selected={punctual}
              onSelect={setPunctual}
            />

            {/* Q4 */}
            <Question
              number="4"
              label="Is the helper courteous and friendly?"
              options={TRI_OPTIONS}
              selected={courteous}
              onSelect={setCourteous}
            />

            {/* Q5 — full width textarea */}
            <div style={{ ...s.questionBlock, ...s.colFull }}>
              <div style={s.questionHeader}>
                <span style={s.qNum}>5</span>
                <span style={s.qLabel}>Any feedback? 💬</span>
              </div>
              <p style={s.qHint}>
                Shared with helper — good words motivate, honest words help them improve
              </p>
              <textarea
                rows={2}
                value={feedbackTxt}
                onChange={e => setFeedbackTxt(e.target.value)}
                placeholder="Write anything here…"
                style={s.textarea}
              />
            </div>

            {/* Error */}
            {error && (
              <div style={{ ...s.errorBanner, ...s.colFull }}>{error}</div>
            )}

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={submitting || !allAnswered}
              style={{
                ...(submitting || !allAnswered ? s.btnDisabled : s.btn),
                ...s.colFull,
              }}
            >
              {submitting ? "Submitting…" : "Submit Feedback →"}
            </button>
          </div>
        </div>

        {/* ── Footer ── */}
        <div style={s.footer}>
          <p style={s.footerText}>Domestic Pro — 24×7 Live-In Helper Support</p>
          <p style={s.footerText}>
            Questions? Call us at{" "}
            <a href="tel:+919211298139" style={s.footerLink}>
              +91 92112 98139
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}

function Question({ number, label, options, selected, onSelect }) {
  return (
    <div style={s.questionBlock}>
      <div style={s.questionHeader}>
        <span style={s.qNum}>{number}</span>
        <span style={s.qLabel}>{label}</span>
      </div>
      <div style={s.optionRow}>
        {options.map(opt => (
          <button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            style={selected === opt.value ? s.optionSelected : s.option}
          >
            <span style={s.optEmoji}>{opt.emoji}</span>
            <span style={s.optLabel}>{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

const s = {
  /* ── Page & Card ── */
  page: {
    minHeight: "100vh",
    background: "#F5F4F0",
    padding: "20px 16px 40px",
    fontFamily: "'Segoe UI', Arial, sans-serif",
    display: "flex",
    justifyContent: "center",
  },
  card: {
    width: "100%",
    maxWidth: "860px",           // wider card
    background: "#fff",
    borderRadius: 12,
    border: "1px solid #e8e6e1",
    overflow: "hidden",
    alignSelf: "flex-start",
  },

  /* ── Header ── */
  header: {
    background: "#fff",
    borderBottom: "2px solid #EC5F36",
    padding: "18px 28px 16px",
    display: "flex",
    alignItems: "center",
    gap: 18,
  },
  logoBox: {
    width: 64,
    height: 64,
    background: "#EC5F36",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    overflow: "hidden",
  },
  logoImg: {
    width: 48,
    height: 48,
    objectFit: "contain",
  },
  headerText: {
    flex: 1,
  },
  brand: {
    fontSize: 11,
    fontWeight: 700,
    color: "#EC5F36",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginBottom: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    color: "#111",
    margin: "0 0 3px",
  },
  subtitle: {
    fontSize: 13,
    color: "#555",
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  timeBadge: {
    display: "inline-block",
    fontSize: 11,
    color: "#888",
    background: "#f5f5f5",
    borderRadius: 20,
    padding: "2px 10px",
  },
  headerRight: {
    flexShrink: 0,
  },
  helperBadge: {
    display: "inline-block",
    background: "#FEF5F2",
    border: "1.5px solid #EC5F36",
    borderRadius: 20,
    padding: "5px 16px",
    fontSize: 12,
    fontWeight: 700,
    color: "#EC5F36",
    letterSpacing: "0.03em",
    whiteSpace: "nowrap",
  },

  /* ── Body / Grid ── */
  body: {
    padding: "20px 28px 12px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "0 32px",
  },
  colFull: {
    gridColumn: "1 / -1",
  },

  /* ── Questions ── */
  questionBlock: {
    marginBottom: 18,
    paddingBottom: 18,
    borderBottom: "1px solid #f0eeea",
  },
  questionHeader: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  qNum: {
    width: 22,
    height: 22,
    borderRadius: "50%",
    background: "#EC5F36",
    color: "#fff",
    fontSize: 11,
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  qLabel: {
    fontSize: 13,
    fontWeight: 600,
    color: "#222",
  },
  qHint: {
    fontSize: 11,
    color: "#999",
    margin: "2px 0 8px 30px",
    lineHeight: 1.5,
  },
  optionRow: {
    display: "flex",
    gap: 6,
    marginLeft: 30,
    flexWrap: "wrap",
  },
  option: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 3,
    padding: "8px 12px",
    border: "1.5px solid #e0ddd8",
    borderRadius: 8,
    background: "#fff",
    cursor: "pointer",
    minWidth: 64,
    transition: "all 0.15s",
  },
  optionSelected: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 3,
    padding: "8px 12px",
    border: "1.5px solid #EC5F36",
    borderRadius: 8,
    background: "#FEF5F2",
    cursor: "pointer",
    minWidth: 64,
  },
  optEmoji: {
    fontSize: 18,
  },
  optLabel: {
    fontSize: 10,
    fontWeight: 600,
    color: "#444",
  },

  /* ── Textarea ── */
  textarea: {
    width: "100%",
    border: "1.5px solid #e0ddd8",
    borderRadius: 8,
    padding: "8px 10px",
    fontSize: 13,
    color: "#222",
    resize: "vertical",
    minHeight: 64,
    boxSizing: "border-box",
    fontFamily: "inherit",
    outline: "none",
  },

  /* ── Error ── */
  errorBanner: {
    background: "#fff5f5",
    border: "1px solid #fecaca",
    borderRadius: 6,
    padding: "8px 12px",
    fontSize: 12,
    color: "#991b1b",
    marginBottom: 12,
  },

  /* ── Buttons ── */
  btn: {
    width: "100%",
    padding: "12px",
    background: "#EC5F36",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    marginBottom: 8,
  },
  btnDisabled: {
    width: "100%",
    padding: "12px",
    background: "#ddd",
    color: "#999",
    border: "none",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 700,
    cursor: "not-allowed",
    marginBottom: 8,
  },

  /* ── Footer ── */
  footer: {
    borderTop: "1px solid #f0eeea",
    padding: "12px 28px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerText: {
    fontSize: 11,
    color: "#aaa",
    margin: 0,
  },
  footerLink: {
    color: "#EC5F36",
    textDecoration: "none",
  },

  /* ── Success screen ── */
  successWrap: {
    padding: "56px 32px",
    textAlign: "center",
  },
  successIcon: {
    fontSize: 52,
    marginBottom: 14,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: "#111",
    margin: "0 0 12px",
  },
  successMsg: {
    fontSize: 14,
    color: "#555",
    lineHeight: 1.7,
    margin: "0 0 24px",
  },
  successBadge: {
    display: "inline-block",
    fontSize: 11,
    fontWeight: 700,
    color: "#EC5F36",
    border: "1.5px solid #EC5F36",
    borderRadius: 20,
    padding: "4px 16px",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  },
};