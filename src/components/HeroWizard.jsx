import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import CitySelect from "./CitySelect";

import {
  Check,
  ArrowLeft,
  X,
  CheckCircle2,
  Minus,
  Plus,
  Sparkles,
  Baby,
  ChefHat,
  Home,
  HeartPulse,
  Car,
  Zap,
  Briefcase,
  Layers,
  Clock,
  UserCheck,
  Phone,
  Wind,
  Shirt,
  Droplets,
  Brush,
  UtensilsCrossed,
  ShoppingCart,
  MoreHorizontal,
  CalendarClock,
  Users,
  Stethoscope,
  HandHeart,
  Activity,
  ShieldCheck,
  PersonStanding,
  Star,
  Home as HomeIcon,
  TreePine,
  Utensils,
  Coffee,
  PawPrint,
  DollarSign,
  ClipboardList,
  Copy,
  CreditCard,
  Timer,
  Bolt,
  Upload,
  ImageIcon,
  CheckCircle,
  Send,
  Wallet,
  Building2,
  Smartphone,
} from "lucide-react";

const API_BASE = import.meta.env.VITE_REACT_APP_API;
const CLOUDINARY_CLOUD_NAME = "dhtzknkdr"; // "dto7bji6b";
const CLOUDINARY_UPLOAD_PRESET = "domestic-pro-img"; //"payment_screenshots";

const PAYMENT_INFO = {
  upiId: "domesticpro@upi",
  accountName: "Domestic Pro Pvt Ltd",
  accountNumber: "1234 5678 9012 3456",
  ifsc: "HDFC0001234",
  bankName: "HDFC Bank",
  branch: "Connaught Place, New Delhi",
  whatsapp: "9876543210",
};

const SERVICES = [
  {
    id: "househelp",
    label: "House Help",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773034357/househelp_wsuqby.png",
    color: "#4F9EF8",
    emoji: "🏠",
    desc: "Daily cleaning & chores",
  },
  {
    id: "cook",
    label: "Cook",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773034353/cook_aa2ex7.png",
    color: "#F87C4F",
    emoji: "👨‍🍳",
    desc: "Meals & kitchen care",
  },
  {
    id: "babysitter",
    label: "Babysitter",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773034351/baby-caretaker_qtcpvn.png",
    color: "#A78BFA",
    emoji: "👶",
    desc: "Child care & safety",
  },
  {
    id: "elderlycare",
    label: "Elderly Care",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773034355/elderly-household_mt1b8o.png",
    color: "#F87FAC",
    emoji: "🧓",
    desc: "Senior care & support",
  },
  {
    id: "driver",
    label: "Driver",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773034355/driver_efye54.png",
    color: "#34D399",
    emoji: "🚗",
    desc: "Reliable transport",
  },
  {
    id: "housemanager",
    label: "House Manager",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773034359/house-manager_by4krx.png",
    color: "#FBBF24",
    emoji: "📋",
    desc: "Full household mgmt",
  },
  {
    id: "multiple",
    label: "Multiple Services",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773034365/multiple-services_ja2pbu.png",
    color: "#EC5F36",
    emoji: "✨",
    desc: "Combine services",
  },
];

const SERVICE_FORMATS = [
  {
    id: "livein",
    label: "Live-In",
    desc: "Stays at your home full-time. Available round the clock for all household needs.",
    icon: Home,
  },
  {
    id: "substitute",
    label: "Substitute",
    desc: "Short-term replacement cover for your existing staff member.",
    icon: Users,
  },
  {
    id: "liveout",
    label: "Live-Out",
    desc: "Arrives daily for set hours. Goes home in the evening.",
    icon: Clock,
    comingSoon: true,
  },
];

const GENDER_OPTIONS_DATA = [
  {
    id: "male",
    label: "Male",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773031904/male_wubsvs.png",
  },
  {
    id: "female",
    label: "Female",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773031900/female_zo7iwn.png",
  },
];

const TASKS = [
  {
    id: "cleaning",
    label: "Cleaning",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773037121/cleaning_fszds1.png",
  },
  {
    id: "utensils",
    label: "Utensils",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773037127/utensils_fyurgi.png",
  },
  {
    id: "laundry",
    label: "Laundry",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773037122/laundry_qowye6.png",
  },
  {
    id: "dusting",
    label: "Dusting",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773037119/dusting_hw9vbr.png",
  },
  {
    id: "bathroom",
    label: "Bathroom",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773037119/bathroom_phzorr.png",
  },
  {
    id: "groceries",
    label: "Groceries",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773037120/grocery_teclqd.png",
  },
  {
    id: "other",
    label: "Other",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773034370/other_s1pon0.png",
  },
];

const HOUSE_SIZES = [
  {
    id: "1bhk",
    label: "1 BHK",
    desc: "~400–600 sq ft",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773037116/1BHK_bgzp6k.png",
  },
  {
    id: "2bhk",
    label: "2 BHK",
    desc: "~700–1000 sq ft",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773037121/2BHK_sin2om.png",
  },
  {
    id: "3bhk",
    label: "3 BHK",
    desc: "~1100–1500 sq ft",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773037117/3BHK_jc54bv.png",
  },
  {
    id: "4bhk",
    label: "4 BHK",
    desc: "~1600–2500 sq ft",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773037118/4BHK_vnuyup.png",
  },
  {
    id: "villa",
    label: "Villa",
    desc: "2500+ sq ft",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773037129/villa_jextfy.png",
  },
];

const MEAL_PREFS = [
  {
    id: "veg",
    label: "Veg",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773037727/veg_jz5fdj.png",
  },
  {
    id: "nonveg",
    label: "Non-Veg",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773037724/non-veg_e3ji5g.png",
  },
  {
    id: "both",
    label: "Both",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773037719/full-cook_yomiur.png",
  },
];

const MEALS_NEEDED = [
  {
    id: "breakfast",
    label: "Breakfast",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773037713/breakfast_uufihz.png",
  },
  {
    id: "lunch",
    label: "Lunch",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773037720/lunch_duetlf.png",
  },
  {
    id: "dinner",
    label: "Dinner",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773037718/dinner_omjj6q.png",
  },
  {
    id: "all",
    label: "All Meals",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773037713/all-meals_zcgzng.png",
  },
];

const CUISINES = [
  {
    id: "northindian",
    label: "North Indian",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773037726/north-indian_uxc5tl.png",
  },
  {
    id: "southindian",
    label: "South Indian",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773037726/south-indian_udys5o.png",
  },
  {
    id: "chinese",
    label: "Chinese",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773037716/chinese_dmrbhy.png",
  },
  {
    id: "continental",
    label: "Continental",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773037716/continental_wboery.png",
  },
  {
    id: "diet",
    label: "Diet Food",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773037715/diet_pxaiek.png",
  },
  {
    id: "other",
    label: "Other",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773034370/other_s1pon0.png",
  },
];

const CHILD_DUTIES = [
  {
    id: "feeding",
    label: "Feeding",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773038057/feeding_kvsvwk.png",
  },
  {
    id: "bathing",
    label: "Bathing",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773038057/bathing_bykrvq.png",
  },
  {
    id: "homework",
    label: "Homework",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773038059/homework_g3jbdz.png",
  },
  {
    id: "playtime",
    label: "Playtime",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773038058/playtime_udha2d.png",
  },
  {
    id: "sleep",
    label: "Putting to Sleep",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773038061/sleeping_uk5vqm.png",
  },
  {
    id: "other",
    label: "Other",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773034370/other_s1pon0.png",
  },
];

const CARE_NEEDED = [
  {
    id: "basic",
    label: "Basic Support",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773038308/caregiver_rhozy2.png",
  },
  {
    id: "hygiene",
    label: "Personal Hygiene",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773038311/hygiene_de4gcu.png",
  },
  {
    id: "mobility",
    label: "Mobility Support",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773038315/support_erb1uy.png",
  },
  {
    id: "medicine",
    label: "Medicine Reminders",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773038312/medicine_kjlkd0.png",
  },
  {
    id: "full",
    label: "Full Care",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773038310/full-help_jrxrax.png",
  },
];

const VEHICLE_TYPES = [
  {
    id: "manual",
    label: "Manual",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773038638/manual_f78sol.png",
  },
  {
    id: "automatic",
    label: "Automatic",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773038636/automatic_dmyqva.png",
  },
  {
    id: "suv",
    label: "SUV",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773038641/SUV_hzrcgr.png",
  },
  {
    id: "sedan",
    label: "Sedan",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773038639/sedan_q1xmlm.png",
  },
];

