import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { HeadphonesIcon, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { u as useScrollReveal, S as SEO } from "../entry-server.js";
import "react-dom/server";
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
  { id: "nature", label: "Nature of Services" },
  { id: "relationship", label: "Client–Worker Relationship" },
  { id: "plans", label: "Plans & Service Scope" },
  { id: "payment", label: "Payment Terms" },
  { id: "guarantee", label: "No Placement Guarantee" },
  { id: "verification", label: "Verification & Checks" },
  { id: "replacement", label: "Replacement Policy" },
  { id: "liability", label: "Limitation of Liability" },
  { id: "obligations", label: "Client Obligations" },
  { id: "suspension", label: "Suspension & Termination" },
  { id: "confidentiality", label: "Confidentiality" },
  { id: "force", label: "Force Majeure" },
  { id: "law", label: "Governing Law" },
  { id: "acceptance", label: "Acceptance of Terms" }
];
const highlightCards = [
  { emoji: "📋", title: "14 Clauses", desc: "Comprehensive terms covering all aspects of our service engagement." },
  { emoji: "🔄", title: "Replacement Policy", desc: "Replacement provided within plan validity — subject to availability." },
  { emoji: "🚫", title: "No Refund Policy", desc: "All fees are final once profiles are shared. No monetary refunds." },
  { emoji: "🤝", title: "Mutual Obligations", desc: "Both parties are expected to act with fairness, dignity, and honesty." }
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
const Warning = ({ text }) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 bg-primary/5 border border-primary/20 rounded-xl p-4 mt-4", children: [
  /* @__PURE__ */ jsx("span", { className: "text-lg flex-shrink-0", children: "📌" }),
  /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-primary leading-relaxed", children: text })
] });
const StepCard = ({ number, text }) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 bg-bgLight border border-borderLight p-4 rounded-xl", children: [
  /* @__PURE__ */ jsx("div", { className: "w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white font-bold text-sm flex-shrink-0", children: number }),
  /* @__PURE__ */ jsx("p", { className: "text-sm text-textLight leading-relaxed", children: text })
] });
const ExclusionCard = ({ title, desc }) => /* @__PURE__ */ jsxs("div", { className: "bg-bgLight rounded-xl p-4 border-l-4 border-primary", children: [
  /* @__PURE__ */ jsx("h4", { className: "font-bold text-textDark text-sm mb-1", children: title }),
  /* @__PURE__ */ jsx("p", { className: "text-xs text-textLight", children: desc })
] });
const Quote = ({ text }) => /* @__PURE__ */ jsx("div", { className: "border-l-4 border-primary pl-4 py-1 mt-4", children: /* @__PURE__ */ jsxs("p", { className: "text-sm font-bold text-textDark italic leading-relaxed", children: [
  '"',
  text,
  '"'
] }) });
function TermsAndCondition() {
  const [activeSection, setActiveSection] = useState("nature");
  const navigate = useNavigate();
  useScrollReveal();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Terms & Conditions",
        description: "Read DomesticPro's terms of service governing all domestic helper placement engagements.",
        canonical: "/terms-and-conditions",
        ogImage: "https://res.cloudinary.com/dto7bji6b/image/upload/v1774429745/terma_and_conditions_oneo24.jpg",
        noIndex: true
      }
    ),
    /* @__PURE__ */ jsx("style", { children: CSS }),
    /* @__PURE__ */ jsxs("div", { className: "bg-bgLight text-textDark min-h-screen", children: [
      /* @__PURE__ */ jsxs("section", { className: "relative h-[75vh] md:h-[85vh] flex items-center justify-center", children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute inset-0 bg-cover bg-center",
            style: { backgroundImage: `url(https://res.cloudinary.com/dto7bji6b/image/upload/v1774429745/terma_and_conditions_oneo24.jpg)` }
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/80" }),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10 text-center px-5 max-w-4xl mx-auto", children: [
          /* @__PURE__ */ jsxs("h1", { className: "text-[clamp(32px,5vw,52px)] font-extrabold text-white leading-tight mb-4", children: [
            "Terms & ",
            /* @__PURE__ */ jsx("em", { className: "not-italic text-primary", children: "Conditions" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-white/80 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-8", children: "These terms govern all services provided by Domestic Pro. By engaging our services or making any payment, you agree to be bound by the terms set forth below." }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap items-center justify-center gap-3 text-sm", children: [
            { label: "Jurisdiction", value: "India" },
            { label: "Clauses", value: "14 Sections" },
            { label: "Operated by", value: "Domestic Pro" }
          ].map(({ label, value }) => /* @__PURE__ */ jsxs("div", { className: "bg-white border border-borderLight rounded-full px-4 py-1.5 text-textLight flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "font-bold text-textDark", children: value }),
            /* @__PURE__ */ jsx("span", { className: "text-borderLight", children: "·" }),
            /* @__PURE__ */ jsx("span", { children: label })
          ] }, label)) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "bg-white border-b border-borderLight", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-6 py-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold text-textDark mb-2", children: "Policy Highlights" }),
          /* @__PURE__ */ jsx("p", { className: "text-textLight max-w-xl mx-auto text-sm leading-relaxed", children: "Clear policies designed to ensure transparency, fairness, and dependable service." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6", children: highlightCards.map(({ emoji, title, desc }) => /* @__PURE__ */ jsxs(
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
          /* @__PURE__ */ jsx("ul", { className: "space-y-2.5", children: navItems.map((item) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
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
              "button",
              {
                onClick: () => navigate("/contact"),
                className: "block bg-primary hover:bg-primaryHover text-white text-xs font-bold py-2 px-4 rounded-lg transition-colors duration-200 w-full",
                children: "Contact Support"
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "md:col-span-3 space-y-16", children: [
          /* @__PURE__ */ jsxs("section", { id: "nature", "data-section": "nature", children: [
            /* @__PURE__ */ jsx(SectionHeader, { number: "1", emoji: "📋", title: "Nature of Services" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsx(Para, { children: "Domestic Pro is a facilitation and placement support service that assists clients in identifying, screening, and onboarding domestic help including but not limited to maids, cooks, nannies, and elderly care providers." }),
              /* @__PURE__ */ jsxs(Para, { children: [
                "Domestic Pro ",
                /* @__PURE__ */ jsx("strong", { className: "text-textDark font-bold", children: "does not employ, supervise, or control" }),
                " the domestic help and does not act as an employer, contractor, or guarantor."
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { id: "relationship", "data-section": "relationship", children: [
            /* @__PURE__ */ jsx(SectionHeader, { number: "2", emoji: "🤝", title: "Client–Worker Relationship" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxs(Para, { children: [
                "The employment relationship exists ",
                /* @__PURE__ */ jsx("strong", { className: "text-textDark font-bold", children: "solely between the Client and the domestic help" }),
                ". All matters relating to salary, working hours, duties, leaves, discipline, termination, accommodation, and statutory compliance are the Client's responsibility."
              ] }),
              /* @__PURE__ */ jsx(Para, { children: "Domestic Pro shall not be liable for any disputes, claims, damages, losses, or legal actions arising out of this relationship." })
            ] }),
            /* @__PURE__ */ jsx(Quote, { text: "The employment relationship exists solely between the Client and the domestic help." })
          ] }),
          /* @__PURE__ */ jsxs("section", { id: "plans", "data-section": "plans", children: [
            /* @__PURE__ */ jsx(SectionHeader, { number: "3", emoji: "⚡", title: "Plans & Service Scope" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxs(Para, { children: [
                "Services are offered under defined plans (",
                /* @__PURE__ */ jsx("strong", { className: "text-textDark font-bold", children: "Connect / Care / Complete" }),
                ") with specific inclusions, replacement support, and validity periods as communicated at the time of enrolment."
              ] }),
              /* @__PURE__ */ jsx(Para, { children: "Any service outside the selected plan scope may attract additional charges." })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-3 mt-5", children: [
              { name: "Connect", advance: "₹3,000", cls: "border-borderLight bg-bgLight" },
              { name: "Care", advance: "₹5,000", cls: "border-borderLight bg-bgLight" },
              { name: "Complete", advance: "₹7,000", cls: "border-primary/30 bg-primary/5" }
            ].map((p) => /* @__PURE__ */ jsxs("div", { className: `border rounded-xl p-4 text-center ${p.cls}`, children: [
              /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-textLight uppercase tracking-wider mb-1", children: p.name }),
              /* @__PURE__ */ jsx("p", { className: "text-xl font-extrabold text-textDark", children: p.advance }),
              /* @__PURE__ */ jsx("p", { className: "text-[10px] text-textLight mt-1", children: "Advance Fee" })
            ] }, p.name)) })
          ] }),
          /* @__PURE__ */ jsxs("section", { id: "payment", "data-section": "payment", children: [
            /* @__PURE__ */ jsx(SectionHeader, { number: "4", emoji: "💳", title: "Payment Terms" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(SubHeading, { text: "4.1 Profile Sharing Fee (Advance)" }),
              /* @__PURE__ */ jsx(Para, { children: "An advance fee is payable prior to the commencement of services and profile sharing. This fee covers requirement assessment, sourcing, screening, verification, and profile sharing." }),
              /* @__PURE__ */ jsx(Warning, { text: "Once profiles are shared, the advance fee is strictly non-refundable." })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(SubHeading, { text: "4.2 Balance Payment" }),
              /* @__PURE__ */ jsxs(Para, { children: [
                "The balance service fee is payable ",
                /* @__PURE__ */ jsx("strong", { className: "text-textDark font-bold", children: "upon confirmation of a candidate" }),
                " or before the candidate's joining date, whichever is earlier. Failure to pay the balance may result in suspension or termination of services."
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { id: "guarantee", "data-section": "guarantee", children: [
            /* @__PURE__ */ jsx(SectionHeader, { number: "5", emoji: "⚠️", title: "No Placement Guarantee" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxs(Para, { children: [
                "Domestic Pro does ",
                /* @__PURE__ */ jsx("strong", { className: "text-textDark font-bold", children: "not guarantee placement" }),
                ", availability, continuity, or performance of any domestic help."
              ] }),
              /* @__PURE__ */ jsx(Para, { children: "Fees paid are for professional services rendered and efforts made, not for guaranteed outcomes." })
            ] }),
            /* @__PURE__ */ jsx(Warning, { text: "Fees are for professional services rendered and efforts made — not for guaranteed outcomes." })
          ] }),
          /* @__PURE__ */ jsxs("section", { id: "verification", "data-section": "verification", children: [
            /* @__PURE__ */ jsx(SectionHeader, { number: "6", emoji: "🛡️", title: "Verification & Background Checks" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsx(Para, { children: "Domestic Pro conducts reasonable checks based on documents and information provided by the domestic help, which may include ID verification and basic reference checks." }),
              /* @__PURE__ */ jsxs(Para, { children: [
                "Domestic Pro ",
                /* @__PURE__ */ jsx("strong", { className: "text-textDark font-bold", children: "does not warrant or guarantee" }),
                " the authenticity, accuracy, or completeness of such information and shall not be liable for misrepresentation, misconduct, or criminal acts by the domestic help."
              ] }),
              /* @__PURE__ */ jsx(Para, { children: "Clients are advised to exercise independent judgment and supervision." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { id: "replacement", "data-section": "replacement", children: [
            /* @__PURE__ */ jsx(SectionHeader, { number: "7", emoji: "🔁", title: "Replacement Policy" }),
            /* @__PURE__ */ jsx(Para, { children: "Replacement support is provided strictly as per the selected plan and within the specified validity period." }),
            /* @__PURE__ */ jsxs("div", { className: "mt-5", children: [
              /* @__PURE__ */ jsx(SubHeading, { text: "7.1 Eligibility for Replacement" }),
              /* @__PURE__ */ jsx(BulletList, { items: ["The maid resigns or discontinues the service for reasons not caused by the client.", "The maid is unsuitable for the assigned household tasks or does not meet service expectations.", "Performance or compatibility issues are reported promptly to Domestic Pro by the client."] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
              /* @__PURE__ */ jsx(SubHeading, { text: "7.2 Replacement Process" }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-3 mt-2", children: [
                /* @__PURE__ */ jsx(StepCard, { number: "1", text: "The client must inform Domestic Pro immediately regarding the need for a replacement." }),
                /* @__PURE__ */ jsx(StepCard, { number: "2", text: "A new profile will be shortlisted and shared within 2–4 working days, subject to availability." }),
                /* @__PURE__ */ jsx(StepCard, { number: "3", text: "The client is entitled to replacement strictly as per the number specified in their active service plan." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
              /* @__PURE__ */ jsx(SubHeading, { text: "7.3 Replacement Not Applicable If" }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-3 mt-2", children: [
                /* @__PURE__ */ jsx(ExclusionCard, { title: "Maid Resigns Due to Client Actions", desc: "Harassment, unsafe conditions, or delayed salary payments by the client." }),
                /* @__PURE__ */ jsx(ExclusionCard, { title: "Direct Hiring Outside Domestic Pro", desc: "Client directly hires the maid outside the Domestic Pro platform." }),
                /* @__PURE__ */ jsx(ExclusionCard, { title: "Tasks Beyond Agreed Scope", desc: "Maid is required to work outside the agreed service scope." }),
                /* @__PURE__ */ jsx(ExclusionCard, { title: "All Replacements Used", desc: "Client has already utilized all the replacements allowed under the contract." }),
                /* @__PURE__ */ jsx(ExclusionCard, { title: "No Monetary Refund in Lieu", desc: "No monetary refunds are provided in lieu of replacements. Replacement does not reset plan validity." })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { id: "liability", "data-section": "liability", children: [
            /* @__PURE__ */ jsx(SectionHeader, { number: "8", emoji: "⚖️", title: "Limitation of Liability" }),
            /* @__PURE__ */ jsx(Para, { children: "The Client agrees to indemnify and hold Domestic Pro harmless from any claims or legal actions arising out of the engagement. Domestic Pro shall not be liable for:" }),
            /* @__PURE__ */ jsxs("div", { className: "bg-red-50 border border-red-100 rounded-xl p-5 mt-4", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-red-500 uppercase tracking-wider mb-3", children: "Not Liable For:" }),
              /* @__PURE__ */ jsx("div", { className: "space-y-2", children: ["Theft, injury, negligence, misconduct, or accidents", "Loss or damage to property", "Absconding or discontinuation of domestic help", "Any direct, indirect, incidental, or consequential damages"].map((item, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2.5 text-sm text-textLight", children: [
                /* @__PURE__ */ jsx("span", { className: "w-4 h-4 rounded flex items-center justify-center flex-shrink-0 mt-0.5 bg-red-100", children: /* @__PURE__ */ jsx("span", { className: "text-red-400 text-[10px] font-bold", children: "✕" }) }),
                item
              ] }, i)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { id: "obligations", "data-section": "obligations", children: [
            /* @__PURE__ */ jsx(SectionHeader, { number: "9", emoji: "✅", title: "Client Obligations" }),
            /* @__PURE__ */ jsx(Para, { children: "Domestic Pro reserves the right to discontinue services in case of abuse, misrepresentation, or unethical conduct by the Client. The Client agrees to:" }),
            /* @__PURE__ */ jsx(BulletList, { items: ["Provide accurate job requirements", "Treat domestic help with dignity and fairness", "Ensure a safe working environment", "Promptly communicate issues or concerns"] })
          ] }),
          /* @__PURE__ */ jsxs("section", { id: "suspension", "data-section": "suspension", children: [
            /* @__PURE__ */ jsx(SectionHeader, { number: "10", emoji: "🚫", title: "Service Suspension or Termination" }),
            /* @__PURE__ */ jsxs(Para, { children: [
              "Domestic Pro may suspend or terminate services ",
              /* @__PURE__ */ jsx("strong", { className: "text-textDark font-bold", children: "without refund" }),
              " if:"
            ] }),
            /* @__PURE__ */ jsx(BulletList, { items: ["Payments are delayed", "Terms are violated", "The Client engages in unlawful or unethical conduct"] })
          ] }),
          /* @__PURE__ */ jsxs("section", { id: "confidentiality", "data-section": "confidentiality", children: [
            /* @__PURE__ */ jsx(SectionHeader, { number: "11", emoji: "🔒", title: "Confidentiality" }),
            /* @__PURE__ */ jsx(Para, { children: "Client and domestic help information shared during the process shall be treated as confidential and used solely for service delivery." })
          ] }),
          /* @__PURE__ */ jsxs("section", { id: "force", "data-section": "force", children: [
            /* @__PURE__ */ jsx(SectionHeader, { number: "12", emoji: "🌐", title: "Force Majeure" }),
            /* @__PURE__ */ jsx(Para, { children: "Domestic Pro shall not be liable for delays or failure to perform due to events beyond reasonable control including strikes, natural calamities, or regulatory restrictions." })
          ] }),
          /* @__PURE__ */ jsxs("section", { id: "law", "data-section": "law", children: [
            /* @__PURE__ */ jsx(SectionHeader, { number: "13", emoji: "⚖️", title: "Governing Law & Jurisdiction" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsx(Para, { children: "These Terms & Conditions shall be governed by the laws of India." }),
              /* @__PURE__ */ jsx(Para, { children: "All disputes shall be subject to the exclusive jurisdiction of courts in the relevant city/state." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { id: "acceptance", "data-section": "acceptance", children: [
            /* @__PURE__ */ jsx(SectionHeader, { number: "14", emoji: "📝", title: "Acceptance of Terms" }),
            /* @__PURE__ */ jsx(Para, { children: "Engaging services or making payment constitutes full and unconditional acceptance of these Terms & Conditions." }),
            /* @__PURE__ */ jsx(Quote, { text: "Engaging services or making payment constitutes full and unconditional acceptance of these Terms & Conditions." })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: { background: "linear-gradient(135deg, #EC5F36 0%, #C94520 100%)" }, className: "rounded-2xl p-8 text-center text-white", children: [
            /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-full bg-white/15 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsx(ShieldCheck, { size: 24, className: "text-white" }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-2xl font-extrabold mb-3", children: "Ethical Placement. Professional Support." }),
            /* @__PURE__ */ jsx("p", { className: "text-white/85 text-sm leading-relaxed max-w-md mx-auto mb-6", children: "These terms exist to protect both you and our professionals. If you have questions, our support team is always here to help." }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-3", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => navigate("/contact"),
                  className: "bg-white text-primary px-6 py-3 rounded-xl text-sm font-bold hover:bg-bgLight transition-colors duration-200 shadow-md",
                  children: "Contact Support"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => navigate("/pricing"),
                  className: "border-2 border-white/40 text-white px-6 py-3 rounded-xl text-sm font-bold hover:border-white transition-colors duration-200",
                  children: "View Our Plans"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-center text-sm text-textLight pb-4", children: [
            /* @__PURE__ */ jsx("strong", { className: "text-textDark", children: "Domestic Pro" }),
            " — Ethical Placement. Professional Support. Peace of Mind."
          ] })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  TermsAndCondition as default
};
