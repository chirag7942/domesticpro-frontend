import React, { useState, useEffect } from "react";

import houseKeeperImg from "../../assets/nanny.webp";
import CommonModal from "../../components/CommonModal";
import HeroWizard from "../../components/HeroWizard";

const Nanny = () => {
  const [modalType, setModalType] = useState(null);

  const openModal = (type) => setModalType(type);

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
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-[1.3fr_1fr] gap-12 items-center">
          {/* LEFT CONTENT */}

          <div className="animate-left">
            <h1 className="text-4xl md:text-5xl font-bold text-textDark leading-tight mb-6">
              Caring &{" "}
              <span className="text-primary">On-Demand & Verified</span> Baby
              Caretakers
            </h1>

            <ul className="text-textLight mb-8 space-y-3">
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                  ✓
                </span>
                <span>Verified & trained infant care specialists</span>
              </li>

              <li className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                  ✓
                </span>
                <span>Newborn handling & mother support expertise</span>
              </li>

              <li className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                  ✓
                </span>
                <span>Feeding, burping & diaper changing care</span>
              </li>

              <li className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                  ✓
                </span>
                <span>Sleep routine & comfort management</span>
              </li>

              <li className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                  ✓
                </span>
                <span>Full-time, part-time & 24x7 care options</span>
              </li>

              <li className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                  ✓
                </span>
                <span>Safe, gentle & hygiene-focused support</span>
              </li>
            </ul>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => openModal("general")}
                className="bg-primary hover:bg-primaryHover text-white px-6 py-3 rounded-xl font-semibold transition duration-300 shadow-md"
              >
                Hire a Baby Caretaker
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center md:justify-end animate-right">
            <img
              src={houseKeeperImg}
              alt="Domestic Pro Baby Caretaker"
              className="rounded-2xl shadow-xl w-full h-[350px] md:h-[480px]   "
            />
          </div>
        </div>
      </section>

      {/* ================= NANNY CATEGORIES ================= */}
      <section className="bg-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 scroll-section">
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-textDark mb-4">
              Choose Your Baby Caretaker Category
            </h2>

            <p className="text-textLight max-w-2xl mx-auto">
              Flexible baby caretaker hiring options designed especially for
              newborns and infants.
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

              <div className="text-5xl mb-6">🧸</div>

              <h3 className="text-3xl font-bold text-textDark mb-4">
                24x7 Live-In Baby Caretakers
              </h3>

              <ul className="text-textLight mb-8 space-y-3">
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>24/7 dedicated newborn care</span>
                </li>

                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Expert in post-delivery baby handling</span>
                </li>

                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Feeding, burping & sleep supervision</span>
                </li>

                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Diaper changing & hygiene management</span>
                </li>

                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Night-time monitoring & comfort care</span>
                </li>

                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Trusted, verified & background-checked</span>
                </li>
              </ul>

              <button
                onClick={() => openModal("liveinNanny")}
                className="relative z-10 bg-primary hover:bg-primaryHover text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                Hire Full-Time Baby Caretaker
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
                Substitute Baby Caretaker
              </h3>
              <ul className="text-textLight mb-8 space-y-3">
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Immediate short-term baby care support</span>
                </li>

                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Temporary newborn supervision</span>
                </li>

                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Quick onboarding & flexible hours</span>
                </li>

                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Verified & ready-to-deploy professionals</span>
                </li>
              </ul>

              <button
                onClick={() => openModal("substituteNanny")}
                className="relative z-10 bg-primary hover:bg-primaryHover text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                Request Substitute Baby Caretaker
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
                Live-Out Baby Caretakers
              </h3>
              <ul className="text-textLight mb-8 space-y-3">
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Day-shift newborn care support</span>
                </li>

                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Part-time infant supervision</span>
                </li>

                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Routine feeding & sleep management</span>
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
              Why Choose Domestic Pro for Baby Caretakers?
            </h2>

            <p className="text-textLight max-w-2xl mx-auto">
              Trusted baby care professionals providing safety, hygiene, and
              nurturing support for your newborn.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* VERIFIED NANNIES */}
            <div className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition">
              <div className="w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-2xl mx-auto mb-4">
                🛡️
              </div>

              <h3 className="font-semibold text-textDark text-lg mb-2">
                Background Verified Caretakers
              </h3>

              <p className="text-textLight text-sm">
                Thorough identity checks, police verification, and reference
                screening for complete safety.
              </p>
            </div>

            {/* TRAINED CAREGIVERS */}
            <div className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition">
              <div className="w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-2xl mx-auto mb-4">
                🎓
              </div>

              <h3 className="font-semibold text-textDark text-lg mb-2">
                Trained Infant Care Specialists
              </h3>

              <p className="text-textLight text-sm">
                Specialized in newborn handling, feeding routines, and
                post-delivery baby care support.
              </p>
            </div>

            {/* SUBSTITUTE SUPPORT */}
            <div className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition">
              <div className="w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-2xl mx-auto mb-4">
                🔄
              </div>

              <h3 className="font-semibold text-textDark text-lg mb-2">
                Quick Replacement Guarantee
              </h3>

              <p className="text-textLight text-sm">
                Immediate substitute baby caretaker support during leave or
                emergencies.
              </p>
            </div>

            {/* TRUST & CARE */}
            <div className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition">
              <div className="w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-2xl mx-auto mb-4">
                💖
              </div>

              <h3 className="font-semibold text-textDark text-lg mb-2">
                Gentle & Loving Care
              </h3>

              <p className="text-textLight text-sm">
                Compassionate infant care focused on comfort, hygiene, and
                healthy development.
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
              Roles & Responsibilities of a 24x7 Live-In Baby Caretaker
            </h2>

            <p className="text-textLight max-w-2xl mx-auto">
              Our professionally trained live-in baby caretakers provide
              round-the-clock newborn support, ensuring safety, hygiene,
              comfort, and proper development.
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
                👶
              </div>

              <div>
                <h3 className="font-semibold text-textDark text-lg mb-2">
                  24x7 Infant Supervision
                </h3>
                <p className="text-textLight text-sm">
                  Round-the-clock monitoring, handling, and safety care for
                  newborns and infants.
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
                  Hygiene & Sanitization Care
                </h3>
                <p className="text-textLight text-sm">
                  Maintaining baby hygiene, sterilizing feeding bottles, and
                  ensuring clean surroundings.
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
                🍼
              </div>

              <div>
                <h3 className="font-semibold text-textDark text-lg mb-2">
                  Feeding & Daily Routine Management
                </h3>
                <p className="text-textLight text-sm">
                  Managing meals, bottle feeding, nap schedules, school
                  routines, and daily activities.
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
                🎨
              </div>

              <div>
                <h3 className="font-semibold text-textDark text-lg mb-2">
                  Feeding & Sleep Management
                </h3>
                <p className="text-textLight text-sm">
                  Managing breastfeeding support, formula feeding, burping, and
                  sleep routines.
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
                👩‍👧
              </div>

              <div>
                <h3 className="font-semibold text-textDark text-lg mb-2">
                  Development & Stimulation Support
                </h3>
                <p className="text-textLight text-sm">
                  Age-appropriate interaction, gentle stimulation, and early
                  sensory development activities.
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
                  Emotional Comfort & Bonding
                </h3>
                <p className="text-textLight text-sm">
                  Providing warmth, soothing care, and nurturing attention for
                  healthy growth.
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
              Roles & Responsibilities of Substitute Baby Caretakers
            </h2>

            <p className="text-textLight max-w-2xl mx-auto">
              Our trained substitute baby caretakers ensure uninterrupted
              newborn care during regular caretaker leave or emergencies.
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
                  Quick deployment of verified substitute baby caretakers for
                  uninterrupted care.
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
                👶
              </div>

              <div>
                <h3 className="font-semibold text-textDark text-lg mb-2">
                  Safe Infant Handling
                </h3>
                <p className="text-textLight text-sm">
                  Ensuring gentle handling, safety, and attentive newborn
                  supervision.
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
                🍼
              </div>

              <div>
                <h3 className="font-semibold text-textDark text-lg mb-2">
                  Feeding & Routine Support
                </h3>
                <p className="text-textLight text-sm">
                  Managing bottle feeding, burping, nap schedules, and comfort
                  routines.
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
                  Hygiene & Cleanliness
                </h3>
                <p className="text-textLight text-sm">
                  Maintaining personal hygiene, clean surroundings, and
                  sanitised child-related items.
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
                🎨
              </div>

              <div>
                <h3 className="font-semibold text-textDark text-lg mb-2">
                  Comfort & Play Interaction
                </h3>
                <p className="text-textLight text-sm">
                  Engaging infants with gentle play and emotional reassurance.
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
                🤝
              </div>

              <div>
                <h3 className="font-semibold text-textDark text-lg mb-2">
                  Compassionate & Responsible Care
                </h3>
                <p className="text-textLight text-sm">
                  Providing respectful, warm, and dependable baby care support.
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

export default Nanny;
