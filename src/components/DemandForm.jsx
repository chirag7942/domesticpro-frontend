import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SEO from "./SEO";

const API_BASE = import.meta.env.VITE_REACT_APP_API || "";

// ─── Zoho field builder ───────────────────────────────────────────────────────
function buildZohoFields(f) {
  return {
    Full_Name: f.FullName,
    Mobile_Number: f.Phone,
    Email: f.Email,
    Street_Address: f.Address,
    Service_Type: f.ServiceType,
    Helper_s_Gender: f.HelperGender,
    Task_Preference: f.TaskPreference,
    Cook_Type: f.CookType,
    Child_Age_Group: f.ChildAgeGroup,
    Driver_Hours: f.DriverHours,
    Monthly_Budget: f.Budget,
    Accommodation: f.Accommodation,
    Meals: f.Meals,
    Special_Instructions: f.Instructions,
    Plan_Type: f.PlanType,
    Payment_Status: f.PaymentStatus,
  };
}

// ─── Constants ────────────────────────────────────────────────────────────────
const SERVICE_OPTIONS = [
  { value: "Nanny", label: "Nanny", desc: "Childcare support" },
  { value: "Japa", label: "Japa maid", desc: "Post-delivery care" },
  { value: "House Help", label: "House help", desc: "Household tasks" },
  { value: "Cook", label: "Cook", desc: "Cooking support" },
  { value: "Patient Care", label: "Patient care", desc: "Medical assistance" },
  { value: "Elderly Care", label: "Elderly care", desc: "Senior support" },
  { value: "Driver", label: "Driver", desc: "Personal driving" },
];

const GENDER_OPTIONS = ["Female", "Male", "No preference"];

const TASK_PREF_OPTIONS = [
  "Top work + basic cooking",
  "Top work + cleaning & mopping",
];

const COOK_TYPE_OPTIONS = [
  "Expert cook",
  "Intermediate + top work",
];

const CHILD_AGE_OPTIONS = ["0–1 year", "1–3 years", "3+ years"];

const DRIVER_HOURS_OPTIONS = ["10 hours/day", "12 hours/day", "24 hours/day"];

const BUDGET_OPTIONS = [
  "₹17,000–19,000",
  "₹20,000–22,000",
  "₹23,000–25,000",
  "₹25,000–27,000",
  "₹27,000–30,000",
  "₹30,000+",
];

const ACCOMMODATION_OPTIONS = ["Separate room", "Shared room", "Open space"];

const MEAL_OPTIONS = ["Same as family", "Separate"];

// ─── Init state ───────────────────────────────────────────────────────────────
const INIT = {
  FullName: "",
  Phone: "",
  Email: "",
  Address: "",
  ServiceType: "",
  HelperGender: "",
  TaskPreference: [],
  CookType: "",
  ChildAgeGroup: [],
  DriverHours: "",
  Budget: "",
  Accommodation: "",
  Meals: "",
  Instructions: "",
};

// ─── Tiny design tokens (inline, no external CSS) ────────────────────────────
const brand = "#E8601C";
const brandLight = "rgba(232,96,28,0.08)";
const brandBorder = "rgba(232,96,28,0.35)";
const gray50 = "#FAFAFA";
const gray100 = "#F4F4F4";
const gray200 = "#E8E8E8";
const gray400 = "#ACACAC";
const gray600 = "#6B6B6B";
const gray900 = "#181818";

