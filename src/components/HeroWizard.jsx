import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import babyCareImg from "../assets/services/baby-caretaker.png";
import cookImg from "../assets/services/cook.png";
import houseHelpImg from "../assets/services/househelp.png";
import patientCareImg from "../assets/services/patient-care.png";
import driverImg from "../assets/services/driver.png";
import multipleServicesImg from "../assets/services/multiple-services.png";
import housemanager from "../assets/services/house-manager.png";
import qrCode from "../assets/qrCode.jpeg";

// househelp images
import bathroom from "../assets/services/househelp/bathroom.png";
import cleaning from "../assets/services/househelp/cleaning.png";
import dusting from "../assets/services/househelp/dusting.png";
import groceries from "../assets/services/househelp/grocery.png";
import laundry from "../assets/services/househelp/laundry.png";
import utensils from "../assets/services/househelp/utensils.png";
import oneBHK from "../assets/services/househelp/1BHK.png";
import twoBHK from "../assets/services/househelp/2BHK.png";
import threeBHK from "../assets/services/househelp/3BHK.png";
import fourBHK from "../assets/services/househelp/4BHK.png";
import villa from "../assets/services/househelp/villa.png";
import pets from "../assets/services/househelp/pets.png";
import no_pets from "../assets/services/househelp/no-pets.png";

// cook
import veg from "../assets/services/cook/veg.png";
import nonveg from "../assets/services/cook/non-veg.png";
import all_meals from "../assets/services/cook/all-meals.png";
import breakfast from "../assets/services/cook/breakfast.png";
import dinner from "../assets/services/cook/dinner.png";
import lunch from "../assets/services/cook/lunch.png";
import fullCook from "../assets/services/cook/full-cook.png";
import northindian from "../assets/services/cook/north-indian.png";
import southindian from "../assets/services/cook/south-indian.png";
import chinese from "../assets/services/cook/chinese.png";
import diet from "../assets/services/cook/diet.png";
import continental from "../assets/services/cook/continental.png";

// baby care
import feeding from "../assets/services/babysitter/feeding.png";
import bathing from "../assets/services/babysitter/bathing.png";
import homework from "../assets/services/babysitter/homework.png";
import playtime from "../assets/services/babysitter/playtime.png";
import sleeping from "../assets/services/babysitter/sleeping.png";

// Patient Care
import basic from "../assets/services/patient-care/caregiver.png";
import hygiene from "../assets/services/patient-care/hygiene.png";
import medicine from "../assets/services/patient-care/medicine.png";
import full_help from "../assets/services/patient-care/full-help.png";
import mobility from "../assets/services/patient-care/support.png";

// driver
import manual from "../assets/services/driver/manual.png";
import automatic from "../assets/services/driver/automatic.png";
import suv from "../assets/services/driver/suv.png";
import sedan from "../assets/services/driver/sedan.png";

// housemanager
import oversees from "../assets/services/housemanager/oversees.png";
import vendor from "../assets/services/housemanager/vendor.png";
import guest from "../assets/services/housemanager/guest.png";
import cookingOversight from "../assets/services/housemanager/cookingOversight.png";
import householdPurchase from "../assets/services/housemanager/householdPurchases.png";
import maintenance from "../assets/services/housemanager/maintenence.png";
import grocery from "../assets/services/housemanager/grocery.png";
import apartment from "../assets/services/housemanager/apartment.png";
import individual from "../assets/services/housemanager/individual.png";
import villa1 from "../assets/services/housemanager/villa.png";

// gender
import maleImg from "../assets/male.png";
import femaleImg from "../assets/female.png";

import other from "../assets/services/other.png";

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

const API_BASE = "http://localhost:5000";
const CLOUDINARY_CLOUD_NAME = "dto7bji6b";
const CLOUDINARY_UPLOAD_PRESET = "payment_screenshots";

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
    image: houseHelpImg,
    color: "#4F9EF8",
    emoji: "🏠",
    desc: "Daily cleaning & chores",
  },
  {
    id: "cook",
    label: "Cook",
    image: cookImg,
    color: "#F87C4F",
    emoji: "👨‍🍳",
    desc: "Meals & kitchen care",
  },
  {
    id: "babysitter",
    label: "Babysitter",
    image: babyCareImg,
    color: "#A78BFA",
    emoji: "👶",
    desc: "Child care & safety",
  },
  {
    id: "elderlycare",
    label: "Elderly Care",
    image: patientCareImg,
    color: "#F87FAC",
    emoji: "🧓",
    desc: "Senior care & support",
  },
  {
    id: "driver",
    label: "Driver",
    image: driverImg,
    color: "#34D399",
    emoji: "🚗",
    desc: "Reliable transport",
  },
  {
    id: "housemanager",
    label: "House Manager",
    image: housemanager,
    color: "#FBBF24",
    emoji: "📋",
    desc: "Full household mgmt",
  },
  {
    id: "multiple",
    label: "Multiple Services",
    image: multipleServicesImg,
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
    id: "liveout",
    label: "Live-Out",
    desc: "Arrives daily for a set number of hours. Goes home in the evening.",
    icon: Clock,
  },
  {
    id: "substitute",
    label: "Substitute",
    desc: "Short-term replacement cover for your existing staff member.",
    icon: Users,
  },
];

