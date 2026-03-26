// PaymentStatus.jsx
// Route: /payment-status
// React Router: <Route path="/payment-status" element={<PaymentStatus />} />

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
  faClock,
  faTriangleExclamation,
  faBolt,
  faArrowLeft,
  faCommentDots,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";

const API_BASE = import.meta.env.VITE_REACT_APP_API;
const MAX_POLLS = 10;

// ── Plan config — drives all content differences ──────────────────────────────
const PLAN_CONFIG = {
  priority: {
    label: "Priority Plan",
    color: "#EC5F36",
    accentBg: "#FFF2EE",
    accentBorder: "#F5D8CF",
    accentText: "#EC5F36",
    successTitle: "Payment Successful! 🚀",
    successSub: "Your Priority request is now active. We're fast-tracking your requirement.",
    steps: [
      { dot: "bg-primary", label: "Our team reviews your requirement immediately" },
      { dot: "bg-primary/60", label: "3 verified profiles shortlisted" },
      { dot: "bg-primary/30", label: "Profiles shared within 24 hours" },
    ],
    badge: <><FontAwesomeIcon icon={faBolt} style={{ marginRight: 5 }} />Priority Plan — Active</>,
  },
  commitment: {
    label: "Commitment Plan",
    color: "#3B82F6",
    accentBg: "#EFF6FF",
    accentBorder: "#BFDBFE",
    accentText: "#3B82F6",
    successTitle: "Payment Confirmed! 🎉",
    successSub: "Your Commitment plan is active. We'll begin shortlisting your profiles.",
    steps: [
      { dot: "bg-blue-500", label: "Our team reviews your requirement" },
      { dot: "bg-blue-400", label: "2 verified profiles shortlisted" },
      { dot: "bg-blue-300", label: "Profiles shared within 2 working days" },
    ],
    badge: <><FontAwesomeIcon icon={faCalendarCheck} style={{ marginRight: 5 }} />Commitment Plan — Active</>,
  },
};

