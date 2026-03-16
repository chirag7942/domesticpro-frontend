// ─────────────────────────────────────────────────────────────────────────────
// wizardData.js — All static wizard data extracted from HeroWizard
// Moving this out of the component file lets Vite chunk it separately
// and keeps HeroWizard.jsx focused on logic only
// ─────────────────────────────────────────────────────────────────────────────

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
  Wallet,
  Utensils,
  Coffee,
  Sparkles,
} from "lucide-react";

// ── Cloudinary base (keeps URLs short in this file) ──────────────────────────
const CDN = "https://res.cloudinary.com/dhtzknkdr/image/upload";

export const SERVICES = [
  {
    id: "House Help",
    label: "House Help",
    image: `${CDN}/v1773034357/househelp_wsuqby.png`,
    color: "#4F9EF8",
    emoji: "🏠",
    desc: "Daily cleaning & chores",
  },
  {
    id: "Cook",
    label: "Cook",
    image: `${CDN}/v1773034353/cook_aa2ex7.png`,
    color: "#F87C4F",
    emoji: "👨‍🍳",
    desc: "Meals & kitchen care",
  },
  {
    id: "Babysitter",
    label: "Babysitter",
    image: `${CDN}/v1773034351/baby-caretaker_qtcpvn.png`,
    color: "#A78BFA",
    emoji: "👶",
    desc: "Child care & safety",
  },
  {
    id: "Elderly Care",
    label: "Elderly Care",
    image: `${CDN}/v1773034355/elderly-household_mt1b8o.png`,
    color: "#F87FAC",
    emoji: "🧓",
    desc: "Senior care & support",
  },
  {
    id: "Driver",
    label: "Driver",
    image: `${CDN}/v1773034355/driver_efye54.png`,
    color: "#34D399",
    emoji: "🚗",
    desc: "Reliable transport",
  },
  {
    id: "House Manager",
    label: "House Manager",
    image: `${CDN}/v1773034359/house-manager_by4krx.png`,
    color: "#FBBF24",
    emoji: "📋",
    desc: "Full household mgmt",
  },
  {
    id: "Multiple Services",
    label: "Multiple Services",
    image: `${CDN}/v1773034365/multiple-services_ja2pbu.png`,
    color: "#EC5F36",
    emoji: "✨",
    desc: "Combine services",
  },
];