const t = {
  page: {
    minHeight: "100vh",
    background: gray100,
    padding: "32px 16px 64px",
    fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
  },
  card: {
    maxWidth: "560px",
    margin: "0 auto",
    background: "#fff",
    borderRadius: "16px",
    boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
    overflow: "hidden",
  },
  // Header
  header: {
    padding: "28px 28px 24px",
    borderBottom: `1px solid ${gray200}`,
    display: "flex",
    alignItems: "flex-start",
    gap: "14px",
  },
  logoCircle: {
    width: "44px",
    height: "44px",
    borderRadius: "12px",
    background: brand,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    overflow: "hidden",
  },
  headerText: { flex: 1 },
  headerTitle: { fontSize: "17px", fontWeight: 700, color: gray900, lineHeight: 1.3, margin: 0 },
  headerSub: { fontSize: "13px", color: gray600, marginTop: "4px", lineHeight: 1.5 },
  // Body
  body: { padding: "24px 28px 28px" },
  // Section label
  sectionLabel: {
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.09em",
    textTransform: "uppercase",
    color: brand,
    marginBottom: "14px",
    marginTop: "28px",
  },
  // Field
  field: { marginBottom: "16px" },
  label: { display: "block", fontSize: "13px", fontWeight: 600, color: gray600, marginBottom: "6px" },
  req: { color: brand, marginLeft: "2px" },
  input: {
    width: "100%",
    border: `1px solid ${gray200}`,
    borderRadius: "10px",
    padding: "10px 13px",
    fontSize: "14px",
    color: gray900,
    background: "#fff",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
    transition: "border-color 0.15s",
  },
  inputFocus: { borderColor: brand, boxShadow: `0 0 0 3px ${brandLight}` },
  phoneWrap: { display: "flex", borderRadius: "10px", overflow: "hidden", border: `1px solid ${gray200}` },
  phonePrefix: {
    background: gray50,
    borderRight: `1px solid ${gray200}`,
    padding: "10px 12px",
    fontSize: "14px",
    color: gray600,
    whiteSpace: "nowrap",
    display: "flex",
    alignItems: "center",
    fontWeight: 500,
  },
  phoneInput: {
    flex: 1,
    border: "none",
    borderRadius: "0",
    padding: "10px 13px",
    fontSize: "14px",
    color: gray900,
    background: "#fff",
    outline: "none",
    fontFamily: "inherit",
  },
  row2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" },
  // Service cards grid
  serviceGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "9px", marginTop: "6px" },
  serviceCard: (active) => ({
    border: active ? `1.5px solid ${brand}` : `1px solid ${gray200}`,
    borderRadius: "12px",
    padding: "12px 14px",
    cursor: "pointer",
    background: active ? brandLight : "#fff",
    transition: "all 0.15s",
    userSelect: "none",
  }),
  serviceCardTitle: (active) => ({
    fontSize: "13px",
    fontWeight: 600,
    color: active ? brand : gray900,
  }),
  serviceCardDesc: { fontSize: "12px", color: gray600, marginTop: "3px" },
  // Sub-option area
  subSection: {
    background: gray50,
    border: `1px solid ${gray200}`,
    borderRadius: "12px",
    padding: "16px",
    marginTop: "12px",
  },
  subLabel: { fontSize: "12px", fontWeight: 600, color: gray600, marginBottom: "8px" },
  chipRow: { display: "flex", flexWrap: "wrap", gap: "7px" },
  chip: (active) => ({
    padding: "6px 14px",
    borderRadius: "20px",
    border: active ? `1.5px solid ${brand}` : `1px solid ${gray200}`,
    background: active ? brand : "#fff",
    color: active ? "#fff" : gray600,
    fontSize: "12px",
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.15s",
    userSelect: "none",
  }),
  // Salary / accommodation / meal chips
  bigChipRow: { display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "6px" },
  bigChip: (active) => ({
    padding: "8px 16px",
    borderRadius: "22px",
    border: active ? `1.5px solid ${brand}` : `1px solid ${gray200}`,
    background: active ? brand : "#fff",
    color: active ? "#fff" : gray600,
    fontSize: "13px",
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.15s",
    userSelect: "none",
  }),
  // Gender buttons
  genderRow: { display: "flex", gap: "8px", marginTop: "8px" },
  genderBtn: (active) => ({
    flex: 1,
    padding: "9px 8px",
    border: active ? `1.5px solid ${brand}` : `1px solid ${gray200}`,
    borderRadius: "10px",
    background: active ? brand : "#fff",
    color: active ? "#fff" : gray600,
    fontSize: "13px",
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.15s",
    textAlign: "center",
    userSelect: "none",
  }),
  // Textarea
  textarea: {
    width: "100%",
    border: `1px solid ${gray200}`,
    borderRadius: "10px",
    padding: "10px 13px",
    fontSize: "14px",
    color: gray900,
    background: "#fff",
    outline: "none",
    resize: "vertical",
    minHeight: "80px",
    boxSizing: "border-box",
    fontFamily: "inherit",
  },
  divider: { border: "none", borderTop: `1px solid ${gray200}`, margin: "24px 0" },
  // Submit
  submitBtn: {
    width: "100%",
    padding: "13px",
    background: brand,
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: 700,
    cursor: "pointer",
    marginTop: "24px",
    letterSpacing: "0.01em",
    transition: "opacity 0.15s",
  },
  submitBtnDisabled: {
    width: "100%",
    padding: "13px",
    background: gray200,
    color: gray400,
    border: "none",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: 700,
    cursor: "not-allowed",
    marginTop: "24px",
  },
  errText: { fontSize: "11px", color: "#c00", marginTop: "4px", display: "block" },
  errorBanner: {
    background: "#fff5f5",
    border: "1px solid #fecaca",
    borderRadius: "10px",
    padding: "12px 14px",
    fontSize: "13px",
    color: "#991b1b",
    fontWeight: 600,
    marginTop: "14px",
  },
};

