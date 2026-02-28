import React, { useState, useEffect } from "react";

import houseKeeperImg from "../../assets/driver.jpg";
import HeroWizard from "../../components/HeroWizard";

const Driver = () => {
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
              Professional Drivers <br />
              <span className="text-primary">You Can Rely On</span>
            </h1>

            <ul className="text-textLight mb-8 space-y-3">
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                  ✓
                </span>
                <span>Safe, punctual, and well-trained drivers</span>
              </li>

              <li className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                  ✓
                </span>
                <span>
                  Verified and experienced for full-time or substitute needs
                </span>
              </li>

              <li className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                  ✓
                </span>
                <span>
                  Daily commute, school drop-offs, and elderly transport
                </span>
              </li>

              <li className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                  ✓
                </span>
                <span>Long-distance travel with safety and discipline</span>
              </li>

              <li className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                  ✓
                </span>
                <span>Complete peace of mind for your family</span>
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
              alt="Domestic Pro Housekeeper"
              className="rounded-2xl h-[350px] md:h-[400px] shadow-xl w-full  max-w-md object-cover"
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
              Choose Your Driver Category
            </h2>

            <p className="text-textLight max-w-2xl mx-auto">
              Flexible driver hiring options designed for personal, family, and
              corporate transportation needs.
            </p>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-10 items-center">
            {/* ================= LIVE-IN (Highlighted Center) ================= */}
            <div
              className="group relative bg-[#FFD6CC] 
                      rounded-3xl p-8 border border-borderLight
                      hover:shadow-2xl transition-all duration-500 overflow-hidden transform scale-105 z-10"
            >
              <span className="absolute top-6 right-6 bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full">
                Most Popular
              </span>

              <div className="text-5xl mb-6">🚗</div>

              <h3 className="text-3xl font-bold text-textDark mb-4">
                24x7 Live-In Drivers
              </h3>

              <ul className="text-textLight mb-8 space-y-3">
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Verified and trained staff</span>
                </li>

                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Dedicated full-time drivers</span>
                </li>

                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Available round-the-clock</span>
                </li>

                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>
                    For family travel, business commute, and emergencies
                  </span>
                </li>
              </ul>

              <button
                onClick={() => openModal("livein")}
                className="relative z-10 bg-primary hover:bg-primaryHover text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                Hire Full-Time Driver
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
                Substitute Driver
              </h3>

              <ul className="text-textLight mb-8 space-y-3">
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>
                    Immediate replacement if regular driver is unavailable
                  </span>
                </li>

                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Ensures uninterrupted travel plans</span>
                </li>

                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Peace of mind for all your travel needs</span>
                </li>
              </ul>

              <button
                onClick={() => openModal("substitute")}
                className="relative z-10 bg-primary hover:bg-primaryHover text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                Request Substitute Driver
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
                Live-Out Drivers
              </h3>

              <ul className="text-textLight mb-8 space-y-3">
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Professional drivers for company executives</span>
                </li>

                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Corporate transportation services</span>
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
              <h2 className="text-3xl md:text-4xl font-bold text-textDark mb-3">
                Why Choose Domestic Pro for Drivers?
              </h2>
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
                Background Verified Drivers
              </h3>

              <p className="text-textLight text-sm">
                All drivers undergo strict background checks, driving license
                verification, and identity screening.
              </p>
            </div>

            {/* FULL-TIME HOME SUPPORT */}
            <div className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition">
              <div className="w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-2xl mx-auto mb-4">
                🏠
              </div>

              <h3 className="font-semibold text-textDark text-lg mb-2">
                Experienced & Skilled Professionals
              </h3>

              <p className="text-textLight text-sm">
                Trained drivers with knowledge of city routes, traffic rules,
                and safe driving practices.
              </p>
            </div>

            {/* SUBSTITUTE GUARANTEE */}
            <div className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition">
              <div className="w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-2xl mx-auto mb-4">
                🔄
              </div>

              <h3 className="font-semibold text-textDark text-lg mb-2">
                Instant Replacement Support
              </h3>

              <p className="text-textLight text-sm">
                Quick substitute drivers provided during leave, emergencies, or
                unexpected absence.
              </p>
            </div>

            {/* TRUST & RELIABILITY */}
            <div className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition">
              <div className="w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-2xl mx-auto mb-4">
                🤝
              </div>

              <h3 className="font-semibold text-textDark text-lg mb-2">
                Reliable & Punctual Service
              </h3>

              <p className="text-textLight text-sm">
                Ensuring timely pick-ups, disciplined behavior, and professional
                conduct at all times.
              </p>
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
              Roles & Responsibilities of a 24x7 Personal Driver
            </h2>

            <p className="text-textLight max-w-2xl mx-auto">
              Our professionally trained 24x7 personal drivers provide
              round-the-clock safe, reliable, and disciplined driving support
              for your family’s daily commute, travel needs, and emergency
              requirements.
            </p>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* CARD 1 */}
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
                🚗
              </div>

              <div>
                <h3 className="font-semibold text-textDark text-lg mb-2">
                  Round-the-Clock Driving Support
                </h3>
                <p className="text-textLight text-sm">
                  Available 24x7 for daily commutes, late-night travel,
                  early-morning schedules, and urgent mobility needs.
                </p>
              </div>
            </div>

            {/* CARD 2 */}
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
                🛡️
              </div>

              <div>
                <h3 className="font-semibold text-textDark text-lg mb-2">
                  Safe & Defensive Driving
                </h3>
                <p className="text-textLight text-sm">
                  Strict adherence to traffic rules, speed regulations, and safe
                  driving practices to ensure complete passenger safety.
                </p>
              </div>
            </div>

            {/* CARD 3 */}
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
                🗺️
              </div>

              <div>
                <h3 className="font-semibold text-textDark text-lg mb-2">
                  Route Planning & Navigation
                </h3>
                <p className="text-textLight text-sm">
                  Expertise in city routes, alternate roads, and traffic
                  management for efficient and time-saving travel.
                </p>
              </div>
            </div>

            {/* CARD 4 */}
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
                🧼
              </div>

              <div>
                <h3 className="font-semibold text-textDark text-lg mb-2">
                  Vehicle Care & Maintenance
                </h3>
                <p className="text-textLight text-sm">
                  Maintaining vehicle cleanliness, monitoring fuel levels, and
                  promptly reporting service or mechanical requirements.
                </p>
              </div>
            </div>

            {/* CARD 5 */}
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
                  Family & VIP Transportation
                </h3>
                <p className="text-textLight text-sm">
                  Safe transportation for children, elderly members, guests, and
                  important business or personal engagements.
                </p>
              </div>
            </div>

            {/* CARD 6 */}
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
                🤝
              </div>

              <div>
                <h3 className="font-semibold text-textDark text-lg mb-2">
                  Professionalism & Confidentiality
                </h3>
                <p className="text-textLight text-sm">
                  Maintaining discipline, respectful conduct, and complete
                  confidentiality at all times.
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
              Roles & Responsibilities of Substitute Drivers
            </h2>

            <p className="text-textLight max-w-2xl mx-auto">
              Our trained substitute drivers provide reliable and professional
              temporary driving support, ensuring your travel plans continue
              smoothly during staff leave or emergencies.
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
                  Quick deployment of verified substitute drivers to ensure no
                  disruption in your daily commute or travel schedule.
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
                🚗
              </div>

              <div>
                <h3 className="font-semibold text-textDark text-lg mb-2">
                  Safe & Responsible Driving
                </h3>
                <p className="text-textLight text-sm">
                  Ensuring smooth, safe, and defensive driving while strictly
                  following traffic rules and road safety guidelines.
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
                🗺️
              </div>

              <div>
                <h3 className="font-semibold text-textDark text-lg mb-2">
                  Route Knowledge & Navigation
                </h3>
                <p className="text-textLight text-sm">
                  Well-versed with city routes, alternate roads, and real-time
                  navigation for efficient travel and time management.signments.
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
                🧼
              </div>

              <div>
                <h3 className="font-semibold text-textDark text-lg mb-2">
                  Vehicle Care & Maintenance
                </h3>
                <p className="text-textLight text-sm">
                  Basic vehicle upkeep including cleanliness, fuel checks, and
                  reporting any mechanical concerns promptly.
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
                👨‍👩‍👧{" "}
              </div>

              <div>
                <h3 className="font-semibold text-textDark text-lg mb-2">
                  Family & School Commute Support
                </h3>
                <p className="text-textLight text-sm">
                  Safe transportation for children, elderly family members, and
                  daily office or school drop-offs and pick-ups.
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
                  Flexible Short-Term Assignments
                </h3>
                <p className="text-textLight text-sm">
                  Available for emergency replacements, temporary needs,
                  outstation trips, or short-duration service requirements.
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

export default Driver;
