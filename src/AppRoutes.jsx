import { lazy, Suspense, useState, useEffect, useRef } from "react";
import {
  Routes, Route, useLocation, matchRoutes, useNavigate
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Loader from "./components/Loader";
import Home from "./pages/Home";
import GeneratePaymentLink from "./components/GeneratePaymentLink";
// import DemandForm from "./components/DemandForm";
// import AgentForm from "./components/AgentForm";
// import SupplyForm from "./components/SupplyForm";
// import ThankYou from "./components/ThankYou";
// import PaymentStatus from "./pages/PaymentStatus";


const DemandForm = lazy(() => import("./components/DemandForm"));
const AgentForm = lazy(() => import("./components/AgentForm"));
const SupplyForm = lazy(() => import("./components/SupplyForm"));
const ThankYou = lazy(() => import("./components/ThankYou"));
const PaymentStatus = lazy(() => import("./pages/PaymentStatus"));
const Pay = lazy(() => import("./pages/PaymentPage"))

const AboutUs = lazy(() => import("./pages/AboutUs"));
const ReferHelper = lazy(() => import("./pages/ReferAHelper"));
const ReferHousehold = lazy(() => import("./pages/ReferAHousehold"));
const Pricing = lazy(() => import("./pages/Pricing"));
const ContactNow = lazy(() => import("./pages/ContectNow"));
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
const FeedbackForm = lazy(() => import("./pages/FeedbackForm"));
const WhatsAppInbox = lazy(() => import("./pages/WhatsAppInbox"));
const TrialFeedbackForm = lazy(() => import("./pages/TrialFeedbackForm"));


export const routes = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <AboutUs /> },
  { path: "/refer-a-helper", element: <ReferHelper /> },
  { path: "/refer-a-household", element: <ReferHousehold /> },
  { path: "/pricing", element: <Pricing /> },
  { path: "/contact", element: <ContactNow /> },
  { path: "/services/baby-caretaker", element: <Nanny /> },
  { path: "/services/cooking-help", element: <Cook /> },
  { path: "/services/drivers", element: <Driver /> },
  { path: "/services/japa", element: <Japa /> },
  { path: "/services/live-in-support", element: <HouseHelp /> },
  { path: "/services/patient-care", element: <PatientCare /> },
  { path: "/terms-and-conditions", element: <TermsAndCondition /> },
  { path: "/refund-policy", element: <RefundPolicy /> },
  { path: "/privacy-policy", element: <PrivacyPolicy /> },
  { path: "/whatsapp-inbox", element: <WhatsAppInbox /> },
  
];

const HIDE_LAYOUT_PATHS = new Set([
  "/demand-form",
  "/agent-form",
  "/supply-form",
  "/thank-you",
  "/payment-status",
  "/generate-payment-link",
  "/pay",
  "/whatsapp-inbox",
  "/trial-feedback"
]);

// Module-level set — persists across renders, never causes re-render
const loadedPaths = new Set(["/"]);

export default function AppRoutes() {
  const location = useLocation();
  const navigate = useNavigate();

  // isNavigating starts false — NEVER true on server or during hydration
  // Only becomes true on client AFTER hydration, during navigation
  const [isNavigating, setIsNavigating] = useState(false);
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    // This entire effect only runs on client, never during SSR or hydration
    const currentPath = location.pathname;
    const prevPath = prevPathRef.current;

    // Navigation occurred
    if (currentPath !== prevPath) {
      prevPathRef.current = currentPath;

      // Only show loader if this path's chunk hasn't been loaded yet
      if (!loadedPaths.has(currentPath)) {
        setIsNavigating(true);
        const timer = setTimeout(() => {
          loadedPaths.add(currentPath);
          setIsNavigating(false);
        }, 400);
        return () => clearTimeout(timer);
      }
    }
  }, [location.pathname]);

  const matchedPublicRoute = matchRoutes(routes, location);
  const isHideLayout = HIDE_LAYOUT_PATHS.has(location.pathname);
  const is404 = !matchedPublicRoute && !isHideLayout;
  const showLayout = !isHideLayout && !is404;
  console.log(is404, showLayout);

  return (
    <>
      <ScrollToTop />
      {showLayout && <Navbar />}
      {isNavigating && <Loader />}
      <Suspense fallback={null}>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
            />
          ))}
          <Route path="/demand-form" element={<DemandForm />} />
          <Route path="/agent-form" element={<AgentForm />} />
          <Route path="/supply-form" element={<SupplyForm />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/payment-status" element={<PaymentStatus />} />
          <Route path="/generate-payment-link" element={<GeneratePaymentLink />} />
          <Route path="/pay" element={<Pay />} />
          <Route path="/feedback" element={<FeedbackForm />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/trial-feedback" element={<TrialFeedbackForm />} />
        </Routes>
      </Suspense>
      {showLayout && <Footer />}
    </>
  );
}