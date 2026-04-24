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
const Nanny = () => {
  const [modalType, setModalType] = useState(null);
  const [modalConfig, setModalConfig] = useState({ service: null, format: null });
  const openModal = (type) => {
    if (type === "livein") {
      setModalConfig({ service: "Baby Caretaker", format: "Live-In" });
    } else if (type === "substitute") {
      setModalConfig({ service: "Baby Caretaker", format: "Substitute" });
    } else {
      setModalConfig({ service: "Baby Caretaker", format: null });
    }
    setModalType(type);
  };
  useScrollReveal();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Baby Caretaker & Nanny Services | Verified Personal Baby Caretaker",
        description: "Hire verified, trained baby caretakers for newborns, infants and toddlers. Live-in and substitute nanny services available in Delhi-NCR.",
        canonical: "/services/baby-caretaker",
        ogImage: "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773031909/nanny_cvkz9g.webp"
      }
    ),
    /* @__PURE__ */ jsxs("section", { className: "bg-bgLight py-20 relative overflow-hidden", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 \r\n                        w-[400px] h-[400px] bg-primary/30 rounded-full \r\n                        blur-3xl z-0"
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute bottom-0 left-0 -translate-x-1/3 translate-y-1/3 \r\n                        w-[400px] h-[400px] bg-primary/30 rounded-full \r\n                        blur-3xl z-0"
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-[1.3fr_1fr] gap-12 items-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "animate-left", children: [
          /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-textDark leading-tight mb-6", children: [
            "Caring &",
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-primary", children: "On-Demand & Verified" }),
            " Baby Caretakers"
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "text-textLight mb-8 space-y-3", children: [
            /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
              /* @__PURE__ */ jsx("span", { children: "Verified & trained infant care specialists" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
              /* @__PURE__ */ jsx("span", { children: "Newborn handling & mother support expertise" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
              /* @__PURE__ */ jsx("span", { children: "Feeding, burping & diaper changing care" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
              /* @__PURE__ */ jsx("span", { children: "Sleep routine & comfort management" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
              /* @__PURE__ */ jsx("span", { children: "Full-time, part-time & 24x7 care options" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
              /* @__PURE__ */ jsx("span", { children: "Safe, gentle & hygiene-focused support" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-4", children: /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => openModal("general"),
              className: "bg-primary hover:bg-primaryHover text-white px-6 py-3 rounded-xl font-semibold transition duration-300 shadow-md",
              children: "Hire a Baby Caretaker"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-center md:justify-end animate-right", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773031909/nanny_cvkz9g.webp",
            alt: "Domestic Pro Baby Caretaker",
            className: "rounded-2xl shadow-xl w-full h-[350px] md:h-[480px]   "
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "bg-white py-20 relative overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 scroll-section", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-textDark mb-4", children: "Choose Your Baby Caretaker Category" }),
        /* @__PURE__ */ jsx("p", { className: "text-textLight max-w-2xl mx-auto", children: "Flexible baby caretaker hiring options designed especially for newborns and infants." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-10 items-center", children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "group relative bg-[#FFD6CC] \r\n                      rounded-3xl p-8 border border-borderLight\r\n                      hover:shadow-2xl transition-all duration-500 overflow-hidden transform scale-105 z-10",
            children: [
              /* @__PURE__ */ jsx("span", { className: "absolute top-6 right-6 bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full", children: "Most Popular" }),
              /* @__PURE__ */ jsx("div", { className: "text-5xl mb-6", children: "🧸" }),
              /* @__PURE__ */ jsx("h3", { className: "text-3xl font-bold text-textDark mb-4", children: "24x7 Live-In Baby Caretakers" }),
              /* @__PURE__ */ jsxs("ul", { className: "text-textLight mb-8 space-y-3", children: [
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
                  /* @__PURE__ */ jsx("span", { children: "24/7 dedicated newborn care" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
                  /* @__PURE__ */ jsx("span", { children: "Expert in post-delivery baby handling" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
                  /* @__PURE__ */ jsx("span", { children: "Feeding, burping & sleep supervision" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
                  /* @__PURE__ */ jsx("span", { children: "Diaper changing & hygiene management" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
                  /* @__PURE__ */ jsx("span", { children: "Night-time monitoring & comfort care" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
                  /* @__PURE__ */ jsx("span", { children: "Trusted, verified & background-checked" })
                ] })
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => openModal("livein"),
                  className: "relative z-10 bg-primary hover:bg-primaryHover text-white px-6 py-3 rounded-xl font-semibold transition",
                  children: "Hire Full-Time Baby Caretaker"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition duration-500" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "group relative bg-bgLight rounded-3xl p-8 border border-borderLight\r\n                      hover:shadow-2xl transition-all duration-500 overflow-hidden transform scale-100",
            children: [
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: "absolute top-6 right-6 bg-green-100 text-green-600 \r\n                         text-xs font-semibold px-3 py-1 rounded-full",
                  children: "Active"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "text-4xl mb-6", children: "🔄" }),
              /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-textDark mb-4", children: "Substitute Baby Caretaker" }),
              /* @__PURE__ */ jsxs("ul", { className: "text-textLight mb-8 space-y-3", children: [
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
                  /* @__PURE__ */ jsx("span", { children: "Immediate short-term baby care support" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
                  /* @__PURE__ */ jsx("span", { children: "Temporary newborn supervision" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
                  /* @__PURE__ */ jsx("span", { children: "Quick onboarding & flexible hours" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
                  /* @__PURE__ */ jsx("span", { children: "Verified & ready-to-deploy professionals" })
                ] })
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => openModal("substitute"),
                  className: "relative z-10 bg-primary hover:bg-primaryHover text-white px-6 py-3 rounded-xl font-semibold transition",
                  children: "Request Substitute Baby Caretaker"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition duration-500" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "group relative bg-gray-50 rounded-3xl p-6 border border-dashed border-gray-300\r\n                      transition-all duration-500 overflow-hidden opacity-90 transform scale-90",
            children: [
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: "absolute top-6 right-6 bg-gray-200 text-gray-600 \r\n                         text-xs font-semibold px-3 py-1 rounded-full",
                  children: "Coming Soon"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "text-4xl mb-6 text-gray-400", children: "⏳" }),
              /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-gray-500 mb-4", children: "Live-Out Baby Caretakers" }),
              /* @__PURE__ */ jsxs("ul", { className: "text-textLight mb-8 space-y-3", children: [
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
                  /* @__PURE__ */ jsx("span", { children: "Day-shift newborn care support" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
                  /* @__PURE__ */ jsx("span", { children: "Part-time infant supervision" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
                  /* @__PURE__ */ jsx("span", { children: "Routine feeding & sleep management" })
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
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-textDark mb-3", children: "Why Choose Domestic Pro for Baby Caretakers?" }),
        /* @__PURE__ */ jsx("p", { className: "text-textLight max-w-2xl mx-auto", children: "Trusted baby care professionals providing safety, hygiene, and nurturing support for your newborn." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-6 text-center hover:shadow-lg transition", children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-2xl mx-auto mb-4", children: "🛡️" }),
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Background Verified Caretakers" }),
          /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Thorough identity checks, police verification, and reference screening for complete safety." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-6 text-center hover:shadow-lg transition", children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-2xl mx-auto mb-4", children: "🎓" }),
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Trained Infant Care Specialists" }),
          /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Specialized in newborn handling, feeding routines, and post-delivery baby care support." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-6 text-center hover:shadow-lg transition", children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-2xl mx-auto mb-4", children: "🔄" }),
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Quick Replacement Guarantee" }),
          /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Immediate substitute baby caretaker support during leave or emergencies." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-6 text-center hover:shadow-lg transition", children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-2xl mx-auto mb-4", children: "💖" }),
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Gentle & Loving Care" }),
          /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Compassionate infant care focused on comfort, hygiene, and healthy development." })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 py-20 scroll-section", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-14", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-textDark mb-3", children: "Roles & Responsibilities of a 24x7 Live-In Baby Caretaker" }),
        /* @__PURE__ */ jsx("p", { className: "text-textLight max-w-2xl mx-auto", children: "Our professionally trained live-in baby caretakers provide round-the-clock newborn support, ensuring safety, hygiene, comfort, and proper development." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight \r\n                      hover:shadow-xl hover:-translate-y-2 transition-transform duration-500 group",
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "w-14 h-14 bg-primary/10 text-primary \r\n                        flex items-center justify-center \r\n                        rounded-full text-xl flex-shrink-0\r\n                        group-hover:bg-primary group-hover:text-white\r\n                        transition duration-500",
                  children: "👶"
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "24x7 Infant Supervision" }),
                /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Round-the-clock monitoring, handling, and safety care for newborns and infants." })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight \r\n                      hover:shadow-xl hover:-translate-y-2 transition-transform duration-500 group",
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "w-14 h-14 bg-primary/10 text-primary \r\n                        flex items-center justify-center \r\n                        rounded-full text-xl flex-shrink-0\r\n                        group-hover:bg-primary group-hover:text-white\r\n                        transition duration-500",
                  children: "🛡️"
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Hygiene & Sanitization Care" }),
                /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Maintaining baby hygiene, sterilizing feeding bottles, and ensuring clean surroundings." })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight \r\n                      hover:shadow-xl hover:-translate-y-2 transition-transform duration-500 group",
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "w-14 h-14 bg-primary/10 text-primary \r\n                        flex items-center justify-center \r\n                        rounded-full text-xl flex-shrink-0\r\n                        group-hover:bg-primary group-hover:text-white\r\n                        transition duration-500",
                  children: "🍼"
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Feeding & Daily Routine Management" }),
                /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Managing meals, bottle feeding, nap schedules, school routines, and daily activities." })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight \r\n                      hover:shadow-xl hover:-translate-y-2 transition-transform duration-500 group",
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "w-14 h-14 bg-primary/10 text-primary \r\n                        flex items-center justify-center \r\n                        rounded-full text-xl flex-shrink-0\r\n                        group-hover:bg-primary group-hover:text-white\r\n                        transition duration-500",
                  children: "🎨"
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Feeding & Sleep Management" }),
                /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Managing breastfeeding support, formula feeding, burping, and sleep routines." })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight \r\n                      hover:shadow-xl hover:-translate-y-2 transition-transform duration-500 group",
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "w-14 h-14 bg-primary/10 text-primary \r\n                        flex items-center justify-center \r\n                        rounded-full text-xl flex-shrink-0\r\n                        group-hover:bg-primary group-hover:text-white\r\n                        transition duration-500",
                  children: "👩‍👧"
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Development & Stimulation Support" }),
                /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Age-appropriate interaction, gentle stimulation, and early sensory development activities." })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight \r\n                      hover:shadow-xl hover:-translate-y-2 transition-transform duration-500 group",
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "w-14 h-14 bg-primary/10 text-primary \r\n                        flex items-center justify-center \r\n                        rounded-full text-xl flex-shrink-0\r\n                        group-hover:bg-primary group-hover:text-white\r\n                        transition duration-500",
                  children: "🤝"
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Emotional Comfort & Bonding" }),
                /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Providing warmth, soothing care, and nurturing attention for healthy growth." })
              ] })
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-white ", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 py-20 scroll-section", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-14", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-textDark mb-3", children: "Roles & Responsibilities of Substitute Baby Caretakers" }),
        /* @__PURE__ */ jsx("p", { className: "text-textLight max-w-2xl mx-auto", children: "Our trained substitute baby caretakers ensure uninterrupted newborn care during regular caretaker leave or emergencies." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight \r\n                      hover:shadow-xl hover:-translate-y-2 transition-transform duration-500 group ",
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "w-14 h-14 bg-primary/10 text-primary \r\n                        flex items-center justify-center \r\n                        rounded-full text-xl flex-shrink-0\r\n                        group-hover:bg-primary group-hover:text-white\r\n                        transition duration-500 ",
                  children: "🔄"
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Immediate Replacement Support" }),
                /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Quick deployment of verified substitute baby caretakers for uninterrupted care." })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight \r\n                      hover:shadow-xl hover:-translate-y-2 transition-transform duration-500 group ",
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "w-14 h-14 bg-primary/10 text-primary \r\n                        flex items-center justify-center \r\n                        rounded-full text-xl flex-shrink-0\r\n                        group-hover:bg-primary group-hover:text-white\r\n                        transition duration-500",
                  children: "👶"
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Safe Infant Handling" }),
                /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Ensuring gentle handling, safety, and attentive newborn supervision." })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight \r\n                      hover:shadow-xl hover:-translate-y-2 transition-transform duration-500 group",
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "w-14 h-14 bg-primary/10 text-primary \r\n                        flex items-center justify-center \r\n                        rounded-full text-xl flex-shrink-0\r\n                        group-hover:bg-primary group-hover:text-white\r\n                        transition duration-500",
                  children: "🍼"
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Feeding & Routine Support" }),
                /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Managing bottle feeding, burping, nap schedules, and comfort routines." })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight \r\n                      hover:shadow-xl hover:-translate-y-2 transition-transform duration-500 group",
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "w-14 h-14 bg-primary/10 text-primary \r\n                        flex items-center justify-center \r\n                        rounded-full text-xl flex-shrink-0\r\n                        group-hover:bg-primary group-hover:text-white\r\n                        transition duration-500",
                  children: "🧼"
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Hygiene & Cleanliness" }),
                /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Maintaining personal hygiene, clean surroundings, and sanitised child-related items." })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight \r\n                      hover:shadow-xl hover:-translate-y-2 transition-transform duration-500 group",
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "w-14 h-14 bg-primary/10 text-primary \r\n                        flex items-center justify-center \r\n                        rounded-full text-xl flex-shrink-0\r\n                        group-hover:bg-primary group-hover:text-white\r\n                        transition duration-500",
                  children: "🎨"
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Comfort & Play Interaction" }),
                /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Engaging infants with gentle play and emotional reassurance." })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight \r\n                      hover:shadow-xl hover:-translate-y-2 transition-transform duration-500 group",
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "w-14 h-14 bg-primary/10 text-primary \r\n                        flex items-center justify-center \r\n                        rounded-full text-xl flex-shrink-0\r\n                        group-hover:bg-primary group-hover:text-white\r\n                        transition duration-500",
                  children: "🤝"
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Compassionate & Responsible Care" }),
                /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Providing respectful, warm, and dependable baby care support." })
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
  Nanny as default
};
