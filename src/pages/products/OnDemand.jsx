import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ondemandImage from "../../assets/on-demand.png";
import HeroWizard from "../../components/HeroWizard";

export default function OnDemand() {
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
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <div className="animate-left">
            <h1 className="text-4xl md:text-5xl font-bold text-textDark leading-tight mb-6">
              On-Demand <span className="text-primary">Home Services</span> When
              You <span className="text-primary">Need</span> Them Most
            </h1>

            <ul className="text-textLight mb-8 space-y-3">
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                  ✓
                </span>
                <span>Instant booking for urgent and short-notice needs</span>
              </li>

              <li className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                  ✓
                </span>
                <span>Verified professionals available within hours</span>
              </li>

              <li className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                  ✓
                </span>
                <span>Cleaning, cooking, patient care & driver support</span>
              </li>

              <li className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                  ✓
                </span>
                <span>Flexible hourly, daily, or short-term options</span>
              </li>

              <li className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                  ✓
                </span>
                <span>Reliable, safe, and background-verified staff</span>
              </li>
            </ul>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => openModal("true")}
                className="bg-primary hover:bg-primaryHover text-white px-6 py-3 rounded-xl font-semibold transition duration-300 shadow-md"
              >
                Book Instantly
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center md:justify-end animate-right">
            <img
              src={ondemandImage}
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
              Choose Your On-Demand Service
            </h2>

            <p className="text-textLight max-w-2xl mx-auto">
              Book verified professionals instantly for urgent, short-term, or
              same-day home service needs.
            </p>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-10 items-center">
            {/* ================= HOME CLEANING (Highlighted Center) ================= */}
            <div
              className="group relative bg-[#E6F4FF] 
      rounded-3xl p-8 border border-borderLight
      hover:shadow-2xl transition-all duration-500 overflow-hidden transform scale-105 z-10"
            >
              <span className="absolute top-6 right-6 bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">
                Most Booked
              </span>

              <div className="text-5xl mb-6">🧹</div>

              <h3 className="text-3xl font-bold text-textDark mb-4">
                On-Demand Cleaning
              </h3>

              <ul className="text-textLight mb-8 space-y-3">
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Same-day deep and regular cleaning</span>
                </li>

                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Kitchen, bathroom & full home service</span>
                </li>

                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Trained & background-verified staff</span>
                </li>

                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Hourly or one-day flexible booking</span>
                </li>
              </ul>

              <button
                onClick={() => openModal("cleaning")}
                className="relative z-10 bg-primary hover:bg-primaryHover text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                Book Cleaning Now
              </button>

              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition duration-500"></div>
            </div>

            {/* ================= COOK / HOME CHEF ================= */}
            <div
              className="group relative bg-bgLight rounded-3xl p-8 border border-borderLight
      hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              <span
                className="absolute top-6 right-6 bg-green-100 text-green-600 
        text-xs font-semibold px-3 py-1 rounded-full"
              >
                Fast Booking
              </span>

              <div className="text-4xl mb-6">👨‍🍳</div>

              <h3 className="text-2xl font-bold text-textDark mb-4">
                On-Demand Cook
              </h3>

              <ul className="text-textLight mb-8 space-y-3">
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Meal preparation for families & events</span>
                </li>

                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Veg, non-veg & regional cuisine options</span>
                </li>

                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Short-term & emergency replacement cooks</span>
                </li>
              </ul>

              <button
                onClick={() => openModal("cook")}
                className="relative z-10 bg-primary hover:bg-primaryHover text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                Book a Cook
              </button>

              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition duration-500"></div>
            </div>

            {/* ================= PATIENT CARE ================= */}
            <div
              className="group relative bg-[#FFF7E6] rounded-3xl p-8 border border-borderLight
      hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              <span
                className="absolute top-6 right-6 bg-orange-100 text-orange-600 
        text-xs font-semibold px-3 py-1 rounded-full"
              >
                Emergency Support
              </span>

              <div className="text-4xl mb-6">🏥</div>

              <h3 className="text-2xl font-bold text-textDark mb-4">
                On-Demand Patient Care
              </h3>

              <ul className="text-textLight mb-8 space-y-3">
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Elderly and post-hospital care</span>
                </li>

                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Trained attendants for short-term support</span>
                </li>

                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Available within hours in selected areas</span>
                </li>
              </ul>

              <button
                onClick={() => openModal("patientcare")}
                className="relative z-10 bg-primary hover:bg-primaryHover text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                Request Caregiver
              </button>

              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition duration-500"></div>
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
              Why Choose Domestic Pro for On-Demand Services?
            </h2>

            <p className="text-textLight max-w-2xl mx-auto">
              Fast, reliable, and verified professionals delivered to your
              doorstep exactly when you need them.
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
                Background Verified Professionals
              </h3>

              <p className="text-textLight text-sm">
                Every staff member is identity-verified and screened to ensure
                safety and trust for your family.
              </p>
            </div>

            {/* QUICK RESPONSE */}
            <div className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition">
              <div className="w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-2xl mx-auto mb-4">
                ⚡
              </div>

              <h3 className="font-semibold text-textDark text-lg mb-2">
                Quick & Same-Day Availability
              </h3>

              <p className="text-textLight text-sm">
                Book professionals within hours for urgent, short-term, or
                emergency household requirements.
              </p>
            </div>

            {/* FLEXIBLE BOOKING */}
            <div className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition">
              <div className="w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-2xl mx-auto mb-4">
                ⏱
              </div>

              <h3 className="font-semibold text-textDark text-lg mb-2">
                Flexible Booking Options
              </h3>

              <p className="text-textLight text-sm">
                Choose hourly, daily, or short-term services tailored to your
                specific needs.
              </p>
            </div>

            {/* RELIABLE SUPPORT */}
            <div className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition">
              <div className="w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-2xl mx-auto mb-4">
                🤝
              </div>

              <h3 className="font-semibold text-textDark text-lg mb-2">
                Reliable & Professional Support
              </h3>

              <p className="text-textLight text-sm">
                Trained staff ensuring punctuality, discipline, and quality
                service every time.
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
              Roles & Responsibilities of On-Demand Professionals
            </h2>

            <p className="text-textLight max-w-2xl mx-auto">
              Our on-demand staff are trained to deliver fast, reliable, and
              professional support for urgent, short-term, and same-day home
              service requirements.
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
                ⚡
              </div>

              <div>
                <h3 className="font-semibold text-textDark text-lg mb-2">
                  Quick Response & Timely Arrival
                </h3>
                <p className="text-textLight text-sm">
                  Ensuring prompt arrival and immediate service execution for
                  urgent and short-notice bookings.
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
                  Safety & Hygiene Compliance
                </h3>
                <p className="text-textLight text-sm">
                  Following proper safety measures, hygiene standards, and
                  respectful conduct within your home environment.
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
                🧹
              </div>

              <div>
                <h3 className="font-semibold text-textDark text-lg mb-2">
                  Task-Focused Service Execution
                </h3>
                <p className="text-textLight text-sm">
                  Completing assigned cleaning, cooking, caregiving, or
                  assistance duties efficiently within the booked duration.
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
                ⏱
              </div>

              <div>
                <h3 className="font-semibold text-textDark text-lg mb-2">
                  Flexible Duration Support
                </h3>
                <p className="text-textLight text-sm">
                  Providing hourly, daily, or short-term assistance based on
                  your specific service requirement.
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
                🤝
              </div>

              <div>
                <h3 className="font-semibold text-textDark text-lg mb-2">
                  Professional Conduct & Respect
                </h3>
                <p className="text-textLight text-sm">
                  Maintaining discipline, courtesy, and confidentiality at all
                  times during service delivery.
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
                🔄
              </div>

              <div>
                <h3 className="font-semibold text-textDark text-lg mb-2">
                  Replacement & Backup Support
                </h3>
                <p className="text-textLight text-sm">
                  Immediate alternative staff provided in case of emergency or
                  unforeseen unavailability.
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
              Roles & Responsibilities of On-Demand Support Staff
            </h2>

            <p className="text-textLight max-w-2xl mx-auto">
              Our trained on-demand professionals provide reliable short-term
              and emergency household support, ensuring your daily routine
              continues smoothly without disruption.
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
                ⚡
              </div>

              <div>
                <h3 className="font-semibold text-textDark text-lg mb-2">
                  Immediate Service Deployment
                </h3>
                <p className="text-textLight text-sm">
                  Rapid assignment of verified professionals for urgent,
                  same-day, or short-notice service requests.
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
                🛡️
              </div>

              <div>
                <h3 className="font-semibold text-textDark text-lg mb-2">
                  Safe & Professional Conduct
                </h3>
                <p className="text-textLight text-sm">
                  Strict adherence to safety standards, hygiene protocols, and
                  respectful behavior within your home.
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
                  Task-Based Service Execution
                </h3>
                <p className="text-textLight text-sm">
                  Focused completion of assigned duties such as cleaning,
                  cooking, caregiving, or household assistance.
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
                ⏱
              </div>

              <div>
                <h3 className="font-semibold text-textDark text-lg mb-2">
                  Flexible Short-Term Assignments
                </h3>
                <p className="text-textLight text-sm">
                  Available for hourly, daily, event-based, or temporary service
                  requirements as per your need.
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
                🔄
              </div>

              <div>
                <h3 className="font-semibold text-textDark text-lg mb-2">
                  Backup & Replacement Assurance
                </h3>
                <p className="text-textLight text-sm">
                  Immediate alternative staff provided in case of emergency or
                  unexpected unavailability.
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
                  Reliable & Trustworthy Support
                </h3>
                <p className="text-textLight text-sm">
                  Ensuring punctuality, discipline, and dependable service for
                  your peace of mind.
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
}
