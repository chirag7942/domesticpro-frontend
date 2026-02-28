import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Nanny from "./pages/products/Nanny";
import Cook from "./pages/products/Cook";
import Driver from "./pages/products/Driver";
import HouseHelp from "./pages/products/HouseHelp";
import AboutUs from "./pages/AboutUs";
import Referrals from "./pages/Referrals";
import Pricing from "./pages/Pricing";
import ContectNow from "./pages/ContectNow";
import TermstAndCondition from "./pages/TermsAndCondition";
import RefundPolicy from "./pages/RefundPolicy";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import PatientCare from "./pages/products/PatientCare";
import ScrollToTop from "./components/ScrollToTop";
import Japa from "./pages/products/Japa";
import OnDemand from "./pages/products/OnDemand";
import AllRounder from "./pages/products/AllRounder";
import { useEffect, useState } from "react";
import Loader from "./components/Loader";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate initial app load
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/refer" element={<Referrals />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/on-demand" element={<OnDemand />} />
          <Route path="/all-rounder" element={<AllRounder />} />
          <Route path="/contact" element={<ContectNow />} />
          <Route path="/baby-caretaker" element={<Nanny />} />
          <Route path="/cooking-help" element={<Cook />} />
          <Route path="/drivers" element={<Driver />} />
          <Route path="/japa" element={<Japa />} />
          <Route path="/live-in-support" element={<HouseHelp />} />
          <Route path="/terms&condition" element={<TermstAndCondition />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/patient-care" element={<PatientCare />} />
        </Routes>
      )}

      <Footer />
    </BrowserRouter>
  );
}
