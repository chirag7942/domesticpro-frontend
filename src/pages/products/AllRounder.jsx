import React, { useState, useEffect } from "react";

import houseKeeperImg from "../../assets/all-rounder.jpeg";
import HeroWizard from "../../components/HeroWizard";
import CommonModal from "../../components/CommonModal";

const Japa = () => {
  const [modalType, setModalType] = useState(null);

  const openModal = (type) => setModalType(type);
  const closeModal = () => setModalType(null);

  useEffect(() => {
    const sections = document.querySelectorAll(".scroll-section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.15 },
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section className="bg-bgLight py-20 relative overflow-hidden">
        {/* ===== Decorative Circles ===== */}

        {/* Top Right Circle */}
        <div
          className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 
                  w-[400px] h-[400px] bg-primary/30 rounded-full 
                  blur-3xl z-0"
        ></div>

        {/* Bottom Left Circle */}
        <div
          className="absolute bottom-0 left-0 -translate-x-1/3 translate-y-1/3 
                  w-[400px] h-[400px] bg-primary/30 rounded-full 
                  blur-3xl z-0"
        ></div>

        {/* ===== Content Wrapper ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <div className="animate-left">
            <h1 className="text-4xl md:text-5xl font-bold text-textDark leading-tight mb-6">
              Professional <span className="text-primary">All-Rounder</span>{" "}
              <br /> for <span className="text-primary">Complete Home </span>{" "}
              Care
            </h1>

            <ul className="text-textLight mb-8 space-y-3">
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                  ✓
                </span>
                <span>Experienced in baby & elderly caretaker services</span>
              </li>

              <li className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                  ✓
                </span>
                <span>Skilled home cook for daily meals & special diets</span>
              </li>

              <li className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                  ✓
                </span>
                <span>Reliable driver for local travel & school drops</span>
              </li>

              <li className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                  ✓
                </span>
                <span>Complete housekeeping & household management</span>
              </li>

              <li className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                  ✓
                </span>
                <span>Available for full-time & 24x7 live-in support</span>
              </li>
            </ul>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => openModal("general")}
                className="bg-primary hover:bg-primaryHover text-white px-6 py-3 rounded-xl font-semibold transition duration-300 shadow-md"
              >
                Hire Now
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center md:justify-end animate-right">
            <img
              src={houseKeeperImg}
              alt="Domestic Pro Japa "
              className="rounded-2xl shadow-xl w-full h-[350px] md:h-[480px]  max-w-md object-cover"
            />
          </div>
        </div>
      </section>

      {/* ================= HOUSEKEEPER CATEGORIES ================= */}
      <section className="bg-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 scroll-section">
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-textDark mb-4">
              Choose Your All-Rounder Category
            </h2>
            <p className="text-textLight max-w-2xl mx-auto">
              Flexible home management solutions offering multi-skilled domestic
              helpers trained in childcare, cooking, driving, and housekeeping.
            </p>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-10 items-center">
            {/* ================= LIVE-IN (Largest - Highlighted like Cook) ================= */}
            <div
              className="group relative bg-[#FFD6CC] 
                rounded-3xl p-8 border border-borderLight
                hover:shadow-2xl transition-all duration-500 overflow-hidden transform scale-105 z-10"
            >
              <span className="absolute top-6 right-6 bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full">
                Most Popular
              </span>

              <div className="text-5xl mb-6">🏠</div>

              <h3 className="text-3xl font-bold text-textDark mb-4">
                24x7 Live-In All-Rounder
              </h3>

              <ul className="text-textLight mb-8 space-y-3">
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Complete childcare & elderly care support</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Daily home cooking & kitchen management</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Driving services for school & local travel</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Full housekeeping & household supervision</span>
                </li>
              </ul>

              <button
                onClick={() => openModal("livein")}
                className="relative z-10 bg-primary hover:bg-primaryHover text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                Hire Live-In All-Rounder
              </button>

              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition duration-500"></div>
            </div>

            {/* ================= SUBSTITUTE (Medium) ================= */}
            <div
              className="group relative bg-bgLight rounded-3xl p-8 border border-borderLight
                hover:shadow-2xl transition-all duration-500 overflow-hidden transform scale-100"
            >
              <span
                className="absolute top-6 right-6 bg-green-100 text-green-600 
           text-xs font-semibold px-3 py-1 rounded-full"
              >
                Active
              </span>

              <div className="text-4xl mb-6">🔄</div>

              <h3 className="text-2xl font-bold text-textDark mb-4">
                Substitute All-Rounder
              </h3>

              <ul className="text-textLight mb-8 space-y-3">
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Immediate replacement for ongoing services</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>No interruption in childcare & cooking</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Trained in driving & housekeeping duties</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Reliable support whenever required</span>
                </li>
              </ul>

              <button
                onClick={() => openModal("substitute")}
                className="relative z-10 bg-primary hover:bg-primaryHover text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                Request Substitute
              </button>

              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition duration-500"></div>
            </div>

            {/* ================= LIVE-OUT (Smallest) ================= */}
            <div
              className="group relative bg-gray-50 rounded-3xl p-6 border border-dashed border-gray-300
                transition-all duration-500 overflow-hidden opacity-90 transform scale-90"
            >
              <span
                className="absolute top-6 right-6 bg-gray-200 text-gray-600 
           text-xs font-semibold px-3 py-1 rounded-full"
              >
                Coming Soon
              </span>

              <div className="text-4xl mb-6 text-gray-400">⏳</div>

              <h3 className="text-2xl font-bold text-gray-500 mb-4">
                Live-Out All-Rounder
              </h3>

              <ul className="text-textLight mb-8 space-y-3">
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Professional day-time multi-service support</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Childcare, cooking & home maintenance</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Scheduled driving & support services</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Launching soon in selected cities</span>
                </li>
              </ul>

              <button className="bg-gray-300 text-gray-500 px-6 py-3 rounded-xl font-semibold cursor-not-allowed">
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-gray-100 ">
        <div className="max-w-7xl mx-auto px-6 py-20 scroll-section">
          {/* Heading */}
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-textDark mb-3">
              Why Choose Domestic Pro for All-Rounder Services?
            </h2>

            <p className="text-textLight max-w-2xl mx-auto">
              We provide reliable, verified, and professional all-rounder
              helpers for complete home support.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* VERIFIED STAFF */}
            <div className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition">
              <div className="w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-2xl mx-auto mb-4">
                ✓
              </div>

              <h3 className="font-semibold text-textDark text-lg mb-2">
                Verified All-Rounder Helpers
              </h3>

              <p className="text-textLight text-sm">
                All helpers undergo strict background verification, ID checks,
                and skill screening before placement.
              </p>
            </div>

            {/* FULL-TIME SUPPORT */}
            <div className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition">
              <div className="w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-2xl mx-auto mb-4">
                🏠
              </div>

              <h3 className="font-semibold text-textDark text-lg mb-2">
                Complete Household Support
              </h3>

              <p className="text-textLight text-sm">
                Dedicated all-rounder helpers who manage cooking, cleaning,
                childcare, and daily home responsibilities efficiently.
              </p>
            </div>

            {/* SUBSTITUTE GUARANTEE */}
            <div className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition">
              <div className="w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-2xl mx-auto mb-4">
                🔄
              </div>

              <h3 className="font-semibold text-textDark text-lg mb-2">
                Quick Replacement Guarantee
              </h3>

              <p className="text-textLight text-sm">
                Immediate replacement provided if your regular helper is
                unavailable — ensuring smooth and uninterrupted service.
              </p>
            </div>

            {/* TRUST & RELIABILITY */}
            <div className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition">
              <div className="w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-2xl mx-auto mb-4">
                🤝
              </div>

              <h3 className="font-semibold text-textDark text-lg mb-2">
                Trusted & Reliable Service
              </h3>

              <p className="text-textLight text-sm">
                Structured onboarding, continuous monitoring, and ongoing
                support to ensure safe, dependable, and professional assistance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ROLES & RESPONSIBILITIES ================= */}
      <section className="bg-white ">
        <div className="max-w-7xl mx-auto px-6 py-20 scroll-section">
          {/* Heading */}
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-textDark mb-3">
              Roles & Responsibilities of a 24x7 Live-In All-Rounder Helper
            </h2>

            <p className="text-textLight max-w-2xl mx-auto">
              Our professionally trained all-rounder helpers manage complete
              household responsibilities with efficiency, reliability, and care.
            </p>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* CARD */}
            <div
              className="flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight 
                hover:shadow-xl hover:-translate-y-2 transition-transform duration-500 group"
            >
              <div
                className="w-14 h-14 bg-primary/10 text-primary 
                  flex items-center justify-center 
                  rounded-full text-xl flex-shrink-0
                  group-hover:bg-primary group-hover:text-white
                  transition duration-500"
              >
                🍳
              </div>

              <div>
                <h3 className="font-semibold text-textDark text-lg mb-2">
                  Cooking & Meal Preparation
                </h3>
                <p className="text-textLight text-sm">
                  Preparing fresh, hygienic meals tailored to family preferences
                  and dietary needs.
                </p>
              </div>
            </div>

            {/* CARD */}
            <div
              className="flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight 
                hover:shadow-xl hover:-translate-y-2 transition-transform duration-500 group"
            >
              <div
                className="w-14 h-14 bg-primary/10 text-primary 
                  flex items-center justify-center 
                  rounded-full text-xl flex-shrink-0
                  group-hover:bg-primary group-hover:text-white
                  transition duration-500"
              >
                🧹
              </div>

              <div>
                <h3 className="font-semibold text-textDark text-lg mb-2">
                  Housekeeping & Cleaning
                </h3>
                <p className="text-textLight text-sm">
                  Maintaining cleanliness of rooms, kitchen, bathrooms, and
                  overall home organization.
                </p>
              </div>
            </div>

            {/* CARD */}
            <div
              className="flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight 
                hover:shadow-xl hover:-translate-y-2 transition-transform duration-500 group"
            >
              <div
                className="w-14 h-14 bg-primary/10 text-primary 
                  flex items-center justify-center 
                  rounded-full text-xl flex-shrink-0
                  group-hover:bg-primary group-hover:text-white
                  transition duration-500"
              >
                👶
              </div>

              <div>
                <h3 className="font-semibold text-textDark text-lg mb-2">
                  Childcare Assistance
                </h3>
                <p className="text-textLight text-sm">
                  Supporting children with daily routines, supervision, and
                  basic care.
                </p>
              </div>
            </div>

            {/* CARD */}
            <div
              className="flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight 
                hover:shadow-xl hover:-translate-y-2 transition-transform duration-500 group"
            >
              <div
                className="w-14 h-14 bg-primary/10 text-primary 
                  flex items-center justify-center 
                  rounded-full text-xl flex-shrink-0
                  group-hover:bg-primary group-hover:text-white
                  transition duration-500"
              >
                🧺
              </div>

              <div>
                <h3 className="font-semibold text-textDark text-lg mb-2">
                  Laundry & Home Management
                </h3>
                <p className="text-textLight text-sm">
                  Washing, ironing, and organizing clothes along with managing
                  daily household tasks.
                </p>
              </div>
            </div>

            {/* CARD */}
            <div
              className="flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight 
                hover:shadow-xl hover:-translate-y-2 transition-transform duration-500 group"
            >
              <div
                className="w-14 h-14 bg-primary/10 text-primary 
                  flex items-center justify-center 
                  rounded-full text-xl flex-shrink-0
                  group-hover:bg-primary group-hover:text-white
                  transition duration-500"
              >
                🛒
              </div>

              <div>
                <h3 className="font-semibold text-textDark text-lg mb-2">
                  Grocery & Errand Support
                </h3>
                <p className="text-textLight text-sm">
                  Assisting with grocery management, basic errands, and ensuring
                  household supplies are maintained.
                </p>
              </div>
            </div>

            {/* CARD */}
            <div
              className="flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight 
                hover:shadow-xl hover:-translate-y-2 transition-transform duration-500 group"
            >
              <div
                className="w-14 h-14 bg-primary/10 text-primary 
                  flex items-center justify-center 
                  rounded-full text-xl flex-shrink-0
                  group-hover:bg-primary group-hover:text-white
                  transition duration-500"
              >
                ⏰
              </div>

              <div>
                <h3 className="font-semibold text-textDark text-lg mb-2">
                  24x7 Dedicated Support
                </h3>
                <p className="text-textLight text-sm">
                  Round-the-clock assistance to ensure smooth household
                  operations at all times.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ROLES & RESPONSIBILITIES ================= */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20 scroll-section">
          {/* Heading */}
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-textDark mb-3">
              Roles & Responsibilities of Substitute All-Rounder Staff
            </h2>

            <p className="text-textLight max-w-2xl mx-auto">
              Our trained all-rounder helpers provide dependable temporary
              support, ensuring your home functions smoothly during staff leave
              or emergencies.
            </p>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* CARD */}
            <div
              className="flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight 
                hover:shadow-xl hover:-translate-y-2 transition-transform duration-500 group "
            >
              <div
                className="w-14 h-14 bg-primary/10 text-primary 
                  flex items-center justify-center 
                  rounded-full text-xl flex-shrink-0
                  group-hover:bg-primary group-hover:text-white
                  transition duration-500 "
              >
                🔄
              </div>

              <div>
                <h3 className="font-semibold text-textDark text-lg mb-2">
                  Immediate Replacement Support
                </h3>
                <p className="text-textLight text-sm">
                  Quick deployment of verified all-rounder helpers to prevent
                  disruption in daily household routines.
                </p>
              </div>
            </div>

            {/* CARD */}
            <div
              className="flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight 
                hover:shadow-xl hover:-translate-y-2 transition-transform duration-500 group "
            >
              <div
                className="w-14 h-14 bg-primary/10 text-primary 
                  flex items-center justify-center 
                  rounded-full text-xl flex-shrink-0
                  group-hover:bg-primary group-hover:text-white
                  transition duration-500"
              >
                🧹
              </div>

              <div>
                <h3 className="font-semibold text-textDark text-lg mb-2">
                  Cleaning & Home Maintenance
                </h3>
                <p className="text-textLight text-sm">
                  Managing household cleaning, organizing spaces, and
                  maintaining overall hygiene standards.
                </p>
              </div>
            </div>

            {/* CARD */}
            <div
              className="flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight 
                hover:shadow-xl hover:-translate-y-2 transition-transform duration-500 group"
            >
              <div
                className="w-14 h-14 bg-primary/10 text-primary 
                  flex items-center justify-center 
                  rounded-full text-xl flex-shrink-0
                  group-hover:bg-primary group-hover:text-white
                  transition duration-500"
              >
                👨‍👩‍👧
              </div>

              <div>
                <h3 className="font-semibold text-textDark text-lg mb-2">
                  Family Care Assistance
                </h3>
                <p className="text-textLight text-sm">
                  Providing attentive support for children, elderly members, and
                  overall family needs during temporary assignments.
                </p>
              </div>
            </div>

            {/* CARD */}
            <div
              className="flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight 
                hover:shadow-xl hover:-translate-y-2 transition-transform duration-500 group"
            >
              <div
                className="w-14 h-14 bg-primary/10 text-primary 
                  flex items-center justify-center 
                  rounded-full text-xl flex-shrink-0
                  group-hover:bg-primary group-hover:text-white
                  transition duration-500"
              >
                🍳
              </div>

              <div>
                <h3 className="font-semibold text-textDark text-lg mb-2">
                  Cooking & Kitchen Management
                </h3>
                <p className="text-textLight text-sm">
                  Preparing meals, maintaining kitchen hygiene, and managing
                  daily cooking responsibilities.
                </p>
              </div>
            </div>

            {/* CARD */}
            <div
              className="flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight 
                hover:shadow-xl hover:-translate-y-2 transition-transform duration-500 group"
            >
              <div
                className="w-14 h-14 bg-primary/10 text-primary 
                  flex items-center justify-center 
                  rounded-full text-xl flex-shrink-0
                  group-hover:bg-primary group-hover:text-white
                  transition duration-500"
              >
                🧺
              </div>

              <div>
                <h3 className="font-semibold text-textDark text-lg mb-2">
                  Laundry & Household Organization
                </h3>
                <p className="text-textLight text-sm">
                  Handling laundry, ironing, folding, and organizing household
                  essentials efficiently.
                </p>
              </div>
            </div>

            {/* CARD */}
            <div
              className="flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight 
                hover:shadow-xl hover:-translate-y-2 transition-transform duration-500 group"
            >
              <div
                className="w-14 h-14 bg-primary/10 text-primary 
                  flex items-center justify-center 
                  rounded-full text-xl flex-shrink-0
                  group-hover:bg-primary group-hover:text-white
                  transition duration-500"
              >
                ⏳
              </div>

              <div>
                <h3 className="font-semibold text-textDark text-lg mb-2">
                  Flexible Short-Term Assistance
                </h3>
                <p className="text-textLight text-sm">
                  Available for short-term needs, emergency replacements, or
                  temporary household support with professionalism.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HeroWizard
        asModal
        isOpen={modalType}
        onClose={() => setModalType(false)}
      />
    </>
  );
};

export default Japa;
