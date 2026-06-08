import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SEO from "./SEO";

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
    Cook_Tasks: f.CookTasks,
    Driver_Tasks: f.DriverTasks,
    House_Size: f.HouseSize,
    People_At_Home: f.PeopleAtHome,
    Pets_At_Home: f.PetsAtHome,
    Meal_Preferences: f.MealPref,
    Cuisine_Preference: f.CuisinePref,
    Helper_s_Gender: f.Cook_Gender,
    Cook_Members: String(f.Cook_Members || ""),
    Child_Age: f.ChildAge,
    Child_Duties_Infant: f.ChildDutiesInfant,
    Child_Duties_Older: f.ChildDutiesOlder,
    Japa_Child_Duties: f.JapaDuties,
    Japa_Mother_Duties: f.JapaMotherNeeds,
    Patient_Age: f.PatientAge,
    Patient_Gender: f.PatientGender,
    Care_Needed: f.CareNeeded,
    Vehicle_Type: f.VehicleType,
    Monthly_Budget: f.Budget,
    Partner_Monthly_Budget: f.PartnerBudget,
    Urgency: f.Urgency,
    Special_Instructions: f.Instructions,
    Plan_Type: f.PlanType,
    Payment_Status: f.PaymentStatus,
    // ── Couple fields ─────────────────────────────────────────────────────────
    Is_Couple: f.IsCouple ? "Yes" : "No",
    helper2_Service_Type: f.helper2ServiceType || "",
    helper2_Gender: f.helper2Gender || "",
    helper2_Tasks: f.helper2Tasks || [],
    helper2_Cook_Tasks: f.helper2CookTasks || [],
    helper2_Cuisine_Preference: f.helper2CuisinePref || [],
    helper2_Meal_Preferences: f.helper2MealPref || "",
    helper2_Cook_Members: String(f.helper2CookMembers || ""),
    helper2_Driver_Tasks: f.helper2DriverTasks || [],
    helper2_Vehicle_Type: f.helper2VehicleType || [],
    helper2_Child_Age: f.helper2ChildAge || "",
    helper2_Child_Duties_Infant: f.helper2ChildDutiesInfant || [],
    helper2_Child_Duties_Older: f.helper2ChildDutiesOlder || [],
    helper2_Patient_Age: f.helper2PatientAge || "",
    helper2_Patient_Gender: f.helper2PatientGender || "",
    helper2_Care_Needed: f.helper2CareNeeded || [],
    helper2_Newborn_Age: f.helper2NewbornAge || "",
    helper2_Japa_Child_Duties: f.helper2JapaDuties || [],
    helper2_Japa_Mother_Duties: f.helper2JapaMotherNeeds || [],
    helper2_House_Size: f.helper2HouseSize || "",
    helper2_People_At_Home: f.helper2PeopleAtHome || "",
    helper2_Pets_At_Home: f.helper2PetsAtHome || "",
  };
}

