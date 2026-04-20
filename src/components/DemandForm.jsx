import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_REACT_APP_API || "";

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

    Helper_s_Gender: f.Cook_Gender, // ✅ FIXED
    Cook_Members: String(f.Cook_Members || ""), // ✅ FIXED

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

// ─── Constants ────────────────────────────────────────────────────────────────

const SERVICE_TYPES = [
  "Live-In Support",
  "Cooking Help",
  "Baby Caretaker",
  "Patient Care",
  "Driver",
  "Japa",
];

const SERVICE_FORMATS = ["Live-In", "Substitute"];

const TASK_OPTIONS = [
  "Cleaning", "Utensils", "Laundry", "Dusting", "Bathroom", "Groceries", "Other",
];

const HOUSE_SIZE_OPTIONS = ["1BHK", "2BHK", "3BHK", "4BHK", "Villa"];

const PETS_OPTIONS = ["Yes", "No"];

const MEAL_PREF_OPTIONS = ["Veg", "Non-Veg", "Both"];

const CUISINE_OPTIONS = [
  "North Indian", "South Indian", "Chinese", "Continental", "Diet Food", "Other",
];

const CHILD_DUTY_OPTIONS = [
  "Feeding", "Bathing", "Homework", "Playtime", "Putting to sleep", "Other",
];

const CHILD_AGE_OPTIONS = ["0 - 1 Year", "2 - 5 Years", "6 - 12 Years", "13+ Years"];

const PATIENT_GENDER_OPTIONS = ["Male", "Female", "Other"];

const CARE_NEEDED_OPTIONS = [
  "Basic Support", "Personal Hygiene", "Mobility Support", "Medicine Reminders", "Full Care",
];

const VEHICLE_TYPE_OPTIONS = ["Manual", "Automatic", "SUV", "Sedan"];

const JAPA_DUTY_OPTIONS = [
  "Newborn Bath", "Feeding Support", "Swaddling", "Night Watch", "Other",
];

const JAPA_MOTHER_OPTIONS = [
  "Body Massage", "Diet & Nutrition", "Light Cooking", "Night Support", "Personal Hygiene", "Other",
];

const GENDER_OPTIONS = ["Male", "Female", "Any"];

const URGENCY_OPTIONS = ["Immediately", "Within 7–15 days", "Within 30 days"];

const BUDGET_OPTIONS = ["₹25,000+", "₹18,000 – ₹24,999", "₹15,000 – ₹17,999"];

// const PLAN_OPTIONS = ["Priority", "Commitment", "No Pay"];

// const PLAN_DESCS = {
//   Priority: "₹3,540 (incl. GST) — 3 verified profiles within 24 hours, priority handling & 15-day free replacement.",
//   Commitment: "₹1,770 (incl. GST) — 2 verified profiles within 24–48 hours, standard coordination.",
//   "No Pay": "Free — profiles shared after priority requests are fulfilled. No guaranteed timeline or replacement support.",
// };

