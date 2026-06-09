// Cook Tasks
import breakfast from "../assets/breakfast.jpeg";
import lunch from "../assets/lunch.jpeg";
import dinner from "../assets/dinner.jpeg";
import cleanUtensils from "../assets/clean-utensils.jpeg";
import kitchenHygiene from "../assets/kitchen-hygiene.jpeg";

// Baby Caretaker (0–3 years)
import babyBath from "../assets/baby-bath.png";
import diaperChanging from "../assets/diaper-changing.png";
import sterilizingBottles from "../assets/sterilizing-bottles.png";
import hygieneSupport from "../assets/hygiene-support.png";
import healthMonitoring from "../assets/health-monitering.png";
import massage from "../assets/message.png";
import childStimulation from "../assets/child-stimulation.jpeg";

// Baby Caretaker (3+ years)
import toddlerFeeding from "../assets/toddler-feeding.png";
import schoolReadiness from "../assets/school-readiness.png";
import childSafety from "../assets/child-safety.jpeg";
import childSupervision from "../assets/child-supervision.jpeg";
import routineManagement from "../assets/routine-management.jpeg";

// Driver Tasks
import dailyDrive from "../assets/daily-drive.jpeg";
import tenHourDriver from "../assets/10-hour-driver.jpeg";
import twelveHourDriver from "../assets/12-hour-driver.jpeg";
import flexibleHourDriver from "../assets/fexible-hour-driver.jpeg";
import vehicleCleaning from "../assets/vehicle-cleaning.jpeg";
import vehicleUpkeep from "../assets/vehicle-upkeep.jpeg";
import safeAndTimelyTravel from "../assets/safe-and-timely-travel.jpeg";

import mopping from "../assets/mopping.png";

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
import diperChange from "../assets/diaper-changing.png";

const CDN = "https://res.cloudinary.com/dhtzknkdr/image/upload";

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
  { id: "Male", label: "Male", image: `${CDN}/v1773031904/male_wubsvs.webp` },
  {
    id: "Female",
    label: "Female",
    image: `${CDN}/v1773031900/female_zo7iwn.webp`,
  },
  { id: "Any", label: "Any", image: `${CDN}/v1773031900/any_cvq417.webp` },
];

// ── LIVE-IN SUPPORT TASKS ─────────────────────────────────────────────────────
export const TASKS = [
  {
    id: "General House Cleaning",
    label: "General Cleaning",
    image: `${CDN}/v1773037121/cleaning_fszds1.webp`,
  },
  {
    id: "Dusting",
    label: "Dusting",
    image: `${CDN}/v1773037119/dusting_hw9vbr.webp`,
  },
  {
    id: "Sweeping and Mopping",
    label: "Sweep & Mop",
    // image: `${CDN}/v1773034370/other_s1pon0.webp`,
    image: mopping,
  },
  {
    id: "Washroom Cleaning",
    label: "Washroom",
    image: `${CDN}/v1773037119/bathroom_phzorr.webp`,
  },
  {
    id: "Basic Help in Kitchen",
    label: "Kitchen Help",
    image: `${CDN}/v1773037719/full-cook_yomiur.webp`,
  },
  {
    id: "Assist with Laundry",
    label: "Laundry",
    image: `${CDN}/v1773037122/laundry_qowye6.webp`,
  },
  {
    id: "Spend Time with Kids",
    label: "Kids Supervision",
    image: `${CDN}/v1773038058/playtime_udha2d.webp`,
  },
];

export const HOUSE_SIZES = [
  { id: "1BHK", label: "1 BHK", image: `${CDN}/v1773037116/1BHK_bgzp6k.webp` },
  { id: "2BHK", label: "2 BHK", image: `${CDN}/v1773037121/2BHK_sin2om.webp` },
  { id: "3BHK", label: "3 BHK", image: `${CDN}/v1773037117/3BHK_jc54bv.webp` },
  { id: "4BHK", label: "4 BHK", image: `${CDN}/v1773037118/4BHK_vnuyup.webp` },
  {
    id: "Villa",
    label: "Villa",
    image: `${CDN}/v1773037129/villa_jextfy.webp`,
  },
];

