import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  memo,
} from "react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Star,
  MapPin,
  Clock,
  Briefcase,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { fetchReviews, fetchStats, submitReview } from "../api/reviews";
import CitySelect from "./CitySelect";

// ─── CSS ─────────────────────────────────────────────────────────────────────
const CSS = `
  /* ── Animations ── */
  @keyframes rs2-star-bounce {
    0%   { transform: scale(1) rotate(0deg); }
    30%  { transform: scale(1.5) rotate(-12deg); }
    60%  { transform: scale(0.85) rotate(5deg); }
    80%  { transform: scale(1.08) rotate(-2deg); }
    100% { transform: scale(1) rotate(0deg); }
  }
  @keyframes rs2-burst {
    0%   { opacity: 0.8; transform: scale(0.6); }
    60%  { opacity: 0.4; transform: scale(1.4); }
    100% { opacity: 0; transform: scale(2); }
  }
  @keyframes rs2-success {
    0%   { opacity: 0; transform: scale(0.82) translateY(16px); }
    55%  { transform: scale(1.04) translateY(-3px); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
  }
  @keyframes rs2-fade-up {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes rs2-progress {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }
  @keyframes rs2-shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }
  @keyframes rs2-float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-5px); }
  }

  .rs2-star-bounce  { animation: rs2-star-bounce 0.38s cubic-bezier(0.34,1.56,0.64,1) both; }
  .rs2-success-in   { animation: rs2-success 0.45s cubic-bezier(0.34,1.56,0.64,1) both; }
  .rs2-fade-up      { animation: rs2-fade-up 0.3s ease both; }
  .rs2-float        { animation: rs2-float 3s ease-in-out infinite; }

  /* ── Inputs ── */
  .rs2-input, .rs2-textarea, .rs2-select {
    width: 100%;
    background: #fff;
    border: 2px solid #F1E3DE;
    border-radius: 12px;
    padding: 10px 14px;
    font-size: 13.5px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    color: #181C2E;
    transition: border-color .2s, box-shadow .2s;
    outline: none;
  }
  .rs2-input::placeholder,
  .rs2-textarea::placeholder { color: #C4B8B2; }
  .rs2-input:focus,
  .rs2-textarea:focus,
  .rs2-select:focus {
    border-color: #EC5F36;
    box-shadow: 0 0 0 3px rgba(236,95,54,0.10);
  }
  .rs2-input.error,
  .rs2-textarea.error { border-color: #F87171; box-shadow: 0 0 0 3px rgba(248,113,113,0.10); }
  .rs2-textarea { resize: none; }
  .rs2-select { appearance: none; cursor: pointer; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%235B6475' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 14px center; padding-right: 36px; }

  /* ── Stars ── */
  .rs2-star-btn {
    background: none; border: none; padding: 3px; cursor: pointer; line-height: 1;
    border-radius: 6px; transition: transform .15s ease;
  }
  .rs2-star-btn:hover { transform: scale(1.2); }
  .rs2-star-btn:focus-visible { outline: 2px solid #EC5F36; outline-offset: 2px; }

  /* ── Carousel track ── */
  .rs2-track {
    display: flex;
    transition: transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    will-change: transform;
  }

  /* ── Card ── */
  .rs2-review-card {
    flex-shrink: 0;
    transition:
      transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94),
      opacity   0.45s ease,
      box-shadow 0.3s ease;
    cursor: default;
    user-select: none;
  }

  /* ── Progress bar ── */
  .rs2-progress-bar {
    height: 2px;
    border-radius: 99px;
    background: linear-gradient(90deg, #EC5F36, #F87C4F);
    transform-origin: left center;
    transform: scaleX(0);
    transition: transform linear;
  }

  /* ── Skeleton ── */
  .rs2-skeleton {
    background: linear-gradient(90deg, #f5ede9 25%, #fde8e0 50%, #f5ede9 75%);
    background-size: 400px 100%;
    animation: rs2-shimmer 1.4s infinite linear;
    border-radius: 10px;
  }

  /* ── Metric card ── */
  .rs2-metric-card {
    position: relative;
    overflow: hidden;
  }
  .rs2-metric-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(236,95,54,0.06) 0%, transparent 60%);
    pointer-events: none;
  }

  /* ── Submit btn ── */
  .rs2-submit-btn {
    background: linear-gradient(135deg, #EC5F36, #D84E28);
    color: #fff;
    border: none;
    border-radius: 13px;
    height: 50px;
    width: 100%;
    font-size: 14px;
    font-weight: 800;
    font-family: 'Plus Jakarta Sans', sans-serif;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    box-shadow: 0 4px 18px rgba(236,95,54,0.30);
    transition: box-shadow .22s, transform .18s;
  }
  .rs2-submit-btn:hover:not(:disabled) {
    box-shadow: 0 8px 28px rgba(236,95,54,0.42);
    transform: translateY(-1.5px);
  }
  .rs2-submit-btn:disabled { opacity: .5; cursor: not-allowed; transform: none; }

  /* ── Quote bg ── */
  .rs2-quote-bg {
    position: absolute;
    bottom: -8px;
    right: -4px;
    opacity: 0.055;
    pointer-events: none;
  }

  /* ── Dots ── */
  .rs2-dot {
    border: none;
    padding: 0;
    cursor: pointer;
    border-radius: 99px;
    transition: width .3s ease, background .3s ease;
  }
`;

