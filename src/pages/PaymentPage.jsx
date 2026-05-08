import { useState } from "react";

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
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
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

      // FIX 1: load() must be dynamically imported — was missing entirely before
      const { load } = await import("@cashfreepayments/cashfree-js");

      // FIX 2: cashfreeMode comes from server — never hardcode or use a default
      const cashfree = await load({ mode: data.cashfreeMode });
      sessionStorage.setItem("dp_plan", "general"); // tells PaymentStatus to show neutral UI
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
    `w-full px-4 py-3 rounded-xl border bg-white text-sm outline-none transition-all duration-200 ${errors[field]
      ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
      : "border-slate-200 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
    }`;

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{
        background: "linear-gradient(135deg, #EFF6FF 0%, #F8FAFC 50%, #EFF6FF 100%)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');
        .wave-bg {
          background: radial-gradient(circle at 20% 80%, rgba(37,99,235,0.07) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(37,99,235,0.05) 0%, transparent 50%);
        }
        input::placeholder { color: #94a3b8; }
        .pay-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(37,99,235,0.35); }
        .pay-btn:active { transform: translateY(0); }
        .pay-btn { transition: all 0.2s ease; }
        .fade-in { animation: fadeIn 0.4s ease forwards; }
        @keyframes fadeIn { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
      `}</style>

      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Panel */}
        <div
          className="wave-bg flex flex-col justify-between p-10 md:w-[45%] relative"
          style={{
            background: "linear-gradient(160deg, #1E3A8A 0%, #1D4ED8 60%, #2563EB 100%)",
            minHeight: "480px",
          }}
        >
          <div className="absolute top-[-60px] right-[-60px] w-48 h-48 rounded-full opacity-10" style={{ background: "white" }} />
          <div className="absolute bottom-[-40px] left-[-40px] w-36 h-36 rounded-full opacity-10" style={{ background: "white" }} />

          <div className="relative z-10">
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-lg" style={{ background: "rgba(255,255,255,0.2)" }}>
                  D
                </div>
                <span className="text-white font-bold text-xl" style={{ letterSpacing: "0.02em" }}>
                  Domestic<span className="font-light">Pro</span>
                </span>
              </div>
            </div>

            <h1 className="text-white text-3xl font-bold leading-tight mb-4">
              Secure payments for{" "}
              <span style={{ color: "#93C5FD" }}>reliable services</span>
            </h1>

            <p className="text-blue-200 text-sm leading-relaxed mb-8">
              Pay securely through our trusted gateway. Once payment is complete,
              our team will begin processing your request immediately. You'll
              receive a confirmation on your email.
            </p>

            {[
              { icon: "🔒", text: "256-bit SSL Encryption" },
              { icon: "⚡", text: "Instant payment confirmation" },
              { icon: "🧾", text: "GST invoice on request" },
            ].map((f) => (
              <div key={f.text} className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base" style={{ background: "rgba(255,255,255,0.15)" }}>
                  {f.icon}
                </div>
                <span className="text-blue-100 text-sm">{f.text}</span>
              </div>
            ))}
          </div>

          <div className="relative z-10 mt-8 pt-8 border-t border-blue-700">
            <p className="text-blue-300 text-xs mb-1">Need help?</p>
            <a href="mailto:support@domesticpro.in" className="text-white text-sm hover:text-blue-200 transition-colors block mb-1">
              ✉ support@domesticpro.in
            </a>
            <a href="tel:+918882702020" className="text-white text-sm hover:text-blue-200 transition-colors">
              📞 +91-8882702020
            </a>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 p-8 md:p-10">
          <h2 className="text-slate-800 text-2xl font-bold mb-1">Complete your payment</h2>
          <p className="text-slate-400 text-sm mb-8">All fields are required unless marked optional</p>

          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Full Name</label>
              <input type="text" placeholder="E.g. Rahul Sharma" value={form.fullName} onChange={handleChange("fullName")} className={inputCls("fullName")} />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
            </div>

            {/* Email + Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Email Address</label>
                <input type="email" placeholder="E.g. rahul.sharma@gmail.com" value={form.email} onChange={handleChange("email")} className={inputCls("email")} />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Mobile Number</label>
                <div className="flex">
                  <span className="flex items-center px-3 rounded-l-xl border border-r-0 border-slate-200 bg-slate-50 text-slate-500 text-sm">+91</span>
                  <input
                    type="tel" maxLength={10} placeholder="E.g. 98XXXXXXX8"
                    value={form.mobile} onChange={handleChange("mobile")}
                    className={`${inputCls("mobile")} rounded-l-none`}
                    style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                  />
                </div>
                {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
              </div>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Amount (incl. GST) — ₹</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">₹</span>
                <input
                  type="number" placeholder="0.00" min="1"
                  value={form.amount} onChange={handleChange("amount")}
                  className={`${inputCls("amount")} pl-8`} style={{ paddingLeft: "2rem" }}
                />
              </div>
              {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Payment Description</label>
              <input type="text" placeholder="e.g. Monthly service subscription - May 2026" value={form.description} onChange={handleChange("description")} className={inputCls("description")} />
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
            </div>

            {/* GST Toggle */}
            <div>
              <button type="button" onClick={() => setShowGST((v) => !v)} className="text-[#2563EB] text-sm font-medium hover:underline flex items-center gap-1">
                {showGST ? "▾" : "▸"} Add Invoice / GST Details{" "}
                <span className="text-slate-400 font-normal">(Optional)</span>
              </button>
            </div>

            {showGST && (
              <div className="fade-in space-y-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">GSTIN</label>
                  <input type="text" placeholder="22AAAAA0000A1Z5" maxLength={15} value={form.gstin} onChange={handleChange("gstin")} className={inputCls("gstin")} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Company Name</label>
                  <input type="text" placeholder="Your Company Pvt. Ltd." value={form.companyName} onChange={handleChange("companyName")} className={inputCls("companyName")} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Company Address</label>
                  <input type="text" placeholder="123 Business Park, New Delhi - 110001" value={form.companyAddress} onChange={handleChange("companyAddress")} className={inputCls("companyAddress")} />
                </div>
              </div>
            )}
          </div>

          <button
            type="button" onClick={handleSubmit} disabled={loading}
            className="pay-btn w-full mt-6 py-4 rounded-2xl text-white font-semibold text-base flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            style={{ background: loading ? "#94a3b8" : "linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)" }}
          >
            {loading ? (
              <>
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeDasharray="30 70" />
                </svg>
                Processing…
              </>
            ) : (
              <>
                🔒 Pay Securely
                {form.amount && !isNaN(form.amount) && Number(form.amount) > 0
                  ? ` — ₹${Number(form.amount).toLocaleString("en-IN")}` : ""}
              </>
            )}
          </button>

          <p className="text-center text-slate-400 text-xs mt-4">
            Secured by <span className="font-semibold text-slate-500">Cashfree Payments</span>
            {" · "}PCI DSS Compliant
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;