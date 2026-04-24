/**
 * AppRoutes.jsx
 *
 * Extracted route tree — used by BOTH:
 *   - src/main.jsx        (client entry, wrapped in BrowserRouter)
 *   - src/entry-server.jsx (server/SSG entry, wrapped in StaticRouter)
 *
 * Keep this file free of any browser-only top-level code.
 * Browser-only code inside components should be guarded:
 *   if (typeof window !== 'undefined') { ... }
 *   or use useEffect(() => { ... }, []) which only runs client-side.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * INSTRUCTIONS FOR YOUR PROJECT:
 *
 * This file mirrors the <Routes> block currently inside your App.jsx / main.jsx.
 * Copy your existing route definitions here.
 *
 * Example (replace with YOUR actual routes):
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// ── Eager imports (small, always needed) ─────────────────────────────────────
import Home from "./pages/Home";

// ── Lazy imports (larger pages, code-split) ───────────────────────────────────
// Lazy imports work fine for SSG — renderToString awaits them.
// If you have issues with lazy + SSG, switch the problem import to eager.
const AboutUs = lazy(() => import("./pages/AboutUs"));
const ContactPage = lazy(() => import("./pages/ContectNow"));
const Pricing = lazy(() => import("./pages/Pricing"));
const ReferHelper = lazy(() => import("./pages/ReferAHelper"));
const ReferHousehold = lazy(() => import("./pages/ReferAHousehold"));

const Nanny = lazy(() => import("./pages/products/Nanny"));
const Cook = lazy(() => import("./pages/products/Cook"));
const Driver = lazy(() => import("./pages/products/Driver"));
const HouseHelp = lazy(() => import("./pages/products/HouseHelp"));
const PatientCare = lazy(() => import("./pages/products/PatientCare"));
const Japa = lazy(() => import("./pages/products/Japa"));

const TermsAndCondition = lazy(() => import("./pages/TermsAndCondition"));
const RefundPolicy = lazy(() => import("./pages/RefundPolicy"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const NotFound = lazy(() => import("./pages/NotFound"));

// ── Non-SEO internal forms (noIndex=true in their SEO component) ──────────────
// These are still rendered but won't be indexed. Keep them here so SSR works.
import SupplyForm from "./components/SupplyForm";
import AgentForm from "./components/AgentForm";
import DemandForm from "./components/DemandForm";
import ThankYou from "./components/ThankYou";
import PaymentStatus from "./pages/PaymentStatus";

export default function AppRoutes() {
  return (
    <Suspense fallback={null}>
      <Routes>
        {/* ── Public SEO routes ────────────────────────────────────────────── */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/refer-a-helper" element={<ReferHelper />} />
        <Route path="/refer-a-household" element={<ReferHousehold />} />

        {/* ── Service pages ────────────────────────────────────────────────── */}
        <Route path="/services/baby-caretaker" element={<Nanny />} />
        <Route path="/services/cooking-help" element={<Cook />} />
        <Route path="/services/drivers" element={<Driver />} />
        <Route path="/services/japa" element={<Japa />} />
        <Route path="/services/live-in-support" element={<HouseHelp />} />
        <Route path="/services/patient-care" element={<PatientCare />} />

        {/* ── Legal pages ──────────────────────────────────────────────────── */}
        <Route path="/terms-and-conditions" element={<TermsAndCondition />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        {/* ── Internal / non-indexed routes ────────────────────────────────── */}
        <Route path="/demand-form" element={<DemandForm />} />
        <Route path="/agent-form" element={<AgentForm />} />
        <Route path="/supply-form" element={<SupplyForm />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/payment-status" element={<PaymentStatus />} />

        {/* ── 404 ──────────────────────────────────────────────────────────── */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}