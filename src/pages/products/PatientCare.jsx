import React, { useState, useEffect } from "react";
import HeroWizard from "../../components/HeroWizard";
import SEO from "../../components/SEO";

const PatientCare = () => {
  const [modalType, setModalType] = useState(null);

  const [modalConfig, setModalConfig] = useState({ service: null, format: null });

  const openModal = (type) => {
    if (type === "livein") {
      setModalConfig({ service: "Patient Care", format: "Live-In" });
    } else if (type === "substitute") {
      setModalConfig({ service: "Patient Care", format: "Substitute" });
    } else {
      setModalConfig({ service: "Patient Care", format: null });
    }
    setModalType(type);
  };

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

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <>
      <SEO
        title="Patient Care Services at Home | Trained Caregivers for Elderly & Recovery"
        description="Hire professional patient caregivers for home care including elderly support, post-surgery recovery, bedridden care, and 24x7 assistance. Verified and trained staff available."
        canonical="/services/patient-care"
        ogImage="https://res.cloudinary.com/dhtzknkdr/image/upload/v1773031910/patientcare_b3oqgg.webp"
      />
      {/* ================= HERO SECTION ================= */}
      <section className="bg-bgLight py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 w-[400px] h-[400px] bg-primary/30 rounded-full blur-3xl z-0"></div>
        <div className="absolute bottom-0 left-0 -translate-x-1/3 translate-y-1/3 w-[400px] h-[400px] bg-primary/30 rounded-full blur-3xl z-0"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-left">
            <h1 className="text-4xl md:text-5xl font-bold text-textDark leading-tight mb-6">
              Professional & <span className="text-primary">Compassionate</span>{" "}
              <br />
              Patient Care <span className="text-primary">Services</span>
            </h1>

            <ul className="text-textLight mb-8 space-y-3">
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                  ✓
                </span>
                <span>
                  Trained caregivers for elderly & recovering patients
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                  ✓
                </span>
                <span>Post-surgery & hospital discharge care</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                  ✓
                </span>
                <span>Medication reminders & routine monitoring</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                  ✓
                </span>
                <span>Mobility, hygiene & daily living assistance</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                  ✓
                </span>
                <span>Full-time, part-time & 24x7 options</span>
              </li>
            </ul>

            <button
              onClick={() => openModal("general")}
              className="bg-primary hover:bg-primaryHover text-white px-6 py-3 rounded-xl font-semibold transition duration-300 shadow-md"
            >
              Hire Patient Caregiver
            </button>
          </div>

          <div className="flex justify-center md:justify-end animate-right">
            <img
              src="https://res.cloudinary.com/dhtzknkdr/image/upload/v1773031910/patientcare_b3oqgg.webp"
              alt="Patient Care Service"
              className="rounded-2xl h-[350px] md:h-[520px] shadow-xl w-full max-w-md object-cover"
            />
          </div>
        </div>
      </section>

      {/* ================= CARE CATEGORIES ================= */}
      <section className="bg-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 scroll-section">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-textDark mb-4">
              Choose Your Care Category
            </h2>
            <p className="text-textLight max-w-2xl mx-auto">
              Flexible patient care options designed for short-term recovery and
              long-term support.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 items-center">
            {/* LIVE-IN */}
            <div className="group relative bg-[#FFD6CC] rounded-3xl p-8 border border-borderLight hover:shadow-2xl transition-all duration-500 overflow-hidden transform scale-105 z-10">
              <span className="absolute top-6 right-6 bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full">
                Most Popular
              </span>

              <div className="text-5xl mb-6">🏥</div>

              <h3 className="text-3xl font-bold text-textDark mb-4">
                24x7 Live-In Caregiver
              </h3>

              <ul className="text-textLight mb-8 space-y-3">
                <li>✓ 24/7 dedicated patient support</li>
                <li>✓ Bedridden & elderly care</li>
                <li>✓ Hygiene & personal care assistance</li>
                <li>✓ Medication & routine monitoring</li>
                <li>✓ Emergency-ready trained caregiver</li>
              </ul>

              <button
                onClick={() => openModal("livein")}
                className="bg-primary hover:bg-primaryHover text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                Hire Full-Time Caregiver
              </button>
            </div>

            {/* SUBSTITUTE */}
            <div className="group relative bg-bgLight rounded-3xl p-8 border border-borderLight hover:shadow-2xl transition-all duration-500">
              <span className="absolute top-6 right-6 bg-green-100 text-green-600 text-xs font-semibold px-3 py-1 rounded-full">
                Active
              </span>

              <div className="text-4xl mb-6">🔄</div>

              <h3 className="text-2xl font-bold text-textDark mb-4">
                Substitute Caregiver
              </h3>

              <ul className="text-textLight mb-8 space-y-3">
                <li>✓ Immediate short-term replacement</li>
                <li>✓ Temporary patient support</li>
                <li>✓ Flexible shift coverage</li>
                <li>✓ Verified & ready-to-deploy</li>
              </ul>

              <button
                onClick={() => openModal("substitute")}
                className="bg-primary hover:bg-primaryHover text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                Request Substitute Caregiver
              </button>
            </div>

            {/* LIVE-OUT */}
            <div className="group relative bg-gray-50 rounded-3xl p-6 border border-dashed border-gray-300 opacity-90 transform scale-90">
              <span className="absolute top-6 right-6 bg-gray-200 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">
                Coming Soon
              </span>

              <div className="text-4xl mb-6 text-gray-400">⏳</div>

              <h3 className="text-2xl font-bold text-gray-500 mb-4">
                Live-Out Caregiver
              </h3>

              <ul className="text-textLight mb-8 space-y-3">
                <li>✓ Day-shift patient assistance</li>
                <li>✓ Routine monitoring support</li>
                <li>✓ Hygiene & mobility help</li>
                <li>✓ Launching soon in selected cities</li>
              </ul>

              <button className="bg-gray-300 text-gray-500 px-6 py-3 rounded-xl font-semibold cursor-not-allowed">
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= LIVE-IN ROLES ================= */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20 scroll-section">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-textDark mb-3">
              Roles & Responsibilities of a 24x7 Live-In Caregiver
            </h2>
            <p className="text-textLight max-w-2xl mx-auto">
              Our professional live-in caregivers provide round-the-clock
              patient care, ensuring comfort, dignity, and medical support at
              home.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight">
              <div className="w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-xl">
                🛏️
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  Bedridden Assistance
                </h3>
                <p className="text-sm text-textLight">
                  Support with repositioning, mobility, and preventing bed
                  sores.
                </p>
              </div>
            </div>

            <div className="flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight">
              <div className="w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-xl">
                💊
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  Medication Monitoring
                </h3>
                <p className="text-sm text-textLight">
                  Ensuring timely medication intake and health tracking.
                </p>
              </div>
            </div>

            <div className="flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight">
              <div className="w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-xl">
                🧼
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  Personal Hygiene Care
                </h3>
                <p className="text-sm text-textLight">
                  Bathing, grooming, and maintaining patient cleanliness.
                </p>
              </div>
            </div>

            <div className="flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight">
              <div className="w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-xl">
                🤝
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  Emotional Support
                </h3>
                <p className="text-sm text-textLight">
                  Compassionate companionship and respectful care.
                </p>
              </div>
            </div>
            <div className="flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight">
              <div className="w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-xl">
                🍲
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  Dietary & Meal Assistance
                </h3>
                <p className="text-sm text-textLight">
                  Preparing meals as per medical and nutritional requirements.
                </p>
              </div>
            </div>

            <div className="flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight">
              <div className="w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-xl">
                🚶
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  Mobility & Exercise Support
                </h3>
                <p className="text-sm text-textLight">
                  Assisting with walking, light exercises, and fall prevention.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SUBSTITUTE ROLES */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20 scroll-section">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-textDark mb-3">
              Roles & Responsibilities of Substitute Caregivers
            </h2>
            <p className="text-textLight max-w-2xl mx-auto">
              Reliable short-term caregivers ensuring uninterrupted patient care
              during regular caregiver leave.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight">
              <div className="w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-xl">
                🔄
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  Immediate Replacement
                </h3>
                <p className="text-sm text-textLight">
                  Quick deployment to maintain uninterrupted patient care.
                </p>
              </div>
            </div>

            <div className="flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight">
              <div className="w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-xl">
                🛡️
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  Safe & Attentive Care
                </h3>
                <p className="text-sm text-textLight">
                  Maintaining safety, hygiene, and patient comfort.
                </p>
              </div>
            </div>
            <div className="flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight">
              <div className="w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-xl">
                💊
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  Medication Assistance
                </h3>
                <p className="text-sm text-textLight">
                  Ensuring timely medicines and basic health observation.
                </p>
              </div>
            </div>

            <div className="flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight">
              <div className="w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-xl">
                🧼
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Hygiene Support</h3>
                <p className="text-sm text-textLight">
                  Assistance with grooming and maintaining patient cleanliness.
                </p>
              </div>
            </div>

            <div className="flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight">
              <div className="w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-xl">
                🤝
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Companionship</h3>
                <p className="text-sm text-textLight">
                  Providing emotional reassurance and supportive presence.
                </p>
              </div>
            </div>

            <div className="flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight">
              <div className="w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-xl">
                🏥
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  Routine Care Continuity
                </h3>
                <p className="text-sm text-textLight">
                  Following existing care routines to ensure seamless support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

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

export default PatientCare;
