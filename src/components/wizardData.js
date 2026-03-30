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

const CDN = "https://res.cloudinary.com/dhtzknkdr/image/upload";

export const SERVICES = [
  {
    id: "Live-In Support",
    label: "Live-In Support",
    image: `${CDN}/v1773034359/house-manager_by4krx.png`,
    color: "#FBBF24",
    emoji: "🏡",
  },
  {
    id: "Baby Caretaker",
    label: "Baby Caretaker",
    image: `${CDN}/v1773034351/baby-caretaker_qtcpvn.png`,
    color: "#A78BFA",
    emoji: "👶",
  },
  {
    id: "Japa",
    label: "Japa",
    image: `${CDN}/v1773034351/japa_kjbqeu.png`,
    color: "#F472B6",
    emoji: "🤱",
  },
  {
    id: "Cooking Help",
    label: "Cooking Help",
    image: `${CDN}/v1773034353/cook_aa2ex7.png`,
    color: "#F87C4F",
    emoji: "👨‍🍳",
  },
  {
    id: "Patient Care",
    label: "Patient Care",
    image: `${CDN}/v1773034355/elderly-household_mt1b8o.png`,
    color: "#F87FAC",
    emoji: "🧓",
  },
  {
    id: "Driver",
    label: "Drivers",
    image: `${CDN}/v1773034355/driver_efye54.png`,
    color: "#34D399",
    emoji: "🚗",
  },
];

export const SERVICE_FORMATS = [
  {
    id: "Live-In",
    label: "Live-In",
    desc: "Stays at your home full-time. Available round the clock.",
    icon: Home,
  },
  {
    id: "Substitute",
    label: "Substitute",
    desc: "Short-term replacement cover for your existing staff.",
    icon: Users,
  },
  {
    id: "Live-Out",
    label: "Live-Out",
    desc: "Arrives daily for set hours. Goes home in the evening.",
    icon: Clock,
    comingSoon: true,
  },
];

export const GENDER_OPTIONS_DATA = [
  { id: "Male", label: "Male", image: `${CDN}/v1773031904/male_wubsvs.png` },
  {
    id: "Female",
    label: "Female",
    image: `${CDN}/v1773031900/female_zo7iwn.png`,
  },
];

export const TASKS = [
  {
    id: "Cleaning",
    label: "Cleaning",
    image: `${CDN}/v1773037121/cleaning_fszds1.png`,
  },
  {
    id: "Utensils",
    label: "Utensils",
    image: `${CDN}/v1773037127/utensils_fyurgi.png`,
  },
  {
    id: "Laundry",
    label: "Laundry",
    image: `${CDN}/v1773037122/laundry_qowye6.png`,
  },
  {
    id: "Dusting",
    label: "Dusting",
    image: `${CDN}/v1773037119/dusting_hw9vbr.png`,
  },
  {
    id: "Bathroom",
    label: "Bathroom",
    image: `${CDN}/v1773037119/bathroom_phzorr.png`,
  },
  {
    id: "Groceries",
    label: "Groceries",
    image: `${CDN}/v1773037120/grocery_teclqd.png`,
  },
  { id: "Other", label: "Other", image: `${CDN}/v1773034370/other_s1pon0.png` },
];

export const HOUSE_SIZES = [
  { id: "1BHK", label: "1 BHK", image: `${CDN}/v1773037116/1BHK_bgzp6k.png` },
  { id: "2BHK", label: "2 BHK", image: `${CDN}/v1773037121/2BHK_sin2om.png` },
  { id: "3BHK", label: "3 BHK", image: `${CDN}/v1773037117/3BHK_jc54bv.png` },
  { id: "4BHK", label: "4 BHK", image: `${CDN}/v1773037118/4BHK_vnuyup.png` },
  { id: "Villa", label: "Villa", image: `${CDN}/v1773037129/villa_jextfy.png` },
];

