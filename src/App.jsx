// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   useLocation,
//   matchRoutes,
// } from "react-router-dom";
// import { lazy, Suspense, useEffect, useState } from "react";

// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import Home from "./pages/Home";
// import ScrollToTop from "./components/ScrollToTop";
// import Loader from "./components/Loader";
// import PaymentStatus from "./pages/PaymentStatus";
// import RibbonCutting from "./components/RibbonCutting";
// import SupplyForm from "./components/SupplyForm";
// import AgentForm from "./components/AgentForm";
// import DemandForm from "./components/DemandForm";
// import ThankYou from "./components/ThankYou";

// /* -------- Lazy Loaded Pages -------- */
// // const RibbonAnimation = lazy(() => import('./components/RibbonCutting'))
// const AboutUs = lazy(() => import("./pages/AboutUs"));
// const ReferHelper = lazy(() => import("./pages/ReferAHelper"));
// const ReferHousehold = lazy(() => import("./pages/ReferAHousehold"));
// const Pricing = lazy(() => import("./pages/Pricing"));
// const ContectNow = lazy(() => import("./pages/ContectNow"));

// const Nanny = lazy(() => import("./pages/products/Nanny"));
// const Cook = lazy(() => import("./pages/products/Cook"));
// const Driver = lazy(() => import("./pages/products/Driver"));
// const HouseHelp = lazy(() => import("./pages/products/HouseHelp"));
// const PatientCare = lazy(() => import("./pages/products/PatientCare"));
// const Japa = lazy(() => import("./pages/products/Japa"));

// const TermstAndCondition = lazy(() => import("./pages/TermsAndCondition"));
// const RefundPolicy = lazy(() => import("./pages/RefundPolicy"));
// const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));

// const NotFound = lazy(() => import("./pages/NotFound"));

// /* -------- Route Config -------- */

// export const routes = [
//   { path: "/", element: <Home /> },
//   { path: "/about", element: <AboutUs /> },
//   { path: "/refer-a-helper", element: <ReferHelper /> },
//   { path: "/refer-a-household", element: <ReferHousehold /> },
//   { path: "/pricing", element: <Pricing /> },
//   { path: "/contact", element: <ContectNow /> },
//   { path: "/services/baby-caretaker", element: <Nanny /> },
//   { path: "/services/cooking-help", element: <Cook /> },
//   { path: "/payment-status", element: <PaymentStatus /> },
//   { path: "/services/drivers", element: <Driver /> },
//   { path: "/services/japa", element: <Japa /> },
//   { path: "/services/live-in-support", element: <HouseHelp /> },
//   { path: "/services/patient-care", element: <PatientCare /> },
//   { path: "/terms-and-conditions", element: <TermstAndCondition /> },
//   { path: "/refund-policy", element: <RefundPolicy /> },
//   { path: "/privacy-policy", element: <PrivacyPolicy /> },
// ];

// const HIDE_LAYOUT_PATHS = new Set([
//   "/demand-form",
//   "/agent-form",
//   "/supply-form",
//   "/thank-you",
//   // NotFound (*) is handled by is404 below
// ]);

// /* -------- Layout -------- */

// function Layout({ fallback }) {
//   const location = useLocation();
//   const [showIntro, setShowIntro] = useState(false);

//   const matchedRoute = matchRoutes(routes, location);
//   const is404 = !matchedRoute;
//   const hideLayout = is404 || HIDE_LAYOUT_PATHS.has(location.pathname);

//   useEffect(() => {
//     import("./pages/Pricing");
//     import("./pages/ContectNow");
//     import("./pages/AboutUs");
//   }, []);

//   return (
//     <>
//       <ScrollToTop />
//       {!hideLayout && <Navbar />}
//       <Suspense fallback={fallback}>
//         <Routes>
//           {routes.map((route) => (
//             <Route key={route.path} path={route.path} element={route.element} />
//           ))}
//           <Route path="*" element={<NotFound />} />
//           <Route path="/demand-form" element={<DemandForm />} />
//           <Route path="/agent-form" element={<AgentForm />} />
//           <Route path="/supply-form" element={<SupplyForm />} />
//           <Route path="/thank-you" element={<ThankYou />} />
//         </Routes>
//       </Suspense>
//       {!hideLayout && <Footer />}
//     </>
//   );
// }

// /* -------- App Root -------- */

// export default function App({ fallback }) {
//   return (
//     <Layout fallback={fallback} />
//   );
// }



import { Routes, Route, useLocation, matchRoutes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ReferHelper from "./pages/ReferAHelper";
import ReferHousehold from "./pages/ReferAHousehold";
import Pricing from "./pages/Pricing";
import ContactNow from "./pages/ContectNow";

import Nanny from "./pages/products/Nanny";
import Cook from "./pages/products/Cook";
import Driver from "./pages/products/Driver";
import HouseHelp from "./pages/products/HouseHelp";
import PatientCare from "./pages/products/PatientCare";
import Japa from "./pages/products/Japa";

import TermsAndCondition from "./pages/TermsAndCondition";
import RefundPolicy from "./pages/RefundPolicy";
import PrivacyPolicy from "./pages/PrivacyPolicy";

import DemandForm from "./components/DemandForm";
import AgentForm from "./components/AgentForm";
import SupplyForm from "./components/SupplyForm";
import ThankYou from "./components/ThankYou";
import PaymentStatus from "./pages/PaymentStatus";
import NotFound from "./pages/NotFound";

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
];

const HIDE_LAYOUT_PATHS = new Set([
  "/demand-form",
  "/agent-form",
  "/supply-form",
  "/thank-you",
  "/payment-status",
]);

export default function AppRoutesServer() {
  const location = useLocation();

  const matchedPublicRoute = matchRoutes(routes, location);
  const isHideLayout = HIDE_LAYOUT_PATHS.has(location.pathname);
  const is404 = !matchedPublicRoute && !isHideLayout;
  const showLayout = !isHideLayout && !is404;

  return (
    <>
      <ScrollToTop />
      {showLayout && <Navbar />}

      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}

        <Route path="/demand-form" element={<DemandForm />} />
        <Route path="/agent-form" element={<AgentForm />} />
        <Route path="/supply-form" element={<SupplyForm />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/payment-status" element={<PaymentStatus />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {showLayout && <Footer />}
    </>
  );
}