export const SERVICE_FORMATS = [
  {
    id: "Live-In",
    label: "Live-In",
    desc: "Stays at your home full-time. Available round the clock for all household needs.",
    icon: Home,
  },
  {
    id: "Substitute",
    label: "Substitute",
    desc: "Short-term replacement cover for your existing staff member.",
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
  {
    id: "1BHK",
    label: "1 BHK",
    desc: "~400–600 sq ft",
    image: `${CDN}/v1773037116/1BHK_bgzp6k.png`,
  },
  {
    id: "2BHK",
    label: "2 BHK",
    desc: "~700–1000 sq ft",
    image: `${CDN}/v1773037121/2BHK_sin2om.png`,
  },
  {
    id: "3BHK",
    label: "3 BHK",
    desc: "~1100–1500 sq ft",
    image: `${CDN}/v1773037117/3BHK_jc54bv.png`,
  },
  {
    id: "4BHK",
    label: "4 BHK",
    desc: "~1600–2500 sq ft",
    image: `${CDN}/v1773037118/4BHK_vnuyup.png`,
  },
  {
    id: "Villa",
    label: "Villa",
    desc: "2500+ sq ft",
    image: `${CDN}/v1773037129/villa_jextfy.png`,
  },
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

export const MANAGER_DUTIES = [
  {
    id: "Oversee help",
    label: "Oversee help",
    image: `${CDN}/v1773038455/oversees_xfxlru.png`,
  },
  {
    id: "Household Purchases",
    label: "Household Purchases",
    image: `${CDN}/v1773038449/householdPurchases_lc4bgs.png`,
  },
  {
    id: "Groceries & Inventory",
    label: "Groceries & Inventory",
    image: `${CDN}/v1773038425/grocery_yv1iqg.png`,
  },
  {
    id: "Supervise Maintenance",
    label: "Supervise Maintenance",
    image: `${CDN}/v1773038453/maintenence_kbyfbt.png`,
  },
  {
    id: "Guest Management",
    label: "Guest Management",
    image: `${CDN}/v1773038428/guest_tm7kc8.png`,
  },
  {
    id: "Cooking Oversight",
    label: "Cooking Oversight",
    image: `${CDN}/v1773038424/cookingOversight_bonbic.png`,
  },
  {
    id: "Vendor Coordination",
    label: "Vendor Coordination",
    image: `${CDN}/v1773038457/vendor_pyxn9t.png`,
  },
];

export const HOME_TYPES = [
  {
    id: "Apartment",
    label: "Apartment",
    desc: "Flat / unit in building",
    image: `${CDN}/v1773038422/apartment_ys8rbw.png`,
  },
  {
    id: "Independent House",
    label: "Independent House",
    desc: "Standalone bungalow",
    image: `${CDN}/v1773038451/individual_k0ko1y.png`,
  },
  {
    id: "Villa",
    label: "Villa",
    desc: "Gated community villa",
    image: `${CDN}/v1773038464/villa_z0apwp.png`,
  },
];

export const MULTI_SERVICES = [
  {
    id: "House Help",
    label: "House Help",
    image: `${CDN}/v1773034357/househelp_wsuqby.png`,
  },
  { id: "Cook", label: "Cook", image: `${CDN}/v1773034353/cook_aa2ex7.png` },
  {
    id: "Babysitter",
    label: "Babysitter",
    image: `${CDN}/v1773034351/baby-caretaker_qtcpvn.png`,
  },
  {
    id: "Elderly Care",
    label: "Elderly Care",
    image: `${CDN}/v1773034355/elderly-household_mt1b8o.png`,
  },
  {
    id: "Driver",
    label: "Driver",
    image: `${CDN}/v1773034355/driver_efye54.png`,
  },
  {
    id: "House Manager",
    label: "House Manager",
    image: `${CDN}/v1773034359/house-manager_by4krx.png`,
  },
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
  {
    id: "₹10,000 – ₹14,999",
    label: "₹10,000 – ₹14,999",
    desc: "Limited availability in this range",
  },
];

export const SUBSTITUTE_BUDGETS = [
  {
    id: "sub-5k",
    label: "₹5,000 / month",
    desc: "Standard substitute placement — fixed rate",
    badge: "Fixed Rate",
    highlight: true,
  },
];

export const URGENCY_OPTIONS = [
  {
    id: "Immediately",
    label: "Immediately",
    desc: "We fast-track your request — profiles shared within 24 hours.",
    icon: Zap,
    color: "#EF4444",
  },
  {
    id: "Within 7–15 days",
    label: "Within 7–15 days",
    desc: "Planned start — profiles shared within 3–5 working days.",
    icon: CalendarClock,
    color: "#F59E0B",
  },
  {
    id: "Within 30 days",
    label: "Within 30 days",
    desc: "No big rush — we'll find the best possible match for you.",
    icon: Clock,
    color: "#3B82F6",
  },
];

export const PLANS = {
  priority: {
    id: "Priority Pay",
    name: "Priority Pay",
    subtitle: "Pay Now — Guaranteed Fastest Placement",
    amount: 2999,
    gst: Math.round(2999 * 0.18),
    color: "#EC5F36",
    bgColor: "#FFF7F4",
    borderColor: "#F5D8CF",
    badgeBg: "linear-gradient(135deg,#EC5F36,#D84E28)",
    timeline: "Profiles shared within 24 hours",
    paymentNote: "Payment required before placement",
    emoji: "⚡",
    inclusions: [
      "Same-Day Maid Shortlisting (Priority Handling)",
      "5 verified profiles within 24 hours",
      "Priority maid shortlisting & coordination",
      "Profile finalization assistance",
      "15-day free look period",
    ],
    bonus: "First replacement FREE within 15 days",
  },
  pbt: {
    id: "Pay Before Profile Sharing ",
    name: "Pay Before Profile Sharing",
    subtitle: "No upfront payment needed",
    amount: 4999,
    gst: Math.round(4999 * 0.18),
    color: "#3B82F6",
    bgColor: "#EFF6FF",
    borderColor: "#BFDBFE",
    badgeBg: "linear-gradient(135deg,#3B82F6,#2563EB)",
    timeline: "Profiles shared within 3–5 working days",
    paymentNote: "Pay only before the helper trial is completed",
    emoji: "🗓️",
    inclusions: [
      "Maid shortlisting & coordination",
      "Profile finalization assistance",
      "15-day free look period",
    ],
    bonus: null,
  },
};

export const PAYMENT_INFO = {
  upiId: "domesticpro@upi",
  accountName: "Domestic Pro Pvt Ltd",
  accountNumber: "1234 5678 9012 3456",
  ifsc: "HDFC0001234",
  bankName: "HDFC Bank",
  branch: "Connaught Place, New Delhi",
  whatsapp: "9876543210",
};

export const SERVICE_FLOWS = {
  househelp: [
    "service",
    "format",
    "tasks",
    "housesize",
    "pets",
    "budget",
    "urgency",
    "contact",
    "plan",
    "payment",
    "done",
  ],
  cook: [
    "service",
    "format",
    "mealpref",
    "mealtime",
    "cuisine",
    "budget",
    "urgency",
    "contact",
    "plan",
    "payment",
    "done",
  ],
  babysitter: [
    "service",
    "format",
    "childage",
    "childduties",
    "budget",
    "urgency",
    "contact",
    "plan",
    "payment",
    "done",
  ],
  elderlycare: [
    "service",
    "format",
    "patientage",
    "patientgender",
    "careneeded",
    "budget",
    "urgency",
    "contact",
    "plan",
    "payment",
    "done",
  ],
  driver: [
    "service",
    "format",
    "vehicletype",
    "budget",
    "urgency",
    "contact",
    "plan",
    "payment",
    "done",
  ],
  housemanager: [
    "service",
    "format",
    "managerduties",
    "hometype",
    "budget",
    "urgency",
    "contact",
    "plan",
    "payment",
    "done",
  ],
  multiple: [
    "service",
    "format",
    "multiservices",
    "budget",
    "urgency",
    "contact",
    "plan",
    "payment",
    "done",
  ],
};

export const DEFAULT_FLOW = [
  "service",
  "details",
  "urgency",
  "budget",
  "contact",
  "plan",
  "payment",
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
  managerduties: { label: "Duties", icon: ClipboardList },
  hometype: { label: "Home", icon: Home },
  multiservices: { label: "Services", icon: Sparkles },
  urgency: { label: "Urgency", icon: Zap },
  budget: { label: "Budget", icon: DollarSign },
  contact: { label: "Contact", icon: Phone },
  plan: { label: "Plan", icon: CreditCard },
  payment: { label: "Payment", icon: Wallet },
};

export const INIT = {
  FirstName: "",
  LastName: "",
  Email: "",
  Phone: "",
  Street: "",
  City: "",
  State: "",
  Pincode: "",
  ServiceType: "",
  ServiceLabel: "",
  ServiceFormat: "",
  Tasks: [],
  HouseSize: "",
  PeopleAtHome: 3,
  PetsAtHome: "",
  HomeType: "",
  MealPref: "",
  MealsNeeded: [],
  CuisinePref: [],
  ChildAge: "",
  ChildDuties: [],
  PatientAge: "",
  PatientGender: "",
  CareNeeded: [],
  VehicleType: [],
  ManagerDuties: [],
  MultiServices: [],
  Budget: "",
  Urgency: "",
  Instructions: "",
  PlanType: "",
  PaymentStatus: "",
  ScreenshotUrl: "",
};
