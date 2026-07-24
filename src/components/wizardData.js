// ─────────────────────────────────────────────────────────────────────────────
// wizardData.js  –  trimmed to match DemandForm fields only
//
// REMOVED (not in DemandForm):
//   Tasks, HouseSize, PetsAtHome, HomeType, MealPref, MealsNeeded,
//   CuisinePref, CookMembers, ChildDutiesInfant, ChildDutiesOlder,
//   JapaDuties, JapaMotherNeeds, PatientAge, PatientGender, CareNeeded,
//   VehicleType, ServiceFormat, Urgency, PlanType (hardcoded)
//
// KEPT / ADDED:
//   ServiceType, HelperGender, ChildAgeGroup, TotalChildren,
//   CookType, TaskPreference, DriverHours, Budget,
//   Accommodation, Meals, Instructions,
//   FullName, Phone, Email, Address, City, State
// ─────────────────────────────────────────────────────────────────────────────

// ── Icon imports (only the ones still used) ───────────────────────────────────
import {
  Home,
  Users,
  Clock,
  Zap,
  CalendarClock,
  Briefcase,
  Layers,
  Baby,
  ChefHat,
  HeartPulse,
  Car,
  UserCheck,
  Phone,
  HandHeart,
  PawPrint,
  DollarSign,
  ClipboardList,
  CreditCard,
  Utensils,
  Coffee,
  Sparkles,
} from "lucide-react";

// ── Image imports (only the ones still referenced below) ──────────────────────
// REMOVED: breakfast, lunch, dinner, cleanUtensils, kitchenHygiene,
//          babyBath, diaperChanging, sterilizingBottles, hygieneSupport,
//          healthMonitoring, massage, childStimulation,
//          toddlerFeeding, schoolReadiness, childSafety,
//          childSupervision, routineManagement,
//          dailyDrive, tenHourDriver, twelveHourDriver, flexibleHourDriver,
//          vehicleCleaning, vehicleUpkeep, safeAndTimelyTravel, mopping

const CDN = "https://res.cloudinary.com/dhtzknkdr/image/upload";

