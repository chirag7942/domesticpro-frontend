import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { u as useScrollReveal, S as SEO, H as HeroWizard } from "../entry-server.js";
import { HeadphonesIcon } from "lucide-react";
import "react-dom/server";
import "react-router-dom";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "react-dom";
import "axios";
const CSS = `
  section[data-section] { scroll-margin-top: 100px; }
  html { scroll-behavior: smooth; }
`;
const navItems = [
  { id: "introduction", label: "Introduction" },
  { id: "nature", label: "Nature of Services" },
  { id: "replacement", label: "Replacement Policy" },
  { id: "refund", label: "Refund Policy" },
  { id: "cancellation", label: "Service Cancellation" },
  { id: "corporate", label: "Available Plans" },
  { id: "contact", label: "Contact Us" }
];
const SectionHeader = ({ number, emoji, title }) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
  /* @__PURE__ */ jsx("div", { className: "w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white font-bold text-base flex-shrink-0", children: emoji }),
  /* @__PURE__ */ jsxs("h2", { className: "text-2xl md:text-3xl font-bold text-textDark", children: [
    number,
    ". ",
    title
  ] })
] });
const SubHeading = ({ text }) => /* @__PURE__ */ jsx("h3", { className: "font-bold text-textDark text-[15px] mb-2 mt-5", children: text });
const Para = ({ children }) => /* @__PURE__ */ jsx("p", { className: "text-sm text-textLight leading-relaxed", children });
const BulletList = ({ items }) => /* @__PURE__ */ jsx("ul", { className: "space-y-2 mt-2", children: items.map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-sm text-textLight", children: [
  /* @__PURE__ */ jsx("span", { className: "w-5 h-5 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5", children: /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary block" }) }),
  item
] }, i)) });
const StepCard = ({ number, text }) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 bg-bgLight border border-borderLight p-4 rounded-xl", children: [
  /* @__PURE__ */ jsx("div", { className: "w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white font-bold text-sm flex-shrink-0", children: number }),
  /* @__PURE__ */ jsx("p", { className: "text-sm text-textLight leading-relaxed", children: text })
] });
const ExclusionCard = ({ title, desc }) => /* @__PURE__ */ jsxs("div", { className: "bg-bgLight rounded-xl p-4 border-l-4 border-primary", children: [
  /* @__PURE__ */ jsx("h4", { className: "font-bold text-textDark text-sm mb-1", children: title }),
  /* @__PURE__ */ jsx("p", { className: "text-xs text-textLight", children: desc })
] });
const ServiceCard = ({ title, desc }) => /* @__PURE__ */ jsxs("div", { className: "bg-bgLight rounded-xl p-6 border-l-4 border-primary hover:bg-primary hover:border-primary transition-all duration-300 group", children: [
  /* @__PURE__ */ jsx("h3", { className: "font-bold text-base text-textDark mb-1 group-hover:text-white transition-colors duration-300", children: title }),
  /* @__PURE__ */ jsx("p", { className: "text-sm text-textLight group-hover:text-white/90 transition-colors duration-300", children: desc })
] });
function RefundPolicy() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("introduction");
  useScrollReveal();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Refund & Replacement Policy",
        description: "Understand DomesticPro's no-refund and guaranteed replacement policy for domestic helper placements.",
        canonical: "/refund-policy",
        ogImage: "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773031916/refundPolicy_rmzl2s.webp",
        noIndex: true
      }
    ),
    /* @__PURE__ */ jsx("style", { children: CSS }),
    /* @__PURE__ */ jsxs("section", { className: "relative h-[75vh] md:h-[85vh] flex items-center justify-center", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute inset-0 bg-cover bg-center",
          style: { backgroundImage: `url(https://res.cloudinary.com/dhtzknkdr/image/upload/v1773031916/refundPolicy_rmzl2s.webp)` }
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/80" }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 text-center px-5 max-w-4xl mx-auto", children: [
        /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight", children: [
          "Refund &",
          " ",
          /* @__PURE__ */ jsx("em", { className: "not-italic text-primary", children: "Replacement Policy" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-white/80 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-8", children: "Clear and transparent policies designed for fairness and service continuity." }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4", children: [
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "#replacement",
              className: "bg-primary hover:bg-primaryHover text-white px-8 py-3 rounded-xl font-bold transition-all duration-200 shadow-[0_4px_14px_rgba(236,95,54,0.35)]",
              children: "Replacement Policy"
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "#corporate",
              className: "border-2 border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white hover:text-textDark transition-all duration-200",
              children: "Available Plans"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "bg-white border-b border-borderLight", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 py-16", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold text-textDark mb-2", children: "Refund & Replacement Highlights" }),
        /* @__PURE__ */ jsx("p", { className: "text-textLight max-w-2xl mx-auto text-sm", children: "Clear policies designed to ensure transparency, fairness, and dependable service." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6", children: [
        { emoji: "🔄", title: "Guaranteed Replacements", desc: "Suitable replacement provided if the assigned staff resigns or does not meet expectations." },
        { emoji: "🚫", title: "No Refund Policy", desc: "All service bookings are final and non-refundable as per agreed policy terms." },
        { emoji: "👤", title: "Dedicated Support", desc: "Relationship manager assistance for premium and corporate service plans." },
        { emoji: "⏱️", title: "Quick Deployment", desc: "Replacement staff arranged within 2–4 working days, subject to availability." }
      ].map(({ emoji, title, desc }) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "bg-bgLight rounded-2xl p-6 text-center border border-borderLight hover:border-primary hover:shadow-[0_8px_32px_rgba(236,95,54,0.10)] transition-all duration-300",
          children: [
            /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-primary/10 flex items-center justify-center rounded-full text-2xl mx-auto mb-4", children: emoji }),
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-textDark text-sm mb-2", children: title }),
            /* @__PURE__ */ jsx("p", { className: "text-textLight text-sm leading-relaxed", children: desc })
          ]
        },
        title
      )) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "bg-white py-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10", children: [
      /* @__PURE__ */ jsx("div", { className: "md:col-span-1", children: /* @__PURE__ */ jsxs("div", { className: "sticky top-[8rem] bg-bgLight p-5 rounded-2xl border border-borderLight shadow-sm", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-sm uppercase tracking-widest text-textDark mb-5", children: "Quick Navigation" }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: navItems.map((item) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
          "a",
          {
            href: `#${item.id}`,
            className: `flex items-center gap-2 text-sm font-medium transition-all duration-150 ${activeSection === item.id ? "text-primary" : "text-textLight hover:text-textDark"}`,
            children: [
              /* @__PURE__ */ jsx("span", { className: `w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors duration-150 ${activeSection === item.id ? "bg-primary" : "bg-borderLight"}` }),
              item.label
            ]
          }
        ) }, item.id)) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 bg-primary/5 border border-primary/20 p-4 rounded-xl text-center", children: [
          /* @__PURE__ */ jsx(HeadphonesIcon, { size: 18, className: "text-primary mx-auto mb-2" }),
          /* @__PURE__ */ jsx("p", { className: "font-bold text-textDark text-sm mb-1", children: "Need Help?" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-textLight mb-3 leading-relaxed", children: "Our team can clarify any policy questions before you commit." }),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "/contact",
              className: "block bg-primary hover:bg-primaryHover text-white text-xs font-bold py-2 px-4 rounded-lg transition-colors duration-200",
              children: "Contact Support"
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "md:col-span-3 space-y-16", children: [
        /* @__PURE__ */ jsxs("section", { id: "introduction", "data-section": "introduction", children: [
          /* @__PURE__ */ jsx(SectionHeader, { number: "1", emoji: "📋", title: "Introduction" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(SubHeading, { text: "1.1 Applicability" }),
              /* @__PURE__ */ jsx(Para, { children: "This policy applies to all clients availing any domestic help services provided by Domestic Pro (operated by DOMESTIC PRO INDIA LLP), regardless of service duration or category." })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(SubHeading, { text: "1.2 Focus on Service Continuity" }),
              /* @__PURE__ */ jsx(Para, { children: "Our primary focus is to ensure smooth and uninterrupted domestic help services. Instead of refunds, Domestic Pro provides a Replacement Guarantee that allows clients to receive a suitable replacement maid if the initially deployed staff resigns or is found unsuitable." })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(SubHeading, { text: "1.3 No Refund Policy" }),
              /* @__PURE__ */ jsx(Para, { children: "Refunds are not applicable under any circumstances, whether:" }),
              /* @__PURE__ */ jsx(BulletList, { items: ["Before Maid Deployment (e.g., post-booking or profile sharing)", "After Maid Deployment (e.g., in case of dissatisfaction or maid resignation)"] }),
              /* @__PURE__ */ jsx(Para, { children: "All bookings are non-refundable, and service continuity is maintained exclusively through our replacement process." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { id: "nature", "data-section": "nature", children: [
          /* @__PURE__ */ jsx(SectionHeader, { number: "2", emoji: "🛠️", title: "Nature Of Our Services" }),
          /* @__PURE__ */ jsx(Para, { children: "Domestic Pro provides a wide range of professional domestic help services, including but not limited to:" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4 mt-6", children: [
            /* @__PURE__ */ jsx(ServiceCard, { title: "All-Rounder Maids", desc: "For household cleaning, maintenance, and daily chores." }),
            /* @__PURE__ */ jsx(ServiceCard, { title: "Live-In Maids (24x7)", desc: "For full-time domestic assistance with accommodation." }),
            /* @__PURE__ */ jsx(ServiceCard, { title: "Baby Caretakers And Japa Maids", desc: "For newborn care, postnatal support, and mother care." }),
            /* @__PURE__ */ jsx(ServiceCard, { title: "Patient Care And Elderly Assistance", desc: "For basic caregiving, mobility support, and companionship." }),
            /* @__PURE__ */ jsx(ServiceCard, { title: "Cooking Maids", desc: "For meal preparation, kitchen management, and dietary assistance." }),
            /* @__PURE__ */ jsx(ServiceCard, { title: "On-Demand Or Short-Term Maids", desc: "For temporary or emergency household support." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { id: "replacement", "data-section": "replacement", children: [
          /* @__PURE__ */ jsx(SectionHeader, { number: "3", emoji: "🔁", title: "Replacement Policy" }),
          /* @__PURE__ */ jsx(Para, { children: "Domestic Pro is committed to ensuring uninterrupted domestic help services through its Guaranteed Replacement Policy." }),
          /* @__PURE__ */ jsxs("div", { className: "mt-5", children: [
            /* @__PURE__ */ jsx(SubHeading, { text: "3.1 Eligibility For Replacement" }),
            /* @__PURE__ */ jsx(BulletList, { items: ["The maid resigns or discontinues the service for reasons not caused by the client.", "The maid is unsuitable for the assigned household tasks or does not meet service expectations.", "Performance or compatibility issues are reported promptly to Domestic Pro by the client."] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
            /* @__PURE__ */ jsx(SubHeading, { text: "3.2 Replacement Process" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3 mt-2", children: [
              /* @__PURE__ */ jsx(StepCard, { number: "1", text: "The client must inform Domestic Pro immediately regarding the need for a replacement." }),
              /* @__PURE__ */ jsx(StepCard, { number: "2", text: "A new maid profile will be shortlisted and shared within 2–4 working days, subject to availability." }),
              /* @__PURE__ */ jsx(StepCard, { number: "3", text: "The client is entitled to replacement strictly as per the number specified in their active service contract." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
            /* @__PURE__ */ jsx(SubHeading, { text: "3.3 Replacement Not Applicable If" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3 mt-2", children: [
              /* @__PURE__ */ jsx(ExclusionCard, { title: "Maid Resigns Due to Client Actions", desc: "Harassment, unsafe conditions, or delayed salary payments by the client." }),
              /* @__PURE__ */ jsx(ExclusionCard, { title: "Direct Hiring Outside Domestic Pro", desc: "Client directly hires the maid outside the Domestic Pro platform." }),
              /* @__PURE__ */ jsx(ExclusionCard, { title: "Tasks Beyond Agreed Scope", desc: "Maid is required to work outside the agreed service scope." }),
              /* @__PURE__ */ jsx(ExclusionCard, { title: "All Replacements Used", desc: "Client has already utilized all the replacements allowed under the contract." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { id: "refund", "data-section": "refund", children: [
          /* @__PURE__ */ jsx(SectionHeader, { number: "4", emoji: "💳", title: "Refund Policy" }),
          /* @__PURE__ */ jsx(Para, { children: "DomesticPro follows a strict no-refund policy once the service process has been initiated. Our operational, verification, and placement efforts begin immediately after confirmation, which makes refunds non-applicable under normal circumstances." }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(SubHeading, { text: "4.1 General Refund Terms" }),
            /* @__PURE__ */ jsx(BulletList, { items: ["All registration and service fees are non-refundable.", "Once candidate profiles are shared, the service is considered initiated.", "Refunds are not provided due to change of mind after payment.", "Delays caused by availability constraints do not qualify for refunds."] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-5", children: [
            /* @__PURE__ */ jsx(SubHeading, { text: "4.2 Why Refunds Are Not Provided" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3 mt-2", children: [
              /* @__PURE__ */ jsx(StepCard, { number: "1", text: "Background verification and screening processes involve operational costs." }),
              /* @__PURE__ */ jsx(StepCard, { number: "2", text: "Shortlisting and matching suitable candidates requires dedicated manpower and time." }),
              /* @__PURE__ */ jsx(StepCard, { number: "3", text: "Administrative processing begins immediately upon payment confirmation." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-5", children: [
            /* @__PURE__ */ jsx(SubHeading, { text: "4.3 Exceptions (If Applicable)" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3 mt-2", children: [
              /* @__PURE__ */ jsx(ExclusionCard, { title: "Duplicate Payment", desc: "In case of accidental duplicate transactions, the extra amount will be refunded after verification." }),
              /* @__PURE__ */ jsx(ExclusionCard, { title: "Service Not Initiated", desc: "If no candidate profiles have been shared and the process has not started, management may review refund eligibility." }),
              /* @__PURE__ */ jsx(ExclusionCard, { title: "Management Discretion", desc: "Any exceptional refund will be solely at the discretion of DomesticPro management." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { id: "cancellation", "data-section": "cancellation", children: [
          /* @__PURE__ */ jsx(SectionHeader, { number: "5", emoji: "✖️", title: "Service Cancellation" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(SubHeading, { text: "5.1 Client-Initiated Cancellation" }),
            /* @__PURE__ */ jsx(BulletList, { items: ["Clients may terminate the service at their discretion, but no refunds will be issued under any circumstances."] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(SubHeading, { text: "5.2 Continuation Of Replacements" }),
            /* @__PURE__ */ jsx(BulletList, { items: ["Even if the client chooses to cancel, replacements will continue as per the active service contract, up to the contract's expiry date.", "After contract expiration, no further replacements or services will be provided unless a new contract is signed."] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { id: "corporate", "data-section": "corporate", children: [
          /* @__PURE__ */ jsx(SectionHeader, { number: "6", emoji: "💼", title: "Domestic Pro – Available Plans" }),
          /* @__PURE__ */ jsx(Para, { children: "Domestic Pro Offers Flexible and Transparent Packages designed to provide Complete Service Support, Guaranteed Replacements, and Dedicated Support. Choose a plan that best suits your household requirements." }),
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-6 mt-8", children: [
            {
              name: "Connect",
              emoji: "⚡",
              subtitle: "Structured support to help you hire verified domestic help.",
              price: "₹11,000",
              profiles: "6 verified profiles",
              badge: { label: "★ Most Popular & Quickest", style: "bg-primary text-white" },
              features: [
                "Requirement understanding (role, hours, expectations)",
                "ID & address verification",
                "3-day trial period",
                "5-day free lookup period",
                "Profile finalization assistance (Audio/Video interview)",
                "One-time placement support"
              ],
              highlighted: false
            },
            {
              name: "Care",
              emoji: "🛡️",
              subtitle: "Enhanced verification and screening for added confidence.",
              price: "₹15,000",
              profiles: "7 verified profiles",
              badge: null,
              features: [
                "Includes everything in Connect",
                "5-day trial period",
                "7-day free lookup period",
                "1 Replacement in 11 months",
                "Police verification",
                "Enhanced screening review"
              ],
              highlighted: false
            },
            {
              name: "Complete",
              emoji: "⭐",
              subtitle: "End-to-end protection with priority support.",
              price: "₹20,000",
              profiles: "10 verified profiles",
              badge: { label: "✦ Recommended", style: "bg-primary text-white" },
              features: [
                "Includes everything in Care",
                "10-day trial period",
                "10-day free lookup period",
                "2 Replacement in 11 months",
                "Priority matching",
                "Detailed background & reference verification",
                "Ongoing support & mediation",
                "Periodic check-ins (30 / 60 days)",
                "Role upgrade support (within plan validity)"
              ],
              highlighted: true
            }
          ].map((plan) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: `bg-white rounded-2xl p-7 relative flex flex-col border transition-all duration-200 ${plan.highlighted ? "border-2 border-primary shadow-[0_12px_40px_rgba(236,95,54,0.18)]" : "border-borderLight hover:border-primary/40 hover:shadow-sm"}`,
              children: [
                plan.badge && /* @__PURE__ */ jsx("div", { className: `absolute -top-3.5 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap shadow-[0_4px_12px_rgba(236,95,54,0.35)] ${plan.badge.style}`, children: plan.badge.label }),
                /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-xl mb-4", children: plan.emoji }),
                /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold text-textDark mb-1", children: [
                  "Domestic Pro –",
                  " ",
                  /* @__PURE__ */ jsx("span", { className: plan.highlighted ? "text-primary" : "", children: plan.name })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-textLight mb-5 leading-relaxed", children: plan.subtitle }),
                /* @__PURE__ */ jsx("div", { className: `rounded-xl px-4 py-3 mb-5 ${plan.highlighted ? "bg-primary/5 border border-primary/10" : "bg-bgLight"}`, children: /* @__PURE__ */ jsxs("p", { className: "text-2xl font-bold text-textDark", children: [
                  plan.price,
                  " ",
                  /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-textLight", children: "+ GST" })
                ] }) }),
                /* @__PURE__ */ jsxs("p", { className: "text-sm font-bold text-primary mb-3 flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary" }),
                  plan.profiles
                ] }),
                /* @__PURE__ */ jsx("ul", { className: "flex-1 space-y-2 mb-6 text-sm text-textLight", children: plan.features.map((f, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-primary flex-shrink-0 mt-0.5 text-xs", children: "✓" }),
                  f
                ] }, i)) }),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => setIsModalOpen(true),
                    className: `w-full py-3 rounded-xl font-bold text-sm transition-all duration-200 ${plan.highlighted ? "bg-primary hover:bg-primaryHover text-white shadow-[0_4px_14px_rgba(236,95,54,0.30)]" : "border-2 border-primary text-primary hover:bg-primary hover:text-white"}`,
                    children: [
                      "Choose ",
                      plan.name,
                      " →"
                    ]
                  }
                )
              ]
            },
            plan.name
          )) })
        ] }),
        /* @__PURE__ */ jsxs("section", { id: "contact", "data-section": "contact", children: [
          /* @__PURE__ */ jsx(SectionHeader, { number: "7", emoji: "🕒", title: "Contact Us" }),
          /* @__PURE__ */ jsx(Para, { children: "For replacements, service-related queries, or policy clarifications, please contact:" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-5 bg-bgLight border border-borderLight rounded-xl p-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-textDark mb-3", children: "Domestic Pro" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5 text-sm text-textLight", children: [
              /* @__PURE__ */ jsx("p", { children: "📍 LG-006, DLF Grand Mall, Mehrauli, Gurugram - 122001" }),
              /* @__PURE__ */ jsx("p", { children: "📞 +91 92112 98139" }),
              /* @__PURE__ */ jsx("p", { children: "✉ support@domesticpro.in" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "border-t border-borderLight mt-10 pt-8", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-textDark mb-3", children: "Acknowledgment" }),
            /* @__PURE__ */ jsx(Para, { children: "By Booking our Services, you Acknowledge and Agree that you have Read, Understood, and Accepted this Refund & Replacement Policy, including our Strict No-Refund Clause." }),
            /* @__PURE__ */ jsx("div", { className: "mt-5 bg-primary/5 border border-primary/20 rounded-xl p-4", children: /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-primary", children: "Domestic Pro – Ensuring Service Continuity Through Guaranteed Replacements, Not Refunds." }) })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(HeroWizard, { asModal: true, isOpen: isModalOpen, onClose: () => setIsModalOpen(false) })
  ] });
}
export {
  RefundPolicy as default
};
