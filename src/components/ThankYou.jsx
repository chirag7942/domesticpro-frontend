import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const CONFIG = {
  demand: {
    formType: "Demand Request",
    title: "Request submitted successfully.",
    desc: [
      "Your request has been received. We are already finding the best-matched helper profiles for you.",
      "You will receive verified helper profiles directly on your WhatsApp within 10 min — keep an eye on your messages.",
    ]
  },
  supply: {
    formType: "Helper Registration",
    title: "Profile submitted successfully.",
    desc: [
      "The helper profile has been created successfully.",
      "Our coordination team will verify the details and reach out shortly.",
    ],
    primaryLabel: "Add Another Helper",
    primaryPath: "/supply-form",
  },
  agent: {
    formType: "Agent Onboarding",
    title: "Welcome to the Referral Program.",
    desc: [
      "You are now a registered DomesticPro agent. Your unique Agent Code will be shared with you on WhatsApp shortly.",
      "Share candidate details with us by using the button below and we will keep you updated at every stage — from profile to placement. Your referral payout will be transferred automatically once a booking is confirmed.",
    ],
    primaryLabel: "Submit a Helper Profile",
    primaryPath: "/supply-form",
  },
};

// ─── Success SVG — rounded-square checkmark (form-native, no circles) ─────────
const SuccessMark = () => (
  <svg
    width="52" height="52"
    viewBox="0 0 52 52"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect width="52" height="52" rx="12" fill="#EC5F36" />
    <path
      d="M15 26.5L22.5 34L37 19"
      stroke="#ffffff"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ─── Arrow SVG for button ──────────────────────────────────────────────────────
const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.5 7H11.5M11.5 7L7.5 3M11.5 7L7.5 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── Phone SVG ────────────────────────────────────────────────────────────────
const PhoneSVG = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.9 11.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012.81 1h3a2 2 0 012 1.72c.13.96.36 1.9.68 2.81a2 2 0 01-.45 2.11L6.91 8.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45 12.8 12.8 0 002.81.68A2 2 0 0122 16.92z" />
  </svg>
);

