import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { u as useScrollReveal, S as SEO, P as PricingSection, H as HeroWizard } from "../entry-server.js";
import { Check } from "lucide-react";
import "react-dom/server";
import "react-router-dom";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "react-dom";
import "axios";
const CSS = `
  .table-highlight-col { background: rgba(236,95,54,0.04); }
  .faq-card { transition: border-color 0.2s, box-shadow 0.2s; }
  .faq-card:hover { border-color: #EC5F36; box-shadow: 0 4px 20px rgba(236,95,54,0.10); }
  .cta-shimmer::before {
    content:''; position:absolute; inset:0;
    background:linear-gradient(135deg,rgba(255,255,255,0.14) 0%,transparent 60%);
    opacity:0; transition:opacity 0.2s; border-radius:inherit;
  }
  .cta-shimmer:hover::before { opacity:1; }
`;
const tableRows = [
  { feature: "Verified Profiles", connect: "5", care: "7", complete: "10" },
  { feature: "ID & Address Check", connect: true, care: true, complete: true },
  { feature: "Police Verification", connect: false, care: true, complete: true },
  { feature: "Trial Period", connect: "3 Days", care: "5 Days", complete: "10 Days" },
  { feature: "Free Lookup Period", connect: "5 Days", care: "7 Days", complete: "10 Days" },
  { feature: "Replacement Window", connect: false, care: "1 Replacement", complete: "2 Replacements" },
  { feature: "Priority Matching", connect: false, care: false, complete: true },
  { feature: "Background & Reference", connect: false, care: false, complete: true },
  { feature: "Ongoing Support", connect: false, care: false, complete: true },
  { feature: "Periodic Check-ins", connect: false, care: false, complete: true }
];
function CellValue({ value }) {
  if (value === true)
    return /* @__PURE__ */ jsx("span", { className: "inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10", children: /* @__PURE__ */ jsx(Check, { size: 13, className: "text-primary", strokeWidth: 3 }) });
  if (value === false)
    return /* @__PURE__ */ jsx("span", { className: "text-borderLight text-lg font-light", children: "—" });
  return /* @__PURE__ */ jsx("span", { className: "text-textDark font-semibold text-sm", children: value });
}
function PricingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  useScrollReveal();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Pricing Plans — Connect, Care & Complete",
        description: "Transparent domestic helper placement plans starting at ₹11,000. Compare features and choose the plan that fits your household needs.",
        canonical: "/pricing"
      }
    ),
    /* @__PURE__ */ jsx("style", { children: CSS }),
    /* @__PURE__ */ jsxs("div", { className: "bg-bgLight text-textDark", children: [
      /* @__PURE__ */ jsx(PricingSection, {}),
      /* @__PURE__ */ jsx("section", { className: "bg-white border-y border-borderLight py-24", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-6 scroll-section", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-14", children: [
          /* @__PURE__ */ jsx("span", { className: "inline-block bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5", children: "Side by Side" }),
          /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold text-textDark mb-3", children: "Compare Plans" }),
          /* @__PURE__ */ jsx("p", { className: "text-textLight", children: "Everything included — so you can choose with confidence." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "overflow-x-auto rounded-2xl border border-borderLight shadow-sm", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-bgLight border-b border-borderLight", children: [
            /* @__PURE__ */ jsx("th", { className: "p-4 text-left text-textDark font-bold w-1/3", children: "Feature" }),
            /* @__PURE__ */ jsx("th", { className: "p-4 text-center text-textDark font-bold", children: "Connect" }),
            /* @__PURE__ */ jsx("th", { className: "p-4 text-center text-textDark font-bold", children: "Care" }),
            /* @__PURE__ */ jsx("th", { className: "p-4 text-center text-primary font-bold table-highlight-col", children: "Complete ⭐" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { children: tableRows.map((row, i) => /* @__PURE__ */ jsxs("tr", { className: `border-t border-borderLight ${i % 2 === 0 ? "bg-white" : "bg-bgLight/40"}`, children: [
            /* @__PURE__ */ jsx("td", { className: "p-4 text-textDark font-medium", children: row.feature }),
            /* @__PURE__ */ jsx("td", { className: "p-4 text-center", children: /* @__PURE__ */ jsx(CellValue, { value: row.connect }) }),
            /* @__PURE__ */ jsx("td", { className: "p-4 text-center", children: /* @__PURE__ */ jsx(CellValue, { value: row.care }) }),
            /* @__PURE__ */ jsx("td", { className: "p-4 text-center table-highlight-col", children: /* @__PURE__ */ jsx(CellValue, { value: row.complete }) })
          ] }, i)) })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { style: { background: "linear-gradient(135deg, #EC5F36 0%, #C94520 100%)" }, children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-6 py-24 text-center", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-4xl md:text-5xl font-bold text-white mb-4 leading-tight", children: [
          "Ready to hire with",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("em", { className: "not-italic text-white/80", children: "confidence?" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-white/80 text-lg mb-10 max-w-xl mx-auto leading-relaxed", children: "Get verified, professional domestic help with structured support — starting at ₹11,000." }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setIsModalOpen(true),
            className: "cta-shimmer relative overflow-hidden bg-white text-primary px-8 py-3.5 rounded-xl font-bold hover:bg-bgLight transition-all duration-200 shadow-md hover:shadow-lg text-sm",
            children: "Get Started →"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "mt-14 flex flex-wrap items-center justify-center gap-8 text-white/70 text-sm", children: ["Verified Professionals", "Police-Checked Staff", "Dedicated Support", "Replacement Guaranteed"].map((t) => /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Check, { size: 13, className: "text-white/60", strokeWidth: 3 }),
          t
        ] }, t)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(HeroWizard, { asModal: true, isOpen: isModalOpen, onClose: () => setIsModalOpen(false) })
  ] });
}
export {
  PricingPage as default
};
