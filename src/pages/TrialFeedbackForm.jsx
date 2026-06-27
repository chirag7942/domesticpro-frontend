import { useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_REACT_APP_API || "";

function getParam(key) {
  return new URLSearchParams(window.location.search).get(key) || "";
}

const TASK_OPTIONS = [
  { value: "Yes, all tasks done", label: "Yes, all tasks done" },
  { value: "Mostly done",         label: "Mostly done"         },
  { value: "Not really",          label: "Not really"          },
];

const ATTITUDE_OPTIONS = [
  { value: "Cooperative",    label: "Cooperative"    },
  { value: "Needed pushing", label: "Needed pushing" },
  { value: "Difficult",      label: "Difficult"      },
];

const COMM_OPTIONS = [
  { value: "Good",           label: "Good"           },
  { value: "Can be better",  label: "Can be better"  },
  { value: "Bad",            label: "Bad"             },
];

const FAMILY_OPTIONS = [
  { value: "Very comfortable", label: "Very comfortable" },
  { value: "Getting there",    label: "Getting there"    },
  { value: "Not comfortable",  label: "Not comfortable"  },
];

const HYGIENE_OPTIONS = [
  { value: "No issues",    label: "No issues"    },
  { value: "Minor issues", label: "Minor issues" },
  { value: "Major issues", label: "Major issues" },
];

function RadioGroup({ name, options, selected, onChange }) {
  return (
    <div style={s.radioGroup}>
      {options.map((opt) => (
        <label key={opt.value} style={s.radioLabel}>
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={selected === opt.value}
            onChange={() => onChange(opt.value)}
            style={s.radioInput}
          />
          {opt.label}
        </label>
      ))}
    </div>
  );
}

function StarRating({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  const labels = ["", "Poor", "Below average", "Average", "Good", "Excellent"];
  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginLeft: 34 }}>
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            onClick={() => onChange(n)}
            onMouseEnter={() => setHovered(n)}
            onMouseLeave={() => setHovered(0)}
            style={{
              fontSize: 36,
              cursor: "pointer",
              color: n <= (hovered || value) ? "#EC5F36" : "#d1cfc9",
              lineHeight: 1,
              userSelect: "none",
            }}
          >
            ★
          </span>
        ))}
      </div>
      <div style={{ fontSize: 13, color: "#888", marginLeft: 34, marginTop: 5 }}>
        {value ? labels[value] : "Tap a star to rate"}
      </div>
    </div>
  );
}

function Question({ number, label, children }) {
  return (
    <div style={s.questionBlock}>
      <div style={s.questionHeader}>
        <span style={s.qNum}>{number}</span>
        <span style={s.qLabel}>{label}</span>
      </div>
      {children}
    </div>
  );
}