// ─── Mock fallback data (shown when API fails / loading) ──────────────────────
// const MOCK_REVIEWS = [
//   { _id: "1", name: "Priya Mehta", city: "Gurugram", rating: 5, text: "Found an amazing live-in housekeeper within 48 hours. The background check gave us complete peace of mind. She's been with us 6 months — couldn't be happier!", serviceType: "Live-In Support", hiringDuration: "Hired in 2 days", verified: true, createdAt: "2025-04-01" },
//   { _id: "2", name: "Rohan Sharma", city: "Delhi", rating: 5, text: "As working parents with a toddler, finding a reliable baby caretaker was our biggest worry. Domestic Pro matched us with the perfect nanny in just 2 days. Absolutely seamless.", serviceType: "Baby Caretaker", hiringDuration: "Hired in 2 days", verified: true, createdAt: "2025-03-20" },
//   { _id: "3", name: "Anjali Kapoor", city: "Noida", rating: 5, text: "The cook they placed speaks our language and cooks exactly how we like — even our fussy kids eat well now! Honest pricing, great service.", serviceType: "Cooking Help", hiringDuration: "Hired in 3 days", verified: true, createdAt: "2025-03-14" },
//   { _id: "4", name: "Vikram Nair", city: "Bengaluru", rating: 4, text: "We needed a patient care helper on short notice for my elderly mother. The team sent a compassionate, experienced caregiver within 3 days. Very grateful.", serviceType: "Patient Care", hiringDuration: "Hired in 3 days", verified: true, createdAt: "2025-02-28" },
//   { _id: "5", name: "Sunita Agarwal", city: "Mumbai", rating: 5, text: "After a bad experience with a local broker, Domestic Pro was a breath of fresh air. Transparent fees, verified profiles, and a support team that actually picks up the phone.", serviceType: "Live-In Support", hiringDuration: "Hired in 4 days", verified: true, createdAt: "2025-02-20" },
//   { _id: "6", name: "Deepak Verma", city: "Hyderabad", rating: 5, text: "Used the Japa service after my wife delivered. The maid was experienced, gentle with the newborn, and helped with proper postpartum care. Money very well spent.", serviceType: "Japa", hiringDuration: "Hired in 1 day", verified: true, createdAt: "2025-02-10" },
//   { _id: "7", name: "Meera Patel", city: "Pune", rating: 4, text: "The substitute service saved us when our regular help went on leave unexpectedly. Had someone at our door the very next morning — that reliability is priceless.", serviceType: "Live-In Support", hiringDuration: "Next morning", verified: false, createdAt: "2025-01-30" },
//   { _id: "8", name: "Arjun Bhatia", city: "Chandigarh", rating: 5, text: "Hired a driver through Domestic Pro — thorough background verification, clean record, professional attitude. The whole process took less than 4 days from registration to placement.", serviceType: "Driver", hiringDuration: "Hired in 4 days", verified: true, createdAt: "2025-01-18" },
//   { _id: "9", name: "Kavitha Menon", city: "Chennai", rating: 5, text: "I was sceptical about online domestic staff platforms, but Domestic Pro exceeded all expectations. The verification process is thorough and the support team genuinely cares.", serviceType: "Baby Caretaker", hiringDuration: "Hired in 2 days", verified: true, createdAt: "2025-01-05" },
//   { _id: "10", name: "Rahul Gupta", city: "Lucknow", rating: 5, text: "Second hire through Domestic Pro this year. The quality and consistency is impressive. The replacement guarantee is real — they honoured it promptly when we needed it.", serviceType: "Cooking Help", hiringDuration: "Hired in 3 days", verified: true, createdAt: "2024-12-22" },
// ];

