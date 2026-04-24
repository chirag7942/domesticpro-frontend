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
const Driver = () => {
  const [modalType, setModalType] = useState(null);
  const [modalConfig, setModalConfig] = useState({ service: null, format: null });
  const openModal = (type) => {
    if (type === "livein") {
      setModalConfig({ service: "Drivers", format: "Live-In" });
    } else if (type === "substitute") {
      setModalConfig({ service: "Drivers", format: "Substitute" });
    } else {
      setModalConfig({ service: "Drivers", format: null });
    }
    setModalType(type);
  };
  useScrollReveal();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Professional Drivers Services",
        description: "Hire verified personal drivers in Gurgaon & Delhi NCR. 24x7 live-in drivers, substitute drivers, and experienced chauffeurs. Safe, trained & background-checked staff.",
        canonical: "/services/drivers",
        ogImage: "https://res.cloudinary.com/dto7bji6b/image/upload/v1774429112/driver_dxdx5j.webp"
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
            "Professional Drivers ",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { className: "text-primary", children: "You Can Rely On" })
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "text-textLight mb-8 space-y-3", children: [
            /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
              /* @__PURE__ */ jsx("span", { children: "Safe, punctual, and well-trained drivers" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
              /* @__PURE__ */ jsx("span", { children: "Verified and experienced for full-time or substitute needs" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
              /* @__PURE__ */ jsx("span", { children: "Daily commute, school drop-offs, and elderly transport" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
              /* @__PURE__ */ jsx("span", { children: "Long-distance travel with safety and discipline" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
              /* @__PURE__ */ jsx("span", { children: "Complete peace of mind for your family" })
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
            src: "https://res.cloudinary.com/dto7bji6b/image/upload/v1774429112/driver_dxdx5j.webp",
            alt: "Domestic Pro Driver",
            className: "rounded-2xl h-[350px] md:h-[400px] shadow-xl w-full  max-w-md object-cover"
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "bg-white py-20 relative overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 scroll-section", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-textDark mb-4", children: "Choose Your Driver Category" }),
        /* @__PURE__ */ jsx("p", { className: "text-textLight max-w-2xl mx-auto", children: "Flexible driver hiring options designed for personal, family, and corporate transportation needs." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-10 items-center", children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "group relative bg-[#FFD6CC] \r\n                      rounded-3xl p-8 border border-borderLight\r\n                      hover:shadow-2xl transition-all duration-500 overflow-hidden transform scale-105 z-10",
            children: [
              /* @__PURE__ */ jsx("span", { className: "absolute top-6 right-6 bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full", children: "Most Popular" }),
              /* @__PURE__ */ jsx("div", { className: "text-5xl mb-6", children: "🚗" }),
              /* @__PURE__ */ jsx("h3", { className: "text-3xl font-bold text-textDark mb-4", children: "24x7 Live-In Drivers" }),
              /* @__PURE__ */ jsxs("ul", { className: "text-textLight mb-8 space-y-3", children: [
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
                  /* @__PURE__ */ jsx("span", { children: "Verified and trained staff" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
                  /* @__PURE__ */ jsx("span", { children: "Dedicated full-time drivers" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
                  /* @__PURE__ */ jsx("span", { children: "Available round-the-clock" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
                  /* @__PURE__ */ jsx("span", { children: "For family travel, business commute, and emergencies" })
                ] })
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => openModal("livein"),
                  className: "relative z-10 bg-primary hover:bg-primaryHover text-white px-6 py-3 rounded-xl font-semibold transition",
                  children: "Hire Full-Time Driver"
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
              /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-textDark mb-4", children: "Substitute Driver" }),
              /* @__PURE__ */ jsxs("ul", { className: "text-textLight mb-8 space-y-3", children: [
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
                  /* @__PURE__ */ jsx("span", { children: "Immediate replacement if regular driver is unavailable" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
                  /* @__PURE__ */ jsx("span", { children: "Ensures uninterrupted travel plans" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
                  /* @__PURE__ */ jsx("span", { children: "Peace of mind for all your travel needs" })
                ] })
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => openModal("substitute"),
                  className: "relative z-10 bg-primary hover:bg-primaryHover text-white px-6 py-3 rounded-xl font-semibold transition",
                  children: "Request Substitute Driver"
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
              /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-gray-500 mb-4", children: "Live-Out Drivers" }),
              /* @__PURE__ */ jsxs("ul", { className: "text-textLight mb-8 space-y-3", children: [
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
                  /* @__PURE__ */ jsx("span", { children: "Professional drivers for company executives" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
                  /* @__PURE__ */ jsx("span", { children: "Corporate transportation services" })
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
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-textDark mb-3", children: "Why Choose Domestic Pro for Drivers?" }),
        /* @__PURE__ */ jsx("p", { className: "text-textLight max-w-2xl mx-auto", children: "We provide reliable, verified, and professional household staff with a seamless hiring experience." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-6 text-center hover:shadow-lg transition", children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-2xl mx-auto mb-4", children: "✓" }),
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Background Verified Drivers" }),
          /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "All drivers undergo strict background checks, driving license verification, and identity screening." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-6 text-center hover:shadow-lg transition", children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-2xl mx-auto mb-4", children: "🏠" }),
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Experienced & Skilled Professionals" }),
          /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Trained drivers with knowledge of city routes, traffic rules, and safe driving practices." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-6 text-center hover:shadow-lg transition", children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-2xl mx-auto mb-4", children: "🔄" }),
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Instant Replacement Support" }),
          /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Quick substitute drivers provided during leave, emergencies, or unexpected absence." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-6 text-center hover:shadow-lg transition", children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-2xl mx-auto mb-4", children: "🤝" }),
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Reliable & Punctual Service" }),
          /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Ensuring timely pick-ups, disciplined behavior, and professional conduct at all times." })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 py-20 scroll-section", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-14", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-textDark mb-3", children: "Roles & Responsibilities of a 24x7 Personal Driver" }),
        /* @__PURE__ */ jsx("p", { className: "text-textLight max-w-2xl mx-auto", children: "Our professionally trained 24x7 personal drivers provide round-the-clock safe, reliable, and disciplined driving support for your family’s daily commute, travel needs, and emergency requirements." })
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
                  children: "🚗"
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Round-the-Clock Driving Support" }),
                /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Available 24x7 for daily commutes, late-night travel, early-morning schedules, and urgent mobility needs." })
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
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Safe & Defensive Driving" }),
                /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Strict adherence to traffic rules, speed regulations, and safe driving practices to ensure complete passenger safety." })
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
                  children: "🗺️"
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Route Planning & Navigation" }),
                /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Expertise in city routes, alternate roads, and traffic management for efficient and time-saving travel." })
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
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Vehicle Care & Maintenance" }),
                /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Maintaining vehicle cleanliness, monitoring fuel levels, and promptly reporting service or mechanical requirements." })
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
                  children: "👨‍👩‍👧"
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Family & VIP Transportation" }),
                /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Safe transportation for children, elderly members, guests, and important business or personal engagements." })
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
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Professionalism & Confidentiality" }),
                /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Maintaining discipline, respectful conduct, and complete confidentiality at all times." })
              ] })
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-white ", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 py-20 scroll-section", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-14", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-textDark mb-3", children: "Roles & Responsibilities of Substitute Drivers" }),
        /* @__PURE__ */ jsx("p", { className: "text-textLight max-w-2xl mx-auto", children: "Our trained substitute drivers provide reliable and professional temporary driving support, ensuring your travel plans continue smoothly during staff leave or emergencies." })
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
                /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Quick deployment of verified substitute drivers to ensure no disruption in your daily commute or travel schedule." })
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
                  children: "🚗"
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Safe & Responsible Driving" }),
                /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Ensuring smooth, safe, and defensive driving while strictly following traffic rules and road safety guidelines." })
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
                  children: "🗺️"
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Route Knowledge & Navigation" }),
                /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Well-versed with city routes, alternate roads, and real-time navigation for efficient travel and time management.signments." })
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
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Vehicle Care & Maintenance" }),
                /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Basic vehicle upkeep including cleanliness, fuel checks, and reporting any mechanical concerns promptly." })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight \r\n                      hover:shadow-xl hover:-translate-y-2 transition-transform duration-500 group",
            children: [
              /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "w-14 h-14 bg-primary/10 text-primary \r\n                        flex items-center justify-center \r\n                        rounded-full text-xl flex-shrink-0\r\n                        group-hover:bg-primary group-hover:text-white\r\n                        transition duration-500",
                  children: [
                    "👨‍👩‍👧",
                    " "
                  ]
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Family & School Commute Support" }),
                /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Safe transportation for children, elderly family members, and daily office or school drop-offs and pick-ups." })
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
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Flexible Short-Term Assignments" }),
                /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Available for emergency replacements, temporary needs, outstation trips, or short-duration service requirements." })
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
  Driver as default
};