// ─── INIT STATE ───────────────────────────────────────────────────────────────
// PlanType: "", 
const INIT = {
  FirstName: "", LastName: "", Phone: "", Email: "", City: "", Street: "",
  ServiceType: "", ServiceFormat: "", Cook_Gender: "", Budget: "", Urgency: "",
  Tasks: [], HouseSize: "", PeopleAtHome: "", PetsAtHome: "",
  MealPref: "", CuisinePref: [], Cook_Members: "", ChildAge: "", ChildDuties: [],
  PatientAge: "", PatientGender: "", CareNeeded: [], VehicleType: [],
  NewbornAge: "", JapaDuties: [], JapaMotherNeeds: [], Instructions: "",
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const s = {
  page: {
    minHeight: "100vh",
    background: "#F5F5F5",
    padding: "24px 16px 48px",
    fontFamily: "'Segoe UI', Arial, sans-serif",
  },
  card: {
    maxWidth: "50rem",
    margin: "0 auto",
    background: "#fff",
    borderRadius: 4,
    border: "1px solid #ddd",
    overflow: "hidden",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    padding: "20px 24px",
    borderBottom: "2px solid #EC5F36",
    background: "#fff",
  },
  logoBox: {
    width: "6.5rem",
    height: 64,
    background: "#ffffff",
    borderRadius: 6,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  headerTitle: { fontSize: 20, fontWeight: 700, color: "#111", lineHeight: 1.3, margin: 0 },
  headerSub: { fontSize: 12, color: "#777", marginTop: 3 },
  body: { padding: "0 24px 24px" },
  sectionBar: {
    background: "#f9f9f9",
    borderLeft: "3px solid #EC5F36",
    padding: "7px 12px",
    margin: "24px -24px 18px",
    fontSize: 11,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.07em",
    color: "#EC5F36",
  },
  field: { marginBottom: 14 },
  label: {
    display: "block",
    fontSize: 13,
    fontWeight: 600,
    color: "#333",
    marginBottom: 5,
  },
  req: { color: "#EC5F36", marginLeft: 2 },
  input: {
    width: "100%",
    border: "1px solid #ccc",
    borderRadius: 3,
    padding: "7px 10px",
    fontSize: 14,
    color: "#111",
    background: "#fff",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
  },
  inputFocus: { borderColor: "#EC5F36" },
  select: {
    width: "100%",
    border: "1px solid #ccc",
    borderRadius: 3,
    padding: "7px 10px",
    fontSize: 14,
    color: "#111",
    background: "#fff",
    outline: "none",
    boxSizing: "border-box",
    appearance: "none",
    cursor: "pointer",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 10px center",
    fontFamily: "inherit",
  },
  textarea: {
    width: "100%",
    border: "1px solid #ccc",
    borderRadius: 3,
    padding: "7px 10px",
    fontSize: 14,
    color: "#111",
    background: "#fff",
    outline: "none",
    resize: "vertical",
    minHeight: 80,
    boxSizing: "border-box",
    fontFamily: "inherit",
  },
  radioRow: { display: "flex", flexDirection: "column", gap: 7, marginTop: 2 },
  radioLabel: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 14,
    color: "#222",
    cursor: "pointer",
    fontWeight: 400,
  },
  radioInput: { width: 15, height: 15, accentColor: "#EC5F36", cursor: "pointer", margin: 0 },
  checkLabel: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 14,
    color: "#222",
    cursor: "pointer",
    fontWeight: 400,
  },
  checkInput: { width: 14, height: 14, accentColor: "#EC5F36", cursor: "pointer", margin: 0 },
  row2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 },
  row3: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 },
  phoneWrap: { display: "flex" },
  phonePrefix: {
    background: "#f4f4f4",
    border: "1px solid #ccc",
    borderRight: "none",
    borderRadius: "3px 0 0 3px",
    padding: "7px 10px",
    fontSize: 14,
    color: "#555",
    whiteSpace: "nowrap",
    display: "flex",
    alignItems: "center",
  },
  phoneInput: {
    flex: 1,
    border: "1px solid #ccc",
    borderRadius: "0 3px 3px 0",
    padding: "7px 10px",
    fontSize: 14,
    color: "#111",
    background: "#fff",
    outline: "none",
    fontFamily: "inherit",
  },
  errText: { fontSize: 11, color: "#c00", marginTop: 3, display: "block" },
  planDesc: {
    fontSize: 12,
    color: "#555",
    marginTop: 8,
    padding: "8px 12px",
    background: "#fdf6f3",
    border: "1px solid #f0ddd5",
    borderRadius: 3,
    lineHeight: 1.5,
  },
  submitBtn: {
    width: "100%",
    padding: "11px",
    background: "#EC5F36",
    color: "#fff",
    border: "none",
    borderRadius: 3,
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    marginTop: 24,
    letterSpacing: "0.01em",
  },
  submitBtnDisabled: {
    width: "100%",
    padding: "11px",
    background: "#ddd",
    color: "#999",
    border: "none",
    borderRadius: 3,
    fontSize: 15,
    fontWeight: 700,
    cursor: "not-allowed",
    marginTop: 24,
  },
  footerNote: { textAlign: "center", fontSize: 12, color: "#aaa", marginTop: 8 },
  successBanner: {
    background: "#f0fdf4",
    border: "1px solid #bbf7d0",
    borderRadius: 3,
    padding: "12px 14px",
    fontSize: 13,
    color: "#166534",
    fontWeight: 600,
    marginTop: 14,
  },
  errorBanner: {
    background: "#fff5f5",
    border: "1px solid #fecaca",
    borderRadius: 3,
    padding: "12px 14px",
    fontSize: 13,
    color: "#991b1b",
    fontWeight: 600,
    marginTop: 14,
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const SectionBar = ({ children }) => (
  <div style={s.sectionBar}>{children}</div>
);

const Err = ({ msg }) => msg ? <span style={s.errText}>{msg}</span> : null;

const TextInput = ({ label, required, value, onChange, placeholder, type = "text", maxLength, style }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ ...s.field, ...style }}>
      <label style={s.label}>{label}{required && <span style={s.req}>*</span>}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        style={{ ...s.input, ...(focused ? s.inputFocus : {}) }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
};