// const EXPERIENCE_LEVELS = [
//   {
//     id: "0-1",
//     label: "0–1 years",
//     desc: "Flexible for your standards",
//     star: 0,
//   },
//   { id: "1-3", label: "1–3 years", desc: "Good for standard tasks", star: 1 },
//   { id: "3-5", label: "3–5 years", desc: "Experienced professional", star: 2 },
//   { id: "5+", label: "5+ years", desc: "Expert & highly trained", star: 3 },
// ];

const MANAGER_DUTIES = [
  {
    id: "help",
    label: "Oversee help",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773038455/oversees_xfxlru.png",
  },
  {
    id: "purchase",
    label: "Household Purchases",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773038449/householdPurchases_lc4bgs.png",
  },
  {
    id: "grocery",
    label: "Groceries & Inventory",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773038425/grocery_yv1iqg.png",
  },
  {
    id: "maintain",
    label: "Supervise Maintenance",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773038453/maintenence_kbyfbt.png",
  },
  {
    id: "guests",
    label: "Guest Management",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773038428/guest_tm7kc8.png",
  },
  {
    id: "cooking",
    label: "Cooking Oversight",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773038424/cookingOversight_bonbic.png",
  },
  {
    id: "vendor",
    label: "Vendor Coordination",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773038457/vendor_pyxn9t.png",
  },
];

const HOME_TYPES = [
  {
    id: "apartment",
    label: "Apartment",
    desc: "Flat / unit in building",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773038422/apartment_ys8rbw.png",
  },
  {
    id: "independent",
    label: "Independent House",
    desc: "Standalone bungalow",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773038451/individual_k0ko1y.png",
  },
  {
    id: "villa",
    label: "Villa",
    desc: "Gated community villa",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773038464/villa_z0apwp.png",
  },
];

const MULTI_SERVICES = [
  {
    id: "househelp",
    label: "House Help",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773034357/househelp_wsuqby.png",
  },
  {
    id: "cook",
    label: "Cook",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773034353/cook_aa2ex7.png",
  },
  {
    id: "babysitter",
    label: "Babysitter",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773034351/baby-caretaker_qtcpvn.png",
  },
  {
    id: "elderlycare",
    label: "Elderly Care",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773034355/elderly-household_mt1b8o.png",
  },
  {
    id: "driver",
    label: "Driver",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773034355/driver_efye54.png",
  },
  {
    id: "housemanager",
    label: "House Manager",
    image:
      "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773034359/house-manager_by4krx.png",
  },
];

const BUDGETS = [
  {
    id: "25k+",
    label: "₹25,000+",
    desc: "Highly trained & experienced helpers",
  },
  { id: "18-25k", label: "₹18k – ₹25k", desc: "Trained helpers available" },
  { id: "15-17k", label: "₹15k – ₹17k", desc: "Untrained helpers" },
  {
    id: "10-15k",
    label: "₹10k – ₹15k",
    desc: "Limited availability in this range",
  },
];

const SUBSTITUTE_BUDGETS = [
  {
    id: "sub-5k",
    label: "₹5,000 / month",
    desc: "Standard substitute placement — fixed rate",
    badge: "Fixed Rate",
    highlight: true,
  },
];

const URGENCY_OPTIONS = [
  {
    id: "immediate",
    label: "Immediately",
    desc: "We fast-track your request — profiles shared within 24 hours.",
    icon: Zap,
    color: "#EF4444",
  },
  {
    id: "week",
    label: "Within 7–15 days",
    desc: "Planned start — profiles shared within 3–5 working days.",
    icon: CalendarClock,
    color: "#F59E0B",
  },
  {
    id: "month",
    label: "Within 30 days",
    desc: "No big rush — we'll find the best possible match for you.",
    icon: Clock,
    color: "#3B82F6",
  },
];