// ─── Constants ────────────────────────────────────────────────────────────────
const SERVICE_TYPES = ["Live-In Support", "Cooking Help", "Baby Caretaker", "Patient Care", "Driver", "Japa"];
const SERVICE_FORMATS = ["Live-In", "Substitute"];
const TASK_OPTIONS = ["General House Cleaning", "Dusting", "Sweeping and Mopping", "Washroom Cleaning", "Basic Help in Kitchen", "Assist with Laundry", "Spend Time with Kids"];
const COOK_TASK_OPTIONS = ["Prepare Breakfast", "Prepare Lunch", "Prepare Dinner", "Clean Utensils", "Maintain Kitchen Hygiene", "Manage Basic Groceries", "Assist in Dusting", "Assist in Laundry"];
const DRIVER_TASK_OPTIONS = ["Drive as per Daily Requirement", "Can Work for 10 Hours", "Can Work for 12 Hours", "Flexible with Working Hours", "Maintain Vehicle Cleanliness", "Basic Vehicle Upkeep", "Ensure Safe and Timely Travel"];
const HOUSE_SIZE_OPTIONS = ["1BHK", "2BHK", "3BHK", "4BHK", "Villa"];
const PETS_OPTIONS = ["Yes", "No"];
const MEAL_PREF_OPTIONS = ["Veg", "Non-Veg", "Both"];
const CUISINE_OPTIONS = ["North Indian", "South Indian", "Chinese", "Continental", "Diet Food", "Other"];
const CHILD_AGE_OPTIONS = ["0 - 3 Years", "3+ Years"];
const CHILD_DUTY_OPTIONS_INFANT = ["Feeding (Milk/Solids)", "Sterilizing Bottles", "Maintaining Hygiene", "Diaper Changing", "Bathing", "Massage", "Sleep Routine", "Monitoring Health", "Basic Stimulation"];
const CHILD_DUTY_OPTIONS_OLDER = ["Meal Prep / Feeding", "School Readiness", "Engaging in Play", "Basic Learning Support", "Activity Supervision", "Maintaining Routine", "Hygiene Support", "Child Safety Supervision"];
const PATIENT_GENDER_OPTIONS = ["Male", "Female", "Other"];
const CARE_NEEDED_OPTIONS = ["Basic Support", "Personal Hygiene", "Mobility Support", "Medicine Reminders", "Full Care"];
const VEHICLE_TYPE_OPTIONS = ["Manual", "Automatic", "SUV", "Sedan"];
const JAPA_DUTY_OPTIONS = ["Newborn Bath", "Feeding Support", "Swaddling", "Night Watch", "Other"];
const JAPA_MOTHER_OPTIONS = ["Body Massage", "Diet & Nutrition", "Light Cooking", "Night Support", "Personal Hygiene", "Other"];
const GENDER_OPTIONS = ["Male", "Female", "Any"];
const URGENCY_OPTIONS = ["Immediately", "Within 7–15 days", "Within 30 days"];
const BUDGET_OPTIONS = ["₹25,000+", "₹18,000 – ₹24,999", "₹15,000 – ₹17,999"];
const PARTNER_BUDGET_OPTIONS = ["₹50,000+", "₹40,000 – ₹49,999", "₹30,000 – ₹39,999"]

// ─── INIT STATE ───────────────────────────────────────────────────────────────
const INIT = {
  FirstName: "", LastName: "", Phone: "", Email: "", City: "", Street: "",
  ServiceType: "", ServiceFormat: "", Cook_Gender: "", Budget: "", PartnerBudget: "", Urgency: "",
  Tasks: [], CookTasks: [], HouseSize: "", PeopleAtHome: "", PetsAtHome: "",
  MealPref: "", CuisinePref: [], Cook_Members: "", ChildAge: "", ChildDutiesInfant: [], ChildDutiesOlder: [],
  PatientAge: "", PatientGender: "", CareNeeded: [], VehicleType: [], DriverTasks: [],
  NewbornAge: "", JapaDuties: [], JapaMotherNeeds: [], Instructions: "",
  IsCouple: false,
  helper2ServiceType: "", helper2Gender: "",
  helper2Tasks: [], helper2CookTasks: [], helper2CuisinePref: [], helper2MealPref: "", helper2CookMembers: "",
  helper2DriverTasks: [], helper2VehicleType: [],
  helper2ChildAge: "", helper2ChildDutiesInfant: [], helper2ChildDutiesOlder: [],
  helper2PatientAge: "", helper2PatientGender: "", helper2CareNeeded: [],
  helper2NewbornAge: "", helper2JapaDuties: [], helper2JapaMotherNeeds: [],
  helper2HouseSize: "", helper2PeopleAtHome: "", helper2PetsAtHome: "",
};

const P2_RESET = {
  helper2ServiceType: "", helper2Gender: "",
  helper2Tasks: [], helper2CookTasks: [], helper2CuisinePref: [], helper2MealPref: "", helper2CookMembers: "",
  helper2DriverTasks: [], helper2VehicleType: [],
  helper2ChildAge: "", helper2ChildDutiesInfant: [], helper2ChildDutiesOlder: [],
  helper2PatientAge: "", helper2PatientGender: "", helper2CareNeeded: [],
  helper2NewbornAge: "", helper2JapaDuties: [], helper2JapaMotherNeeds: [],
  helper2HouseSize: "", helper2PeopleAtHome: "", helper2PetsAtHome: "",
};