// ─── Component ────────────────────────────────────────────────────────────────
export default function ThankYou() {
  const location = useLocation();
  const navigate = useNavigate();
  const formType = location.state?.fromForm;

  useEffect(() => {
    if (!formType || !CONFIG[formType]) {
      navigate("/demand-form", { replace: true });
    }
  }, [formType, navigate]);

  if (!formType || !CONFIG[formType]) return null;

  const cfg = CONFIG[formType];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --brand:      #EC5F36;
          --brand-dark: #C94D27;
          --ink:        #111827;
          --ink-mid:    #374151;
          --ink-light:  #6B7280;
          --ink-muted:  #9CA3AF;
          --rule:       #E5E7EB;
          --surface:    #ffffff;
          --page-bg:    #F3F4F6;
          --tag-bg:     #FEF3EE;
          --tag-border: #FCDCC9;
          --tag-text:   #C24A1E;
          --radius-sm:  4px;
          --radius-md:  8px;
          --radius-lg:  12px;
        }

        body { background: var(--page-bg); }

        /* ── PAGE ── */
        .ty-page {
          min-height: 100vh;
          background: var(--page-bg);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 32px 16px 25px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        /* ── CARD ── */
        .ty-card {
          width: 100%;
          max-width: 492px;
          background: var(--surface);
          border: 1px solid #E5E7EB;
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,.06), 0 8px 24px rgba(0,0,0,.05);
          opacity: 0;
          transform: translateY(10px);
          animation: reveal .38s ease forwards;
        }
        @keyframes reveal {
          to { opacity: 1; transform: translateY(0); }
        }

        /* ── HEADER ── */
        .ty-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 28px;
          border-bottom: 1px solid var(--rule);
          gap: 12px;
        }
        .ty-header-left {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }
        .ty-logo {
          width: 40px;
          height: 40px;
          flex-shrink: 0;
          object-fit: contain;
        }
        .ty-brand {
          font-size: 14px;
          font-weight: 700;
          color: var(--ink);
          letter-spacing: -0.02em;
          line-height: 1.25;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .ty-brand-tagline {
          font-size: 11.5px;
          font-weight: 400;
          color: var(--ink-muted);
          margin-top: 1px;
        }
        .ty-form-tag {
          flex-shrink: 0;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: var(--tag-text);
          background: var(--tag-bg);
          border: 1px solid var(--tag-border);
          border-radius: var(--radius-sm);
          padding: 4px 9px;
          white-space: nowrap;
        }

        /* ── BODY ── */
        .ty-body {
          padding: 36px 28px 32px;
        }

        /* ── SUCCESS MARK + LABEL ROW ── */
        .ty-success-row {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 28px;
        }
        .ty-success-text-group { display: flex; flex-direction: column; gap: 3px; }
        .ty-submitted-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--brand);
        }
        .ty-submitted-time {
          font-size: 12px;
          color: var(--ink-muted);
          font-weight: 400;
        }

        /* ── TITLE ── */
        .ty-title {
          font-size: 22px;
          font-weight: 700;
          color: var(--ink);
          letter-spacing: -0.03em;
          line-height: 1.3;
          margin-bottom: 16px;
        }

        /* ── DESC ── */
        .ty-desc {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 32px;
        }
        .ty-desc p {
          font-size: 14px;
          font-weight: 400;
          line-height: 1.72;
          color: var(--ink-mid);
        }

        /* ── RULE ── */
        .ty-rule {
          height: 1px;
          background: var(--rule);
          margin-bottom: 24px;
        }

        /* ── BUTTONS ── */
        .ty-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .ty-btn-p {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 12px 20px;
          background: var(--brand);
          color: #fff;
          border: none;
          border-radius: var(--radius-md);
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: -0.01em;
          cursor: pointer;
          transition: background .16s ease, box-shadow .16s ease;
          box-shadow: 0 1px 2px rgba(236,95,54,.2);
        }
        .ty-btn-p:hover {
          background: var(--brand-dark);
          box-shadow: 0 3px 10px rgba(236,95,54,.3);
        }
        .ty-btn-p:active { transform: translateY(1px); }

        .ty-btn-s {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 11px 20px;
          background: transparent;
          color: var(--ink-mid);
          border: 1px solid #D1D5DB;
          border-radius: var(--radius-md);
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: -0.01em;
          cursor: pointer;
          transition: border-color .16s, background .16s, color .16s;
        }
        .ty-btn-s:hover {
          border-color: var(--brand);
          color: var(--brand);
          background: var(--tag-bg);
        }

        /* ── FOOTER ── */
        .ty-footer {
          padding: 14px 28px;
          border-top: 1px solid var(--rule);
          background: #FAFAFA;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px;
        }
        .ty-footer-support {
          display: flex;
          align-items: center;
          gap: 7px;
        }
        .ty-footer-support span {
          font-size: 12px;
          color: var(--ink-muted);
        }
        .ty-footer-support a {
          font-size: 12px;
          font-weight: 600;
          color: var(--ink);
          text-decoration: none;
        }
        .ty-footer-support a:hover { color: var(--brand); }
        .ty-footer-brand {
          font-size: 11px;
          color: #D1D5DB;
          font-weight: 500;
          letter-spacing: 0.01em;
        }

        @media (max-width: 480px) {
          .ty-body     { padding: 28px 20px 24px; }
          .ty-header   { padding: 16px 20px; }
          .ty-footer   { padding: 12px 20px; }
          .ty-title    { font-size: 19px; }
          .ty-brand    { font-size: 13px; }
        }
      `}</style>

      <div className="ty-page">
        <div className="ty-card">

          {/* ── Header ── */}
          <div className="ty-header">
            <div className="ty-header-left">
              <img src="./logoOnly.png" alt="DomesticPro" className="ty-logo" />
              <div>
                <div className="ty-brand">DomesticPro</div>
                <div className="ty-brand-tagline">24×7 Live-In Helper Service</div>
              </div>
            </div>
            <span className="ty-form-tag">{cfg.formType}</span>
          </div>

          {/* ── Body ── */}
          <div className="ty-body">

            {/* Success mark + label */}
            <div className="ty-success-row">
              <SuccessMark />
              <div className="ty-success-text-group">
                <span className="ty-submitted-label">Submission confirmed</span>
                <span className="ty-submitted-time">
                  {new Date().toLocaleDateString("en-IN", {
                    day: "numeric", month: "long", year: "numeric",
                  })}
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 className="ty-title">{cfg.title}</h1>

            {/* Description */}
            <div className="ty-desc">
              {cfg.desc.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="ty-rule" />

            {/* Actions */}
            <div className="ty-actions">
              <button className="ty-btn-p" onClick={() => navigate(cfg.primaryPath)}>
                {cfg.primaryLabel} <ArrowRight />
              </button>
            </div>

          </div>

          {/* ── Footer ── */}
          <div className="ty-footer">
            <div className="ty-footer-support">
              <PhoneSVG />
              <span>Need help?&nbsp;</span>
              <a href="tel:+919211298139">+91 92112 98139</a>
            </div>
            <span className="ty-footer-brand">domesticpro.in</span>
          </div>

        </div>
      </div>
    </>
  );
}