export const PETS_OPTIONS = [
  {
    id: "Yes",
    label: "Yes, we have pets",
    image: `${CDN}/v1773037128/pets_rdppq7.png`,
  },
  {
    id: "No",
    label: "No pets",
    image: `${CDN}/v1773037125/no-pets_ih18ap.png`,
  },
];

export const MEAL_PREFS = [
  { id: "Veg", label: "Veg", image: `${CDN}/v1773037727/veg_jz5fdj.png` },
  {
    id: "Non-Veg",
    label: "Non-Veg",
    image: `${CDN}/v1773037724/non-veg_e3ji5g.png`,
  },
  {
    id: "Both",
    label: "Both",
    image: `${CDN}/v1773037719/full-cook_yomiur.png`,
  },
];

export const MEALS_NEEDED = [
  {
    id: "Breakfast",
    label: "Breakfast",
    image: `${CDN}/v1773037713/breakfast_uufihz.png`,
  },
  { id: "Lunch", label: "Lunch", image: `${CDN}/v1773037720/lunch_duetlf.png` },
  {
    id: "Dinner",
    label: "Dinner",
    image: `${CDN}/v1773037718/dinner_omjj6q.png`,
  },
  {
    id: "All Meals",
    label: "All Meals",
    image: `${CDN}/v1773037713/all-meals_zcgzng.png`,
  },
];

export const CUISINES = [
  {
    id: "North Indian",
    label: "North Indian",
    image: `${CDN}/v1773037726/north-indian_uxc5tl.png`,
  },
  {
    id: "South Indian",
    label: "South Indian",
    image: `${CDN}/v1773037726/south-indian_udys5o.png`,
  },
  {
    id: "Chinese",
    label: "Chinese",
    image: `${CDN}/v1773037716/chinese_dmrbhy.png`,
  },
  {
    id: "Continental",
    label: "Continental",
    image: `${CDN}/v1773037716/continental_wboery.png`,
  },
  {
    id: "Diet Food",
    label: "Diet Food",
    image: `${CDN}/v1773037715/diet_pxaiek.png`,
  },
  { id: "Other", label: "Other", image: `${CDN}/v1773034370/other_s1pon0.png` },
];

export const CHILD_DUTIES = [
  {
    id: "Feeding",
    label: "Feeding",
    image: `${CDN}/v1773038057/feeding_kvsvwk.png`,
  },
  {
    id: "Bathing",
    label: "Bathing",
    image: `${CDN}/v1773038057/bathing_bykrvq.png`,
  },
  {
    id: "Homework",
    label: "Homework",
    image: `${CDN}/v1773038059/homework_g3jbdz.png`,
  },
  {
    id: "Playtime",
    label: "Playtime",
    image: `${CDN}/v1773038058/playtime_udha2d.png`,
  },
  {
    id: "Putting to Sleep",
    label: "Putting to Sleep",
    image: `${CDN}/v1773038061/sleeping_uk5vqm.png`,
  },
  { id: "Other", label: "Other", image: `${CDN}/v1773034370/other_s1pon0.png` },
];

export const CARE_NEEDED = [
  {
    id: "Basic Support",
    label: "Basic Support",
    image: `${CDN}/v1773038308/caregiver_rhozy2.png`,
  },
  {
    id: "Personal Hygiene",
    label: "Personal Hygiene",
    image: `${CDN}/v1773038311/hygiene_de4gcu.png`,
  },
  {
    id: "Mobility Support",
    label: "Mobility Support",
    image: `${CDN}/v1773038315/support_erb1uy.png`,
  },
  {
    id: "Medicine Reminders",
    label: "Medicine Reminders",
    image: `${CDN}/v1773038312/medicine_kjlkd0.png`,
  },
  {
    id: "Full Care",
    label: "Full Care",
    image: `${CDN}/v1773038310/full-help_jrxrax.png`,
  },
];