const MOCK_STATS = { averageRating: 4.8, totalReviews: 230, verifiedCount: 198, happyFamilies: 320 };

// ─── Palette per reviewer (cycles) ───────────────────────────────────────────
const PALETTES = [
  ["#FFF0EB", "#EC5F36"], ["#EFF6FF", "#3B82F6"], ["#F0FDF4", "#22C55E"],
  ["#FDF4FF", "#A855F7"], ["#FFFBEB", "#F59E0B"], ["#FFF1F2", "#F43F5E"],
  ["#F0FDFA", "#14B8A6"], ["#FEF9C3", "#CA8A04"],
];
const palette = (idx) => PALETTES[idx % PALETTES.length];

const SERVICE_ICONS = {
  "Live-In Support": "🏠", "Baby Caretaker": "👶", "Cooking Help": "👨‍🍳",
  "Patient Care": "🧓", "Japa": "🤱", "Driver": "🚗", "Other": "✨",
};
const SERVICES_LIST = ["Live-In Support", "Baby Caretaker", "Cooking Help", "Patient Care", "Japa", "Driver", "Other"];
const RATING_LABELS = ["", "Needs Work", "Fair", "Good", "Great", "Excellent!"];

function getInitials(name = "") {
  return name.trim().split(/\s+/).slice(0, 2).map((w) => w[0].toUpperCase()).join("");
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString("en-IN", { month: "short", year: "numeric" });
  } catch { return ""; }
}

// ─── Shared: Stars display ────────────────────────────────────────────────────
const StarsDisplay = memo(({ rating, size = 14 }) => (
  <span style={{ display: "inline-flex", gap: 2 }}>
    {[1, 2, 3, 4, 5].map((s) => (
      <Star
        key={s}
        size={size}
        fill={s <= rating ? "#F59E0B" : "#F1E3DE"}
        stroke="none"
      />
    ))}
  </span>
));

// ─── Metric chip ──────────────────────────────────────────────────────────────
const MetricCard = memo(({ value, label, sub, accent }) => (
  <div
    className="rs2-metric-card flex-1 bg-white border border-borderLight rounded-2xl px-4 py-3.5 text-center"
    style={{ boxShadow: "0 2px 12px rgba(236,95,54,0.06)" }}
  >
    <p className="text-xl font-extrabold text-textDark leading-none mb-0.5"
      style={{ fontFamily: "'Fraunces',serif", color: accent || "#181C2E" }}>
      {value}
    </p>
    <p className="text-[11px] font-bold text-textLight uppercase tracking-wider">{label}</p>
    {sub && <p className="text-[10px] text-textLight/70 mt-0.5">{sub}</p>}
  </div>
));

