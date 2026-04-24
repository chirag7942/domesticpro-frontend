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
const HouseHelp = () => {
  const [modalType, setModalType] = useState(null);
  const [modalConfig, setModalConfig] = useState({ service: null, format: null });
  const openModal = (type) => {
    if (type === "livein") {
      setModalConfig({ service: "Live-in Support", format: "Live-In" });
    } else if (type === "substitute") {
      setModalConfig({ service: "Live-in Support", format: "Substitute" });
    } else {
      setModalConfig({ service: "Live-in Support", format: null });
    }
    setModalType(type);
  };
  useScrollReveal();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Hire Live-In Housekeepers & Full-Time Housekeeper Services | Domestic Pro",
        description: "Hire verified live-in housekeepers for 24x7 home support. Domestic Pro provides trained maids for cleaning, laundry, and household management with instant substitute staff available.",
        canonical: "/services/live-in-housekeepers",
        ogImage: "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773031902/house-keeper_cwr1ph.webp"
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
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "animate-left", children: [
          /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-textDark leading-tight mb-6", children: [
            "Trusted ",
            /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Live-In Support" }),
            " ",
            /* @__PURE__ */ jsx("br", {}),
            " for ",
            /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Your Home & Family" })
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "text-textLight mb-8 space-y-3", children: [
            /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
              /* @__PURE__ */ jsx("span", { children: "Verified & professionally trained staff" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
              /* @__PURE__ */ jsx("span", { children: "Complete daily household management" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
              /* @__PURE__ */ jsx("span", { children: "Reliable 24x7 live-in support" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
              /* @__PURE__ */ jsx("span", { children: "Safe, disciplined & trustworthy service" })
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
            src: "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773031902/house-keeper_cwr1ph.webp",
            alt: "Domestic Pro Housekeeper",
            className: "rounded-2xl shadow-xl w-full max-w-md object-cover"
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "bg-white py-20 relative overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 scroll-section", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-textDark mb-4", children: "Choose Your Housekeeper Category" }),
        /* @__PURE__ */ jsx("p", { className: "text-textLight max-w-2xl mx-auto", children: "Flexible staffing solutions designed to match your household needs with verified and professionally managed support." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-10 items-center", children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "group relative bg-[#FFD6CC] \r\n                      rounded-3xl p-8 border border-borderLight\r\n                      hover:shadow-2xl transition-all duration-500 overflow-hidden transform scale-105 z-10",
            children: [
              /* @__PURE__ */ jsx("span", { className: "absolute top-6 right-6 bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full", children: "Most Popular" }),
              /* @__PURE__ */ jsx("div", { className: "text-5xl mb-6", children: "🏠" }),
              /* @__PURE__ */ jsx("h3", { className: "text-3xl font-bold text-textDark mb-4", children: "24x7 Live-In Housekeepers" }),
              /* @__PURE__ */ jsxs("ul", { className: "text-textLight mb-8 space-y-3", children: [
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
                  /* @__PURE__ */ jsx("span", { children: "Full-time housekeeper with your family" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
                  /* @__PURE__ */ jsx("span", { children: "Daily cleaning & laundry management" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
                  /* @__PURE__ */ jsx("span", { children: "Reliable 24x7 support" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
                  /* @__PURE__ */ jsx("span", { children: "Trustworthy, safe & disciplined" })
                ] })
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => openModal("livein"),
                  className: "relative z-10 bg-primary hover:bg-primaryHover text-white px-6 py-3 rounded-xl font-semibold transition",
                  children: "Hire Live-In Staff"
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
              /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-textDark mb-4", children: "Substitute Staff" }),
              /* @__PURE__ */ jsxs("ul", { className: "text-textLight mb-8 space-y-3", children: [
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
                  /* @__PURE__ */ jsx("span", { children: "Immediate replacement if needed" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
                  /* @__PURE__ */ jsx("span", { children: "No disruption to your household" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
                  /* @__PURE__ */ jsx("span", { children: "Trained professionals for smooth transition" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
                  /* @__PURE__ */ jsx("span", { children: "Reliable support anytime you need" })
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
              /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-gray-500 mb-4", children: "Live-Out Housekeepers" }),
              /* @__PURE__ */ jsxs("ul", { className: "text-textLight mb-8 space-y-3", children: [
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
                  /* @__PURE__ */ jsx("span", { children: "Professional day-shift housekeepers" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
                  /* @__PURE__ */ jsx("span", { children: "Scheduled home visits for specific hours" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
                  /* @__PURE__ */ jsx("span", { children: "Reliable and trained staff" })
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
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-textDark mb-3", children: "Why Choose Domestic Pro for HouseKeepers?" }),
        /* @__PURE__ */ jsx("p", { className: "text-textLight max-w-2xl mx-auto", children: "We provide reliable, verified, and professional household staff with a seamless hiring experience." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-6 text-center hover:shadow-lg transition", children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-2xl mx-auto mb-4", children: "✓" }),
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Verified 24x7 Live-In Staff" }),
          /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "All housekeepers undergo strict background verification, ID checks, and skill screening before placement." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-6 text-center hover:shadow-lg transition", children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-2xl mx-auto mb-4", children: "🏠" }),
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "24x7 Live-In Assistance" }),
          /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Dedicated full-time housekeepers who stay with your family and manage daily cleaning, laundry, and household tasks." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-6 text-center hover:shadow-lg transition", children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-2xl mx-auto mb-4", children: "🔄" }),
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Instant Substitute Support" }),
          /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Immediate replacement provided if your regular housekeeper is unavailable — ensuring zero disruption." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-6 text-center hover:shadow-lg transition", children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-2xl mx-auto mb-4", children: "🤝" }),
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Long-Term Reliability" }),
          /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Structured onboarding, continuous monitoring, and ongoing support for safe and dependable service." })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-white ", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 py-20 scroll-section", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-14", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-textDark mb-3", children: "Roles & Responsibilities of a 24x7 Live-In Housekeeper" }),
        /* @__PURE__ */ jsx("p", { className: "text-textLight max-w-2xl mx-auto", children: "Our professionally trained live-in housekeepers ensure complete household management with dedication, discipline, and care." })
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
                  children: "🧹"
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Complete Home Cleaning" }),
                /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Daily sweeping, mopping, dusting, bathroom cleaning, and maintaining overall hygiene of the house." })
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
                  children: "👕"
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Laundry & Wardrobe Management" }),
                /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Washing, ironing, folding clothes, organizing wardrobes, and maintaining proper clothing care routines." })
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
                  children: "🍽️"
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Kitchen Assistance" }),
                /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Utensil cleaning, kitchen organization, basic food preparation support, and maintaining cleanliness in cooking areas." })
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
                  children: "🛏️"
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Room & Linen Maintenance" }),
                /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Bed making, changing linens, organizing rooms, and ensuring comfortable living spaces." })
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
                  children: "🧴"
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Hygiene & Sanitation" }),
                /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Ensuring bathrooms, kitchen, and living areas remain sanitized and hygienic at all times." })
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
                  children: "⏰"
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Round-the-Clock Support" }),
                /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Live-in availability for consistent household support and smooth daily routine management." })
              ] })
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-white ", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 py-20 scroll-section", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-14", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-textDark mb-3", children: "Roles & Responsibilities of Substitute Staff" }),
        /* @__PURE__ */ jsx("p", { className: "text-textLight max-w-2xl mx-auto", children: "Our trained substitute staff provide reliable temporary support, ensuring your household runs smoothly even during staff leave or emergencies." })
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
                /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Quick deployment of verified staff to ensure no disruption in daily household routines." })
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
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Child or Elderly Assistance" }),
                /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Providing attentive care and support to children or elderly family members during temporary assignments." })
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
            className: "flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight \r\n                      hover:shadow-xl hover:-translate-y-2 transition-transform duration-500 group",
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "w-14 h-14 bg-primary/10 text-primary \r\n                        flex items-center justify-center \r\n                        rounded-full text-xl flex-shrink-0\r\n                        group-hover:bg-primary group-hover:text-white\r\n                        transition duration-500",
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
            className: "flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight \r\n                      hover:shadow-xl hover:-translate-y-2 transition-transform duration-500 group",
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "w-14 h-14 bg-primary/10 text-primary \r\n                        flex items-center justify-center \r\n                        rounded-full text-xl flex-shrink-0\r\n                        group-hover:bg-primary group-hover:text-white\r\n                        transition duration-500",
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
  HouseHelp as default
};