export const VEHICLE_TYPES = [
  {
    id: "Manual",
    label: "Manual",
    image: `${CDN}/v1773038638/manual_f78sol.png`,
  },
  {
    id: "Automatic",
    label: "Automatic",
    image: `${CDN}/v1773038636/automatic_dmyqva.png`,
  },
  { id: "SUV", label: "SUV", image: `${CDN}/v1773038641/SUV_hzrcgr.png` },
  { id: "Sedan", label: "Sedan", image: `${CDN}/v1773038639/sedan_q1xmlm.png` },
];

export const HOME_TYPES = [
  {
    id: "Apartment",
    label: "Apartment",
    image: `${CDN}/v1773038422/apartment_ys8rbw.png`,
  },
  {
    id: "Independent House",
    label: "Independent House",
    image: `${CDN}/v1773038451/individual_k0ko1y.png`,
  },
  { id: "Villa", label: "Villa", image: `${CDN}/v1773038464/villa_z0apwp.png` },
];

export const BUDGETS = [
  {
    id: "₹25,000+",
    label: "₹25,000+",
    desc: "Highly trained & experienced helpers",
  },
  {
    id: "₹18,000 – ₹24,999",
    label: "₹18,000 – ₹24,999",
    desc: "Trained helpers available",
  },
  {
    id: "₹15,000 – ₹17,999",
    label: "₹15,000 – ₹17,999",
    desc: "Untrained helpers",
  },
];

// FIX: cleaned up — no unused label/badge fields
export const SUBSTITUTE_BUDGETS = [
  {
    id: "sub-5k",
    desc: "One-time placement fee. Helper salary is separate.",
  },
];

export const URGENCY_OPTIONS = [
  {
    id: "Immediately",
    label: "Immediately",
    desc: "Fast-tracked — profiles within 24 hours.",
    icon: Zap,
    color: "#EF4444",
  },
  {
    id: "Within 7–15 days",
    label: "Within 7–15 days",
    desc: "Planned start — profiles within 3–5 working days.",
    icon: CalendarClock,
    color: "#F59E0B",
  },
  {
    id: "Within 30 days",
    label: "Within 30 days",
    desc: "No rush — we'll find the best possible match.",
    icon: Clock,
    color: "#3B82F6",
  },
];

// ── JAPA ─────────────────────────────────────────────────────────────────────
// What the Japa maid does FOR THE NEWBORN
export const JAPA_DUTIES = [
  {
    id: "Newborn Bath",
    label: "Newborn Bath",
    image: `${CDN}/v1773038057/bathing_bykrvq.png`,
  },
  {
    id: "Feeding Support",
    label: "Feeding Support",
    image: `${CDN}/v1773038057/feeding_kvsvwk.png`,
  },
  {
    id: "Swaddling",
    label: "Swaddling",
    image: `${CDN}/v1773038061/Swaddling_ce8kdn.png`,
  },
  {
    id: "Night Watch",
    label: "Night Watch",
    image: `${CDN}/v1773038061/sleeping_uk5vqm.png`,
  },
  { id: "Other", label: "Other", image: `${CDN}/v1773034370/other_s1pon0.png` },
];

// What the Japa maid does FOR THE MOTHER
export const JAPA_MOTHER_NEEDS = [
  {
    id: "Body Massage",
    label: "Body Massage",
    image: `${CDN}/v1773038315/body-massage_spvlzz`,
  },
  {
    id: "Diet & Nutrition",
    label: "Diet & Nutrition",
    image: `${CDN}/v1773038424/cookingOversight_bonbic.png`,
  },
  {
    id: "Light Cooking",
    label: "Light Cooking",
    image: `${CDN}/v1773037719/light-cooking_bs02ym.png`,
  },
  {
    id: "Night Support",
    label: "Night Support",
    image: `${CDN}/v1773038061/night-support_sqnjvw.png`,
  },
  {
    id: "Personal Hygiene",
    label: "Personal Hygiene",
    image: `${CDN}/v1773038311/personal-hygiene_ynuc3c.png`,
  },
  { id: "Other", label: "Other", image: `${CDN}/v1773034370/other_s1pon0.png` },
];