const GENDER_OPTIONS_DATA = [
  { id: "male", label: "Male", image: maleImg },
  { id: "female", label: "Female", image: femaleImg },
];

const TASKS = [
  { id: "cleaning", label: "Cleaning", icon: Brush, image: cleaning },
  { id: "utensils", label: "Utensils", icon: UtensilsCrossed, image: utensils },
  { id: "laundry", label: "Laundry", icon: Shirt, image: laundry },
  { id: "dusting", label: "Dusting", icon: Wind, image: dusting },
  { id: "bathroom", label: "Bathroom", icon: Droplets, image: bathroom },
  { id: "groceries", label: "Groceries", icon: ShoppingCart, image: groceries },
  { id: "other", label: "Other", icon: MoreHorizontal, image: other },
];

const HOUSE_SIZES = [
  {
    id: "1bhk",
    label: "1 BHK",
    icon: HomeIcon,
    desc: "~400–600 sq ft",
    image: oneBHK,
  },
  {
    id: "2bhk",
    label: "2 BHK",
    icon: HomeIcon,
    desc: "~700–1000 sq ft",
    image: twoBHK,
  },
  {
    id: "3bhk",
    label: "3 BHK",
    icon: HomeIcon,
    desc: "~1100–1500 sq ft",
    image: threeBHK,
  },
  {
    id: "4bhk",
    label: "4 BHK",
    icon: HomeIcon,
    desc: "~1600–2500 sq ft",
    image: fourBHK,
  },
  {
    id: "villa",
    label: "Villa",
    icon: TreePine,
    desc: "2500+ sq ft",
    image: villa,
  },
];

const MEAL_PREFS = [
  { id: "veg", label: "Veg", emoji: "🥦", image: veg },
  { id: "nonveg", label: "Non-Veg", emoji: "🍗", image: nonveg },
  { id: "both", label: "Both", emoji: "🍱", image: fullCook },
];

const MEALS_NEEDED = [
  {
    id: "breakfast",
    label: "Breakfast",
    emoji: "☕",
    icon: Coffee,
    image: breakfast,
  },
  { id: "lunch", label: "Lunch", emoji: "🍛", icon: Utensils, image: lunch },
  { id: "dinner", label: "Dinner", emoji: "🌙", icon: Utensils, image: dinner },
  {
    id: "all",
    label: "All Meals",
    emoji: "🍽️",
    icon: Utensils,
    image: all_meals,
  },
];

const CUISINES = [
  { id: "northindian", label: "North Indian", emoji: "🫓", image: northindian },
  { id: "southindian", label: "South Indian", emoji: "🥘", image: southindian },
  { id: "chinese", label: "Chinese", emoji: "🍜", image: chinese },
  { id: "continental", label: "Continental", emoji: "🍝", image: continental },
  { id: "diet", label: "Diet Food", emoji: "🥗", image: diet },
  { id: "other", label: "Other", emoji: "🍴", image: other },
];

const CHILD_DUTIES = [
  { id: "feeding", label: "Feeding", emoji: "🍼", image: feeding },
  { id: "bathing", label: "Bathing", emoji: "🛁", image: bathing },
  { id: "homework", label: "Homework", emoji: "📚", image: homework },
  { id: "playtime", label: "Playtime", emoji: "🎮", image: playtime },
  { id: "sleep", label: "Putting to Sleep", emoji: "😴", image: sleeping },
  { id: "other", label: "Other", emoji: "➕", image: other },
];

const CARE_NEEDED = [
  { id: "basic", label: "Basic Support", icon: HandHeart, image: basic },
  {
    id: "hygiene",
    label: "Personal Hygiene",
    icon: ShieldCheck,
    image: hygiene,
  },
  {
    id: "mobility",
    label: "Mobility Support",
    icon: PersonStanding,
    image: mobility,
  },
  {
    id: "medicine",
    label: "Medicine Reminders",
    icon: Stethoscope,
    image: medicine,
  },
  { id: "full", label: "Full Care", icon: Activity, image: full_help },
];

const VEHICLE_TYPES = [
  { id: "manual", label: "Manual", emoji: "🚗", image: manual },
  { id: "automatic", label: "Automatic", emoji: "🚙", image: automatic },
  { id: "suv", label: "SUV", emoji: "🚐", image: suv },
  { id: "sedan", label: "Sedan", emoji: "🏎️", image: sedan },
];

const EXPERIENCE_LEVELS = [
  { id: "1-3", label: "1–3 years", desc: "Good for standard tasks", star: 1 },
  { id: "3-5", label: "3–5 years", desc: "Experienced professional", star: 2 },
  { id: "5+", label: "5+ years", desc: "Expert & highly trained", star: 3 },
];

