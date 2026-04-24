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
  { id: "introduction", label: "Introduction" },
  { id: "collection", label: "Information We Collect" },
  { id: "usage", label: "How We Use Information" },
  { id: "sharing", label: "Sharing of Information" },
  { id: "storage", label: "Data Storage & Security" },
  { id: "cookies", label: "Cookies & Tracking" },
  { id: "rights", label: "Your Rights" },
  { id: "third-party", label: "Third-Party Links" },
  { id: "children", label: "Children's Privacy" },
  { id: "changes", label: "Policy Changes" },
  { id: "contact", label: "Contact Us" }
];
const highlightCards = [
  { emoji: "🔒", title: "Data Security", desc: "Your personal information is stored securely and never sold to third parties." },
  { emoji: "👁️", title: "Transparency", desc: "We clearly explain what data we collect, why, and how it is used." },
  { emoji: "🛑", title: "No Spam Policy", desc: "We only contact you regarding your service requests and relevant updates." },
  { emoji: "✅", title: "Your Rights", desc: "You may access, update, or request deletion of your personal data at any time." }
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
const InfoBox = ({ emoji, text }) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 bg-primary/5 border border-primary/20 rounded-xl p-4 mt-4", children: [
  /* @__PURE__ */ jsx("span", { className: "text-lg flex-shrink-0", children: emoji }),
  /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-primary leading-relaxed", children: text })
] });
const DataCard = ({ emoji, title, items }) => /* @__PURE__ */ jsxs("div", { className: "bg-bgLight border border-borderLight rounded-xl p-5", children: [
  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
    /* @__PURE__ */ jsx("span", { className: "text-xl", children: emoji }),
    /* @__PURE__ */ jsx("h4", { className: "font-bold text-textDark text-sm", children: title })
  ] }),
  /* @__PURE__ */ jsx("ul", { className: "space-y-1.5", children: items.map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-xs text-textLight", children: [
    /* @__PURE__ */ jsx("span", { className: "w-3.5 h-3.5 rounded bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5", children: /* @__PURE__ */ jsx("span", { className: "w-1 h-1 rounded-full bg-primary block" }) }),
    item
  ] }, i)) })
] });
const RightCard = ({ emoji, title, desc }) => /* @__PURE__ */ jsxs("div", { className: "bg-bgLight border border-borderLight rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all duration-200", children: [
  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
    /* @__PURE__ */ jsx("span", { className: "text-lg", children: emoji }),
    /* @__PURE__ */ jsx("h4", { className: "font-bold text-textDark text-sm", children: title })
  ] }),
  /* @__PURE__ */ jsx("p", { className: "text-xs text-textLight leading-relaxed", children: desc })
] });
function PrivacyPolicy() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("introduction");
  useScrollReveal();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Privacy Policy",
        description: "DomesticPro's privacy policy explaining how we collect, use and protect your personal data.",
        canonical: "/privacy-policy",
        ogImage: "https://res.cloudinary.com/dhtzknkdr/image/upload/v1773031913/privacyPolicy_sk0vhw.webp",
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
            style: { backgroundImage: `url(https://res.cloudinary.com/dhtzknkdr/image/upload/v1773031913/privacyPolicy_sk0vhw.webp)` }
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/80" }),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10 text-center px-5 max-w-4xl mx-auto", children: [
          /* @__PURE__ */ jsxs("h1", { className: "text-[clamp(32px,5vw,52px)] font-extrabold text-white leading-tight mb-4", children: [
            "Privacy ",
            /* @__PURE__ */ jsx("em", { className: "not-italic text-primary", children: "Policy" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-white/80 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-8", children: "We value your trust. This policy explains what personal information we collect, how we use it, and the steps we take to keep it safe." }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap items-center justify-center gap-3 text-sm", children: [
            { label: "Effective Date", value: "January 2025" },
            { label: "Operated by", value: "Domestic Pro" },
            { label: "Jurisdiction", value: "India" }
          ].map(({ label, value }) => /* @__PURE__ */ jsxs("div", { className: "bg-white border border-borderLight rounded-full px-4 py-1.5 text-textLight flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "font-bold text-textDark", children: value }),
            /* @__PURE__ */ jsx("span", { className: "text-borderLight", children: "·" }),
            /* @__PURE__ */ jsx("span", { children: label })
          ] }, label)) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "bg-white border-b border-borderLight", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-6 py-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
          /* @__PURE__ */ jsx("span", { className: "inline-block bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5", children: "At a Glance" }),
          /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold text-textDark mb-2", children: "Privacy at a Glance" }),
          /* @__PURE__ */ jsx("p", { className: "text-textLight max-w-xl mx-auto text-sm leading-relaxed", children: "Here's what you should know about how we handle your data." })
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
            /* @__PURE__ */ jsx("p", { className: "font-bold text-textDark text-sm mb-1", children: "Privacy Questions?" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-textLight mb-3 leading-relaxed", children: "Reach out to our team for any privacy-related concerns." }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => navigate("/contact"),
                className: "block bg-primary hover:bg-primaryHover text-white text-xs font-bold py-2 px-4 rounded-lg transition-colors duration-200 w-full",
                children: "Contact Us"
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "md:col-span-3 space-y-16", children: [
          /* @__PURE__ */ jsxs("section", { id: "introduction", "data-section": "introduction", children: [
            /* @__PURE__ */ jsx(SectionHeader, { number: "1", emoji: "📋", title: "Introduction" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsx(Para, { children: 'Domestic Pro ("Company", "we", "us", "our"), operated by DOMESTIC PRO INDIA LLP, is committed to protecting the privacy and security of your personal information. This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you visit our website or engage with our services.' }),
              /* @__PURE__ */ jsx(Para, { children: "By accessing our platform or engaging our services, you consent to the practices described in this Privacy Policy. If you do not agree with the terms of this policy, please refrain from using our services." })
            ] }),
            /* @__PURE__ */ jsx(InfoBox, { emoji: "📌", text: "This policy applies to all clients, visitors, and domestic help professionals who interact with Domestic Pro's platform or services." })
          ] }),
          /* @__PURE__ */ jsxs("section", { id: "collection", "data-section": "collection", children: [
            /* @__PURE__ */ jsx(SectionHeader, { number: "2", emoji: "📥", title: "Information We Collect" }),
            /* @__PURE__ */ jsx(Para, { children: "We collect information necessary to provide our placement and facilitation services. This includes information you provide directly and information collected automatically." }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(SubHeading, { text: "2.1 Information You Provide" }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3", children: [
                /* @__PURE__ */ jsx(DataCard, { emoji: "👤", title: "Client Information", items: ["Full name and contact details", "Mobile number and email address", "Residential address", "Service requirements and preferences", "Payment transaction details"] }),
                /* @__PURE__ */ jsx(DataCard, { emoji: "🧹", title: "Domestic Help Information", items: ["Full name, age, and photograph", "Government-issued ID documents", "Address and background details", "Work experience and references", "Police verification documents"] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(SubHeading, { text: "2.2 Information Collected Automatically" }),
              /* @__PURE__ */ jsx(BulletList, { items: ["IP address and browser type", "Pages visited and time spent on the website", "Device information (mobile, desktop, OS)", "Referral source (how you found us)", "Cookies and similar tracking technologies"] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(SubHeading, { text: "2.3 Information from Third Parties" }),
              /* @__PURE__ */ jsx(Para, { children: "We may receive information about you from third-party sources such as reference checks, background verification agencies, or social media platforms if you interact with our brand there." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { id: "usage", "data-section": "usage", children: [
            /* @__PURE__ */ jsx(SectionHeader, { number: "3", emoji: "⚙️", title: "How We Use Your Information" }),
            /* @__PURE__ */ jsx(Para, { children: "We use the information we collect only for the purposes described below. We do not use your data for any purpose unrelated to our services." }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(SubHeading, { text: "3.1 Service Delivery" }),
              /* @__PURE__ */ jsx(BulletList, { items: ["Matching clients with suitable domestic help candidates", "Conducting ID verification and background checks", "Facilitating profile sharing and interview coordination", "Managing replacement requests and ongoing support"] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(SubHeading, { text: "3.2 Communication" }),
              /* @__PURE__ */ jsx(BulletList, { items: ["Responding to enquiries, service requests, and support tickets", "Sending service updates, booking confirmations, and reminders", "Periodic check-in communications for active clients"] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(SubHeading, { text: "3.3 Legal & Compliance" }),
              /* @__PURE__ */ jsx(BulletList, { items: ["Complying with applicable laws and regulatory requirements", "Preventing fraud, misuse, or unlawful use of our platform", "Maintaining records required for dispute resolution"] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(SubHeading, { text: "3.4 Improvement & Analytics" }),
              /* @__PURE__ */ jsx(BulletList, { items: ["Analysing usage patterns to improve our services", "Understanding client needs to personalise recommendations", "Internal reporting and operational performance reviews"] })
            ] }),
            /* @__PURE__ */ jsx(InfoBox, { emoji: "🛑", text: "We do not sell, rent, or trade your personal information to any third party for marketing purposes." })
          ] }),
          /* @__PURE__ */ jsxs("section", { id: "sharing", "data-section": "sharing", children: [
            /* @__PURE__ */ jsx(SectionHeader, { number: "4", emoji: "🔗", title: "Sharing of Information" }),
            /* @__PURE__ */ jsx(Para, { children: "Domestic Pro does not sell your personal data. We only share information where necessary to deliver our services or comply with legal obligations." }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(SubHeading, { text: "4.1 With Domestic Help Candidates" }),
              /* @__PURE__ */ jsx(Para, { children: "Client contact details and general household requirements may be shared with vetted domestic help candidates for the purpose of facilitating placement." })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(SubHeading, { text: "4.2 With Verification Partners" }),
              /* @__PURE__ */ jsx(Para, { children: "Where police verification or enhanced background checks are requested, relevant documents and information may be shared with authorised third-party verification agencies." })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(SubHeading, { text: "4.3 With Service Providers" }),
              /* @__PURE__ */ jsx(Para, { children: "We may share data with trusted service providers who assist us in operating our platform (e.g., cloud hosting, CRM software, payment processors). These providers are contractually bound to keep your information confidential." })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(SubHeading, { text: "4.4 Legal Disclosure" }),
              /* @__PURE__ */ jsx(Para, { children: "We may disclose your information if required to do so by law, court order, or government authority, or to protect the rights, property, or safety of Domestic Pro, its clients, or the public." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { id: "storage", "data-section": "storage", children: [
            /* @__PURE__ */ jsx(SectionHeader, { number: "5", emoji: "🗄️", title: "Data Storage & Security" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(SubHeading, { text: "5.1 Storage Location" }),
              /* @__PURE__ */ jsx(Para, { children: "Your data is stored on secure servers located within India. We use industry-standard measures including encryption, access controls, and regular security audits to protect your information." })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(SubHeading, { text: "5.2 Retention Period" }),
              /* @__PURE__ */ jsx(Para, { children: "We retain your personal data for as long as necessary to fulfil the purposes outlined in this policy, or as required by applicable law. Client records are typically retained for a period of 3 years following the end of the service engagement." })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(SubHeading, { text: "5.3 Security Measures" }),
              /* @__PURE__ */ jsx(BulletList, { items: ["SSL/TLS encryption for all data transmitted through our platform", "Role-based access controls — only authorised staff can access your data", "Regular security reviews and vulnerability assessments", "No storage of complete payment card details on our servers"] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(SubHeading, { text: "5.4 Breach Notification" }),
              /* @__PURE__ */ jsx(Para, { children: "In the unlikely event of a data breach that affects your personal information, we will notify affected individuals and relevant authorities in accordance with applicable Indian data protection laws." })
            ] }),
            /* @__PURE__ */ jsx(InfoBox, { emoji: "🔐", text: "While we implement strong safeguards, no system is completely immune. We encourage you to use strong passwords and not share your account credentials." })
          ] }),
          /* @__PURE__ */ jsxs("section", { id: "cookies", "data-section": "cookies", children: [
            /* @__PURE__ */ jsx(SectionHeader, { number: "6", emoji: "🍪", title: "Cookies & Tracking" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(SubHeading, { text: "6.1 What Are Cookies?" }),
              /* @__PURE__ */ jsx(Para, { children: "Cookies are small text files placed on your device when you visit our website. They help us remember your preferences, understand how you use our site, and improve your experience." })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(SubHeading, { text: "6.2 Types of Cookies We Use" }),
              /* @__PURE__ */ jsx("div", { className: "space-y-3 mt-2", children: [
                { name: "Essential Cookies", desc: "Required for the website to function properly. Cannot be disabled.", required: true },
                { name: "Analytics Cookies", desc: "Help us understand how visitors use our site (e.g., Google Analytics).", required: false },
                { name: "Preference Cookies", desc: "Remember your settings and personalisation choices.", required: false },
                { name: "Marketing Cookies", desc: "Used to show relevant advertisements. We use these sparingly.", required: false }
              ].map(({ name, desc, required }) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 bg-bgLight border border-borderLight rounded-xl p-4", children: [
                /* @__PURE__ */ jsx("span", { className: `text-xs font-bold px-2 py-1 rounded-full flex-shrink-0 mt-0.5 ${required ? "bg-primary/10 text-primary" : "bg-borderLight/50 text-textLight"}`, children: required ? "Required" : "Optional" }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "font-bold text-textDark text-sm", children: name }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-textLight mt-0.5", children: desc })
                ] })
              ] }, name)) })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(SubHeading, { text: "6.3 Managing Cookies" }),
              /* @__PURE__ */ jsx(Para, { children: "You can control or disable cookies through your browser settings at any time. Please note that disabling essential cookies may affect the functionality of our website." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { id: "rights", "data-section": "rights", children: [
            /* @__PURE__ */ jsx(SectionHeader, { number: "7", emoji: "✅", title: "Your Rights" }),
            /* @__PURE__ */ jsx(Para, { children: "You have the following rights regarding your personal data. To exercise any of these rights, please contact us using the details in Section 11." }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5", children: [
              /* @__PURE__ */ jsx(RightCard, { emoji: "👁️", title: "Right to Access", desc: "Request a copy of the personal data we hold about you." }),
              /* @__PURE__ */ jsx(RightCard, { emoji: "✏️", title: "Right to Correct", desc: "Ask us to correct any inaccurate or incomplete personal information." }),
              /* @__PURE__ */ jsx(RightCard, { emoji: "🗑️", title: "Right to Delete", desc: "Request deletion of your personal data, subject to legal retention requirements." }),
              /* @__PURE__ */ jsx(RightCard, { emoji: "📦", title: "Right to Portability", desc: "Request your data in a structured, machine-readable format." }),
              /* @__PURE__ */ jsx(RightCard, { emoji: "🚫", title: "Right to Object", desc: "Object to the processing of your data for certain purposes such as direct marketing." }),
              /* @__PURE__ */ jsx(RightCard, { emoji: "⏸️", title: "Right to Restrict", desc: "Request that we restrict processing of your data in certain circumstances." })
            ] }),
            /* @__PURE__ */ jsx(InfoBox, { emoji: "📌", text: "We aim to respond to all valid data rights requests within 30 days. We may need to verify your identity before processing your request." })
          ] }),
          /* @__PURE__ */ jsxs("section", { id: "third-party", "data-section": "third-party", children: [
            /* @__PURE__ */ jsx(SectionHeader, { number: "8", emoji: "🔗", title: "Third-Party Links" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsx(Para, { children: "Our website may contain links to third-party websites, social media platforms, or partner services. These websites operate independently and have their own privacy policies." }),
              /* @__PURE__ */ jsx(Para, { children: "Domestic Pro is not responsible for the privacy practices or content of third-party websites. We encourage you to review the privacy policies of any external sites you visit." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { id: "children", "data-section": "children", children: [
            /* @__PURE__ */ jsx(SectionHeader, { number: "9", emoji: "👶", title: "Children's Privacy" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsx(Para, { children: "Domestic Pro's services are intended for adults only. We do not knowingly collect personal information from individuals under the age of 18." }),
              /* @__PURE__ */ jsx(Para, { children: "If we become aware that we have collected personal data from a child without appropriate parental consent, we will take immediate steps to delete that information from our records." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { id: "changes", "data-section": "changes", children: [
            /* @__PURE__ */ jsx(SectionHeader, { number: "10", emoji: "📝", title: "Changes to This Policy" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsx(Para, { children: "We may update this Privacy Policy from time to time to reflect changes in our practices, services, or applicable laws. When we make material changes, we will notify you by:" }),
              /* @__PURE__ */ jsx(BulletList, { items: ["Posting the updated policy on our website with a revised effective date", "Sending an email notification to active clients where applicable", "Displaying a notice on our homepage at the time of the update"] }),
              /* @__PURE__ */ jsx(Para, { children: "Your continued use of our services after any changes indicates acceptance of the updated Privacy Policy." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { id: "contact", "data-section": "contact", children: [
            /* @__PURE__ */ jsx(SectionHeader, { number: "11", emoji: "📞", title: "Contact Us" }),
            /* @__PURE__ */ jsx(Para, { children: "If you have any questions, concerns, or requests related to this Privacy Policy or how we handle your personal data, please contact our Privacy Team:" }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5", children: [
              { emoji: "📞", label: "Call Us", value: "+91 92112 98139", href: "tel:+919211298139" },
              { emoji: "✉️", label: "Email", value: "support@domesticpro.in", href: "mailto:support@domesticpro.in" },
              { emoji: "💬", label: "WhatsApp", value: "+91 92112 98139", href: "https://wa.me/919211298139" },
              { emoji: "📍", label: "Office", value: "Gurugram, Haryana", href: "#" }
            ].map(({ emoji, label, value, href }) => /* @__PURE__ */ jsxs(
              "a",
              {
                href,
                className: "flex items-center gap-4 bg-bgLight border border-borderLight rounded-xl p-4 hover:border-primary hover:shadow-md transition-all duration-200 no-underline group",
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 group-hover:bg-primary transition-colors duration-200", children: [
                    /* @__PURE__ */ jsx("span", { className: "group-hover:hidden", children: emoji }),
                    /* @__PURE__ */ jsx("span", { className: "hidden group-hover:block text-white text-base", children: emoji })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[11px] font-bold text-textLight uppercase tracking-wider", children: label }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-textDark", children: value })
                  ] })
                ]
              },
              label
            )) }),
            /* @__PURE__ */ jsxs("div", { className: "mt-5 bg-bgLight border border-borderLight rounded-2xl p-5 text-center", children: [
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-textLight mb-1", children: [
                /* @__PURE__ */ jsx("strong", { className: "text-textDark", children: "Response Time:" }),
                " We aim to respond to all privacy queries within ",
                /* @__PURE__ */ jsx("strong", { className: "text-textDark", children: "2 business days." })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-textLight", children: "Working Hours: Mon–Fri 9am–8pm · Sat 9am–6pm" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: { background: "linear-gradient(135deg, #EC5F36 0%, #C94520 100%)" }, className: "rounded-2xl p-8 text-center text-white", children: [
            /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-full bg-white/15 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsx(ShieldCheck, { size: 24, className: "text-white" }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-2xl font-extrabold mb-3", children: "Your Privacy Matters to Us" }),
            /* @__PURE__ */ jsx("p", { className: "text-white/85 text-sm leading-relaxed max-w-md mx-auto mb-6", children: "We are committed to handling your data with care, transparency, and respect. If you ever have concerns, we're just a message away." }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-3", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => navigate("/contact"),
                  className: "bg-white text-primary px-6 py-3 rounded-xl text-sm font-bold hover:bg-bgLight transition-colors duration-200 shadow-md",
                  children: "Contact Us"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => navigate("/terms-and-conditions"),
                  className: "border-2 border-white/40 text-white px-6 py-3 rounded-xl text-sm font-bold hover:border-white transition-colors duration-200",
                  children: "View Terms & Conditions"
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
  PrivacyPolicy as default
};
