import React, { useState, useEffect } from "react";
import HeroWizard from "../../components/HeroWizard";

const Cook = () => {
  const [modalType, setModalType] = useState(null);

  const [modalConfig, setModalConfig] = useState({ service: null, format: null });

  const openModal = (type) => {
    if (type === "livein") {
      setModalConfig({ service: "Cooking Help", format: "Live-In" });
    } else if (type === "substitute") {
      setModalConfig({ service: "Cooking Help", format: "Substitute" });
    } else {
      setModalConfig({ service: "Cooking Help", format: null });
    }
    setModalType(type);
  };

  useEffect(() => {
    const sections = document.querySelectorAll(".scroll-section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("show");
        });
      },
      { threshold: 0.15 },
    );

    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
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
              Professional Home Cooks <br />
              <span className="text-primary">Tailored to Your Taste</span>
            </h1>

            <ul className="text-textLight mb-8 space-y-3">
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                  ✓
                </span>
                <span>Verified & experienced culinary professionals</span>
              </li>

              <li className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                  ✓
                </span>
                <span>Customized meal preparation (veg & non-veg)</span>
              </li>

              <li className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                  ✓
                </span>
                <span>Maintaining kitchen hygiene & ingredient management</span>
              </li>

              <li className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                  ✓
                </span>
                <span>Special occasion & family event cooking</span>
              </li>
            </ul>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => openModal("cook")}
                className="bg-primary hover:bg-primaryHover text-white px-6 py-3 rounded-xl font-semibold transition duration-300 shadow-md"
              >
                Hire Now
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center md:justify-end animate-right">
            <img
              src="https://res.cloudinary.com/dhtzknkdr/image/upload/v1773031895/cook_zy7sri.jpg" // Assuming you have imported your cook image as logoImg
              alt="Professional Home Cook"
              className="rounded-2xl shadow-xl w-full h-[350px] md:h-[400px]  max-w-md object-cover"
            />
          </div>
        </div>
      </section>

      {/* ================= COOK CATEGORIES ================= */}
      <section className="bg-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 scroll-section">
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-textDark mb-4">
              Choose Your Cook Category
            </h2>

            <p className="text-textLight max-w-2xl mx-auto">
              Flexible cook hiring options for daily meals, family events, and
              special occasions.
            </p>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-10 items-center">
            {/* ================= LIVE-IN (Largest) ================= */}
            <div
              className="group relative bg-[#FFD6CC] 
