// indianCities.js
// Hand-curated list of Indian cities covering all metros, tier-2, and tier-3
// that a domestic help service would realistically operate in.
// Replaces the 8MB country-state-city package entirely.
// Add more cities here anytime — zero bundle cost since it's just strings.

const INDIAN_CITIES = [
  // ── National Capital Region ──────────────────────────────────────────────
  "New Delhi",
  "Delhi",
  "Noida",
  "Greater Noida",
  "Ghaziabad",
  "Faridabad",
  "Gurugram",
  "Dwarka",

  // ── Maharashtra ──────────────────────────────────────────────────────────
  "Mumbai",
  "Navi Mumbai",
  "Thane",
  "Pune",
  "Nagpur",
  "Nashik",
  "Aurangabad",
  "Solapur",
  "Kolhapur",
  "Ahmednagar",

  // ── Karnataka ────────────────────────────────────────────────────────────
  "Bengaluru",
  "Mysuru",
  "Hubli",
  "Mangaluru",
  "Belagavi",
  "Kalaburagi",
  "Tumkur",

  // ── Tamil Nadu ───────────────────────────────────────────────────────────
  "Chennai",
  "Coimbatore",
  "Madurai",
  "Tiruchirappalli",
  "Salem",
  "Tirunelveli",
  "Vellore",
  "Erode",

  // ── Telangana & Andhra Pradesh ───────────────────────────────────────────
  "Hyderabad",
  "Secunderabad",
  "Warangal",
  "Nizamabad",
  "Visakhapatnam",
  "Vijayawada",
  "Guntur",
  "Tirupati",

  // ── Gujarat ──────────────────────────────────────────────────────────────
  "Ahmedabad",
  "Surat",
  "Vadodara",
  "Rajkot",
  "Bhavnagar",
  "Jamnagar",
  "Gandhinagar",
  "Anand",

  // ── Rajasthan ────────────────────────────────────────────────────────────
  "Jaipur",
  "Jodhpur",
  "Udaipur",
  "Kota",
  "Ajmer",
  "Bikaner",
  "Alwar",

  // ── Uttar Pradesh ────────────────────────────────────────────────────────
  "Lucknow",
  "Kanpur",
  "Agra",
  "Varanasi",
  "Prayagraj",
  "Meerut",
  "Bareilly",
  "Aligarh",
  "Mathura",
  "Moradabad",

  // ── West Bengal ──────────────────────────────────────────────────────────
  "Kolkata",
  "Howrah",
  "Durgapur",
  "Asansol",
  "Siliguri",
  "Bardhaman",

  // ── Madhya Pradesh ───────────────────────────────────────────────────────
  "Bhopal",
  "Indore",
  "Jabalpur",
  "Gwalior",
  "Ujjain",
  "Sagar",
  "Dewas",

  // ── Punjab & Haryana ─────────────────────────────────────────────────────
  "Chandigarh",
  "Ludhiana",
  "Amritsar",
  "Jalandhar",
  "Patiala",
  "Bathinda",
  "Ambala",
  "Panipat",
  "Karnal",
  "Rohtak",
  "Hisar",
  "Sonipat",

  // ── Bihar & Jharkhand ────────────────────────────────────────────────────
  "Patna",
  "Gaya",
  "Muzaffarpur",
  "Bhagalpur",
  "Ranchi",
  "Jamshedpur",
  "Dhanbad",
  "Bokaro",

  // ── Odisha ───────────────────────────────────────────────────────────────
  "Bhubaneswar",
  "Cuttack",
  "Rourkela",
  "Berhampur",

  // ── Kerala ───────────────────────────────────────────────────────────────
  "Thiruvananthapuram",
  "Kochi",
  "Kozhikode",
  "Thrissur",
  "Kollam",
  "Kannur",

  // ── Assam & Northeast ────────────────────────────────────────────────────
  "Guwahati",
  "Dibrugarh",
  "Silchar",
  "Imphal",
  "Agartala",
  "Shillong",

  // ── Himachal & Uttarakhand ───────────────────────────────────────────────
  "Dehradun",
  "Haridwar",
  "Roorkee",
  "Shimla",
  "Dharamshala",
  "Mandi",

  // ── Goa ─────────────────────────────────────────────────────────────────
  "Panaji",
  "Margao",
  "Vasco da Gama",

  // ── Chhattisgarh ─────────────────────────────────────────────────────────
  "Raipur",
  "Bhilai",
  "Bilaspur",
  "Korba",

  // ── Jammu & Kashmir ──────────────────────────────────────────────────────
  "Srinagar",
  "Jammu",
  "Leh",
];

// Sorted alphabetically for the dropdown
export default INDIAN_CITIES.sort((a, b) => a.localeCompare(b));
