import axios from "axios";

const BASE = import.meta.env.VITE_REACT_APP_API || "";

const api = axios.create({
  baseURL: BASE,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// ── Interceptors ────────────────────────────────────────────────────────────
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err.message ||
      "Something went wrong";
    return Promise.reject(new Error(message));
  },
);

// ── Endpoints ────────────────────────────────────────────────────────────────

/**
 * Fetch all approved reviews (newest first)
 * GET /api/reviews
 */
export const fetchReviews = () =>
  api.get("/reviews/get-reviews").then((r) => r.data);

/**
 * Fetch aggregate stats
 * GET /api/reviews/stats
 * @returns {{ averageRating, totalReviews, verifiedCount, happyFamilies }}
 */
export const fetchStats = () => api.get("/reviews/stats").then((r) => r.data);

/**
 * Submit a new review
 * POST /api/reviews
 * @param {{ name, city, rating, text, serviceType }} payload
 */
export const submitReview = (payload) =>
  api.post("/reviews/add-review", payload).then((r) => r.data);
