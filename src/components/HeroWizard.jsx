import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CitySelect from "./CitySelect";
import { Check, ArrowLeft, X, CheckCircle2, Minus, Plus, Sparkles, Briefcase } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt, faIdCard, faUserCheck, faHeadset, faHandshake, faRotate,
  faGaugeHigh, faCreditCard, faAddressCard, faFilter, faBullseye,
  faClock, faGift, faCheck, faCircleCheck, faPhone,
  faUsers, faBan, faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import {
  SERVICES, SERVICE_FORMATS, GENDER_OPTIONS_DATA, TASKS, HOUSE_SIZES,
  PETS_OPTIONS, MEAL_PREFS, MEALS_NEEDED, CUISINES, CHILD_DUTIES,
  CARE_NEEDED, VEHICLE_TYPES, MANAGER_DUTIES, HOME_TYPES, MULTI_SERVICES,
  BUDGETS, SUBSTITUTE_BUDGETS, URGENCY_OPTIONS, PLANS,
  SERVICE_FLOWS, DEFAULT_FLOW, PROG_META, INIT,
} from "./wizardData";

const API_BASE = import.meta.env.VITE_REACT_APP_API;

const FA_ICON_MAP = {
  "bolt": faBolt, "id-card": faIdCard, "user-check": faUserCheck,
  "headset": faHeadset, "handshake": faHandshake, "rotate": faRotate,
  "gauge-high": faGaugeHigh, "credit-card": faCreditCard, "address-card": faAddressCard,
  "filter": faFilter, "bullseye": faBullseye, "clock": faClock,
  "gift": faGift, "check": faCheck, "circle-check": faCircleCheck,
  "phone": faPhone, "users": faUsers, "ban": faBan,
};