const SelectInput = ({ label, required, value, onChange, options, placeholder, style }) => (
  <div style={{ ...s.field, ...style }}>
    <label style={s.label}>{label}{required && <span style={s.req}>*</span>}</label>
    <select value={value} onChange={onChange} style={s.select}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);

const RadioGroup = ({ label, required, value, onChange, options, horizontal }) => (
  <div style={s.field}>
    <label style={s.label}>{label}{required && <span style={s.req}>*</span>}</label>
    <div style={{ ...s.radioRow, ...(horizontal ? { flexDirection: "row", gap: 20 } : {}) }}>
      {options.map((o) => (
        <label key={o} style={s.radioLabel}>
          <input
            type="radio"
            style={s.radioInput}
            checked={value === o}
            onChange={() => onChange(o)}
          />
          {o}
        </label>
      ))}
    </div>
  </div>
);

const CheckboxGroup = ({ label, required, values, onChange, options }) => (
  <div style={s.field}>
    <label style={s.label}>{label}{required && <span style={s.req}>*</span>}</label>
    <div style={s.radioRow}>
      {options.map((o) => (
        <label key={o} style={s.checkLabel}>
          <input
            type="checkbox"
            style={s.checkInput}
            checked={values.includes(o)}
            onChange={() => onChange(o)}
          />
          {o}
        </label>
      ))}
    </div>
  </div>
);

// ─── Main Form Component ──────────────────────────────────────────────────────