export default function TrialFeedbackForm() {
  const helperId   = getParam("helper_id");
  const helperName = getParam("hname") || "your helper";
  const clientName = getParam("cname") || "";
  const status     = getParam("status");

  const [rating,     setRating]     = useState(0);
  const [tasks,      setTasks]      = useState("");
  const [attitude,   setAttitude]   = useState("");
  const [comm,       setComm]       = useState("");
  const [family,     setFamily]     = useState("");
  const [hygiene,    setHygiene]    = useState("");
  const [confirm,    setConfirm]    = useState("");
  const [yesNote,    setYesNote]    = useState("");
  const [noReason,   setNoReason]   = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted,  setSubmitted]  = useState(false);
  const [error,      setError]      = useState("");

  const allAnswered =
    rating && tasks && attitude && comm && family && hygiene && confirm;

  const handleConfirm = (val) => {
    setConfirm(val);
    if (val === "Yes") setNoReason("");
    if (val === "No")  setYesNote("");
  };

  const handleSubmit = async () => {
    if (!allAnswered) {
      setError("Please answer all questions before submitting.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      await axios.post(`${API_BASE}/submit-trial-feedback`, {
        helper_id:     helperId,
        helper_name:   helperName,
        client_name:   clientName,
        status,
        rating,
        tasks,
        attitude,
        communication: comm,
        with_family:   family,
        hygiene,
        confirmed:     confirm,
        yes_note:      yesNote,
        no_reason:     noReason,
      });
      setSubmitted(true);
    } catch (err) {
      setError(
        err?.response?.data?.error || "Something went wrong. Please try again."
      );
    }
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div style={s.page}>
        <div style={s.card}>
          <div style={s.cardHeader}>
            <HeaderInner helperName={helperName} status={status} />
          </div>
          <div style={{ padding: "64px 40px", textAlign: "center" }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>🙏</div>
            <h2 style={{ fontSize: 24, fontWeight: 600, color: "#111", margin: "0 0 12px" }}>
              Thank you{clientName ? `, ${clientName}` : ""}!
            </h2>
            <p style={{ fontSize: 16, color: "#555", lineHeight: 1.7, margin: "0 0 28px" }}>
              Your feedback has been recorded. It helps us serve you better
              and helps {helperName} improve.
            </p>
            <span style={s.successBadge}>Domestic Pro</span>
          </div>
          <CardFooter />
        </div>
      </div>
    );
  }

  return (
    <div style={s.page}>
      <div style={s.card}>

        <div style={s.cardHeader}>
          <HeaderInner helperName={helperName} status={status} />
        </div>

        <div style={s.body}>

          <Question number="1" label="Overall rating">
            <StarRating value={rating} onChange={setRating} />
          </Question>

          <Question number="2" label="Tasks done correctly?">
            <RadioGroup
              name="tasks"
              options={TASK_OPTIONS}
              selected={tasks}
              onChange={setTasks}
            />
          </Question>

          <Question number="3" label="Attitude">
            <RadioGroup
              name="attitude"
              options={ATTITUDE_OPTIONS}
              selected={attitude}
              onChange={setAttitude}
            />
          </Question>

          <Question number="4" label="Communication">
            <RadioGroup
              name="comm"
              options={COMM_OPTIONS}
              selected={comm}
              onChange={setComm}
            />
          </Question>

          <Question number="5" label="Comfortable with family?">
            <RadioGroup
              name="family"
              options={FAMILY_OPTIONS}
              selected={family}
              onChange={setFamily}
            />
          </Question>

          <Question number="6" label="Hygiene and habits — any issues?">
            <RadioGroup
              name="hygiene"
              options={HYGIENE_OPTIONS}
              selected={hygiene}
              onChange={setHygiene}
            />
          </Question>

          <Question number="7" label="Confirming the helper?">
            <div style={{ display: "flex", gap: 12, marginLeft: 34 }}>
              {["Yes", "No"].map((val) => (
                <label
                  key={val}
                  style={{
                    ...s.confirmBtn,
                    ...(confirm === val ? s.confirmBtnActive : {}),
                  }}
                >
                  <input
                    type="radio"
                    name="confirm"
                    value={val}
                    checked={confirm === val}
                    onChange={() => handleConfirm(val)}
                    style={{ display: "none" }}
                  />
                  {val}
                </label>
              ))}
            </div>

            {confirm === "Yes" && (
              <div style={s.followup}>
                <div style={s.followupLabel}>
                  What 2 things should she keep in mind?
                </div>
                <textarea
                  rows={2}
                  value={yesNote}
                  onChange={(e) => setYesNote(e.target.value)}
                  placeholder="e.g. Be on time, keep kitchen clean..."
                  style={s.textarea}
                />
              </div>
            )}

            {confirm === "No" && (
              <div style={s.followup}>
                <div style={s.followupLabel}>Main reason for not confirming?</div>
                <textarea
                  rows={2}
                  value={noReason}
                  onChange={(e) => setNoReason(e.target.value)}
                  placeholder="e.g. Did not follow instructions..."
                  style={s.textarea}
                />
              </div>
            )}
          </Question>

          {error && <div style={s.errorBanner}>{error}</div>}

          <button
            onClick={handleSubmit}
            disabled={submitting || !allAnswered}
            style={submitting || !allAnswered ? s.btnDisabled : s.btn}
          >
            {submitting ? "Submitting…" : "Submit feedback →"}
          </button>

        </div>

        <CardFooter />
      </div>
    </div>
  );
}

function HeaderInner({ helperName, status }) {
  const isFailedTrial = status === "trial_failed";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <div style={s.logoBox}>
        <img
          src="/logoOnly.webp"
          alt="Domestic Pro"
          style={{ width: 40, height: 40, objectFit: "contain" }}
          onError={(e) => (e.target.style.display = "none")}
        />
      </div>
      <div style={{ flex: 1 }}>
        <div style={s.brand}>Domestic Pro</div>
        <div style={s.headerTitle}>Trial feedback</div>
        <div style={s.headerSub}>
          Helper: <strong style={{ color: "#fff" }}>{helperName}</strong>
        </div>
      </div>
      <span style={s.headerBadge}>
        {isFailedTrial ? "Trial ended early" : "5-day trial"}
      </span>
    </div>
  );
}

