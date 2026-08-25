import { useState, useRef, useEffect } from "react";
import { Check, ArrowLeft, X, CheckCircle2, Briefcase, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import CitySelect from "./CitySelect";

import {
  SERVICES,
  GENDER_OPTIONS_DATA,
  TASK_PREF_OPTIONS,
  COOK_TYPE_OPTIONS,
  CHILD_AGE_OPTIONS,
  TOTAL_CHILDREN_OPTIONS,
  DRIVER_HOURS_OPTIONS,
  JAPA_DURATION_OPTIONS,
  BUDGETS,
  ACCOMMODATION_OPTIONS,
  MEAL_OPTIONS,
  SERVICE_FLOWS,
  DEFAULT_FLOW,
  PROG_META,
  INIT,
} from "./wizardData";

import { safeSessionStorage } from "../utils/browserOnly";

const API_BASE = import.meta.env.VITE_REACT_APP_API || "";

// Zoho Creator's `date` field type in this system expects DD-MMM-YYYY
// (e.g. "16-Jul-2026") — matches DemandForm's toZohoDate.
const ZOHO_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function toZohoDate(isoDate) {
  if (!isoDate) return "";
  const [y, m, d] = isoDate.split("-");
  if (!y || !m || !d) return "";
  const monthIdx = parseInt(m, 10) - 1;
  if (monthIdx < 0 || monthIdx > 11) return "";
  return `${d}-${ZOHO_MONTHS[monthIdx]}-${y}`;
}

// ── Zoho field builder — matches DemandForm's buildZohoFields exactly ─────────
// NOTE: Cook type, child age group, and driver hours are all stored in the
// single `TaskPreference` field now (see ServiceSubOptions-equivalent steps
// below), same as DemandForm. There is no separate CookType/ChildAgeGroup/
// DriverHours state anymore, so those are not mapped here — mapping them
// would just send empty strings to Zoho.
function buildZohoFields(f) {
  return {
    Full_Name: f.FullName,
    Mobile_Number: f.Phone,
    Email: f.Email,
    Street_Address: f.Address,
    City1: f.City,
    State: f.State,
    Service_Type: f.ServiceType,
    Helper_s_Gender: f.HelperGender,
    Task_Preference: f.TaskPreference,   // cook type / age group / driver hours / live-in task / japa duration all land here
    Cook_Members: f.CookPeopleCount,
    Total_Number_of_Children: f.TotalChildren,
    Japa_Start_Date: toZohoDate(f.JapaStartDate),
    Monthly_Budget: f.Budget,
    Accommodation: f.Accommodation,
    Meals: f.Meals,
    Special_Instructions: f.Instructions,
    Plan_Type: f.PlanType,
    Payment_Status: f.PaymentStatus,
    Status: "Active"
  };
}

// ── Submit helper ─────────────────────────────────────────────────────────────
const submitNoPay = async (zohoFields) => {
  if (!API_BASE) throw new Error("VITE_REACT_APP_API is not set.");
  const res = await fetch(`${API_BASE}/submit-nopay`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ zohoFields }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `Server error ${res.status}`);
  return data;
};