const MANAGER_DUTIES = [
  { id: "help", label: "Oversee help", emoji: "👥", image: oversees },
  {
    id: "purchase",
    label: "Household Purchases",
    emoji: "🛒",
    image: householdPurchase,
  },
  {
    id: "grocery",
    label: "Groceries & Inventory",
    emoji: "📦",
    image: grocery,
  },
  {
    id: "maintain",
    label: "Supervise Maintenance",
    emoji: "🔧",
    image: maintenance,
  },
  { id: "guests", label: "Guest Management", emoji: "🤝", image: guest },
  {
    id: "cooking",
    label: "Cooking Oversight",
    emoji: "👨‍🍳",
    image: cookingOversight,
  },
  { id: "vendor", label: "Vendor Coordination", emoji: "📋", image: vendor },
];

const HOME_TYPES = [
  {
    id: "apartment",
    label: "Apartment",
    emoji: "🏢",
    desc: "Flat / unit in building",
    image: apartment,
  },
  {
    id: "independent",
    label: "Independent House",
    emoji: "🏡",
    desc: "Standalone bungalow",
    image: individual,
  },
  {
    id: "villa",
    label: "Villa",
    emoji: "🏘️",
    desc: "Gated community villa",
    image: villa1,
  },
];

const MULTI_SERVICES = [
  { id: "househelp", label: "House Help", emoji: "🏠", image: houseHelpImg },
  { id: "cook", label: "Cook", emoji: "👨‍🍳", image: cookImg },
  { id: "babysitter", label: "Babysitter", emoji: "👶", image: babyCareImg },
  {
    id: "elderlycare",
    label: "Elderly Care",
    emoji: "🧓",
    image: patientCareImg,
  },
  { id: "driver", label: "Driver", emoji: "🚗", image: driverImg },
  {
    id: "housemanager",
    label: "House Manager",
    emoji: "📋",
    image: housemanager,
  },
];

const BUDGETS = [
  { id: "5-10k", label: "₹5k – ₹10k" },
  { id: "10-15k", label: "₹10k – ₹15k" },
  { id: "15-20k", label: "₹15k – ₹20k" },
  { id: "20-30k", label: "₹20k – ₹30k" },
  { id: "30k+", label: "₹30k+" },
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
    id: "pbt",
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
    "experience",
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
    "experience",
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
    "experience",
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
    "experience",
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
    "experience",
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
    "experience",
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
  experience: { label: "Exp", icon: Star },
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
  ExperienceRequired: "",
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
      case "experience":
        return !!form.ExperienceRequired;
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
    "experience",
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
      PaymentStatus: "Not Required",
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
            {SERVICE_FORMATS.map((opt) => (
              <Pill
                key={opt.id}
                icon={opt.icon}
                label={opt.label}
                desc={opt.desc}
                selected={form.ServiceFormat === opt.id}
                onClick={() => {
                  setF("ServiceFormat", opt.id);
                  after();
                }}
              />
            ))}
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
              { id: "yes", label: "Yes, we have pets", image: pets },
              { id: "no", label: "No pets", image: no_pets },
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
    if (curKey === "experience")
      return (
        <div>
          <QHead
            q="Experience level required?"
            hint="More experience means higher monthly cost"
          />
          <div className="flex flex-col gap-2">
            {EXPERIENCE_LEVELS.map((e) => (
              <button
                key={e.id}
                type="button"
                onClick={() => {
                  setF("ExperienceRequired", e.id);
                  after();
                }}
                className="hw2-exp-card"
                style={{
                  background:
                    form.ExperienceRequired === e.id ? "#EC5F36" : "#fff",
                  borderColor:
                    form.ExperienceRequired === e.id ? "#EC5F36" : "#E5E2DE",
                  boxShadow:
                    form.ExperienceRequired === e.id
                      ? "0 6px 20px rgba(236,95,54,0.28)"
                      : "0 1px 4px rgba(0,0,0,0.04)",
                }}
              >
                <div className="flex flex-col flex-1">
                  <span
                    className="hw2-exp-label"
                    style={{
                      color:
                        form.ExperienceRequired === e.id ? "#fff" : "#1a1a2e",
                    }}
                  >
                    {e.label}
                  </span>
                  <span
                    className="hw2-exp-desc"
                    style={{
                      color:
                        form.ExperienceRequired === e.id
                          ? "rgba(255,255,255,0.8)"
                          : "#888",
                    }}
                  >
                    {e.desc}
                  </span>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      strokeWidth={1.5}
                      fill={
                        i < e.star
                          ? form.ExperienceRequired === e.id
                            ? "#fff"
                            : "#EC5F36"
                          : "none"
                      }
                      color={
                        i < e.star
                          ? form.ExperienceRequired === e.id
                            ? "#fff"
                            : "#EC5F36"
                          : "#ccc"
                      }
                    />
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>
      );

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
    if (curKey === "budget")
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
              form.ExperienceRequired && {
                k: "Experience",
                v: form.ExperienceRequired + " yrs",
              },
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
                  <img src={qrCode} alt="QR Code" width={90} height={90} />
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
