import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  matchRoutes,
} from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Loader from "./components/Loader";

/* -------- Lazy Loaded Pages -------- */

const Home = lazy(() => import("./pages/Home"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Referrals = lazy(() => import("./pages/Referrals"));
const Pricing = lazy(() => import("./pages/Pricing"));
const ContectNow = lazy(() => import("./pages/ContectNow"));

const Nanny = lazy(() => import("./pages/products/Nanny"));
const Cook = lazy(() => import("./pages/products/Cook"));
const Driver = lazy(() => import("./pages/products/Driver"));
const HouseHelp = lazy(() => import("./pages/products/HouseHelp"));
const PatientCare = lazy(() => import("./pages/products/PatientCare"));
const Japa = lazy(() => import("./pages/products/Japa"));
const OnDemand = lazy(() => import("./pages/products/OnDemand"));
const AllRounder = lazy(() => import("./pages/products/AllRounder"));

const TermstAndCondition = lazy(() => import("./pages/TermsAndCondition"));
const RefundPolicy = lazy(() => import("./pages/RefundPolicy"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));

const NotFound = lazy(() => import("./pages/NotFound"));

/* -------- Route Config -------- */

const routes = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <AboutUs /> },
  { path: "/refer", element: <Referrals /> },
  { path: "/pricing", element: <Pricing /> },
  { path: "/on-demand", element: <OnDemand /> },
  { path: "/all-rounder", element: <AllRounder /> },
  { path: "/contact", element: <ContectNow /> },
  { path: "/baby-caretaker", element: <Nanny /> },
  { path: "/cooking-help", element: <Cook /> },
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

  /* detect 404 route */
  const matchedRoute = matchRoutes(routes, location);
  const is404 = !matchedRoute;

  /* Prefetch important pages in background */
  useEffect(() => {
    import("./pages/Pricing");
    import("./pages/ContectNow");
    import("./pages/AboutUs");
  }, []);

  return (
    <>
      <ScrollToTop />

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
