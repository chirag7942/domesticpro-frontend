import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faHouse, faBaby, faPersonBreastfeeding, faUtensils, faUserNurse, faCar, faCircleCheck, faClock, faArrowsRotate, faMountain, faSun, faLeaf, faUmbrellaBeach, faHeart } from "@fortawesome/free-solid-svg-icons";
import { u as useScrollReveal, S as SEO } from "../entry-server.js";
import "react-dom/server";
import "react-router-dom";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "react-dom";
import "lucide-react";
import "axios";
function AboutUs() {
  useScrollReveal();
  const WHO_WE_ARE = [
    "Background-Verified and Identity-Checked Domestic Helpers",
    "Skilled in Live-In Support, Patient Care, Child Care & Cooking",
    "Structured Screening and Careful Matching Process",
    "Replacement Assistance for Continued Peace of Mind",
    "Dedicated Support Team for Ongoing Client Assistance"
  ];
  const CORE_VALUES = [
    { image: "https://res.cloudinary.com/dto7bji6b/image/upload/v1774416765/trust_and_safety__about_yk2ijo.webp", title: "Trust & Safety", desc: "Security comes first with police-verified and background-checked maids." },
    { image: "https://res.cloudinary.com/dto7bji6b/image/upload/v1774417914/professional-excellence_about_cxyxxb.webp", title: "Professional Excellence", desc: "Delivering trained and skilled domestic helpers for all needs." },
    { image: "https://res.cloudinary.com/dto7bji6b/image/upload/v1774419096/customer-centricity_about_cqcbgg.webp", title: "Customer-Centricity", desc: "Every service is tailored to your family's lifestyle and requirements." },
    { image: "https://res.cloudinary.com/dto7bji6b/image/upload/v1774418953/customer-centricity_about_hbxmay.webp", title: "Compassion & Care", desc: "Beyond work, we bring kindness, respect, and empathy to your home." }
  ];
  const SERVICES = [
    { icon: faHouse, title: "Live-In Support", desc: "Full household support including cleaning, laundry, and daily chores." },
    { icon: faBaby, title: "Baby Caretaker", desc: "Professional nannies for infants, toddlers, and young children." },
    { icon: faPersonBreastfeeding, title: "Japa", desc: "Complete mother and child care right at your doorstep, offering round-the-clock support during the crucial postpartum phase" },
    { icon: faUtensils, title: "Cooking Help", desc: "Dedicated cooks for hygienic, home-style meals." },
    { icon: faUserNurse, title: "Patient Care", desc: "Compassionate care for elderly or recovering patients." },
    { icon: faCar, title: "Drivers", desc: "Experienced and reliable drivers for daily commuting, school drops, office travel, and family outings." }
  ];
  const WHY_US = [
    { icon: faCircleCheck, title: "Verified & Reliable", desc: "Police-verified, background-checked helpers with complete transparency." },
    { icon: faClock, title: "Quick Deployment", desc: "Get help within 2–4 working days with our efficient process." },
    { icon: faArrowsRotate, title: "Guaranteed Replacement", desc: "Free replacements if the helper doesn't meet your expectations." }
  ];
  const SERVICE_AREAS = [
    { region: "India", icon: faMountain, cities: ["Delhi-NCR", "Mumbai", "Bangalore", "Hyderabad", "Pune", "Chennai"] },
    { region: "Gulf & Middle East", icon: faSun, cities: ["Dubai", "Abu Dhabi", "Riyadh", "Doha", "Kuwait City", "Muscat"] },
    { region: "Southeast Asia", icon: faLeaf, cities: ["Singapore", "Hong Kong", "Kuala Lumpur"] },
    { region: "UK & North America", icon: faUmbrellaBeach, cities: ["London", "New York", "Toronto", "New Jersey"] }
  ];
  const FOUNDER_MISSION = [
    "Provide families with dependable, verified, and suitable household support",
    "Ensure domestic workers are placed in respectful, safe, and fair-paying homes",
    "Keep services accessible — starting at ₹11,000, unlike brokers who charge ₹25,000–₹30,000+"
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "About Us — Our Story & Mission",
        description: "Learn how DomesticPro was founded and our mission to connect families with verified, reliable domestic helpers across India.",
        canonical: "/about",
        ogImage: "https://res.cloudinary.com/dto7bji6b/image/upload/v1774413666/about_hero_nibkui.webp"
      }
    ),
    /* @__PURE__ */ jsxs("section", { className: "relative h-[75vh] md:h-[85vh] flex items-center justify-center", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute inset-0 bg-cover bg-center",
          style: { backgroundImage: `url(https://res.cloudinary.com/dto7bji6b/image/upload/v1774413666/about_hero_nibkui.webp)` }
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/80" }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 text-center px-5 max-w-4xl mx-auto", children: [
        /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight", children: [
          "Welcome to",
          " ",
          /* @__PURE__ */ jsx("em", { className: "not-italic text-primary", children: "Domestic Pro" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-white/80 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto", children: "India's trusted platform for verified, trained, and reliable 24-hour live-in domestic helpers. We connect households with skilled professionals, ensuring safety, dignity, and dependable support for every home." })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-24 bg-bgLight border-b border-borderLight", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center scroll-section", children: [
      /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773031915/who-we-are_eqmnrq.avif",
          alt: "DomesticPro Team",
          className: "rounded-2xl shadow-xl w-full object-cover"
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold text-textDark mb-3", children: "Who We Are" }),
        /* @__PURE__ */ jsx("p", { className: "text-primary font-bold text-sm mb-5 uppercase tracking-wider", children: "Trusted 24-Hour Live-In Domestic Helper Platform" }),
        /* @__PURE__ */ jsx("p", { className: "text-textLight leading-relaxed mb-7", children: "DomesticPro is a fast-growing household staffing platform dedicated to connecting families with verified, trained, and dependable domestic helpers across India. We focus on professionalism, transparency, and long-term reliability to ensure every home receives trusted support." }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: WHO_WE_ARE.map((item) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-sm text-textLight group", children: [
          /* @__PURE__ */ jsx("span", { className: "w-5 h-5 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary transition-colors duration-200", children: /* @__PURE__ */ jsx(FontAwesomeIcon, { icon: faCheck, className: "text-primary group-hover:text-white transition-colors duration-200", style: { fontSize: 10 } }) }),
          item
        ] }, item)) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-24 bg-white border-b border-borderLight", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 scroll-section", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-4xl md:text-5xl font-bold text-textDark mb-4", children: "Our Core Values" }),
        /* @__PURE__ */ jsx("p", { className: "text-textLight max-w-xl mx-auto", children: "The foundation of everything we do at Domestic Pro." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6", children: CORE_VALUES.map(({ image, title, desc }) => /* @__PURE__ */ jsxs("div", { className: "group bg-bgLight rounded-2xl p-8 border border-borderLight hover:border-primary hover:shadow-[0_8px_32px_rgba(236,95,54,0.10)] transition-all duration-300 text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors duration-300", children: /* @__PURE__ */ jsx("img", { src: image, alt: title, className: "w-20 h-20 object-cover rounded-full" }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-textDark mb-3", children: title }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-textLight leading-relaxed", children: desc })
      ] }, title)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-24 bg-bgLight border-b border-borderLight", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 scroll-section", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-4xl md:text-5xl font-bold text-textDark mb-4", children: "Our Services" }),
        /* @__PURE__ */ jsx("p", { className: "text-textLight max-w-2xl mx-auto", children: "A complete range of domestic help services designed for modern households and diverse requirements." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-6", children: SERVICES.map(({ icon, title, desc }) => /* @__PURE__ */ jsxs("div", { className: "group bg-white rounded-2xl p-8 border border-borderLight hover:border-primary hover:shadow-[0_8px_32px_rgba(236,95,54,0.10)] transition-all duration-300", children: [
        /* @__PURE__ */ jsx("div", { className: "w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300", children: /* @__PURE__ */ jsx(FontAwesomeIcon, { icon, className: "text-primary", style: { fontSize: "3rem" } }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-textDark mb-2", children: title }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-textLight leading-relaxed", children: desc })
      ] }, title)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-24 bg-bgLight border-t border-borderLight", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 scroll-section", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-4xl md:text-5xl font-bold text-textDark mb-4", children: "Why Families Trust Us" }),
        /* @__PURE__ */ jsx("p", { className: "text-textLight max-w-xl mx-auto", children: "The Domestic Pro difference that keeps families coming back." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-3 gap-8", children: WHY_US.map(({ icon, title, desc }) => /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-10 border border-borderLight text-center hover:border-primary hover:shadow-[0_8px_32px_rgba(236,95,54,0.10)] transition-all duration-300 group", children: [
        /* @__PURE__ */ jsx("div", { className: "w-20 h-20 rounded-full bg-primary flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300", children: /* @__PURE__ */ jsx(FontAwesomeIcon, { icon, style: { fontSize: "3rem", color: "#fff" } }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-textDark mb-3", children: title }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-textLight leading-relaxed", children: desc })
      ] }, title)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-24 bg-white border-t border-borderLight", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 scroll-section", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-4xl md:text-5xl font-bold text-textDark mb-4", children: "Our Service Areas" }),
        /* @__PURE__ */ jsx("p", { className: "text-textLight max-w-2xl mx-auto", children: "Serving families across India and internationally with trusted domestic help services." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8", children: SERVICE_AREAS.map(({ region, icon, cities }) => /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-6 border border-borderLight hover:border-primary transition-colors duration-300 border-t-4 border-t-primary", children: [
        /* @__PURE__ */ jsxs("h3", { className: "font-bold text-textDark text-base mb-5 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(FontAwesomeIcon, { icon, className: "text-primary", style: { fontSize: 16 } }),
          " ",
          region
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: cities.map((city) => /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold text-textLight bg-bgLight border border-borderLight rounded-full px-3 py-1", children: city }, city)) })
      ] }, region)) }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#FAFAF0] border border-[#E8E8D0] rounded-xl p-6 border-l-4 border-l-primary text-center", children: [
        /* @__PURE__ */ jsx("p", { className: "font-bold text-textDark text-lg mb-2", children: "🚀 Expanding Rapidly!" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-textLight", children: [
          "We're continuously expanding our services to new cities. Don't see your city listed?",
          " ",
          /* @__PURE__ */ jsx("a", { href: "/contact", className: "text-primary font-semibold hover:underline", children: "Contact us" }),
          " ",
          "to find out when we're coming to your area!"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-24 bg-bgLight border-t border-borderLight", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 scroll-section", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("span", { className: "inline-block bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5", children: "✍️ Founder's Message" }),
        /* @__PURE__ */ jsx("h2", { className: "text-4xl md:text-5xl font-bold text-textDark mb-4", children: "The Story Behind Domestic Pro" }),
        /* @__PURE__ */ jsx("p", { className: "text-textLight max-w-xl mx-auto", children: "Built from lived experience, designed for every home." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-[360px_1fr] gap-14 items-start", children: [
        /* @__PURE__ */ jsx("div", { className: "lg:sticky lg:top-28 self-start", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl border border-borderLight p-8 hover:border-primary hover:shadow-[0_8px_32px_rgba(236,95,54,0.10)] transition-all duration-300", children: [
          /* @__PURE__ */ jsx("div", { className: "w-24 h-24 rounded-full overflow-hidden border-2 border-borderLight mb-5", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: "./founder.webp",
              alt: "Founder, Domestic Pro",
              className: "w-full h-full object-cover"
            }
          ) }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-textDark mb-1", style: { fontFamily: "'Fraunces', serif" }, children: "Gunjan Kapoor" }),
          /* @__PURE__ */ jsx("p", { className: "text-primary font-bold text-sm uppercase tracking-wider mb-5", children: "Domestic Pro" }),
          /* @__PURE__ */ jsx("div", { className: "h-px bg-borderLight mb-6" }),
          /* @__PURE__ */ jsx("div", { className: "space-y-5 mb-6", children: [
            { value: "20+", label: "Years combined in the services industry" },
            { value: "2021", label: "Founded in Gurgaon" },
            { value: "₹11K", label: "Transparent starting price" }
          ].map(({ value, label }) => /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-textDark leading-none mb-1", style: { fontFamily: "'Fraunces', serif" }, children: value }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-textLight font-medium leading-snug", children: label })
          ] }, label)) }),
          /* @__PURE__ */ jsx("div", { className: "h-px bg-borderLight mb-5" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 text-sm text-textLight", children: [
            /* @__PURE__ */ jsx("span", { className: "w-5 h-5 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5", children: /* @__PURE__ */ jsx(FontAwesomeIcon, { icon: faHeart, className: "text-primary", style: { fontSize: 9 } }) }),
            "Rooted in Siliguri, building for every home in India"
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("blockquote", { className: "mb-8 pl-5 border-l-4 border-primary", children: /* @__PURE__ */ jsx("p", { className: "text-xl md:text-2xl font-bold text-textDark leading-snug", style: { fontFamily: "'Fraunces', serif" }, children: '"Domestic Pro was not born out of a business idea — it was born out of a very real, very personal struggle."' }) }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-5 text-textLight text-base leading-relaxed mb-8", children: [
            /* @__PURE__ */ jsxs("p", { children: [
              "In 2021, when I became a mother, I experienced firsthand how challenging it is to find the right household support. The first two months were overwhelming, filled with uncertainty and constant adjustments. Then came someone who changed everything — reliable, sincere, and committed. She stayed with us for",
              " ",
              /* @__PURE__ */ jsx("span", { className: "font-semibold text-textDark", children: "four and a half years" }),
              " and became an integral part of our home."
            ] }),
            /* @__PURE__ */ jsxs("p", { children: [
              "When she had to leave due to a personal family situation — despite giving me three months' notice — I suddenly found myself in the same difficult position many others face. Despite multiple trials over several months, I couldn't find the right fit. In a span of six months, I went through",
              " ",
              /* @__PURE__ */ jsx("span", { className: "font-semibold text-textDark", children: "nearly ten changes" }),
              ". It was exhausting, emotionally draining, and deeply unsettling."
            ] }),
            /* @__PURE__ */ jsxs("p", { children: [
              "Through all of this, my husband ",
              /* @__PURE__ */ jsx("span", { className: "font-semibold text-textDark", children: "Nakul" }),
              " stood by me as a constant support. As he witnessed these challenges unfold, he realized this wasn't just our personal struggle — it was something countless families must be going through every day. Together, we began to see this not as an isolated issue, but as a larger gap that needed to be addressed."
            ] }),
            /* @__PURE__ */ jsx("p", { children: "Both of us come with over 20 years of experience in the services industry. Client servicing, understanding people's needs, and managing operational complexities have been at the core of our professional journeys — giving us the confidence to build something meaningful in a space that deeply needed structure, reliability, and empathy." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl border border-borderLight p-6 mb-8 hover:border-primary hover:shadow-[0_8px_32px_rgba(236,95,54,0.10)] transition-all duration-300", children: [
            /* @__PURE__ */ jsx("p", { className: "text-primary font-bold text-xs uppercase tracking-widest mb-5", children: "Our Clear Intention" }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: FOUNDER_MISSION.map((item) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-sm text-textLight group", children: [
              /* @__PURE__ */ jsx("span", { className: "w-5 h-5 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary transition-colors duration-200", children: /* @__PURE__ */ jsx(FontAwesomeIcon, { icon: faCheck, className: "text-primary group-hover:text-white transition-colors duration-200", style: { fontSize: 9 } }) }),
              item
            ] }, item)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-5 text-textLight text-base leading-relaxed mb-10", children: [
            /* @__PURE__ */ jsxs("p", { children: [
              "Starting from Gurgaon, we began building Domestic Pro with a simple yet meaningful vision — to create a reliable bridge between households and domestic workers, built on trust, fairness, and respect. Coming from Siliguri, with roots in the Northeast, I leveraged my personal networks to build a dependable database of domestic workers. The idea was simple —",
              " ",
              /* @__PURE__ */ jsx("span", { className: "font-semibold text-textDark", children: "start small, stay honest, and solve a real problem." })
            ] }),
            /* @__PURE__ */ jsx("p", { children: "This is not just a service — it's a commitment to improving lives on both sides of the equation. As we grow, our focus remains clear: steady, thoughtful growth with strong foundations of trust, integrity, and accountability." }),
            /* @__PURE__ */ jsx("p", { className: "italic text-textDark font-medium", children: "Because at the heart of every home is the support system that keeps it running — and that support deserves to be reliable, respected, and right." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "pt-8 border-t border-borderLight flex items-center gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx("span", { className: "text-white font-bold text-sm", style: { fontFamily: "'Fraunces', serif" }, children: "DP" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-bold text-textDark text-base", style: { fontFamily: "'Fraunces', serif" }, children: "Warmly," }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-textLight", children: "Gunjan Kapoor, Domestic Pro" })
            ] })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-primary px-6 py-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-extrabold text-white mb-2", children: "Ready to Experience the Domestic Pro Difference?" }),
        /* @__PURE__ */ jsx("p", { className: "text-white/80 text-sm md:text-base", children: "Join thousands of satisfied families who trust us for their domestic help needs." })
      ] }),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/contact",
          className: "flex-shrink-0 bg-textDark text-white font-bold text-sm md:text-base px-8 py-4 rounded-xl hover:bg-black transition-colors duration-200 whitespace-nowrap",
          children: "Contact Us Today"
        }
      )
    ] }) })
  ] });
}
export {
  AboutUs as default
};
