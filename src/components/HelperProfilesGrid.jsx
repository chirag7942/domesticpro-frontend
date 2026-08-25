import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_REACT_APP_API || "";
const MAX_SELECTIONS = 5;

// ─── Ranking helpers ──────────────────────────────────────────────────────────
// Priority order for showing recommended profiles:
//   Tier 0 — city AND gender AND budget all match
//   Tier 1 — city AND budget match
//   Tier 2 — city AND gender match
//   Tier 3 — budget AND gender match
//   Tier 4 — city match only
//   Tier 5 — budget match only
//   Tier 6 — gender match only
//   Tier 7 — none match
// Within any tier, ties are broken by how close the helper's salary is to
// the client's selected budget (closest first). If the client didn't
// specify a gender preference, gender is simply never counted as a match
// for anyone, so ranking falls back to city/budget only.
const REGION_CITY_MAP = {
  "delhi ncr": [
    "delhi", "new delhi", "gurgaon", "gurugram", "noida",
    "faridabad", "ghaziabad", "greater noida", "sonipat", "ncr",
  ],
};

function normalize(str) {
  return String(str || "")
    .toLowerCase()
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Cities that were officially renamed, or are commonly known by two names.
// Both sides of a comparison get run through this before matching.
const CITY_SYNONYMS = {
  gurugram: "gurgaon", gurgaon: "gurgaon",
  bengaluru: "bangalore", bangalore: "bangalore",
  bombay: "mumbai", mumbai: "mumbai",
  calcutta: "kolkata", kolkata: "kolkata",
  madras: "chennai", chennai: "chennai",
  baroda: "vadodara", vadodara: "vadodara",
  poona: "pune", pune: "pune",
};

function canonicalCity(str) {
  const n = normalize(str);
  return CITY_SYNONYMS[n] || n;
}

function cityMatches(clientCity, helperCities) {
  if (!clientCity || !helperCities) return false;
  const client = canonicalCity(clientCity);
  const list = Array.isArray(helperCities) ? helperCities : [helperCities];

  return list.some((entry) => {
    const h = normalize(entry);
    if (!h) return false;
    if (canonicalCity(entry) === client) return true;
    const covered = REGION_CITY_MAP[h];
    return covered ? covered.some((c) => canonicalCity(c) === client) : false;
  });
}

// Assumes the client's preference and the helper's own gender are stored
// as plain strings (e.g. "Male" / "Female"). If /api/helpers exposes this
// under a different field name than helper.gender, adjust getHelperGenderRaw.
function getHelperGenderRaw(helper) {
  return helper.gender ?? helper.Gender ?? null;
}

function genderMatches(clientGender, helperGender) {
  if (!clientGender) return false; // no preference specified — not counted either way
  const c = normalize(clientGender);
  if (c === "any" || c === "no preference") return true;
  const h = normalize(helperGender);
  if (!h) return false;
  return c === h;
}

// Parses a "₹X – ₹Y" / "₹X +" style range string into [min, max].
function parseDisplayRange(rangeStr) {
  const str = String(rangeStr || "").replace(/[₹,]/g, "").trim();
  if (!str) return null;
  if (str.endsWith("+")) {
    const min = parseInt(str, 10);
    return Number.isNaN(min) ? null : [min, Infinity];
  }
  const nums = str.match(/\d+(\.\d+)?/g);
  if (!nums || nums.length === 0) return null;
  const values = nums.map(Number);
  return [Math.min(...values), Math.max(...values)];
}

// Parses a helper's salary, which may be a plain number, a numeric string,
// or a range string like "20000-25000" — flexible on purpose since salary
// data isn't consistently stored as a single point value.
function parseSalaryRange(raw) {
  if (raw === null || raw === undefined || raw === "") return null;
  if (typeof raw === "number") return [raw, raw];
  return parseDisplayRange(raw);
}

function rangesOverlap([aMin, aMax], [bMin, bMax]) {
  return aMin <= bMax && bMin <= aMax;
}

function rangeGap([aMin, aMax], [bMin, bMax]) {
  if (rangesOverlap([aMin, aMax], [bMin, bMax])) return 0;
  return aMax < bMin ? bMin - aMax : aMin - bMax;
}

// Tries the common field names a helper's expected salary might be stored
// under. If none of these match your actual /api/helpers response shape,
// add/adjust the field name here.
function getHelperSalaryRaw(helper) {
  return (
    helper.salary ??
    helper.monthlySalary ??
    helper.expectedSalary ??
    helper.Monthly_Salary ??
    helper.salaryExpectation ??
    null
  );
}

function formatINR(n) {
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}

// Turns a helper's raw salary (point value, range string, or open-ended
// "30000+") into a display string like "₹20,000 – ₹25,000". Returns null
// if there's nothing usable to show, so the card can just omit the line.
function formatSalaryDisplay(raw) {
  const range = parseSalaryRange(raw);
  if (!range) return null;
  const [min, max] = range;
  if (max === Infinity) return `${formatINR(min)}+`;
  if (min === max) return formatINR(min);
  return `${formatINR(min)} – ${formatINR(max)}`;
}

function rankHelper(helper, clientCity, clientRanges, clientGender) {
  const cityOk = cityMatches(clientCity, helper.cities);
  const genderOk = genderMatches(clientGender, getHelperGenderRaw(helper));
  const salaryRange = parseSalaryRange(getHelperSalaryRaw(helper));
  const distance =
    salaryRange && clientRanges.length
      ? Math.min(...clientRanges.map((r) => rangeGap(r, salaryRange)))
      : Infinity;
  const budgetOk = distance === 0;

  const matchCount = [cityOk, genderOk, budgetOk].filter(Boolean).length;

  let tier;
  if (matchCount === 3) {
    tier = 0;
  } else if (matchCount === 2) {
    if (cityOk && budgetOk) tier = 1;       // city + budget
    else if (cityOk && genderOk) tier = 2;  // city + gender
    else tier = 3;                          // budget + gender
  } else if (matchCount === 1) {
    if (cityOk) tier = 4;
    else if (budgetOk) tier = 5;
    else tier = 6; // genderOk
  } else {
    tier = 7;
  }

  return { tier, distance };
}

function compareByDistance(a, b) {
  if (a.distance === b.distance) return 0;
  if (a.distance === Infinity) return 1;
  if (b.distance === Infinity) return -1;
  return a.distance - b.distance;
}

function sortByRelevance(helpers, clientCity, clientBudgets, clientGender) {
  const clientRanges = (clientBudgets || []).map(parseDisplayRange).filter(Boolean);
  return [...helpers]
    .map((helper) => ({ helper, ...rankHelper(helper, clientCity, clientRanges, clientGender) }))
    .sort((a, b) => (a.tier !== b.tier ? a.tier - b.tier : compareByDistance(a, b)))
    .map((entry) => entry.helper);
}

// ─── Small building blocks ────────────────────────────────────────────────────
function StatPill({ value, label }) {
  return (
    <div className="flex-1 min-w-0 bg-primary/5 rounded-xl px-2.5 py-2 text-center">
      <div className="text-sm font-bold text-textDark truncate">{value}</div>
      <div className="text-[10px] font-semibold uppercase tracking-wide text-textLight">{label}</div>
    </div>
  );
}

function getInitials(name) {
  return (
    String(name || "")
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join("") || "?"
  );
}

// ─── Helper card ────────────────────────────────────────────────────────────
function HelperCard({ helper, selected, atCap, onToggle }) {
  const cities = Array.isArray(helper.cities) ? helper.cities.join(", ") : helper.cities;
  const salaryDisplay = formatSalaryDisplay(getHelperSalaryRaw(helper));
  const disabled = !selected && atCap;

  // If the photo URL genuinely fails to load (bad link, network error),
  // fall back to an initials avatar instead of leaving a broken image.
  // Note: this does NOT catch cases where the URL loads successfully but
  // serves the wrong/placeholder image (e.g. a Google Drive file that
  // isn't shared as "Anyone with the link") — that has to be fixed at
  // the source (the stored photoUrl / Drive sharing permissions).
  const [imgFailed, setImgFailed] = useState(false);
  const showFallback = imgFailed || !helper.photoUrl;

  return (
    <div
      className={`bg-white border rounded-2xl p-4 transition-all duration-300 ${
        selected ? "border-primary shadow-[0_8px_28px_rgba(232,68,10,0.14)]" : "border-borderLight"
      } ${!disabled ? "hover:border-primary hover:shadow-[0_8px_28px_rgba(232,68,10,0.1)]" : ""}`}
    >
      <div className="flex gap-6">
        {/* Thumbnail — dual-image trick keeps the photo fully visible without cropping */}
        <div className="relative w-28 h-28 rounded-xl overflow-hidden flex-shrink-0 bg-bgLight">
          {showFallback ? (
            <div className="w-full h-full flex items-center justify-center bg-primary/10">
              <span className="text-2xl font-bold text-primary">{getInitials(helper.fullName)}</span>
            </div>
          ) : (
            <>
              <img
                src={helper.photoUrl}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover blur-lg scale-110 opacity-60"
                onError={() => setImgFailed(true)}
              />
              <img
                src={helper.photoUrl}
                alt={helper.fullName}
                className="relative w-full h-full object-contain"
                loading="lazy"
                onError={() => setImgFailed(true)}
              />
            </>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-textDark text-base leading-snug truncate">{helper.fullName}</h3>
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            <span className="inline-block bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-full">
              {helper.serviceType}
            </span>
          </div>
          {salaryDisplay && (
            <div className="text-sm font-bold text-textDark mt-2">
              {salaryDisplay} <span className="font-normal text-textLight">/ month</span>
            </div>
          )}

          <div className="mt-2 space-y-1 text-xs">
            <div className="truncate font-semibold text-textDark">📍 Available In: {cities}</div>
            <div className="truncate font-semibold text-textDark">🏠 Native: {helper.nativePlace}</div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-3">
        <StatPill value={`${helper.age} yrs`} label="Age" />
        <StatPill value={helper.experience} label="Experience" />
      </div>

      <button
        onClick={() => !disabled && onToggle(helper)}
        disabled={disabled}
        title={disabled ? "Maximum 5 profiles selected — deselect one first" : undefined}
        className={`w-full mt-4 text-sm font-bold py-2.5 rounded-full transition-colors ${
          selected
            ? "bg-primary text-white"
            : disabled
            ? "bg-bgLight text-textLight/50 cursor-not-allowed"
            : "bg-bgLight text-textDark hover:bg-primary hover:text-white"
        }`}
      >
        {selected ? "Interested ✓" : "Interested"}
      </button>
    </div>
  );
}

// ─── Success banner (shown above the grid, only while not yet submitted) ─────
function SuccessBanner({ title, desc }) {
  if (!title && (!desc || desc.length === 0)) return null;
  return (
    <div className="flex items-start gap-3 bg-green-50 border border-green-200 border-l-4 border-l-green-600 rounded-xl px-4 py-3.5 mb-6">
      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 6L9 17L4 12" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div>
        {title && <p className="text-[15px] font-bold text-green-900 mb-1">{title}</p>}
        {(desc || []).map((para, i) => (
          <p key={i} className="text-[13px] leading-relaxed text-green-800">{para}</p>
        ))}
      </div>
    </div>
  );
}

// ─── Thank-you panel (replaces the grid entirely once submitted) ─────────────
function ThankYouPanel({ count }) {
  return (
    <div className="max-w-lg mx-auto text-center bg-white border border-borderLight rounded-2xl px-8 py-12 shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
      <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-5">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-textDark mb-2">Thank you for sharing your interest!</h2>
      <p className="text-sm text-textLight leading-relaxed">
        We've received your interest in {count} profile{count !== 1 ? "s" : ""}. Our team will review your
        selection and reach out to you shortly.
      </p>
    </div>
  );
}

// ─── Grid ───────────────────────────────────────────────────────────────────
export default function HelperProfilesGrid({
  serviceType,
  serviceLabel,
  clientCity,
  clientBudgets,
  clientGender,
  mobile,
  leadId,
  submissionKey,
  bannerTitle,
  bannerDesc,
}) {
  const [helpers, setHelpers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Scoped to this specific demand submission (mobile + submittedAt), not
  // just the phone number — otherwise submitting interest once and later
  // submitting a brand-new demand request with the same number in the same
  // tab would incorrectly carry over "already submitted" with selectedIds
  // that don't match the new fetch at all.
  const storageIdentity = submissionKey || mobile;
  const submittedStorageKey = storageIdentity ? `dp_interest_submitted_${storageIdentity}` : null;

  const [initialSubmittedState] = useState(() => {
    if (!submittedStorageKey) return { submitted: false, selectedIds: [] };
    try {
      const raw = sessionStorage.getItem(submittedStorageKey);
      if (!raw) return { submitted: false, selectedIds: [] };
      const parsed = JSON.parse(raw);
      if (parsed === true) return { submitted: true, selectedIds: [] };
      return {
        submitted: !!parsed?.submitted,
        selectedIds: Array.isArray(parsed?.selectedIds) ? parsed.selectedIds : [],
      };
    } catch (e) {
      return { submitted: false, selectedIds: [] };
    }
  });

  const [selectedIds, setSelectedIds] = useState(initialSubmittedState.selectedIds);
  const [submitted, setSubmitted] = useState(initialSubmittedState.submitted);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [capNotice, setCapNotice] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    axios
      .get(`${API_BASE}/api/helpers`, {
        params: { ...(serviceType ? { serviceType } : {}), limit: 200 },
      })
      .then((res) => {
        if (cancelled) return;
        const profiles = res.data.profiles || [];
        setHelpers(sortByRelevance(profiles, clientCity, clientBudgets, clientGender));
      })
      .catch((err) => { if (!cancelled) setError(err?.response?.data?.error || "Could not load profiles"); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [serviceType, clientCity, clientBudgets, clientGender]);

  const atCap = selectedIds.length >= MAX_SELECTIONS;

  // Identity is helper._id (Mongo's own primary key, always present) —
  // NOT helper.uniqueId, which isn't reliably synced into the DB.
  const handleToggle = (helper) => {
    if (submitted) return;
    setSelectedIds((prev) => {
      if (prev.includes(helper._id)) {
        return prev.filter((id) => id !== helper._id);
      }
      if (prev.length >= MAX_SELECTIONS) {
        setCapNotice(true);
        setTimeout(() => setCapNotice(false), 2500);
        return prev;
      }
      return [...prev, helper._id];
    });
  };

  const handleSubmit = async () => {
    if (!mobile) {
      setSubmitError("Something's off with this session — please resubmit your original request.");
      return;
    }
    if (selectedIds.length === 0) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      // Send fullName + serviceType (not uniqueId) — the backend resolves
      // each helper's actual Unique_ID by querying the Helpers1 report in
      // Zoho directly at submit time, since uniqueId isn't stored locally.
      const selectedProfiles = helpers
        .filter((h) => selectedIds.includes(h._id))
        .map((h) => ({ fullName: h.fullName, serviceType: h.serviceType }));

      await axios.post(`${API_BASE}/api/helpers/submit-interest`, {
        mobile,
        leadId,
        profiles: selectedProfiles,
      });

      setSubmitted(true);
      if (submittedStorageKey) {
        try {
          sessionStorage.setItem(
            submittedStorageKey,
            JSON.stringify({ submitted: true, selectedIds })
          );
        } catch (e) {
          // non-fatal
        }
      }
    } catch (err) {
      setSubmitError(err?.response?.data?.error || "Could not submit your response. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-bgLight animate-pulse rounded-2xl h-52" />
        ))}
      </div>
    );
  }
  if (error) return <p className="text-textLight text-sm text-center py-8">{error}</p>;
  if (helpers.length === 0) return <p className="text-textLight text-sm text-center py-8">No profiles found.</p>;

  // Once submitted, only the thank-you panel shows — the green banner is
  // deliberately NOT rendered here, so it disappears the moment interest
  // is submitted.
  if (submitted) {
    return (
      <div className="py-6">
        <ThankYouPanel count={selectedIds.length} />
      </div>
    );
  }

  return (
    <div className="pb-28">
      {/* Top-center toast — visible regardless of scroll position */}
      {capNotice && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl px-5 py-2.5 text-sm font-semibold shadow-lg">
          You can select maximum 5 profiles only.
        </div>
      )}

      <SuccessBanner title={bannerTitle} desc={bannerDesc} />

      {/* Headings */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-[28px] font-extrabold text-textDark leading-tight">
          Recommended {serviceLabel ? `${serviceLabel} ` : ""}Profiles For You
        </h1>
        <p className="text-sm font-semibold text-primary mt-2 max-w-2xl">
          You can select a maximum of 5 profiles. After selecting, tap Submit Response and we'll get your
          shortlisted profiles.
        </p>
        <p className="text-sm text-textDark/70 font-normal mt-2">
          ⏰ This page stays open for 1 hour only — if you close this tab and come back, it won't be available
          again.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {helpers.map((h) => (
          <HelperCard
            key={h._id}
            helper={h}
            selected={selectedIds.includes(h._id)}
            atCap={atCap}
            onToggle={handleToggle}
          />
        ))}
      </div>

      {/* Always-visible submit bar — stays put, just darkens once something's selected */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-borderLight shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="max-w-[1120px] mx-auto px-5 py-4 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <div className="text-sm font-bold text-textDark">
              {selectedIds.length} of {MAX_SELECTIONS} selected
            </div>
            {submitError && (
              <div className="text-xs text-red-600 font-semibold mt-1">{submitError}</div>
            )}
          </div>
          <button
            onClick={handleSubmit}
            disabled={selectedIds.length === 0 || submitting}
            className={`text-sm font-bold px-6 py-3 rounded-full transition-colors ${
              selectedIds.length === 0
                ? "bg-bgLight text-textLight/50 cursor-not-allowed"
                : "bg-primary hover:bg-primaryHover text-white"
            }`}
          >
            {submitting ? "Submitting…" : "Submit Response"}
          </button>
        </div>
      </div>
    </div>
  );
}