function CardFooter() {
  return (
    <div style={s.footer}>
      <span style={s.footerText}>Domestic Pro — 24×7 helper support</span>
      <a href="tel:+919211298139" style={s.footerLink}>
        +91 92112 98139
      </a>
    </div>
  );
}

const s = {
  page: {
    minHeight: "100vh",
    background: "#F5F4F0",
    padding: "24px 20px 48px",
    fontFamily: "'Segoe UI', Arial, sans-serif",
    display: "flex",
    justifyContent: "center",
  },
  card: {
    width: "100%",
    maxWidth: 780,
    background: "#fff",
    borderRadius: 14,
    border: "1px solid #e8e6e1",
    overflow: "hidden",
    alignSelf: "flex-start",
  },
  cardHeader: {
    background: "#1c2644",
    padding: "22px 32px",
  },
  logoBox: {
    width: 52,
    height: 52,
    background: "#EC5F36",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  brand: {
    fontSize: 11,
    fontWeight: 600,
    color: "#EC5F36",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginBottom: 3,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 600,
    color: "#fff",
  },
  headerSub: {
    fontSize: 14,
    color: "#aab4cc",
    marginTop: 2,
  },
  headerBadge: {
    background: "rgba(236,95,54,0.15)",
    border: "0.5px solid #EC5F36",
    borderRadius: 20,
    padding: "5px 16px",
    fontSize: 12,
    fontWeight: 500,
    color: "#EC5F36",
    whiteSpace: "nowrap",
    flexShrink: 0,
  },
  body: {
    padding: "28px 32px 20px",
    display: "flex",
    flexDirection: "column",
    gap: 0,
  },
  questionBlock: {
    paddingBottom: 20,
    marginBottom: 20,
    borderBottom: "1px solid #f0eeea",
  },
  questionHeader: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },
  qNum: {
    width: 26,
    height: 26,
    borderRadius: "50%",
    background: "#EC5F36",
    color: "#fff",
    fontSize: 13,
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  qLabel: {
    fontSize: 16,
    fontWeight: 600,
    color: "#222",
  },
  radioGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginLeft: 34,
  },
  radioLabel: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    cursor: "pointer",
    fontSize: 15,
    color: "#333",
  },
  radioInput: {
    accentColor: "#EC5F36",
    width: 18,
    height: 18,
  },
  confirmBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 32px",
    border: "1px solid #e0ddd8",
    borderRadius: 8,
    background: "#fff",
    cursor: "pointer",
    fontSize: 15,
    fontWeight: 500,
    color: "#333",
    minWidth: 90,
  },
  confirmBtnActive: {
    border: "1.5px solid #EC5F36",
    background: "#FEF5F2",
    color: "#EC5F36",
  },
  followup: {
    marginTop: 14,
    marginLeft: 34,
  },
  followupLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 7,
  },
  textarea: {
    width: "100%",
    border: "1px solid #e0ddd8",
    borderRadius: 8,
    padding: "10px 12px",
    fontSize: 15,
    color: "#222",
    resize: "vertical",
    minHeight: 68,
    boxSizing: "border-box",
    fontFamily: "inherit",
    outline: "none",
  },
  errorBanner: {
    background: "#fff5f5",
    border: "1px solid #fecaca",
    borderRadius: 6,
    padding: "10px 14px",
    fontSize: 14,
    color: "#991b1b",
    marginBottom: 14,
  },
  btn: {
    width: "100%",
    padding: "14px",
    background: "#EC5F36",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
    marginTop: 6,
  },
  btnDisabled: {
    width: "100%",
    padding: "14px",
    background: "#ddd",
    color: "#999",
    border: "none",
    borderRadius: 8,
    fontSize: 16,
    fontWeight: 600,
    cursor: "not-allowed",
    marginTop: 6,
  },
  successBadge: {
    display: "inline-block",
    fontSize: 12,
    fontWeight: 600,
    color: "#EC5F36",
    border: "1.5px solid #EC5F36",
    borderRadius: 20,
    padding: "5px 18px",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  },
  footer: {
    background: "#1c2644",
    padding: "12px 32px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: "#aab4cc",
  },
  footerLink: {
    fontSize: 12,
    color: "#EC5F36",
    textDecoration: "none",
    fontWeight: 500,
  },
};