export default function PaymentStatus() {
  const [status, setStatus] = useState("loading");
  const [orderId, setOrderId] = useState("");
  const [pollCount, setPollCount] = useState(0);
  const [plan, setPlan] = useState("priority"); // "priority" | "commitment"

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const oid = params.get("order_id") || sessionStorage.getItem("dp_order_id") || "";
    const savedPlan = sessionStorage.getItem("dp_plan") || "priority";
    setOrderId(oid);
    setPlan(savedPlan);
    if (!oid) { setStatus("error"); return; }
    verify(oid, 0, savedPlan);
  }, []);

  const verify = async (oid, attempt, savedPlan) => {
    try {
      let zohoFields = null;
      try {
        const stored = sessionStorage.getItem("dp_zoho_fields");
        if (stored) zohoFields = JSON.parse(stored);
      } catch (_) { }

      const res = await fetch(`${API_BASE}/payment-verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_id: oid, zohoFields, plan: savedPlan }),
      });
      const data = await res.json();

      if (data.status === "PAID") {
        sessionStorage.removeItem("dp_order_id");
        sessionStorage.removeItem("dp_zoho_fields");
        sessionStorage.removeItem("dp_plan");
        setStatus("paid");
        return;
      }
      if (data.status === "ACTIVE" && attempt < MAX_POLLS) {
        setPollCount(attempt + 1);
        setTimeout(() => verify(oid, attempt + 1, savedPlan), 3000);
        return;
      }
      setStatus(data.status === "ACTIVE" ? "pending" : "failed");
    } catch {
      if (attempt < MAX_POLLS) {
        setTimeout(() => verify(oid, attempt + 1, savedPlan), 3000);
      } else {
        setStatus("error");
      }
    }
  };

  const pc = PLAN_CONFIG[plan] || PLAN_CONFIG.priority;

  const stripColor = {
    loading: plan === "commitment" ? "bg-blue-400" : "bg-primary",
    paid: "bg-green-400",
    failed: "bg-red-400",
    pending: "bg-amber-400",
    error: "bg-gray-300",
  }[status];

  return (
    <div
      className="min-h-screen bg-bgLight flex items-center justify-center p-4"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Background rings */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[480px] h-[480px] rounded-full"
          style={{ background: `${pc.color}0D` }} />
        <div className="absolute -bottom-28 -left-28 w-[360px] h-[360px] rounded-full"
          style={{ background: `${pc.color}08` }} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={status}
          initial={{ opacity: 0, y: 22, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -14, scale: 0.97 }}
          transition={{ duration: 0.26, ease: "easeOut" }}
          className="relative w-full max-w-sm"
        >
          <div className="bg-white rounded-3xl border border-borderLight shadow-sm overflow-hidden">
            <div className={`h-1 w-full ${stripColor}`} />

            <div className="px-7 pt-7 pb-6 flex flex-col items-center text-center gap-5">

              {/* ══════════ LOADING ══════════ */}
              {status === "loading" && (
                <>
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-4 border-borderLight" />
                    <div
                      className="absolute inset-0 rounded-full border-4 border-b-transparent border-l-transparent animate-spin"
                      style={{ borderTopColor: pc.color, borderRightColor: pc.color }}
                    />
                    <div className="absolute inset-3 rounded-full flex items-center justify-center"
                      style={{ background: pc.accentBg }}>
                      <FontAwesomeIcon icon={plan === "commitment" ? faCalendarCheck : faBolt}
                        style={{ fontSize: 14, color: pc.color }} />
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-extrabold tracking-widest uppercase mb-2"
                      style={{ color: pc.color }}>{pc.label}</p>
                    <p className="text-xl font-bold text-textDark mb-1.5" style={{ fontFamily: "'Fraunces', serif" }}>
                      Verifying payment…
                    </p>
                    <p className="text-xs text-textLight font-medium leading-relaxed">
                      Please wait. Do not close or refresh this tab.
                    </p>
                  </div>

                  <div className="flex gap-1.5 items-center">
                    {Array.from({ length: MAX_POLLS }).map((_, i) => (
                      <div key={i} className="h-1.5 rounded-full transition-all duration-500"
                        style={{
                          width: i < pollCount ? 16 : 6,
                          background: i < pollCount ? pc.color : "#F1E3DE",
                        }} />
                    ))}
                  </div>
                  {pollCount > 3 && <p className="text-[11px] text-textLight font-medium">Checking with Cashfree… ({pollCount}/{MAX_POLLS})</p>}
                </>
              )}

              {/* ══════════ PAID ══════════ */}
              {status === "paid" && (
                <>
                  <motion.div
                    initial={{ scale: 0, rotate: -15 }} animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 280, damping: 18 }}
                    className="w-16 h-16 rounded-full flex items-center justify-center ring-8"
                    style={{ background: "#f0fdf4", ringColor: "#bbf7d0" }}
                  >
                    <FontAwesomeIcon icon={faCircleCheck} className="text-green-500" style={{ fontSize: 30 }} />
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                    {/* Plan label pill */}
                    <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold tracking-widest uppercase rounded-full px-3 py-1 mb-3 border"
                      style={{ background: pc.accentBg, borderColor: pc.accentBorder, color: pc.accentText }}>
                      <FontAwesomeIcon icon={plan === "commitment" ? faCalendarCheck : faBolt} style={{ fontSize: 10 }} />
                      {pc.label}
                    </div>
                    <p className="text-xl font-bold text-textDark mb-1" style={{ fontFamily: "'Fraunces', serif" }}>
                      {pc.successTitle}
                    </p>
                    <p className="text-xs text-textLight font-medium leading-relaxed">
                      {pc.successSub}
                    </p>
                  </motion.div>

                  {/* What happens next — plan specific */}
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                    className="w-full rounded-2xl p-4 text-left flex flex-col gap-3 border"
                    style={{ background: pc.accentBg, borderColor: pc.accentBorder }}>
                    <p className="text-[10px] font-extrabold text-textLight tracking-widest uppercase">
                      What happens next
                    </p>
                    {pc.steps.map((item, i) => (
                      <div key={i} className="flex items-center gap-2.5">
                        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${item.dot}`} />
                        <span className="text-xs font-semibold text-textDark">{item.label}</span>
                      </div>
                    ))}
                  </motion.div>

                  {/* Order ID */}
                  {orderId && (
                    <div className="w-full rounded-xl px-4 py-2.5 flex items-center justify-between border"
                      style={{ background: pc.accentBg, borderColor: pc.accentBorder }}>
                      <span className="text-[10px] font-extrabold text-textLight uppercase tracking-wider">Order ID</span>
                      <span className="text-[11px] font-extrabold truncate max-w-[180px]"
                        style={{ color: pc.color }}>{orderId}</span>
                    </div>
                  )}

                  <p className="text-[11px] text-textLight font-medium">
                    You can safely close this tab. We'll call you shortly.
                  </p>
                </>
              )}

              {/* ══════════ FAILED ══════════ */}
              {status === "failed" && (
                <>
                  <motion.div initial={{ scale: 0, rotate: -15 }} animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 280, damping: 18 }}
                    className="w-16 h-16 rounded-full bg-red-50 ring-8 ring-red-100 flex items-center justify-center">
                    <FontAwesomeIcon icon={faCircleXmark} className="text-red-400" style={{ fontSize: 30 }} />
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                    <p className="text-xl font-bold text-textDark mb-1" style={{ fontFamily: "'Fraunces', serif" }}>Payment Failed</p>
                    <p className="text-xs text-textLight font-medium leading-relaxed">
                      No amount was deducted. Please try again.
                    </p>
                  </motion.div>
                  <div className="w-full flex flex-col gap-3">
                    <div className="bg-red-50 border border-red-100 rounded-2xl px-4 py-3 text-xs text-red-600 font-medium leading-relaxed text-left">
                      Your <strong>{pc.label}</strong> request was not processed. No charges were applied.
                    </div>
                    <button onClick={() => { sessionStorage.removeItem("dp_order_id"); window.history.back(); }}
                      className="btn-primary w-full flex items-center justify-center gap-2 !rounded-2xl !py-3.5 text-sm">
                      <FontAwesomeIcon icon={faArrowLeft} style={{ fontSize: 13 }} />
                      Go back &amp; try again
                    </button>
                  </div>
                </>
              )}

              {/* ══════════ PENDING ══════════ */}
              {status === "pending" && (
                <>
                  <motion.div initial={{ scale: 0, rotate: -15 }} animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 280, damping: 18 }}
                    className="w-16 h-16 rounded-full bg-amber-50 ring-8 ring-amber-100 flex items-center justify-center">
                    <FontAwesomeIcon icon={faClock} className="text-amber-400" style={{ fontSize: 28 }} />
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                    <p className="text-xl font-bold text-textDark mb-1" style={{ fontFamily: "'Fraunces', serif" }}>Payment Processing</p>
                    <p className="text-xs text-textLight font-medium leading-relaxed">
                      Your bank is still confirming. This can take a few minutes.
                    </p>
                  </motion.div>
                  <div className="w-full flex flex-col gap-3">
                    <div className="bg-amber-50 border border-amber-100 rounded-2xl px-4 py-3 text-xs text-amber-700 font-medium leading-relaxed text-left">
                      If money was deducted, your <strong>{pc.label}</strong> request will be activated automatically. Our team will call you within 2 hours.
                    </div>
                    {orderId && (
                      <div className="w-full bg-bgLight border border-borderLight rounded-xl px-4 py-2.5 flex items-center justify-between">
                        <span className="text-[10px] font-extrabold text-textLight uppercase tracking-wider">Order ID</span>
                        <span className="text-[11px] font-extrabold text-textDark truncate max-w-[180px]">{orderId}</span>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* ══════════ ERROR ══════════ */}
              {status === "error" && (
                <>
                  <motion.div initial={{ scale: 0, rotate: -15 }} animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 280, damping: 18 }}
                    className="w-16 h-16 rounded-full bg-gray-100 ring-8 ring-gray-100 flex items-center justify-center">
                    <FontAwesomeIcon icon={faTriangleExclamation} className="text-gray-400" style={{ fontSize: 26 }} />
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                    <p className="text-xl font-bold text-textDark mb-1" style={{ fontFamily: "'Fraunces', serif" }}>Something went wrong</p>
                    <p className="text-xs text-textLight font-medium leading-relaxed">
                      We couldn't verify your payment. Contact support if money was deducted.
                    </p>
                  </motion.div>
                  <div className="w-full flex flex-col gap-3">
                    {orderId && (
                      <div className="w-full bg-bgLight border border-borderLight rounded-xl px-4 py-2.5 flex items-center justify-between">
                        <span className="text-[10px] font-extrabold text-textLight uppercase tracking-wider">Order ID</span>
                        <span className="text-[11px] font-extrabold text-textDark truncate max-w-[180px]">{orderId}</span>
                      </div>
                    )}
                    <a href={`https://wa.me/919876543210?text=Payment+issue+%E2%80%93+${pc.label}+%E2%80%93+Order+ID:+${orderId}`}
                      target="_blank" rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-sm rounded-2xl py-3.5 transition hover:shadow-md">
                      <FontAwesomeIcon icon={faCommentDots} style={{ fontSize: 14 }} />
                      WhatsApp Support
                    </a>
                  </div>
                </>
              )}

            </div>

            {/* Footer help */}
            {["failed", "pending", "error"].includes(status) && (
              <div className="px-7 pb-5 border-t border-borderLight pt-4">
                <p className="text-center text-[10.5px] text-textLight font-medium">
                  Need help?{" "}
                  <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
                    className="font-bold hover:underline" style={{ color: pc.color }}>
                    Chat with us on WhatsApp
                  </a>
                </p>
              </div>
            )}
          </div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="text-center mt-5 text-[11px] font-bold text-textLight tracking-widest uppercase">
            Domestic Pro · Secure Checkout
          </motion.p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}