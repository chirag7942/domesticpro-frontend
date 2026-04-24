import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  matchRoutes,
} from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";

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
import AppRoutes from "./AppRoutes.jsx";

/* -------- Lazy Loaded Pages -------- */
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

/* -------- Route Config -------- */

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

/* -------- Layout -------- */

function Layout() {
  const location = useLocation();
  const [showIntro, setShowIntro] = useState(false);

  const matchedRoute = matchRoutes(routes, location);
  const is404 = !matchedRoute;

  useEffect(() => {
    import("./pages/Pricing");
    import("./pages/ContectNow");
    import("./pages/AboutUs");
  }, []);

  return (
    <>
      <ScrollToTop />
      {showIntro && (
        <Suspense fallback={null}>
          <RibbonAnimation onComplete={() => setShowIntro(false)} />
        </Suspense>
      )}
      {!is404 && <Navbar />}
      <Suspense fallback={<Loader />}>
        <AppRoutes />
      </Suspense>

      {!is404 && <Footer />}
    </>
  );
}

/* -------- App Root -------- */

export default function App() {
  return (
    <Layout />
  );
}