// ─── Small helpers ────────────────────────────────────────────────────────────
const Err = ({ msg }) => msg ? <span style={t.errText}>{msg}</span> : null;

function FocusInput({ style, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      {...props}
      style={{ ...style, ...(focused ? t.inputFocus : {}) }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}

function SubSection({ children }) {
  return <div style={t.subSection}>{children}</div>;
}

// ─── Service sub-options ──────────────────────────────────────────────────────
function ServiceSubOptions({ svc, form, setF, toggleMulti }) {
  if (svc === "Nanny") return (
    <SubSection>
      <div style={t.subLabel}>Child's age group</div>
      <div style={t.chipRow}>
        {CHILD_AGE_OPTIONS.map((o) => (
          <div key={o} style={t.chip(form.ChildAgeGroup.includes(o))}
            onClick={() => toggleMulti("ChildAgeGroup", o)}>{o}</div>
        ))}
      </div>
    </SubSection>
  );

  if (svc === "House Help") return (
    <SubSection>
      <div style={t.subLabel}>Task preference</div>
      <div style={t.chipRow}>
        {TASK_PREF_OPTIONS.map((o) => (
          <div key={o} style={t.chip(form.TaskPreference.includes(o))}
            onClick={() => toggleMulti("TaskPreference", o)}>{o}</div>
        ))}
      </div>
      <div style={{ ...t.subLabel, marginTop: "14px" }}>Helper's gender preference</div>
      <div style={t.genderRow}>
        {GENDER_OPTIONS.map((o) => (
          <div key={o} style={t.genderBtn(form.HelperGender === o)}
            onClick={() => setF("HelperGender", o)}>{o}</div>
        ))}
      </div>
    </SubSection>
  );

  if (svc === "Cook") return (
    <SubSection>
      <div style={t.subLabel}>Cook type</div>
      <div style={t.chipRow}>
        {COOK_TYPE_OPTIONS.map((o) => (
          <div key={o} style={t.chip(form.CookType === o)}
            onClick={() => setF("CookType", form.CookType === o ? "" : o)}>{o}</div>
        ))}
      </div>
      <div style={{ ...t.subLabel, marginTop: "14px" }}>Helper's gender preference</div>
      <div style={t.genderRow}>
        {GENDER_OPTIONS.map((o) => (
          <div key={o} style={t.genderBtn(form.HelperGender === o)}
            onClick={() => setF("HelperGender", o)}>{o}</div>
        ))}
      </div>
    </SubSection>
  );

  if (svc === "Patient Care" || svc === "Elderly Care") return (
    <SubSection>
      <div style={t.subLabel}>Helper's gender preference</div>
      <div style={t.genderRow}>
        {GENDER_OPTIONS.map((o) => (
          <div key={o} style={t.genderBtn(form.HelperGender === o)}
            onClick={() => setF("HelperGender", o)}>{o}</div>
        ))}
      </div>
    </SubSection>
  );

  if (svc === "Driver") return (
    <SubSection>
      <div style={t.subLabel}>Availability required</div>
      <div style={t.chipRow}>
        {DRIVER_HOURS_OPTIONS.map((o) => (
          <div key={o} style={t.chip(form.DriverHours === o)}
            onClick={() => setF("DriverHours", form.DriverHours === o ? "" : o)}>{o}</div>
        ))}
      </div>
    </SubSection>
  );

  return null;
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function DemandForm() {
  const [form, setForm] = useState({ ...INIT });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const [statusMsg, setStatusMsg] = useState("");
  const navigate = useNavigate();

  const setF = (key, val) => {
    setForm((f) => ({ ...f, [key]: val }));
    if (errors[key]) setErrors((e) => { const c = { ...e }; delete c[key]; return c; });
  };

  const toggleMulti = (key, val) => {
    setForm((f) => ({
      ...f,
      [key]: f[key].includes(val) ? f[key].filter((x) => x !== val) : [...f[key], val],
    }));
    if (errors[key]) setErrors((e) => { const c = { ...e }; delete c[key]; return c; });
  };

  const selectService = (svc) => {
    setForm((f) => ({
      ...f,
      ServiceType: svc,
      HelperGender: "",
      TaskPreference: "",
      CookType: "",
      ChildAgeGroup: [],
      DriverHours: "",
    }));
    if (errors.ServiceType) setErrors((e) => { const c = { ...e }; delete c.ServiceType; return c; });
  };

  const validate = () => {
    const e = {};
    if (!form.FullName.trim()) e.FullName = "Name is required";
    if (!form.Address.trim()) e.Address = "Address is required";

    if (!form.Accommodation.trim()) e.Accommodation = "This field is required";
    if (!form.Meals.trim()) e.Meals = "This field is required";
    if (!form.Phone || form.Phone.length !== 10 || !/^[6-9]/.test(form.Phone))
      e.Phone = "Enter a valid 10-digit Indian mobile number";
    if (!form.ServiceType) e.ServiceType = "Please select a service type";
    if (!form.Budget) e.Budget = "Please select a budget range";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    setStatus(null);
    try {
      const zohoFields = buildZohoFields({
        ...form,
        PlanType: "Priority",
        PaymentStatus: "Paid",
      });
      await axios.post(`${API_BASE}/submit-nopay`, { zohoFields });
      setForm({ ...INIT });
      navigate("/thank-you", { state: { fromForm: "demand" } });
    } catch (err) {
      setStatus("error");
      setStatusMsg(
        err?.response?.data?.error ||
        "Something went wrong. Please try again or call us on +91 92112 98139."
      );
    }
    setSubmitting(false);
  };

  const svc = form.ServiceType;

  return (
    <>
      <SEO title="Share Your Requirement" description="" noIndex={true} />
      <div style={t.page}>
        <div style={t.card}>

          {/* ── Header ── */}
          <div style={t.header}>
            <div style={t.logoCircle}>
              <img
                src="/logoOnly.webp"
                alt="Domestic Pro"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div style={t.headerText}>
              <p style={t.headerTitle}>Domestic Pro</p>
              <p style={t.headerSub}>
                Share your requirement — we'll match the right helper for your home.
              </p>
            </div>
          </div>

          <div style={t.body}>

            {/* ── Personal details ── */}
            <div style={t.sectionLabel}>Your details</div>

            <div style={t.row2}>
              <div style={t.field}>
                <label style={t.label}>Full name <span style={t.req}>*</span></label>
                <FocusInput
                  type="text"
                  value={form.FullName}
                  onChange={(e) => setF("FullName", e.target.value)}
                  placeholder="Rahul"
                  style={t.input}
                />
                <Err msg={errors.FullName} />
              </div>

              <div style={t.field}>
                <label style={t.label}>Contact number <span style={t.req}>*</span></label>
                <div style={t.phoneWrap}>
                  <span style={t.phonePrefix}>+91</span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={form.Phone}
                    onChange={(e) => setF("Phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                    placeholder="98765 43210"
                    style={t.phoneInput}
                  />
                </div>
                <Err msg={errors.Phone} />
              </div>
            </div>


            <div style={t.field}>
              <label style={t.label}>Address</label>
              <FocusInput
                type="text"
                value={form.Address}
                onChange={(e) => setF("Address", e.target.value)}
                placeholder="Sector, colony, city"
                style={t.input}
              />
              <Err msg={errors.Address} />
            </div>

            <hr style={t.divider} />

            {/* ── Service selection ── */}
            <div style={t.sectionLabel}>Service required <span style={t.req}>*</span></div>

            <div style={t.serviceGrid}>
              {SERVICE_OPTIONS.map(({ value, label, desc }) => {
                const active = svc === value;
                return (
                  <div
                    key={value}
                    style={t.serviceCard(active)}
                    onClick={() => selectService(value)}
                  >
                    <div style={t.serviceCardTitle(active)}>{label}</div>
                    <div style={t.serviceCardDesc}>{desc}</div>
                  </div>
                );
              })}
            </div>
            <Err msg={errors.ServiceType} />

            {/* ── Service sub-options ── */}
            {svc && (
              <ServiceSubOptions
                svc={svc}
                form={form}
                setF={setF}
                toggleMulti={toggleMulti}
              />
            )}

            <hr style={t.divider} />

            {/* ── Preferences ── */}
            <div style={t.sectionLabel}>Preferences</div>

            <div style={t.field}>
              <label style={t.label}>Salary range (per month) <span style={t.req}>*</span></label>
              <div style={t.bigChipRow}>
                {BUDGET_OPTIONS.map((o) => (
                  <div
                    key={o}
                    style={t.bigChip(form.Budget === o)}
                    onClick={() => setF("Budget", o)}
                  >
                    {o}
                  </div>
                ))}
              </div>
              <Err msg={errors.Budget} />
            </div>

            <div style={t.field}>
              <label style={t.label}>Accommodation</label>
              <div style={t.bigChipRow}>
                {ACCOMMODATION_OPTIONS.map((o) => (
                  <div
                    key={o}
                    style={t.bigChip(form.Accommodation === o)}
                    onClick={() => setF("Accommodation", o)}
                  >
                    {o}
                  </div>
                ))}
              </div>
              <Err msg={errors.Accommodation} />
            </div>

            <div style={t.field}>
              <label style={t.label}>Meals</label>
              <div style={t.bigChipRow}>
                {MEAL_OPTIONS.map((o) => (
                  <div
                    key={o}
                    style={t.bigChip(form.Meals === o)}
                    onClick={() => setF("Meals", o)}
                  >
                    {o}
                  </div>
                ))}
              </div>
              <Err msg={errors.Meals} />
            </div>

            <div style={t.field}>
              <label style={t.label}>Special instructions</label>
              <textarea
                rows={3}
                maxLength={500}
                value={form.Instructions}
                onChange={(e) => setF("Instructions", e.target.value)}
                placeholder="Specific timing, language, dietary restrictions, any other requirements…"
                style={t.textarea}
              />
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              style={submitting ? t.submitBtnDisabled : t.submitBtn}
            >
              {submitting ? "Submitting…" : "Submit requirement →"}
            </button>

            {status === "error" && (
              <div style={t.errorBanner}>⚠ {statusMsg}</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}