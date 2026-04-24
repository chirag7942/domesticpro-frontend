/**
 * src/utils/browserOnly.js
 *
 * Utilities to safely guard browser-only APIs during SSR/prerendering.
 *
 * During prerendering, this code runs in Node.js where:
 *   - window is undefined
 *   - document is undefined
 *   - localStorage / sessionStorage don't exist
 *   - navigator doesn't exist
 *
 * Use these guards anywhere you access browser APIs.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * USAGE EXAMPLES:
 *
 *   // Inside a component
 *   import { isBrowser, safeWindow } from '../utils/browserOnly';
 *
 *   // Safe localStorage access
 *   const stored = isBrowser ? localStorage.getItem('key') : null;
 *
 *   // Safe sessionStorage
 *   const id = isBrowser ? sessionStorage.getItem('dp_drop_lead_id') : '';
 *
 *   // In useEffect (always safe — effects never run during SSR)
 *   useEffect(() => {
 *     const id = sessionStorage.getItem('dp_drop_lead_id');
 *   }, []);
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** True only in real browser environment */
export const isBrowser = typeof window !== "undefined";

/** Safe access to window object */
export const safeWindow = isBrowser ? window : {};

/** Safe access to document */
export const safeDocument = isBrowser ? document : {};

/**
 * Safe localStorage wrapper — returns null in SSR context
 */
export const safeLocalStorage = {
  getItem: (key) => (isBrowser ? localStorage.getItem(key) : null),
  setItem: (key, value) => {
    if (isBrowser) localStorage.setItem(key, value);
  },
  removeItem: (key) => {
    if (isBrowser) localStorage.removeItem(key);
  },
};

/**
 * Safe sessionStorage wrapper — returns null in SSR context
 */
export const safeSessionStorage = {
  getItem: (key) => (isBrowser ? sessionStorage.getItem(key) : null),
  setItem: (key, value) => {
    if (isBrowser) sessionStorage.setItem(key, value);
  },
  removeItem: (key) => {
    if (isBrowser) sessionStorage.removeItem(key);
  },
};
