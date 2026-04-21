import { useState, useRef, useEffect } from "react";
import CitySelect from "./CitySelect";
import { Check, ArrowLeft, X, CheckCircle2, Minus, Plus, Briefcase } from "lucide-react";
import {
  Zap, IdCard, UserCheck, Headphones, Handshake, RotateCcw,
  Gauge, CreditCard, ContactRound, Filter, Target,
  Clock, Gift, CircleCheck, Phone, Users, Ban, Loader2,
} from "lucide-react";
import {
  SERVICES, SERVICE_FORMATS, GENDER_OPTIONS_DATA, TASKS, HOUSE_SIZES,
  PETS_OPTIONS, MEAL_PREFS, CUISINES, CHILD_DUTIES,
  CARE_NEEDED, VEHICLE_TYPES, HOME_TYPES, BUDGETS, SUBSTITUTE_BUDGETS, URGENCY_OPTIONS, PLANS,
  SERVICE_FLOWS, DEFAULT_FLOW, PROG_META, INIT,
  JAPA_DUTIES, JAPA_MOTHER_NEEDS, CHILD_AGE_RANGES
} from "./wizardData";

const API_BASE = import.meta.env.VITE_REACT_APP_API || "";
const INTERNAL_SECRET = import.meta.env.VITE_INTERNAL_SECRET || "";
const ENABLE_PAYMENT = import.meta.env.VITE_ENABLE_PAYMENT === "true";

// Maps the string keys from wizardData plan inclusions to Lucide components
const ICON_MAP = {
  "bolt": Zap, "id-card": IdCard, "user-check": UserCheck,
  "headset": Headphones, "handshake": Handshake, "rotate": RotateCcw,
  "gauge-high": Gauge, "credit-card": CreditCard, "address-card": ContactRound,
  "filter": Filter, "bullseye": Target, "clock": Clock,
  "gift": Gift, "check": Check, "circle-check": CircleCheck,
  "phone": Phone, "users": Users, "ban": Ban,
};

