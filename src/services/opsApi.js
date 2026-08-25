const API_BASE_URL = String(
  import.meta.env.VITE_API_BASE_URL ||
    (import.meta.env.DEV
      ? "http://localhost:8000"
      : "https://domestic-pro-backend.onrender.com"),
).replace(/\/$/, "");
const TOKEN_KEY = "domestic-pro-ops-access";

export function getOpsToken() {
  if (typeof window === "undefined") return "";
  return window.sessionStorage.getItem(TOKEN_KEY) || "";
}

export function setOpsToken(token) {
  if (typeof window !== "undefined") {
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
}

export function clearOpsToken() {
  if (typeof window !== "undefined") {
    window.sessionStorage.removeItem(TOKEN_KEY);
  }
}

export async function opsRequest(path, { body, method = "GET", token } = {}) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 12_000);
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        ...(body ? { "Content-Type": "application/json" } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      method,
      signal: controller.signal,
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      const error = new Error(payload.error || "Request could not be completed");
      error.status = response.status;
      throw error;
    }
    return payload;
  } finally {
    window.clearTimeout(timeout);
  }
}

export function loginOps(email, password) {
  return opsRequest("/api/ops/auth/login", {
    body: { email, password },
    method: "POST",
  });
}

export function loadOpsAccount(token) {
  return opsRequest("/api/ops/auth/me", { token });
}

export function loadOpsTrials(token) {
  return opsRequest("/api/ops/trials", { token });
}

export function logoutOps(token) {
  return opsRequest("/api/ops/auth/logout", { method: "POST", token });
}
