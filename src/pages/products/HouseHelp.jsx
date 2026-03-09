import React, { useState, useEffect } from "react";
import HeroWizard from "../../components/HeroWizard";

const HouseHelp = () => {
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
              <span className="text-primary">24 Hours</span> Housekeepers <br />
              You Can <span className="text-primary">Trust</span>
            </h1>

            <ul className="text-textLight mb-8 space-y-3">
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                  ✓
                </span>
                <span>Verified & professionally trained staff</span>
              </li>

              <li className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                  ✓
                </span>
                <span>Complete daily household management</span>
              </li>

              <li className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                  ✓
                </span>
                <span>Reliable 24x7 live-in support</span>
              </li>

              <li className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                  ✓
                </span>
                <span>Safe, disciplined & trustworthy service</span>
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
              src="https://res.cloudinary.com/dhtzknkdr/image/upload/v1773031902/house-keeper_cwr1ph.png"
              alt="Domestic Pro Housekeeper"
              className="rounded-2xl shadow-xl w-full max-w-md object-cover"
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
              Choose Your Housekeeper Category
            </h2>
            <p className="text-textLight max-w-2xl mx-auto">
              Flexible staffing solutions designed to match your household needs
              with verified and professionally managed support.
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
                24x7 Live-In Housekeepers
              </h3>

              <ul className="text-textLight mb-8 space-y-3">
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Full-time housekeeper with your family</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Daily cleaning & laundry management</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Reliable 24x7 support</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Trustworthy, safe & disciplined</span>
                </li>
              </ul>

              <button
                onClick={() => openModal("livein")}
                className="relative z-10 bg-primary hover:bg-primaryHover text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                Hire Live-In Staff
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
                Substitute Staff
              </h3>

              <ul className="text-textLight mb-8 space-y-3">
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Immediate replacement if needed</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>No disruption to your household</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Trained professionals for smooth transition</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Reliable support anytime you need</span>
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
                Live-Out Housekeepers
              </h3>

              <ul className="text-textLight mb-8 space-y-3">
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Professional day-shift housekeepers</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Scheduled home visits for specific hours</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Reliable and trained staff</span>
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
              Why Choose Domestic Pro for HouseKeepers?
            </h2>

            <p className="text-textLight max-w-2xl mx-auto">
              We provide reliable, verified, and professional household staff
              with a seamless hiring experience.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* VERIFIED LIVE-IN STAFF */}
            <div className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition">
              <div className="w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-2xl mx-auto mb-4">
                ✓
              </div>

              <h3 className="font-semibold text-textDark text-lg mb-2">
                Verified 24x7 Live-In Staff
              </h3>

              <p className="text-textLight text-sm">
                All housekeepers undergo strict background verification, ID
                checks, and skill screening before placement.
              </p>
            </div>

            {/* FULL-TIME HOME SUPPORT */}
            <div className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition">
              <div className="w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-2xl mx-auto mb-4">
                🏠
              </div>

              <h3 className="font-semibold text-textDark text-lg mb-2">
                24x7 Live-In Assistance
              </h3>

              <p className="text-textLight text-sm">
                Dedicated full-time housekeepers who stay with your family and
                manage daily cleaning, laundry, and household tasks.
              </p>
            </div>

            {/* SUBSTITUTE GUARANTEE */}
            <div className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition">
              <div className="w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-2xl mx-auto mb-4">
                🔄
              </div>

              <h3 className="font-semibold text-textDark text-lg mb-2">
                Instant Substitute Support
              </h3>

              <p className="text-textLight text-sm">
                Immediate replacement provided if your regular housekeeper is
                unavailable — ensuring zero disruption.
              </p>
            </div>

            {/* TRUST & RELIABILITY */}
            <div className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition">
              <div className="w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-2xl mx-auto mb-4">
                🤝
              </div>

              <h3 className="font-semibold text-textDark text-lg mb-2">
                Long-Term Reliability
              </h3>

              <p className="text-textLight text-sm">
                Structured onboarding, continuous monitoring, and ongoing
                support for safe and dependable service.
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
              Roles & Responsibilities of a 24x7 Live-In Housekeeper
            </h2>

            <p className="text-textLight max-w-2xl mx-auto">
              Our professionally trained live-in housekeepers ensure complete
              household management with dedication, discipline, and care.
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
                🧹
              </div>

              <div>
                <h3 className="font-semibold text-textDark text-lg mb-2">
                  Complete Home Cleaning
                </h3>
                <p className="text-textLight text-sm">
                  Daily sweeping, mopping, dusting, bathroom cleaning, and
                  maintaining overall hygiene of the house.
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
                👕
              </div>

              <div>
                <h3 className="font-semibold text-textDark text-lg mb-2">
                  Laundry & Wardrobe Management
                </h3>
                <p className="text-textLight text-sm">
                  Washing, ironing, folding clothes, organizing wardrobes, and
                  maintaining proper clothing care routines.
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
                🍽️
              </div>

              <div>
                <h3 className="font-semibold text-textDark text-lg mb-2">
                  Kitchen Assistance
                </h3>
                <p className="text-textLight text-sm">
                  Utensil cleaning, kitchen organization, basic food preparation
                  support, and maintaining cleanliness in cooking areas.
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
                🛏️
              </div>

              <div>
                <h3 className="font-semibold text-textDark text-lg mb-2">
                  Room & Linen Maintenance
                </h3>
                <p className="text-textLight text-sm">
                  Bed making, changing linens, organizing rooms, and ensuring
                  comfortable living spaces.
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
                🧴
              </div>

              <div>
                <h3 className="font-semibold text-textDark text-lg mb-2">
                  Hygiene & Sanitation
                </h3>
                <p className="text-textLight text-sm">
                  Ensuring bathrooms, kitchen, and living areas remain sanitized
                  and hygienic at all times.
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
                  Round-the-Clock Support
                </h3>
                <p className="text-textLight text-sm">
                  Live-in availability for consistent household support and
                  smooth daily routine management.
                </p>
              </div>
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
              Roles & Responsibilities of Substitute Staff
            </h2>

            <p className="text-textLight max-w-2xl mx-auto">
              Our trained substitute staff provide reliable temporary support,
              ensuring your household runs smoothly even during staff leave or
              emergencies.
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
                  Quick deployment of verified staff to ensure no disruption in
                  daily household routines.
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
                  Household Cleaning & Maintenance
                </h3>
                <p className="text-textLight text-sm">
                  Managing daily cleaning, organizing spaces, and maintaining
                  hygiene standards as per your requirements.
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
                  Child or Elderly Assistance
                </h3>
                <p className="text-textLight text-sm">
                  Providing attentive care and support to children or elderly
                  family members during temporary assignments.
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
                  Cooking & Kitchen Support
                </h3>
                <p className="text-textLight text-sm">
                  Meal preparation assistance, kitchen cleanliness, and support
                  for daily cooking requirements.
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
                  Laundry & Organization
                </h3>
                <p className="text-textLight text-sm">
                  Handling laundry tasks, folding clothes, and ensuring
                  organized storage of household items.
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
                  Flexible Short-Term Service
                </h3>
                <p className="text-textLight text-sm">
                  Available for short durations, emergencies, or temporary
                  staffing needs with professionalism and reliability.
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

export default HouseHelp;
