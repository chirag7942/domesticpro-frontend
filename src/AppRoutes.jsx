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

import { lazy, Suspense, useState } from "react";
import { Routes, Route, useLocation, matchRoutes } from "react-router-dom";

// ── Eager imports (small, always needed) ─────────────────────────────────────

// ── Lazy imports (larger pages, code-split) ───────────────────────────────────
// Lazy imports work fine for SSG — renderToString awaits them.
// If you have issues with lazy + SSG, switch the problem import to eager.
const RibbonAnimation = lazy(() => import('./components/RibbonCutting'))
const AboutUs = lazy(() => import("./pages/AboutUs"));
const ReferHelper = lazy(() => import("./pages/ReferAHelper"));
const ReferHousehold = lazy(() => import("./pages/ReferAHousehold"));
const Pricing = lazy(() => import("./pages/Pricing"));
const ContectNow = lazy(() => import("./pages/ContectNow"));

const Nanny = lazy(() => import("./pages/products/Nanny"));
const Cook = lazy(() => import("./pages/products/Cook"));
const Driver = lazy(() => import("./pages/products/Driver"));
const HouseHelp = lazy(() => import("./pages/products/HouseHelp"));
const PatientCare = lazy(() => import("./pages/products/PatientCare"));
const Japa = lazy(() => import("./pages/products/Japa"));

const TermstAndCondition = lazy(() => import("./pages/TermsAndCondition"));
const RefundPolicy = lazy(() => import("./pages/RefundPolicy"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));

const NotFound = lazy(() => import("./pages/NotFound"));

// ── Non-SEO internal forms (noIndex=true in their SEO component) ──────────────
// These are still rendered but won't be indexed. Keep them here so SSR works.
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ScrollToTop from "./components/ScrollToTop";
import Loader from "./components/Loader";
import PaymentStatus from "./pages/PaymentStatus";
import RibbonCutting from "./components/RibbonCutting";
import SupplyForm from "./components/SupplyForm";
import AgentForm from "./components/AgentForm";
import DemandForm from "./components/DemandForm";
import ThankYou from "./components/ThankYou";

export const routes = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <AboutUs /> },
  { path: "/refer-a-helper", element: <ReferHelper /> },
  { path: "/refer-a-household", element: <ReferHousehold /> },
  { path: "/pricing", element: <Pricing /> },
  { path: "/contact", element: <ContectNow /> },
  { path: "/services/baby-caretaker", element: <Nanny /> },
  { path: "/services/cooking-help", element: <Cook /> },
  { path: "/payment-status", element: <PaymentStatus /> },
  { path: "/services/drivers", element: <Driver /> },
  { path: "/services/japa", element: <Japa /> },
  { path: "/services/live-in-support", element: <HouseHelp /> },
  { path: "/services/patient-care", element: <PatientCare /> },
  { path: "/terms-and-conditions", element: <TermstAndCondition /> },
  { path: "/refund-policy", element: <RefundPolicy /> },
  { path: "/privacy-policy", element: <PrivacyPolicy /> },
];

export default function AppRoutes() {
  const location = useLocation();
  const [showIntro, setShowIntro] = useState(false);

  const matchedRoute = matchRoutes(routes, location);
  const is404 = !matchedRoute;

  return (
    <>
      {showIntro && (
        <Suspense fallback={null}>
          <RibbonAnimation onComplete={() => setShowIntro(false)} />
        </Suspense>
      )}
      {!is404 && <Navbar />}
      <Suspense fallback={<Loader />}>
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
          <Route path="*" element={<NotFound />} />
          <Route path="/demand-form" element={<DemandForm />} />
          <Route path="/agent-form" element={<AgentForm />} />
          <Route path="/supply-form" element={<SupplyForm />} />
          <Route path="/thank-you" element={<ThankYou />} />
        </Routes>
      </Suspense>

      {!is404 && <Footer />}
    </>
  );
}