export default function DemandForm() {
  const [form, setForm] = useState({ ...INIT });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const [statusMsg, setStatusMsg] = useState("");
  const navigate = useNavigate();

  const setF = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => { const c = { ...e }; delete c[k]; return c; });
  };

  const toggleArr = (k, v) => {
    setForm((f) => ({
      ...f,
      [k]: f[k].includes(v) ? f[k].filter((x) => x !== v) : [...f[k], v],
    }));
    if (errors[k]) setErrors((e) => { const c = { ...e }; delete c[k]; return c; });
  };

  const validate = () => {
    const e = {};
    if (!form.FirstName.trim()) e.FirstName = "First name is required";
    if (!form.Phone || form.Phone.length !== 10 || !/^[6-9]/.test(form.Phone))
      e.Phone = "Enter a valid 10-digit Indian mobile number";
    if (!form.City.trim()) e.City = "City is required";
    if (!form.Street.trim()) e.Street = "Street / area is required";
    if (!form.ServiceType) e.ServiceType = "Please select a service type";
    if (!form.Cook_Gender) e.Cook_Gender = "Helper's gender is required";
    if (!form.ServiceFormat) e.ServiceFormat = "Work type is required"
    if (!form.Urgency) e.Urgency = "Urgency is required";
    if (!form.Budget) e.Budget = "Please select a budget";
    // if (!form.PlanType) e.PlanType = "Please select a plan";
    if (form.ServiceType === "Live-In Support" && form.Tasks.length === 0) e.Tasks = "Select at least one task";
    if (form.ServiceType === "Cooking Help" && form.CuisinePref.length === 0) e.CuisinePref = "Select at least one cuisine";
    if (form.ServiceType === "Baby Caretaker" && !form.ChildAge) e.ChildAge = "Select child's age";
    if (form.ServiceType === "Baby Caretaker" && form.ChildDuties.length === 0) e.ChildDuties = "Select at least one duty";
    if (form.ServiceType === "Patient Care" && !form.PatientAge.trim()) e.PatientAge = "Patient age is required";
    if (form.ServiceType === "Patient Care" && form.CareNeeded.length === 0) e.CareNeeded = "Select at least one care type";
    if (form.ServiceType === "Driver" && form.VehicleType.length === 0) e.VehicleType = "Select at least one vehicle type";
    if (form.ServiceType === "Japa" && form.JapaDuties.length === 0) e.JapaDuties = "Select at least one Japa duty";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!validate()) return;
  //   setSubmitting(true);
  //   setStatus(null);
  //   const zohoFields = { ...form };
  //   const isPayment = form.PlanType === "Priority" || form.PlanType === "Commitment";
  //   try {
  //     if (isPayment) {
  //       const res = await axios.post(`${API_BASE}/create-order`, {
  //         plan: form.PlanType,
  //         customer: { phone: form.Phone, name: `${form.FirstName} ${form.LastName}`.trim(), email: form.Email },
  //         zohoFields,
  //       });
  //       setStatus("success");
  //       setStatusMsg(res.data?.payment_session_id
  //         ? "Order created! Redirecting to payment…"
  //         : "Order created! Our team will reach out with payment details.");
  //     } else {
  //       await axios.post(`${API_BASE}/submit`, zohoFields);
  //       setStatus("success");
  //       setStatusMsg("Request submitted! Our team will call you within 2 hours.");
  //       setForm({ ...INIT });
  //     }
  //   } catch (err) {
  //     setStatus("error");
  //     setStatusMsg(err?.response?.data?.error || "Something went wrong. Please try again or call us on +91 92112 98139.");
  //   }
  //   setSubmitting(false);
  // };

  const handleNopayDirectSubmit = async () => {
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
    <div style={s.page}>
      <div style={s.card}>

        {/* Header */}
        <div style={s.header}>
          <div style={s.logoBox}>
            <img src="./logoOnly.png" alt="Domesticpri-logo" />
            {/* <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
              <polygon points="26,6 46,44 6,44" fill="rgba(0,0,0,0.2)" />
              <polygon points="26,10 43,42 9,42" fill="none" stroke="white" strokeWidth="1.5" />
              <text x="26" y="34" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="white" fontFamily="sans-serif">DOMESTIC</text>
              <text x="26" y="43" textAnchor="middle" fontSize="5.5" fill="white" fontFamily="sans-serif">PRO</text>
            </svg> */}
          </div>
          <div>
            <p style={s.headerTitle}>DomesticPro – 24×7 Live-In Helper</p>
            <p style={s.headerTitle}>Demand Request Form</p>
            <p style={s.headerSub}>Fill in your details and we'll match you with the right helper within 2 hours.</p>
          </div>
        </div>

        <div style={s.body}>

          {/* ── PERSONAL DETAILS ── */}
          <SectionBar>Personal Details</SectionBar>

          {/* Name row */}
          <div style={s.row2}>
            <div style={s.field}>
              <label style={s.label}>First Name<span style={s.req}>*</span></label>
              <input
                type="text"
                value={form.FirstName}
                onChange={(e) => setF("FirstName", e.target.value)}
                placeholder="Rahul"
                style={s.input}
              />
              <Err msg={errors.FirstName} />
            </div>
            <div style={s.field}>
              <label style={s.label}>Last Name</label>
              <input
                type="text"
                value={form.LastName}
                onChange={(e) => setF("LastName", e.target.value)}
                placeholder="Sharma"
                style={s.input}
              />
            </div>
          </div>

          {/* Phone */}
          <div style={s.field}>
            <label style={s.label}>Phone Number<span style={s.req}>*</span></label>
            <div style={s.phoneWrap}>
              <span style={s.phonePrefix}>+91</span>
              <input
                type="tel"
                inputMode="numeric"
                maxLength={10}
                value={form.Phone}
                onChange={(e) => setF("Phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                placeholder="98765 43210"
                style={s.phoneInput}
              />
            </div>
            <Err msg={errors.Phone} />
          </div>

          {/* Email */}
          <TextInput
            label="Email Address"
            type="email"
            value={form.Email}
            onChange={(e) => setF("Email", e.target.value)}
            placeholder="rahul@example.com"
          />

          {/* Address */}
          <div style={s.field}>
            <label style={s.label}>Current Address<span style={s.req}>*</span></label>
            <input
              type="text"
              value={form.Street}
              onChange={(e) => setF("Street", e.target.value)}
              placeholder="Street Address"
              style={{ ...s.input, marginBottom: 8 }}
            />
            <Err msg={errors.Street} />
            <div style={s.row2}>
              <div>
                <input
                  type="text"
                  value={form.City}
                  onChange={(e) => setF("City", e.target.value)}
                  placeholder="City"
                  style={s.input}
                />
                <Err msg={errors.City} />
              </div>
              <input
                type="text"
                placeholder="State / Province"
                style={s.input}
              />
            </div>
          </div>

          {/* ── SERVICE DETAILS ── */}
          <SectionBar>Service Details</SectionBar>

          {/* Service Type */}
          <div style={s.field}>
            <label style={s.label}>Which type of household help are you looking for?<span style={s.req}>*</span></label>
            <select
              value={form.ServiceType}
              onChange={(e) => setF("ServiceType", e.target.value)}
              style={s.select}
            >
              <option value="" disabled>Please Select</option>
              {SERVICE_TYPES.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
            <Err msg={errors.ServiceType} />
          </div>

          {/* Work Type */}
          <div style={s.field}>
            <label style={s.label}>Work Type<span style={s.req}>*</span></label>
            <div style={s.radioRow}>
              {SERVICE_FORMATS.map((o) => (
                <label key={o} style={s.radioLabel}>
                  <input
                    type="radio"
                    style={s.radioInput}
                    name="workType"
                    checked={form.ServiceFormat === o}
                    onChange={() => setF("ServiceFormat", o)}
                  />
                  {o}
                </label>
              ))}
            </div>
          </div>

          {/* Gender Preference */}
          <div style={s.field}>
            <label style={s.label}>Helper's Gender Preference<span style={s.req}>*</span></label>
            <div style={s.radioRow}>
              {GENDER_OPTIONS.map((o) => (
                <label key={o} style={s.radioLabel}>
                  <input
                    type="radio"
                    style={s.radioInput}
                    name="gender"
                    checked={form.Cook_Gender === o}
                    onChange={() => setF("Cook_Gender", o)}
                  />
                  {o}
                </label>
              ))}
            </div>
            <Err msg={errors.Cook_Gender} />
          </div>

          {/* ── LIVE-IN SUPPORT ── */}
          {svc === "Live-In Support" && (
            <>
              <SectionBar>Live-In Support Details</SectionBar>
              <CheckboxGroup
                label="Tasks Required" required
                values={form.Tasks}
                onChange={(v) => toggleArr("Tasks", v)}
                options={TASK_OPTIONS}
              />
              <Err msg={errors.Tasks} />

              <div style={s.field}>
                <label style={s.label}>House Size</label>
                <select value={form.HouseSize} onChange={(e) => setF("HouseSize", e.target.value)} style={s.select}>
                  <option value="" disabled>Select…</option>
                  {HOUSE_SIZE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>

              <div style={s.field}>
                <label style={s.label}>People at Home</label>
                <input
                  type="number"
                  value={form.PeopleAtHome}
                  onChange={(e) => setF("PeopleAtHome", e.target.value)}
                  placeholder="e.g. 4"
                  style={s.input}
                  min="1"
                />
              </div>

              <div style={s.field}>
                <label style={s.label}>Pets at Home</label>
                <div style={s.radioRow}>
                  {PETS_OPTIONS.map((o) => (
                    <label key={o} style={s.radioLabel}>
                      <input
                        type="radio"
                        style={s.radioInput}
                        name="pets"
                        checked={form.PetsAtHome === o}
                        onChange={() => setF("PetsAtHome", o)}
                      />
                      {o}
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ── COOKING HELP ── */}
          {svc === "Cooking Help" && (
            <>
              <SectionBar>Cooking Help Details</SectionBar>
              <div style={s.field}>
                <label style={s.label}>Meal Preference</label>
                <div style={s.radioRow}>
                  {MEAL_PREF_OPTIONS.map((o) => (
                    <label key={o} style={s.radioLabel}>
                      <input
                        type="radio"
                        style={s.radioInput}
                        name="mealPref"
                        checked={form.MealPref === o}
                        onChange={() => setF("MealPref", o)}
                      />
                      {o}
                    </label>
                  ))}
                </div>
              </div>
              <CheckboxGroup
                label="Cuisine Preference" required
                values={form.CuisinePref}
                onChange={(v) => toggleArr("CuisinePref", v)}
                options={CUISINE_OPTIONS}
              />
              <Err msg={errors.CuisinePref} />
              <div style={s.field}>
                <label style={s.label}>Members to Cook For</label>
                <input
                  type="number"
                  value={form.Cook_Members}
                  onChange={(e) => setF("Cook_Members", e.target.value)}
                  placeholder="e.g. 4"
                  style={s.input}
                  min="1"
                />
              </div>
            </>
          )}

          {/* ── BABY CARETAKER ── */}
          {svc === "Baby Caretaker" && (
            <>
              <SectionBar>Baby Caretaker Details</SectionBar>
              <div style={s.field}>
                <label style={s.label}>Age Groups Handled (in years)<span style={s.req}>*</span></label>
                {CHILD_AGE_OPTIONS.map((o) => (
                  <label key={o} style={s.radioLabel}>
                    <input
                      type="radio"
                      style={s.radioInput}
                      name="ChildAge"
                      checked={form.ChildAge === o}
                      onChange={() => setF("ChildAge", o)}
                    />
                    {o}
                  </label>
                ))}
                <Err msg={errors.ChildAge} />
              </div>
              <CheckboxGroup
                label="Skills / Tasks Can Perform" required
                values={form.ChildDuties}
                onChange={(v) => toggleArr("ChildDuties", v)}
                options={CHILD_DUTY_OPTIONS}
              />
              <Err msg={errors.ChildDuties} />
            </>
          )}

          {/* ── PATIENT CARE ── */}
          {svc === "Patient Care" && (
            <>
              <SectionBar>Patient Care Details</SectionBar>
              <div style={s.field}>
                <label style={s.label}>Patient's Age<span style={s.req}>*</span></label>
                <input
                  type="number"
                  value={form.PatientAge}
                  onChange={(e) => setF("PatientAge", e.target.value)}
                  placeholder="e.g. 68"
                  style={s.input}
                  min="1"
                />
                <Err msg={errors.PatientAge} />
              </div>
              <div style={s.field}>
                <label style={s.label}>Patient's Gender</label>
                <div style={s.radioRow}>
                  {PATIENT_GENDER_OPTIONS.map((o) => (
                    <label key={o} style={s.radioLabel}>
                      <input
                        type="radio"
                        style={s.radioInput}
                        name="patientGender"
                        checked={form.PatientGender === o}
                        onChange={() => setF("PatientGender", o)}
                      />
                      {o}
                    </label>
                  ))}
                </div>
              </div>
              <CheckboxGroup
                label="Care Required" required
                values={form.CareNeeded}
                onChange={(v) => toggleArr("CareNeeded", v)}
                options={CARE_NEEDED_OPTIONS}
              />
              <Err msg={errors.CareNeeded} />
            </>
          )}

          {/* ── DRIVER ── */}
          {svc === "Driver" && (
            <>
              <SectionBar>Driver Details</SectionBar>
              <CheckboxGroup
                label="Vehicle Type(s)" required
                values={form.VehicleType}
                onChange={(v) => toggleArr("VehicleType", v)}
                options={VEHICLE_TYPE_OPTIONS}
              />
              <Err msg={errors.VehicleType} />
            </>
          )}

          {/* ── JAPA ── */}
          {svc === "Japa" && (
            <>
              <SectionBar>Japa Details</SectionBar>
              <div style={s.field}>
                <label style={s.label}>Newborn's Age (weeks)</label>
                <input
                  type="text"
                  value={form.NewbornAge}
                  onChange={(e) => setF("NewbornAge", e.target.value)}
                  placeholder="e.g. 2 weeks"
                  style={s.input}
                />
              </div>
              <CheckboxGroup
                label="Japa Duties (Newborn)" required
                values={form.JapaDuties}
                onChange={(v) => toggleArr("JapaDuties", v)}
                options={JAPA_DUTY_OPTIONS}
              />
              <Err msg={errors.JapaDuties} />
              <CheckboxGroup
                label="Mother's Needs"
                values={form.JapaMotherNeeds}
                onChange={(v) => toggleArr("JapaMotherNeeds", v)}
                options={JAPA_MOTHER_OPTIONS}
              />
            </>
          )}

          {/* ── PREFERENCES & PLAN ── */}
          <SectionBar>Preferences &amp; Plan</SectionBar>

          {/* Urgency */}
          <div style={s.field}>
            <label style={s.label}>Urgency<span style={s.req}>*</span></label>
            <select value={form.Urgency} onChange={(e) => setF("Urgency", e.target.value)} style={s.select}>
              <option value="" disabled>How soon?</option>
              {URGENCY_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
            <Err msg={errors.Urgency} />
          </div>

          {/* Budget */}
          <div style={s.field}>
            <label style={s.label}>Monthly Budget<span style={s.req}>*</span></label>
            <select value={form.Budget} onChange={(e) => setF("Budget", e.target.value)} style={s.select}>
              <option value="" disabled>Select budget…</option>
              {BUDGET_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
            <Err msg={errors.Budget} />
          </div>

          {/* Plan */}
          {/* <div style={s.field}>
            <label style={s.label}>Plan<span style={s.req}>*</span></label>
            <div style={s.radioRow}>
              {PLAN_OPTIONS.map((o) => (
                <label key={o} style={s.radioLabel}>
                  <input
                    type="radio"
                    style={s.radioInput}
                    name="plan"
                    checked={form.PlanType === o}
                    onChange={() => setF("PlanType", o)}
                  />
                  {o}
                </label>
              ))}
            </div>
            <Err msg={errors.PlanType} />
            {form.PlanType && (
              <div style={s.planDesc}>{PLAN_DESCS[form.PlanType]}</div>
            )}
          </div> */}

          {/* Special Instructions */}
          <div style={s.field}>
            <label style={s.label}>Special Instructions</label>
            <textarea
              rows={3}
              maxLength={500}
              value={form.Instructions}
              onChange={(e) => setF("Instructions", e.target.value)}
              placeholder="Specific timing, language preferences, dietary restrictions, any other requirements…"
              style={s.textarea}
            />
          </div>

          {/* Submit */}
          <button
            type="button"
            onClick={handleNopayDirectSubmit}
            disabled={submitting}
            style={submitting ? s.submitBtnDisabled : s.submitBtn}
          >
            {/* {submitting
              ? "Submitting…"
              : form.PlanType === "Priority" || form.PlanType === "Commitment"
                ? "Proceed to Payment →"
                : "Submit Request →"} */}
            Submit Request →
          </button>

          {status === "success" && <div style={s.successBanner}>✓ {statusMsg}</div>}
          {status === "error" && <div style={s.errorBanner}>⚠ {statusMsg}</div>}

        </div>
      </div>
    </div>
  );
}