export const PETS_OPTIONS = [
  {
    id: "Yes",
    label: "Yes, we have pets",
    image: `${CDN}/v1773037128/pets_rdppq7.webp`,
  },
  {
    id: "No",
    label: "No pets",
    image: `${CDN}/v1773037125/no-pets_ih18ap.webp`,
  },
];

export const MEAL_PREFS = [
  { id: "Veg", label: "Veg", image: `${CDN}/v1773037727/veg_jz5fdj.webp` },
  {
    id: "Non-Veg",
    label: "Non-Veg",
    image: `${CDN}/v1773037724/non-veg_e3ji5g.webp`,
  },
  {
    id: "Both",
    label: "Both",
    image: `${CDN}/v1773037719/full-cook_yomiur.webp`,
  },
];

export const CUISINES = [
  {
    id: "North Indian",
    label: "North Indian",
    image: `${CDN}/v1773037726/north-indian_uxc5tl.webp`,
  },
  {
    id: "South Indian",
    label: "South Indian",
    image: `${CDN}/v1773037726/south-indian_udys5o.webp`,
  },
  {
    id: "Chinese",
    label: "Chinese",
    image: `${CDN}/v1773037716/chinese_dmrbhy.webp`,
  },
  {
    id: "Continental",
    label: "Continental",
    image: `${CDN}/v1773037716/continental_wboery.webp`,
  },
  {
    id: "Diet Food",
    label: "Diet Food",
    image: `${CDN}/v1773037715/diet_pxaiek.webp`,
  },
  {
    id: "Other",
    label: "Other",
    image: `${CDN}/v1773034370/other_s1pon0.webp`,
  },
];

// ── COOK TASKS ─────────────────────────────────────────────────────────────────
export const COOK_TASKS = [
  {
    id: "Prepare Breakfast",
    label: "Breakfast",
    // image: `${CDN}/v1773037719/full-cook_yomiur.webp`,
    image: breakfast,
  },
  {
    id: "Prepare Lunch",
    label: "Lunch",
    // image: `${CDN}/v1773037726/north-indian_uxc5tl.webp`,
    image: lunch,
  },
  {
    id: "Prepare Dinner",
    label: "Dinner",
    // image: `${CDN}/v1773037724/non-veg_e3ji5g.webp`,
    image: dinner,
  },
  {
    id: "Clean Utensils",
    label: "Clean Utensils",
    // image: `${CDN}/v1773037127/utensils_fyurgi.webp`,
    image: cleanUtensils,
  },
  {
    id: "Maintain Kitchen Hygiene",
    label: "Kitchen Hygiene",
    // image: `${CDN}/v1773037121/cleaning_fszds1.webp`,
    image: kitchenHygiene,
  },
  {
    id: "Manage Basic Groceries",
    label: "Groceries",
    image: `${CDN}/v1773037120/grocery_teclqd.webp`,
  },
  {
    id: "Assist in Dusting (afternoon)",
    label: "Assist Dusting (afternoon)",
    image: `${CDN}/v1773037119/dusting_hw9vbr.webp`,
  },
  {
    id: "Assist in Laundry (afternoon)",
    label: "Assist Laundry (afternoon)",
    image: `${CDN}/v1773037122/laundry_qowye6.webp`,
  },
];

// ── BABY CARETAKER — AGE RANGES ───────────────────────────────────────────────
// Changed from 4 ranges to 2 to match task-split boundary at 3 years.
export const CHILD_AGE_RANGES = [
  { id: "0 - 3 Years", label: "0 – 3 Years (Infant / Toddler)" },
  { id: "3+ Years", label: "3+ Years (Child)" },
];