const createCashfreeOrder = async ({ plan, customer, zohoFields, dropLeadId }) => {
  if (!API_BASE) throw new Error("VITE_REACT_APP_API is not set. Check your .env file.");
  const res = await fetch(`${API_BASE}/create-order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ plan, customer, zohoFields, dropLeadId }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Order creation failed");
  return data;
};

const submitNoPay = async (zohoFields) => {
  if (!API_BASE) throw new Error("VITE_REACT_APP_API is not set. Check your .env file.");
  const res = await fetch(`${API_BASE}/submit-nopay`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-internal-secret": INTERNAL_SECRET,
    },
    body: JSON.stringify({ zohoFields }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `Server error ${res.status}`);
  return data;
};

export default function HeroWizard({ asModal = false, isOpen = true, onClose, onSubmit, initialService, initialFormat }) {
  const getInitialState = () => {
    if (initialService) {
      const svc = SERVICES.find((s) => s.id === initialService);
      if (svc) {
        return {
          ...INIT,
          ServiceType: svc.id,
          ServiceLabel: svc.label,
          ...(initialFormat ? { ServiceFormat: initialFormat } : {}),
        };
      }
    }
    return { ...INIT };
  };

  const getInitialStep = () => {
    if (!initialService) return 0;
    const svc = SERVICES.find((s) => s.id === initialService);
    if (!svc) return 0;
    const flow = SERVICE_FLOWS[initialService] || DEFAULT_FLOW;
    if (initialFormat) {
      const formatIdx = flow.indexOf("format");
      return formatIdx >= 0 ? formatIdx + 1 : 1;
    }
    return 1;
  };

  const [stepIdx, setStepIdx] = useState(getInitialStep);
  const [dir, setDir] = useState(1);
  const [form, setForm] = useState(getInitialState);
  const [planSubmitting, setPlanSubmitting] = useState(false);
  const [paymentStage, setPaymentStage] = useState("idle");
  const [activeTab, setActiveTab] = useState("priority");
  const [dropLeadId, setDropLeadId] = useState(
    () => sessionStorage.getItem("dp_drop_lead_id") || ""
  );
  const [submitError, setSubmitError] = useState("");
  const bodyRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setStepIdx(getInitialStep());
      setForm(getInitialState());
      setDir(1);
      setPlanSubmitting(false);
      setPaymentStage("idle");
      setActiveTab("priority");
      setSubmitError("");
    }
  }, [isOpen, initialService, initialFormat]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = 0;
  }, [stepIdx, form.ServiceType]);

  const selectService = (svc) => {
    setForm({ ...INIT, ServiceType: svc.id, ServiceLabel: svc.label });
    setDir(1);
    setStepIdx(1);
  };

  const steps = (() => {
    const base = form.ServiceType
      ? SERVICE_FLOWS[form.ServiceType] || DEFAULT_FLOW
      : DEFAULT_FLOW;
    if (ENABLE_PAYMENT) return base;
    return base.filter((k) => k !== "plan");
  })();

  const curKey = steps[stepIdx] ?? "service";
  const isDone = curKey === "done";
  const progKeys = steps.filter((k) => k !== "done");
  const progIdx = isDone ? progKeys.length : progKeys.indexOf(curKey);
  const progPct = progKeys.length <= 1 ? 0 : Math.round((Math.max(0, progIdx) / (progKeys.length - 1)) * 100);

  const setF = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const toggleArr = (k, v) => setForm((f) => ({
    ...f,
    [k]: f[k].includes(v) ? f[k].filter((x) => x !== v) : [...f[k], v],
  }));

  const goNext = () => {
    if (curKey === "contact" && isValid()) {
      if (!ENABLE_PAYMENT) {
        handleNopayDirectSubmit();
        return;
      }
      captureDrop();
    }
    setDir(1);
    setStepIdx((i) => Math.min(i + 1, steps.length - 1));
  };

  const goBack = () => { setDir(-1); setStepIdx((i) => Math.max(i - 1, 0)); };
  const after = (ms = 220) => setTimeout(goNext, ms);

  const handleNopayDirectSubmit = async () => {
    setPlanSubmitting(true);
    setSubmitError("");
    try {
      const zohoFields = buildZohoFields({
        ...form,
        PlanType: "Priority",
        PaymentStatus: "Paid",
      });
      const result = await submitNoPay(zohoFields);
      onSubmit?.(zohoFields, result);
      const doneIdx = steps.indexOf("done");
      setDir(1);
      setStepIdx(doneIdx);
    } catch (err) {
      setSubmitError(
        err.message.includes("VITE_REACT_APP_API")
          ? "Backend URL not configured. Set VITE_REACT_APP_API in your .env file."
          : "We couldn't save your request. Please try again or call us on +91 92112 98139."
      );
    }
    setPlanSubmitting(false);
  };

  const resetWizard = () => {
    setStepIdx(getInitialStep());
    setDir(1);
    setForm(getInitialState());
    setPlanSubmitting(false);
    setPaymentStage("idle");
    setActiveTab("priority");
    setSubmitError("");
    setDropLeadId("");
    sessionStorage.removeItem("dp_drop_lead_id");
  };

  const isValid = () => {
    switch (curKey) {
      case "service": return !!form.ServiceType;
      case "tasks": return form.Tasks.length > 0;
      case "housesize": return !!form.HouseSize;
      case "pets": return !!form.PetsAtHome;
      case "mealpref": return !!form.MealPref;
      case "cookmembers": return form.CookMembers > 0;
      case "cuisine": return form.CuisinePref.length > 0;
      case "helpergender": return !!form.HelperGender;
      case "childage": return !!form.ChildAge.trim();
      case "childduties": return form.ChildDuties.length > 0;
      case "patientage": return !!form.PatientAge.trim();
      case "patientgender": return !!form.PatientGender;
      case "careneeded": return form.CareNeeded.length > 0;
      case "vehicletype": return form.VehicleType.length > 0;
      case "hometype": return !!form.HomeType;
      case "urgency": return !!form.Urgency;
      case "budget": return !!form.Budget;
      case "japaduties": return form.JapaDuties.length > 0;
      case "japamotherneeds": return form.JapaMotherNeeds.length > 0;
      case "contact":
        return form.FirstName.trim() !== "" &&
          form.Phone.length === 10 && /^[6-9]/.test(form.Phone) &&
          form.Street.trim() !== "" && form.City.trim() !== "";
      case "plan": return !!form.PlanType;
      default: return true;
    }
  };

  const CONT_KEYS = new Set([
    "tasks", "cuisine", "childduties", "careneeded", "vehicletype", "contact",
    "housesize", "mealpref", "cookmembers", "helpergender", "urgency",
    "budget", "patientage", "childage", "patientgender", "hometype", "plan",
    "japaduties", "japamotherneeds",
  ]);
  const showContinue = CONT_KEYS.has(curKey);

  function buildZohoFields(f) {
    return {
      Full_Name: `${f.FirstName} ${f.LastName}`.trim(),
      First_Name: f.FirstName,
      Last_Name: f.LastName,
      Mobile_Number: f.Phone,
      Email: f.Email,
      Street_Address: f.Street,
      City: f.City,
      Service_Type: f.ServiceType,
      Service_Format: f.ServiceFormat,
      Tasks_Needed: f.Tasks,
      House_Size: f.HouseSize,
      People_At_Home: f.PeopleAtHome,
      Pets_At_Home: f.PetsAtHome,
      Meal_Preferences: f.MealPref,
      Cuisine_Preference: f.CuisinePref,
      Helper_s_Gender: f.HelperGender,
      Cook_Members: String(f.CookMembers),
      Child_Age: f.ChildAge,
      Child_Duties: f.ChildDuties,
      Japa_Child_Duties: f.JapaDuties,
      Japa_Mother_Duties: f.JapaMotherNeeds,
      Patient_Age: f.PatientAge,
      Patient_Gender: f.PatientGender,
      Care_Needed: f.CareNeeded,
      Vehicle_Type: f.VehicleType,
      Monthly_Budget: f.Budget,
      Urgency: f.Urgency,
      Special_Instructions: f.Instructions,
      Plan_Type: f.PlanType,
      Payment_Status: f.PaymentStatus,
    };
  }

  const captureDrop = async () => {
    if (dropLeadId) return;
    try {
      const zohoFields = buildZohoFields({
        ...form,
        PlanType: "cart_drop",
        PaymentStatus: "Cart Drop — Dropped at Plan Step",
      });
      const res = await fetch(`${API_BASE}/capture-drop`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ zohoFields }),
      });
      const data = await res.json();
      if (data.success && data.leadId) {
        setDropLeadId(data.leadId);
        sessionStorage.setItem("dp_drop_lead_id", data.leadId);
      }
    } catch (err) {
      console.warn("[CART-DROP] Capture failed (non-fatal):", err.message);
    }
  };

  const upgradeDropLead = async (finalPlanType, paymentStatus, orderId = null) => {
    const savedDropId = dropLeadId || sessionStorage.getItem("dp_drop_lead_id");
    if (!savedDropId) return;
    try {
      await fetch(`${API_BASE}/update-lead/${savedDropId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Plan_Type: finalPlanType,
          Payment_Status: paymentStatus,
          ...(orderId ? { Order_ID: orderId } : {}),
        }),
      });
      sessionStorage.removeItem("dp_drop_lead_id");
      setDropLeadId("");
    } catch (err) {
      console.warn("[CART-DROP] Upgrade failed (non-fatal):", err.message);
    }
  };

  const handlePlanSubmit = async (planType) => {
    if (!planType || planSubmitting) return;
    setF("PlanType", planType);
    setSubmitError("");
    setPlanSubmitting(true);

    if (planType === "Priority" || planType === "Commitment") {
      try {
        setPaymentStage("creating_order");
        const savedDropId = dropLeadId || sessionStorage.getItem("dp_drop_lead_id");
        const zohoFields = buildZohoFields({ ...form, PlanType: planType });
        const order = await createCashfreeOrder({
          plan: planType,
          customer: {
            name: `${form.FirstName} ${form.LastName}`.trim(),
            email: form.Email || `${form.Phone}@noemail.com`,
            phone: form.Phone,
          },
          zohoFields,
          dropLeadId: savedDropId,
        });
        if (savedDropId) {
          await upgradeDropLead(planType, "Payment Initiated", order.order_id);
        }
        sessionStorage.setItem("dp_order_id", order.order_id);
        sessionStorage.setItem("dp_plan", planType);
        sessionStorage.setItem("dp_customer_phone", form.Phone);
        setPaymentStage("redirecting");
        const { load } = await import("@cashfreepayments/cashfree-js");
        const cashfree = await load({ mode: order.cashfreeMode || "production" });
        await cashfree.checkout({ paymentSessionId: order.payment_session_id, redirectTarget: "_self" });
      } catch (err) {
        setPaymentStage("idle");
        setPlanSubmitting(false);
        setSubmitError(
          err.message.includes("VITE_REACT_APP_API")
            ? "Backend URL not configured. Set VITE_REACT_APP_API in your .env file."
            : `Payment failed to initialise: ${err.message}. Please try again.`
        );
      }
      return;
    }

    if (planType === "No Pay") {
      const savedDropId = dropLeadId || sessionStorage.getItem("dp_drop_lead_id");
      try {
        if (savedDropId) {
          await upgradeDropLead("No Pay", "No Payment — Basic Access");
        } else {
          const zohoFields = buildZohoFields({
            ...form,
            PlanType: "No Pay",
            PaymentStatus: "No Payment — Basic Access",
          });
          const result = await submitNoPay(zohoFields);
          onSubmit?.(zohoFields, result);
        }
        const currentSteps = form.ServiceType
          ? (SERVICE_FLOWS[form.ServiceType] || DEFAULT_FLOW)
          : DEFAULT_FLOW;
        setStepIdx(currentSteps.indexOf("done"));
      } catch (err) {
        setSubmitError(
          err.message.includes("VITE_REACT_APP_API")
            ? "Backend URL not configured. Set VITE_REACT_APP_API in your .env file."
            : "We couldn't save your request. Please try again or call us on +91 92112 98139."
        );
      }
      setPlanSubmitting(false);
    }
  };

  // ── UI COMPONENTS ────────────────────────────────────────────────────────────

  const QHead = ({ q, hint }) => (
    <div className="mb-5">
      <p className="text-[15px] font-bold leading-snug text-[#181C2E] mb-1">{q}</p>
      {hint && <p className="text-xs text-[#5B6475] font-medium leading-relaxed">{hint}</p>}
    </div>
  );

  const SvcCard = ({ svc, selected, onClick, className = "" }) => (
    <button type="button" aria-pressed={selected} onClick={onClick} className={`hw2-svc-card ${className}`}
      style={{ borderColor: selected ? svc.color : "#E5E2DE", boxShadow: selected ? `0 8px 24px ${svc.color}40` : "0 2px 8px rgba(0,0,0,0.05)" }}>
      <img src={svc.image} alt={svc.label} loading="lazy" className="hw2-svc-img" />
      <div className="hw2-svc-overlay" />
      {selected && <div className="hw2-svc-tint" style={{ background: `${svc.color}33` }} />}
      <p className="hw2-svc-label">{svc.label}</p>
      {selected && <div className="hw2-svc-check" style={{ background: svc.color }}><Check size={9} strokeWidth={3} color="#fff" /></div>}
    </button>
  );

  const ImgChip = ({ label, image, selected, onClick, color = "#EC5F36" }) => (
    <button type="button" aria-pressed={selected} onClick={onClick} className="hw2-svc-card"
      style={{ borderColor: selected ? color : "#E5E2DE", boxShadow: selected ? `0 8px 24px ${color}40` : "0 2px 8px rgba(0,0,0,0.05)" }}>
      <img src={image} alt={label} loading="lazy" className="hw2-svc-img" />
      <div className="hw2-svc-overlay" />
      {selected && <div className="hw2-svc-tint" style={{ background: `${color}33` }} />}
      <p className="hw2-svc-label">{label}</p>
      {selected && <div className="hw2-svc-check" style={{ background: color }}><Check size={9} strokeWidth={3} color="#fff" /></div>}
    </button>
  );

  const GenderImgCard = ({ opt, selected, onClick }) => (
    <button type="button" aria-pressed={selected} onClick={onClick} className="hw2-gender-card"
      style={{ borderColor: selected ? "#EC5F36" : "#E5E2DE", boxShadow: selected ? "0 8px 24px rgba(236,95,54,0.32)" : "0 2px 8px rgba(0,0,0,0.05)" }}>
      <img src={opt.image} alt={opt.label} loading="lazy" className="hw2-gender-img" />
      <div className="hw2-gender-overlay" />
      {selected && <div className="hw2-gender-tint" />}
      <p className="hw2-gender-label">{opt.label}</p>
      {selected && <div className="hw2-gender-check"><Check size={9} strokeWidth={3} color="#fff" /></div>}
    </button>
  );

  const Pill = ({ icon: Icon, label, desc, selected, onClick }) => (
    <button type="button" aria-pressed={selected} onClick={onClick} className="hw2-pill"
      style={{ background: selected ? "#EC5F36" : "#fff", borderColor: selected ? "#EC5F36" : "#E5E2DE", boxShadow: selected ? "0 6px 18px rgba(236,95,54,0.33)" : "0 1px 4px rgba(0,0,0,0.04)" }}>
      <div className="hw2-pill-ico" style={{ background: selected ? "rgba(255,255,255,0.22)" : "#FFF2EE" }}>
        <Icon size={16} color={selected ? "#fff" : "#EC5F36"} strokeWidth={1.8} />
      </div>
      <div className="hw2-pill-txt">
        <span className="hw2-pill-label" style={{ color: selected ? "#fff" : "#1a1a2e" }}>{label}</span>
        {desc && <span className="hw2-pill-desc" style={{ color: selected ? "rgba(255,255,255,0.78)" : "#888" }}>{desc}</span>}
      </div>
      {selected && <Check size={14} strokeWidth={2.5} color="#fff" className="ml-auto flex-shrink-0" />}
    </button>
  );

  const Stepper = ({ label, value, onDec, onInc, min = 1, max = 20 }) => (
    <div className="hw2-stepper">
      <span className="hw2-step-label">{label}</span>
      <div className="hw2-step-ctrl">
        <button type="button" onClick={onDec} disabled={value <= min} className="hw2-step-btn"><Minus size={13} strokeWidth={2.5} /></button>
        <span className="hw2-step-val">{value}</span>
        <button type="button" onClick={onInc} disabled={value >= max} className="hw2-step-btn"><Plus size={13} strokeWidth={2.5} /></button>
      </div>
    </div>
  );

  const renderStep = () => {
    if (curKey === "service") return (
      <div>
        <QHead q="What type of house help do you need?" hint="Tap to select — we'll guide you from there" />
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
          {SERVICES.map((svc, i) => (
            <SvcCard key={svc.id} svc={svc} selected={form.ServiceType === svc.id}
              className={SERVICES.length % 3 === 1 && i === SERVICES.length - 1 ? "col-start-2" : ""}
              onClick={() => selectService(svc)} />
          ))}
        </div>
      </div>
    );

    if (curKey === "format") return (
      <div>
        <QHead q="Choose Service Format" hint="How would you like the service provided?" />
        <div className="flex flex-col gap-2">
          {SERVICE_FORMATS.map((opt) => {
            const isCS = !!opt.comingSoon;
            const sel = form.ServiceFormat === opt.id;
            return (
              <button key={opt.id} type="button" disabled={isCS}
                onClick={() => { if (!isCS) { setF("ServiceFormat", opt.id); after(); } }}
                className="hw2-pill"
                style={{
                  background: isCS ? "#F9F9F9" : sel ? "#EC5F36" : "#fff",
                  borderColor: isCS ? "#E5E2DE" : sel ? "#EC5F36" : "#E5E2DE",
                  opacity: isCS ? 0.6 : 1,
                  cursor: isCS ? "not-allowed" : "pointer",
                }}>
                <div className="hw2-pill-ico" style={{ background: isCS ? "#F0F0F0" : sel ? "rgba(255,255,255,0.22)" : "#FFF2EE" }}>
                  <opt.icon size={16} color={isCS ? "#bbb" : sel ? "#fff" : "#EC5F36"} strokeWidth={1.8} />
                </div>
                <div className="hw2-pill-txt">
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <span className="hw2-pill-label" style={{ color: isCS ? "#aaa" : sel ? "#fff" : "#1a1a2e" }}>{opt.label}</span>
                    {isCS && (
                      <span style={{ fontSize: 9, fontWeight: 800, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", borderRadius: 20, padding: "2px 8px" }}>
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <span className="hw2-pill-desc" style={{ color: isCS ? "#bbb" : sel ? "rgba(255,255,255,0.78)" : "#888" }}>{opt.desc}</span>
                </div>
                {!isCS && sel && <Check size={14} strokeWidth={2.5} color="#fff" className="ml-auto flex-shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>
    );

    if (curKey === "tasks") return (
      <div>
        <QHead q="Which tasks are needed?" hint="Select all that apply" />
        <div className="grid grid-cols-3 gap-2.5">
          {TASKS.map((t) => (
            <ImgChip key={t.id} label={t.label} image={t.image}
              selected={form.Tasks.includes(t.id)} onClick={() => toggleArr("Tasks", t.id)} />
          ))}
        </div>
        {form.Tasks.length === 0 && <p className="hw2-warn mt-2">Pick at least one task</p>}
      </div>
    );

    if (curKey === "housesize") return (
      <div>
        <QHead q="What's your home size?" hint="Helps us estimate effort & staff" />
        <div className="grid grid-cols-3 gap-2.5">
          {HOUSE_SIZES.map((h) => (
            <ImgChip key={h.id} label={h.label} image={h.image}
              selected={form.HouseSize === h.id} onClick={() => setF("HouseSize", h.id)} />
          ))}
        </div>
      </div>
    );

    if (curKey === "pets") return (
      <div>
        <QHead q="Do you have pets at home?" hint="Some helpers prefer no pets" />
        <div className="grid grid-cols-2 gap-3 mt-1">
          {PETS_OPTIONS.map((o) => (
            <ImgChip key={o.id} label={o.label} image={o.image}
              selected={form.PetsAtHome === o.id}
              onClick={() => { setF("PetsAtHome", o.id); after(); }} />
          ))}
        </div>
      </div>
    );

    if (curKey === "hometype") return (
      <div>
        <QHead q="What type of home?" />
        <div className="grid grid-cols-3 gap-2.5">
          {HOME_TYPES.map((h) => (
            <ImgChip key={h.id} label={h.label} image={h.image}
              selected={form.HomeType === h.id}
              onClick={() => { setF("HomeType", h.id); after(); }} />
          ))}
        </div>
      </div>
    );

    if (curKey === "mealpref") return (
      <div>
        <QHead q="Dietary preference?" hint="Helps match the right cook" />
        <div className="grid grid-cols-3 gap-2.5">
          {MEAL_PREFS.map((m) => (
            <ImgChip key={m.id} label={m.label} image={m.image}
              selected={form.MealPref === m.id}
              onClick={() => { setF("MealPref", m.id); after(); }} />
          ))}
        </div>
      </div>
    );

    if (curKey === "cuisine") return (
      <div>
        <QHead q="Cuisine preference?" />
        <div className="grid grid-cols-3 gap-2.5">
          {CUISINES.map((c) => (
            <ImgChip key={c.id} label={c.label} image={c.image}
              selected={form.CuisinePref.includes(c.id)}
              onClick={() => toggleArr("CuisinePref", c.id)} />
          ))}
        </div>
        {form.CuisinePref.length === 0 && <p className="hw2-warn mt-2">Pick at least one</p>}
      </div>
    );

    if (curKey === "helpergender") return (
      <div>
        <QHead q="Helper's preferences" />
        <p className="text-[13px] font-bold text-[#181C2E] mb-3">
          Preferred {form.ServiceType.toLowerCase()}'s gender
        </p>
        <div className="grid grid-cols-3 gap-3">
          {GENDER_OPTIONS_DATA.map((g) => {
            const sel = form.HelperGender === g.id;
            return (
              <button
                key={g.id}
                type="button"
                aria-pressed={sel}
                onClick={() => { setF("HelperGender", g.id); after(); }}
                className="relative overflow-hidden rounded-2xl border-2 transition-all duration-200"
                style={{
                  borderColor: sel ? "#EC5F36" : "#E5E2DE",
                  boxShadow: sel ? "0 6px 20px rgba(236,95,54,0.25)" : "0 2px 8px rgba(0,0,0,0.05)",
                  aspectRatio: "1 / 1",
                  padding: 0,
                }}>
                <img src={g.image} alt={g.label} loading="lazy"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: sel ? "rgba(236,95,54,0.22)" : "rgba(0,0,0,0.08)", transition: "background .2s" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "6px 4px", background: sel ? "rgba(236,95,54,0.82)" : "rgba(0,0,0,0.45)", textAlign: "center" }}>
                  <span style={{ fontSize: 12, fontWeight: 800, color: "#fff", letterSpacing: ".01em" }}>{g.label}</span>
                </div>
                {sel && (
                  <div style={{ position: "absolute", top: 7, right: 7, width: 20, height: 20, borderRadius: "50%", background: "#EC5F36", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 6px rgba(0,0,0,0.25)" }}>
                    <Check size={10} strokeWidth={3} color="#fff" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );

    if (curKey === "cookmembers") return (
      <div>
        <QHead q="How many members to cook for?" />
        <div className="grid grid-cols-4 gap-3 mt-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => {
            const sel = form.CookMembers === n;
            return (
              <button key={n} type="button"
                onClick={() => { setF("CookMembers", n); after(220); }}
                className="rounded-2xl border-2 py-4 text-lg font-extrabold transition-all duration-200"
                style={{
                  borderColor: sel ? "#EC5F36" : "#E5E2DE",
                  background: sel ? "linear-gradient(135deg,#EC5F36,#D84E28)" : "#fff",
                  color: sel ? "#fff" : "#1a1a2e",
                  boxShadow: sel ? "0 6px 18px rgba(236,95,54,0.30)" : "0 1px 4px rgba(0,0,0,0.04)",
                }}>
                {n}
              </button>
            );
          })}
        </div>
        <div className="mt-4">
          <QHead q="More than 8?" hint="" />
          <Stepper
            label="Custom count"
            value={form.CookMembers > 8 ? form.CookMembers : 9}
            onDec={() => setF("CookMembers", Math.max(9, form.CookMembers - 1))}
            onInc={() => setF("CookMembers", Math.min(20, form.CookMembers + 1))}
          />
        </div>
      </div>
    );

    if (curKey === "childage") return (
      <div>
        <QHead q="How old is the child?" hint="Select the age range" />
        <div className="grid grid-cols-2 gap-3">
          {CHILD_AGE_RANGES.map((r) => (
            <button key={r.id} type="button"
              onClick={() => { setF("ChildAge", r.id); after(); }}
              className="hw2-budget-row"
              style={{ background: form.ChildAge === r.id ? "#EC5F36" : "#fff", borderColor: form.ChildAge === r.id ? "#EC5F36" : "#E5E2DE" }}>
              <span className="hw2-budget-label" style={{ color: form.ChildAge === r.id ? "#fff" : "#1a1a2e" }}>{r.label}</span>
              {form.ChildAge === r.id && <Check size={16} strokeWidth={2.5} color="#fff" className="ml-auto flex-shrink-0" />}
            </button>
          ))}
        </div>
      </div>
    );

    if (curKey === "childduties") return (
      <div>
        <QHead q="What duties are needed?" hint="Select all that apply" />
        <div className="grid grid-cols-3 gap-2.5">
          {CHILD_DUTIES.map((d) => (
            <ImgChip key={d.id} label={d.label} image={d.image}
              selected={form.ChildDuties.includes(d.id)}
              onClick={() => toggleArr("ChildDuties", d.id)} />
          ))}
        </div>
        {form.ChildDuties.length === 0 && <p className="hw2-warn mt-2">Select at least one</p>}
      </div>
    );

    if (curKey === "japaduties") return (
      <div>
        <QHead q="What newborn duties are needed?" hint="Select all that apply" />
        <div className="grid grid-cols-3 gap-2.5">
          {JAPA_DUTIES.map((d) => (
            <ImgChip key={d.id} label={d.label} image={d.image}
              selected={form.JapaDuties.includes(d.id)}
              onClick={() => toggleArr("JapaDuties", d.id)} />
          ))}
        </div>
        {form.JapaDuties.length === 0 && <p className="hw2-warn mt-2">Select at least one</p>}
      </div>
    );

    if (curKey === "japamotherneeds") return (
      <div>
        <QHead q="What does the mother need?" hint="Select all that apply" />
        <div className="grid grid-cols-3 gap-2.5">
          {JAPA_MOTHER_NEEDS.map((d) => (
            <ImgChip key={d.id} label={d.label} image={d.image}
              selected={form.JapaMotherNeeds.includes(d.id)}
              onClick={() => toggleArr("JapaMotherNeeds", d.id)} />
          ))}
        </div>
        {form.JapaMotherNeeds.length === 0 && <p className="hw2-warn mt-2">Select at least one</p>}
      </div>
    );

    if (curKey === "patientage") return (
      <div>
        <QHead q="How old is the patient?" />
        <div className="hw2-age-input-wrap">
          <input className="hw2-finput hw2-age-input" type="number" min={1} placeholder="e.g. 68 years…"
            value={form.PatientAge} autoFocus onChange={(e) => setF("PatientAge", e.target.value)} />
        </div>
      </div>
    );

    if (curKey === "patientgender") return (
      <div>
        <QHead q="Patient's gender?" />
        <div className="grid grid-cols-2 gap-3">
          {GENDER_OPTIONS_DATA.map((g) => (
            <GenderImgCard key={g.id} opt={g} selected={form.PatientGender === g.id}
              onClick={() => { setF("PatientGender", g.id); after(); }} />
          ))}
        </div>
      </div>
    );

    if (curKey === "careneeded") return (
      <div>
        <QHead q="What care is required?" hint="Select all that apply" />
        <div className="grid grid-cols-3 gap-2.5">
          {CARE_NEEDED.map((c) => (
            <ImgChip key={c.id} label={c.label} image={c.image}
              selected={form.CareNeeded.includes(c.id)}
              onClick={() => toggleArr("CareNeeded", c.id)} />
          ))}
        </div>
        {form.CareNeeded.length === 0 && <p className="hw2-warn mt-2">Select at least one</p>}
      </div>
    );

    if (curKey === "vehicletype") return (
      <div>
        <QHead q="What vehicle(s) will the driver operate?" hint="Select all that apply" />
        <div className="grid grid-cols-2 gap-2.5">
          {VEHICLE_TYPES.map((v) => (
            <ImgChip key={v.id} label={v.label} image={v.image}
              selected={form.VehicleType.includes(v.id)}
              onClick={() => toggleArr("VehicleType", v.id)} />
          ))}
        </div>
        {form.VehicleType.length === 0 && <p className="hw2-warn mt-2">Select at least one</p>}
      </div>
    );

    if (curKey === "urgency") return (
      <div>
        <QHead q="How soon do you need placement?" />
        <div className="flex flex-col gap-2">
          {URGENCY_OPTIONS.map((o) => (
            <Pill key={o.id} icon={o.icon} label={o.label} desc={o.desc}
              selected={form.Urgency === o.id}
              onClick={() => { setF("Urgency", o.id); after(); }} />
          ))}
        </div>
      </div>
    );

    if (curKey === "budget") {
      if (form.ServiceFormat === "Substitute") return (
        <div>
          <QHead q="Substitute Service Pricing" hint="Here's how our substitute service works" />
          <div className="flex flex-col gap-3 mb-4">
            <div className="rounded-2xl border border-[#F1E3DE] bg-[#FFF7F4] p-4">
              <p className="text-xs font-bold text-[#EC5F36] uppercase tracking-wider mb-3">How It Works</p>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#EC5F36] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">1</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#181C2E]">Domestic Pro Placement Fee</p>
                    <p className="text-xs text-[#5B6475] leading-relaxed mt-0.5">
                      We charge a one-time fee of <span className="font-bold text-[#181C2E]">₹5,000</span> for sourcing, verifying, and deploying a suitable substitute helper at your home.
                    </p>
                  </div>
                </div>
                <div className="w-full h-px bg-[#F1E3DE]" />
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#EC5F36] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">2</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#181C2E]">Helper's Salary — Separate</p>
                    <p className="text-xs text-[#5B6475] leading-relaxed mt-0.5">
                      The helper's salary is <span className="font-bold text-[#181C2E]">not included</span> in our fee. It is agreed directly between you and the helper.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-[#F1E3DE] bg-white px-5 py-4">
              <div>
                <p className="text-xs text-[#5B6475] font-semibold">Domestic Pro Fee</p>
                <p className="text-xl font-extrabold text-[#EC5F36] mt-0.5">₹5,000</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-[#5B6475] font-semibold">Helper Salary</p>
                <p className="text-sm font-bold text-[#181C2E] mt-0.5">As mutually agreed</p>
              </div>
            </div>
          </div>
          <button type="button"
            onClick={() => { setForm((f) => ({ ...f, Budget: "sub-5k" })); setTimeout(goNext, 220); }}
            className="w-full rounded-2xl py-3.5 text-sm font-bold transition-all duration-200"
            style={{
              background: form.Budget === "sub-5k" ? "linear-gradient(135deg,#EC5F36,#D84E28)" : "#fff",
              border: `2px solid ${form.Budget === "sub-5k" ? "#EC5F36" : "#F1E3DE"}`,
              color: form.Budget === "sub-5k" ? "#fff" : "#EC5F36",
            }}>
            {form.Budget === "sub-5k" ? "✓ Understood — Continue" : "I Understand — Proceed"}
          </button>
        </div>
      );

      return (
        <div>
          <QHead q="What's your monthly budget?" hint="We'll match staff within your budget" />
          <div className="flex flex-col gap-2">
            {BUDGETS.map((b) => (
              <button key={b.id} type="button"
                onClick={() => { setF("Budget", b.id); after(); }}
                className="hw2-budget-row"
                style={{ background: form.Budget === b.id ? "#EC5F36" : "#fff", borderColor: form.Budget === b.id ? "#EC5F36" : "#E5E2DE" }}>
                <span className="hw2-budget-label" style={{ color: form.Budget === b.id ? "#fff" : "#1a1a2e" }}>{b.label}</span>
                <span className="hw2-budget-desc" style={{ color: form.Budget === b.id ? "rgba(255,255,255,0.8)" : "#888" }}>{b.desc}</span>
                {form.Budget === b.id && <Check size={16} strokeWidth={2.5} color="#fff" className="ml-auto flex-shrink-0" />}
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (curKey === "contact") {
      const phoneOk = form.Phone.length === 10 && /^[6-9]/.test(form.Phone);
      return (
        <div>
          <QHead q="Almost there! 🎉" hint="Share your details — our team will call you within 2 hours" />
          <div className="grid grid-cols-2 gap-2.5 mb-3">
            <div>
              <label className="hw2-flabel">First Name *</label>
              <input className="hw2-finput" type="text" placeholder="Rahul"
                value={form.FirstName} onChange={(e) => setF("FirstName", e.target.value)} />
            </div>
            <div>
              <label className="hw2-flabel">Last Name</label>
              <input className="hw2-finput" type="text" placeholder="Sharma"
                value={form.LastName} onChange={(e) => setF("LastName", e.target.value)} />
            </div>
          </div>
          <div className="mb-3">
            <label className="hw2-flabel">Phone * <span className="text-xs font-normal text-gray-400">(we'll call on this)</span></label>
            <div className="hw2-phone-wrap" style={{ borderColor: phoneOk ? "#16a34a" : undefined }}>
              <div className="hw2-phone-pre">+91</div>
              <input type="tel" inputMode="numeric" maxLength={10} className="hw2-phone-inp"
                placeholder="10-digit mobile" value={form.Phone} autoFocus
                onChange={(e) => setF("Phone", e.target.value.replace(/\D/g, "").slice(0, 10))} />
              {phoneOk && <CheckCircle2 size={18} color="#16a34a" strokeWidth={2} className="mr-3 flex-shrink-0" />}
            </div>
            {form.Phone.length > 0 && form.Phone.length < 10 && (
              <p className="hw2-warn">{10 - form.Phone.length} more digit{10 - form.Phone.length !== 1 ? "s" : ""} needed</p>
            )}
          </div>
          <div className="mb-3">
            <label className="hw2-flabel">Email <span className="text-xs font-normal text-gray-400">(optional)</span></label>
            <input className="hw2-finput" type="email" placeholder="rahul@example.com"
              value={form.Email} onChange={(e) => setF("Email", e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="hw2-flabel">Your Area / City *</label>
            <div className="grid grid-cols-2 gap-2">
              <input className="hw2-finput" type="text" placeholder="Street / Area"
                value={form.Street} onChange={(e) => setF("Street", e.target.value)} />
              <CitySelect value={form.City} onChange={(city) => setF("City", city)} placeholder="Select city" />
            </div>
          </div>
          <div className="mb-4">
            <label className="hw2-flabel">Anything else? <span className="text-xs font-normal text-gray-400">(optional)</span></label>
            <textarea rows={2} maxLength={500} placeholder="Specific timing, languages, requirements…"
              value={form.Instructions} onChange={(e) => setF("Instructions", e.target.value)}
              className="hw2-textarea" />
          </div>
          <div className="hw2-summary">
            <p className="hw2-sum-head">📋 Your Request Summary</p>
            {[
              { k: "Service", v: form.ServiceLabel },
              form.ServiceFormat && { k: "Format", v: SERVICE_FORMATS.find((f) => f.id === form.ServiceFormat)?.label },
              form.HouseSize && { k: "Home", v: form.HouseSize.toUpperCase() },
              form.HouseSize && { k: "Household", v: `${form.PeopleAtHome} people` },
              form.Tasks.length > 0 && { k: "Tasks", v: form.Tasks.join(", ") },
              form.MealPref && { k: "Diet", v: form.MealPref },
              form.CuisinePref.length > 0 && { k: "Cuisine", v: form.CuisinePref.join(", ") },
              form.CookMembers && { k: "Family Members", v: form.CookMembers },
              form.HelperGender && { k: "Helper's Gender", v: form.HelperGender },
              form.ChildAge && { k: "Child Age", v: form.ChildAge },
              form.ChildDuties.length > 0 && { k: "Child Duties", v: form.ChildDuties.join(", ") },
              form.JapaDuties?.length > 0 && { k: "Japa Duties", v: form.JapaDuties.join(", ") },
              form.JapaMotherNeeds?.length > 0 && { k: "Mother Needs", v: form.JapaMotherNeeds.join(", ") },
              form.PatientAge && { k: "Patient Age", v: form.PatientAge },
              form.PatientGender && { k: "Patient", v: form.PatientGender },
              form.CareNeeded.length > 0 && { k: "Care Needed", v: form.CareNeeded.join(", ") },
              form.HomeType && { k: "Home Type", v: form.HomeType },
              form.VehicleType.length > 0 && { k: "Vehicle", v: form.VehicleType.join(", ") },
              form.Budget && {
                k: form.ServiceFormat === "Substitute" ? "Service Fee" : "Budget",
                v: form.ServiceFormat === "Substitute"
                  ? "₹5,000 placement fee · salary separate"
                  : BUDGETS.find((b) => b.id === form.Budget)?.label || form.Budget,
              },
              form.Urgency && { k: "Urgency", v: URGENCY_OPTIONS.find((o) => o.id === form.Urgency)?.label },
            ].filter(Boolean).map(({ k, v }) => (
              <div key={k} className="hw2-sum-row">
                <span className="hw2-sum-key">{k}</span>
                <span className="hw2-sum-val capitalize">{v}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (curKey === "plan") {
      const planList = Object.values(PLANS);
      const activePlan = planList.find((p) => p.id === activeTab) || planList[0];

      return (
        <div>
          <QHead q="How do you want to proceed?" hint="Browse plans and select the one that works for you" />

          {/* Tab Navbar */}
          <div style={{ display: "flex", gap: 6, marginBottom: 14, background: "#F5F0ED", borderRadius: 12, padding: 4 }}>
            {planList.map((plan) => {
              const isActive = activePlan.id === plan.id;
              return (
                <button key={plan.id} type="button" onClick={() => setActiveTab(plan.id)}
                  style={{
                    flex: 1, padding: "7px 4px", borderRadius: 9, border: "none",
                    cursor: "pointer", transition: "all .2s",
                    background: isActive ? "#fff" : "transparent",
                    boxShadow: isActive ? "0 1px 6px rgba(0,0,0,0.10)" : "none",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: isActive ? plan.color : "#9ca3af", lineHeight: 1.2 }}>
                    {plan.name.split(" ")[0]}
                  </div>
                  {plan.amount > 0
                    ? <div style={{ fontSize: 10, fontWeight: 600, color: isActive ? plan.color : "#bbb", marginTop: 1 }}>₹{plan.amount.toLocaleString()}</div>
                    : <div style={{ fontSize: 10, fontWeight: 600, color: isActive ? "#9ca3af" : "#bbb", marginTop: 1 }}>Free</div>
                  }
                </button>
              );
            })}
          </div>

          {/* Active Plan Detail Card */}
          {(() => {
            const plan = activePlan;
            const total = plan.amount + plan.gst;
            const isSelected = form.PlanType === plan.id;
            const PlanIcon = ICON_MAP["check"];
            return (
              <div style={{ border: `2px solid ${isSelected ? plan.color : "#EBEBEB"}`, borderRadius: 16, padding: "14px 15px", background: isSelected ? plan.accentLight : "#fff", transition: "all .22s" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10, marginBottom: 4 }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: plan.badgeBg, flexShrink: 0 }} />
                      <span style={{ fontSize: 15, fontWeight: 800, color: plan.color, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{plan.name}</span>
                      {plan.recommended && (
                        <span style={{ fontSize: 9, fontWeight: 800, color: "#fff", borderRadius: 20, padding: "2px 8px", background: plan.badgeBg, letterSpacing: ".04em", textTransform: "uppercase" }}>
                          Recommended
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: 11, color: "#9ca3af", fontWeight: 500, marginTop: 3, paddingLeft: 15 }}>
                      {plan.tag} · {plan.subtitle}
                    </div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <span style={{ display: "block", fontSize: 22, fontWeight: 800, color: plan.color, fontFamily: "'Fraunces', serif", lineHeight: 1 }}>
                      {plan.amount === 0 ? "Free" : `₹${plan.amount.toLocaleString()}`}
                    </span>
                    {plan.amount > 0 && <span style={{ fontSize: 10, color: "#9ca3af", fontWeight: 500 }}>+ ₹{plan.gst} GST</span>}
                  </div>
                </div>

                {plan.amount > 0 && (
                  <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
                    <span style={{ fontSize: 10.5, fontWeight: 800, border: `1.5px solid ${plan.borderColor}`, borderRadius: 8, padding: "2px 9px", color: plan.color, background: "rgba(255,255,255,0.7)" }}>
                      ₹{total.toLocaleString()} total
                    </span>
                  </div>
                )}

                <div style={{ height: 1, background: isSelected ? plan.borderColor : "#F0F0F0", marginBottom: 12 }} />

                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 9 }}>
                  {plan.inclusions.map((item, i) => {
                    const IncIcon = ICON_MAP[item.icon] || Check;
                    return (
                      <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                        <span style={{ width: 27, height: 27, borderRadius: 8, background: isSelected ? "rgba(255,255,255,0.65)" : plan.accentLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                          <IncIcon size={11} color={plan.color} />
                        </span>
                        <div style={{ display: "flex", flexDirection: "column", gap: 1, flex: 1, minWidth: 0 }}>
                          <span style={{ fontSize: 12.5, fontWeight: 700, color: "#1a1a2e", lineHeight: 1.3, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{item.label}</span>
                          <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 500, lineHeight: 1.4 }}>{item.desc}</span>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                {plan.bonus && (
                  <div style={{ display: "flex", alignItems: "center", gap: 8, border: `1.5px solid ${plan.borderColor}`, borderRadius: 10, padding: "7px 12px", fontSize: 12, fontWeight: 700, color: plan.color, background: isSelected ? "rgba(255,255,255,0.55)" : plan.accentLight, marginBottom: 12, fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.4 }}>
                    <Gift size={11} color={plan.color} style={{ flexShrink: 0 }} />
                    <span>{plan.bonus}</span>
                  </div>
                )}

                <button type="button" onClick={() => setF("PlanType", plan.id)}
                  style={{ width: "100%", padding: "10px", borderRadius: 11, border: `2px solid ${isSelected ? plan.color : "#E5E2DE"}`, background: isSelected ? plan.badgeBg : "#fff", color: isSelected ? "#fff" : plan.color, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 800, cursor: "pointer", transition: "all .2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
                  {isSelected
                    ? <><Check size={12} /> Selected — tap Continue below</>
                    : <>Select {plan.name}</>
                  }
                </button>
              </div>
            );
          })()}

          {form.PlanType === "Priority" && (
            <div className="hw2-pbt-note mt-3 anim-fade-up" style={{ background: "#FFF7F4", borderColor: "#F5D8CF", color: "#7C2D12" }}>
              <p><Zap size={12} style={{ marginRight: 6, display: "inline" }} />
                <strong>You'll be redirected to a secure Cashfree payment page.</strong> Profiles shared within <strong>24 hours</strong>.
              </p>
            </div>
          )}
          {form.PlanType === "Commitment" && (
            <div className="hw2-pbt-note mt-3 anim-fade-up">
              <p><CircleCheck size={12} style={{ marginRight: 6, display: "inline" }} />
                <strong>Pay ₹{(PLANS.commitment.amount + PLANS.commitment.gst).toLocaleString()}</strong> now. Profiles within <strong>3 working days</strong>.
              </p>
              <p style={{ marginTop: 5 }}>
                <Phone size={12} style={{ marginRight: 6, display: "inline" }} />You'll be redirected to a secure Cashfree payment page.
              </p>
            </div>
          )}
          {form.PlanType === "No Pay" && (
            <div className="hw2-pbt-note mt-3 anim-fade-up" style={{ background: "#F9FAFB", borderColor: "#E5E7EB", color: "#6B7280" }}>
              <p>⚠️ Without payment there is <strong>no priority, no guaranteed timeline, and no replacement support</strong>.</p>
            </div>
          )}

          {submitError && (
            <div className="anim-fade-up" style={{ marginTop: 12, padding: "10px 14px", background: "#FEF2F2", border: "1.5px solid #FECACA", borderRadius: 10, color: "#991B1B", fontSize: 12, fontWeight: 600, lineHeight: 1.5 }}>
              ⚠ {submitError}
            </div>
          )}
        </div>
      );
    }

    if (curKey === "done") {
      const isNoPay = form.PlanType === "No Pay";
      const bg = isNoPay ? "linear-gradient(135deg,#9CA3AF,#6B7280)" : "linear-gradient(135deg,#EC5F36,#D84E28)";
      return (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          {/* Spring pop animation via CSS — no framer-motion needed */}
          <div className="anim-spring-pop w-20 h-20 rounded-full flex items-center justify-center mb-5"
            style={{ background: bg, boxShadow: "0 10px 36px rgba(0,0,0,.20)" }}>
            <Check size={36} color="#fff" strokeWidth={3} />
          </div>
          <div className="anim-fade-up" style={{ animationDelay: "0.25s" }}>
            <h3 className="hw2-display text-xl font-bold text-gray-900 mb-2">
              Profiles Sent Successfully ✅
            </h3>
            <p className="text-sm text-gray-500 max-w-[280px] mx-auto leading-relaxed mb-1">
              We've shared matching helper profiles on your phone
            </p>
            <p className="font-bold text-gray-900 text-base mb-1">+91 {form.Phone}</p>
            {form.Email && <p className="text-xs text-gray-400 mb-3">{form.Email}</p>}
            <p className="text-xs text-gray-500 mb-3">Please check your WhatsApp for details</p>
            <div className="hw2-done-plan-badge" style={{ background: isNoPay ? "#F9FAFB" : "#FFF2EE", color: isNoPay ? "#6B7280" : "#EC5F36", borderColor: isNoPay ? "#E5E7EB" : "#F5D8CF" }}>
              {isNoPay
                ? <>Basic Access — Profiles Shared</>
                : <><Zap size={12} style={{ marginRight: 5, display: "inline" }} />Priority Profiles Delivered</>
              }
            </div>
            <p className="text-[11px] text-gray-400 mt-3">
              Didn't receive it? Our team may reach out shortly.
            </p>
          </div>
        </div>
      );
    }

    return null;
  };

  const renderProgress = () => {
    if (isDone) return null;
    const hideLabels = progKeys.length > 6;

    return (
      <div className="mb-5 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <h2 className="hw2-display text-lg font-extrabold text-gray-900 leading-tight">
            Start Here to Hire Trusted Help Instantly
          </h2>
          {form.ServiceType && (
            <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full sm-hidden"
              style={{ background: "#FFF2EE", color: "#EC5F36", border: "1.5px solid #F5D8CF", fontSize: "0.65rem" }}>
              {SERVICES.find((s) => s.id === form.ServiceType)?.emoji}{" "}
              {SERVICES.find((s) => s.id === form.ServiceType)?.label}
            </span>
          )}
        </div>

        <div className="relative">
          <div className="absolute h-[2px] bg-gray-100 rounded-full"
            style={{ top: hideLabels ? 12 : 13, left: `calc(${100 / (2 * progKeys.length)}%)`, right: `calc(${100 / (2 * progKeys.length)}%)`, zIndex: 0 }}>
            {/* CSS animated progress bar — replaces motion.div */}
            <div
              className="h-full origin-left rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${progPct}%`, background: "linear-gradient(90deg,#EC5F36,#D84E28)" }}
            />
          </div>

          <div className="relative flex justify-between" style={{ zIndex: 1 }}>
            {progKeys.map((key, i) => {
              const meta = PROG_META[key] ?? { label: key, icon: Briefcase };
              const Icon = meta.icon;
              const done = progIdx > i;
              const active = progIdx === i;
              return (
                <div key={`${key}-${i}`} className="flex flex-col items-center gap-1 flex-1 min-w-0">
                  {/* CSS scale on active — replaces motion.div animate scale */}
                  <div
                    className="flex items-center justify-center flex-shrink-0 rounded-full border-2 transition-all duration-300"
                    style={{
                      width: hideLabels ? 24 : 28,
                      height: hideLabels ? 24 : 28,
                      background: done ? "#EC5F36" : active ? "#FFF2EE" : "#fff",
                      borderColor: done || active ? "#EC5F36" : "#E5E2DE",
                      boxShadow: active ? "0 0 0 4px rgba(236,95,54,0.15)" : "none",
                      transform: active ? "scale(1.18)" : "scale(1)",
                    }}>
                    {done
                      ? <Check size={10} color="#fff" strokeWidth={3} />
                      : <Icon size={hideLabels ? 10 : 12} color={active ? "#EC5F36" : "#ccc"} strokeWidth={1.8} />
                    }
                  </div>
                  {!hideLabels && (
                    <span className="text-[8px] font-semibold truncate max-w-[36px] text-center leading-none"
                      style={{ color: active ? "#EC5F36" : done ? "#EC5F36" : "#ccc" }}>
                      {meta.label}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderFooter = () => {
    if (isDone) return null;
    const showBack = stepIdx > 0;
    const isPlan = curKey === "plan";
    if (!showBack && !showContinue) return null;

    const valid = isValid();

    const planBtnLabel = () => {
      if (!form.PlanType) return "Select a Plan to Continue";
      if (paymentStage === "creating_order") return <><Loader2 size={13} className="animate-spin mr-1.5 inline" />Creating order…</>;
      if (paymentStage === "redirecting") return <><Loader2 size={13} className="animate-spin mr-1.5 inline" />Redirecting to payment…</>;
      if (form.PlanType === "Priority") return <><Zap size={13} className="inline mr-1.5" />Pay ₹{(PLANS.priority.amount + PLANS.priority.gst).toLocaleString()} — Continue</>;
      if (form.PlanType === "Commitment") return <><Zap size={13} className="inline mr-1.5" />Pay ₹{(PLANS.commitment.amount + PLANS.commitment.gst).toLocaleString()} — Continue</>;
      if (form.PlanType === "No Pay") return <>Continue Without Paying →</>;
      return "Select a Plan to Continue";
    };

    return (
      <div className="pt-3 mt-3 flex items-center justify-between gap-3 flex-shrink-0"
        style={{ borderTop: "1.5px solid #F0EBE8" }}>
        {showBack ? (
          <button type="button" disabled={planSubmitting} onClick={goBack}
            className="flex items-center gap-1.5 text-xs font-bold transition-all duration-150 px-3 py-2.5 rounded-xl flex-shrink-0"
            style={{ color: planSubmitting ? "#ccc" : "#5B6475", background: planSubmitting ? "transparent" : "#F5F0ED", border: "1.5px solid #EDE8E4", cursor: planSubmitting ? "not-allowed" : "pointer" }}>
            <ArrowLeft size={13} strokeWidth={2.5} /> Back
          </button>
        ) : <div />}

        {showContinue && (
          <button type="button"
            disabled={!valid || planSubmitting}
            onClick={isPlan ? () => handlePlanSubmit(form.PlanType) : goNext}
            className="flex items-center justify-center gap-2 text-sm font-bold transition-all duration-200 rounded-xl"
            style={{
              flex: 1,
              maxWidth: showBack ? "68%" : "100%",
              padding: "11px 20px",
              background: !valid || planSubmitting ? "#F0EDE9" : "linear-gradient(135deg,#EC5F36,#D84E28)",
              color: !valid || planSubmitting ? "#C4B8B2" : "#fff",
              cursor: !valid || planSubmitting ? "not-allowed" : "pointer",
              boxShadow: valid && !planSubmitting ? "0 4px 14px rgba(236,95,54,0.35)" : "none",
              border: "none",
            }}>
            {isPlan ? planBtnLabel() : (
              curKey === "contact" && !ENABLE_PAYMENT ? (
                planSubmitting
                  ? <><Loader2 size={13} className="animate-spin mr-1.5 inline" />Submitting…</>
                  : <>Submit</>
              ) : (
                <>
                  Continue
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </>
              )
            )}
          </button>
        )}
      </div>
    );
  };

  const Shell = (
    <div className="hw2-root flex flex-col bg-white rounded-3xl p-5 sm:p-6 w-full max-w-[35rem]" style={{ height: "30rem" }}>
      {renderProgress()}
      <div ref={bodyRef} className="hw2-body overflow-y-auto overflow-x-hidden" style={{ flex: 1 }}>
        {/* CSS direction-aware slide animation — replaces AnimatePresence + motion.div */}
        <div
          key={`${form.ServiceType || "svc"}-${stepIdx}`}
          className={dir > 0 ? curKey == "contact" ? "" : "step-enter-right" : "step-enter-left"}>
          {renderStep()}
        </div>
      </div>
      {renderFooter()}
    </div>
  );

  if (asModal) {
    if (!isOpen) return null;
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        onClick={(e) => { if (e.target === e.currentTarget) { resetWizard(); onClose?.(); } }}>
        {/* CSS modal enter animation — replaces motion.div */}
        <div className="relative w-full max-w-xl anim-status-enter">
          {onClose && (
            <button type="button" aria-label="Close"
              onClick={() => { resetWizard(); onClose?.(); }}
              className="absolute -top-3 -right-3 bg-white shadow-md rounded-full w-9 h-9 flex items-center justify-center hover:bg-gray-50 transition"
              style={{ border: "1.5px solid #F0EBE8" }}>
              <X size={17} strokeWidth={2.5} />
            </button>
          )}
          {Shell}
        </div>
      </div>
    );
  }

  return Shell;
}