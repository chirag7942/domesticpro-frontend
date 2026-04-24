import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { u as useScrollReveal, S as SEO, H as HeroWizard } from "../entry-server.js";
import "react-dom/server";
import "react-router-dom";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "react-dom";
import "lucide-react";
import "axios";
const Japa = () => {
  const [modalType, setModalType] = useState(null);
  const [modalConfig, setModalConfig] = useState({ service: null, format: null });
  const openModal = (type) => {
    if (type === "livein") {
      setModalConfig({ service: "Japa", format: "Live-In" });
    } else if (type === "substitute") {
      setModalConfig({ service: "Japa", format: "Substitute" });
    } else {
      setModalConfig({ service: "Japa", format: null });
    }
    setModalType(type);
  };
  useScrollReveal();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Professional Japa Services | Newborn & Postpartum Care at Home",
        description: "Hire trained Japa for expert newborn care and post-delivery support. Verified caregivers for mother recovery, baby hygiene, feeding, and 24x7 assistance.",
        canonical: "/services/japa",
        ogImage: "https://res.cloudinary.com/dto7bji6b/image/upload/v1774428751/japa_zzkowa.webp"
      }
    ),
    /* @__PURE__ */ jsxs("section", { className: "bg-bgLight py-20 relative overflow-hidden", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 \r\n                  w-[400px] h-[400px] bg-primary/30 rounded-full \r\n                  blur-3xl z-0"
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute bottom-0 left-0 -translate-x-1/3 translate-y-1/3 \r\n                  w-[400px] h-[400px] bg-primary/30 rounded-full \r\n                  blur-3xl z-0"
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-[1.3fr_1fr] gap-12 items-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "animate-left", children: [
          /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-textDark leading-tight mb-6", children: [
            "Caring &",
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Trusted Professional" }),
            " Japa Help"
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "text-textLight mb-8 space-y-3", children: [
            /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
              /* @__PURE__ */ jsx("span", { children: "Trained in post-delivery mother care" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
              /* @__PURE__ */ jsx("span", { children: "Expert newborn handling & hygiene support" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
              /* @__PURE__ */ jsx("span", { children: "Feeding, massage & recovery assistance" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
              /* @__PURE__ */ jsx("span", { children: "Safe, caring & 24x7 live-in support" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-4", children: /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => openModal("general"),
              className: "bg-primary hover:bg-primaryHover text-white px-6 py-3 rounded-xl font-semibold transition duration-300 shadow-md",
              children: "Hire Now"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-center md:justify-end animate-right", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: "https://res.cloudinary.com/dto7bji6b/image/upload/v1774428751/japa_zzkowa.webp",
            alt: "Domestic Pro Japa ",
            className: "rounded-2xl shadow-xl w-full h-[350px] md:h-[450px]  max-w-md object-cover"
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "bg-white py-20 relative overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 scroll-section", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-textDark mb-4", children: "Choose Your Japa Category" }),
        /* @__PURE__ */ jsx("p", { className: "text-textLight max-w-2xl mx-auto", children: "Flexible postpartum and newborn care solutions designed to support mothers and babies with trained, experienced Japa." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-10 items-center", children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "group relative bg-[#FFD6CC] \r\n                rounded-3xl p-8 border border-borderLight\r\n                hover:shadow-2xl transition-all duration-500 overflow-hidden transform scale-105 z-10",
            children: [
              /* @__PURE__ */ jsx("span", { className: "absolute top-6 right-6 bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full", children: "Most Popular" }),
              /* @__PURE__ */ jsx("div", { className: "text-5xl mb-6", children: "👶" }),
              /* @__PURE__ */ jsx("h3", { className: "text-3xl font-bold text-textDark mb-4", children: "24x7 Live-In Japa" }),
              /* @__PURE__ */ jsxs("ul", { className: "text-textLight mb-8 space-y-3", children: [
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
                  /* @__PURE__ */ jsx("span", { children: "Full-time postpartum & newborn care support" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
                  /* @__PURE__ */ jsx("span", { children: "Mother recovery & baby hygiene assistance" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
                  /* @__PURE__ */ jsx("span", { children: "Day & night newborn supervision" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
                  /* @__PURE__ */ jsx("span", { children: "Trusted, experienced & caring professionals" })
                ] })
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => openModal("livein"),
                  className: "relative z-10 bg-primary hover:bg-primaryHover text-white px-6 py-3 rounded-xl font-semibold transition",
                  children: "Hire Live-In Japa"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition duration-500" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "group relative bg-bgLight rounded-3xl p-8 border border-borderLight\r\n                hover:shadow-2xl transition-all duration-500 overflow-hidden transform scale-100",
            children: [
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: "absolute top-6 right-6 bg-green-100 text-green-600 \r\n                   text-xs font-semibold px-3 py-1 rounded-full",
                  children: "Active"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "text-4xl mb-6", children: "🔄" }),
              /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-textDark mb-4", children: "Substitute Japa" }),
              /* @__PURE__ */ jsxs("ul", { className: "text-textLight mb-8 space-y-3", children: [
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
                  /* @__PURE__ */ jsx("span", { children: "Immediate replacement during leave" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
                  /* @__PURE__ */ jsx("span", { children: "No disruption to mother & baby routine" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
                  /* @__PURE__ */ jsx("span", { children: "Experienced in newborn & recovery care" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
                  /* @__PURE__ */ jsx("span", { children: "Reliable support anytime needed" })
                ] })
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => openModal("substitute"),
                  className: "relative z-10 bg-primary hover:bg-primaryHover text-white px-6 py-3 rounded-xl font-semibold transition",
                  children: "Request Substitute"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition duration-500" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "group relative bg-gray-50 rounded-3xl p-6 border border-dashed border-gray-300\r\n                transition-all duration-500 overflow-hidden opacity-90 transform scale-90",
            children: [
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: "absolute top-6 right-6 bg-gray-200 text-gray-600 \r\n                   text-xs font-semibold px-3 py-1 rounded-full",
                  children: "Coming Soon"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "text-4xl mb-6 text-gray-400", children: "⏳" }),
              /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-gray-500 mb-4", children: "Live-Out Japa" }),
              /* @__PURE__ */ jsxs("ul", { className: "text-textLight mb-8 space-y-3", children: [
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
                  /* @__PURE__ */ jsx("span", { children: "Professional day-time postpartum support" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
                  /* @__PURE__ */ jsx("span", { children: "Scheduled visits for newborn care" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
                  /* @__PURE__ */ jsx("span", { children: "Trained & compassionate caregivers" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
                  /* @__PURE__ */ jsx("span", { children: "Launching soon in selected cities" })
                ] })
              ] }),
              /* @__PURE__ */ jsx("button", { className: "bg-gray-300 text-gray-500 px-6 py-3 rounded-xl font-semibold cursor-not-allowed", children: "Coming Soon" })
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-gray-100 ", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 py-20 scroll-section", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-14", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-textDark mb-3", children: "Why Choose Domestic Pro for Japa Services?" }),
        /* @__PURE__ */ jsx("p", { className: "text-textLight max-w-2xl mx-auto", children: "We provide reliable, verified, and professional Japa with a seamless hiring experience." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-6 text-center hover:shadow-lg transition", children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-2xl mx-auto mb-4", children: "✓" }),
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Verified Japa" }),
          /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "All Japa undergo strict background verification, ID checks, and skill screening before placement." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-6 text-center hover:shadow-lg transition", children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-2xl mx-auto mb-4", children: "🏠" }),
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Full-Time Japa Support" }),
          /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Dedicated Japa who stay with your family and manage daily household tasks with care and responsibility." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-6 text-center hover:shadow-lg transition", children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-2xl mx-auto mb-4", children: "🔄" }),
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Substitute Japa Support" }),
          /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Immediate replacement provided if your regular Japa is unavailable — ensuring smooth and uninterrupted service." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-6 text-center hover:shadow-lg transition", children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-2xl mx-auto mb-4", children: "🤝" }),
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Trusted & Reliable Japa Services" }),
          /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Structured onboarding, continuous monitoring, and ongoing support to ensure safe, dependable, and professional Japa services." })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-white ", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 py-20 scroll-section", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-14", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-textDark mb-3", children: "Roles & Responsibilities of a 24x7 Live-In Japa" }),
        /* @__PURE__ */ jsx("p", { className: "text-textLight max-w-2xl mx-auto", children: "Our professionally trained Japas ensure complete newborn care and postpartum support with dedication, expertise, and compassion." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight \r\n                hover:shadow-xl hover:-translate-y-2 transition-transform duration-500 group",
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "w-14 h-14 bg-primary/10 text-primary \r\n                  flex items-center justify-center \r\n                  rounded-full text-xl flex-shrink-0\r\n                  group-hover:bg-primary group-hover:text-white\r\n                  transition duration-500",
                  children: "👶"
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Newborn Care" }),
                /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Feeding, burping, diaper changing, and gentle handling of newborns." })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight \r\n                hover:shadow-xl hover:-translate-y-2 transition-transform duration-500 group",
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "w-14 h-14 bg-primary/10 text-primary \r\n                  flex items-center justify-center \r\n                  rounded-full text-xl flex-shrink-0\r\n                  group-hover:bg-primary group-hover:text-white\r\n                  transition duration-500",
                  children: "🤱"
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Mother Support" }),
                /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Assisting post-delivery recovery, monitoring health, and providing comfort." })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight \r\n                hover:shadow-xl hover:-translate-y-2 transition-transform duration-500 group",
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "w-14 h-14 bg-primary/10 text-primary \r\n                  flex items-center justify-center \r\n                  rounded-full text-xl flex-shrink-0\r\n                  group-hover:bg-primary group-hover:text-white\r\n                  transition duration-500",
                  children: "🛌"
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Sleep & Comfort Management" }),
                /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Monitoring baby’s sleep routines and ensuring a comfortable environment." })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight \r\n                hover:shadow-xl hover:-translate-y-2 transition-transform duration-500 group",
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "w-14 h-14 bg-primary/10 text-primary \r\n                  flex items-center justify-center \r\n                  rounded-full text-xl flex-shrink-0\r\n                  group-hover:bg-primary group-hover:text-white\r\n                  transition duration-500",
                  children: "🍼"
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Feeding Assistance" }),
                /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Helping with breastfeeding, formula preparation, and bottle feeding." })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight \r\n                hover:shadow-xl hover:-translate-y-2 transition-transform duration-500 group",
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "w-14 h-14 bg-primary/10 text-primary \r\n                  flex items-center justify-center \r\n                  rounded-full text-xl flex-shrink-0\r\n                  group-hover:bg-primary group-hover:text-white\r\n                  transition duration-500",
                  children: "🧴"
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Hygiene & Sanitation" }),
                /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Keeping baby’s environment, bedding, and essentials clean and sanitized." })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight \r\n                hover:shadow-xl hover:-translate-y-2 transition-transform duration-500 group",
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "w-14 h-14 bg-primary/10 text-primary \r\n                  flex items-center justify-center \r\n                  rounded-full text-xl flex-shrink-0\r\n                  group-hover:bg-primary group-hover:text-white\r\n                  transition duration-500",
                  children: "⏰"
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "24x7 Availability" }),
                /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Round-the-clock support for both mother and baby, ensuring care at all times." })
              ] })
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 py-20 scroll-section", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-14", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-textDark mb-3", children: "Roles & Responsibilities of Substitute Japa Staff" }),
        /* @__PURE__ */ jsx("p", { className: "text-textLight max-w-2xl mx-auto", children: "Our trained Japa staff provide reliable temporary support, ensuring your household runs smoothly even during staff leave or emergencies." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight \r\n                hover:shadow-xl hover:-translate-y-2 transition-transform duration-500 group ",
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "w-14 h-14 bg-primary/10 text-primary \r\n                  flex items-center justify-center \r\n                  rounded-full text-xl flex-shrink-0\r\n                  group-hover:bg-primary group-hover:text-white\r\n                  transition duration-500 ",
                  children: "🔄"
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Immediate Replacement Support" }),
                /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Quick deployment of verified Japa staff to ensure no disruption in daily household routines." })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight \r\n                hover:shadow-xl hover:-translate-y-2 transition-transform duration-500 group ",
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "w-14 h-14 bg-primary/10 text-primary \r\n                  flex items-center justify-center \r\n                  rounded-full text-xl flex-shrink-0\r\n                  group-hover:bg-primary group-hover:text-white\r\n                  transition duration-500",
                  children: "🧹"
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Household Cleaning & Maintenance" }),
                /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Managing daily cleaning, organizing spaces, and maintaining hygiene standards as per your requirements." })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight \r\n                hover:shadow-xl hover:-translate-y-2 transition-transform duration-500 group",
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "w-14 h-14 bg-primary/10 text-primary \r\n                  flex items-center justify-center \r\n                  rounded-full text-xl flex-shrink-0\r\n                  group-hover:bg-primary group-hover:text-white\r\n                  transition duration-500",
                  children: "👶"
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Child or Elderly Assistance" }),
                /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Providing attentive care and support to children or elderly family members during temporary assignments." })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight \r\n                hover:shadow-xl hover:-translate-y-2 transition-transform duration-500 group",
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "w-14 h-14 bg-primary/10 text-primary \r\n                  flex items-center justify-center \r\n                  rounded-full text-xl flex-shrink-0\r\n                  group-hover:bg-primary group-hover:text-white\r\n                  transition duration-500",
                  children: "🍳"
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Cooking & Kitchen Support" }),
                /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Meal preparation assistance, kitchen cleanliness, and support for daily cooking requirements." })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight \r\n                hover:shadow-xl hover:-translate-y-2 transition-transform duration-500 group",
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "w-14 h-14 bg-primary/10 text-primary \r\n                  flex items-center justify-center \r\n                  rounded-full text-xl flex-shrink-0\r\n                  group-hover:bg-primary group-hover:text-white\r\n                  transition duration-500",
                  children: "🧺"
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Laundry & Organization" }),
                /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Handling laundry tasks, folding clothes, and ensuring organized storage of household items." })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight \r\n                hover:shadow-xl hover:-translate-y-2 transition-transform duration-500 group",
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "w-14 h-14 bg-primary/10 text-primary \r\n                  flex items-center justify-center \r\n                  rounded-full text-xl flex-shrink-0\r\n                  group-hover:bg-primary group-hover:text-white\r\n                  transition duration-500",
                  children: "⏳"
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Flexible Short-Term Service" }),
                /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Available for short durations, emergencies, or temporary staffing needs with professionalism and reliability." })
              ] })
            ]
          }
        )
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
  Japa as default
};