// ── BABY CARETAKER — AGE-SPLIT TASK DEFINITIONS ───────────────────────────────

/** Duties for infants and toddlers aged 0–3 years */
export const CHILD_DUTIES_INFANT = [
  {
    id: "Feeding (Milk/Solids)",
    label: "Feeding",
    image: `${CDN}/v1773038057/feeding_kvsvwk.webp`,
  },
  {
    id: "Sterilizing Bottles",
    label: "Sterilize Bottles",
    // image: `${CDN}/v1773034370/other_s1pon0.webp`,
    image: sterilizingBottles,
  },
  {
    id: "Maintaining Hygiene",
    label: "Hygiene",
    // image: `${CDN}/v1773038311/hygiene_de4gcu.webp`,
    image: hygieneSupport,
  },
  {
    id: "Diaper Changing",
    label: "Diaper Change",
    image: diperChange,
  },
  {
    id: "Bathing",
    label: "Bathing",
    // image: `${CDN}/v1773038057/bathing_bykrvq.webp`,
    image: babyBath,
  },
  {
    id: "Massage",
    label: "Massage",
    // image: `${CDN}/v1773038315/support_erb1uy.webp`,
    image: massage,
  },
  {
    id: "Sleep Routine",
    label: "Sleep Routine",
    image: `${CDN}/v1773038061/sleeping_uk5vqm.webp`,
    // image:
  },
  {
    id: "Monitoring Health",
    label: "Monitor Health",
    // image: `${CDN}/v1773038312/medicine_kjlkd0.webp`,
    image: healthMonitoring,
  },
  {
    id: "Basic Stimulation (play, sensory activities)",
    label: "Play & Stimulation",
    // image: `${CDN}/v1773038058/playtime_udha2d.webp`,
    image: childStimulation,
  },
];

/** Duties for children aged 3+ years */
export const CHILD_DUTIES_OLDER = [
  {
    id: "Meal Prep / Feeding",
    label: "Meal / Feeding",
    // image: `${CDN}/v1773038057/feeding_kvsvwk.webp`,
    image: toddlerFeeding,
  },
  {
    id: "School Readiness",
    label: "School Readiness",
    // image: `${CDN}/v1773038059/homework_g3jbdz.webp`,
    image: schoolReadiness,
  },
  {
    id: "Engaging in Play",
    label: "Engaging In Play",
    image: `${CDN}/v1773038058/playtime_udha2d.webp`,
  },
  {
    id: "Basic Learning Support",
    label: "Learning Support",
    image: `${CDN}/v1773038059/homework_g3jbdz.webp`,
  },
  {
    id: "Activity Supervision",
    label: "Activity Supervision",
    // image: `${CDN}/v1773034370/other_s1pon0.webp`,
    image: childSupervision,
  },
  {
    id: "Maintaining Routine",
    label: "Maintaining Routine",
    // image: `${CDN}/v1773034370/other_s1pon0.webp`,
    image: routineManagement,
  },
  {
    id: "Hygiene Support",
    label: "Hygiene Support",
    // image: `${CDN}/v1773038311/hygiene_de4gcu.webp`,
    image: hygieneSupport,
  },
  {
    id: "Child Safety Supervision",
    label: "Safety & Supervision",
    // image: `${CDN}/v1773034370/other_s1pon0.webp`,
    image: childSafety,
  },
];

export const CARE_NEEDED = [
  {
    id: "Basic Support",
    label: "Basic Support",
    image: `${CDN}/v1773038308/caregiver_rhozy2.webp`,
  },
  {
    id: "Personal Hygiene",
    label: "Personal Hygiene",
    image: `${CDN}/v1773038311/hygiene_de4gcu.webp`,
  },
  {
    id: "Mobility Support",
    label: "Mobility Support",
    image: `${CDN}/v1773038315/support_erb1uy.webp`,
  },
  {
    id: "Medicine Reminders",
    label: "Medicine Reminders",
    image: `${CDN}/v1773038312/medicine_kjlkd0.webp`,
  },
  {
    id: "Full Care",
    label: "Full Care",
    image: `${CDN}/v1773038310/full-help_jrxrax.webp`,
  },
];