const createCashfreeOrder = async ({ plan, customer, zohoFields }) => {
  const res = await fetch(`${API_BASE}/create-order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ plan, customer, zohoFields }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Order creation failed");
  return data;
};

const submitNoPay = async (zohoFields) => {
  const res = await fetch(`${API_BASE}/submit-nopay`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ zohoFields }),
  });
  return res.json();
};

export default function HeroWizard({ asModal = false, isOpen = true, onClose, onSubmit }) {
  const [stepIdx, setStepIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const [form, setForm] = useState({ ...INIT });
  const [planSubmitting, setPlanSubmitting] = useState(false);
  const [paymentStage, setPaymentStage] = useState("idle");
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = 0;
  }, [stepIdx, form.ServiceType]);

  // Advance to step 1 when a service is selected — avoids setTimeout race condition
  const prevService = useRef("");
  useEffect(() => {
    if (form.ServiceType && form.ServiceType !== prevService.current) {
      prevService.current = form.ServiceType;
      setDir(1);
      setStepIdx(1);
    }
  }, [form.ServiceType]);

  const steps = form.ServiceType ? (SERVICE_FLOWS[form.ServiceType] || DEFAULT_FLOW) : DEFAULT_FLOW;
  const curKey = steps[stepIdx] ?? "service";
  const isDone = curKey === "done";
  const progKeys = steps.filter((k) => k !== "done");
  const progIdx = isDone ? progKeys.length : progKeys.indexOf(curKey);
  const progPct = progKeys.length <= 1 ? 0 : Math.round((Math.max(0, progIdx) / (progKeys.length - 1)) * 100);

  const setF = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const toggleArr = (k, v) => setForm((f) => ({ ...f, [k]: f[k].includes(v) ? f[k].filter((x) => x !== v) : [...f[k], v] }));
  const goNext = () => { setDir(1); setStepIdx((i) => Math.min(i + 1, steps.length - 1)); };
  const goBack = () => { setDir(-1); setStepIdx((i) => Math.max(i - 1, 0)); };
  const after = (ms = 220) => setTimeout(goNext, ms);

  const resetWizard = () => {
    setStepIdx(0); setDir(1); setForm({ ...INIT });
    setPlanSubmitting(false); setPaymentStage("idle");
  };

  const isValid = () => {
    switch (curKey) {
      case "service": return !!form.ServiceType;
      case "tasks": return form.Tasks.length > 0;
      case "housesize": return !!form.HouseSize;
      case "pets": return !!form.PetsAtHome;
      case "mealpref": return !!form.MealPref;
      case "mealtime": return form.MealsNeeded.length > 0;
      case "cuisine": return form.CuisinePref.length > 0;
      case "childage": return !!form.ChildAge.trim();
      case "childduties": return form.ChildDuties.length > 0;
      case "patientage": return !!form.PatientAge.trim();
      case "patientgender": return !!form.PatientGender;
      case "careneeded": return form.CareNeeded.length > 0;
      case "vehicletype": return form.VehicleType.length > 0;
      case "managerduties": return form.ManagerDuties.length > 0;
      case "hometype": return !!form.HomeType;
      case "multiservices": return form.MultiServices.length > 0;
      case "urgency": return !!form.Urgency;
      case "budget": return !!form.Budget;
      case "contact":
        return form.FirstName.trim() !== "" && form.LastName.trim() !== "" &&
          form.Phone.length === 10 && /^[6-9]/.test(form.Phone) &&
          form.Street.trim() !== "" && form.City.trim() !== "" &&
          /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(form.PAN.toUpperCase());
      case "plan": return !!form.PlanType;
      default: return true;
    }
  };

  const CONT_KEYS = new Set([
    "tasks", "mealtime", "cuisine", "childduties", "careneeded", "vehicletype",
    "managerduties", "multiservices", "contact", "housesize", "mealpref", "urgency",
    "budget", "patientage", "childage", "patientgender", "hometype", "plan",
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
      PAN_Number: f.PAN,
      GST_Number: f.GST,
      Service_Type: f.ServiceType,
      Service_Label: f.ServiceLabel,
      Service_Format: f.ServiceFormat,
      Tasks_Needed: f.Tasks.join(", "),
      House_Size: f.HouseSize,
      People_At_Home: String(f.PeopleAtHome),
      Pets_At_Home: f.PetsAtHome,
      Meal_Preferences: f.MealPref,
      Meals_Needed: f.MealsNeeded.join(", "),
      Cuisine_Preference: f.CuisinePref.join(", "),
      Child_Age: f.ChildAge,
      Child_Duties: f.ChildDuties.join(", "),
      Patient_Age: f.PatientAge,
      Patient_Gender: f.PatientGender,
      Care_Needed: f.CareNeeded.join(", "),
      Vehicle_Type: f.VehicleType.join(", "),
      Manager_Duties: f.ManagerDuties.join(", "),
      Home_Type: f.HomeType,
      Multi_Services: f.MultiServices.join(", "),
      Monthly_Budget: f.Budget,
      Urgency: f.Urgency,
      Special_Instructions: f.Instructions,
      Plan_Type: f.PlanType,
      Payment_Status: f.PaymentStatus,
    };
  }

  const handlePlanSubmit = async (planType) => {
    if (!planType || planSubmitting) return;
    setF("PlanType", planType);
    setPlanSubmitting(true);

    if (planType === "priority" || planType === "commitment") {
      try {
        setPaymentStage("creating_order");
        const zohoFields = buildZohoFields({ ...form, PlanType: planType });
        const order = await createCashfreeOrder({
          plan: planType,
          customer: {
            name: `${form.FirstName} ${form.LastName}`.trim(),
            email: form.Email || `${form.Phone}@noemail.com`,
            phone: `91${form.Phone}`,
          },
          zohoFields,
        });
        sessionStorage.setItem("dp_order_id", order.order_id);
        sessionStorage.setItem("dp_plan", planType);
        sessionStorage.setItem("dp_zoho_fields", JSON.stringify(zohoFields));
        sessionStorage.setItem("dp_customer_phone", form.Phone);
        setPaymentStage("redirecting");
        const { load } = await import("@cashfreepayments/cashfree-js");
        const cashfree = await load({ mode: "sandbox" });
        await cashfree.checkout({ paymentSessionId: order.payment_session_id, redirectTarget: "_self" });
      } catch (err) {
        console.error("Cashfree error:", err);
        setPaymentStage("idle");
        setPlanSubmitting(false);
        alert(`Payment failed to initialise: ${err.message}. Please try again.`);
      }
      return;
    }

    if (planType === "nopay") {
      const zohoFields = buildZohoFields({ ...form, PlanType: "nopay", PaymentStatus: "No Payment — Basic Access" });
      try {
        const result = await submitNoPay(zohoFields);
        onSubmit?.(zohoFields, result);
      } catch (err) {
        console.error("Submit error:", err);
      }
      setPlanSubmitting(false);
      setStepIdx(steps.indexOf("done"));
    }
  };

  const QHead = ({ q, hint }) => (
    <div className="mb-4">
      <p className="hw2-q">{q}</p>
      {hint && <p className="hw2-hint">{hint}</p>}
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
              onClick={() => setForm({ ...INIT, ServiceType: svc.id, ServiceLabel: svc.label })} />
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
                style={{ background: isCS ? "#F9F9F9" : sel ? "#EC5F36" : "#fff", borderColor: isCS ? "#E5E2DE" : sel ? "#EC5F36" : "#E5E2DE", opacity: isCS ? 0.6 : 1, cursor: isCS ? "not-allowed" : "pointer" }}>
                <div className="hw2-pill-ico" style={{ background: isCS ? "#F0F0F0" : sel ? "rgba(255,255,255,0.22)" : "#FFF2EE" }}>
                  <opt.icon size={16} color={isCS ? "#bbb" : sel ? "#fff" : "#EC5F36"} strokeWidth={1.8} />
                </div>
                <div className="hw2-pill-txt">
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <span className="hw2-pill-label" style={{ color: isCS ? "#aaa" : sel ? "#fff" : "#1a1a2e" }}>{opt.label}</span>
                    {isCS && <span style={{ fontSize: 9, fontWeight: 800, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", borderRadius: 20, padding: "2px 8px" }}>Coming Soon</span>}
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

    if (curKey === "tasks") return <div><QHead q="Which tasks are needed?" hint="Select all that apply" /><div className="grid grid-cols-3 gap-2.5">{TASKS.map((t) => <ImgChip key={t.id} label={t.label} image={t.image} selected={form.Tasks.includes(t.id)} onClick={() => toggleArr("Tasks", t.id)} />)}</div>{form.Tasks.length === 0 && <p className="hw2-warn mt-2">Pick at least one task</p>}</div>;
    if (curKey === "housesize") return <div><QHead q="What's your home size?" hint="Helps us estimate effort & staff" /><div className="grid grid-cols-3 gap-2.5">{HOUSE_SIZES.map((h) => <ImgChip key={h.id} label={h.label} image={h.image} selected={form.HouseSize === h.id} onClick={() => setF("HouseSize", h.id)} />)}</div><div className="mt-3"><Stepper label="People at home" value={form.PeopleAtHome} onDec={() => setF("PeopleAtHome", Math.max(1, form.PeopleAtHome - 1))} onInc={() => setF("PeopleAtHome", Math.min(20, form.PeopleAtHome + 1))} /></div></div>;
    if (curKey === "pets") return <div><QHead q="Do you have pets at home?" hint="Some helpers prefer no pets" /><div className="grid grid-cols-2 gap-3 mt-1">{PETS_OPTIONS.map((o) => <ImgChip key={o.id} label={o.label} image={o.image} selected={form.PetsAtHome === o.id} onClick={() => { setF("PetsAtHome", o.id); after(); }} />)}</div></div>;
    if (curKey === "mealpref") return <div><QHead q="Dietary preference?" hint="Helps match the right cook" /><div className="grid grid-cols-3 gap-2.5">{MEAL_PREFS.map((m) => <ImgChip key={m.id} label={m.label} image={m.image} selected={form.MealPref === m.id} onClick={() => { setF("MealPref", m.id); after(); }} />)}</div></div>;
    if (curKey === "mealtime") return <div><QHead q="Which meals do you need cooked?" hint="Select all that apply" /><div className="grid grid-cols-2 gap-2.5">{MEALS_NEEDED.map((m) => <ImgChip key={m.id} label={m.label} image={m.image} selected={form.MealsNeeded.includes(m.id)} onClick={() => toggleArr("MealsNeeded", m.id)} />)}</div>{form.MealsNeeded.length === 0 && <p className="hw2-warn mt-2">Pick at least one</p>}</div>;
    if (curKey === "cuisine") return <div><QHead q="Cuisine preference?" /><div className="grid grid-cols-3 gap-2.5">{CUISINES.map((c) => <ImgChip key={c.id} label={c.label} image={c.image} selected={form.CuisinePref.includes(c.id)} onClick={() => toggleArr("CuisinePref", c.id)} />)}</div>{form.CuisinePref.length === 0 && <p className="hw2-warn mt-2">Pick at least one</p>}</div>;
    if (curKey === "childage") return <div><QHead q="How old is the child?" /><div className="hw2-age-input-wrap"><input className="hw2-finput hw2-age-input" type="text" placeholder="e.g. 2 years, 8 months…" value={form.ChildAge} autoFocus onChange={(e) => setF("ChildAge", e.target.value)} /><p className="hw2-age-hint">Type freely, e.g. "3 years"</p></div></div>;
    if (curKey === "childduties") return <div><QHead q="What duties are needed?" hint="Select all that apply" /><div className="grid grid-cols-3 gap-2.5">{CHILD_DUTIES.map((d) => <ImgChip key={d.id} label={d.label} image={d.image} selected={form.ChildDuties.includes(d.id)} onClick={() => toggleArr("ChildDuties", d.id)} />)}</div>{form.ChildDuties.length === 0 && <p className="hw2-warn mt-2">Select at least one</p>}</div>;
    if (curKey === "patientage") return <div><QHead q="How old is the patient?" /><div className="hw2-age-input-wrap"><input className="hw2-finput hw2-age-input" type="text" placeholder="e.g. 68 years…" value={form.PatientAge} autoFocus onChange={(e) => setF("PatientAge", e.target.value)} /></div></div>;
    if (curKey === "patientgender") return <div><QHead q="Patient's gender?" /><div className="grid grid-cols-2 gap-3">{GENDER_OPTIONS_DATA.map((g) => <GenderImgCard key={g.id} opt={g} selected={form.PatientGender === g.id} onClick={() => { setF("PatientGender", g.id); after(); }} />)}</div></div>;
    if (curKey === "careneeded") return <div><QHead q="What care is required?" hint="Select all that apply" /><div className="grid grid-cols-3 gap-2.5">{CARE_NEEDED.map((c) => <ImgChip key={c.id} label={c.label} image={c.image} selected={form.CareNeeded.includes(c.id)} onClick={() => toggleArr("CareNeeded", c.id)} />)}</div>{form.CareNeeded.length === 0 && <p className="hw2-warn mt-2">Select at least one</p>}</div>;
    if (curKey === "vehicletype") return <div><QHead q="What vehicle(s) will the driver operate?" hint="Select all that apply" /><div className="grid grid-cols-2 gap-2.5">{VEHICLE_TYPES.map((v) => <ImgChip key={v.id} label={v.label} image={v.image} selected={form.VehicleType.includes(v.id)} onClick={() => toggleArr("VehicleType", v.id)} />)}</div>{form.VehicleType.length === 0 && <p className="hw2-warn mt-2">Select at least one</p>}</div>;
    if (curKey === "managerduties") return <div><QHead q="What responsibilities are needed?" hint="Select all that apply" /><div className="grid grid-cols-3 gap-2.5">{MANAGER_DUTIES.map((d) => <ImgChip key={d.id} label={d.label} image={d.image} selected={form.ManagerDuties.includes(d.id)} onClick={() => toggleArr("ManagerDuties", d.id)} />)}</div>{form.ManagerDuties.length === 0 && <p className="hw2-warn mt-2">Select at least one</p>}</div>;
    if (curKey === "hometype") return <div><QHead q="What type of home?" /><div className="grid grid-cols-3 gap-2.5">{HOME_TYPES.map((h) => <ImgChip key={h.id} label={h.label} image={h.image} selected={form.HomeType === h.id} onClick={() => { setF("HomeType", h.id); after(); }} />)}</div></div>;
    if (curKey === "multiservices") return <div><QHead q="Which services do you need?" hint="Select all that apply" /><div className="grid grid-cols-3 gap-2.5">{MULTI_SERVICES.map((s) => <ImgChip key={s.id} label={s.label} image={s.image} selected={form.MultiServices.includes(s.id)} onClick={() => toggleArr("MultiServices", s.id)} />)}</div>{form.MultiServices.length === 0 && <p className="hw2-warn mt-2">Select at least one</p>}</div>;
    if (curKey === "urgency") return <div><QHead q="How soon do you need placement?" /><div className="flex flex-col gap-2">{URGENCY_OPTIONS.map((o) => <Pill key={o.id} icon={o.icon} label={o.label} desc={o.desc} selected={form.Urgency === o.id} onClick={() => { setF("Urgency", o.id); after(); }} />)}</div></div>;

    if (curKey === "budget") {
      if (form.ServiceFormat === "Substitute") return (
        <div>
          <QHead q="Substitute Service Pricing" hint="Fixed rate — no hidden charges" />
          <div className="flex flex-col gap-3">
            {SUBSTITUTE_BUDGETS.map((b) => (
              <button key={b.id} type="button" onClick={() => { setF("Budget", b.id); after(); }} className="hw2-sub-budget-card"
                style={{ background: form.Budget === b.id ? "linear-gradient(135deg,#EC5F36,#D84E28)" : "#fff", borderColor: form.Budget === b.id ? "#EC5F36" : "#E5E2DE" }}>
                <div className="hw2-sub-budget-inner">
                  <div className="hw2-sub-budget-left">
                    <span className="hw2-sub-budget-badge" style={{ background: form.Budget === b.id ? "rgba(255,255,255,0.22)" : "#FFF2EE", color: form.Budget === b.id ? "#fff" : "#EC5F36" }}>{b.badge}</span>
                    <span className="hw2-sub-budget-label" style={{ color: form.Budget === b.id ? "#fff" : "#1a1a2e" }}>{b.label}</span>
                    <span className="hw2-sub-budget-desc" style={{ color: form.Budget === b.id ? "rgba(255,255,255,0.78)" : "#9ca3af" }}>{b.desc}</span>
                  </div>
                  {form.Budget === b.id && <Check size={20} strokeWidth={2.5} color="#fff" />}
                </div>
              </button>
            ))}
          </div>
        </div>
      );
      return (
        <div>
          <QHead q="What's your monthly budget?" hint="We'll match staff within your budget" />
          <div className="flex flex-col gap-2">
            {BUDGETS.map((b) => (
              <button key={b.id} type="button" onClick={() => { setF("Budget", b.id); after(); }} className="hw2-budget-row"
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
      const panOk = /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(form.PAN);
      return (
        <div>
          <QHead q="Almost there! 🎉" hint="Share your details — our team will call you within 2 hours" />

          <div className="grid grid-cols-2 gap-2.5 mb-3">
            <div>
              <label className="hw2-flabel">First Name *</label>
              <input className="hw2-finput" type="text" placeholder="Rahul" value={form.FirstName} onChange={(e) => setF("FirstName", e.target.value)} />
            </div>
            <div>
              <label className="hw2-flabel">Last Name *</label>
              <input className="hw2-finput" type="text" placeholder="Sharma" value={form.LastName} onChange={(e) => setF("LastName", e.target.value)} />
            </div>
          </div>

          <div className="mb-3">
            <label className="hw2-flabel">Phone * <span className="text-xs font-normal text-gray-400">(we'll call on this)</span></label>
            <div className="hw2-phone-wrap" style={{ borderColor: phoneOk ? "#16a34a" : undefined }}>
              <div className="hw2-phone-pre">+91</div>
              <input type="tel" inputMode="numeric" maxLength={10} className="hw2-phone-inp" placeholder="10-digit mobile" value={form.Phone} autoFocus
                onChange={(e) => setF("Phone", e.target.value.replace(/\D/g, "").slice(0, 10))} />
              {phoneOk && <CheckCircle2 size={18} color="#16a34a" strokeWidth={2} className="mr-3 flex-shrink-0" />}
            </div>
            {form.Phone.length > 0 && form.Phone.length < 10 && <p className="hw2-warn">{10 - form.Phone.length} more digit{10 - form.Phone.length !== 1 ? "s" : ""} needed</p>}
          </div>

          <div className="mb-3">
            <label className="hw2-flabel">Email <span className="text-xs font-normal text-gray-400">(optional)</span></label>
            <input className="hw2-finput" type="email" placeholder="rahul@example.com" value={form.Email} onChange={(e) => setF("Email", e.target.value)} />
          </div>

          <div className="mb-3">
            <label className="hw2-flabel">Your Area / City *</label>
            <div className="grid grid-cols-2 gap-2">
              <input className="hw2-finput" type="text" placeholder="Street / Area" value={form.Street} onChange={(e) => setF("Street", e.target.value)} />
              <CitySelect value={form.City} onChange={(city) => setF("City", city)} placeholder="Select city" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 mb-3">
            <div>
              <label className="hw2-flabel">PAN Card *</label>
              <div style={{ position: "relative" }}>
                <input className="hw2-finput" type="text" placeholder="ABCDE1234F" maxLength={10}
                  value={form.PAN}
                  style={{ borderColor: form.PAN.length === 10 ? (panOk ? "#16a34a" : "#EC5F36") : undefined, paddingRight: form.PAN.length === 10 ? 36 : undefined }}
                  onChange={(e) => setF("PAN", e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10))} />
                {form.PAN.length === 10 && (
                  <span style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center" }}>
                    {panOk
                      ? <CheckCircle2 size={15} color="#16a34a" strokeWidth={2} />
                      : <span style={{ fontSize: 10, color: "#EC5F36", fontWeight: 700 }}>Invalid</span>}
                  </span>
                )}
              </div>
            </div>
            <div>
              <label className="hw2-flabel">GST No. <span className="text-xs font-normal text-gray-400">(optional)</span></label>
              <input className="hw2-finput" type="text" placeholder="22ABCDE1234F1Z5" maxLength={15}
                value={form.GST}
                onChange={(e) => setF("GST", e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 15))} />
            </div>
          </div>

          <div className="mb-4">
            <label className="hw2-flabel">Anything else? <span className="text-xs font-normal text-gray-400">(optional)</span></label>
            <textarea rows={2} maxLength={500} placeholder="Specific timing, languages, requirements…" value={form.Instructions}
              onChange={(e) => setF("Instructions", e.target.value)} className="hw2-textarea" />
          </div>

          <div className="hw2-summary">
            <p className="hw2-sum-head">📋 Your Request Summary</p>
            {[
              { k: "Service", v: form.ServiceLabel },
              form.ServiceFormat && { k: "Format", v: SERVICE_FORMATS.find((f) => f.id === form.ServiceFormat)?.label },
              form.HouseSize && { k: "Home", v: form.HouseSize.toUpperCase() },
              { k: "Household", v: `${form.PeopleAtHome} people` },
              form.MealPref && { k: "Diet", v: form.MealPref },
              form.ChildAge && { k: "Child Age", v: form.ChildAge },
              form.PatientAge && { k: "Patient", v: form.PatientAge },
              form.Budget && { k: "Budget", v: BUDGETS.find((b) => b.id === form.Budget)?.label },
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

    if (curKey === "plan") return (
      <div>
        <QHead q="How do you want to proceed?" hint="Choose a plan that works for you" />
        <div className="flex flex-col gap-3">
          {Object.values(PLANS).map((plan) => {
            const sel = form.PlanType === plan.id;
            const total = plan.amount + plan.gst;
            return (
              <div key={plan.id} className="hw2-plan-card-v2"
                style={{ borderColor: sel ? plan.color : "#EBEBEB", background: sel ? plan.accentLight : "#fff", boxShadow: sel ? `0 4px 20px ${plan.color}20` : "0 1px 4px rgba(0,0,0,0.06)" }}
                onClick={() => setF("PlanType", sel ? "" : plan.id)}>
                {sel && (
                  <div className="hw2-pv2-selected-tick" style={{ background: plan.badgeBg }}>
                    <FontAwesomeIcon icon={faCheck} style={{ fontSize: 9 }} /><span>Selected</span>
                  </div>
                )}
                <div className="hw2-pv2-top">
                  <div className="hw2-pv2-name-row">
                    <div className="hw2-pv2-dot" style={{ background: plan.badgeBg }} />
                    <span className="hw2-pv2-name" style={{ color: plan.color }}>{plan.name}</span>
                    {plan.recommended && <span className="hw2-pv2-rec" style={{ background: plan.badgeBg }}>Recommended</span>}
                  </div>
                  <div className="hw2-pv2-price-col">
                    <span className="hw2-pv2-amount" style={{ color: plan.color }}>{plan.amount === 0 ? "Free" : `₹${plan.amount.toLocaleString()}`}</span>
                    {plan.amount > 0 && <span className="hw2-pv2-gst">+ ₹{plan.gst} GST</span>}
                  </div>
                </div>
                <div className="hw2-pv2-sub-row">
                  <span className="hw2-pv2-subtitle">{plan.tag} · {plan.subtitle}</span>
                  {plan.amount > 0 && (
                    <span className="hw2-pv2-total" style={{ color: plan.color, borderColor: plan.borderColor, background: sel ? "rgba(255,255,255,0.7)" : plan.accentLight }}>
                      ₹{total.toLocaleString()} total
                    </span>
                  )}
                </div>
                <div className="hw2-pv2-divider" style={{ background: sel ? plan.borderColor : "#F0F0F0" }} />
                <ul className="hw2-pv2-list">
                  {plan.inclusions.map((item, i) => (
                    <li key={i} className="hw2-pv2-item">
                      <span className="hw2-pv2-icon-wrap" style={{ background: sel ? "rgba(255,255,255,0.65)" : plan.accentLight }}>
                        <FontAwesomeIcon icon={FA_ICON_MAP[item.icon] || faCheck} style={{ color: plan.color, fontSize: 11, width: 11 }} />
                      </span>
                      <div className="hw2-pv2-item-txt">
                        <span className="hw2-pv2-item-label">{item.label}</span>
                        <span className="hw2-pv2-item-desc">{item.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
                {plan.bonus && (
                  <div className="hw2-pv2-bonus" style={{ background: sel ? "rgba(255,255,255,0.55)" : plan.accentLight, borderColor: plan.borderColor, color: plan.color }}>
                    <FontAwesomeIcon icon={faGift} style={{ fontSize: 11, flexShrink: 0 }} />
                    <span>{plan.bonus}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {!form.PlanType && <p className="hw2-warn mt-3 text-center">Please select a plan to continue</p>}
        {form.PlanType === "priority" && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="hw2-pbt-note mt-3" style={{ background: "#FFF7F4", borderColor: "#F5D8CF", color: "#7C2D12" }}>
            <p><FontAwesomeIcon icon={faBolt} style={{ marginRight: 6 }} /><strong>You'll be redirected to a secure Cashfree payment page.</strong> Profiles shared within <strong>24 hours</strong>.</p>
          </motion.div>
        )}
        {form.PlanType === "commitment" && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="hw2-pbt-note mt-3">
            <p><FontAwesomeIcon icon={faCircleCheck} style={{ marginRight: 6 }} /><strong>Pay ₹{(PLANS.commitment.amount + PLANS.commitment.gst).toLocaleString()}</strong> now. Profiles within <strong>3 working days</strong>.</p>
            <p style={{ marginTop: 5 }}><FontAwesomeIcon icon={faPhone} style={{ marginRight: 6 }} />You'll be redirected to a secure Cashfree payment page.</p>
          </motion.div>
        )}
        {form.PlanType === "nopay" && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="hw2-pbt-note mt-3" style={{ background: "#F9FAFB", borderColor: "#E5E7EB", color: "#6B7280" }}>
            <p>⚠️ Without payment there is <strong>no priority, no guaranteed timeline, and no replacement support</strong>.</p>
          </motion.div>
        )}
      </div>
    );

    if (curKey === "done") {
      const isNoPay = form.PlanType === "nopay";
      const bg = isNoPay ? "linear-gradient(135deg,#9CA3AF,#6B7280)" : "linear-gradient(135deg,#EC5F36,#D84E28)";
      return (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <motion.div initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 280, damping: 16 }}
            className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
            style={{ background: bg, boxShadow: "0 10px 36px rgba(0,0,0,.20)" }}>
            <Check size={36} color="#fff" strokeWidth={3} />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <h3 className="hw2-display text-xl font-bold text-gray-900 mb-2">{isNoPay ? "Request Noted 👋" : "Request Submitted! 🎉"}</h3>
            <p className="text-sm text-gray-500 max-w-[280px] mx-auto leading-relaxed mb-1">
              {isNoPay ? "No payment was made. You may be contacted when capacity allows on" : "Your request has been submitted. Our team will be in touch on"}
            </p>
            <p className="font-bold text-gray-900 text-base mb-1">+91 {form.Phone}</p>
            {form.Email && <p className="text-xs text-gray-400 mb-3">{form.Email}</p>}
            <div className="hw2-done-plan-badge" style={{ background: isNoPay ? "#F9FAFB" : "#FFF2EE", color: isNoPay ? "#6B7280" : "#EC5F36", borderColor: isNoPay ? "#E5E7EB" : "#F5D8CF" }}>
              {isNoPay ? <>No Commitment — Basic Access</> : <><FontAwesomeIcon icon={faBolt} style={{ marginRight: 5 }} />Request submitted</>}
            </div>
            <button className="hw2-btn mx-auto mt-5" style={{ background: bg }} onClick={resetWizard}>
              <Sparkles size={14} /> Submit Another Request
            </button>
          </motion.div>
        </div>
      );
    }
    return null;
  };

  const renderProgress = () => {
    if (isDone) return null;
    return (
      <div className="mb-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="hw2-display text-lg font-bold text-gray-900 leading-tight">Hire Trusted Help</h2>
          {form.ServiceType && <span className="hw2-svc-badge">{SERVICES.find((s) => s.id === form.ServiceType)?.emoji} {SERVICES.find((s) => s.id === form.ServiceType)?.label}</span>}
        </div>
        <div className="relative">
          <div className="absolute h-0.5 bg-gray-100" style={{ top: 14, left: `calc(${100 / (2 * progKeys.length)}%)`, right: `calc(${100 / (2 * progKeys.length)}%)`, zIndex: 0 }}>
            <motion.div className="h-full origin-left" style={{ background: "linear-gradient(90deg,#EC5F36,#D84E28)" }} animate={{ width: `${progPct}%` }} transition={{ duration: 0.4, ease: "easeInOut" }} />
          </div>
          <div className="relative flex justify-between" style={{ zIndex: 1 }}>
            {progKeys.map((key, i) => {
              const meta = PROG_META[key] ?? { label: key, icon: Briefcase };
              const Icon = meta.icon;
              const done = progIdx > i, active = progIdx === i;
              return (
                <div key={`${key}-${i}`} className="flex flex-col items-center gap-1 flex-1 min-w-0">
                  <motion.div animate={{ scale: active ? 1.15 : 1 }} transition={{ duration: 0.2 }}
                    className="w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{ background: done ? "#EC5F36" : active ? "#FFF2EE" : "#fff", borderColor: done || active ? "#EC5F36" : "#E5E2DE", boxShadow: active ? "0 0 0 4px rgba(236,95,54,0.15)" : "none" }}>
                    {done ? <Check size={11} color="#fff" strokeWidth={3} /> : <Icon size={12} color={active ? "#EC5F36" : "#ccc"} strokeWidth={1.8} />}
                  </motion.div>
                  <span className="text-[8.5px] font-semibold truncate max-w-[40px] text-center" style={{ color: active ? "#EC5F36" : done ? "#EC5F36" : "#bbb" }}>{meta.label}</span>
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
    const planBtnLabel = () => {
      if (!form.PlanType) return "Select a Plan";
      if (paymentStage === "creating_order") return <><FontAwesomeIcon icon={faSpinner} spin style={{ marginRight: 6 }} />Creating order…</>;
      if (paymentStage === "redirecting") return <><FontAwesomeIcon icon={faSpinner} spin style={{ marginRight: 6 }} />Redirecting…</>;
      if (form.PlanType === "priority") return <><FontAwesomeIcon icon={faBolt} style={{ marginRight: 6 }} />Pay Now — ₹{(PLANS.priority.amount + PLANS.priority.gst).toLocaleString()}</>;
      if (form.PlanType === "commitment") return <><FontAwesomeIcon icon={faBolt} style={{ marginRight: 6 }} />Pay Now — ₹{(PLANS.commitment.amount + PLANS.commitment.gst).toLocaleString()}</>;
      if (form.PlanType === "nopay") return <>Continue Without Paying</>;
      return "Select a Plan";
    };
    return (
      <div className="pt-3 flex justify-between items-center" style={{ borderTop: "1.5px solid #F0EBE8", marginTop: "auto" }}>
        {showBack
          ? <button type="button" className="hw2-back" disabled={planSubmitting} onClick={goBack}><ArrowLeft size={14} strokeWidth={2.5} /> Back</button>
          : <div />}
        {showContinue && (
          <button type="button" className="hw2-btn" disabled={!isValid() || planSubmitting}
            onClick={isPlan ? () => handlePlanSubmit(form.PlanType) : goNext}>
            {isPlan ? planBtnLabel() : <>Continue <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg></>}
          </button>
        )}
      </div>
    );
  };

  const Shell = (
    <div className="hw2-root flex flex-col bg-white rounded-3xl p-5 sm:p-6 w-full max-w-[30rem]" style={{ height: "34rem" }}>
      {renderProgress()}
      <div ref={bodyRef} className="hw2-body overflow-y-auto" style={{ flex: 1 }}>
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div key={`${form.ServiceType || "svc"}-${stepIdx}`} custom={dir}
            variants={{ enter: (d) => ({ opacity: 0, x: d > 0 ? 30 : -30 }), center: { opacity: 1, x: 0 }, exit: (d) => ({ opacity: 0, x: d > 0 ? -30 : 30 }) }}
            initial="enter" animate="center" exit="exit" transition={{ duration: 0.2, ease: "easeInOut" }}>
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>
      {renderFooter()}
    </div>
  );

  if (asModal) {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        onClick={(e) => { if (e.target === e.currentTarget) { resetWizard(); onClose?.(); } }}>
        <motion.div className="relative w-full max-w-xl" initial={{ opacity: 0, scale: 0.94, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.94, y: 20 }} transition={{ duration: 0.22 }}>
          {onClose && (
            <button type="button" aria-label="Close" onClick={() => { resetWizard(); onClose?.(); }}
              className="absolute -top-3 -right-3 bg-white shadow-md rounded-full w-9 h-9 flex items-center justify-center hover:bg-gray-50 transition"
              style={{ border: "1.5px solid #F0EBE8" }}>
              <X size={17} strokeWidth={2.5} />
            </button>
          )}
          {Shell}
        </motion.div>
      </div>
    );
  }
  return Shell;
}