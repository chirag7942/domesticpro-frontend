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
    id: "House Help",
    label: "House Help",
    image: `${CDN}/v1773034357/househelp_wsuqby.png`,
    color: "#4F9EF8",
    emoji: "🏠",
  },
  {
    id: "Cook",
    label: "Cook",
    image: `${CDN}/v1773034353/cook_aa2ex7.png`,
    color: "#F87C4F",
    emoji: "👨‍🍳",
  },
  {
    id: "Babysitter",
    label: "Babysitter",
    image: `${CDN}/v1773034351/baby-caretaker_qtcpvn.png`,
    color: "#A78BFA",
    emoji: "👶",
  },
  {
    id: "Elderly Care",
    label: "Elderly Care",
    image: `${CDN}/v1773034355/elderly-household_mt1b8o.png`,
    color: "#F87FAC",
    emoji: "🧓",
  },
  {
    id: "Driver",
    label: "Driver",
    image: `${CDN}/v1773034355/driver_efye54.png`,
    color: "#34D399",
    emoji: "🚗",
  },
  {
    id: "House Manager",
    label: "House Manager",
    image: `${CDN}/v1773034359/house-manager_by4krx.png`,
    color: "#FBBF24",
    emoji: "📋",
  },
  {
    id: "Multiple Services",
    label: "Multiple Services",
    image: `${CDN}/v1773034365/multiple-services_ja2pbu.png`,
    color: "#EC5F36",
    emoji: "✨",
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
    image: `${CDN}/v1773038422/apartment_ys8rbw.png`,
  },
  {
    id: "Independent House",
    label: "Independent House",
    image: `${CDN}/v1773038451/individual_k0ko1y.png`,
  },
  { id: "Villa", label: "Villa", image: `${CDN}/v1773038464/villa_z0apwp.png` },
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
];

export const SUBSTITUTE_BUDGETS = [
  {
    id: "sub-5k",
    label: "₹5,000",
    desc: "Standard substitute placement — fixed rate",
    badge: "Fixed Rate",
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
    id: "nopay",
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

export const SERVICE_FLOWS = {
  "House Help": [
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
  Cook: [
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
  Babysitter: [
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
  "Elderly Care": [
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
  "House Manager": [
    "service",
    "format",
    "managerduties",
    "hometype",
    "budget",
    "urgency",
    "contact",
    "plan",
    "done",
  ],
  "Multiple Services": [
    "service",
    "format",
    "multiservices",
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
  managerduties: { label: "Duties", icon: ClipboardList },
  hometype: { label: "Home", icon: Home },
  multiservices: { label: "Services", icon: Sparkles },
  urgency: { label: "Urgency", icon: Zap },
  budget: { label: "Budget", icon: DollarSign },
  contact: { label: "Contact", icon: Phone },
  plan: { label: "Plan", icon: CreditCard },
};

export const INIT = {
  // Contact
  FirstName: "",
  LastName: "",
  Email: "",
  Phone: "",
  PAN: "", // ← new
  GST: "", // ← new
  Street: "",
  City: "",
  State: "",
  Pincode: "",
  // Service
  ServiceType: "",
  ServiceLabel: "",
  ServiceFormat: "",
  // House help
  Tasks: [],
  HouseSize: "",
  PeopleAtHome: 3,
  PetsAtHome: "",
  HomeType: "",
  // Cook
  MealPref: "",
  MealsNeeded: [],
  CuisinePref: [],
  // Babysitter
  ChildAge: "",
  ChildDuties: [],
  // Elderly care
  PatientAge: "",
  PatientGender: "",
  CareNeeded: [],
  // Driver
  VehicleType: [],
  // House manager
  ManagerDuties: [],
  MultiServices: [],
  // Common
  Budget: "",
  Urgency: "",
  Instructions: "",
  // Plan
  PlanType: "",
  PaymentStatus: "",
  PAN: "",
  GST: "",
};