export const VEHICLE_TYPES = [
  {
    id: "Manual",
    label: "Manual",
    image: `${CDN}/v1773038638/manual_f78sol.webp`,
  },
  {
    id: "Automatic",
    label: "Automatic",
    image: `${CDN}/v1773038636/automatic_dmyqva.webp`,
  },
  { id: "SUV", label: "SUV", image: `${CDN}/v1773038641/SUV_hzrcgr.webp` },
  {
    id: "Sedan",
    label: "Sedan",
    image: `${CDN}/v1773038639/sedan_q1xmlm.webp`,
  },
];

// ── DRIVER TASKS ──────────────────────────────────────────────────────────────
export const DRIVER_TASKS = [
  {
    id: "Drive as per Daily Requirement",
    label: "Daily Driving",
    // image: `${CDN}/v1773038638/manual_f78sol.webp`,
    image: dailyDrive,
  },
  {
    id: "Can Work for 10 Hours",
    label: "10-Hour Shift",
    // image: `${CDN}/v1773034370/other_s1pon0.webp`,
    image: tenHourDriver,
  },
  {
    id: "Can Work for 12 Hours",
    label: "12-Hour Shift",
    // image: `${CDN}/v1773034370/other_s1pon0.webp`,
    image: twelveHourDriver,
  },
  {
    id: "Flexible with Working Hours",
    label: "Flexible Hours",
    // image: `${CDN}/v1773034370/other_s1pon0.webp`,
    image: flexibleHourDriver,
  },
  {
    id: "Maintain Vehicle Cleanliness",
    label: "Vehicle Cleaning",
    // image: `${CDN}/v1773037121/cleaning_fszds1.webp`,
    image: vehicleCleaning,
  },
  {
    id: "Basic Vehicle Upkeep",
    label: "Vehicle Upkeep",
    // image: `${CDN}/v1773038641/SUV_hzrcgr.webp`,
    image: vehicleUpkeep,
  },
  {
    id: "Ensure Safe and Timely Travel",
    label: "Safe Travel",
    // image: `${CDN}/v1773038636/automatic_dmyqva.webp`,
    image: safeAndTimelyTravel,
  },
];

