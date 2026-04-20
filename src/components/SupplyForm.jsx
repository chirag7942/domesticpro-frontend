import { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_REACT_APP_API || "";

// ─── SC List ──────────────────────────────────────────────────────────────────
export const scList = [
  { id: "SC-01", name: "Pallavi", email: "pallavi.domesticpro@gmail.com", phone: "9211298139" }
];

// ─── Constants ────────────────────────────────────────────────────────────────
const SERVICE_TYPES = [
  "Live-In Support", "Cooking Help", "Baby Caretaker", "Patient Care", "Driver", "Japa",
];
const SERVICE_FORMATS = ["Live-In", "Substitute"];
const GENDER_OPTIONS = ["Male", "Female", "Other"];
const MARITAL_OPTIONS = ["Yes", "No"];
const STATUS_OPTIONS = ["Active", "Inactive", "Will be Available Soon"];
const PIPELINE_STAGE_DEFAULT = "Profile Created";
const AVAILABILITY_OPTIONS = ["Immediately", "Within 15-20 days", "Within 30 days"];

// Service-type-specific options
const TASK_OPTIONS = ["Cleaning", "Utensils", "Laundry", "Dusting", "Bathroom", "Groceries", "Other"];
const HOUSE_SIZE_OPTIONS = ["1BHK", "2BHK", "3BHK", "4BHK", "Villa"];
// NOTE: "Non- Veg" matches the exact choice value in Zoho Creator (space before Veg)
const MEAL_PREF_OPTIONS = ["Veg", "Non- Veg", "Both"];
const CUISINE_OPTIONS = ["North Indian", "South Indian", "Chinese", "Continental", "Diet Food", "Other"];
const CHILD_AGE_OPTIONS = ["0 - 1 Year", "2 - 5 Years", "6 - 12 Years", "13+ Years"];
const CHILD_DUTY_OPTIONS = ["Feeding", "Bathing", "Homework", "Playtime", "Putting to sleep", "Other"];
const CARE_NEEDED_OPTIONS = ["Basic Support", "Personal Hygiene", "Mobility Support", "Medicine Reminders", "Full Care"];
const PATIENT_GENDER_OPTIONS = ["Male", "Female", "Other"];
const VEHICLE_TYPE_OPTIONS = ["Manual", "Automatic", "SUV", "Sedan"];
const DRIVING_LICENSE_OPTIONS = ["Yes", "No"];
const JAPA_DUTY_OPTIONS = ["Newborn Bath", "Feeding Support", "Swaddling", "Night Watch", "Other"];
const JAPA_MOTHER_OPTIONS = ["Body Massage", "Diet & Nutrition", "Light Cooking", "Night Support", "Personal Hygiene", "Other"];

// ─── INIT STATE ───────────────────────────────────────────────────────────────
const INIT = {
  FullName: "", Phone: "", Gender: "", Age: "", MaritalStatus: "",
  Street: "", CurrentCity: "", State: "",
  NativeCity: "", PreferredWorkAreas: "", PrefCity: "", PrefState: "",
  Status: "", ServiceType: "", ServiceFormat: "",
  Email: "", ReferredBy: "", SCAssigned: "",
  AvailableFrom: "",
  Availability: "", SalaryExpectation: "", YearsOfExperience: "", Instructions: "",
  Photograph: null, AadharCard: null, AadharCardBack: null,
  // service-type fields
  Tasks: [], HouseSize: "", PeopleAtHome: "", PetsAtHome: "", ComfortablePets: "",
  MealPref: "", CuisinePref: [], ComfortableFamilySize: "",
  ChildAge: "", ChildDuties: [],
  PatientAge: "", PatientGender: "", CareNeeded: [],
  VehicleType: [], DrivingLicense: "",
  JapaDuties: [], JapaMotherNeeds: [],
};

// ─── Styles (matching demand form) ───────────────────────────────────────────
const s = {
  page: { minHeight: "100vh", background: "#F5F5F5", padding: "24px 16px 48px", fontFamily: "'Segoe UI', Arial, sans-serif" },
  card: { maxWidth: "50rem", margin: "0 auto", background: "#fff", borderRadius: 4, border: "1px solid #ddd", overflow: "hidden" },
  header: { display: "flex", alignItems: "center", gap: 16, padding: "20px 24px", borderBottom: "2px solid #EC5F36", background: "#fff" },
  logoBox: { width: "6.5rem", height: 64, background: "#ffffff", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  headerTitle: { fontSize: 20, fontWeight: 700, color: "#111", lineHeight: 1.3, margin: 0 },
  headerSub: { fontSize: 12, color: "#777", marginTop: 3 },
  body: { padding: "0 24px 24px" },
  sectionBar: { background: "#f9f9f9", borderLeft: "3px solid #EC5F36", padding: "7px 12px", margin: "24px -24px 18px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#EC5F36" },
  field: { marginBottom: 14 },
  label: { display: "block", fontSize: 13, fontWeight: 600, color: "#333", marginBottom: 5 },
  req: { color: "#EC5F36", marginLeft: 2 },
  input: { width: "100%", border: "1px solid #ccc", borderRadius: 3, padding: "7px 10px", fontSize: 14, color: "#111", background: "#fff", outline: "none", boxSizing: "border-box", fontFamily: "inherit" },
  inputFocus: { borderColor: "#EC5F36" },
  select: { width: "100%", border: "1px solid #ccc", borderRadius: 3, padding: "7px 10px", fontSize: 14, color: "#111", background: "#fff", outline: "none", boxSizing: "border-box", appearance: "none", cursor: "pointer", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center", fontFamily: "inherit" },
  textarea: { width: "100%", border: "1px solid #ccc", borderRadius: 3, padding: "7px 10px", fontSize: 14, color: "#111", background: "#fff", outline: "none", resize: "vertical", minHeight: 80, boxSizing: "border-box", fontFamily: "inherit" },
  radioRow: { display: "flex", flexDirection: "column", gap: 7, marginTop: 2 },
  radioRowH: { display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "7px 20px", marginTop: 2 },
  radioLabel: { display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#222", cursor: "pointer", fontWeight: 400 },
  radioInput: { width: 15, height: 15, accentColor: "#EC5F36", cursor: "pointer", margin: 0 },
  checkLabel: { display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#222", cursor: "pointer", fontWeight: 400 },
  checkInput: { width: 14, height: 14, accentColor: "#EC5F36", cursor: "pointer", margin: 0 },
  row2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 },
  row3: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 },
  phoneWrap: { display: "flex" },
  phonePrefix: { background: "#f4f4f4", border: "1px solid #ccc", borderRight: "none", borderRadius: "3px 0 0 3px", padding: "7px 10px", fontSize: 14, color: "#555", whiteSpace: "nowrap", display: "flex", alignItems: "center" },
  phoneInput: { flex: 1, border: "1px solid #ccc", borderRadius: "0 3px 3px 0", padding: "7px 10px", fontSize: 14, color: "#111", background: "#fff", outline: "none", fontFamily: "inherit" },
  errText: { fontSize: 11, color: "#c00", marginTop: 3, display: "block" },
  submitBtn: { width: "100%", padding: "11px", background: "#EC5F36", color: "#fff", border: "none", borderRadius: 3, fontSize: 15, fontWeight: 700, cursor: "pointer", marginTop: 24, letterSpacing: "0.01em" },
  submitBtnDisabled: { width: "100%", padding: "11px", background: "#ddd", color: "#999", border: "none", borderRadius: 3, fontSize: 15, fontWeight: 700, cursor: "not-allowed", marginTop: 24 },
  successBanner: { background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 3, padding: "12px 14px", fontSize: 13, color: "#166534", fontWeight: 600, marginTop: 14 },
  errorBanner: { background: "#fff5f5", border: "1px solid #fecaca", borderRadius: 3, padding: "12px 14px", fontSize: 13, color: "#991b1b", fontWeight: 600, marginTop: 14 },
  // Photo upload styles
  photoUploadBox: { border: "1.5px dashed #ccc", borderRadius: 4, padding: "14px 12px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer", background: "#fafafa", transition: "border-color 0.2s" },
  photoUploadBoxActive: { borderColor: "#EC5F36", background: "#fdf6f3" },
  photoPreview: { width: 54, height: 54, objectFit: "cover", borderRadius: 3, border: "1px solid #ddd", flexShrink: 0 },
  photoPlaceholder: { width: 54, height: 54, background: "#f0f0f0", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  photoText: { fontSize: 13, color: "#555" },
  photoChange: { fontSize: 11, color: "#EC5F36", marginTop: 2 },
  infoTag: { display: "inline-block", fontSize: 11, background: "#fff3cd", color: "#856404", border: "1px solid #ffc107", borderRadius: 3, padding: "2px 7px", marginBottom: 10 },
};

// ─── Sub-components ───────────────────────────────────────────────────────────
const SectionBar = ({ children }) => <div style={s.sectionBar}>{children}</div>;
const Err = ({ msg }) => msg ? <span style={s.errText}>{msg}</span> : null;

const TextInput = ({ label, required, value, onChange, placeholder, type = "text", maxLength }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div style={s.field}>
      <label style={s.label}>{label}{required && <span style={s.req}>*</span>}</label>
      <input type={type} value={value} onChange={onChange} placeholder={placeholder} maxLength={maxLength}
        style={{ ...s.input, ...(focused ? s.inputFocus : {}) }}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
    </div>
  );
};

const RadioGroup = ({ label, required, value, onChange, options, horizontal }) => (
  <div style={s.field}>
    <label style={s.label}>{label}{required && <span style={s.req}>*</span>}</label>
    <div style={horizontal ? s.radioRowH : s.radioRow}>
      {options.map((o) => (
        <label key={o} style={s.radioLabel}>
          <input type="radio" style={s.radioInput} checked={value === o} onChange={() => onChange(o)} />
          {o}
        </label>
      ))}
    </div>
  </div>
);

const CheckboxGroup = ({ label, required, values, onChange, options, horizontal }) => (
  <div style={s.field}>
    <label style={s.label}>{label}{required && <span style={s.req}>*</span>}</label>
    <div style={horizontal ? s.radioRowH : s.radioRow}>
      {options.map((o) => (
        <label key={o} style={s.checkLabel}>
          <input type="checkbox" style={s.checkInput} checked={values.includes(o)} onChange={() => onChange(o)} />
          {o}
        </label>
      ))}
    </div>
  </div>
);

const PhotoUpload = ({ label, required, value, onChange, fieldKey }) => {
  const inputRef = useRef();
  const [hover, setHover] = useState(false);
  const preview = value ? URL.createObjectURL(value) : null;
  return (
    <div style={s.field}>
      <label style={s.label}>{label}{required && <span style={s.req}>*</span>}</label>
      <div
        style={{ ...s.photoUploadBox, ...(hover ? s.photoUploadBoxActive : {}) }}
        onClick={() => inputRef.current.click()}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {preview
          ? <img src={preview} alt="preview" style={s.photoPreview} />
          : (
            <div style={s.photoPlaceholder}>
              <svg width="22" height="22" fill="none" stroke="#bbb" strokeWidth="1.8" viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
          )
        }
        <div>
          <div style={s.photoText}>{value ? value.name : "Click to select image"}</div>
          <div style={s.photoChange}>{value ? "Tap to change" : "JPG, PNG, HEIC supported"}</div>
        </div>
      </div>
      <input ref={inputRef} type="file" accept="image/*" style={{ display: "none" }}
        onChange={(e) => { if (e.target.files[0]) onChange(e.target.files[0]); }} />
    </div>
  );
};

// ─── Date formatter — Zoho Creator expects dd-MMM-yyyy e.g. 05-May-2026 ──────
function formatZohoDate(isoDate) {
  if (!isoDate) return "";
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const d = new Date(isoDate + "T00:00:00"); // force local midnight, avoid UTC shift
  const dd = String(d.getDate()).padStart(2, "0");
  const mmm = MONTHS[d.getMonth()];
  const yyyy = d.getFullYear();
  return `${dd}-${mmm}-${yyyy}`;
}

// ─── Build Zoho Fields ────────────────────────────────────────────────────────
function buildZohoFields(f, sc, pipelineStage) {
  return {
    Full_Name: f.FullName,
    Mobile_Number: f.Phone,
    Gender1: f.Gender,
    Age: f.Age,
    Marital_Status: f.MaritalStatus,
    Street_Address: f.Street,
    Current_City: f.CurrentCity,
    State: f.State,
    Native_City: f.NativeCity,
    City: f.PrefCity,
    Service_Type: f.ServiceType,
    Service_Format: f.ServiceFormat,
    Status: f.Status,
    Helper_s_Available_From: formatZohoDate(f.AvailableFrom),
    Pipeline_Stage: pipelineStage,
    SC_Assigned: f.SCAssigned,
    SC_Email: sc?.email || "",
    SC_User: sc?.name || "",
    Referred_By: f.ReferredBy,
    Urgency: f.Availability,
    Experience_Required: f.YearsOfExperience,
    Monthly_Budget: f.SalaryExpectation,
    Tasks_Needed: f.Tasks,
    House_Size: f.HouseSize,
    People_At_Home: f.PeopleAtHome,
    Pets_At_Home: f.PetsAtHome,
    Comfortable_With_Pets: f.ComfortablePets,
    Child_Age: f.ChildAge,
    Child_Duties: f.ChildDuties,
    Cuisine_Preference: f.CuisinePref,
    Comfortable_Family_Size: f.ComfortableFamilySize,
    Meal_Preferences: f.MealPref,
    Vehicle_Type: f.VehicleType,
    Driving_License: f.DrivingLicense,
    Japa_Child_Duties: f.JapaDuties,
    Japa_Mother_Duties: f.JapaMotherNeeds,
    Patient_Age: f.PatientAge,
    Patient_Gender: f.PatientGender,
    Care_Needed: f.CareNeeded,
  };
}

// ─── Main Form Component ──────────────────────────────────────────────────────
export default function SupplyForm() {
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
    if (!form.FullName.trim()) e.FullName = "Full name is required";
    if (!form.Phone || form.Phone.length !== 10 || !/^[6-9]/.test(form.Phone))
      e.Phone = "Enter a valid 10-digit Indian mobile number";
    if (!form.Gender) e.Gender = "Gender is required";
    if (!form.Age || isNaN(form.Age) || Number(form.Age) < 18 || Number(form.Age) > 70)
      e.Age = "Enter a valid age (18–70)";
    if (!form.Street.trim()) e.Street = "Street / area is required";
    if (!form.CurrentCity.trim()) e.CurrentCity = "City is required";
    if (!form.NativeCity.trim()) e.NativeCity = "Native city is required";
    if (!form.PrefCity.trim()) e.PrefCity = "Preferred city is required";
    if (!form.Status) e.Status = "Status is required";
    if (!form.ServiceType) e.ServiceType = "Please select a service type";
    if (!form.ServiceFormat) e.ServiceFormat = "Service format is required";
    if (!form.ReferredBy.trim()) e.ReferredBy = "Referred by is required";
    if (!form.SCAssigned) e.SCAssigned = "SC Assigned is required";
    if (!form.Availability) e.Availability = "Availability is required";
    if (!form.SalaryExpectation.trim()) e.SalaryExpectation = "Salary expectation is required";

    // Status-based validation
    if (form.Status === "Will be Available Soon") {
      if (!form.AvailableFrom) {
        e.AvailableFrom = "Please set Helper's Available From date when status is 'Will be Available Soon'";
      } else {
        const today = new Date(); today.setHours(0, 0, 0, 0);
        const avDate = new Date(form.AvailableFrom);
        if (avDate < today) e.AvailableFrom = "Available From date cannot be in the past";
      }
    }

    // Service-type specific
    if (form.ServiceType === "Live-In Support" && form.Tasks.length === 0) e.Tasks = "Select at least one task";
    if (form.ServiceType === "Live-In Support" && !form.ComfortablePets) e.ComfortablePets = "Please select pet preference";
    if (form.ServiceType === "Cooking Help" && form.CuisinePref.length === 0) e.CuisinePref = "Select at least one cuisine";
    if (form.ServiceType === "Baby Caretaker" && !form.ChildAge) e.ChildAge = "Select child's age group";
    if (form.ServiceType === "Baby Caretaker" && form.ChildDuties.length === 0) e.ChildDuties = "Select at least one duty";
    if (form.ServiceType === "Patient Care" && !form.PatientAge.trim()) e.PatientAge = "Patient age is required";
    if (form.ServiceType === "Patient Care" && form.CareNeeded.length === 0) e.CareNeeded = "Select at least one care type";
    if (form.ServiceType === "Driver" && form.VehicleType.length === 0) e.VehicleType = "Select at least one vehicle type";
    if (form.ServiceType === "Japa" && form.JapaDuties.length === 0) e.JapaDuties = "Select at least one Japa duty";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      // scroll to first error
      const firstErrEl = document.querySelector("[data-err='true']");
      if (firstErrEl) firstErrEl.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setSubmitting(true);
    setStatus(null);
    try {
      const sc = scList.find((x) => x.name === form.SCAssigned);
      const zohoFields = buildZohoFields(form, sc, PIPELINE_STAGE_DEFAULT);

      const formData = new FormData();
      formData.append("zohoFields", JSON.stringify(zohoFields));
      if (form.Photograph) formData.append("Photograph", form.Photograph);
      if (form.AadharCard) formData.append("Aadhaar_Card", form.AadharCard);
      if (form.AadharCardBack) formData.append("Aadhar_Card_Back", form.AadharCardBack);

      await axios.post(`${API_BASE}/submit-supply`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setStatus("success");
      setStatusMsg("Helper profile submitted successfully! Our team will review it shortly.");
      setForm({ ...INIT });
      navigate("/thank-you", { state: { fromForm: "supply" } });
    } catch (err) {
      setStatus("error");
      setStatusMsg(err?.response?.data?.error || "Something went wrong. Please try again or call us on +91 92112 98139.");
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
            <img src="./logoOnly.png" alt="DomesticPro logo" style={{ maxWidth: "100%", maxHeight: "100%" }} />
          </div>
          <div>
            <p style={s.headerTitle}>DomesticPro – Helper Registration</p>
            <p style={s.headerTitle}>Supply Onboarding Form</p>
            <p style={s.headerSub}>Register a new helper profile with complete details and documents.</p>
          </div>
        </div>

        <div style={s.body}>

          {/* ── PERSONAL DETAILS ── */}
          <SectionBar>Personal Details</SectionBar>

          {/* Full Name */}
          <div style={s.field}>
            <label style={s.label}>Full Name<span style={s.req}>*</span></label>
            <input type="text" value={form.FullName} onChange={(e) => setF("FullName", e.target.value)}
              placeholder="e.g. Priya Kumari" style={s.input} />
            <Err msg={errors.FullName} />
          </div>

          {/* Phone */}
          <div style={s.field}>
            <label style={s.label}>Mobile Number<span style={s.req}>*</span></label>
            <div style={s.phoneWrap}>
              <span style={s.phonePrefix}>+91</span>
              <input type="tel" inputMode="numeric" maxLength={10} value={form.Phone}
                onChange={(e) => setF("Phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                placeholder="98765 43210" style={s.phoneInput} />
            </div>
            <Err msg={errors.Phone} />
          </div>

          {/* Gender & Age */}
          <div style={s.row2}>
            <div style={s.field}>
              <label style={s.label}>Gender<span style={s.req}>*</span></label>
              <select value={form.Gender} onChange={(e) => setF("Gender", e.target.value)} style={s.select}>
                <option value="" disabled>Select…</option>
                {GENDER_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
              <Err msg={errors.Gender} />
            </div>
            <div style={s.field}>
              <label style={s.label}>Age<span style={s.req}>*</span></label>
              <input type="number" value={form.Age} onChange={(e) => setF("Age", e.target.value)}
                placeholder="e.g. 28" style={s.input} min="18" max="70" />
              <Err msg={errors.Age} />
            </div>
          </div>

          {/* Marital Status */}
          <div style={s.field}>
            <label style={s.label}>Marital Status</label>
            <select value={form.MaritalStatus} onChange={(e) => setF("MaritalStatus", e.target.value)} style={s.select}>
              <option value="">Select…</option>
              {MARITAL_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>

          {/* Current Address */}
          <div style={s.field}>
            <label style={s.label}>Current Address<span style={s.req}>*</span></label>
            <input type="text" value={form.Street} onChange={(e) => setF("Street", e.target.value)}
              placeholder="Street / Area / Locality" style={{ ...s.input, marginBottom: 8 }} />
            <Err msg={errors.Street} />
            <div style={s.row2}>
              <div>
                <input type="text" value={form.CurrentCity} onChange={(e) => setF("CurrentCity", e.target.value)}
                  placeholder="City" style={s.input} />
                <Err msg={errors.CurrentCity} />
              </div>
              <input type="text" value={form.State} onChange={(e) => setF("State", e.target.value)}
                placeholder="State" style={s.input} />
            </div>
          </div>

          {/* Native City */}
          <div style={s.field}>
            <label style={s.label}>Native City<span style={s.req}>*</span></label>
            <input type="text" value={form.NativeCity} onChange={(e) => setF("NativeCity", e.target.value)}
              placeholder="e.g. Patna" style={s.input} />
            <Err msg={errors.NativeCity} />
          </div>

          {/* Preferred Work Areas */}
          <div style={s.field}>
            <label style={s.label}>Preferred Work Areas<span style={s.req}>*</span></label>
            <div style={s.row2}>
              <div>
                <input type="text" value={form.PrefCity} onChange={(e) => setF("PrefCity", e.target.value)}
                  placeholder="City" style={s.input} />
                <Err msg={errors.PrefCity} />
              </div>
              <input type="text" value={form.PrefState} onChange={(e) => setF("PrefState", e.target.value)}
                placeholder="State" style={s.input} />
            </div>
          </div>

          {/* ── STATUS & SERVICE ── */}
          <SectionBar>Status &amp; Service</SectionBar>

          {/* Status */}
          <div style={s.field}>
            <label style={s.label}>Status<span style={s.req}>*</span></label>
            <div style={s.radioRowH}>
              {STATUS_OPTIONS.map((o) => (
                <label key={o} style={s.radioLabel}>
                  <input type="radio" style={s.radioInput} name="status" checked={form.Status === o} onChange={() => setF("Status", o)} />
                  {o}
                </label>
              ))}
            </div>
            <Err msg={errors.Status} />
          </div>

          {/* Available From (conditional) */}
          {form.Status === "Will be Available Soon" && (
            <div style={s.field} data-err={!!errors.AvailableFrom ? "true" : "false"}>
              <label style={s.label}>Helper's Available From<span style={s.req}>*</span></label>
              <div style={{ ...{ fontSize: 11, color: "#856404", background: "#fff3cd", border: "1px solid #ffc107", borderRadius: 3, padding: "4px 8px", marginBottom: 8, display: "inline-block" } }}>
                Required when status is "Will be Available Soon"
              </div>
              <input type="date" value={form.AvailableFrom} onChange={(e) => setF("AvailableFrom", e.target.value)}
                min={new Date().toISOString().split("T")[0]} style={s.input} />
              <Err msg={errors.AvailableFrom} />
            </div>
          )}

          {/* Service Type */}
          <div style={s.field}>
            <label style={s.label}>Service Type<span style={s.req}>*</span></label>
            <select value={form.ServiceType} onChange={(e) => setF("ServiceType", e.target.value)} style={s.select}>
              <option value="" disabled>Please Select</option>
              {SERVICE_TYPES.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
            <Err msg={errors.ServiceType} />
          </div>

          {/* Service Format */}
          <div style={s.field}>
            <label style={s.label}>Service Format<span style={s.req}>*</span></label>
            <div style={s.radioRowH}>
              {SERVICE_FORMATS.map((o) => (
                <label key={o} style={s.radioLabel}>
                  <input type="radio" style={s.radioInput} name="serviceFormat" checked={form.ServiceFormat === o} onChange={() => setF("ServiceFormat", o)} />
                  {o}
                </label>
              ))}
            </div>
            <Err msg={errors.ServiceFormat} />
          </div>



          {/* ── SERVICE-TYPE SPECIFIC SECTIONS ── */}
          {svc === "Live-In Support" && (
            <>
              <SectionBar>Live-In Support Details</SectionBar>
              <CheckboxGroup label="Tasks Helper Can Perform" required values={form.Tasks}
                onChange={(v) => toggleArr("Tasks", v)} options={TASK_OPTIONS} />
              <Err msg={errors.Tasks} />
              <div style={s.field}>
                <label style={s.label}>House Size Comfortable With</label>
                <select value={form.HouseSize} onChange={(e) => setF("HouseSize", e.target.value)} style={s.select}>
                  <option value="">Select…</option>
                  {HOUSE_SIZE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div style={s.field}>
                <label style={s.label}>Comfortable With Pets?<span style={s.req}>*</span></label>
                <div style={s.radioRowH}>
                  {["Yes", "No"].map((o) => (
                    <label key={o} style={s.radioLabel}>
                      <input type="radio" style={s.radioInput} name="comfortablePets"
                        checked={form.ComfortablePets === o} onChange={() => setF("ComfortablePets", o)} />
                      {o}
                    </label>
                  ))}
                </div>
                <Err msg={errors.ComfortablePets} />
              </div>
            </>
          )}

          {svc === "Cooking Help" && (
            <>
              <SectionBar>Cooking Help Details</SectionBar>
              <div style={s.field}>
                <label style={s.label}>Meal Preference</label>
                <div style={s.radioRowH}>
                  {MEAL_PREF_OPTIONS.map((o) => (
                    <label key={o} style={s.radioLabel}>
                      <input type="radio" style={s.radioInput} name="mealPref" checked={form.MealPref === o} onChange={() => setF("MealPref", o)} />
                      {o}
                    </label>
                  ))}
                </div>
              </div>
              <CheckboxGroup label="Cuisine Expertise" required values={form.CuisinePref}
                onChange={(v) => toggleArr("CuisinePref", v)} options={CUISINE_OPTIONS} />
              <Err msg={errors.CuisinePref} />
              <div style={s.field}>
                <label style={s.label}>Comfortable Cooking for Family Size of</label>
                <input type="number" value={form.ComfortableFamilySize}
                  onChange={(e) => setF("ComfortableFamilySize", e.target.value)}
                  placeholder="e.g. 4" style={s.input} min="1" max="20" />
              </div>
            </>
          )}

          {svc === "Baby Caretaker" && (
            <>
              <SectionBar>Baby Caretaker Details</SectionBar>
              <div style={s.field}>
                <label style={s.label}>Child Age Groups Handled<span style={s.req}>*</span></label>
                {CHILD_AGE_OPTIONS.map((o) => (
                  <label key={o} style={s.radioLabel}>
                    <input type="radio" style={s.radioInput} name="childAge" checked={form.ChildAge === o} onChange={() => setF("ChildAge", o)} />
                    {o}
                  </label>
                ))}
                <Err msg={errors.ChildAge} />
              </div>
              <CheckboxGroup label="Skills / Tasks Can Perform" required values={form.ChildDuties}
                onChange={(v) => toggleArr("ChildDuties", v)} options={CHILD_DUTY_OPTIONS} />
              <Err msg={errors.ChildDuties} />
            </>
          )}

          {svc === "Patient Care" && (
            <>
              <SectionBar>Patient Care Details</SectionBar>
              <div style={s.field}>
                <label style={s.label}>Patient Age Group<span style={s.req}>*</span></label>
                <input type="text" value={form.PatientAge} onChange={(e) => setF("PatientAge", e.target.value)}
                  placeholder="e.g. 60–70 years" style={s.input} />
                <Err msg={errors.PatientAge} />
              </div>
              <div style={s.field}>
                <label style={s.label}>Patient Gender</label>
                <div style={s.radioRowH}>
                  {PATIENT_GENDER_OPTIONS.map((o) => (
                    <label key={o} style={s.radioLabel}>
                      <input type="radio" style={s.radioInput} name="patientGender" checked={form.PatientGender === o} onChange={() => setF("PatientGender", o)} />
                      {o}
                    </label>
                  ))}
                </div>
              </div>
              <CheckboxGroup label="Care Types Provided" required values={form.CareNeeded}
                onChange={(v) => toggleArr("CareNeeded", v)} options={CARE_NEEDED_OPTIONS} />
              <Err msg={errors.CareNeeded} />
            </>
          )}

          {svc === "Driver" && (
            <>
              <SectionBar>Driver Details</SectionBar>
              <CheckboxGroup label="Vehicle Types Can Drive" required values={form.VehicleType}
                onChange={(v) => toggleArr("VehicleType", v)} options={VEHICLE_TYPE_OPTIONS} />
              <Err msg={errors.VehicleType} />
              <div style={s.field}>
                <label style={s.label}>Has Driving License?</label>
                <div style={s.radioRowH}>
                  {DRIVING_LICENSE_OPTIONS.map((o) => (
                    <label key={o} style={s.radioLabel}>
                      <input type="radio" style={s.radioInput} name="drivingLicense" checked={form.DrivingLicense === o} onChange={() => setF("DrivingLicense", o)} />
                      {o}
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          {svc === "Japa" && (
            <>
              <SectionBar>Japa Details</SectionBar>
              <CheckboxGroup label="Japa Duties (Newborn)" required values={form.JapaDuties}
                onChange={(v) => toggleArr("JapaDuties", v)} options={JAPA_DUTY_OPTIONS} />
              <Err msg={errors.JapaDuties} />
              <CheckboxGroup label="Mother's Care Services" values={form.JapaMotherNeeds}
                onChange={(v) => toggleArr("JapaMotherNeeds", v)} options={JAPA_MOTHER_OPTIONS} />
            </>
          )}

          {/* ── ASSIGNMENT ── */}
          <SectionBar>Assignment &amp; Contact</SectionBar>

          <div style={s.field}>
            <label style={s.label}>Email Address</label>
            <input type="email" value={form.Email} onChange={(e) => setF("Email", e.target.value)}
              placeholder="helper@example.com" style={s.input} />
          </div>

          <div style={s.row2}>
            <div style={s.field}>
              <label style={s.label}>Referred By<span style={s.req}>*</span></label>
              <input type="text" value={form.ReferredBy} onChange={(e) => setF("ReferredBy", e.target.value)}
                placeholder="e.g. DP001 (Agent's code)" style={s.input} />
              <Err msg={errors.ReferredBy} />
            </div>
            <div style={s.field}>
              <label style={s.label}>SC Assigned<span style={s.req}>*</span></label>
              <select value={form.SCAssigned} onChange={(e) => setF("SCAssigned", e.target.value)} style={s.select}>
                <option value="" disabled>Select SC…</option>
                {scList.map((sc) => <option key={sc.id} value={sc.name}>{sc.name}</option>)}
              </select>
              <Err msg={errors.SCAssigned} />
            </div>
          </div>

          {/* ── DOCUMENTS ── */}
          <SectionBar>Documents &amp; Photo</SectionBar>

          <PhotoUpload label="Photograph" value={form.Photograph}
            onChange={(f) => setF("Photograph", f)} fieldKey="Photograph" />
          <PhotoUpload label="Aadhar Card (Front)" value={form.AadharCard}
            onChange={(f) => setF("AadharCard", f)} fieldKey="AadharCard" />
          <PhotoUpload label="Aadhar Card (Back)" value={form.AadharCardBack}
            onChange={(f) => setF("AadharCardBack", f)} fieldKey="AadharCardBack" />

          {/* ── AVAILABILITY & EXPECTATIONS ── */}
          <SectionBar>Availability &amp; Expectations</SectionBar>

          <div style={s.field}>
            <label style={s.label}>Availability<span style={s.req}>*</span></label>
            <div style={s.radioRowH}>
              {AVAILABILITY_OPTIONS.map((o) => (
                <label key={o} style={s.radioLabel}>
                  <input type="radio" style={s.radioInput} name="availability" checked={form.Availability === o} onChange={() => setF("Availability", o)} />
                  {o}
                </label>
              ))}
            </div>
            <Err msg={errors.Availability} />
          </div>

          <div style={s.row2}>
            <div style={s.field}>
              <label style={s.label}>Salary Expectation (₹/month)<span style={s.req}>*</span></label>
              <input type="text" value={form.SalaryExpectation} onChange={(e) => setF("SalaryExpectation", e.target.value)}
                placeholder="e.g. ₹12,000" style={s.input} />
              <Err msg={errors.SalaryExpectation} />
            </div>
            <div style={s.field}>
              <label style={s.label}>Years of Experience</label>
              <input type="number" value={form.YearsOfExperience} onChange={(e) => setF("YearsOfExperience", e.target.value)}
                placeholder="e.g. 3" style={s.input} min="0" max="40" />
            </div>
          </div>

          {/* Special Instructions */}
          <div style={s.field}>
            <label style={s.label}>Special Instructions</label>
            <textarea rows={3} maxLength={500} value={form.Instructions}
              onChange={(e) => setF("Instructions", e.target.value)}
              placeholder="Any specific notes, language spoken, health conditions, restrictions…"
              style={s.textarea} />
          </div>

          {/* Submit */}
          <button type="button" onClick={handleSubmit} disabled={submitting}
            style={submitting ? s.submitBtnDisabled : s.submitBtn}>
            {submitting ? "Submitting…" : "Submit Helper Profile →"}
          </button>

          {status === "success" && <div style={s.successBanner}>✓ {statusMsg}</div>}
          {status === "error" && <div style={s.errorBanner}>⚠ {statusMsg}</div>}

        </div>
      </div>
    </div>
  );
}