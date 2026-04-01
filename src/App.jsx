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
import ScrollToTop from "./components/ScrollToTop";
import Loader from "./components/Loader";
import PaymentStatus from "./pages/PaymentStatus";
import RibbonCutting from "./components/RibbonCutting";

/* -------- Lazy Loaded Pages -------- */

const Home = lazy(() => import("./pages/Home"));
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

const routes = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <AboutUs /> },
  { path: "/refer-a-helper", element: <ReferHelper /> },
  { path: "/refer-a-household", element: <ReferHousehold /> },
  { path: "/pricing", element: <Pricing /> },
  { path: "/contact", element: <ContectNow /> },
  { path: "/baby-caretaker", element: <Nanny /> },
  { path: "/cooking-help", element: <Cook /> },
  { path: "/payment-status", element: <PaymentStatus /> },
  { path: "/drivers", element: <Driver /> },
  { path: "/japa", element: <Japa /> },
  { path: "/live-in-support", element: <HouseHelp /> },
  { path: "/patient-care", element: <PatientCare /> },
  { path: "/terms&condition", element: <TermstAndCondition /> },
  { path: "/refund-policy", element: <RefundPolicy /> },
  { path: "/privacy-policy", element: <PrivacyPolicy /> },
];

/* -------- Layout -------- */

function Layout() {
  const location = useLocation();
  const [showIntro, setShowIntro] = useState(true);

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
      {showIntro && <RibbonCutting onComplete={() => setShowIntro(false)} />}
      {!is404 && <Navbar />}

      <Suspense fallback={<Loader />}>
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      {!is404 && <Footer />}
    </>
  );
}

/* -------- App Root -------- */

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}