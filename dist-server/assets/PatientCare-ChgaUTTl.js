import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { S as SEO, H as HeroWizard } from "../entry-server.js";
import "react-dom/server";
import "react-router-dom";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "react-dom";
import "lucide-react";
import "axios";
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
      { threshold: 0.15 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Patient Care Services at Home | Trained Caregivers for Elderly & Recovery",
        description: "Hire professional patient caregivers for home care including elderly support, post-surgery recovery, bedridden care, and 24x7 assistance. Verified and trained staff available.",
        canonical: "/services/patient-care",
        ogImage: "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773031910/patientcare_b3oqgg.webp"
      }
    ),
    /* @__PURE__ */ jsxs("section", { className: "bg-bgLight py-20 relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 w-[400px] h-[400px] bg-primary/30 rounded-full blur-3xl z-0" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 -translate-x-1/3 translate-y-1/3 w-[400px] h-[400px] bg-primary/30 rounded-full blur-3xl z-0" }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "animate-left", children: [
          /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-textDark leading-tight mb-6", children: [
            "Professional & ",
            /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Compassionate" }),
            " ",
            /* @__PURE__ */ jsx("br", {}),
            "Patient Care ",
            /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Services" })
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "text-textLight mb-8 space-y-3", children: [
            /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
              /* @__PURE__ */ jsx("span", { children: "Trained caregivers for elderly & recovering patients" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
              /* @__PURE__ */ jsx("span", { children: "Post-surgery & hospital discharge care" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
              /* @__PURE__ */ jsx("span", { children: "Medication reminders & routine monitoring" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
              /* @__PURE__ */ jsx("span", { children: "Mobility, hygiene & daily living assistance" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
              /* @__PURE__ */ jsx("span", { children: "Full-time, part-time & 24x7 options" })
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => openModal("general"),
              className: "bg-primary hover:bg-primaryHover text-white px-6 py-3 rounded-xl font-semibold transition duration-300 shadow-md",
              children: "Hire Patient Caregiver"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-center md:justify-end animate-right", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773031910/patientcare_b3oqgg.webp",
            alt: "Patient Care Service",
            className: "rounded-2xl h-[350px] md:h-[520px] shadow-xl w-full max-w-md object-cover"
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "bg-white py-20 relative overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 scroll-section", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-textDark mb-4", children: "Choose Your Care Category" }),
        /* @__PURE__ */ jsx("p", { className: "text-textLight max-w-2xl mx-auto", children: "Flexible patient care options designed for short-term recovery and long-term support." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-10 items-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "group relative bg-[#FFD6CC] rounded-3xl p-8 border border-borderLight hover:shadow-2xl transition-all duration-500 overflow-hidden transform scale-105 z-10", children: [
          /* @__PURE__ */ jsx("span", { className: "absolute top-6 right-6 bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full", children: "Most Popular" }),
          /* @__PURE__ */ jsx("div", { className: "text-5xl mb-6", children: "🏥" }),
          /* @__PURE__ */ jsx("h3", { className: "text-3xl font-bold text-textDark mb-4", children: "24x7 Live-In Caregiver" }),
          /* @__PURE__ */ jsxs("ul", { className: "text-textLight mb-8 space-y-3", children: [
            /* @__PURE__ */ jsx("li", { children: "✓ 24/7 dedicated patient support" }),
            /* @__PURE__ */ jsx("li", { children: "✓ Bedridden & elderly care" }),
            /* @__PURE__ */ jsx("li", { children: "✓ Hygiene & personal care assistance" }),
            /* @__PURE__ */ jsx("li", { children: "✓ Medication & routine monitoring" }),
            /* @__PURE__ */ jsx("li", { children: "✓ Emergency-ready trained caregiver" })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => openModal("livein"),
              className: "bg-primary hover:bg-primaryHover text-white px-6 py-3 rounded-xl font-semibold transition",
              children: "Hire Full-Time Caregiver"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "group relative bg-bgLight rounded-3xl p-8 border border-borderLight hover:shadow-2xl transition-all duration-500", children: [
          /* @__PURE__ */ jsx("span", { className: "absolute top-6 right-6 bg-green-100 text-green-600 text-xs font-semibold px-3 py-1 rounded-full", children: "Active" }),
          /* @__PURE__ */ jsx("div", { className: "text-4xl mb-6", children: "🔄" }),
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-textDark mb-4", children: "Substitute Caregiver" }),
          /* @__PURE__ */ jsxs("ul", { className: "text-textLight mb-8 space-y-3", children: [
            /* @__PURE__ */ jsx("li", { children: "✓ Immediate short-term replacement" }),
            /* @__PURE__ */ jsx("li", { children: "✓ Temporary patient support" }),
            /* @__PURE__ */ jsx("li", { children: "✓ Flexible shift coverage" }),
            /* @__PURE__ */ jsx("li", { children: "✓ Verified & ready-to-deploy" })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => openModal("substitute"),
              className: "bg-primary hover:bg-primaryHover text-white px-6 py-3 rounded-xl font-semibold transition",
              children: "Request Substitute Caregiver"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "group relative bg-gray-50 rounded-3xl p-6 border border-dashed border-gray-300 opacity-90 transform scale-90", children: [
          /* @__PURE__ */ jsx("span", { className: "absolute top-6 right-6 bg-gray-200 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full", children: "Coming Soon" }),
          /* @__PURE__ */ jsx("div", { className: "text-4xl mb-6 text-gray-400", children: "⏳" }),
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-gray-500 mb-4", children: "Live-Out Caregiver" }),
          /* @__PURE__ */ jsxs("ul", { className: "text-textLight mb-8 space-y-3", children: [
            /* @__PURE__ */ jsx("li", { children: "✓ Day-shift patient assistance" }),
            /* @__PURE__ */ jsx("li", { children: "✓ Routine monitoring support" }),
            /* @__PURE__ */ jsx("li", { children: "✓ Hygiene & mobility help" }),
            /* @__PURE__ */ jsx("li", { children: "✓ Launching soon in selected cities" })
          ] }),
          /* @__PURE__ */ jsx("button", { className: "bg-gray-300 text-gray-500 px-6 py-3 rounded-xl font-semibold cursor-not-allowed", children: "Coming Soon" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 py-20 scroll-section", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-14", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-textDark mb-3", children: "Roles & Responsibilities of a 24x7 Live-In Caregiver" }),
        /* @__PURE__ */ jsx("p", { className: "text-textLight max-w-2xl mx-auto", children: "Our professional live-in caregivers provide round-the-clock patient care, ensuring comfort, dignity, and medical support at home." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight", children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-xl", children: "🛏️" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg mb-2", children: "Bedridden Assistance" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-textLight", children: "Support with repositioning, mobility, and preventing bed sores." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight", children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-xl", children: "💊" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg mb-2", children: "Medication Monitoring" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-textLight", children: "Ensuring timely medication intake and health tracking." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight", children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-xl", children: "🧼" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg mb-2", children: "Personal Hygiene Care" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-textLight", children: "Bathing, grooming, and maintaining patient cleanliness." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight", children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-xl", children: "🤝" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg mb-2", children: "Emotional Support" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-textLight", children: "Compassionate companionship and respectful care." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight", children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-xl", children: "🍲" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg mb-2", children: "Dietary & Meal Assistance" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-textLight", children: "Preparing meals as per medical and nutritional requirements." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight", children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-xl", children: "🚶" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg mb-2", children: "Mobility & Exercise Support" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-textLight", children: "Assisting with walking, light exercises, and fall prevention." })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 py-20 scroll-section", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-14", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-textDark mb-3", children: "Roles & Responsibilities of Substitute Caregivers" }),
        /* @__PURE__ */ jsx("p", { className: "text-textLight max-w-2xl mx-auto", children: "Reliable short-term caregivers ensuring uninterrupted patient care during regular caregiver leave." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight", children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-xl", children: "🔄" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg mb-2", children: "Immediate Replacement" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-textLight", children: "Quick deployment to maintain uninterrupted patient care." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight", children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-xl", children: "🛡️" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg mb-2", children: "Safe & Attentive Care" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-textLight", children: "Maintaining safety, hygiene, and patient comfort." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight", children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-xl", children: "💊" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg mb-2", children: "Medication Assistance" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-textLight", children: "Ensuring timely medicines and basic health observation." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight", children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-xl", children: "🧼" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg mb-2", children: "Hygiene Support" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-textLight", children: "Assistance with grooming and maintaining patient cleanliness." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight", children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-xl", children: "🤝" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg mb-2", children: "Companionship" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-textLight", children: "Providing emotional reassurance and supportive presence." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight", children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-xl", children: "🏥" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg mb-2", children: "Routine Care Continuity" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-textLight", children: "Following existing care routines to ensure seamless support." })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(
      HeroWizard,
      {
        asModal: true,
        isOpen: !!modalType,
        onClose: () => setModalType(null),
        initialService: modalConfig.service,
        initialFormat: modalConfig.format
      }
    )
  ] });
};
export {
  PatientCare as default
};