// ─────────────────────────────────────────────────────────────────────────────
// SERVICES  (unchanged — all 6 cards kept)
// ─────────────────────────────────────────────────────────────────────────────
export const SERVICES = [
  {
    id: "Live-In Support",
    label: "Live-In Support",
    image: `${CDN}/v1773034359/house-manager_by4krx.webp`,
    color: "#FBBF24",
    emoji: "🏡",
  },
  {
    id: "Baby Caretaker",
    label: "Baby Caretaker",
    image: `${CDN}/v1773034351/baby-caretaker_qtcpvn.webp`,
    color: "#A78BFA",
    emoji: "👶",
  },
  {
    id: "Japa",
    label: "Japa",
    image: `${CDN}/v1773034351/japa_kjbqeu.webp`,
    color: "#F472B6",
    emoji: "🤱",
  },
  {
    id: "Cooking Help",
    label: "Cooking Help",
    image: `${CDN}/v1773034353/cook_aa2ex7.webp`,
    color: "#F87C4F",
    emoji: "👨‍🍳",
  },
  {
    id: "Patient Care",
    label: "Patient Care",
    image: `${CDN}/v1773034355/elderly-household_mt1b8o.webp`,
    color: "#F87FAC",
    emoji: "🧓",
  },
  {
    id: "Driver",
    label: "Drivers",
    image: `${CDN}/v1773034355/driver_efye54.webp`,
    color: "#34D399",
    emoji: "🚗",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SERVICE_FORMATS  — REMOVED (DemandForm has no ServiceFormat field)
// ─────────────────────────────────────────────────────────────────────────────
// export const SERVICE_FORMATS = [ ... ];

// ─────────────────────────────────────────────────────────────────────────────
// GENDER OPTIONS  (unchanged)
// ─────────────────────────────────────────────────────────────────────────────
export const GENDER_OPTIONS_DATA = [
  { id: "Male", label: "Male", image: `${CDN}/v1773031904/male_wubsvs.webp` },
  {
    id: "Female",
    label: "Female",
    image: `${CDN}/v1773031900/female_zo7iwn.webp`,
  },
  { id: "Any", label: "Any", image: `${CDN}/v1773031900/any_cvq417.webp` },
];

// ─────────────────────────────────────────────────────────────────────────────
// LIVE-IN SUPPORT — Task Preference  (from DemandForm: TASK_PREF_OPTIONS)
// ─────────────────────────────────────────────────────────────────────────────
export const TASK_PREF_OPTIONS = [
  {
    id: "Top work + basic cooking",
    label: "Top work + basic cooking",
    color: "#F87C4F",
  },
  {
    id: "Top work + cleaning & mopping",
    label: "Top work + cleaning & mopping",
    color: "#F87C4F",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// COOK — Cook Type  (from DemandForm: COOK_TYPE_OPTIONS)
// ─────────────────────────────────────────────────────────────────────────────
export const COOK_TYPE_OPTIONS = [
  { id: "Expert cook", label: "Expert cook", color: "#F87C4F" },
  {
    id: "Intermediate + top work",
    label: "Intermediate + top work",
    color: "#F87C4F",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// BABY CARETAKER — Age groups  (from DemandForm: CHILD_AGE_OPTIONS)
// ─────────────────────────────────────────────────────────────────────────────
export const CHILD_AGE_OPTIONS = [
  { id: "0 - 1 Years", label: "0 – 1 year" },
  { id: "1 - 3 Years", label: "1 – 3 years" },
  { id: "3+ Years", label: "3+ years" },
];

// Total children  (from DemandForm: TOTAL_CHILDREN_OPTIONS)
export const TOTAL_CHILDREN_OPTIONS = [
  { id: "1", label: "1" },
  { id: "2", label: "2" },
  { id: "3", label: "3" },
];

// ─────────────────────────────────────────────────────────────────────────────
// DRIVER — Hours  (from DemandForm: DRIVER_HOURS_OPTIONS)
// ─────────────────────────────────────────────────────────────────────────────
export const DRIVER_HOURS_OPTIONS = [
  { id: "10 hours/day", label: "10 hours/day", color: "#F87C4F" },
  { id: "12 hours/day", label: "12 hours/day", color: "#F87C4F" },
  { id: "24 hours/day", label: "24 hours/day", color: "#F87C4F" },
];

// ─────────────────────────────────────────────────────────────────────────────
// REMOVED — not in DemandForm:
//   TASKS, HOUSE_SIZES, PETS_OPTIONS, MEAL_PREFS, CUISINES,
//   COOK_TASKS, CHILD_AGE_RANGES, CHILD_DUTIES_INFANT, CHILD_DUTIES_OLDER,
//   JAPA_DUTIES, JAPA_MOTHER_NEEDS,
//   CARE_NEEDED, VEHICLE_TYPES, HOME_TYPES, DRIVER_TASKS
// ─────────────────────────────────────────────────────────────────────────────
// export const TASKS = [ ... ];
// export const HOUSE_SIZES = [ ... ];
// export const PETS_OPTIONS = [ ... ];
// export const MEAL_PREFS = [ ... ];
// export const CUISINES = [ ... ];
// export const COOK_TASKS = [ ... ];
// export const CHILD_AGE_RANGES = [ ... ];
// export const CHILD_DUTIES_INFANT = [ ... ];
// export const CHILD_DUTIES_OLDER = [ ... ];
// export const JAPA_DUTIES = [ ... ];
// export const JAPA_MOTHER_NEEDS = [ ... ];
// export const CARE_NEEDED = [ ... ];
// export const VEHICLE_TYPES = [ ... ];
// export const HOME_TYPES = [ ... ];
// export const DRIVER_TASKS = [ ... ];

// ─────────────────────────────────────────────────────────────────────────────
// BUDGET  (from DemandForm: BUDGET_OPTIONS)
// ─────────────────────────────────────────────────────────────────────────────
export const BUDGETS = [
  { id: "₹17,000 – ₹19,000", label: "₹17,000 – 19,000" },
  { id: "₹20,000 – ₹22,000", label: "₹20,000 – 22,000" },
  { id: "₹23,000 – ₹25,000", label: "₹23,000 – 25,000" },
  { id: "₹25,000 – ₹27,000", label: "₹25,000 – 27,000" },
  { id: "₹27,000 – ₹30,000", label: "₹27,000 – 30,000" },
  { id: "₹30,000 +", label: "₹30,000 +" },
];

// ─────────────────────────────────────────────────────────────────────────────
// ACCOMMODATION  (from DemandForm: ACCOMMODATION_OPTIONS)
// ─────────────────────────────────────────────────────────────────────────────
export const ACCOMMODATION_OPTIONS = [
  {
    id: "Separate room",
    label: "Separate room",
    color: "#F87C4F",
    emoji: "🚪",
  },
  { id: "Shared room", label: "Shared room", color: "#A78BFA", emoji: "🛏️" },
  { id: "Open space", label: "Open space", color: "#34D399", emoji: "🏠" },
];

export const MEAL_OPTIONS = [
  {
    id: "Same as family",
    label: "Same as family",
    color: "#FBBF24",
    emoji: "🍽️",
  },
  { id: "Separate", label: "Separate", color: "#F472B6", emoji: "🍱" },
];

// ─────────────────────────────────────────────────────────────────────────────
// REMOVED — not in DemandForm:
//   SUBSTITUTE_BUDGETS, URGENCY_OPTIONS, PLANS
// ─────────────────────────────────────────────────────────────────────────────
// export const SUBSTITUTE_BUDGETS = [ ... ];
// export const URGENCY_OPTIONS = [ ... ];
// export const PLANS = { ... };

// ─────────────────────────────────────────────────────────────────────────────
// SERVICE FLOWS
// Each array = ordered wizard steps for that service.
//
// REMOVED steps vs original:
//   format, tasks, cooktasks, drivertasks, housesize, pets,
//   mealpref, mealtime, cuisine, cookmembers, childduties,
//   japaduties, japamotherneeds,
//   patientage, patientgender, careneeded,
//   vehicletype, hometype, urgency, plan
//
// ADDED steps (new, matching DemandForm):
//   taskpref    – Live-In Support task preference chips
//   cooktype    – Cook type chips
//   childagegroup – Child age group + total children
//   driverhours – Driver availability hours
//   accommodation – Accommodation chip
//   meals       – Meals chip
// ─────────────────────────────────────────────────────────────────────────────
export const SERVICE_FLOWS = {
  "Live-In Support": [
    "service",
    "taskpref", // Task preference (Top work + basic cooking, etc.)
    "helpergender",
    "budget",
    "accommodation",
    "meals",
    "contact",
    "done",
  ],
  "Cooking Help": [
    "service",
    "cooktype", // Expert cook / Intermediate + top work
    "cookpeoplecount", // Number of people to cook for
    "helpergender",
    "budget",
    "accommodation",
    "meals",
    "contact",
    "done",
  ],
  "Baby Caretaker": [
    "service",
    "childagegroup", // Child age group (multi-select) + total children
    // "helpergender",
    "budget",
    "accommodation",
    "meals",
    "contact",
    "done",
  ],
  Japa: [
    "service",
    "japastartdate", // From which date is the Japa maid required?
    "japaduration", // 40 days / 60 days / More than 60 days
    // "helpergender",
    "budget",
    "accommodation",
    "meals",
    "contact",
    "done",
  ],
  "Patient Care": [
    "service",
    "helpergender",
    "budget",
    "accommodation",
    "meals",
    "contact",
    "done",
  ],
  Driver: [
    "service",
    "driverhours", // 10 / 12 / 24 hours/day
    // "helpergender",
    "budget",
    "accommodation",
    "meals",
    "contact",
    "done",
  ],
};

export const DEFAULT_FLOW = [
  "service",
  "helpergender",
  "budget",
  "accommodation",
  "meals",
  "contact",
  "done",
];

// ─────────────────────────────────────────────────────────────────────────────
// JAPA — Duration  (from DemandForm: JAPA_DURATION_OPTIONS, writes TaskPreference)
// ─────────────────────────────────────────────────────────────────────────────
export const JAPA_DURATION_OPTIONS = [
  { id: "40 days", label: "40 days", color: "#F472B6" },
  { id: "60 days", label: "60 days", color: "#F472B6" },
  { id: "More than 60 days", label: "More than 60 days", color: "#F472B6" },
];

// ─────────────────────────────────────────────────────────────────────────────
// PROG_META  — labels & icons for the progress bar
// Only steps that appear in SERVICE_FLOWS above are kept active.
// ─────────────────────────────────────────────────────────────────────────────
export const PROG_META = {
  service: { label: "Service", icon: Briefcase },
  taskpref: { label: "Tasks", icon: Layers }, // ← new
  cooktype: { label: "Type", icon: ChefHat }, // ← new
  cookpeoplecount: { label: "People", icon: Users }, // ← new
  childagegroup: { label: "Child", icon: Baby }, // ← new
  driverhours: { label: "Hours", icon: Car }, // ← new
  japastartdate: { label: "Date", icon: CalendarClock }, // ← new
  japaduration: { label: "Duration", icon: Clock }, // ← new
  helpergender: { label: "Helper", icon: UserCheck },
  budget: { label: "Budget", icon: DollarSign },
  accommodation: { label: "Stay", icon: Home }, // ← new
  meals: { label: "Meals", icon: Utensils }, // ← new
  contact: { label: "Contact", icon: Phone },

  // ── REMOVED (steps no longer in any flow) ──────────────────────────────────
  // format, tasks, cooktasks, drivertasks, housesize, pets,
  // mealpref, mealtime, cuisine, cookmembers, childage, childduties,
  // patientage, patientgender, careneeded, vehicletype,
  // hometype, multiservices, urgency, plan,
  // japaduties, japamotherneeds
};

// ─────────────────────────────────────────────────────────────────────────────
// INIT  — form state shape, matching DemandForm's INIT exactly
// ─────────────────────────────────────────────────────────────────────────────
export const INIT = {
  // Contact (DemandForm uses FullName as one field; wizard will do same)
  FullName: "",
  Phone: "",
  Email: "",
  Address: "", // DemandForm: single Address field (not split Street+City)
  City: "", // selected via CitySelect (country-state-city package)
  State: "", // auto-derived from City — see setCity in HeroWizard

  // Service
  ServiceType: "",
  ServiceLabel: "", // wizard internal — not sent to Zoho

  // Live-In Support / Cook / Baby / Driver / Japa duration — all consolidated here
  TaskPreference: "", // single-select chips

  // Cook
  CookType: "",
  CookPeopleCount: "", // Number of people to cook for

  // Baby Caretaker
  ChildAgeGroup: "", // multi-select (DemandForm: ChildAgeGroup)
  TotalChildren: "", // single select "1"/"2"/"3"

  // Driver
  DriverHours: "", // single select "10 hours/day" etc.

  // Japa
  JapaStartDate: "", // yyyy-MM-dd from <input type="date">, converted at submit

  // Shared preferences
  HelperGender: "",
  Budget: "",
  Accommodation: "",
  Meals: "",
  Instructions: "",

  // ── REMOVED fields (not in DemandForm) ──────────────────────────────────────
  // FirstName, LastName, Street, City,        ← merged into FullName + Address
  // ServiceFormat,
  // Tasks, HouseSize, PeopleAtHome, PetsAtHome, HomeType,
  // CookTasks, MealPref, MealsNeeded, CuisinePref, CookMembers,
  // ChildAge,
  // ChildDutiesInfant, ChildDutiesOlder,
  // JapaDuties, JapaMotherNeeds,
  // PatientAge, PatientGender, CareNeeded,
  // VehicleType, DriverTasks,
  // Urgency,
  // PlanType, PaymentStatus   ← hardcoded at submit time
};
