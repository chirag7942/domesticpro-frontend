import { useEffect, useState } from "react";
import {
  CircleCheck,
  CircleX,
  Clock,
  TriangleAlert,
  Zap,
  ArrowLeft,
  MessageSquare,
  CalendarCheck,
} from "lucide-react";

const API_BASE = import.meta.env.VITE_REACT_APP_API;
const MAX_POLLS = 10;

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
      { dot: "bg-orange-500", label: "Our team reviews your requirement immediately" },
      { dot: "bg-orange-400", label: "3 verified profiles shortlisted" },
      { dot: "bg-orange-300", label: "Profiles shared within 24 hours" },
    ],
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
  },
};

export default function PaymentStatus() {
  const [status, setStatus] = useState("loading");
  const [orderId, setOrderId] = useState("");
  const [pollCount, setPollCount] = useState(0);
  const [plan, setPlan] = useState("priority");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const oid = params.get("order_id") || sessionStorage.getItem("dp_order_id") || "";
    const savedPlan = sessionStorage.getItem("dp_plan") || "priority";

    setOrderId(oid);
    setPlan(savedPlan);

    if (!oid) {
      setStatus("error");
      return;
    }

    const alreadyPaid = sessionStorage.getItem("dp_payment_done");
    if (alreadyPaid === oid) {
      console.log("[VERIFY] Already confirmed paid — skipping verify call");
      setStatus("paid");
      return;
    }

    verify(oid, 0, savedPlan);
  }, []);

  const verify = async (oid, attempt, savedPlan) => {
    try {
      const res = await fetch(`${API_BASE}/payment-verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_id: oid, plan: savedPlan }),
      });

      const data = await res.json();

      if (data.status === "PAID") {
        sessionStorage.setItem("dp_payment_done", oid);
        sessionStorage.removeItem("dp_order_id");
        sessionStorage.removeItem("dp_plan");
        sessionStorage.removeItem("dp_customer_phone");
        sessionStorage.removeItem("dp_drop_lead_id");
        setStatus("paid");
        return;
      }

      if (data.status === "ACTIVE" && attempt < MAX_POLLS) {
        setPollCount(attempt + 1);
        setTimeout(() => verify(oid, attempt + 1, savedPlan), 3000);
        return;
      }

      if (attempt >= MAX_POLLS && data.status === "ACTIVE") {
        setStatus("pending");
        return;
      }

      setStatus("failed");
    } catch (err) {
      console.error("[VERIFY] Network error:", err.message);
      if (attempt < MAX_POLLS) {
        setTimeout(() => verify(oid, attempt + 1, savedPlan), 3000);
      } else {
        setStatus("error");
      }
    }
  };

  const pc = PLAN_CONFIG[plan] || PLAN_CONFIG.priority;

  const stripColor = {
    loading: plan === "commitment" ? "bg-blue-400" : "bg-orange-500",
    paid: "bg-green-400",
    failed: "bg-red-400",
    pending: "bg-amber-400",
    error: "bg-gray-300",
  }[status];

  return (
    <div
      className="min-h-screen bg-gray-50 flex items-center justify-center p-4"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Background blobs — pure CSS, no motion needed */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[480px] h-[480px] rounded-full"
          style={{ background: `${pc.color}0D` }} />
        <div className="absolute -bottom-28 -left-28 w-[360px] h-[360px] rounded-full"
          style={{ background: `${pc.color}08` }} />
      </div>

      <div
        key={status}
        className="anim-status-enter relative w-full max-w-sm"
      >
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className={`h-1 w-full ${stripColor}`} />

          <div className="px-7 pt-7 pb-6 flex flex-col items-center text-center gap-5">

            {/* ══════════ LOADING ══════════ */}
            {status === "loading" && (
              <>
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 rounded-full border-4 border-gray-100" />
                  <div
                    className="absolute inset-0 rounded-full border-4 border-b-transparent border-l-transparent animate-spin"
                    style={{ borderTopColor: pc.color, borderRightColor: pc.color }}
                  />
                  <div className="absolute inset-3 rounded-full flex items-center justify-center"
                    style={{ background: pc.accentBg }}>
                    {plan === "commitment"
                      ? <CalendarCheck size={14} color={pc.color} />
                      : <Zap size={14} color={pc.color} />
                    }
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-extrabold tracking-widest uppercase mb-2"
                    style={{ color: pc.color }}>{pc.label}</p>
                  <p className="text-xl font-bold text-gray-900 mb-1.5" style={{ fontFamily: "'Fraunces', serif" }}>
                    Verifying payment…
                  </p>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">
                    Please wait. Do not close or refresh this tab.
                  </p>
                </div>

                <div className="flex gap-1.5 items-center">
                  {Array.from({ length: MAX_POLLS }).map((_, i) => (
                    <div key={i} className="h-1.5 rounded-full transition-all duration-500"
                      style={{ width: i < pollCount ? 16 : 6, background: i < pollCount ? pc.color : "#F1E3DE" }} />
                  ))}
                </div>
                {pollCount > 3 && (
                  <p className="text-[11px] text-gray-400 font-medium">
                    Checking with Cashfree… ({pollCount}/{MAX_POLLS})
                  </p>
                )}
              </>
            )}

            {/* ══════════ PAID ══════════ */}
            {status === "paid" && (
              <>
                {/* Spring pop — CSS animation replaces motion spring */}
                <div
                  className="anim-spring-pop w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: "#f0fdf4", boxShadow: "0 0 0 8px #bbf7d040" }}
                >
                  <CircleCheck size={30} className="text-green-500" />
                </div>

                {/* Fade up with delay — replaces motion initial/animate + delay:0.15 */}
                <div className="anim-fade-up" style={{ animationDelay: "0.15s" }}>
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold tracking-widest uppercase rounded-full px-3 py-1 mb-3 border"
                    style={{ background: pc.accentBg, borderColor: pc.accentBorder, color: pc.accentText }}>
                    {plan === "commitment" ? <CalendarCheck size={10} /> : <Zap size={10} />}
                    {pc.label}
                  </div>
                  <p className="text-xl font-bold text-gray-900 mb-1" style={{ fontFamily: "'Fraunces', serif" }}>
                    {pc.successTitle}
                  </p>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">
                    {pc.successSub}
                  </p>
                </div>

                {/* Fade up with delay — replaces motion delay:0.25 */}
                <div className="anim-fade-up w-full rounded-2xl p-4 text-left flex flex-col gap-3 border"
                  style={{ animationDelay: "0.25s", background: pc.accentBg, borderColor: pc.accentBorder }}>
                  <p className="text-[10px] font-extrabold text-gray-400 tracking-widest uppercase">
                    What happens next
                  </p>
                  {pc.steps.map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${item.dot}`} />
                      <span className="text-xs font-semibold text-gray-800">{item.label}</span>
                    </div>
                  ))}
                </div>

                {orderId && (
                  <div className="w-full rounded-xl px-4 py-2.5 flex items-center justify-between border"
                    style={{ background: pc.accentBg, borderColor: pc.accentBorder }}>
                    <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">Order ID</span>
                    <span className="text-[11px] font-extrabold truncate max-w-[180px]"
                      style={{ color: pc.color }}>{orderId}</span>
                  </div>
                )}

                <p className="text-[11px] text-gray-400 font-medium">
                  You can safely close this tab. We'll call you shortly.
                </p>
              </>
            )}

            {/* ══════════ FAILED ══════════ */}
            {status === "failed" && (
              <>
                {/* Spring pop replaces motion spring */}
                <div
                  className="anim-spring-pop w-16 h-16 rounded-full bg-red-50 flex items-center justify-center"
                  style={{ boxShadow: "0 0 0 8px #fee2e240" }}>
                  <CircleX size={30} className="text-red-400" />
                </div>

                {/* Fade up replaces motion delay:0.15 */}
                <div className="anim-fade-up" style={{ animationDelay: "0.15s" }}>
                  <p className="text-xl font-bold text-gray-900 mb-1" style={{ fontFamily: "'Fraunces', serif" }}>
                    Payment Failed
                  </p>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">
                    No amount was deducted. Please try again.
                  </p>
                </div>

                <div className="w-full flex flex-col gap-3">
                  <div className="bg-red-50 border border-red-100 rounded-2xl px-4 py-3 text-xs text-red-600 font-medium leading-relaxed text-left">
                    Your <strong>{pc.label}</strong> request was not processed. No charges were applied.
                  </div>
                  <button
                    onClick={() => {
                      sessionStorage.removeItem("dp_order_id");
                      window.history.back();
                    }}
                    className="w-full flex items-center justify-center gap-2 font-bold text-sm rounded-2xl py-3.5 text-white transition"
                    style={{ background: "linear-gradient(135deg,#EC5F36,#D84E28)" }}>
                    <ArrowLeft size={13} />
                    Go back &amp; try again
                  </button>
                </div>
              </>
            )}

            {/* ══════════ PENDING ══════════ */}
            {status === "pending" && (
              <>
                {/* Spring pop replaces motion spring */}
                <div
                  className="anim-spring-pop w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center"
                  style={{ boxShadow: "0 0 0 8px #fef3c740" }}>
                  <Clock size={28} className="text-amber-400" />
                </div>

                {/* Fade up replaces motion delay:0.15 */}
                <div className="anim-fade-up" style={{ animationDelay: "0.15s" }}>
                  <p className="text-xl font-bold text-gray-900 mb-1" style={{ fontFamily: "'Fraunces', serif" }}>
                    Payment Processing
                  </p>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">
                    Your bank is still confirming. This can take a few minutes.
                  </p>
                </div>

                <div className="w-full flex flex-col gap-3">
                  <div className="bg-amber-50 border border-amber-100 rounded-2xl px-4 py-3 text-xs text-amber-700 font-medium leading-relaxed text-left">
                    If money was deducted, your <strong>{pc.label}</strong> request will be activated automatically.
                    Our team will call you within 2 hours.
                  </div>
                  {orderId && (
                    <div className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 flex items-center justify-between">
                      <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">Order ID</span>
                      <span className="text-[11px] font-extrabold text-gray-800 truncate max-w-[180px]">{orderId}</span>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* ══════════ ERROR ══════════ */}
            {status === "error" && (
              <>
                {/* Spring pop replaces motion spring */}
                <div
                  className="anim-spring-pop w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center"
                  style={{ boxShadow: "0 0 0 8px #f3f4f640" }}>
                  <TriangleAlert size={26} className="text-gray-400" />
                </div>

                {/* Fade up replaces motion delay:0.15 */}
                <div className="anim-fade-up" style={{ animationDelay: "0.15s" }}>
                  <p className="text-xl font-bold text-gray-900 mb-1" style={{ fontFamily: "'Fraunces', serif" }}>
                    Something went wrong
                  </p>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">
                    We couldn't verify your payment. Contact support if money was deducted.
                  </p>
                </div>

                <div className="w-full flex flex-col gap-3">
                  {orderId && (
                    <div className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 flex items-center justify-between">
                      <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">Order ID</span>
                      <span className="text-[11px] font-extrabold text-gray-800 truncate max-w-[180px]">{orderId}</span>
                    </div>
                  )}
                  <a
                    href={`https://wa.me/919211298139?text=Payment+issue+%E2%80%93+${pc.label}+%E2%80%93+Order+ID:+${orderId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-sm rounded-2xl py-3.5 transition hover:shadow-md">
                    <MessageSquare size={14} />
                    WhatsApp Support
                  </a>
                </div>
              </>
            )}
          </div>

          {["failed", "pending", "error"].includes(status) && (
            <div className="px-7 pb-5 border-t border-gray-100 pt-4">
              <p className="text-center text-[10.5px] text-gray-400 font-medium">
                Need help?{" "}
                <a href="https://wa.me/919211298139" target="_blank" rel="noopener noreferrer"
                  className="font-bold hover:underline" style={{ color: pc.color }}>
                  Chat with us on WhatsApp
                </a>
              </p>
            </div>
          )}
        </div>

        {/* Fade in — replaces motion delay:0.4 */}
        <p className="anim-fade-up text-center mt-5 text-[11px] font-bold text-gray-400 tracking-widest uppercase"
          style={{ animationDelay: "0.4s" }}>
          Domestic Pro · Secure Checkout
        </p>
      </div>
    </div>
  );
}