// ─── Single Review Card ───────────────────────────────────────────────────────
const ReviewCard = memo(({ review, index, isFeatured }) => {
  const [bg, fg] = palette(index);
  return (
    <div
      className="bg-white border border-borderLight rounded-2xl relative overflow-hidden"
      style={{
        padding: isFeatured ? "22px 20px" : "18px 16px",
        boxShadow: isFeatured
          ? "0 12px 40px rgba(236,95,54,0.13), 0 2px 8px rgba(0,0,0,0.05)"
          : "0 3px 14px rgba(0,0,0,0.05)",
        minHeight: isFeatured ? 220 : 200,
        maxWidth: isFeatured ? 250 : 200,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      {/* Background quote decoration */}
      <div className="rs2-quote-bg">
        <svg width={90} height={70} viewBox="0 0 90 70" fill="#EC5F36">
          <path d="M0 40C0 18 14 4 40 0v14C26 16 20 24 18 36h14v34H0V40zm48 0C48 18 62 4 88 0v14C74 16 68 24 66 36h14v34H48V40z" />
        </svg>
      </div>

      {/* Top: stars + service badge */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <StarsDisplay rating={review.rating} size={isFeatured ? 17 : 14} />
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className="text-xs" aria-hidden>{SERVICE_ICONS[review.serviceType] || "✨"}</span>
            <span className="text-[11px] font-bold text-textLight">{review.serviceType}</span>
          </div>
        </div>
        {review.verified && (
          <span className="flex-shrink-0 inline-flex items-center gap-1 bg-green-50 border border-green-200 text-green-700 text-[10px] font-bold rounded-full px-2 py-0.5">
            <ShieldCheck size={10} strokeWidth={2.5} /> Verified
          </span>
        )}
      </div>

      {/* Review text */}
      <p
        className="text-textLight leading-relaxed flex-1"
        style={{ fontSize: isFeatured ? 13 : 12, lineHeight: 1.65 }}
      >
        "{review.text}"
      </p>

      {/* Footer: avatar + name + meta */}
      <div className="flex items-center gap-3 pt-2" style={{ borderTop: "1px solid #F1E3DE" }}>
        <div
          className="flex-shrink-0 rounded-full flex items-center justify-center font-extrabold"
          style={{
            width: isFeatured ? 40 : 34,
            height: isFeatured ? 40 : 34,
            background: bg,
            color: fg,
            fontSize: isFeatured ? 13 : 11,
          }}
        >
          {getInitials(review.name)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-textDark truncate" style={{ fontSize: isFeatured ? 13.5 : 12 }}>
            {review.name}
          </p>
          <div className="flex items-center gap-2 flex-wrap mt-0.5">
            <span className="flex items-center gap-0.5 text-textLight" style={{ fontSize: 11 }}>
              <MapPin size={9} strokeWidth={2} /> {review.city}
            </span>
            {review.hiringDuration && (
              <span className="flex items-center gap-0.5 text-primary font-semibold" style={{ fontSize: 11 }}>
                <Clock size={9} strokeWidth={2} /> {review.hiringDuration}
              </span>
            )}
            <span className="text-textLight/60" style={{ fontSize: 11 }}>{formatDate(review.createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
});

// ─── Multi-card Carousel ──────────────────────────────────────────────────────
function ReviewCarousel({ reviews, stats, statsLoading }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progKey, setProgKey] = useState(0);
  const INTERVAL = 4000;
  const total = reviews.length;

  // Responsive: how many cards to show
  const [visibleCount, setVisibleCount] = useState(3);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setVisibleCount(w < 640 ? 1 : w < 1024 ? 2 : 3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const advance = useCallback((dir = 1) => {
    setCurrent((c) => (c + dir + total) % total);
    setProgKey((k) => k + 1);
  }, [total]);

  // Auto-advance
  useEffect(() => {
    if (paused || total === 0) return;
    const id = setTimeout(() => advance(1), INTERVAL);
    return () => clearTimeout(id);
  }, [current, paused, advance, total]);

  // Build the visible window of indices
  // For 3 cards: [current-1, current, current+1]  (center is featured)
  // For 2 cards: [current, current+1]
  // For 1 card:  [current]
  const visibleIndices = useMemo(() => {
    const actualVisible = Math.min(visibleCount, total);

    if (actualVisible === 1) {
      return [current];
    }

    if (actualVisible === 2) {
      return [
        current,
        (current + 1) % total,
      ];
    }

    return [
      (current - 1 + total) % total,
      current,
      (current + 1) % total,
    ];
  }, [current, total, visibleCount]);

  const featuredIndex = Math.min(visibleCount, total) === 3 ? 1 : 0;

  if (total === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      {/* ── Stats strip ── */}
      {!statsLoading && stats && (
        <div className="flex gap-2 rs2-fade-up">
          <MetricCard
            value={`${stats.averageRating}★`}
            label="Avg Rating"
            accent="#F59E0B"
          />
          <MetricCard
            value={`${stats.totalReviews}+`}
            label="Reviews"
          />
          <MetricCard
            value={`${Math.round((stats.verifiedCount / Math.max(stats.totalReviews, 1)) * 100)}%`}
            label="Verified"
            accent="#22C55E"
          />
          <MetricCard
            value={`${stats.happyFamilies}+`}
            label="Families"
            accent="#EC5F36"
          />
        </div>
      )}
      {statsLoading && (
        <div className="flex gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex-1 rs2-skeleton h-16 rounded-2xl" />
          ))}
        </div>
      )}

      {/* ── Progress bar ── */}
      <div className="h-[2px] bg-borderLight rounded-full overflow-hidden">
        <div
          key={progKey}
          className="rs2-progress-bar h-full"
          style={{
            animation: paused ? "none" : `rs2-progress ${INTERVAL}ms linear forwards`,
            transform: paused ? "scaleX(1)" : undefined,
          }}
        />
      </div>

      {/* ── Cards ── */}
      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="flex justify-center gap-4 overflow-hidden"
        >
          {visibleIndices.map((ri, slot) => {
            const isFeatured = slot === featuredIndex;
            return (
              <div
                key={reviews[ri]._id}
                className="rs2-review-card rs2-fade-up"
                style={{
                  transform: isFeatured ? "scale(1)" : "scale(0.95)",
                  opacity: isFeatured ? 1 : 0.72,
                  animationDelay: `${slot * 0.06}s`,
                }}
              >
                <ReviewCard
                  review={reviews[ri]}
                  index={ri}
                  isFeatured={isFeatured}
                />
              </div>
            );
          })}
        </div>

        {/* Nav arrows — overlaid */}
        <button
          onClick={() => advance(-1)}
          aria-label="Previous"
          className="absolute -left-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white border border-borderLight rounded-full flex items-center justify-center shadow-sm hover:border-primary hover:text-primary text-textLight transition-all duration-200 z-10 hover:shadow-md"
        >
          <ChevronLeft size={16} strokeWidth={2.5} />
        </button>
        <button
          onClick={() => advance(1)}
          aria-label="Next"
          className="absolute -right-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white border border-borderLight rounded-full flex items-center justify-center shadow-sm hover:border-primary hover:text-primary text-textLight transition-all duration-200 z-10 hover:shadow-md"
        >
          <ChevronRight size={16} strokeWidth={2.5} />
        </button>
      </div>

      {/* ── Dot nav ── */}
      <div className="flex items-center justify-center gap-1.5 pt-1">
        {reviews.map((_, i) => (
          <button
            key={i}
            className="rs2-dot"
            aria-label={`Go to review ${i + 1}`}
            onClick={() => { setCurrent(i); setProgKey((k) => k + 1); }}
            style={{
              height: 6,
              width: i === current ? 22 : 6,
              background: i === current ? "#EC5F36" : "#F1E3DE",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Star Input ───────────────────────────────────────────────────────────────
const StarInput = memo(({ value, onChange, error }) => {
  const [hover, setHover] = useState(0);
  const [justClicked, setJustClicked] = useState(0);

  const handleClick = (s) => {
    onChange(s);
    setJustClicked(s);
    setTimeout(() => setJustClicked(0), 420);
  };

  const display = hover || value;

  return (
    <div>
      <div className="flex items-center gap-1.5" role="radiogroup" aria-label="Star rating">
        {[1, 2, 3, 4, 5].map((s) => (
          <button
            key={s}
            type="button"
            role="radio"
            aria-checked={value === s}
            aria-label={`${s} star${s !== 1 ? "s" : ""}`}
            onClick={() => handleClick(s)}
            onMouseEnter={() => setHover(s)}
            onMouseLeave={() => setHover(0)}
            className={`rs2-star-btn ${justClicked === s ? "rs2-star-bounce" : ""}`}
          >
            <Star
              size={30}
              fill={s <= display ? "#F59E0B" : "#F1E3DE"}
              stroke={s <= display ? "#F59E0B" : "#F1E3DE"}
              strokeWidth={0.5}
            />
          </button>
        ))}
        {value > 0 && (
          <span className="rs2-fade-up ml-1 text-sm font-bold text-primary">
            {RATING_LABELS[value]}
          </span>
        )}
      </div>
      {error && (
        <p className="flex items-center gap-1 text-xs font-semibold text-red-500 mt-1.5">
          <AlertCircle size={11} /> {error}
        </p>
      )}
    </div>
  );
});

// ─── Review Form ──────────────────────────────────────────────────────────────
function ReviewForm({ onSubmitSuccess }) {
  const EMPTY = { name: "", city: "", rating: 0, text: "", serviceType: "" };
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState(false);

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((err) => ({ ...err, [k]: "" }));
    setApiError("");
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.city.trim()) e.city = "City is required";
    if (!form.rating) e.rating = "Please select a rating";
    if (!form.text.trim() || form.text.trim().length < 20)
      e.text = "Write at least 20 characters";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitting(true);
    setApiError("");
    try {
      const payload = {
        name: form.name.trim(),
        city: form.city.trim(),
        rating: Number(form.rating),
        text: form.text.trim(),
        serviceType: form.serviceType || "Other",
      };
      const res = await submitReview(payload);
      // Optimistic: pass new review up regardless of approval status
      const optimistic = {
        ...payload,
        _id: res?.data?._id || String(Date.now()),
        verified: false,
        hiringDuration: "",
        createdAt: new Date().toISOString(),
      };
      onSubmitSuccess(optimistic);
      setSuccess(true);
    } catch (err) {
      setApiError(err.message || "Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => { setForm(EMPTY); setErrors({}); setApiError(""); setSuccess(false); };

  // ── Success state ────────────────────────────────────────────────────────
  if (success) {
    return (
      <div className="rs2-success-in flex flex-col items-center text-center py-8 px-2 gap-4">
        <div className="relative">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#EC5F36,#D84E28)", boxShadow: "0 12px 36px rgba(236,95,54,0.32)" }}
          >
            <Check size={34} color="#fff" strokeWidth={3} />
          </div>
          {/* burst rings */}
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-full"
              style={{ border: "2px solid rgba(236,95,54,0.28)", animation: `rs2-burst 1.1s ease ${i * 0.22}s infinite` }}
            />
          ))}
        </div>
        <div>
          <h3 className="text-xl font-bold text-textDark mb-2" style={{ fontFamily: "'Fraunces',serif" }}>
            Thank you! 🎉
          </h3>
          <p className="text-sm text-textLight leading-relaxed max-w-[250px] mx-auto">
            Your review is live and helping other families make confident decisions.
          </p>
        </div>
        <button
          onClick={reset}
          className="px-6 py-2.5 rounded-xl text-sm font-bold text-primary border-2 border-primary/25 bg-primary/5 hover:bg-primary/10 transition-all duration-200"
        >
          Write Another Review
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      {/* Star rating */}
      <div>
        <label className="block text-xs font-bold text-textDark uppercase tracking-wider mb-2">
          Your Rating <span className="text-primary">*</span>
        </label>
        <StarInput
          value={form.rating}
          onChange={(r) => { setForm((f) => ({ ...f, rating: r })); setErrors((e) => ({ ...e, rating: "" })); }}
          error={errors.rating}
        />
      </div>

      {/* Name + City */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold text-textDark uppercase tracking-wider mb-1.5">
            Full Name <span className="text-primary">*</span>
          </label>
          <input
            className={`rs2-input ${errors.name ? "error" : ""}`}
            placeholder="e.g. Priya Sharma"
            value={form.name}
            onChange={set("name")}
          />
          {errors.name && (
            <p className="flex items-center gap-1 text-xs font-semibold text-red-500 mt-1">
              <AlertCircle size={10} /> {errors.name}
            </p>
          )}
        </div>
        <div>
          <label className="block text-xs font-bold text-textDark uppercase tracking-wider mb-1.5">
            City <span className="text-primary">*</span>
          </label>
          <CitySelect
            value={form.city}
            onChange={(val) => {
              setForm(f => ({ ...f, city: val }));
              setErrors(e => ({ ...e, city: "" }));
              setApiError("");
            }}
            placeholder="Select city"
          />
          {errors.city && (
            <p className="flex items-center gap-1 text-xs font-semibold text-red-500 mt-1">
              <AlertCircle size={10} /> {errors.city}
            </p>
          )}
        </div>
      </div>

      {/* Service type */}
      <div>
        <label className="block text-xs font-bold text-textDark uppercase tracking-wider mb-1.5">
          Service Hired
        </label>
        <select
          className="rs2-select rs2-input"
          value={form.serviceType}
          onChange={set("serviceType")}
        >
          <option value="">Select a service…</option>
          {SERVICES_LIST.map((s) => (
            <option key={s} value={s}>{SERVICE_ICONS[s]} {s}</option>
          ))}
        </select>
      </div>

      {/* Review text */}
      <div>
        <label className="block text-xs font-bold text-textDark uppercase tracking-wider mb-1.5">
          Your Review <span className="text-primary">*</span>
        </label>
        <textarea
          className={`rs2-textarea ${errors.text ? "error" : ""}`}
          rows={4}
          placeholder="Tell other families what made your experience great…"
          value={form.text}
          onChange={set("text")}
          maxLength={250}
        />
        <div className="flex justify-between items-center mt-1">
          {errors.text
            ? <p className="flex items-center gap-1 text-xs font-semibold text-red-500"><AlertCircle size={10} /> {errors.text}</p>
            : <span />
          }
          <span className={`text-[11px] font-medium ml-auto ${form.text.length > 450 ? "text-primary" : "text-textLight/50"}`}>
            {form.text.length}/250
          </span>
        </div>
      </div>

      {/* API error */}
      {apiError && (
        <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          <AlertCircle size={14} className="text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs font-semibold text-red-600">{apiError}</p>
        </div>
      )}

      {/* Submit */}
      <button type="submit" disabled={submitting} className="rs2-submit-btn">
        {submitting ? (
          <><Loader2 size={15} className="animate-spin" /> Submitting…</>
        ) : (
          <>
            Submit My Review
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </>
        )}
      </button>

      {/* Trust note */}
      <p className="flex items-center justify-center gap-1.5 text-[11px] text-textLight text-center">
        <ShieldCheck size={11} className="text-green-500" strokeWidth={2.5} />
        Reviews are verified by our team before publishing
      </p>
    </form>
  );
}

// ─── Loading skeletons ────────────────────────────────────────────────────────
function CarouselSkeleton({ count = 3 }) {
  return (
    <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${count},1fr)` }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white border border-borderLight rounded-2xl p-5 flex flex-col gap-3">
          <div className="rs2-skeleton h-4 w-24 rounded" />
          <div className="rs2-skeleton h-3 w-full rounded" />
          <div className="rs2-skeleton h-3 w-4/5 rounded" />
          <div className="rs2-skeleton h-3 w-3/5 rounded" />
          <div className="flex items-center gap-2 mt-2">
            <div className="rs2-skeleton w-9 h-9 rounded-full" />
            <div className="flex flex-col gap-1 flex-1">
              <div className="rs2-skeleton h-3 w-24 rounded" />
              <div className="rs2-skeleton h-2.5 w-16 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function ReviewSection() {
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState(null);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  // ── Fetch on mount ──────────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    const loadReviews = async () => {
      try {
        const data = await fetchReviews();
        if (!cancelled) setReviews(data?.data?.length ? data.data : MOCK_REVIEWS);
      } catch {
        if (!cancelled) {
          setReviews(MOCK_REVIEWS);
          setFetchError("Showing sample reviews — could not reach server.");
        }
      } finally {
        if (!cancelled) setReviewsLoading(false);
      }
    };

    const loadStats = async () => {
      try {
        const data = await fetchStats();
        if (!cancelled) setStats(data?.data || MOCK_STATS);
      } catch {
        if (!cancelled) setStats(MOCK_STATS);
      } finally {
        if (!cancelled) setStatsLoading(false);
      }
    };

    loadReviews();
    loadStats();
    return () => { cancelled = true; };
  }, []);

  // ── Optimistic review prepend ────────────────────────────────────────────────
  const handleNewReview = useCallback((review) => {
    setReviews((prev) => [review, ...prev]);
    setStats((s) =>
      s
        ? {
          ...s,
          totalReviews: s.totalReviews + 1,
          happyFamilies: s.happyFamilies + 1,
          averageRating:
            Math.round(
              ((s.averageRating * s.totalReviews + review.rating) / (s.totalReviews + 1)) * 10
            ) / 10,
        }
        : s
    );
  }, []);

  return (
    <>
      <style>{CSS}</style>

      <section className="bg-bgLight border-y border-borderLight">
        <div className="max-w-7xl mx-auto px-6 py-24 scroll-section">

          {/* ── Section heading ── */}
          <div className="text-center mb-14">
            <span className="inline-block bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">
              Client Stories
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-textDark mb-3">
              Trusted by Families Across India
            </h2>
            <p className="text-textLight max-w-xl mx-auto">
              Real experiences from families who found verified, trustworthy domestic professionals through Domestic Pro.
            </p>
          </div>

          {/* ── Two-column body ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[38%_1fr] gap-10 items-start">

            {/* ── LEFT: Form ── */}
            <div
              className="bg-white border border-borderLight rounded-3xl p-7"
              style={{ boxShadow: "0 4px 28px rgba(236,95,54,0.08), 0 1px 6px rgba(0,0,0,0.04)" }}
            >
              {/* Card header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg,#EC5F36,#D84E28)" }}
                >
                  <Star size={17} fill="#fff" stroke="none" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-textDark" style={{ fontFamily: "'Fraunces',serif" }}>
                    Share Your Experience
                  </h3>
                  <p className="text-xs text-textLight mt-0.5">Hired through Domestic Pro? Your review helps thousands.</p>
                </div>
              </div>

              <ReviewForm onSubmitSuccess={handleNewReview} />
            </div>

            {/* ── RIGHT: Carousel ── */}
            <div className="px-5 overflow-visible">
              {fetchError && (
                <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 mb-4">
                  <AlertCircle size={13} className="text-amber-600 flex-shrink-0" />
                  <p className="text-xs font-medium text-amber-700">{fetchError}</p>
                </div>
              )}

              {reviewsLoading ? (
                <div className="flex flex-col gap-4">
                  <div className="flex gap-2">
                    {[0, 1, 2, 3].map((i) => <div key={i} className="flex-1 rs2-skeleton h-16 rounded-2xl" />)}
                  </div>
                  <div className="rs2-skeleton h-1 rounded-full" />
                  <CarouselSkeleton count={3} />
                </div>
              ) : (
                <ReviewCarousel
                  reviews={reviews}
                  stats={stats}
                  statsLoading={statsLoading}
                />
              )}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}