// ── PLANS ─────────────────────────────────────────────────────────────────────
export const PLANS = {
  priority: {
    id: "priority",
    name: "Priority Pay",
    tag: "Fast-Track Hiring",
    subtitle: "Pay Before Trial",
    amount: 3000,
    gst: Math.round(3000 * 0.18),
    color: "#EC5F36",
    accentLight: "#FFF7F4",
    borderColor: "#F5D8CF",
    badgeBg: "linear-gradient(135deg,#EC5F36,#D84E28)",
    recommended: true,
    inclusions: [
      {
        icon: "bolt",
        label: "Priority Handling",
        desc: "Your requirement is fast-tracked over regular requests.",
      },
      {
        icon: "id-card",
        label: "5 Verified Profiles within 24 Hours",
        desc: "Carefully shortlisted based on your requirement.",
      },
      {
        icon: "user-check",
        label: "Pre-Screened & Relevant Matches",
        desc: "Profiles shared after verification, experience check, and suitability.",
      },
      {
        icon: "headset",
        label: "End-to-End Coordination",
        desc: "Calls, interviews, and trial setup managed by our team.",
      },
      {
        icon: "handshake",
        label: "Profile Finalization Support",
        desc: "Guidance in selecting the most suitable candidate.",
      },
      {
        icon: "rotate",
        label: "15-Day Free Look Period",
        desc: "One free replacement within 15 days if required.",
      },
      {
        icon: "gauge-high",
        label: "Quick Turnaround Time",
        desc: "Faster closures compared to standard plans.",
      },
    ],
    bonus: "One free replacement within 15 days if required.",
  },
  commitment: {
    id: "commitment",
    name: "Commitment Plan",
    tag: "Standard Hiring",
    subtitle: "Commitment-Based Start",
    amount: 1500,
    gst: Math.round(1500 * 0.18),
    color: "#3B82F6",
    accentLight: "#EFF6FF",
    borderColor: "#BFDBFE",
    badgeBg: "linear-gradient(135deg,#3B82F6,#2563EB)",
    recommended: false,
    inclusions: [
      {
        icon: "credit-card",
        label: "Commitment Fee (Upfront)",
        desc: "Nominal fee before profiles — ensures serious intent.",
      },
      {
        icon: "address-card",
        label: "Curated Profile Sharing",
        desc: "Relevant profiles shared based on your requirement.",
      },
      {
        icon: "filter",
        label: "Basic Screening & Matching",
        desc: "Candidates filtered for experience and suitability.",
      },
      {
        icon: "headset",
        label: "End-to-End Coordination",
        desc: "Interview scheduling and communication handled by our team.",
      },
      {
        icon: "bullseye",
        label: "Finalization Support",
        desc: "Guidance to help you select the right candidate.",
      },
      {
        icon: "clock",
        label: "Standard Timeline",
        desc: "Profiles shared within 3 working days.",
      },
    ],
    bonus: null,
  },
  noPay: {
    id: "free",
    name: "Continue Without Pay",
    tag: "Basic Access",
    subtitle: "No upfront payment",
    amount: 0,
    gst: 0,
    color: "#9CA3AF",
    accentLight: "#F9FAFB",
    borderColor: "#E5E7EB",
    badgeBg: "linear-gradient(135deg,#9CA3AF,#6B7280)",
    recommended: false,
    inclusions: [
      {
        icon: "clock",
        label: "Delayed Profile Sharing",
        desc: "Profiles shared only after priority requests are fulfilled.",
      },
      {
        icon: "users",
        label: "Limited Matches",
        desc: "Fewer profiles based on availability.",
      },
      {
        icon: "ban",
        label: "No Replacement Support",
        desc: "No free replacements or dedicated assistance.",
      },
    ],
    bonus: null,
  },
};

