import { useState } from "react";
import SEO from "../components/SEO";

const PaymentPage = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    amount: "",
    description: "",
    gstin: "",
    companyName: "",
    companyAddress: "",
  });
  const [showGST, setShowGST] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const API_BASE =
    import.meta.env.VITE_REACT_APP_API ||
    "https://domestic-pro-backend.onrender.com";

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      e.email = "Enter a valid email";
    if (!form.mobile.match(/^[6-9]\d{9}$/))
      e.mobile = "Enter a valid 10-digit mobile number";
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0)
      e.amount = "Enter a valid amount";
    if (!form.description.trim())
      e.description = "Payment description is required";
    return e;
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.fullName.trim(),
          customerEmail: form.email.trim(),
          customerPhone: form.mobile,
          amount: parseFloat(form.amount),
          description: form.description.trim(),
          gstin: form.gstin.trim() || null,
          companyName: form.companyName.trim() || null,
          companyAddress: form.companyAddress.trim() || null,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        alert(data.message || "Failed to initiate payment. Please try again.");
        return;
      }
      const { load } = await import("@cashfreepayments/cashfree-js");
      const cashfree = await load({ mode: data.cashfreeMode });
      sessionStorage.setItem("dp_plan", "general");
      sessionStorage.setItem("dp_order_id", data.order_id);
      await cashfree.checkout({
        paymentSessionId: data.payment_session_id,
        redirectTarget: "_self",
      });
    } catch (err) {
      console.error("[PaymentPage] Error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls = (field) =>
    `w-full px-3.5 py-3 rounded-xl border bg-white text-sm outline-none transition-all duration-200 ${errors[field]
      ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
      : "border-slate-200 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
    }`;

  return (
    <>
      <SEO
        title="Secure Payment | DomesticPro"
        description="Make secure payments to DomesticPro for domestic staffing services. Fast, encrypted, and trusted payments powered by Cashfree."
        canonical="/payment"
        ogImage="https://res.cloudinary.com/dhtzknkdr/image/upload/v1773031913/payment-banner.webp"
        noIndex={true}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');

        * { box-sizing: border-box; }

        .pay-page {
          font-family: 'DM Sans', sans-serif;
          min-height: 100svh;
          background: linear-gradient(135deg, #EFF6FF 0%, #F8FAFC 50%, #EFF6FF 100%);
        }

        input::placeholder { color: #94a3b8; }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; }

        /* Touch-friendly inputs: always at least 48px tall */
        .field-input {
          min-height: 48px;
        }

        .pay-btn { transition: all 0.2s ease; }
        .pay-btn:not(:disabled):hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(37, 99, 235, 0.35);
        }
        .pay-btn:not(:disabled):active { transform: translateY(0); }

        .fade-in { animation: fadeIn 0.25s ease forwards; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Thin scrollbar for the form panel on desktop */
        .form-scroll {
          scrollbar-width: thin;
          scrollbar-color: #e2e8f0 transparent;
        }
        .form-scroll::-webkit-scrollbar { width: 4px; }
        .form-scroll::-webkit-scrollbar-track { background: transparent; }
        .form-scroll::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 99px; }

        /* ── Mobile compact header strip ──────────────────────── */
        .mobile-header {
          background: linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%);
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .mobile-secure-badge {
          display: flex;
          align-items: center;
          gap: 5px;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 20px;
          padding: 4px 10px;
          white-space: nowrap;
          flex-shrink: 0;
        }

        /* ── Desktop layout: side-by-side, viewport-locked ───── */
        @media (min-width: 768px) {
          .pay-page {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
          }

          .pay-card {
            display: flex;
            flex-direction: row;
            width: 100%;
            max-width: 960px;
            /* On md, allow natural height up to viewport */
            height: calc(100vh - 40px);
            max-height: 740px;
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06);
          }

          .left-panel {
            display: flex !important;
          }

          .mobile-header {
            display: none !important;
          }

          .form-scroll {
            flex: 1;
            overflow-y: auto;
          }
        }

        /* ── Mobile: natural scroll, stacked ─────────────────── */
        @media (max-width: 767px) {
          .pay-page {
            display: block;
            padding: 0;
          }

          .pay-card {
            display: flex;
            flex-direction: column;
            width: 100%;
            min-height: 100svh;
            border-radius: 0;
            box-shadow: none;
          }

          .left-panel {
            display: none !important;
          }

          .right-panel {
            flex: 1;
            display: flex;
            flex-direction: column;
          }

          /* Form body scrolls naturally as part of page */
          .form-scroll {
            flex: 1;
          }
        }

        /* ── Tablet tweaks (768px – 1023px) ──────────────────── */
        @media (min-width: 768px) and (max-width: 1023px) {
          .left-panel {
            width: 38% !important;
            padding: 24px !important;
          }

          /* Hide contact section on small tablets to save space */
          .left-contact {
            display: none;
          }

          .left-trust {
            margin-bottom: 0;
          }
        }
      `}</style>

      <div className="pay-page">
        {/* ── Card shell ────────────────────────────────────────────────── */}
        <div className="pay-card bg-white">

          {/* ════════════════════════════════════════════════════
            MOBILE-ONLY: Compact top header strip
          ════════════════════════════════════════════════════ */}
          <div className="mobile-header">
            <img
              src="./updatedLogo.webp"
              alt="Domestic Pro"
              style={{ height: "36px", width: "auto", objectFit: "contain", borderRadius: "6px" }}
            />
            <div className="mobile-secure-badge">
              <span style={{ fontSize: "11px" }}>🔒</span>
              <span style={{ color: "white", fontSize: "11px", fontWeight: 600, letterSpacing: "0.02em" }}>
                Secure Payment
              </span>
            </div>
          </div>

          {/* ════════════════════════════════════════════════════
            LEFT — Branding panel (hidden on mobile)
          ════════════════════════════════════════════════════ */}
          <div
            className="left-panel flex-shrink-0 flex-col justify-between relative overflow-hidden"
            style={{
              width: "42%",
              padding: "32px",
              background: "linear-gradient(160deg, #1E3A8A 0%, #1D4ED8 60%, #2563EB 100%)",
            }}
          >
            {/* Decorative blobs */}
            <div
              className="absolute -top-12 -right-12 w-40 h-40 rounded-full pointer-events-none"
              style={{ background: "rgba(255,255,255,0.06)" }}
            />
            <div
              className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full pointer-events-none"
              style={{ background: "rgba(255,255,255,0.04)" }}
            />

            {/* Top: logo + headline */}
            <div className="relative z-10">
              <div className="mb-7">
                <img
                  src="./updatedLogo.webp"
                  alt="Domestic Pro"
                  style={{ height: "50px", width: "auto", objectFit: "contain", borderRadius: "8px" }}
                />
              </div>

              <h1 className="text-white font-bold leading-snug mb-3" style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}>
                Secure payments for{" "}
                <span style={{ color: "#93C5FD" }}>reliable services</span>
              </h1>

              <p className="text-blue-200 text-sm leading-relaxed">
                Pay securely through our trusted gateway. Once complete, our team
                begins processing your request immediately.
              </p>
            </div>

            {/* Middle: trust badges */}
            <div className="left-trust relative z-10 flex flex-col gap-2.5">
              {[
                { icon: "🔒", text: "256-bit SSL Encryption" },
                { icon: "⚡", text: "Instant payment confirmation" },
                { icon: "🛡️", text: "PCI DSS Compliant" },
              ].map((f) => (
                <div key={f.text} className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-sm"
                    style={{ background: "rgba(255,255,255,0.13)" }}
                  >
                    {f.icon}
                  </div>
                  <span className="text-blue-100 text-sm">{f.text}</span>
                </div>
              ))}
            </div>

            {/* Bottom: contact */}
            <div className="left-contact relative z-10 pt-5 border-t border-blue-700/60">
              <p className="text-blue-300 text-xs mb-1.5">Need help?</p>
              <a
                href="mailto:support@domesticpro.in"
                className="text-white text-sm hover:text-blue-200 transition-colors block mb-1"
              >
                ✉ support@domesticpro.in
              </a>
              <a
                href="tel:+918882702020"
                className="text-white text-sm hover:text-blue-200 transition-colors"
              >
                📞 +91-8882702020
              </a>
            </div>
          </div>

          {/* ════════════════════════════════════════════════════
            RIGHT — Form panel
            Mobile:  natural height, no overflow tricks
            Desktop: fixed height with internal scroll on body
          ════════════════════════════════════════════════════ */}
          <div className="right-panel flex flex-col flex-1 overflow-hidden">

            {/* Header — never scrolls */}
            <div className="flex-shrink-0 px-5 sm:px-8 pt-6 pb-3 border-b border-slate-100">
              <h2 className="text-slate-800 font-bold mb-0.5" style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)" }}>
                Complete your payment
              </h2>
              <p className="text-slate-400 text-xs">All fields are required unless marked optional</p>
            </div>

            {/* ── Form body: scrolls on desktop, natural on mobile ── */}
            <div className="form-scroll px-5 sm:px-8 py-4 sm:py-5">
              <div className="space-y-4">

                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="E.g. Rahul Sharma"
                    value={form.fullName}
                    onChange={handleChange("fullName")}
                    className={`${inputCls("fullName")} field-input`}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                  )}
                </div>

                {/* Email + Mobile — stacked on mobile, side-by-side on sm+ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="rahul@gmail.com"
                      value={form.email}
                      onChange={handleChange("email")}
                      className={`${inputCls("email")} field-input`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                      Mobile Number
                    </label>
                    <div className="flex">
                      <span className="flex items-center px-3 rounded-l-xl border border-r-0 border-slate-200 bg-slate-50 text-slate-500 text-sm flex-shrink-0">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        placeholder="98XXXXXXXX"
                        value={form.mobile}
                        onChange={handleChange("mobile")}
                        className={`${inputCls("mobile")} field-input rounded-l-none flex-1 min-w-0`}
                        style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                      />
                    </div>
                    {errors.mobile && (
                      <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
                    )}
                  </div>
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Amount (incl. GST) — ₹
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-sm select-none pointer-events-none">
                      ₹
                    </span>
                    <input
                      type="number"
                      placeholder="0.00"
                      min="1"
                      value={form.amount}
                      onChange={handleChange("amount")}
                      className={`${inputCls("amount")} field-input`}
                      style={{ paddingLeft: "1.75rem" }}
                    />
                  </div>
                  {errors.amount && (
                    <p className="text-red-500 text-xs mt-1">{errors.amount}</p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Payment Description
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Monthly service subscription - May 2026"
                    value={form.description}
                    onChange={handleChange("description")}
                    className={`${inputCls("description")} field-input`}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-xs mt-1">{errors.description}</p>
                  )}
                </div>

                {/* GST Toggle — kept for when you un-comment it */}
                {/* <div>
                  <button
                    type="button"
                    onClick={() => setShowGST((v) => !v)}
                    className="text-[#2563EB] text-sm font-medium hover:underline flex items-center gap-1"
                  >
                    {showGST ? "▾" : "▸"} Add Invoice / GST Details{" "}
                    <span className="text-slate-400 font-normal">(Optional)</span>
                  </button>
                </div> */}

                {showGST && (
                  <div className="fade-in space-y-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                        GSTIN
                      </label>
                      <input
                        type="text"
                        placeholder="22AAAAA0000A1Z5"
                        maxLength={15}
                        value={form.gstin}
                        onChange={handleChange("gstin")}
                        className={`${inputCls("gstin")} field-input`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                        Company Name
                      </label>
                      <input
                        type="text"
                        placeholder="Your Company Pvt. Ltd."
                        value={form.companyName}
                        onChange={handleChange("companyName")}
                        className={`${inputCls("companyName")} field-input`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                        Company Address
                      </label>
                      <input
                        type="text"
                        placeholder="123 Business Park, New Delhi - 110001"
                        value={form.companyAddress}
                        onChange={handleChange("companyAddress")}
                        className={`${inputCls("companyAddress")} field-input`}
                      />
                    </div>
                  </div>
                )}

                {/* Trust badges — visible on mobile below form, hidden on desktop (left panel has them) */}
                <div className="flex items-center gap-4 pt-1 sm:hidden">
                  {[
                    { icon: "🔒", text: "256-bit SSL" },
                    { icon: "⚡", text: "Instant confirm" },
                  ].map((f) => (
                    <div key={f.text} className="flex items-center gap-1.5">
                      <span className="text-xs">{f.icon}</span>
                      <span className="text-slate-400 text-xs">{f.text}</span>
                    </div>
                  ))}
                </div>

              </div>
            </div>

            {/* Footer — CTA + trust line, always at bottom */}
            <div className="flex-shrink-0 px-5 sm:px-8 pb-6 sm:pb-7 pt-4 mt-auto">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="pay-btn w-full py-3.5 rounded-2xl text-white font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                style={{
                  minHeight: "52px",
                  background: loading
                    ? "#94a3b8"
                    : "linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)",
                }}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle
                        cx="12" cy="12" r="10"
                        stroke="white" strokeWidth="3"
                        strokeDasharray="30 70"
                      />
                    </svg>
                    Processing…
                  </>
                ) : (
                  <>
                    🔒 Pay Securely
                    {form.amount && !isNaN(form.amount) && Number(form.amount) > 0
                      ? ` — ₹${Number(form.amount).toLocaleString("en-IN")}`
                      : ""}
                  </>
                )}
              </button>

              <p className="text-center text-slate-400 text-xs mt-3">
                Secured by{" "}
                <span className="font-semibold text-slate-500">Cashfree Payments</span>
                {" · "}PCI DSS Compliant
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;