// ─────────────────────────────────────────────────────────────────────────────
export default function HeroWizard({
  asModal = false,
  isOpen = true,
  onClose,
  onSubmit,
  initialService,
}) {

  const navigate = useNavigate();

  // ── Initial state ──────────────────────────────────────────────────────────
  const getInitialState = () => {
    if (initialService) {
      const svc = SERVICES.find((s) => s.id === initialService);
      if (svc) {
        return { ...INIT, ServiceType: svc.id, ServiceLabel: svc.label };
      }
    }
    return { ...INIT };
  };

  const getInitialStep = () => {
    if (!initialService) return 0;
    const svc = SERVICES.find((s) => s.id === initialService);
    return svc ? 1 : 0;
  };

  const [stepIdx, setStepIdx] = useState(getInitialStep);
  const [dir, setDir] = useState(1);
  const [form, setForm] = useState(getInitialState);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const bodyRef = useRef(null);

  // ── Reset on open ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      setStepIdx(getInitialStep());
      setForm(getInitialState());
      setDir(1);
      setSubmitting(false);
      setSubmitError("");
    }
  }, [isOpen, initialService]);

  // ── Scroll to top on step change ──────────────────────────────────────────
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = 0;
  }, [stepIdx, form.ServiceType]);

  // ── Service selection ──────────────────────────────────────────────────────
  const selectService = (svc) => {
    // Auto-set default gender (mirrors DemandForm's selectService logic)
    const defaultGender =
      svc.id === "Baby Caretaker" || svc.id === "Japa" ? "Female" :
        svc.id === "Driver" ? "Male" : "";

    setForm({
      ...INIT,
      ServiceType: svc.id,
      ServiceLabel: svc.label,
      HelperGender: defaultGender,
    });
    setDir(1);
    setStepIdx(1);
  };

  // ── Flow derivation ────────────────────────────────────────────────────────
  const steps = form.ServiceType
    ? SERVICE_FLOWS[form.ServiceType] || DEFAULT_FLOW
    : DEFAULT_FLOW;

  const curKey = steps[stepIdx] ?? "service";
  const isDone = curKey === "done";
  const progKeys = steps.filter((k) => k !== "done");
  const progIdx = isDone ? progKeys.length : progKeys.indexOf(curKey);
  const progPct =
    progKeys.length <= 1
      ? 0
      : Math.round((Math.max(0, progIdx) / (progKeys.length - 1)) * 100);

  // ── Field helpers ──────────────────────────────────────────────────────────
  const setF = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const toggleArr = (k, v) =>
    setForm((f) => ({
      ...f,
      [k]: f[k].includes(v) ? f[k].filter((x) => x !== v) : [...f[k], v],
    }));

  const setCity = (loc) => {
    setForm((f) => ({
      ...f,
      City: loc?.name || "",
      State: loc?.state || "",
    }));
  };

  // ── Navigation ─────────────────────────────────────────────────────────────
  const goNext = () => {
    if (curKey === "contact" && isValid()) {
      handleSubmit();
      return;
    }
    setDir(1);
    setStepIdx((i) => Math.min(i + 1, steps.length - 1));
  };

  const goBack = () => { setDir(-1); setStepIdx((i) => Math.max(i - 1, 0)); };
  const after = (ms = 220) => setTimeout(goNext, ms);

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError("");
    try {
      const zohoFields = buildZohoFields({
        ...form,
        PlanType: "Priority",
        PaymentStatus: "Paid",
      });
      const result = await submitNoPay(zohoFields);
      onSubmit?.(zohoFields, result);

      // Route to the same /thank-you flow DemandForm uses — recommended
      // profiles, gender/city/budget ranking, the green success banner —
      // instead of the wizard's own inline "done" step, so both entry
      // points land on the identical experience.
      if (asModal) onClose?.(); // tidy up if the modal is controlled externally
      navigate("/thank-you", {
        state: {
          fromForm: "demand",
          serviceType: form.ServiceType,
          serviceLabel: form.ServiceLabel || form.ServiceType,
          duplicate: !!result?.duplicate,
          city: form.City,
          budget: form.Budget,
          gender: form.HelperGender,
          mobile: form.Phone,
          leadId: result?.leadId || null,
        },
      });
      // Not resetting `submitting` here — we're navigating away, so the
      // wizard is about to unmount and there's nothing left to update.
    } catch (err) {
      setSubmitError(
        err.message.includes("VITE_REACT_APP_API")
          ? "Backend URL not configured. Set VITE_REACT_APP_API in your .env file."
          : "We couldn't save your request. Please try again or call us on +91 92112 98139."
      );
      setSubmitting(false);
    }
  };

  const resetWizard = () => {
    setStepIdx(getInitialStep());
    setDir(1);
    setForm(getInitialState());
    setSubmitting(false);
    setSubmitError("");
  };

  // ── Validation ─────────────────────────────────────────────────────────────
  // cooktype / childagegroup / driverhours / japaduration all now read/write the
  // single TaskPreference field (matches DemandForm's ServiceSubOptions behavior).
  const isValid = () => {
    switch (curKey) {
      case "service": return !!form.ServiceType;
      case "taskpref": return !!form.TaskPreference;
      case "cooktype": return !!form.TaskPreference;
      case "cookpeoplecount": return !!form.CookPeopleCount && Number(form.CookPeopleCount) >= 1;
      case "childagegroup": return !!form.TaskPreference;
      case "driverhours": return !!form.TaskPreference;
      case "japastartdate": return !!form.JapaStartDate;
      case "japaduration": return !!form.TaskPreference;
      case "helpergender": return !!form.HelperGender;
      case "budget": return Array.isArray(form.Budget) && form.Budget.length > 0;
      case "accommodation": return !!form.Accommodation;
      case "meals": return !!form.Meals;
      case "contact":
        return (
          form.FullName.trim() !== "" &&
          form.Phone.length === 10 &&
          /^[6-9]/.test(form.Phone) &&
          form.Address.trim() !== "" &&
          !!form.City
        );
      default: return true;
    }
  };

  // Steps that show a Continue button (instead of auto-advancing)
  const CONT_KEYS = new Set([
    "taskpref",
    "cookpeoplecount",
    "childagegroup",
    "japastartdate",
    "helpergender",
    "budget",
    "accommodation",
    "meals",
    "contact",
  ]);
  const showContinue = CONT_KEYS.has(curKey);

  // ── UI COMPONENTS ─────────────────────────────────────────────────────────

  const QHead = ({ q, hint }) => (
    <div className="mb-5">
      <p className="text-[15px] font-bold leading-snug text-[#181C2E] mb-1">{q}</p>
      {hint && <p className="text-xs text-[#5B6475] font-medium leading-relaxed">{hint}</p>}
    </div>
  );

  const SvcCard = ({ svc, selected, onClick, className = "" }) => (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`hw2-svc-card ${className}`}
      style={{
        borderColor: selected ? svc.color : "#E5E2DE",
        boxShadow: selected ? `0 8px 24px ${svc.color}40` : "0 2px 8px rgba(0,0,0,0.05)",
        background: svc.image ? undefined : selected ? `${svc.color}26` : `${svc.color}12`,
      }}
    >
      {svc.image ? (
        <>
          <img src={svc.image} alt={svc.label} loading="lazy" className="hw2-svc-img" />
          <div className="hw2-svc-overlay" />
          {selected && <div className="hw2-svc-tint" style={{ background: `${svc.color}33` }} />}
        </>
      ) : (
        <div className="hw2-svc-emoji-wrap">
          <span className="hw2-svc-emoji">{svc.emoji}</span>
        </div>
      )}
      <p className={svc.image ? "hw2-svc-label" : "hw2-svc-label hw2-svc-label-flat"}>
        {svc.label}
      </p>
      {selected && (
        <div className="hw2-svc-check" style={{ background: svc.color }}>
          <Check size={9} strokeWidth={3} color="#fff" />
        </div>
      )}
    </button>
  );

  const TextChip = ({ label, selected, onClick, multi = false }) => (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className="hw2-pill"
      style={{
        background: selected ? "#EC5F36" : "#fff",
        borderColor: selected ? "#EC5F36" : "#E5E2DE",
        boxShadow: selected ? "0 6px 18px rgba(236,95,54,0.33)" : "0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      <div className="hw2-pill-txt">
        <span
          className="hw2-pill-label"
          style={{ color: selected ? "#fff" : "#1a1a2e" }}
        >
          {label}
        </span>
      </div>
      {selected && (
        <Check size={14} strokeWidth={2.5} color="#fff" className="ml-auto flex-shrink-0" />
      )}
    </button>
  );

  const GenderImgCard = ({ opt, selected, onClick }) => (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className="relative overflow-hidden rounded-2xl border-2 transition-all duration-200"
      style={{
        borderColor: selected ? "#EC5F36" : "#E5E2DE",
        boxShadow: selected ? "0 8px 24px rgba(236,95,54,0.25)" : "0 2px 8px rgba(0,0,0,0.05)",
        aspectRatio: "1 / 1",
        padding: 0,
      }}
    >
      <img
        src={opt.image} alt={opt.label} loading="lazy"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
      <div style={{ position: "absolute", inset: 0, background: selected ? "rgba(236,95,54,0.22)" : "rgba(0,0,0,0.08)", transition: "background .2s" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "6px 4px", background: selected ? "rgba(236,95,54,0.82)" : "rgba(0,0,0,0.45)", textAlign: "center" }}>
        <span style={{ fontSize: 12, fontWeight: 800, color: "#fff", letterSpacing: ".01em" }}>{opt.label}</span>
      </div>
      {selected && (
        <div style={{ position: "absolute", top: 7, right: 7, width: 20, height: 20, borderRadius: "50%", background: "#EC5F36", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 6px rgba(0,0,0,0.25)" }}>
          <Check size={10} strokeWidth={3} color="#fff" />
        </div>
      )}
    </button>
  );

  // ── RENDER STEP ───────────────────────────────────────────────────────────
  const renderStep = () => {

    if (curKey === "service") return (
      <div>
        <QHead q="What type of house help do you need?" hint="Tap to select — we'll guide you from there" />
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
          {SERVICES.map((svc, i) => (
            <SvcCard
              key={svc.id}
              svc={svc}
              selected={form.ServiceType === svc.id}
              className={SERVICES.length % 3 === 1 && i === SERVICES.length - 1 ? "col-start-2 h-[6.8rem]" : "h-[6.8rem]"}
              onClick={() => selectService(svc)}
            />
          ))}
        </div>
      </div>
    );

    // ── Live-In Support task preference — single select, writes TaskPreference
    if (curKey === "taskpref") return (
      <div>
        <QHead q="Task preference?" hint="Choose the option that fits best" />
        <div className="grid grid-cols-2 gap-2.5">
          {TASK_PREF_OPTIONS.map((o) => (
            <SvcCard
              key={o.id}
              svc={o}
              selected={form.TaskPreference === o.id}
              onClick={() => { setF("TaskPreference", o.id); after() }}
              className="h-[10rem]"
            />
          ))}
        </div>
      </div>
    );

    // ── Cooking Help — cook type, writes TaskPreference (consolidated, matches DemandForm)
    if (curKey === "cooktype") return (
      <div>
        <QHead q="What type of cook do you need?" />
        <div className="grid grid-cols-2 gap-2.5">
          {COOK_TYPE_OPTIONS.map((o) => (
            <SvcCard
              key={o.id}
              svc={o}
              selected={form.TaskPreference === o.id}
              onClick={() => { setF("TaskPreference", o.id); after(); }}
              className="h-[10rem]"
            />
          ))}
        </div>
      </div>
    );

    // ── Cooking Help — number of people to cook for
    if (curKey === "cookpeoplecount") return (
      <div>
        <QHead q="How many people to cook for?" hint="Enter the number of people" />
        <input
          type="number"
          min="1"
          inputMode="numeric"
          placeholder="e.g. 4"
          className="hw2-finput"
          value={form.CookPeopleCount}
          autoFocus
          onChange={(e) => setF("CookPeopleCount", e.target.value.replace(/\D/g, ""))}
        />
      </div>
    );

    // ── Baby Caretaker — age group writes TaskPreference (single select, consolidated);
    // TotalChildren stays its own field, same as DemandForm
    if (curKey === "childagegroup") return (
      <div>
        <QHead q="Child's age group?" hint="Choose the option that fits best" />
        <div className="flex gap-2 mb-5">
          {CHILD_AGE_OPTIONS.map((o) => (
            <TextChip
              key={o.id}
              label={o.label}
              selected={form.TaskPreference === o.id}
              onClick={() => setF("TaskPreference", o.id)}
            />
          ))}
        </div>

        <p className="text-[13px] font-bold text-[#181C2E] mb-3">Total number of children</p>
        <div className="flex gap-3">
          {TOTAL_CHILDREN_OPTIONS.map((o) => {
            const sel = form.TotalChildren === o.id;
            return (
              <button
                key={o.id}
                type="button"
                onClick={() => setF("TotalChildren", sel ? "" : o.id)}
                className="rounded-2xl border-2 py-4 flex-1 text-lg font-extrabold transition-all duration-200"
                style={{
                  borderColor: sel ? "#EC5F36" : "#E5E2DE",
                  background: sel ? "linear-gradient(135deg,#EC5F36,#D84E28)" : "#fff",
                  color: sel ? "#fff" : "#1a1a2e",
                  boxShadow: sel ? "0 6px 18px rgba(236,95,54,0.30)" : "0 1px 4px rgba(0,0,0,0.04)",
                }}
              >
                {o.label}
              </button>
            );
          })}
        </div>
      </div>
    );

    // ── Driver — hours, writes TaskPreference (consolidated, matches DemandForm)
    if (curKey === "driverhours") return (
      <div>
        <QHead q="Availability required?" hint="How many hours per day?" />
        <div className="grid grid-cols-2 gap-2.5">
          {DRIVER_HOURS_OPTIONS.map((o) => (
            <SvcCard
              key={o.id}
              svc={o}
              selected={form.TaskPreference === o.id}
              onClick={() => { setF("TaskPreference", o.id); after(); }}
              className="h-[6.8rem]"
            />
          ))}
        </div>
      </div>
    );

    // ── Japa — start date
    if (curKey === "japastartdate") return (
      <div>
        <QHead q="From which date is the Japa maid required?" />
        <input
          type="date"
          className="hw2-finput"
          value={form.JapaStartDate}
          onChange={(e) => setF("JapaStartDate", e.target.value)}
        />
      </div>
    );

    // ── Japa — duration, writes TaskPreference (consolidated, matches DemandForm)
    if (curKey === "japaduration") return (
      <div>
        <QHead q="Duration required?" />
        <div className="grid grid-cols-2 gap-2.5">
          {JAPA_DURATION_OPTIONS.map((o) => (
            <SvcCard
              key={o.id}
              svc={o}
              selected={form.TaskPreference === o.id}
              onClick={() => { setF("TaskPreference", o.id); after(); }}
              className="h-[6.8rem]"
            />
          ))}
        </div>
      </div>
    );

    if (curKey === "helpergender") return (
      <div>
        <QHead q="Helper's gender preference" />
        <div className="grid grid-cols-3 gap-3">
          {GENDER_OPTIONS_DATA.map((g) => (
            <GenderImgCard
              key={g.id}
              opt={g}
              selected={form.HelperGender === g.id}
              onClick={() => { setF("HelperGender", g.id); after(); }}
            />
          ))}
        </div>
      </div>
    );

    if (curKey === "budget") return (
      <div>
        <QHead q="Salary range (per month)?" hint="Select one or more ranges you're open to — we'll match staff within your budget" />
        <div className="flex flex-col gap-2">
          {BUDGETS.map((b) => {
            const selected = form.Budget.includes(b.id);
            return (
              <button
                key={b.id}
                type="button"
                aria-pressed={selected}
                onClick={() => toggleArr("Budget", b.id)}
                className="hw2-budget-row"
                style={{
                  background: selected ? "#EC5F36" : "#fff",
                  borderColor: selected ? "#EC5F36" : "#E5E2DE",
                }}
              >
                <span
                  className="hw2-budget-label"
                  style={{ color: selected ? "#fff" : "#1a1a2e" }}
                >
                  {b.label}
                </span>
                {selected && (
                  <Check size={16} strokeWidth={2.5} color="#fff" className="ml-auto flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    );

    if (curKey === "accommodation") return (
      <div>
        <QHead q="Accommodation for the helper?" />
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
          {ACCOMMODATION_OPTIONS.map((o) => (
            <SvcCard
              key={o.id}
              svc={o}
              selected={form.Accommodation === o.id}
              onClick={() => { setF("Accommodation", o.id); after(); }}
              className="h-[6.8rem]"
            />
          ))}
        </div>
      </div>
    );

    if (curKey === "meals") return (
      <div>
        <QHead q="Meals for the helper?" />
        <div className="grid grid-cols-2 gap-3">
          {MEAL_OPTIONS.map((o) => (
            <SvcCard
              key={o.id}
              svc={o}
              selected={form.Meals === o.id}
              onClick={() => { setF("Meals", o.id); after(); }}
              className="h-[6.8rem]"
            />
          ))}
        </div>
      </div>
    );

    if (curKey === "contact") {
      const phoneOk = form.Phone.length === 10 && /^[6-9]/.test(form.Phone);
      return (
        <div>
          <QHead q="Almost there! 🎉" hint="Share your details — our team will call you within 2 hours" />

          <div className="mb-3">
            <label className="hw2-flabel">Full name <span className="text-[#EC5F36]">*</span></label>
            <input
              className="hw2-finput"
              type="text"
              placeholder="Rahul Sharma"
              value={form.FullName}
              autoFocus
              onChange={(e) => setF("FullName", e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="hw2-flabel">
              Contact number <span className="text-[#EC5F36]">*</span>{" "}
              <span className="text-xs font-normal text-gray-400">(we'll call on this)</span>
            </label>
            <div
              className="hw2-phone-wrap"
              style={{ borderColor: phoneOk ? "#16a34a" : undefined }}
            >
              <div className="hw2-phone-pre">+91</div>
              <input
                type="tel"
                inputMode="numeric"
                maxLength={10}
                className="hw2-phone-inp"
                placeholder="98765 43210"
                value={form.Phone}
                onChange={(e) => setF("Phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
              />
              {phoneOk && (
                <CheckCircle2 size={18} color="#16a34a" strokeWidth={2} className="mr-3 flex-shrink-0" />
              )}
            </div>
            {form.Phone.length > 0 && form.Phone.length < 10 && (
              <p className="hw2-warn">{10 - form.Phone.length} more digit{10 - form.Phone.length !== 1 ? "s" : ""} needed</p>
            )}
          </div>

          <div className="mb-3">
            <label className="hw2-flabel">
              Email <span className="text-xs font-normal text-gray-400">(optional)</span>
            </label>
            <input
              className="hw2-finput"
              type="email"
              placeholder="rahul@example.com"
              value={form.Email}
              onChange={(e) => setF("Email", e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="hw2-flabel">
              Address <span className="text-[#EC5F36]">*</span>
            </label>
            <input
              className="hw2-finput"
              type="text"
              placeholder="Sector, colony, city"
              value={form.Address}
              onChange={(e) => setF("Address", e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="hw2-flabel">
              City <span className="text-[#EC5F36]">*</span>
            </label>
            <CitySelect
              value={form.City ? { name: form.City, state: form.State } : null}
              onChange={setCity}
              placeholder="Select city"
            />
            {form.State && (
              <p className="text-xs font-medium text-gray-400 mt-1.5 ml-0.5">
                State: <span className="text-gray-600 font-semibold">{form.State}</span>
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="hw2-flabel">
              Special instructions <span className="text-xs font-normal text-gray-400">(optional)</span>
            </label>
            <textarea
              rows={2}
              maxLength={500}
              placeholder="Specific timing, languages, requirements…"
              value={form.Instructions}
              onChange={(e) => setF("Instructions", e.target.value)}
              className="hw2-textarea"
            />
          </div>

          <div className="hw2-summary">
            <p className="hw2-sum-head">📋 Your Request Summary</p>
            {[
              form.ServiceType && { k: "Service", v: form.ServiceLabel },
              form.TaskPreference && { k: "Preference", v: form.TaskPreference },
              form.CookPeopleCount && { k: "People to cook for", v: form.CookPeopleCount },
              form.TotalChildren && { k: "No. of Children", v: form.TotalChildren },
              form.JapaStartDate && { k: "Start Date", v: form.JapaStartDate },
              form.HelperGender && { k: "Helper Gender", v: form.HelperGender },
              form.Budget && { k: "Budget", v: form.Budget },
              form.Accommodation && { k: "Accommodation", v: form.Accommodation },
              form.Meals && { k: "Meals", v: form.Meals },
              form.City && { k: "City", v: form.State ? `${form.City}, ${form.State}` : form.City },
            ].filter(Boolean).map(({ k, v }) => (
              <div key={k} className="hw2-sum-row">
                <span className="hw2-sum-key">{k}</span>
                <span className="hw2-sum-val capitalize">{v}</span>
              </div>
            ))}
          </div>

          {submitError && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 font-semibold">
              ⚠ {submitError}
            </div>
          )}
        </div>
      );
    }

    if (curKey === "done") return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div
          className="anim-spring-pop w-20 h-20 rounded-full flex items-center justify-center mb-5"
          style={{ background: "linear-gradient(135deg,#EC5F36,#D84E28)", boxShadow: "0 10px 36px rgba(0,0,0,.20)" }}
        >
          <Check size={36} color="#fff" strokeWidth={3} />
        </div>
        <div className="anim-fade-up" style={{ animationDelay: "0.25s" }}>
          <h3 className="hw2-display text-xl font-bold text-gray-900 mb-2">
            Request Submitted ✅
          </h3>
          <p className="text-sm text-gray-500 max-w-[280px] mx-auto leading-relaxed mb-1">
            We've received your requirement and will reach out shortly.
          </p>
          <p className="font-bold text-gray-900 text-base mb-1">+91 {form.Phone}</p>
          {form.Email && <p className="text-xs text-gray-400 mb-3">{form.Email}</p>}
          <p className="text-xs text-gray-500 mb-3">Please check your WhatsApp for updates</p>
          <div
            className="hw2-done-plan-badge"
            style={{ background: "#FFF2EE", color: "#EC5F36", borderColor: "#F5D8CF" }}
          >
            Priority Profiles Delivered
          </div>
        </div>
      </div>
    );

    return null;
  };

  // ── PROGRESS BAR ──────────────────────────────────────────────────────────
  const renderProgress = () => {
    if (isDone) return null;
    const hideLabels = progKeys.length > 6;

    return (
      <div className="mb-5 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <h2 className="hw2-display text-lg font-extrabold text-gray-900 leading-tight w-[80%]">
            Start Here to Hire Trusted Help Instantly
          </h2>
        </div>

        <div className="relative">
          <div
            className="absolute h-[2px] bg-gray-100 rounded-full"
            style={{
              top: hideLabels ? 12 : 13,
              left: `calc(${100 / (2 * progKeys.length)}%)`,
              right: `calc(${100 / (2 * progKeys.length)}%)`,
              zIndex: 0,
            }}
          >
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
                  <div
                    className="flex items-center justify-center flex-shrink-0 rounded-full border-2 transition-all duration-300"
                    style={{
                      width: hideLabels ? 24 : 28,
                      height: hideLabels ? 24 : 28,
                      background: done ? "#EC5F36" : active ? "#FFF2EE" : "#fff",
                      borderColor: done || active ? "#EC5F36" : "#E5E2DE",
                      boxShadow: active ? "0 0 0 4px rgba(236,95,54,0.15)" : "none",
                      transform: active ? "scale(1.18)" : "scale(1)",
                    }}
                  >
                    {done
                      ? <Check size={10} color="#fff" strokeWidth={3} />
                      : <Icon size={hideLabels ? 10 : 12} color={active ? "#EC5F36" : "#ccc"} strokeWidth={1.8} />
                    }
                  </div>
                  {!hideLabels && (
                    <span
                      className="text-[8px] font-semibold truncate max-w-[36px] text-center leading-none"
                      style={{ color: active ? "#EC5F36" : done ? "#EC5F36" : "#ccc" }}
                    >
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

  // ── FOOTER ────────────────────────────────────────────────────────────────
  const renderFooter = () => {
    if (isDone) return null;
    const showBack = stepIdx > 0;
    if (!showBack && !showContinue) return null;

    const valid = isValid();
    const isContact = curKey === "contact";

    return (
      <div
        className="pt-3 mt-3 flex items-center justify-between gap-3 flex-shrink-0"
        style={{ borderTop: "1.5px solid #F0EBE8" }}
      >
        {showBack ? (
          <button
            type="button"
            disabled={submitting}
            onClick={goBack}
            className="flex items-center gap-1.5 text-xs font-bold transition-all duration-150 px-3 py-2.5 rounded-xl flex-shrink-0"
            style={{
              color: submitting ? "#ccc" : "#5B6475",
              background: submitting ? "transparent" : "#F5F0ED",
              border: "1.5px solid #EDE8E4",
              cursor: submitting ? "not-allowed" : "pointer",
            }}
          >
            <ArrowLeft size={13} strokeWidth={2.5} /> Back
          </button>
        ) : <div />}

        {showContinue && (
          <button
            type="button"
            disabled={!valid || submitting}
            onClick={goNext}
            className="flex items-center justify-center gap-2 text-sm font-bold transition-all duration-200 rounded-xl"
            style={{
              flex: 1,
              maxWidth: showBack ? "68%" : "100%",
              padding: "11px 20px",
              background: !valid || submitting ? "#F0EDE9" : "linear-gradient(135deg,#EC5F36,#D84E28)",
              color: !valid || submitting ? "#C4B8B2" : "#fff",
              cursor: !valid || submitting ? "not-allowed" : "pointer",
              boxShadow: valid && !submitting ? "0 4px 14px rgba(236,95,54,0.35)" : "none",
              border: "none",
            }}
          >
            {isContact ? (
              submitting
                ? <><Loader2 size={13} className="animate-spin mr-1.5 inline" />Submitting…</>
                : <>Submit requirement →</>
            ) : (
              <>
                Continue
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </>
            )}
          </button>
        )}
      </div>
    );
  };

  // ── SHELL ─────────────────────────────────────────────────────────────────
  const Shell = (
    <div
      className="hw2-root flex flex-col bg-white rounded-3xl p-5 sm:p-6 w-full max-w-[35rem]"
      style={{ height: "30rem" }}
    >
      {renderProgress()}
      <div ref={bodyRef} className="hw2-body overflow-y-auto overflow-x-hidden" style={{ flex: 1 }}>
        <div
          key={`${form.ServiceType || "svc"}-${stepIdx}`}
          className={dir > 0 ? curKey === "contact" ? "" : "step-enter-right" : "step-enter-left"}
        >
          {renderStep()}
        </div>
      </div>
      {renderFooter()}
    </div>
  );

  // ── Modal wrapper ──────────────────────────────────────────────────────────
  if (asModal) {
    if (!isOpen) return null;
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        onClick={(e) => { if (e.target === e.currentTarget) { resetWizard(); onClose?.(); } }}
      >
        <div className="relative w-full max-w-[35rem] anim-status-enter">
          {onClose && (
            <button
              type="button"
              aria-label="Close"
              onClick={() => { resetWizard(); onClose?.(); }}
              className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center hover:bg-gray-50"
            >
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