// ── SERVICE FLOWS ─────────────────────────────────────────────────────────────
// NOTE: All keys must exactly match SERVICES[].id (case-sensitive)
export const SERVICE_FLOWS = {
  "Live-In Support": [
    "service",
    "format",
    "tasks",
    "housesize",
    "pets",
    "budget",
    "urgency",
    "contact",
    "plan",
    "done",
  ],
  "Cooking Help": [
    "service",
    "format",
    "mealpref",
    "mealtime",
    "cuisine",
    "budget",
    "urgency",
    "contact",
    "plan",
    "done",
  ],
  "Baby Caretaker": [
    "service",
    "format",
    "childage",
    "childduties",
    "budget",
    "urgency",
    "contact",
    "plan",
    "done",
  ],
  Japa: [
    "service",
    "format",
    "japaduties",
    "japamotherneeds",
    "budget",
    "urgency",
    "contact",
    "plan",
    "done",
  ],
  "Patient Care": [
    "service",
    "format",
    "patientage",
    "patientgender",
    "careneeded",
    "budget",
    "urgency",
    "contact",
    "plan",
    "done",
  ],
  Driver: [
    "service",
    "format",
    "vehicletype",
    "budget",
    "urgency",
    "contact",
    "plan",
    "done",
  ],
};

export const DEFAULT_FLOW = [
  "service",
  "urgency",
  "budget",
  "contact",
  "plan",
  "done",
];

export const PROG_META = {
  service: { label: "Service", icon: Briefcase },
  format: { label: "Format", icon: Layers },
  tasks: { label: "Tasks", icon: Layers },
  housesize: { label: "Home", icon: Home },
  pets: { label: "Pets", icon: PawPrint },
  mealpref: { label: "Diet", icon: Utensils },
  mealtime: { label: "Meals", icon: Coffee },
  cuisine: { label: "Cuisine", icon: ChefHat },
  childage: { label: "Child", icon: Baby },
  childduties: { label: "Duties", icon: ClipboardList },
  patientage: { label: "Patient", icon: HeartPulse },
  patientgender: { label: "Gender", icon: UserCheck },
  careneeded: { label: "Care", icon: HandHeart },
  vehicletype: { label: "Vehicle", icon: Car },
  hometype: { label: "Home", icon: Home },
  multiservices: { label: "Services", icon: Sparkles },
  urgency: { label: "Urgency", icon: Zap },
  budget: { label: "Budget", icon: DollarSign },
  contact: { label: "Contact", icon: Phone },
  plan: { label: "Plan", icon: CreditCard },
  // Japa
  japaduties: { label: "Duties", icon: HandHeart },
  japamotherneeds: { label: "Mother", icon: HeartPulse },
};

// ── INIT ──────────────────────────────────────────────────────────────────────
export const INIT = {
  // Contact
  FirstName: "",
  LastName: "",
  Email: "",
  Phone: "",
  Street: "",
  City: "",
  // Service
  ServiceType: "",
  ServiceLabel: "",
  ServiceFormat: "",
  // Live-in
  Tasks: [],
  HouseSize: "",
  PeopleAtHome: 3,
  PetsAtHome: "",
  HomeType: "",
  // Cook
  MealPref: "",
  MealsNeeded: [],
  CuisinePref: [],
  // Baby Caretaker
  ChildAge: "",
  ChildDuties: [],
  // Japa
  JapaDuties: [],
  JapaMotherNeeds: [],
  // Patient Care
  PatientAge: "",
  PatientGender: "",
  CareNeeded: [],
  // Driver
  VehicleType: [],
  // Common
  Budget: "",
  Urgency: "",
  Instructions: "",
  // Plan
  PlanType: "",
  PaymentStatus: "",
};