export const HOME_TYPES = [
  {
    id: "Apartment",
    label: "Apartment",
    image: `${CDN}/v1773038422/apartment_ys8rbw.webp`,
  },
  {
    id: "Independent House",
    label: "Independent House",
    image: `${CDN}/v1773038451/individual_k0ko1y.webp`,
  },
  {
    id: "Villa",
    label: "Villa",
    image: `${CDN}/v1773038464/villa_z0apwp.webp`,
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
  { id: "sub-5k", desc: "One-time placement fee. Helper salary is separate." },
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

// ── JAPA ──────────────────────────────────────────────────────────────────────
export const JAPA_DUTIES = [
  {
    id: "Newborn Bath",
    label: "Newborn Bath",
    image: `${CDN}/v1773038057/bathing_bykrvq.webp`,
  },
  {
    id: "Feeding Support",
    label: "Feeding Support",
    image: `${CDN}/v1773038057/feeding_kvsvwk.webp`,
  },
  {
    id: "Swaddling",
    label: "Swaddling",
    image: `${CDN}/v1773038061/Swaddling_ce8kdn.webp`,
  },
  {
    id: "Night Watch",
    label: "Night Watch",
    image: `${CDN}/v1773038061/sleeping_uk5vqm.webp`,
  },
  {
    id: "Other",
    label: "Other",
    image: `${CDN}/v1773034370/other_s1pon0.webp`,
  },
];

export const JAPA_MOTHER_NEEDS = [
  {
    id: "Body Massage",
    label: "Body Massage",
    image: `${CDN}/v1773038315/body-massage_spvlzz`,
  },
  {
    id: "Diet & Nutrition",
    label: "Diet & Nutrition",
    image: `${CDN}/v1773038424/cookingOversight_bonbic.webp`,
  },
  {
    id: "Light Cooking",
    label: "Light Cooking",
    image: `${CDN}/v1773037719/light-cooking_bs02ym.webp`,
  },
  {
    id: "Night Support",
    label: "Night Support",
    image: `${CDN}/v1773038061/night-support_sqnjvw.webp`,
  },
  {
    id: "Personal Hygiene",
    label: "Personal Hygiene",
    image: `${CDN}/v1773038311/personal-hygiene_ynuc3c.webp`,
  },
  {
    id: "Other",
    label: "Other",
    image: `${CDN}/v1773034370/other_s1pon0.webp`,
  },
];

// ── PLANS ─────────────────────────────────────────────────────────────────────
export const PLANS = {
  priority: {
    id: "Priority",
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
        label: "3 Verified Profiles within 24 Hours",
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
    id: "Commitment",
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
        icon: "id-card",
        label: "2 Verified Profiles between 24-48 Hours",
        desc: "Carefully shortlisted based on your requirement.",
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
    id: "No Pay",
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
// All keys must exactly match SERVICES[].id (case-sensitive).
export const SERVICE_FLOWS = {
  "Live-In Support": [
    "service",
    "format",
    "tasks",
    "housesize",
    "pets",
    "helpergender",
    "budget",
    "urgency",
    "contact",
    "plan",
    "done",
  ],
  // "cooktasks" added after format so user picks duties before meal prefs.
  "Cooking Help": [
    "service",
    "format",
    "cooktasks",
    "mealpref",
    "cuisine",
    "cookmembers",
    "helpergender",
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
    "helpergender",
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
    "helpergender",
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
    "helpergender",
    "budget",
    "urgency",
    "contact",
    "plan",
    "done",
  ],
  // "drivertasks" added after vehicletype — driver picks vehicle then duties.
  Driver: [
    "service",
    "format",
    "vehicletype",
    "drivertasks",
    "helpergender",
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
  "helpergender",
  "budget",
  "contact",
  "plan",
  "done",
];

export const PROG_META = {
  service: { label: "Service", icon: Briefcase },
  format: { label: "Format", icon: Layers },
  tasks: { label: "Tasks", icon: Layers },
  cooktasks: { label: "Tasks", icon: ChefHat }, // ← new
  drivertasks: { label: "Duties", icon: Car }, // ← new
  housesize: { label: "Home", icon: Home },
  pets: { label: "Pets", icon: PawPrint },
  mealpref: { label: "Diet", icon: Utensils },
  mealtime: { label: "Meals", icon: Coffee },
  cuisine: { label: "Cuisine", icon: ChefHat },
  cookmembers: { label: "Members", icon: Users },
  helpergender: { label: "Helper", icon: ChefHat },
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
  CookTasks: [], // ← new: selected cook duties
  MealPref: "",
  MealsNeeded: [],
  CuisinePref: [],
  HelperGender: "",
  CookMembers: 0,
  // Baby Caretaker
  ChildAge: "",
  // ChildDuties: [],
  ChildDutiesInfant: [],
  ChildDutiesOlder: [],
  // Japa
  JapaDuties: [],
  JapaMotherNeeds: [],
  // Patient Care
  PatientAge: "",
  PatientGender: "",
  CareNeeded: [],
  // Driver
  VehicleType: [],
  DriverTasks: [], // ← new: selected driver duties
  // Common
  Budget: "",
  Urgency: "",
  Instructions: "",
  // Plan
  PlanType: "",
  PaymentStatus: "",
};