const PLANS = {
  priority: {
    id: "priority",
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

const SERVICE_FLOWS = {
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

const DEFAULT_FLOW = [
  "service",
  "details",
  "urgency",
  "budget",
  "contact",
  "plan",
  "payment",
  "done",
];

const PROG_META = {
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

const INIT = {
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

const uploadToCloudinary = async (file) => {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  fd.append("folder", "payment_screenshots");
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: "POST", body: fd },
  );
  if (!res.ok) throw new Error("Cloudinary upload failed");
  return res.json();
};

const submitToBackend = async (formData) => {
  const res = await fetch(`${API_BASE}/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  return res.json();
};

export default function HeroWizard({
  asModal = false,
  isOpen = true,
  onClose,
  onSubmit,
}) {
  const [stepIdx, setStepIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const [form, setForm] = useState({ ...INIT });
  const [planSubmitting, setPlanSubmitting] = useState(false);
  const [copied, setCopied] = useState("");

  // payment step state
  const [screenshotFile, setScreenshotFile] = useState(null);
  const [screenshotPreview, setScreenshotPreview] = useState(null);
  const [screenshotUploading, setScreenshotUploading] = useState(false);
  const [screenshotUrl, setScreenshotUrl] = useState("");
  const [paymentSubmitting, setPaymentSubmitting] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const bodyRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = 0;
  }, [stepIdx, form.ServiceType]);

  const steps = form.ServiceType
    ? SERVICE_FLOWS[form.ServiceType]
    : DEFAULT_FLOW;
  const curKey = steps[stepIdx] ?? "service";
  const isDone = curKey === "done";

  const progKeys = steps.filter((k) => k !== "done" && k !== "payment");
  const progIdx = isDone ? progKeys.length : progKeys.indexOf(curKey);
  const progPct =
    progKeys.length <= 1
      ? 0
      : Math.round((Math.max(0, progIdx) / (progKeys.length - 1)) * 100);
  const setF = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const toggleArr = (k, v) =>
    setForm((f) => ({
      ...f,
      [k]: f[k].includes(v) ? f[k].filter((x) => x !== v) : [...f[k], v],
    }));

  const goNext = () => {
    setDir(1);
    setStepIdx((i) => Math.min(i + 1, steps.length - 1));
  };
  const goBack = () => {
    setDir(-1);
    setStepIdx((i) => Math.max(i - 1, 0));
  };
  const after = (ms = 220) => setTimeout(goNext, ms);

  const resetWizard = () => {
    setStepIdx(0);
    setDir(1);
    setForm({ ...INIT });
    setPlanSubmitting(false);
    setCopied("");
    setScreenshotFile(null);
    setScreenshotPreview(null);
    setScreenshotUploading(false);
    setScreenshotUrl("");
    setPaymentSubmitting(false);
    setDragOver(false);
  };

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(""), 2000);
    });
  };

  const isValid = () => {
    switch (curKey) {
      case "service":
        return !!form.ServiceType;
      case "tasks":
        return form.Tasks.length > 0;
      case "housesize":
        return !!form.HouseSize;
      case "pets":
        return !!form.PetsAtHome;
      case "mealpref":
        return !!form.MealPref;
      case "mealtime":
        return form.MealsNeeded.length > 0;
      case "cuisine":
        return form.CuisinePref.length > 0;
      case "childage":
        return !!form.ChildAge.trim();
      case "childduties":
        return form.ChildDuties.length > 0;
      case "patientage":
        return !!form.PatientAge.trim();
      case "patientgender":
        return !!form.PatientGender;
      case "careneeded":
        return form.CareNeeded.length > 0;
      case "vehicletype":
        return form.VehicleType.length > 0;
      case "managerduties":
        return form.ManagerDuties.length > 0;
      case "hometype":
        return !!form.HomeType;
      case "multiservices":
        return form.MultiServices.length > 0;
      case "urgency":
        return !!form.Urgency;
      case "budget":
        return !!form.Budget;
      case "contact":
        return (
          form.FirstName.trim() !== "" &&
          form.Phone.length === 10 &&
          /^[6-9]/.test(form.Phone)
        );
      case "plan":
        return !!form.PlanType;
      case "payment":
        return true;
      default:
        return true;
    }
  };

  const CONT_KEYS = new Set([
    "tasks",
    "mealtime",
    "cuisine",
    "childduties",
    "careneeded",
    "vehicletype",
    "managerduties",
    "multiservices",
    "contact",
    "housesize",
    "mealpref",
    "urgency",
    "budget",
    "patientage",
    "childage",
    "patientgender",
    "hometype",
    "plan",
    "payment",
  ]);
  const showContinue = CONT_KEYS.has(curKey);

  const handlePlanSubmit = async (planType) => {
    if (!planType || planSubmitting) return;
    setF("PlanType", planType);

    if (planType === "priority") {
      setF("PaymentStatus", "Pending Payment");
      goNext();
      return;
    }

    // PBT path
    setPlanSubmitting(true);
    const updatedForm = {
      ...form,
      PlanType: planType,
      PaymentStatus: "Pending Payment",
      ScreenshotUrl: "",
    };
    try {
      const result = await submitToBackend(updatedForm);
      onSubmit?.(updatedForm, result);
    } catch (err) {
      console.error("Backend error:", err);
    }
    setPlanSubmitting(false);
    setStepIdx(steps.indexOf("done"));
  };

  const handleFileSelect = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setScreenshotFile(file);
    setScreenshotUrl("");
    const reader = new FileReader();
    reader.onload = (e) => setScreenshotPreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleUploadScreenshot = async () => {
    if (!screenshotFile || screenshotUploading) return;
    setScreenshotUploading(true);
    try {
      const data = await uploadToCloudinary(screenshotFile);
      setScreenshotUrl(data.secure_url);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed. Please try again.");
    }
    setScreenshotUploading(false);
  };

  const handlePaymentSubmit = async () => {
    if (paymentSubmitting) return;
    setPaymentSubmitting(true);
    try {
      const updatedForm = {
        ...form,
        PlanType: form.PlanType || "priority",
        PaymentStatus: screenshotUrl
          ? "Screenshot Received — Pending Verification"
          : "Pending Payment",
        ScreenshotUrl: screenshotUrl || "",
      };
      const result = await submitToBackend(updatedForm);
      onSubmit?.(updatedForm, result);
    } catch (err) {
      console.error("Payment submit error:", err);
    }
    setPaymentSubmitting(false);
    goNext();
  };

  const SvcCard = ({ svc, selected, onClick, className = "" }) => (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`hw2-svc-card ${className}`}
      style={{
        borderColor: selected ? svc.color : "#E5E2DE",
        boxShadow: selected
          ? `0 8px 24px ${svc.color}40`
          : "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <img
        src={svc.image}
        alt={svc.label}
        loading="lazy"
        className="hw2-svc-img"
      />
      <div className="hw2-svc-overlay" />
      {selected && (
        <div
          className="hw2-svc-tint"
          style={{ background: `${svc.color}33` }}
        />
      )}
      <p className="hw2-svc-label">{svc.label}</p>
      {selected && (
        <div className="hw2-svc-check" style={{ background: svc.color }}>
          <Check size={9} strokeWidth={3} color="#fff" />
        </div>
      )}
    </button>
  );

  const GenderImgCard = ({ opt, selected, onClick }) => (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className="hw2-gender-card"
      style={{
        borderColor: selected ? "#EC5F36" : "#E5E2DE",
        boxShadow: selected
          ? "0 8px 24px rgba(236,95,54,0.32)"
          : "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <img
        src={opt.image}
        alt={opt.label}
        loading="lazy"
        className="hw2-gender-img"
      />
      <div className="hw2-gender-overlay" />
      {selected && <div className="hw2-gender-tint" />}
      <p className="hw2-gender-label">{opt.label}</p>
      {selected && (
        <div className="hw2-gender-check">
          <Check size={9} strokeWidth={3} color="#fff" />
        </div>
      )}
    </button>
  );

  const Pill = ({ icon: Icon, label, desc, selected, onClick }) => {
    const ac = "#EC5F36";
    return (
      <button
        type="button"
        aria-pressed={selected}
        onClick={onClick}
        className="hw2-pill"
        style={{
          background: selected ? ac : "#fff",
          borderColor: selected ? ac : "#E5E2DE",
          boxShadow: selected
            ? `0 6px 18px ${ac}33`
            : "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div
          className="hw2-pill-ico"
          style={{
            background: selected ? "rgba(255,255,255,0.22)" : "#FFF2EE",
          }}
        >
          <Icon size={16} color={selected ? "#fff" : ac} strokeWidth={1.8} />
        </div>
        <div className="hw2-pill-txt">
          <span
            className="hw2-pill-label"
            style={{ color: selected ? "#fff" : "#1a1a2e" }}
          >
            {label}
          </span>
          {desc && (
            <span
              className="hw2-pill-desc"
              style={{ color: selected ? "rgba(255,255,255,0.78)" : "#888" }}
            >
              {desc}
            </span>
          )}
        </div>
        {selected && (
          <Check
            size={14}
            strokeWidth={2.5}
            color="#fff"
            className="ml-auto flex-shrink-0"
          />
        )}
      </button>
    );
  };

  const ImgChip = ({ label, image, selected, onClick, color = "#EC5F36" }) => (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className="hw2-svc-card"
      style={{
        borderColor: selected ? color : "#E5E2DE",
        boxShadow: selected
          ? `0 8px 24px ${color}40`
          : "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <img src={image} alt={label} loading="lazy" className="hw2-svc-img" />
      <div className="hw2-svc-overlay" />
      {selected && (
        <div className="hw2-svc-tint" style={{ background: `${color}33` }} />
      )}
      <p className="hw2-svc-label">{label}</p>
      {selected && (
        <div className="hw2-svc-check" style={{ background: color }}>
          <Check size={9} strokeWidth={3} color="#fff" />
        </div>
      )}
    </button>
  );

  const Stepper = ({ label, value, onDec, onInc, min = 1, max = 20 }) => (
    <div className="hw2-stepper">
      <span className="hw2-step-label">{label}</span>
      <div className="hw2-step-ctrl">
        <button
          type="button"
          onClick={onDec}
          disabled={value <= min}
          className="hw2-step-btn"
          aria-label="dec"
        >
          <Minus size={13} strokeWidth={2.5} />
        </button>
        <span className="hw2-step-val">{value}</span>
        <button
          type="button"
          onClick={onInc}
          disabled={value >= max}
          className="hw2-step-btn"
          aria-label="inc"
        >
          <Plus size={13} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );

  const QHead = ({ q, hint }) => (
    <div className="mb-4">
      <p className="hw2-q">{q}</p>
      {hint && <p className="hw2-hint">{hint}</p>}
    </div>
  );

  const renderStep = () => {
    // ── Service ─────────────────────────────────────────────────────────────
    if (curKey === "service")
      return (
        <div>
          <QHead
            q="What type of house help do you need?"
            hint="Tap to select — we'll guide you from there"
          />
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
            {SERVICES.map((svc, index) => {
              const isLastSingle =
                SERVICES.length % 3 === 1 && index === SERVICES.length - 1;

              return (
                <SvcCard
                  key={svc.id}
                  svc={svc}
                  selected={form.ServiceType === svc.id}
                  onClick={() => {
                    setForm({
                      ...INIT,
                      ServiceType: svc.id,
                      ServiceLabel: svc.label,
                    });
                    setDir(1);
                    setTimeout(() => setStepIdx(1), 200);
                  }}
                  className={isLastSingle ? "col-start-2" : ""}
                />
              );
            })}
          </div>
        </div>
      );

    // ── Format ───────────────────────────────────────────────────────────────
    if (curKey === "format")
      return (
        <div>
          <QHead
            q="Choose Service Format"
            hint="How would you like the service provided?"
          />
          <div className="flex flex-col gap-2">
            {SERVICE_FORMATS.map((opt) => {
              const isCS = !!opt.comingSoon;
              return (
                <button
                  key={opt.id}
                  type="button"
                  aria-pressed={form.ServiceFormat === opt.id}
                  disabled={isCS}
                  onClick={() => {
                    if (isCS) return;
                    setF("ServiceFormat", opt.id);
                    after();
                  }}
                  className="hw2-pill"
                  style={{
                    background: isCS
                      ? "#F9F9F9"
                      : form.ServiceFormat === opt.id
                        ? "#EC5F36"
                        : "#fff",
                    borderColor: isCS
                      ? "#E5E2DE"
                      : form.ServiceFormat === opt.id
                        ? "#EC5F36"
                        : "#E5E2DE",
                    boxShadow:
                      !isCS && form.ServiceFormat === opt.id
                        ? "0 6px 18px rgba(236,95,54,0.33)"
                        : "0 1px 4px rgba(0,0,0,0.04)",
                    opacity: isCS ? 0.6 : 1,
                    cursor: isCS ? "not-allowed" : "pointer",
                    position: "relative",
                  }}
                >
                  <div
                    className="hw2-pill-ico"
                    style={{
                      background: isCS
                        ? "#F0F0F0"
                        : form.ServiceFormat === opt.id
                          ? "rgba(255,255,255,0.22)"
                          : "#FFF2EE",
                    }}
                  >
                    <opt.icon
                      size={16}
                      color={
                        isCS
                          ? "#bbb"
                          : form.ServiceFormat === opt.id
                            ? "#fff"
                            : "#EC5F36"
                      }
                      strokeWidth={1.8}
                    />
                  </div>
                  <div className="hw2-pill-txt">
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 7 }}
                    >
                      <span
                        className="hw2-pill-label"
                        style={{
                          color: isCS
                            ? "#aaa"
                            : form.ServiceFormat === opt.id
                              ? "#fff"
                              : "#1a1a2e",
                        }}
                      >
                        {opt.label}
                      </span>
                      {isCS && (
                        <span
                          style={{
                            fontSize: "9px",
                            fontWeight: 800,
                            background:
                              "linear-gradient(135deg,#6366f1,#8b5cf6)",
                            color: "#fff",
                            borderRadius: "20px",
                            padding: "2px 8px",
                            letterSpacing: "0.04em",
                            textTransform: "uppercase",
                          }}
                        >
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <span
                      className="hw2-pill-desc"
                      style={{
                        color: isCS
                          ? "#bbb"
                          : form.ServiceFormat === opt.id
                            ? "rgba(255,255,255,0.78)"
                            : "#888",
                      }}
                    >
                      {opt.desc}
                    </span>
                  </div>
                  {!isCS && form.ServiceFormat === opt.id && (
                    <Check
                      size={14}
                      strokeWidth={2.5}
                      color="#fff"
                      className="ml-auto flex-shrink-0"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      );

    // ── Tasks ────────────────────────────────────────────────────────────────
    if (curKey === "tasks")
      return (
        <div>
          <QHead q="Which tasks are needed?" hint="Select all that apply" />
          <div className="grid grid-cols-3 gap-2.5">
            {TASKS.map((t) => (
              <ImgChip
                key={t.id}
                label={t.label}
                image={t.image}
                selected={form.Tasks.includes(t.id)}
                onClick={() => toggleArr("Tasks", t.id)}
              />
            ))}
          </div>
          {form.Tasks.length === 0 && (
            <p className="hw2-warn mt-2">Pick at least one task to continue</p>
          )}
        </div>
      );

    // ── House size ───────────────────────────────────────────────────────────
    if (curKey === "housesize")
      return (
        <div>
          <QHead
            q="What's your home size?"
            hint="Helps us estimate effort & staff"
          />
          <div className="grid grid-cols-3 gap-2.5">
            {HOUSE_SIZES.map((h) => (
              <ImgChip
                key={h.id}
                label={h.label}
                image={h.image}
                selected={form.HouseSize === h.id}
                onClick={() => setF("HouseSize", h.id)}
              />
            ))}
          </div>
          <div className="mt-3">
            <Stepper
              label="People at home"
              value={form.PeopleAtHome}
              onDec={() =>
                setF("PeopleAtHome", Math.max(1, form.PeopleAtHome - 1))
              }
              onInc={() =>
                setF("PeopleAtHome", Math.min(20, form.PeopleAtHome + 1))
              }
            />
          </div>
        </div>
      );

    // ── Pets ─────────────────────────────────────────────────────────────────
    if (curKey === "pets")
      return (
        <div>
          <QHead
            q="Do you have pets at home?"
            hint="Some helpers prefer no pets — we'll match accordingly"
          />
          <div className="grid grid-cols-2 gap-3 mt-1">
            {[
              {
                id: "yes",
                label: "Yes, we have pets",
                image:
                  "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773037128/pets_rdppq7.png",
              },
              {
                id: "no",
                label: "No pets",
                image:
                  "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773037125/no-pets_ih18ap.png",
              },
            ].map((o) => (
              <ImgChip
                key={o.id}
                label={o.label}
                image={o.image}
                selected={form.PetsAtHome === o.id}
                onClick={() => {
                  setF("PetsAtHome", o.id);
                  after();
                }}
              />
            ))}
          </div>
        </div>
      );

    // ── Experience ───────────────────────────────────────────────────────────
    // if (curKey === "experience")
    //   return (
    //     <div>
    //       <QHead
    //         q="Experience level required?"
    //         hint="More experience means higher monthly cost"
    //       />
    //       <div className="flex flex-col gap-2">
    //         {EXPERIENCE_LEVELS.map((e) => (
    //           <button
    //             key={e.id}
    //             type="button"
    //             onClick={() => {
    //               setF("ExperienceRequired", e.id);
    //               after();
    //             }}
    //             className="hw2-exp-card"
    //             style={{
    //               background:
    //                 form.ExperienceRequired === e.id ? "#EC5F36" : "#fff",
    //               borderColor:
    //                 form.ExperienceRequired === e.id ? "#EC5F36" : "#E5E2DE",
    //               boxShadow:
    //                 form.ExperienceRequired === e.id
    //                   ? "0 6px 20px rgba(236,95,54,0.28)"
    //                   : "0 1px 4px rgba(0,0,0,0.04)",
    //             }}
    //           >
    //             <div className="flex flex-col flex-1">
    //               <span
    //                 className="hw2-exp-label"
    //                 style={{
    //                   color:
    //                     form.ExperienceRequired === e.id ? "#fff" : "#1a1a2e",
    //                 }}
    //               >
    //                 {e.label}
    //               </span>
    //               <span
    //                 className="hw2-exp-desc"
    //                 style={{
    //                   color:
    //                     form.ExperienceRequired === e.id
    //                       ? "rgba(255,255,255,0.8)"
    //                       : "#888",
    //                 }}
    //               >
    //                 {e.desc}
    //               </span>
    //             </div>
    //             <div className="flex gap-0.5">
    //               {Array.from({ length: 3 }).map((_, i) => (
    //                 <Star
    //                   key={i}
    //                   size={14}
    //                   strokeWidth={1.5}
    //                   fill={
    //                     i < e.star
    //                       ? form.ExperienceRequired === e.id
    //                         ? "#fff"
    //                         : "#EC5F36"
    //                       : "none"
    //                   }
    //                   color={
    //                     i < e.star
    //                       ? form.ExperienceRequired === e.id
    //                         ? "#fff"
    //                         : "#EC5F36"
    //                       : "#ccc"
    //                   }
    //                 />
    //               ))}
    //             </div>
    //           </button>
    //         ))}
    //       </div>
    //     </div>
    //   );

    // ── Meal pref ────────────────────────────────────────────────────────────
    if (curKey === "mealpref")
      return (
        <div>
          <QHead
            q="Dietary preference?"
            hint="Helps match the right cook for your household"
          />
          <div className="grid grid-cols-3 gap-2.5">
            {MEAL_PREFS.map((m) => (
              <ImgChip
                key={m.id}
                label={m.label}
                image={m.image}
                selected={form.MealPref === m.id}
                onClick={() => {
                  setF("MealPref", m.id);
                  after();
                }}
              />
            ))}
          </div>
        </div>
      );

    // ── Meal time ────────────────────────────────────────────────────────────
    if (curKey === "mealtime")
      return (
        <div>
          <QHead
            q="Which meals do you need cooked?"
            hint="Select all that apply"
          />
          <div className="grid grid-cols-2 gap-2.5">
            {MEALS_NEEDED.map((m) => (
              <ImgChip
                key={m.id}
                label={m.label}
                image={m.image}
                selected={form.MealsNeeded.includes(m.id)}
                onClick={() => toggleArr("MealsNeeded", m.id)}
              />
            ))}
          </div>
          {form.MealsNeeded.length === 0 && (
            <p className="hw2-warn mt-2">Pick at least one meal</p>
          )}
        </div>
      );

    // ── Cuisine ──────────────────────────────────────────────────────────────
    if (curKey === "cuisine")
      return (
        <div>
          <QHead
            q="Cuisine preference?"
            hint="Select all that your cook should know"
          />
          <div className="grid grid-cols-3 gap-2.5">
            {CUISINES.map((c) => (
              <ImgChip
                key={c.id}
                label={c.label}
                image={c.image}
                selected={form.CuisinePref.includes(c.id)}
                onClick={() => toggleArr("CuisinePref", c.id)}
              />
            ))}
          </div>
          {form.CuisinePref.length === 0 && (
            <p className="hw2-warn mt-2">Pick at least one cuisine</p>
          )}
        </div>
      );

    // ── Child age ────────────────────────────────────────────────────────────
    if (curKey === "childage")
      return (
        <div>
          <QHead
            q="How old is the child?"
            hint="Enter the child's age — we'll match caretakers accordingly"
          />
          <div className="hw2-age-input-wrap">
            <input
              className="hw2-finput hw2-age-input"
              type="text"
              placeholder="e.g. 2 years, 8 months…"
              value={form.ChildAge}
              autoFocus
              onChange={(e) => setF("ChildAge", e.target.value)}
            />
            <p className="hw2-age-hint">
              You can type freely, e.g. "3 years", "18 months", "5 years old"
            </p>
          </div>
        </div>
      );

    // ── Child duties ─────────────────────────────────────────────────────────
    if (curKey === "childduties")
      return (
        <div>
          <QHead q="What duties are needed?" hint="Select all that apply" />
          <div className="grid grid-cols-3 gap-2.5">
            {CHILD_DUTIES.map((d) => (
              <ImgChip
                key={d.id}
                label={d.label}
                image={d.image}
                selected={form.ChildDuties.includes(d.id)}
                onClick={() => toggleArr("ChildDuties", d.id)}
              />
            ))}
          </div>
          {form.ChildDuties.length === 0 && (
            <p className="hw2-warn mt-2">Select at least one duty</p>
          )}
        </div>
      );

    // ── Patient age ──────────────────────────────────────────────────────────
    if (curKey === "patientage")
      return (
        <div>
          <QHead
            q="How old is the patient?"
            hint="Enter the patient's age — helps us assign the right caregiver"
          />
          <div className="hw2-age-input-wrap">
            <input
              className="hw2-finput hw2-age-input"
              type="text"
              placeholder="e.g. 68 years, 72 years old…"
              value={form.PatientAge}
              autoFocus
              onChange={(e) => setF("PatientAge", e.target.value)}
            />
            <p className="hw2-age-hint">
              Type freely, e.g. "65 years", "70+", "senior citizen"
            </p>
          </div>
        </div>
      );

    // ── Patient gender ───────────────────────────────────────────────────────
    if (curKey === "patientgender")
      return (
        <div>
          <QHead
            q="Patient's gender?"
            hint="Helps us assign an appropriate caregiver"
          />
          <div className="grid grid-cols-2 gap-3">
            {GENDER_OPTIONS_DATA.map((g) => (
              <GenderImgCard
                key={g.id}
                opt={g}
                selected={form.PatientGender === g.id}
                onClick={() => {
                  setF("PatientGender", g.id);
                  after();
                }}
              />
            ))}
          </div>
        </div>
      );

    // ── Care needed ──────────────────────────────────────────────────────────
    if (curKey === "careneeded")
      return (
        <div>
          <QHead q="What care is required?" hint="Select all that apply" />
          <div className="grid grid-cols-3 gap-2.5">
            {CARE_NEEDED.map((c) => (
              <ImgChip
                key={c.id}
                label={c.label}
                image={c.image}
                selected={form.CareNeeded.includes(c.id)}
                onClick={() => toggleArr("CareNeeded", c.id)}
              />
            ))}
          </div>
          {form.CareNeeded.length === 0 && (
            <p className="hw2-warn mt-2">Select at least one type of care</p>
          )}
        </div>
      );

    // ── Vehicle type ─────────────────────────────────────────────────────────
    if (curKey === "vehicletype")
      return (
        <div>
          <QHead
            q="What vehicle(s) will the driver operate?"
            hint="Select all that apply"
          />
          <div className="grid grid-cols-2 gap-2.5">
            {VEHICLE_TYPES.map((v) => (
              <ImgChip
                key={v.id}
                label={v.label}
                image={v.image}
                selected={form.VehicleType.includes(v.id)}
                onClick={() => toggleArr("VehicleType", v.id)}
              />
            ))}
          </div>
          {form.VehicleType.length === 0 && (
            <p className="hw2-warn mt-2">Select at least one vehicle type</p>
          )}
        </div>
      );

    // ── Manager duties ───────────────────────────────────────────────────────
    if (curKey === "managerduties")
      return (
        <div>
          <QHead
            q="What responsibilities are needed?"
            hint="Select all that apply"
          />
          <div className="grid grid-cols-3 gap-2.5">
            {MANAGER_DUTIES.map((d) => (
              <ImgChip
                key={d.id}
                label={d.label}
                image={d.image}
                selected={form.ManagerDuties.includes(d.id)}
                onClick={() => toggleArr("ManagerDuties", d.id)}
              />
            ))}
          </div>
          {form.ManagerDuties.length === 0 && (
            <p className="hw2-warn mt-2">Select at least one responsibility</p>
          )}
        </div>
      );

    // ── Home type ────────────────────────────────────────────────────────────
    if (curKey === "hometype")
      return (
        <div>
          <QHead
            q="What type of home?"
            hint="Helps determine scope of management"
          />
          <div className="grid grid-cols-3 gap-2.5">
            {HOME_TYPES.map((h) => (
              <ImgChip
                key={h.id}
                label={h.label}
                image={h.image}
                selected={form.HomeType === h.id}
                onClick={() => {
                  setF("HomeType", h.id);
                  after();
                }}
              />
            ))}
          </div>
        </div>
      );

    // ── Multi services ───────────────────────────────────────────────────────
    if (curKey === "multiservices")
      return (
        <div>
          <QHead
            q="Which services do you need?"
            hint="Select all that apply — we'll bundle them"
          />
          <div className="grid grid-cols-3 gap-2.5">
            {MULTI_SERVICES.map((s) => (
              <ImgChip
                key={s.id}
                label={s.label}
                image={s.image}
                selected={form.MultiServices.includes(s.id)}
                onClick={() => toggleArr("MultiServices", s.id)}
              />
            ))}
          </div>
          {form.MultiServices.length === 0 && (
            <p className="hw2-warn mt-2">Select at least one service</p>
          )}
        </div>
      );

    // ── Urgency ──────────────────────────────────────────────────────────────
    if (curKey === "urgency")
      return (
        <div>
          <QHead
            q="How soon do you need placement?"
            hint="We'll prioritize based on your timeline"
          />
          <div className="flex flex-col gap-2">
            {URGENCY_OPTIONS.map((o) => (
              <Pill
                key={o.id}
                icon={o.icon}
                label={o.label}
                desc={o.desc}
                accentColor={o.color}
                selected={form.Urgency === o.id}
                onClick={() => {
                  setF("Urgency", o.id);
                  after();
                }}
              />
            ))}
          </div>
        </div>
      );

    // ── Budget ───────────────────────────────────────────────────────────────
    if (curKey === "budget") {
      const isSubstitute = form.ServiceFormat === "substitute";

      if (isSubstitute) {
        return (
          <div>
            <QHead
              q="Substitute Service Pricing"
              hint="Fixed monthly rate — no hidden charges"
            />
            <div className="flex flex-col gap-3">
              {SUBSTITUTE_BUDGETS.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => {
                    setF("Budget", b.id);
                    after();
                  }}
                  className="hw2-sub-budget-card"
                  style={{
                    background:
                      form.Budget === b.id
                        ? "linear-gradient(135deg,#EC5F36,#D84E28)"
                        : "#fff",
                    borderColor: form.Budget === b.id ? "#EC5F36" : "#E5E2DE",
                    boxShadow:
                      form.Budget === b.id
                        ? "0 8px 28px rgba(236,95,54,0.32)"
                        : "0 1px 6px rgba(0,0,0,0.05)",
                  }}
                >
                  <div className="hw2-sub-budget-inner">
                    <div className="hw2-sub-budget-left">
                      <span
                        className="hw2-sub-budget-badge"
                        style={{
                          background:
                            form.Budget === b.id
                              ? "rgba(255,255,255,0.22)"
                              : "#FFF2EE",
                          color: form.Budget === b.id ? "#fff" : "#EC5F36",
                        }}
                      >
                        {b.badge}
                      </span>
                      <span
                        className="hw2-sub-budget-label"
                        style={{
                          color: form.Budget === b.id ? "#fff" : "#1a1a2e",
                        }}
                      >
                        {b.label}
                      </span>
                      <span
                        className="hw2-sub-budget-desc"
                        style={{
                          color:
                            form.Budget === b.id
                              ? "rgba(255,255,255,0.78)"
                              : "#9ca3af",
                        }}
                      >
                        {b.desc}
                      </span>
                    </div>
                    {form.Budget === b.id && (
                      <Check size={20} strokeWidth={2.5} color="#fff" />
                    )}
                  </div>
                </button>
              ))}

              {/* Info card */}
              <div className="hw2-sub-info-card">
                <div className="hw2-sub-info-row">
                  <span className="hw2-sub-info-icon">📋</span>
                  <div>
                    <p className="hw2-sub-info-title">What's included</p>
                    <p className="hw2-sub-info-body">
                      Trained replacement staff, profile matching, and
                      coordination — all at a single flat fee of ₹5,000/month.
                    </p>
                  </div>
                </div>
                <div className="hw2-sub-info-row" style={{ marginTop: 8 }}>
                  <span className="hw2-sub-info-icon">⏱️</span>
                  <div>
                    <p className="hw2-sub-info-title">Minimum duration</p>
                    <p className="hw2-sub-info-body">
                      30 days minimum — ideal for covering extended leaves,
                      emergencies, or vacations. No upper limit on duration.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }

      return (
        <div>
          <QHead
            q="What's your monthly budget?"
            hint="We'll match staff within your budget"
          />
          <div className="flex flex-col gap-2">
            {BUDGETS.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => {
                  setF("Budget", b.id);
                  after();
                }}
                className="hw2-budget-row"
                style={{
                  background: form.Budget === b.id ? "#EC5F36" : "#fff",
                  borderColor: form.Budget === b.id ? "#EC5F36" : "#E5E2DE",
                  boxShadow:
                    form.Budget === b.id
                      ? "0 6px 18px rgba(236,95,54,0.28)"
                      : "0 1px 4px rgba(0,0,0,0.04)",
                }}
              >
                <span
                  className="hw2-budget-label"
                  style={{ color: form.Budget === b.id ? "#fff" : "#1a1a2e" }}
                >
                  {b.label}
                </span>
                <span
                  className="hw2-budget-desc"
                  style={{
                    color:
                      form.Budget === b.id ? "rgba(255,255,255,0.8)" : "#888",
                  }}
                >
                  {b.desc}
                </span>
                {form.Budget === b.id && (
                  <Check
                    size={16}
                    strokeWidth={2.5}
                    color="#fff"
                    className="ml-auto flex-shrink-0"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      );
    }

    // ── Contact ──────────────────────────────────────────────────────────────
    if (curKey === "contact") {
      const phoneOk = form.Phone.length === 10 && /^[6-9]/.test(form.Phone);
      return (
        <div>
          <QHead
            q="Almost there! 🎉"
            hint="Share your details — our team will call you within 2 hours"
          />
          <div className="grid grid-cols-2 gap-2.5 mb-3">
            <div>
              <label className="hw2-flabel">First Name *</label>
              <input
                className="hw2-finput"
                type="text"
                placeholder="Rahul"
                value={form.FirstName}
                onChange={(e) => setF("FirstName", e.target.value)}
              />
            </div>
            <div>
              <label className="hw2-flabel">Last Name</label>
              <input
                className="hw2-finput"
                type="text"
                placeholder="Sharma"
                value={form.LastName}
                onChange={(e) => setF("LastName", e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="hw2-flabel">
              Phone Number *{" "}
              <span className="text-xs font-normal text-gray-400">
                (we'll call on this)
              </span>
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
                placeholder="10-digit mobile"
                value={form.Phone}
                autoFocus
                onChange={(e) =>
                  setF("Phone", e.target.value.replace(/\D/g, "").slice(0, 10))
                }
              />
              {phoneOk && (
                <CheckCircle2
                  size={18}
                  color="#16a34a"
                  strokeWidth={2}
                  className="mr-3 flex-shrink-0"
                />
              )}
            </div>
            {form.Phone.length > 0 && form.Phone.length < 10 && (
              <p className="hw2-warn">
                {10 - form.Phone.length} more digit
                {10 - form.Phone.length !== 1 ? "s" : ""} needed
              </p>
            )}
          </div>
          <div className="mb-3">
            <label className="hw2-flabel">
              Email{" "}
              <span className="text-xs font-normal text-gray-400">
                (optional)
              </span>
            </label>
            <input
              className="hw2-finput"
              type="email"
              placeholder="rahul@example.com"
              value={form.Email}
              onChange={(e) => setF("Email", e.target.value)}
            />
          </div>
          {/* ── Address row: Street + City dropdown ── */}
          <div className="mb-3">
            <label className="hw2-flabel">Your Area / City *</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                className="hw2-finput"
                type="text"
                placeholder="Street / Area"
                value={form.Street}
                onChange={(e) => setF("Street", e.target.value)}
              />
              <CitySelect
                value={form.City}
                onChange={(city) => setF("City", city)}
                placeholder="Select city"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="hw2-flabel">
              Anything else?{" "}
              <span className="text-xs font-normal text-gray-400">
                (optional)
              </span>
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
          {/* Summary */}
          <div className="hw2-summary">
            <p className="hw2-sum-head">📋 Your Request Summary</p>
            {[
              { k: "Service", v: form.ServiceLabel },
              form.ServiceFormat && {
                k: "Format",
                v: SERVICE_FORMATS.find((f) => f.id === form.ServiceFormat)
                  ?.label,
              },
              form.HouseSize && {
                k: "Home Size",
                v: form.HouseSize.toUpperCase(),
              },
              { k: "Household", v: `${form.PeopleAtHome} people` },
              form.MealPref && { k: "Diet", v: form.MealPref },
              form.CuisinePref.length && {
                k: "Cuisine",
                v: form.CuisinePref.join(", "),
              },
              form.ChildAge && { k: "Child Age", v: form.ChildAge },
              form.PatientAge && { k: "Patient Age", v: form.PatientAge },
              form.CareNeeded.length && {
                k: "Care",
                v: form.CareNeeded.join(", "),
              },
              form.VehicleType.length && {
                k: "Vehicle",
                v: form.VehicleType.join(", "),
              },
              form.ManagerDuties.length && {
                k: "Manager Duties",
                v: form.ManagerDuties.length + " selected",
              },
              // form.ExperienceRequired && {
              //   k: "Experience",
              //   v: form.ExperienceRequired + " yrs",
              // },
              form.Budget && {
                k: "Budget",
                v: BUDGETS.find((b) => b.id === form.Budget)?.label,
              },
              form.Urgency && {
                k: "Urgency",
                v: URGENCY_OPTIONS.find((o) => o.id === form.Urgency)?.label,
              },
            ]
              .filter(Boolean)
              .map(({ k, v }) => (
                <div key={k} className="hw2-sum-row">
                  <span className="hw2-sum-key">{k}</span>
                  <span className="hw2-sum-val capitalize">{v}</span>
                </div>
              ))}
          </div>
        </div>
      );
    }

    // ── Plan ─────────────────────────────────────────────────────────────────
    if (curKey === "plan")
      return (
        <div>
          <QHead
            q="How do you want to proceed?"
            hint="Choose a plan that works for you — both include a 15-day free look period"
          />
          <div className="flex flex-col gap-3">
            {Object.values(PLANS).map((plan) => {
              const isSelected = form.PlanType === plan.id;
              const total = plan.amount + plan.gst;
              return (
                <div
                  key={plan.id}
                  className="hw2-plan-card"
                  style={{
                    borderColor: isSelected ? plan.color : "#E5E2DE",
                    background: isSelected ? plan.bgColor : "#fff",
                    boxShadow: isSelected
                      ? `0 6px 24px ${plan.color}22`
                      : "0 1px 6px rgba(0,0,0,0.04)",
                  }}
                  onClick={() => setF("PlanType", isSelected ? "" : plan.id)}
                >
                  {isSelected && (
                    <div
                      className="hw2-plan-selected-badge"
                      style={{ background: plan.badgeBg }}
                    >
                      <Check size={10} strokeWidth={3} color="#fff" /> Selected
                    </div>
                  )}
                  <div className="hw2-plan-header">
                    <div>
                      <div
                        className="hw2-plan-badge"
                        style={{ background: plan.badgeBg }}
                      >
                        <span>{plan.emoji}</span>
                        <span>{plan.name}</span>
                      </div>
                      <p className="hw2-plan-subtitle">{plan.subtitle}</p>
                    </div>
                    <div className="hw2-plan-price-block">
                      <span
                        className="hw2-plan-amount"
                        style={{ color: plan.color }}
                      >
                        ₹{plan.amount.toLocaleString()}
                      </span>
                      <span className="hw2-plan-gst">+ GST ₹{plan.gst}</span>
                      <span
                        className="hw2-plan-total-inline"
                        style={{
                          color: plan.color,
                          borderColor: plan.borderColor,
                          background: isSelected
                            ? "rgba(255,255,255,0.6)"
                            : plan.bgColor,
                        }}
                      >
                        ₹{total.toLocaleString()} total
                      </span>
                    </div>
                  </div>
                  <ul className="hw2-plan-perks">
                    {plan.inclusions.map((item, i) => (
                      <li key={i}>
                        <Check
                          size={12}
                          color={plan.color}
                          strokeWidth={2.5}
                          style={{ flexShrink: 0, marginTop: 1 }}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  {plan.bonus && (
                    <div
                      className="hw2-plan-bonus"
                      style={{
                        color: plan.color,
                        borderColor: plan.borderColor,
                        background: isSelected
                          ? "rgba(255,255,255,0.55)"
                          : plan.bgColor,
                      }}
                    >
                      🎁 <strong>Bonus:</strong> {plan.bonus}
                    </div>
                  )}
                  <div className="hw2-plan-meta-row">
                    <div className="hw2-plan-meta-item">
                      <Clock size={11} color={plan.color} strokeWidth={2} />
                      <span
                        style={{ color: isSelected ? plan.color : "#6b7280" }}
                      >
                        {plan.timeline}
                      </span>
                    </div>
                    <div className="hw2-plan-meta-item">
                      <CreditCard
                        size={11}
                        color={plan.color}
                        strokeWidth={2}
                      />
                      <span
                        style={{ color: isSelected ? plan.color : "#6b7280" }}
                      >
                        {plan.paymentNote}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {!form.PlanType && (
            <p className="hw2-warn mt-3 text-center">
              Please select a plan to continue
            </p>
          )}
          {form.PlanType === "pbt" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="hw2-pbt-note mt-3"
            >
              <p>
                ✅ <strong>No payment needed now.</strong> We'll shortlist
                candidates and share profiles within{" "}
                <strong>3–5 working days</strong>. Payment of ₹
                {(PLANS.pbt.amount + PLANS.pbt.gst).toLocaleString()} is
                collected only before the maid's trial begins.
              </p>
              <p style={{ marginTop: 6 }}>
                📞 You'll receive a call on{" "}
                <strong>+91 {form.Phone || "your number"}</strong> to confirm
                shortlisting.
              </p>
            </motion.div>
          )}
        </div>
      );

    // ── Payment ──────────────────────────────────────────────────────────────
    if (curKey === "payment") {
      const total = PLANS.priority.amount + PLANS.priority.gst;
      return (
        <div>
          <div className="hw2-pay-page-header">
            <div className="hw2-pay-amount-badge">
              <Wallet size={16} color="#EC5F36" strokeWidth={2} />
              <span>₹{total.toLocaleString()}</span>
              <span className="hw2-pay-gst-small">incl. 18% GST</span>
            </div>
            <p className="hw2-pay-page-title">Complete Your Payment</p>
            <p className="hw2-pay-page-sub">
              Pay using UPI or bank transfer — upload your screenshot to speed
              up verification (optional)
            </p>
          </div>

          <div className="hw2-pay-methods">
            {/* UPI */}
            <div className="hw2-pay-method-card">
              <div className="hw2-pay-method-head">
                <Smartphone size={14} color="#EC5F36" strokeWidth={2} />
                <span>Pay via UPI</span>
              </div>
              <div className="hw2-pay-qr-row">
                <div className="hw2-pay-qr-box">
                  <img
                    src="https://res.cloudinary.com/dhtzknkdr/image/upload/v1773031910/qrCode_btlxci.jpg"
                    alt="QR Code"
                    width={90}
                    height={90}
                  />
                  <p className="hw2-pay-qr-hint">Scan with any UPI app</p>
                </div>
                <div className="hw2-pay-upi-details">
                  <p className="hw2-pay-upi-label">UPI ID</p>
                  <div className="hw2-pay-upi-row">
                    <span className="hw2-pay-upi-id">{PAYMENT_INFO.upiId}</span>
                    <button
                      type="button"
                      className="hw2-copy-btn"
                      onClick={() => copyToClipboard(PAYMENT_INFO.upiId, "upi")}
                    >
                      {copied === "upi" ? (
                        <CheckCircle2 size={12} color="#16a34a" />
                      ) : (
                        <Copy size={12} color="#9ca3af" />
                      )}
                    </button>
                  </div>
                  <p className="hw2-pay-upi-apps">
                    Works with PhonePe, GPay, Paytm, BHIM &amp; any UPI app
                  </p>
                  <div className="hw2-pay-amount-chip">
                    Pay exactly <strong>₹{total.toLocaleString()}</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="hw2-pay-or">
              <span>or pay via</span>
            </div>

            {/* Bank transfer */}
            <div className="hw2-pay-method-card">
              <div className="hw2-pay-method-head">
                <Building2 size={14} color="#3B82F6" strokeWidth={2} />
                <span>Bank Transfer / NEFT / IMPS</span>
              </div>
              <div className="hw2-bank-grid">
                {[
                  {
                    label: "Account Name",
                    value: PAYMENT_INFO.accountName,
                    key: "name",
                  },
                  {
                    label: "Account Number",
                    value: PAYMENT_INFO.accountNumber,
                    key: "acc",
                  },
                  { label: "IFSC Code", value: PAYMENT_INFO.ifsc, key: "ifsc" },
                  {
                    label: "Bank & Branch",
                    value: `${PAYMENT_INFO.bankName}, ${PAYMENT_INFO.branch}`,
                    key: "bank",
                  },
                ].map((row) => (
                  <div key={row.key} className="hw2-bank-item">
                    <span className="hw2-bank-item-label">{row.label}</span>
                    <div className="hw2-bank-item-row">
                      <span className="hw2-bank-item-val">{row.value}</span>
                      <button
                        type="button"
                        className="hw2-copy-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(row.value, row.key);
                        }}
                      >
                        {copied === row.key ? (
                          <CheckCircle2 size={11} color="#16a34a" />
                        ) : (
                          <Copy size={11} color="#9ca3af" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="hw2-bank-amount-tag">
                Transfer amount: <strong>₹{total.toLocaleString()}</strong>{" "}
                <span>(incl. 18% GST)</span>
              </div>
            </div>
          </div>

          {/* Screenshot upload */}
          <div className="hw2-screenshot-section">
            <p className="hw2-screenshot-title">
              <Upload size={14} color="#EC5F36" strokeWidth={2} />
              Upload Payment Screenshot
            </p>
            <p className="hw2-screenshot-sub">
              Upload your payment confirmation screenshot to speed up
              verification — <em>optional but recommended</em>
            </p>
            <div
              className="hw2-dropzone"
              style={{
                borderColor: dragOver
                  ? "#EC5F36"
                  : screenshotPreview
                    ? "#16a34a"
                    : "#E5E2DE",
                background: dragOver
                  ? "#FFF7F4"
                  : screenshotPreview
                    ? "#F0FDF4"
                    : "#FAFAFA",
              }}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                const f = e.dataTransfer.files[0];
                if (f) handleFileSelect(f);
              }}
              onClick={() =>
                !screenshotPreview && fileInputRef.current?.click()
              }
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => handleFileSelect(e.target.files[0])}
              />
              {screenshotPreview ? (
                <div className="hw2-preview-wrap">
                  <img
                    src={screenshotPreview}
                    alt="Payment screenshot preview"
                    className="hw2-preview-img"
                  />
                  <div className="hw2-preview-actions">
                    <button
                      type="button"
                      className="hw2-preview-change"
                      onClick={(e) => {
                        e.stopPropagation();
                        setScreenshotFile(null);
                        setScreenshotPreview(null);
                        setScreenshotUrl("");
                      }}
                    >
                      Change
                    </button>
                    {!screenshotUrl && (
                      <button
                        type="button"
                        className="hw2-upload-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUploadScreenshot();
                        }}
                        disabled={screenshotUploading}
                      >
                        {screenshotUploading ? (
                          <>
                            <span className="hw2-spin" /> Uploading…
                          </>
                        ) : (
                          <>
                            <Upload size={12} strokeWidth={2.5} /> Confirm
                            Upload
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="hw2-dropzone-idle">
                  <div className="hw2-dropzone-ico">
                    <ImageIcon size={22} color="#EC5F36" strokeWidth={1.5} />
                  </div>
                  <p className="hw2-dropzone-main">
                    Tap to select or drag &amp; drop
                  </p>
                  <p className="hw2-dropzone-hint">
                    PNG, JPG, WEBP — max 10 MB
                  </p>
                </div>
              )}
            </div>
            {screenshotUrl && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="hw2-upload-success"
              >
                <CheckCircle size={14} color="#16a34a" strokeWidth={2} />
                <span>
                  Screenshot uploaded! Click{" "}
                  <strong>Submit with Screenshot</strong> below to confirm.
                </span>
              </motion.div>
            )}
            {!screenshotUrl && (
              <p className="hw2-skip-hint">
                🔖 No screenshot yet? You can still submit — our team will
                contact you to verify payment manually.
              </p>
            )}
          </div>
          <div className="hw2-pay-whatsapp-note">
            💬 Alternatively, WhatsApp your payment screenshot to{" "}
            <strong>+91 {PAYMENT_INFO.whatsapp}</strong> with your registered
            phone number.
          </div>
        </div>
      );
    }

    // ── Done ─────────────────────────────────────────────────────────────────
    if (curKey === "done") {
      const isPriority = form.PlanType === "priority";
      const hasScreenshot = !!screenshotUrl;
      return (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 16 }}
            className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
            style={{
              background: isPriority
                ? "linear-gradient(135deg,#EC5F36,#D84E28)"
                : "linear-gradient(135deg,#3B82F6,#2563EB)",
              boxShadow: isPriority
                ? "0 10px 36px rgba(236,95,54,.40)"
                : "0 10px 36px rgba(59,130,246,.40)",
            }}
          >
            <Check size={36} color="#fff" strokeWidth={3} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <h3 className="hw2-display text-xl font-bold text-gray-900 mb-2">
              {isPriority
                ? hasScreenshot
                  ? "Request Submitted! 🚀"
                  : "Request Received! 🎉"
                : "Request Confirmed! 🎉"}
            </h3>
            <p className="text-sm text-gray-500 max-w-[280px] mx-auto leading-relaxed mb-1">
              {isPriority
                ? hasScreenshot
                  ? "Screenshot received — we'll verify your payment and start priority shortlisting. Expect a call within 2 hours on"
                  : "Our team will call you to confirm payment, then start priority shortlisting within 24 hours. We'll reach you on"
                : "Our team will shortlist candidates and reach out within 3–4 working days on"}
            </p>
            <p className="font-bold text-gray-900 text-base mb-1">
              +91 {form.Phone}
            </p>
            {form.Email && (
              <p className="text-xs text-gray-400 mb-3">
                Confirmation sent to {form.Email}
              </p>
            )}
            <div
              className="hw2-done-plan-badge"
              style={{
                background: isPriority ? "#FFF2EE" : "#EFF6FF",
                color: isPriority ? "#EC5F36" : "#3B82F6",
                borderColor: isPriority ? "#F5D8CF" : "#BFDBFE",
              }}
            >
              {isPriority ? (
                <>
                  <Bolt size={13} strokeWidth={2.5} /> Priority Plan —{" "}
                  {hasScreenshot ? "Under Verification" : "Awaiting Payment"}
                </>
              ) : (
                <>
                  <Timer size={13} strokeWidth={2.5} /> Pay Before Profile
                  Sharing
                </>
              )}
            </div>
            <button
              className="hw2-btn mx-auto mt-5"
              style={{
                background: isPriority
                  ? "linear-gradient(135deg,#EC5F36,#D84E28)"
                  : "linear-gradient(135deg,#3B82F6,#2563EB)",
              }}
              onClick={resetWizard}
            >
              <Sparkles size={14} /> Submit Another Request
            </button>
          </motion.div>
        </div>
      );
    }

    return null;
  };

  // ══════════════════════════════════════════════════════════════════════════
  // PROGRESS BAR
  // ══════════════════════════════════════════════════════════════════════════
  const renderProgress = () => {
    if (isDone || curKey === "payment") return null;
    return (
      <div className="mb-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="hw2-display text-lg font-bold text-gray-900 leading-tight">
            Hire Trusted Help
          </h2>
          {form.ServiceType && (
            <span className="hw2-svc-badge">
              {SERVICES.find((s) => s.id === form.ServiceType)?.emoji}{" "}
              {SERVICES.find((s) => s.id === form.ServiceType)?.label}
            </span>
          )}
        </div>
        <div className="relative">
          <div
            className="absolute h-0.5 bg-gray-100"
            style={{
              top: 14,
              left: `calc(${100 / (2 * progKeys.length)}%)`,
              right: `calc(${100 / (2 * progKeys.length)}%)`,
              zIndex: 0,
            }}
          >
            <motion.div
              className="h-full origin-left"
              style={{ background: "linear-gradient(90deg,#EC5F36,#D84E28)" }}
              animate={{ width: `${progPct}%` }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </div>
          <div className="relative flex justify-between" style={{ zIndex: 1 }}>
            {progKeys.map((key, i) => {
              const meta = PROG_META[key] ?? { label: key, icon: Briefcase };
              const Icon = meta.icon;
              const done = progIdx > i;
              const active = progIdx === i;
              return (
                <div
                  key={`${key}-${i}`}
                  className="flex flex-col items-center gap-1 flex-1 min-w-0"
                >
                  <motion.div
                    animate={{ scale: active ? 1.15 : 1 }}
                    transition={{ duration: 0.2 }}
                    className="w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{
                      background: done
                        ? "#EC5F36"
                        : active
                          ? "#FFF2EE"
                          : "#fff",
                      borderColor: done || active ? "#EC5F36" : "#E5E2DE",
                      boxShadow: active
                        ? "0 0 0 4px rgba(236,95,54,0.15)"
                        : "none",
                    }}
                  >
                    {done ? (
                      <Check size={11} color="#fff" strokeWidth={3} />
                    ) : (
                      <Icon
                        size={12}
                        color={active ? "#EC5F36" : "#ccc"}
                        strokeWidth={1.8}
                      />
                    )}
                  </motion.div>
                  <span
                    className="text-[8.5px] font-semibold truncate max-w-[40px] text-center"
                    style={{
                      color: active ? "#EC5F36" : done ? "#EC5F36" : "#bbb",
                    }}
                  >
                    {meta.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // ══════════════════════════════════════════════════════════════════════════
  // FOOTER
  // ══════════════════════════════════════════════════════════════════════════
  const renderFooter = () => {
    if (isDone) return null;
    const showBack = stepIdx > 0 && curKey !== "payment";
    const isContact = curKey === "contact";
    const isPlan = curKey === "plan";
    const isPayment = curKey === "payment";
    if (!showBack && !showContinue) return null;

    const busy = planSubmitting || paymentSubmitting || screenshotUploading;

    return (
      <div
        className="pt-3 flex justify-between items-center"
        style={{ borderTop: "1.5px solid #F0EBE8", marginTop: "auto" }}
      >
        {showBack ? (
          <button type="button" className="hw2-back" onClick={goBack}>
            <ArrowLeft size={14} strokeWidth={2.5} /> Back
          </button>
        ) : (
          <div />
        )}

        {showContinue && (
          <button
            type="button"
            className="hw2-btn"
            disabled={!isValid() || busy}
            onClick={
              isContact
                ? goNext
                : isPlan
                  ? () => handlePlanSubmit(form.PlanType)
                  : isPayment
                    ? handlePaymentSubmit
                    : goNext
            }
          >
            {busy ? (
              <>
                <span className="hw2-spin" />{" "}
                {isPlan
                  ? "Processing…"
                  : isPayment
                    ? "Submitting…"
                    : "Please wait…"}
              </>
            ) : isContact ? (
              <>
                Next{" "}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </>
            ) : isPlan ? (
              form.PlanType === "priority" ? (
                <>
                  <Bolt size={14} strokeWidth={2.5} /> Continue to Payment
                </>
              ) : form.PlanType === "pbt" ? (
                <>
                  <Check size={14} strokeWidth={2.5} /> Confirm &amp; Submit
                </>
              ) : (
                <>Select a Plan</>
              )
            ) : isPayment ? (
              screenshotUrl ? (
                <>
                  <Send size={14} strokeWidth={2.5} /> Submit with Screenshot
                </>
              ) : (
                <>
                  <Send size={14} strokeWidth={2.5} /> Submit &amp; Confirm
                  Later
                </>
              )
            ) : (
              <>
                Continue{" "}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </>
            )}
          </button>
        )}
      </div>
    );
  };

  // ══════════════════════════════════════════════════════════════════════════
  // PAYMENT STEP HEADER
  // ══════════════════════════════════════════════════════════════════════════
  const renderPaymentHeader = () => {
    if (curKey !== "payment") return null;
    return (
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="hw2-display text-lg font-bold text-gray-900">
            Secure Payment
          </h2>
          <p className="text-xs text-gray-400 font-medium mt-0.5">
            Priority Plan — Final Step
          </p>
        </div>
        <div className="hw2-payment-step-badge">
          <Bolt size={11} color="#EC5F36" strokeWidth={2.5} />
          Priority Active
        </div>
      </div>
    );
  };
  const Shell = (
    <>
      <div
        className="hw2-root flex flex-col bg-white rounded-3xl p-5 sm:p-6 w-full max-w-xl"
        style={{ height: "35rem" }}
      >
        {renderProgress()}
        {renderPaymentHeader()}
        <div
          ref={bodyRef}
          className="hw2-body overflow-y-auto"
          style={{ flex: 1 }}
        >
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={`${form.ServiceType || "svc"}-${stepIdx}`}
              custom={dir}
              variants={{
                enter: (d) => ({ opacity: 0, x: d > 0 ? 30 : -30 }),
                center: { opacity: 1, x: 0 },
                exit: (d) => ({ opacity: 0, x: d > 0 ? -30 : 30 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
        {renderFooter()}
      </div>
    </>
  );

  if (asModal) {
    if (!isOpen) return null;
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            resetWizard();
            onClose?.();
          }
        }}
      >
        <motion.div
          className="relative w-full max-w-xl"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.22 }}
        >
          {onClose && (
            <button
              type="button"
              aria-label="Close"
              onClick={() => {
                resetWizard();
                onClose?.();
              }}
              className="absolute -top-3 -right-3 bg-white shadow-md rounded-full w-9 h-9 flex items-center justify-center hover:bg-gray-50 transition"
              style={{ border: "1.5px solid #F0EBE8" }}
            >
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
