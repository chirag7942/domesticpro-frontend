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
  useScrollReveal();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Professional Home Cook Services | Verified Personal Cooking Help",
        description: "Find experienced live-in cooks for daily meals. Veg, non-veg and diet cooking. Verified and background-checked culinary professionals.",
        canonical: "/services/cooking-help",
        ogImage: "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773031895/cook_zy7sri.jpg"
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
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "animate-left", children: [
          /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-textDark leading-tight mb-6", children: [
            "Professional Home Cooks ",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Tailored to Your Taste" })
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "text-textLight mb-8 space-y-3", children: [
            /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
              /* @__PURE__ */ jsx("span", { children: "Verified & experienced culinary professionals" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
              /* @__PURE__ */ jsx("span", { children: "Customized meal preparation (veg & non-veg)" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
              /* @__PURE__ */ jsx("span", { children: "Maintaining kitchen hygiene & ingredient management" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
              /* @__PURE__ */ jsx("span", { children: "Special occasion & family event cooking" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-4", children: /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => openModal("cook"),
              className: "bg-primary hover:bg-primaryHover text-white px-6 py-3 rounded-xl font-semibold transition duration-300 shadow-md",
              children: "Hire Now"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-center md:justify-end animate-right", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773031895/cook_zy7sri.jpg",
            alt: "Professional Home Cook",
            className: "rounded-2xl shadow-xl w-full h-[350px] md:h-[400px]  max-w-md object-cover"
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "bg-white py-20 relative overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 scroll-section", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-textDark mb-4", children: "Choose Your Cook Category" }),
        /* @__PURE__ */ jsx("p", { className: "text-textLight max-w-2xl mx-auto", children: "Flexible cook hiring options for daily meals, family events, and special occasions." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-10 items-center", children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "group relative bg-[#FFD6CC] \r\nrounded-3xl p-8 border border-borderLight\r\nhover:shadow-2xl transition-all duration-500 overflow-hidden transform scale-105 z-10",
            children: [
              /* @__PURE__ */ jsx("span", { className: "absolute top-6 right-6 bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full", children: "Most Popular" }),
              /* @__PURE__ */ jsx("div", { className: "text-5xl mb-6", children: "👨‍🍳" }),
              /* @__PURE__ */ jsx("h3", { className: "text-3xl font-bold text-textDark mb-4", children: "24x7 Live-In Cooks" }),
              /* @__PURE__ */ jsxs("ul", { className: "text-textLight mb-8 space-y-3", children: [
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
                  /* @__PURE__ */ jsx("span", { children: "Full-time dedicated cook for your household" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
                  /* @__PURE__ */ jsx("span", { children: "Custom meal plans including dietary preferences" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
                  /* @__PURE__ */ jsx("span", { children: "Available round-the-clock for family or events" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
                  /* @__PURE__ */ jsx("span", { children: "Handles grocery management and kitchen hygiene" })
                ] })
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => openModal("livein"),
                  className: "relative z-10 bg-primary hover:bg-primaryHover text-white px-6 py-3 rounded-xl font-semibold transition",
                  children: "Hire Full-Time Cook"
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
              /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-textDark mb-4", children: "Substitute Cook" }),
              /* @__PURE__ */ jsxs("ul", { className: "text-textLight mb-8 space-y-3", children: [
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
                  /* @__PURE__ */ jsx("span", { children: "Replacement cook if your regular cook is unavailable" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
                  /* @__PURE__ */ jsx("span", { children: "Ensures uninterrupted daily meal preparation" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
                  /* @__PURE__ */ jsx("span", { children: "Available for short-term assignments" })
                ] })
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => openModal("substitute"),
                  className: "relative z-10 bg-primary hover:bg-primaryHover text-white px-6 py-3 rounded-xl font-semibold transition",
                  children: "Request Substitute Cook"
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
              /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-gray-500 mb-4", children: "Live-Out Cooks" }),
              /* @__PURE__ */ jsxs("ul", { className: "text-textLight mb-8 space-y-3", children: [
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
                  /* @__PURE__ */ jsx("span", { children: "Part-time cooking services at your home" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
                  /* @__PURE__ */ jsx("span", { children: "Meal prep for daily household needs" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold", children: "✓" }),
                  /* @__PURE__ */ jsx("span", { children: "Experienced and trained culinary staff" })
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
    /* @__PURE__ */ jsx("section", { className: "bg-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 py-20 scroll-section", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-14", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-textDark mb-3", children: "Why Choose Domestic Pro for Cooks?" }),
        /* @__PURE__ */ jsx("p", { className: "text-textLight max-w-2xl mx-auto", children: "We provide skilled, verified, and professional cooks ensuring quality meals and a smooth hiring experience." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-6 text-center hover:shadow-lg transition", children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-2xl mx-auto mb-4", children: "✓" }),
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Background Verified Cooks" }),
          /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Every cook undergoes strict identity verification and professional background screening." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-6 text-center hover:shadow-lg transition", children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-2xl mx-auto mb-4", children: "👨‍🍳" }),
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Experienced & Skilled Chefs" }),
          /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Trained in multi-cuisine cooking, hygiene standards, and customized meal preparation." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-6 text-center hover:shadow-lg transition", children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-2xl mx-auto mb-4", children: "🔄" }),
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Quick Replacement Support" }),
          /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Immediate substitute cooks provided during leave, special occasions, or unexpected absence." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-6 text-center hover:shadow-lg transition", children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-2xl mx-auto mb-4", children: "🤝" }),
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Hygiene & Professional Standards" }),
          /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Ensuring clean kitchen practices, disciplined behavior, and consistent meal quality every day." })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 py-20 scroll-section", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-14", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-textDark mb-3", children: "Roles & Responsibilities of a 24x7 Live-In Cook" }),
        /* @__PURE__ */ jsx("p", { className: "text-textLight max-w-2xl mx-auto", children: "Our professionally trained 24x7 live-in cooks provide round-the-clock meal preparation, kitchen management, and hygienic cooking support tailored to your family's daily dietary needs." })
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
                  children: "👨‍🍳"
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Daily Meal Preparation" }),
                /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Preparing fresh breakfast, lunch, dinner, and snacks according to your family’s taste and schedule." })
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
                  children: "🥗"
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Customized & Healthy Meal Planning" }),
                /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Designing balanced meal plans considering dietary preferences, health conditions, and nutrition requirements." })
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
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Kitchen Hygiene & Cleanliness" }),
                /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Maintaining clean cooking areas, proper food storage, and following strict hygiene standards at all times." })
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
                  children: "🛒"
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Grocery & Inventory Management" }),
                /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Monitoring kitchen supplies, managing groceries, and ensuring timely replenishment of essentials." })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex gap-5 bg-bgLight rounded-2xl p-6 border border-borderLight \r\n                      hover:shadow-xl hover:-translate-y-2 \r\n                      transition-transform  duration-300\r\n group",
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "w-14 h-14 bg-primary/10 text-primary \r\n                        flex items-center justify-center \r\n                        rounded-full text-xl flex-shrink-0\r\n                        group-hover:bg-primary group-hover:text-white\r\n                        transition duration-500",
                  children: "🎉"
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Special Occasion & Event Cooking" }),
                /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Preparing meals for family gatherings, festivals, guests, and special celebrations." })
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
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Professionalism & Discipline" }),
                /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Maintaining respectful behavior, punctuality, and consistent quality standards in every meal prepared." })
              ] })
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-white ", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 py-20 scroll-section", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-14", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-textDark mb-3", children: "Roles & Responsibilities of Substitute Cooks" }),
        /* @__PURE__ */ jsx("p", { className: "text-textLight max-w-2xl mx-auto", children: "Our trained substitute cooks provide reliable temporary kitchen support, ensuring uninterrupted meal preparation during leave, emergencies, or special requirements." })
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
                /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Quick deployment of experienced cooks to ensure uninterrupted daily meal preparation." })
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
                  children: "🍳"
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Daily Meal Preparation" }),
                /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Preparing breakfast, lunch, and dinner as per household preferences and dietary requirements." })
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
                  children: "🥗"
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Customized & Diet-Specific Cooking" }),
                /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Preparing meals tailored to vegetarian, non-vegetarian, diabetic, or special nutritional needs." })
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
                  children: "🛒"
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Grocery & Ingredient Management" }),
                /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Assisting in ingredient planning, stock monitoring, and maintaining kitchen inventory efficiently." })
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
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Kitchen Hygiene & Cleanliness" }),
                /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Ensuring proper cleanliness of utensils, cooking areas, and maintaining food safety standards." })
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
                  children: "🎉"
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-textDark text-lg mb-2", children: "Event & Special Occasion Cooking" }),
                /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm", children: "Supporting family gatherings, celebrations, and special events with professional cooking services." })
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
  Cook as default
};