// ─── Styles ───────────────────────────────────────────────────────────────────
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
  select: { width: "100%", border: "1px solid #ccc", borderRadius: 3, padding: "7px 10px", fontSize: 14, color: "#111", background: "#fff", outline: "none", boxSizing: "border-box", appearance: "none", cursor: "pointer", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center", fontFamily: "inherit" },
  textarea: { width: "100%", border: "1px solid #ccc", borderRadius: 3, padding: "7px 10px", fontSize: 14, color: "#111", background: "#fff", outline: "none", resize: "vertical", minHeight: 80, boxSizing: "border-box", fontFamily: "inherit" },
  radioRow: { display: "flex", flexDirection: "column", gap: 7, marginTop: 2 },
  radioRowH: { display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "7px 20px", marginTop: 2 },
  radioLabel: { display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#222", cursor: "pointer", fontWeight: 400 },
  radioInput: { width: 15, height: 15, accentColor: "#EC5F36", cursor: "pointer", margin: 0 },
  checkLabel: { display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#222", cursor: "pointer", fontWeight: 400 },
  checkInput: { width: 14, height: 14, accentColor: "#EC5F36", cursor: "pointer", margin: 0 },
  row2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 },
  phoneWrap: { display: "flex" },
  phonePrefix: { background: "#f4f4f4", border: "1px solid #ccc", borderRight: "none", borderRadius: "3px 0 0 3px", padding: "7px 10px", fontSize: 14, color: "#555", whiteSpace: "nowrap", display: "flex", alignItems: "center" },
  phoneInput: { flex: 1, border: "1px solid #ccc", borderRadius: "0 3px 3px 0", padding: "7px 10px", fontSize: 14, color: "#111", background: "#fff", outline: "none", fontFamily: "inherit" },
  errText: { fontSize: 11, color: "#c00", marginTop: 3, display: "block" },
  submitBtn: { width: "100%", padding: "11px", background: "#EC5F36", color: "#fff", border: "none", borderRadius: 3, fontSize: 15, fontWeight: 700, cursor: "pointer", marginTop: 24, letterSpacing: "0.01em" },
  submitBtnDisabled: { width: "100%", padding: "11px", background: "#ddd", color: "#999", border: "none", borderRadius: 3, fontSize: 15, fontWeight: 700, cursor: "not-allowed", marginTop: 24 },
  errorBanner: { background: "#fff5f5", border: "1px solid #fecaca", borderRadius: 3, padding: "12px 14px", fontSize: 13, color: "#991b1b", fontWeight: 600, marginTop: 14 },
  partnerBanner: { border: "1px solid #e8e8e8", borderRadius: 6, background: "#fafafa", margin: "20px 0 4px", overflow: "hidden" },
  partnerBannerActive: { border: "1px solid #EC5F36", borderRadius: 6, background: "#fff8f5", margin: "20px 0 4px", overflow: "hidden" },
  partnerHeaderRow: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", cursor: "pointer", userSelect: "none" },
  partnerIconTitle: { display: "flex", alignItems: "center", gap: 10 },
  partnerIconBox: { width: 36, height: 36, background: "#EC5F361A", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 },
  partnerTitle: { fontSize: 14, fontWeight: 700, color: "#111" },
  partnerSub: { fontSize: 12, color: "#777", marginTop: 2 },
  togglePill: { position: "relative", width: 44, height: 24, borderRadius: 12, border: "none", cursor: "pointer", transition: "background 0.2s", flexShrink: 0, padding: 0 },
  toggleKnob: { position: "absolute", top: 3, width: 18, height: 18, borderRadius: "50%", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.25)", transition: "left 0.2s" },
  partnerBody: { borderTop: "1px solid #f0e6e0", padding: "16px 16px 20px" },
  partnerSectionLabel: { fontSize: 12, fontWeight: 700, color: "#EC5F36", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 12 },
};

// ─── Sub-components ───────────────────────────────────────────────────────────
const SectionBar = ({ children }) => <div style={s.sectionBar}>{children}</div>;
const Err = ({ msg }) => msg ? <span style={s.errText}>{msg}</span> : null;

const CheckboxGroup = ({ label, required, values, onChange, options, horizontal }) => (
  <div style={s.field}>
    {/* {required && <span style={s.req}>*</span>} */}
    <label style={s.label}>{label}</label>
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

const TogglePill = ({ on, onToggle }) => (
  <button type="button" onClick={(e) => { e.stopPropagation(); onToggle(); }}
    style={{ ...s.togglePill, background: on ? "#EC5F36" : "#ccc" }}
    aria-label={on ? "Couple mode on" : "Couple mode off"}>
    <span style={{ ...s.toggleKnob, left: on ? 23 : 3 }} />
  </button>
);

// ─── ServiceBlock ─────────────────────────────────────────────────────────────
function ServiceBlock({ svc, form, toggleArr, setF, setForm, errors, keyPrefix = "", labelSuffix = "" }) {
  const k = (base) => keyPrefix ? `${keyPrefix}${base}` : base;

  if (svc === "Live-In Support") return (
    <>
      <SectionBar>Live-In Support Details{labelSuffix}</SectionBar>
      <CheckboxGroup label="Tasks Required" required values={form[k("Tasks")]}
        onChange={(v) => toggleArr(k("Tasks"), v)} options={TASK_OPTIONS} />
      <Err msg={errors[k("Tasks")]} />
      <div style={s.field}>
        <label style={s.label}>House Size</label>
        <select value={form[k("HouseSize")] || ""} onChange={(e) => setF(k("HouseSize"), e.target.value)} style={s.select}>
          <option value="">Select…</option>
          {HOUSE_SIZE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
      <div style={s.field}>
        <label style={s.label}>People at Home</label>
        <input type="number" value={form[k("PeopleAtHome")] || ""} onChange={(e) => setF(k("PeopleAtHome"), e.target.value)} placeholder="e.g. 4" style={s.input} min="1" />
      </div>
      <div style={s.field}>
        <label style={s.label}>Pets at Home</label>
        <div style={s.radioRowH}>
          {PETS_OPTIONS.map((o) => (
            <label key={o} style={s.radioLabel}>
              <input type="radio" style={s.radioInput} name={`pets${keyPrefix}`} checked={form[k("PetsAtHome")] === o} onChange={() => setF(k("PetsAtHome"), o)} />
              {o}
            </label>
          ))}
        </div>
      </div>
    </>
  );

  if (svc === "Cooking Help") return (
    <>
      <SectionBar>Cooking Help Details{labelSuffix}</SectionBar>
      <CheckboxGroup label="Cooking Tasks" required values={form[k("CookTasks")]}
        onChange={(v) => toggleArr(k("CookTasks"), v)} options={COOK_TASK_OPTIONS} />
      <Err msg={errors[k("CookTasks")]} />
      <div style={s.field}>
        <label style={s.label}>Meal Preference</label>
        <div style={s.radioRowH}>
          {MEAL_PREF_OPTIONS.map((o) => (
            <label key={o} style={s.radioLabel}>
              <input type="radio" style={s.radioInput} name={`mealPref${keyPrefix}`} checked={form[k("MealPref")] === o} onChange={() => setF(k("MealPref"), o)} />
              {o}
            </label>
          ))}
        </div>
      </div>
      <CheckboxGroup label="Cuisine Preference" required values={form[k("CuisinePref")]}
        onChange={(v) => toggleArr(k("CuisinePref"), v)} options={CUISINE_OPTIONS} />
      <Err msg={errors[k("CuisinePref")]} />
      <div style={s.field}>
        <label style={s.label}>Members to Cook For</label>
        <input type="number" value={form[k("CookMembers")] || ""} onChange={(e) => setF(k("CookMembers"), e.target.value)} placeholder="e.g. 4" style={s.input} min="1" />
      </div>
    </>
  );

  if (svc === "Baby Caretaker") return (
    <>
      <SectionBar>Baby Caretaker Details{labelSuffix}</SectionBar>
      <div style={s.field}>
        <label style={s.label}>Child's Age Group{/* <span style={s.req}>*</span> */}</label>
        {CHILD_AGE_OPTIONS.map((o) => (
          <label key={o} style={s.radioLabel}>
            <input type="radio" style={s.radioInput} name={`ChildAge${keyPrefix}`} checked={form[k("ChildAge")] === o}
              onChange={() => {
                if (!keyPrefix) setForm(f => ({ ...f, ChildAge: o, ChildDutiesInfant: [], ChildDutiesOlder: [] }));
                else setForm(f => ({ ...f, [k("ChildAge")]: o, [k("ChildDutiesInfant")]: [], [k("ChildDutiesOlder")]: [] }));
              }} />
            {o}
          </label>
        ))}
        <Err msg={errors[k("ChildAge")]} />
      </div>
      {form[k("ChildAge")] && (() => {
        const isInfant = form[k("ChildAge")] === "0 - 3 Years";
        const field = k(isInfant ? "ChildDutiesInfant" : "ChildDutiesOlder");
        return (
          <>
            <CheckboxGroup label="Duties Required" required values={form[field]}
              onChange={(v) => toggleArr(field, v)} options={isInfant ? CHILD_DUTY_OPTIONS_INFANT : CHILD_DUTY_OPTIONS_OLDER} />
            <Err msg={errors[k("ChildDuties")]} />
          </>
        );
      })()}
    </>
  );

  if (svc === "Patient Care") return (
    <>
      <SectionBar>Patient Care Details{labelSuffix}</SectionBar>
      <div style={s.field}>
        <label style={s.label}>Patient's Age{/* <span style={s.req}>*</span> */}</label>
        <input type="number" value={form[k("PatientAge")] || ""} onChange={(e) => setF(k("PatientAge"), e.target.value)} placeholder="e.g. 68" style={s.input} min="1" />
        <Err msg={errors[k("PatientAge")]} />
      </div>
      <div style={s.field}>
        <label style={s.label}>Patient's Gender</label>
        <div style={s.radioRowH}>
          {PATIENT_GENDER_OPTIONS.map((o) => (
            <label key={o} style={s.radioLabel}>
              <input type="radio" style={s.radioInput} name={`patientGender${keyPrefix}`} checked={form[k("PatientGender")] === o} onChange={() => setF(k("PatientGender"), o)} />
              {o}
            </label>
          ))}
        </div>
      </div>
      <CheckboxGroup label="Care Required" required values={form[k("CareNeeded")]}
        onChange={(v) => toggleArr(k("CareNeeded"), v)} options={CARE_NEEDED_OPTIONS} />
      <Err msg={errors[k("CareNeeded")]} />
    </>
  );

  if (svc === "Driver") return (
    <>
      <SectionBar>Driver Details{labelSuffix}</SectionBar>
      <CheckboxGroup label="Vehicle Type(s)" required values={form[k("VehicleType")]}
        onChange={(v) => toggleArr(k("VehicleType"), v)} options={VEHICLE_TYPE_OPTIONS} />
      <Err msg={errors[k("VehicleType")]} />
      <CheckboxGroup label="Driver Duties" values={form[k("DriverTasks")]}
        onChange={(v) => toggleArr(k("DriverTasks"), v)} options={DRIVER_TASK_OPTIONS} />
    </>
  );

  if (svc === "Japa") return (
    <>
      <SectionBar>Japa Details{labelSuffix}</SectionBar>
      <div style={s.field}>
        <label style={s.label}>Newborn's Age (weeks)</label>
        <input type="text" value={form[k("NewbornAge")] || ""} onChange={(e) => setF(k("NewbornAge"), e.target.value)} placeholder="e.g. 2 weeks" style={s.input} />
      </div>
      <CheckboxGroup label="Japa Duties (Newborn)" required values={form[k("JapaDuties")]}
        onChange={(v) => toggleArr(k("JapaDuties"), v)} options={JAPA_DUTY_OPTIONS} />
      <Err msg={errors[k("JapaDuties")]} />
      <CheckboxGroup label="Mother's Needs" values={form[k("JapaMotherNeeds")]}
        onChange={(v) => toggleArr(k("JapaMotherNeeds"), v)} options={JAPA_MOTHER_OPTIONS} />
    </>
  );

  return null;
}

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
    setForm((f) => ({ ...f, [k]: f[k].includes(v) ? f[k].filter((x) => x !== v) : [...f[k], v] }));
    if (errors[k]) setErrors((e) => { const c = { ...e }; delete c[k]; return c; });
  };

  const handleCoupleToggle = () => {
    if (form.IsCouple) {
      setForm(f => ({ ...f, IsCouple: false, ...P2_RESET }));
      setErrors(e => {
        const c = { ...e };
        Object.keys(P2_RESET).forEach(k => delete c[k]);
        delete c.helper2ServiceType; delete c.helper2Gender;
        return c;
      });
    } else {
      setF("IsCouple", true);
    }
  };

  const validate = () => {
    const e = {};
    if (!form.FirstName.trim()) e.FirstName = "First name is required";
    if (!form.Phone || form.Phone.length !== 10 || !/^[6-9]/.test(form.Phone)) e.Phone = "Enter a valid 10-digit Indian mobile number";
    // if (!form.City.trim()) e.City = "City is required";
    // if (!form.Street.trim()) e.Street = "Street / area is required";
    if (!form.ServiceType) e.ServiceType = "Please select a service type";
    if (!form.Cook_Gender) e.Cook_Gender = "Helper's gender is required";
    if (!form.ServiceFormat) e.ServiceFormat = "Service format is required";
    // if (!form.Urgency) e.Urgency = "Urgency is required";
    if (isCouple) {
      if (!form.PartnerBudget) {
        e.PartnerBudget = "Please select a budget";
      }
    } else {
      if (!form.Budget) {
        e.Budget = "Please select a budget";
      }
    }
    // if (form.ServiceType === "Live-In Support" && form.Tasks.length === 0) e.Tasks = "Select at least one task";
    // if (form.ServiceType === "Cooking Help" && form.CuisinePref.length === 0) e.CuisinePref = "Select at least one cuisine";
    // if (form.ServiceType === "Baby Caretaker" && !form.ChildAge) e.ChildAge = "Select child's age";
    // if (form.ServiceType === "Baby Caretaker") {
    //   const duties = form.ChildAge === "0 - 3 Years" ? form.ChildDutiesInfant : form.ChildDutiesOlder;
    //   if (duties.length === 0) e.ChildDuties = "Select at least one duty";
    // }
    // if (form.ServiceType === "Patient Care" && !String(form.PatientAge).trim()) e.PatientAge = "Patient age is required";
    // if (form.ServiceType === "Patient Care" && form.CareNeeded.length === 0) e.CareNeeded = "Select at least one care type";
    // if (form.ServiceType === "Driver" && form.VehicleType.length === 0) e.VehicleType = "Select at least one vehicle type";
    // if (form.ServiceType === "Japa" && form.JapaDuties.length === 0) e.JapaDuties = "Select at least one Japa duty";
    if (form.IsCouple) {
      if (!form.helper2ServiceType) e.helper2ServiceType = "Please select Helper 2's service type";
      if (!form.helper2Gender) e.helper2Gender = "Helper 2's gender preference is required";
      // const p2svc = form.helper2ServiceType;
      // if (p2svc === "Live-In Support" && form.helper2Tasks.length === 0) e.helper2Tasks = "Select at least one task for Helper 2";
      // if (p2svc === "Cooking Help" && form.helper2CuisinePref.length === 0) e.helper2CuisinePref = "Select at least one cuisine for Helper 2";
      // if (p2svc === "Baby Caretaker" && !form.helper2ChildAge) e.helper2ChildAge = "Select child's age for Helper 2";
      // if (p2svc === "Baby Caretaker") {
      //   const duties = form.helper2ChildAge === "0 - 3 Years" ? form.helper2ChildDutiesInfant : form.helper2ChildDutiesOlder;
      //   if (duties.length === 0) e.helper2ChildDuties = "Select at least one duty for Helper 2";
      // }
      // if (p2svc === "Patient Care" && !String(form.helper2PatientAge).trim()) e.helper2PatientAge = "Patient age is required for Helper 2";
      // if (p2svc === "Patient Care" && form.helper2CareNeeded.length === 0) e.helper2CareNeeded = "Select at least one care type for Helper 2";
      // if (p2svc === "Driver" && form.helper2VehicleType.length === 0) e.helper2VehicleType = "Select at least one vehicle type for Helper 2";
      // if (p2svc === "Japa" && form.helper2JapaDuties.length === 0) e.helper2JapaDuties = "Select at least one Japa duty for Helper 2";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNopayDirectSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    setStatus(null);
    try {
      const zohoFields = buildZohoFields({ ...form, PlanType: "Priority", PaymentStatus: "Paid" });
      await axios.post(`${API_BASE}/submit-nopay`, { zohoFields });
      setForm({ ...INIT });
      navigate("/thank-you", { state: { fromForm: "demand" } });
    } catch (err) {
      setStatus("error");
      setStatusMsg(err?.response?.data?.error || "Something went wrong. Please try again or call us on +91 92112 98139.");
    }
    setSubmitting(false);
  };

  const svc = form.ServiceType;
  const p2svc = form.helper2ServiceType;
  const isCouple = form.IsCouple;

  return (
    <>
      <SEO title="Demand Form" description="" noIndex={true} />
      <div style={s.page}>
        <div style={s.card}>

          {/* Header */}
          <div style={s.header}>
            <div style={s.logoBox}>
              <img src="/logoOnly.webp" alt="Domestic Pro logo" style={{ maxWidth: "100%", maxHeight: "100%" }} />
            </div>
            <div>
              <p style={s.headerTitle}>DomesticPro – 24×7 Live-In Helper</p>
              <p style={s.headerTitle}>Demand Request Form</p>
              <p style={s.headerSub}>Fill in your details and we'll match you with the right helper within 2 hours.</p>
            </div>
          </div>

          <div style={s.body}>

            {/* ── COUPLE TOGGLE ROW ── */}
            <div style={s.partnerHeaderRow} onClick={handleCoupleToggle}>
              <div style={s.partnerIconTitle}>
                <div style={s.partnerIconBox}>👫</div>
                <div>
                  <div style={s.partnerTitle}>Looking for a couple?</div>
                  <div style={s.partnerSub}>
                    {isCouple ? "Two helpers — specify each person's role below" : "Hire a husband-wife pair — e.g. driver + cook"}
                  </div>
                </div>
              </div>
              <TogglePill on={isCouple} onToggle={handleCoupleToggle} />
            </div>

            {/* ── PERSONAL DETAILS ── */}
            <SectionBar>Personal Details</SectionBar>
            <div style={s.row2}>
              <div style={s.field}>
                <label style={s.label}>First Name{/* <span style={s.req}>*</span> */}</label>
                <input type="text" value={form.FirstName} onChange={(e) => setF("FirstName", e.target.value)} placeholder="Rahul" style={s.input} />
                <Err msg={errors.FirstName} />
              </div>
              <div style={s.field}>
                <label style={s.label}>Last Name</label>
                <input type="text" value={form.LastName} onChange={(e) => setF("LastName", e.target.value)} placeholder="Sharma" style={s.input} />
              </div>
            </div>
            <div style={s.field}>
              <label style={s.label}>Phone Number{/* <span style={s.req}>*</span> */}</label>
              <div style={s.phoneWrap}>
                <span style={s.phonePrefix}>+91</span>
                <input type="tel" inputMode="numeric" maxLength={10} value={form.Phone}
                  onChange={(e) => setF("Phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                  placeholder="98765 43210" style={s.phoneInput} />
              </div>
              <Err msg={errors.Phone} />
            </div>
            <div style={s.field}>
              <label style={s.label}>Email Address</label>
              <input type="email" value={form.Email} onChange={(e) => setF("Email", e.target.value)} placeholder="rahul@example.com" style={s.input} />
            </div>
            <div style={s.field}>
              <label style={s.label}>Current Address{/* <span style={s.req}>*</span> */}</label>
              <input type="text" value={form.Street} onChange={(e) => setF("Street", e.target.value)} placeholder="Street / Area / Locality" style={{ ...s.input, marginBottom: 8 }} />
              <Err msg={errors.Street} />
              <div style={s.row2}>
                <div>
                  <input type="text" value={form.City} onChange={(e) => setF("City", e.target.value)} placeholder="City" style={s.input} />
                  <Err msg={errors.City} />
                </div>
                <input type="text" placeholder="State" style={s.input} />
              </div>
            </div>

            {/* ── SERVICE DETAILS — Helper 1 ── */}
            <SectionBar>{isCouple ? "Helper 1 — Service Details" : "Service Details"}</SectionBar>
            <div style={s.field}>
              <label style={s.label}>
                {isCouple ? "Helper 1's Service Type" : "Which type of household help are you looking for?"}
                {/* <span style={s.req}>*</span> */}
              </label>
              <select value={form.ServiceType} onChange={(e) => setF("ServiceType", e.target.value)} style={s.select}>
                <option value="" disabled>Please Select</option>
                {SERVICE_TYPES.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
              <Err msg={errors.ServiceType} />
            </div>
            <div style={s.field}>
              <label style={s.label}>Service Format{/* <span style={s.req}>*</span> */}</label>
              <div style={s.radioRowH}>
                {SERVICE_FORMATS.map((o) => (
                  <label key={o} style={s.radioLabel}>
                    <input type="radio" style={s.radioInput} name="workType" checked={form.ServiceFormat === o} onChange={() => setF("ServiceFormat", o)} />
                    {o}
                  </label>
                ))}
              </div>
              <Err msg={errors.ServiceFormat} />
            </div>
            <div style={s.field}>
              <label style={s.label}>{isCouple ? "Helper 1's Gender Preference" : "Helper's Gender Preference"}{/* <span style={s.req}>*</span> */}</label>
              <div style={s.radioRowH}>
                {GENDER_OPTIONS.map((o) => (
                  <label key={o} style={s.radioLabel}>
                    <input type="radio" style={s.radioInput} name="gender" checked={form.Cook_Gender === o} onChange={() => setF("Cook_Gender", o)} />
                    {o}
                  </label>
                ))}
              </div>
              <Err msg={errors.Cook_Gender} />
            </div>

            {/* ── HELPER 1 SERVICE-SPECIFIC ── */}
            {svc && (
              <ServiceBlock svc={svc} form={form} toggleArr={toggleArr} setF={setF} setForm={setForm}
                errors={errors} keyPrefix="" labelSuffix={isCouple ? " — Helper 1" : ""} />
            )}


            {/* ── COUPLE CARD — Helper 2 basic info (mirrors supply partner card) ── */}
            <div>
              {isCouple && (
                <>
                  <SectionBar style={s.partnerSectionLabel}>Helper 2 — Service Details  </SectionBar>
                  <div style={s.field}>
                    <label style={s.label}>Helper 2's Service Type{/* <span style={s.req}>*</span> */}</label>
                    <select value={form.helper2ServiceType}
                      onChange={(e) => {
                        setForm(f => ({ ...f, ...P2_RESET, IsCouple: true, helper2ServiceType: e.target.value }));
                        if (errors.helper2ServiceType) setErrors(er => { const c = { ...er }; delete c.helper2ServiceType; return c; });
                      }}
                      style={s.select}>
                      <option value="" disabled>Please Select</option>
                      {SERVICE_TYPES.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                    <Err msg={errors.helper2ServiceType} />
                  </div>
                  <div style={s.field}>
                    <label style={s.label}>Helper 2's Gender Preference{/* <span style={s.req}>*</span> */}</label>
                    <div style={s.radioRowH}>
                      {GENDER_OPTIONS.map((o) => (
                        <label key={o} style={s.radioLabel}>
                          <input type="radio" style={s.radioInput} name="helper2gender" checked={form.helper2Gender === o} onChange={() => setF("helper2Gender", o)} />
                          {o}
                        </label>
                      ))}
                    </div>
                    <Err msg={errors.helper2Gender} />
                  </div>
                </>
              )}
            </div>

            {/* ── HELPER 2 SERVICE-SPECIFIC ── */}
            {isCouple && p2svc && (
              <ServiceBlock svc={p2svc} form={form} toggleArr={toggleArr} setF={setF} setForm={setForm}
                errors={errors} keyPrefix="helper2" labelSuffix=" — Helper 2" />
            )}


            {/* ── PREFERENCES & PLAN ── */}
            <SectionBar>Preferences &amp; Plan</SectionBar>
            <div style={s.field}>
              <label style={s.label}>Urgency{/* <span style={s.req}>*</span> */}</label>
              <select value={form.Urgency} onChange={(e) => setF("Urgency", e.target.value)} style={s.select}>
                <option value="" disabled>How soon?</option>
                {URGENCY_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
              <Err msg={errors.Urgency} />
            </div>
            <div style={s.field}>
              {!isCouple && <>
                <label style={s.label}>Monthly Budget{/* <span style={s.req}>*</span> */}</label>
                <select value={form.Budget} onChange={(e) => setF("Budget", e.target.value)} style={s.select}>
                  <option value="" disabled>Select budget…</option>
                  {BUDGET_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
                <Err msg={errors.Budget} />
              </>
              }
            </div>

            <div style={s.field}>
              {isCouple && <>
                <label style={s.label}>Monthly Budget For Couple's{/* <span style={s.req}>*</span> */}</label>
                <select value={form.PartnerBudget} onChange={(e) => setF("PartnerBudget", e.target.value)} style={s.select}>
                  <option value="" disabled>Select budget…</option>
                  {PARTNER_BUDGET_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
                <Err msg={errors.PartnerBudget} />
              </>
              }
            </div>
            <div style={s.field}>
              <label style={s.label}>Special Instructions</label>
              <textarea rows={3} maxLength={500} value={form.Instructions}
                onChange={(e) => setF("Instructions", e.target.value)}
                placeholder="Specific timing, language preferences, dietary restrictions, any other requirements…"
                style={s.textarea} />
            </div>

            <button type="button" onClick={handleNopayDirectSubmit} disabled={submitting}
              style={submitting ? s.submitBtnDisabled : s.submitBtn}>
              {submitting ? "Submitting…" : "Submit Request →"}
            </button>
            {status === "error" && <div style={s.errorBanner}>⚠ {statusMsg}</div>}
          </div>
        </div>
      </div>
    </>
  );
}