rounded-3xl p-8 border border-borderLight
hover:shadow-2xl transition-all duration-500 overflow-hidden transform scale-105 z-10"
            >
              <span className="absolute top-6 right-6 bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full">
                Most Popular
              </span>

              <div className="text-5xl mb-6">👨‍🍳</div>

              <h3 className="text-3xl font-bold text-textDark mb-4">
                24x7 Live-In Cooks
              </h3>

              <ul className="text-textLight mb-8 space-y-3">
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Full-time dedicated cook for your household</span>
                </li>

                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Custom meal plans including dietary preferences</span>
                </li>

                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Available round-the-clock for family or events</span>
                </li>

                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Handles grocery management and kitchen hygiene</span>
                </li>
              </ul>

              <button
                onClick={() => openModal("livein")}
                className="relative z-10 bg-primary hover:bg-primaryHover text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                Hire Full-Time Cook
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
                Substitute Cook
              </h3>

              <ul className="text-textLight mb-8 space-y-3">
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>
                    Replacement cook if your regular cook is unavailable
                  </span>
                </li>

                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Ensures uninterrupted daily meal preparation</span>
                </li>

                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Available for short-term assignments</span>
                </li>
              </ul>

              <button
                onClick={() => openModal("substitute")}
                className="relative z-10 bg-primary hover:bg-primaryHover text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                Request Substitute Cook
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
                Live-Out Cooks
              </h3>

              <ul className="text-textLight mb-8 space-y-3">
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Part-time cooking services at your home</span>
                </li>

                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Meal prep for daily household needs</span>
                </li>

                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    ✓
                  </span>
                  <span>Experienced and trained culinary staff</span>
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

      {/* WHY CHOOSE US - COOKS */}
      <section className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-20 scroll-section">
          {/* Heading */}
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-textDark mb-3">
              Why Choose Domestic Pro for Cooks?
            </h2>

            <p className="text-textLight max-w-2xl mx-auto">
              We provide skilled, verified, and professional cooks ensuring
              quality meals and a smooth hiring experience.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* VERIFIED COOKS */}
            <div className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition">
              <div className="w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-2xl mx-auto mb-4">
                ✓
              </div>

              <h3 className="font-semibold text-textDark text-lg mb-2">
                Background Verified Cooks
              </h3>

              <p className="text-textLight text-sm">
                Every cook undergoes strict identity verification and
                professional background screening.
              </p>
            </div>

            {/* SKILLED PROFESSIONALS */}
            <div className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition">
              <div className="w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-2xl mx-auto mb-4">
                👨‍🍳
              </div>

              <h3 className="font-semibold text-textDark text-lg mb-2">
                Experienced & Skilled Chefs
              </h3>

              <p className="text-textLight text-sm">
                Trained in multi-cuisine cooking, hygiene standards, and
                customized meal preparation.
              </p>
            </div>

            {/* SUBSTITUTE SUPPORT */}
            <div className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition">
              <div className="w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-2xl mx-auto mb-4">
                🔄
              </div>

              <h3 className="font-semibold text-textDark text-lg mb-2">
                Quick Replacement Support
              </h3>

              <p className="text-textLight text-sm">
                Immediate substitute cooks provided during leave, special
                occasions, or unexpected absence.
              </p>
            </div>

            {/* TRUST & HYGIENE */}
            <div className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition">
              <div className="w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-2xl mx-auto mb-4">
                🤝
              </div>

              <h3 className="font-semibold text-textDark text-lg mb-2">
                Hygiene & Professional Standards
              </h3>

              <p className="text-textLight text-sm">
                Ensuring clean kitchen practices, disciplined behavior, and
                consistent meal quality every day.
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
              Roles & Responsibilities of a 24x7 Live-In Cook
            </h2>

            <p className="text-textLight max-w-2xl mx-auto">
              Our professionally trained 24x7 live-in cooks provide
              round-the-clock meal preparation, kitchen management, and hygienic
              cooking support tailored to your family's daily dietary needs.
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
                👨‍🍳
              </div>

              <div>
                <h3 className="font-semibold text-textDark text-lg mb-2">
                  Daily Meal Preparation
                </h3>
                <p className="text-textLight text-sm">
                  Preparing fresh breakfast, lunch, dinner, and snacks according
                  to your family’s taste and schedule.
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
                🥗
              </div>

              <div>
                <h3 className="font-semibold text-textDark text-lg mb-2">
                  Customized & Healthy Meal Planning
                </h3>
                <p className="text-textLight text-sm">
                  Designing balanced meal plans considering dietary preferences,
                  health conditions, and nutrition requirements.
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
                🧼
              </div>

              <div>
                <h3 className="font-semibold text-textDark text-lg mb-2">
                  Kitchen Hygiene & Cleanliness
                </h3>
                <p className="text-textLight text-sm">
                  Maintaining clean cooking areas, proper food storage, and
                  following strict hygiene standards at all times.
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
                🛒
              </div>

              <div>
                <h3 className="font-semibold text-textDark text-lg mb-2">
                  Grocery & Inventory Management
                </h3>
                <p className="text-textLight text-sm">
                  Monitoring kitchen supplies, managing groceries, and ensuring
                  timely replenishment of essentials.
                </p>
              </div>
            </div>

            {/* CARD 5 */}
            <div
              className="flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight 
                      hover:shadow-xl hover:-translate-y-2 
                      transition-transform  duration-300
 group"
            >
              <div
                className="w-14 h-14 bg-primary/10 text-primary 
                        flex items-center justify-center 
                        rounded-full text-xl flex-shrink-0
                        group-hover:bg-primary group-hover:text-white
                        transition duration-500"
              >
                🎉
              </div>

              <div>
                <h3 className="font-semibold text-textDark text-lg mb-2">
                  Special Occasion & Event Cooking
                </h3>
                <p className="text-textLight text-sm">
                  Preparing meals for family gatherings, festivals, guests, and
                  special celebrations.
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
                  Professionalism & Discipline
                </h3>
                <p className="text-textLight text-sm">
                  Maintaining respectful behavior, punctuality, and consistent
                  quality standards in every meal prepared.
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
              Roles & Responsibilities of Substitute Cooks
            </h2>

            <p className="text-textLight max-w-2xl mx-auto">
              Our trained substitute cooks provide reliable temporary kitchen
              support, ensuring uninterrupted meal preparation during leave,
              emergencies, or special requirements.
            </p>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* CARD 1 */}
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
                  Quick deployment of experienced cooks to ensure uninterrupted
                  daily meal preparation.
                </p>
              </div>
            </div>

            {/* CARD 2 */}
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
                🍳
              </div>

              <div>
                <h3 className="font-semibold text-textDark text-lg mb-2">
                  Daily Meal Preparation
                </h3>
                <p className="text-textLight text-sm">
                  Preparing breakfast, lunch, and dinner as per household
                  preferences and dietary requirements.
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
                🥗
              </div>

              <div>
                <h3 className="font-semibold text-textDark text-lg mb-2">
                  Customized & Diet-Specific Cooking
                </h3>
                <p className="text-textLight text-sm">
                  Preparing meals tailored to vegetarian, non-vegetarian,
                  diabetic, or special nutritional needs.
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
                🛒
              </div>

              <div>
                <h3 className="font-semibold text-textDark text-lg mb-2">
                  Grocery & Ingredient Management
                </h3>
                <p className="text-textLight text-sm">
                  Assisting in ingredient planning, stock monitoring, and
                  maintaining kitchen inventory efficiently.
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
                🧼
              </div>

              <div>
                <h3 className="font-semibold text-textDark text-lg mb-2">
                  Kitchen Hygiene & Cleanliness
                </h3>
                <p className="text-textLight text-sm">
                  Ensuring proper cleanliness of utensils, cooking areas, and
                  maintaining food safety standards.
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
                🎉
              </div>

              <div>
                <h3 className="font-semibold text-textDark text-lg mb-2">
                  Event & Special Occasion Cooking
                </h3>
                <p className="text-textLight text-sm">
                  Supporting family gatherings, celebrations, and special events
                  with professional cooking services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HIRE MODAL */}
      <HeroWizard
        asModal
        isOpen={!!modalType}
        onClose={() => setModalType(null)}
        initialService={modalConfig.service}
        initialFormat={modalConfig.format}
      />
    </>
  );
};

export default Cook;
