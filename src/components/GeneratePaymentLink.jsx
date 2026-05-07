import { useState } from "react";

const API = "https://domestic-pro-backend.onrender.com";

const PLAN_DATA = {
  priority: {
    head: "Priority Pay — ₹3,540 incl. GST",
    blue: false,
    items: [
      "Priority handling — fast-tracked over all other requests",
      "5 verified profiles within 24 hours",
      "Pre-screened & relevant matches",
      "End-to-end coordination (calls, interviews, trial setup)",
      "Profile finalization support",
      "15-day free replacement period",
    ],
  },
  commitment: {
    head: "Commitment Plan — ₹1,770 incl. GST",
    blue: true,
    items: [
      "Commitment fee before profile sharing",
      "Curated profile sharing within 3 working days",
      "Basic screening & matching",
      "End-to-end coordination",
      "Finalization support",
    ],
  },
  connect: {
    head: "Domestic Pro – Connect — ₹12,980 incl. GST",
    blue: false,
    items: [
      "Requirement understanding (role, hours, expectations)",
      "ID & address verification",
      "3-day trial period",
      "5-day free lookup period",
      "Profile finalization assistance (Audio/Video interview)",
      "One-time placement support",
    ],
  },
  care: {
    head: "Domestic Pro – Care — ₹17,700 incl. GST",
    blue: false,
    items: [
      "Includes everything in Connect",
      "10-day trial period",
      "5-day free lookup period",
      "1 Replacement in 11 months",
      "Police verification",
      "Enhanced screening review",
    ],
  },
  complete: {
    head: "Domestic Pro – Complete — ₹23,600 incl. GST",
    blue: false,
    items: [
      "Includes everything in Care",
      "15-day trial period",
      "10-day free lookup period",
      "2 Replacement in 11 months",
      "Priority matching",
      "Detailed background & reference verification",
      "Ongoing support & mediation",
      "Periodic check-ins (30 / 60 days)",
      "Role upgrade support (within plan validity)",
    ],
  },
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .pg-body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: #FFF7F4;
    min-height: 100vh;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 32px 16px;
  }

  .pg-card {
    background: #fff;
    border-radius: 20px;
    border: 1.5px solid #F1E3DE;
    padding: 32px;
    width: 100%;
    max-width: 560px;
    box-shadow: 0 4px 24px rgba(236,95,54,0.08);
  }

  .pg-logo-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 24px;
  }
  .pg-logo-row img { height: 36px; }
  .pg-badge {
    font-size: 10px;
    font-weight: 800;
    color: #EC5F36;
    background: #FFF2EE;
    border: 1.5px solid #F5D8CF;
    border-radius: 20px;
    padding: 3px 10px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .pg-h2 { font-size: 20px; font-weight: 800; color: #1a1a2e; margin-bottom: 4px; }
  .pg-subtitle { font-size: 13px; color: #9ca3af; font-weight: 500; margin-bottom: 24px; }

  .pg-label {
    display: block;
    font-size: 12px;
    font-weight: 700;
    color: #374151;
    margin-bottom: 6px;
    margin-top: 16px;
  }
  .pg-input {
    width: 100%;
    padding: 10px 14px;
    border: 2px solid #E5E2DE;
    border-radius: 10px;
    font-size: 14px;
    color: #1a1a2e;
    font-family: 'Plus Jakarta Sans', sans-serif;
    outline: none;
    transition: border-color .2s;
  }
  .pg-input:focus { border-color: #EC5F36; }

  .pg-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 4px; }
  .pg-grid-2b { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; }
  .pg-full-col { margin-top: 12px; }

  .pg-section-label {
    font-size: 10px;
    font-weight: 800;
    color: #9ca3af;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin: 20px 0 8px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .pg-section-label::after {
    content: "";
    flex: 1;
    height: 1px;
    background: #F0E8E4;
  }

  .pg-plan-grid-2 { display: grid; grid-template-columns: repeat(2,1fr); gap: 10px; }
  .pg-plan-grid-3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; }

  .pg-plan-card {
    border: 2px solid #E5E2DE;
    border-radius: 14px;
    padding: 14px 10px 12px;
    text-align: center;
    cursor: pointer;
    transition: all .2s;
    background: #fff;
    position: relative;
  }
  .pg-plan-card:hover { border-color: #EC5F36; background: #FFF7F4; }
  .pg-plan-card.selected { border-color: #EC5F36; background: #FFF2EE; }

  .pg-plan-card.commitment-card:hover { border-color: #3B82F6; background: #EFF6FF; }
  .pg-plan-card.commitment-card.selected { border-color: #3B82F6; background: #EFF6FF; }
  .pg-plan-card.commitment-card .pg-plan-amount { color: #3B82F6; }
  .pg-plan-card.commitment-card.selected .pg-plan-name { color: #3B82F6; }
  .pg-plan-card.commitment-card.selected .pg-plan-profiles { color: #2563EB; }

  .pg-plan-name {
    font-size: 13px;
    font-weight: 800;
    color: #1a1a2e;
    display: block;
    margin-bottom: 6px;
  }
  .pg-plan-card.selected .pg-plan-name { color: #EC5F36; }
  .pg-plan-card.commitment-card.selected .pg-plan-name { color: #3B82F6; }

  .pg-plan-amount {
    font-size: 18px;
    font-weight: 800;
    color: #EC5F36;
    display: block;
    margin-bottom: 2px;
  }
  .pg-plan-gst { font-size: 10px; color: #9ca3af; font-weight: 500; }
  .pg-plan-profiles {
    font-size: 10px;
    font-weight: 700;
    color: #6b7280;
    margin-top: 6px;
    display: block;
  }
  .pg-plan-card.selected .pg-plan-profiles { color: #D84E28; }
  .pg-plan-tag { font-size: 9px; font-weight: 700; color: #9ca3af; margin-top: 4px; display: block; }

  .pg-recommended-badge {
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg,#EC5F36,#D84E28);
    color: #fff;
    font-size: 9px;
    font-weight: 800;
    padding: 2px 8px;
    border-radius: 20px;
    white-space: nowrap;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .pg-plan-features {
    margin-top: 12px;
    background: #FFF8F5;
    border: 1.5px solid #F0E8E4;
    border-radius: 12px;
    padding: 12px 14px;
  }
  .pg-plan-features.blue { background: #EFF6FF; border-color: #BFDBFE; }

  .pg-feat-head {
    font-size: 10px;
    font-weight: 800;
    color: #9ca3af;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 8px;
  }
  .pg-feat-list { list-style: none; display: flex; flex-direction: column; gap: 5px; }
  .pg-feat-item {
    font-size: 11.5px;
    color: #374151;
    font-weight: 500;
    display: flex;
    align-items: flex-start;
    gap: 7px;
    line-height: 1.45;
  }
  .pg-feat-check { color: #EC5F36; font-weight: 900; flex-shrink: 0; font-size: 11px; }
  .pg-plan-features.blue .pg-feat-check { color: #3B82F6; }

  .pg-btn {
    width: 100%;
    margin-top: 20px;
    padding: 14px;
    background: linear-gradient(135deg,#EC5F36,#D84E28);
    color: #fff;
    border: none;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 800;
    cursor: pointer;
    font-family: 'Plus Jakarta Sans', sans-serif;
    transition: all .2s;
    box-shadow: 0 4px 16px rgba(236,95,54,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  .pg-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(236,95,54,0.4); }
  .pg-btn:disabled { opacity: 0.45; cursor: not-allowed; }

  .pg-result {
    margin-top: 20px;
    border-radius: 14px;
    padding: 18px;
    border: 1.5px solid #D1FAE5;
    background: #F0FDF4;
  }
  .pg-result-title { font-size: 11px; font-weight: 800; color: #065F46; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 10px; }
  .pg-result-plan { font-size: 15px; font-weight: 800; color: #1a1a2e; margin-bottom: 4px; }
  .pg-result-amount-row { display: flex; gap: 12px; margin-top: 4px; font-size: 12px; color: #6b7280; font-weight: 500; flex-wrap: wrap; }
  .pg-result-amount-row strong { color: #1a1a2e; }

  .pg-link-box {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #fff;
    border: 1.5px solid #D1FAE5;
    border-radius: 10px;
    padding: 10px 12px;
    margin: 12px 0 10px;
  }
  .pg-link-text {
    flex: 1;
    font-size: 11.5px;
    font-weight: 600;
    color: #374151;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .pg-copy-btn {
    background: #EC5F36;
    color: #fff;
    border: none;
    border-radius: 7px;
    padding: 6px 14px;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    font-family: 'Plus Jakarta Sans', sans-serif;
    flex-shrink: 0;
    transition: background .15s;
  }
  .pg-copy-btn:hover { background: #D84E28; }

  .pg-wa-btn {
    width: 100%;
    padding: 12px;
    background: #25D366;
    color: #fff;
    border: none;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    font-family: 'Plus Jakarta Sans', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: background .15s;
  }
  .pg-wa-btn:hover { background: #1ebe5d; }

  .pg-error-msg {
    margin-top: 12px;
    background: #FEF2F2;
    border: 1.5px solid #FECACA;
    border-radius: 10px;
    padding: 10px 14px;
    font-size: 12px;
    color: #DC2626;
    font-weight: 600;
  }

  @keyframes pg-spin { to { transform: rotate(360deg); } }
  .pg-spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255,255,255,0.4);
    border-top-color: #fff;
    border-radius: 50%;
    animation: pg-spin .7s linear infinite;
    display: inline-block;
  }

  .pg-divider { border: none; border-top: 1.5px solid #F0E8E4; margin: 20px 0 4px; }
  .pg-opt-label { font-weight: 400; color: #9ca3af; }
`;

export default function GeneratePaymentLink() {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [zohoOrderId, setZohoOrderId] = useState("");
  const [description, setDescription] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const isValid =
    customerName.trim() && customerPhone.length === 10 && selectedPlan;

  const handlePhoneChange = (e) => {
    setCustomerPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
  };

  async function generate() {
    setError("");
    setResult(null);
    setLoading(true);

    try {
      const response = await fetch(`${API}/generate-payment-link`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: selectedPlan,
          customerName: customerName.trim(),
          customerPhone,
          customerEmail: customerEmail.trim(),
          description: description.trim(),
          zohoOrderId: zohoOrderId.trim(),
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed");
      setResult(data);
    } catch (e) {
      setError("Error: " + e.message);
    }

    setLoading(false);
  }

  function copyLink() {
    if (!result) return;
    navigator.clipboard.writeText(result.link_url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function sendWhatsApp() {
    if (!result) return;
    window.open(result.whatsapp_url, "_blank");
  }

  const pd = selectedPlan ? PLAN_DATA[selectedPlan] : null;

  return (
    <>
      <style>{styles}</style>
      <div className="pg-body">
        <div className="pg-card">
          {/* Logo row */}
          <div className="pg-logo-row">
            <img
              src="https://res.cloudinary.com/dto7bji6b/image/upload/w_56,h_56,c_fill,q_auto,w_100,h_100,c_fill,q_auto,w_100,h_100,c_fill,q_auto,f_auto/v1772259923/payment_screenshots/sgssvrnpvhvzz4yfi18k.webp"
              onError={(e) => (e.target.style.display = "none")}
              alt="Domestic Pro"
            />
            <span className="pg-badge">Internal Tool</span>
          </div>

          <h2 className="pg-h2">Generate Payment Link</h2>
          <p className="pg-subtitle">
            Create and send a payment link to the client via WhatsApp
          </p>

          {/* Client details */}
          <div className="pg-grid-2">
            <div>
              <label className="pg-label">Client Name *</label>
              <input
                className="pg-input"
                type="text"
                placeholder="e.g. Priya Sharma"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
            <div>
              <label className="pg-label">Client Phone *</label>
              <input
                className="pg-input"
                type="tel"
                placeholder="10-digit mobile"
                value={customerPhone}
                onChange={handlePhoneChange}
                maxLength={10}
              />
            </div>
          </div>

          <div className="pg-grid-2b">
            <div>
              <label className="pg-label">
                Client Email <span className="pg-opt-label">(optional)</span>
              </label>
              <input
                className="pg-input"
                type="email"
                placeholder="priya@example.com"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="pg-label">
                Zoho Record ID <span className="pg-opt-label">(optional)</span>
              </label>
              <input
                className="pg-input"
                type="text"
                placeholder="e.g. HM-123-456"
                value={zohoOrderId}
                onChange={(e) => setZohoOrderId(e.target.value)}
              />
            </div>
          </div>

          <div className="pg-full-col">
            <label className="pg-label">
              Description <span className="pg-opt-label">(optional)</span>
            </label>
            <input
              className="pg-input"
              type="text"
              placeholder="e.g. House Help placement — Gurgaon"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <hr className="pg-divider" />

          {/* Lead Plans */}
          <div className="pg-section-label">Lead Plans — Initial Request Fee</div>
          <div className="pg-plan-grid-2">
            <PlanCard
              plan="priority"
              selectedPlan={selectedPlan}
              onSelect={setSelectedPlan}
              badge="⚡ Fast-Track"
              name="Priority Pay"
              amount="₹3,000"
              gst="+ ₹540 GST"
              profiles="₹3,540 total"
              tag="Profiles in 24 hrs"
            />
            <PlanCard
              plan="commitment"
              selectedPlan={selectedPlan}
              onSelect={setSelectedPlan}
              isBlue
              name="Commitment"
              amount="₹1,500"
              gst="+ ₹270 GST"
              profiles="₹1,770 total"
              tag="Profiles in 3 days"
            />
          </div>

          {/* Placement Plans */}
          <div className="pg-section-label" style={{ marginTop: 20 }}>
            Placement Plans — After Helper is Hired
          </div>
          <div className="pg-plan-grid-3">
            <PlanCard
              plan="connect"
              selectedPlan={selectedPlan}
              onSelect={setSelectedPlan}
              name="Connect"
              amount="₹11,000"
              gst="+ ₹1,980 GST"
              profiles="1–2 profiles"
            />
            <PlanCard
              plan="care"
              selectedPlan={selectedPlan}
              onSelect={setSelectedPlan}
              name="Care"
              amount="₹15,000"
              gst="+ ₹2,700 GST"
              profiles="3 profiles"
            />
            <PlanCard
              plan="complete"
              selectedPlan={selectedPlan}
              onSelect={setSelectedPlan}
              badge="⭐ Best"
              name="Complete"
              amount="₹20,000"
              gst="+ ₹3,600 GST"
              profiles="5 profiles"
            />
          </div>

          {/* Feature preview */}
          {pd && (
            <div className={`pg-plan-features${pd.blue ? " blue" : ""}`}>
              <div className="pg-feat-head">{pd.head}</div>
              <ul className="pg-feat-list">
                {pd.items.map((item, i) => (
                  <li key={i} className="pg-feat-item">
                    <span className="pg-feat-check">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Generate button */}
          <button
            className="pg-btn"
            onClick={generate}
            disabled={!isValid || loading}
          >
            {loading ? (
              <>
                <span className="pg-spinner" /> Creating link…
              </>
            ) : (
              "Generate & Send Payment Link"
            )}
          </button>

          {/* Error */}
          {error && <div className="pg-error-msg">{error}</div>}

          {/* Result */}
          {result && (
            <div className="pg-result">
              <div className="pg-result-title">✅ Link Created Successfully</div>
              <div className="pg-result-plan">{result.plan_label}</div>
              <div className="pg-result-amount-row">
                <span>
                  Base: <strong>₹{result.amount.toLocaleString("en-IN")}</strong>
                </span>
                <span>
                  GST: <strong>₹{result.gst.toLocaleString("en-IN")}</strong>
                </span>
                <span>
                  Total:{" "}
                  <strong>₹{result.total.toLocaleString("en-IN")}</strong>
                </span>
              </div>
              <div className="pg-link-box">
                <span className="pg-link-text">{result.link_url}</span>
                <button
                  className="pg-copy-btn"
                  onClick={copyLink}
                  style={copied ? { background: "#16a34a" } : {}}
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <button className="pg-wa-btn" onClick={sendWhatsApp}>
                <WhatsAppIcon />
                Send to Client via WhatsApp
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function PlanCard({
  plan,
  selectedPlan,
  onSelect,
  badge,
  name,
  amount,
  gst,
  profiles,
  tag,
  isBlue,
}) {
  const isSelected = selectedPlan === plan;
  const classes = [
    "pg-plan-card",
    isBlue ? "commitment-card" : "",
    isSelected ? "selected" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} onClick={() => onSelect(plan)}>
      {badge && <div className="pg-recommended-badge">{badge}</div>}
      <span className="pg-plan-name">{name}</span>
      <span className="pg-plan-amount">{amount}</span>
      <span className="pg-plan-gst">{gst}</span>
      <span className="pg-plan-profiles">{profiles}</span>
      {tag && <span className="pg-plan-tag">{tag}</span>}
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.523 5.845L.057 23.617a.75.75 0 00.92.92l5.875-1.453A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  );
}
