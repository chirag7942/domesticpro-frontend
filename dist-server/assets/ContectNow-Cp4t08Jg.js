import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Phone, MessageSquare, Mail, MapPin, Send, Check, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { u as useScrollReveal, S as SEO } from "../entry-server.js";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "react-dom";
import "axios";
const contactChannels = [
  {
    icon: Phone,
    label: "Call Us",
    value: "+91 92112 98139",
    sub: "Mon – Sat, 9am – 7pm",
    action: "tel:+919211298139",
    cta: "Call Now"
  },
  {
    icon: MessageSquare,
    label: "WhatsApp",
    value: "+91 92112 98139",
    sub: "Usually replies in minutes",
    action: "https://wa.me/919211298139",
    cta: "Message"
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "support@domesticpro.in",
    sub: "We respond within 24 hrs",
    action: "mailto:hello@domesticpro.in",
    cta: "Send Email"
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "LG-006, DLF Grand Mall, Mehrauli, Gurugram Road",
    sub: "Gurugram – 122001",
    action: "https://maps.app.goo.gl/3N9oreM2qpmUsjdE7",
    cta: "Get Directions"
  }
];
const reasons = [
  "Hire a nanny or household help",
  "Learn about our plans & pricing",
  "Get a replacement quickly",
  "Ask a question before signing up",
  "Looking for a job",
  "Something else"
];
const hours = [
  { day: "Monday – Friday", time: "9:00 am – 8:00 pm" },
  { day: "Saturday", time: "9:00 am – 6:00 pm" }
];
const promises = [
  "Callback within 1 hour during working hours",
  "No pushy sales — we listen first",
  "Verified profiles shared within 24–48 hrs",
  "Full support until your hire is settled",
  "Transparent pricing, no hidden fees"
];
const styles = `
  /* multi-stop gradient buttons */
  .btn-gradient {
    background: linear-gradient(135deg, #EC5F36, #D84E28);
    transition: box-shadow .25s, transform .2s;
  }
  .btn-gradient:hover:not(:disabled) {
    box-shadow: 0 10px 30px rgba(236,95,54,.42);
    transform: translateY(-1px);
  }
  .btn-gradient:disabled { opacity: .45; cursor: not-allowed; }

  .card-orange   { background: linear-gradient(135deg, #EC5F36, #D84E28); }
  .strip-orange  { background: linear-gradient(135deg, #EC5F36, #C94520); }

  /* Tailwind's focus-visible ring colour doesn't map to an arbitrary hex easily */
  .field-focus:focus {
    border-color: #EC5F36 !important;
    background: #fff !important;
    box-shadow: 0 0 0 4px rgba(236,95,54,.12);
    outline: none;
  }

  /* remove native select arrow */
  .select-reset { appearance: none; }

  /* channel card hover – box-shadow + border + lift together */
  .channel-card { transition: border-color .25s, box-shadow .25s, transform .22s; }
  .channel-card:hover {
    border-color: #EC5F36;
    box-shadow: 0 8px 28px rgba(236,95,54,.13);
    transform: translateY(-3px);
  }

  .strip-btn { transition: background .2s, box-shadow .2s, transform .2s; }
  .strip-btn:hover {
    background: #FFF7F4;
    box-shadow: 0 10px 28px rgba(0,0,0,.20);
    transform: translateY(-1px);
  }
`;
function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    reason: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  useScrollReveal();
  const set = (f) => (e) => setForm((p) => ({ ...p, [f]: e.target.value }));
  const reset = () => {
    setSubmitted(false);
    setForm({ name: "", phone: "", reason: "", message: "" });
  };
  const submit = (e) => {
    e.preventDefault();
    if (form.name && form.phone.length === 10) setSubmitted(true);
  };
  const inputCls = "field-focus font-body w-full text-[15px] text-textDark bg-bgLight border-2 border-borderLight rounded-xl transition-colors duration-200";
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Contact Us",
        description: "Get in touch with DomesticPro for domestic helper hiring. Call +91 92112 98139 or WhatsApp us for fast response.",
        canonical: "/contact"
      }
    ),
    /* @__PURE__ */ jsx("style", { children: styles }),
    /* @__PURE__ */ jsxs("div", { className: "font-body bg-bgLight text-textDark min-h-screen", children: [
      /* @__PURE__ */ jsxs("section", { className: "hero-bg text-center px-4 sm:px-6 pt-20 pb-20", children: [
        /* @__PURE__ */ jsx("span", { className: "inline-block bg-primary/10 text-primary text-[11px] font-bold tracking-[2px] uppercase px-4 py-1.5 rounded-full mb-5", children: "We're Here for You" }),
        /* @__PURE__ */ jsxs("h1", { className: "font-display text-[clamp(36px,5vw,54px)] font-extrabold leading-[1.1] text-textDark mb-4", children: [
          "Let's get your home",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("em", { className: "not-italic text-primary", children: "sorted today." })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-textLight text-lg max-w-[480px] mx-auto leading-relaxed", children: "Reach out any way you like — our team responds fast and helps you find the right professional for your home." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "max-w-5xl mb-5 mx-auto px-4 sm:px-6 -translate-y-9 scroll-section", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ", children: contactChannels.map(
        ({ icon: Icon, label, value, sub, action, cta }) => /* @__PURE__ */ jsxs(
          "a",
          {
            href: action,
            className: "channel-card bg-white border-[1.5px] border-borderLight rounded-2xl\r\n                  p-5 flex flex-col gap-3 no-underline text-inherit",
            children: [
              /* @__PURE__ */ jsx("div", { className: "w-11 h-11 rounded-xl bg-bgLight flex items-center justify-center", children: /* @__PURE__ */ jsx(Icon, { size: 20, className: "text-primary" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-[11px] font-bold text-textLight tracking-widest uppercase mb-0.5", children: label }),
                /* @__PURE__ */ jsx("p", { className: "text-[15px] font-bold text-textDark leading-snug", children: value }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-textLight mt-0.5", children: sub })
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-1.5 text-[13px] font-bold text-primary", children: [
                cta,
                /* @__PURE__ */ jsx("svg", { width: 13, height: 13, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ jsx("path", { d: "M5 12h14M12 5l7 7-7 7" }) })
              ] })
            ]
          },
          label
        )
      ) }) }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-white border-[1.5px] border-borderLight rounded-3xl p-8 shadow-sm scroll-section", children: !submitted ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("h2", { className: "font-display text-[22px] font-extrabold text-textDark mb-1.5", children: "Send Us a Message" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-textLight mb-7 leading-relaxed", children: "Fill in your details and we'll call you back within the hour during working hours." }),
          /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "flex flex-col gap-[18px]", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-[11px] font-bold text-textDark uppercase tracking-[0.5px] mb-2", children: "Your Name *" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  className: `${inputCls} h-[50px] px-4`,
                  placeholder: "e.g. Priya Sharma",
                  value: form.name,
                  onChange: set("name"),
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-[11px] font-bold text-textDark uppercase tracking-[0.5px] mb-2", children: "Mobile Number *" }),
              /* @__PURE__ */ jsxs("div", { className: "relative flex items-center", children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "absolute left-0 top-0 h-[50px] w-14 flex items-center justify-center\r\n                        text-[14px] font-bold text-textLight border-r-2 border-borderLight pointer-events-none z-10",
                    children: "+91"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    className: `${inputCls} h-[50px] pl-[68px] pr-4`,
                    type: "tel",
                    maxLength: 10,
                    placeholder: "Enter 10-digit number",
                    value: form.phone,
                    onChange: (e) => setForm((p) => ({
                      ...p,
                      phone: e.target.value.replace(/\D/g, "")
                    })),
                    required: true
                  }
                )
              ] }),
              form.phone.length > 0 && form.phone.length < 10 && /* @__PURE__ */ jsx("p", { className: "text-xs text-primary font-semibold mt-1.5", children: "Please enter a valid 10-digit number" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-[11px] font-bold text-textDark uppercase tracking-[0.5px] mb-2", children: "Reason for Contact" }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    className: `select-reset ${inputCls} h-[50px] px-4 cursor-pointer`,
                    value: form.reason,
                    onChange: set("reason"),
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "", children: "Select a reason…" }),
                      reasons.map((r) => /* @__PURE__ */ jsx("option", { value: r, children: r }, r))
                    ]
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "absolute right-4 top-1/2 -translate-y-1/2 text-textLight text-[11px] pointer-events-none", children: "▼" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-[11px] font-bold text-textDark uppercase tracking-[0.5px] mb-2", children: [
                "Message",
                " ",
                /* @__PURE__ */ jsx("span", { className: "font-normal normal-case tracking-normal text-textLight", children: "(optional)" })
              ] }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  className: `${inputCls} px-4 py-3.5 resize-y min-h-[110px]`,
                  placeholder: "Tell us a bit more about what you need…",
                  value: form.message,
                  onChange: set("message")
                }
              )
            ] }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "submit",
                disabled: !form.name || form.phone.length !== 10,
                className: "btn-gradient w-full h-[52px] flex items-center justify-center gap-2\r\n                      text-white text-[16px] font-bold rounded-2xl border-none cursor-pointer\r\n                      shadow-[0_6px_20px_rgba(236,95,54,0.32)]",
                children: [
                  /* @__PURE__ */ jsx(Send, { size: 16 }),
                  "Send Message"
                ]
              }
            )
          ] })
        ] }) : (
          /* Success */
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center py-12 gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsx(Check, { size: 28, className: "text-primary", strokeWidth: 2.5 }) }),
            /* @__PURE__ */ jsx("h3", { className: "font-display text-[22px] font-extrabold text-textDark", children: "Message Received!" }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-textLight leading-relaxed max-w-[280px]", children: [
              "Thank you,",
              " ",
              /* @__PURE__ */ jsx("strong", { className: "text-textDark", children: form.name }),
              ". Our team will call you on",
              " ",
              /* @__PURE__ */ jsxs("strong", { className: "text-textDark", children: [
                "+91 ",
                form.phone
              ] }),
              " ",
              "within the hour."
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: reset,
                className: "mt-2 px-6 py-2.5 border-2 border-borderLight rounded-xl text-sm font-bold\r\n                    text-textLight bg-transparent cursor-pointer transition-colors duration-200\r\n                    hover:border-primary hover:text-primary",
                children: "Submit Another"
              }
            )
          ] })
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-5 scroll-section", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white border-[1.5px] border-borderLight rounded-2xl p-7", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-bgLight flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx(Clock, { size: 18, className: "text-primary" }) }),
              /* @__PURE__ */ jsx("h3", { className: "text-[17px] font-bold text-textDark", children: "Working Hours" })
            ] }),
            hours.map((r, i) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: `flex justify-between text-[13px] py-2.5 text-textLight
                    ${i < hours.length - 1 ? "border-b border-borderLight" : ""}`,
                children: [
                  /* @__PURE__ */ jsx("span", { children: r.day }),
                  /* @__PURE__ */ jsx("strong", { className: "text-textDark font-semibold", children: r.time })
                ]
              },
              r.day
            ))
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white border-[1.5px] border-borderLight rounded-2xl p-7", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-[17px] font-bold text-textDark mb-4", children: "Our Promise to You" }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-3", children: promises.map((item) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: "flex items-start gap-3 text-sm text-textLight leading-snug",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "w-5 h-5 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5", children: /* @__PURE__ */ jsx(
                    Check,
                    {
                      size: 12,
                      className: "text-primary",
                      strokeWidth: 3
                    }
                  ) }),
                  item
                ]
              },
              item
            )) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "card-orange rounded-2xl p-7 text-white", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-display text-[18px] font-extrabold mb-2", children: "Prefer to talk directly?" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-white/85 mb-5 leading-relaxed", children: "Call or WhatsApp us right now — no forms, no wait." }),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "tel:+919211298139",
                className: "inline-flex items-center gap-2 bg-white text-primary\r\n                  px-5 py-3 rounded-xl text-sm font-bold no-underline\r\n                  shadow-md hover:bg-bgLight transition-colors duration-200",
                children: [
                  /* @__PURE__ */ jsx(Phone, { size: 15 }),
                  "+91 92112 98139"
                ]
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "strip-orange px-4 py-20 text-center scroll-section", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-display text-[clamp(26px,4vw,38px)] font-extrabold text-white mb-3", children: "Ready to hire with confidence?" }),
        /* @__PURE__ */ jsx("p", { className: "text-white/80 text-base mb-8", children: "Get matched with verified domestic professionals — starting at ₹11,000." }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => navigate("/pricing"),
            className: "strip-btn inline-flex items-center gap-2 bg-white text-primary\r\n  px-8 py-3.5 rounded-2xl text-[15px] font-bold border-none cursor-pointer shadow-md",
            children: [
              "View Our Plans",
              /* @__PURE__ */ jsx("svg", { width: 15, height: 15, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ jsx("path", { d: "M5 12h14M12 5l7 7-7 7" }) })
            ]
          }
        )
      ] })
    ] })
  ] });
}
export {
  ContactPage as default
};
