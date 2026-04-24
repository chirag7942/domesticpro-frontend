import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Gift } from "lucide-react";
import { u as useScrollReveal, S as SEO } from "../entry-server.js";
import "react-dom/server";
import "react-router-dom";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "react-dom";
import "axios";
const CSS = `
  @keyframes dp-spin { to { transform: rotate(360deg); } }
  .dp-spin { animation: dp-spin 0.7s linear infinite; }
`;
const INPUT_CLS = "w-full border border-borderLight rounded-xl px-4 py-2.5 text-sm text-textDark bg-white placeholder:text-textLight focus:outline-none focus:border-primary transition-colors duration-150";
const LABEL_CLS = "block text-xs font-bold text-textDark uppercase tracking-wider mb-1.5";
const SECTION_HEAD_CLS = "text-base font-bold text-textDark mb-4 flex items-center gap-2";
const EMPTY = {
  referrerName: "",
  phone: "",
  upi: "",
  helperName: "",
  helperPhone: "",
  experience: "",
  workType: [],
  aadharFront: null,
  aadharBack: null
};
const SubmitButton = ({ label, isSubmitting }) => /* @__PURE__ */ jsx(
  "button",
  {
    type: "submit",
    disabled: isSubmitting,
    className: `w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-200 shadow-[0_4px_14px_rgba(236,95,54,0.25)]
      ${isSubmitting ? "bg-borderLight text-textLight cursor-not-allowed" : "bg-primary hover:bg-primaryHover text-white hover:shadow-[0_6px_20px_rgba(236,95,54,0.35)] hover:-translate-y-0.5"}`,
    children: isSubmitting ? /* @__PURE__ */ jsxs("span", { className: "flex items-center justify-center gap-2", children: [
      /* @__PURE__ */ jsx("span", { className: "dp-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full inline-block" }),
      "Submitting…"
    ] }) : /* @__PURE__ */ jsxs("span", { className: "flex items-center justify-center gap-2", children: [
      label,
      "   ",
      /* @__PURE__ */ jsx("svg", { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ jsx("path", { d: "M5 12h14M12 5l7 7-7 7" }) })
    ] })
  }
);
const FileField = ({ label, name, onChange }) => /* @__PURE__ */ jsxs("div", { children: [
  /* @__PURE__ */ jsxs("label", { className: LABEL_CLS, children: [
    label,
    " ",
    /* @__PURE__ */ jsx("span", { className: "text-primary", children: "*" })
  ] }),
  /* @__PURE__ */ jsx(
    "input",
    {
      type: "file",
      name,
      required: true,
      accept: "image/*,.pdf",
      onChange,
      className: "w-full border border-borderLight rounded-xl px-4 py-2 text-sm text-textLight bg-bgLight focus:outline-none focus:border-primary transition-colors duration-150 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-primary/10 file:text-primary"
    }
  )
] });
function Referrals() {
  const [formData, setFormData] = useState(EMPTY);
  const [formKey, setFormKey] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const resetForm = () => {
    setFormData(EMPTY);
    document.querySelectorAll('input[type="file"]').forEach((el) => el.value = "");
  };
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "file" ? files[0] : value }));
  };
  const handleCheckbox = (value) => setFormData((prev) => ({
    ...prev,
    workType: prev.workType.includes(value) ? prev.workType.filter((x) => x !== value) : [...prev.workType, value]
  }));
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    if (formData.workType.length === 0) {
      alert("Please select at least one Work Type.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowPopup(true);
      setFormKey((k) => k + 1);
      resetForm();
    }, 2e3);
  };
  useScrollReveal();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Refer a Domestic Worker & Earn upto ₹3,000 | Domestic Pro India",
        description: "Refer a trusted domestic worker and earn ₹1,000 after successful placement. Simple process, fast payout, and verified job opportunities.",
        canonical: "/refer-a-helper"
      }
    ),
    /* @__PURE__ */ jsx("style", { children: CSS }),
    /* @__PURE__ */ jsx("section", { className: "bg-bgLight py-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-4xl font-bold text-textDark mb-4", children: [
          "Know a Skilled Helper?",
          " ",
          /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Refer & Earn ₹1,000" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-textLight max-w-2xl mx-auto leading-relaxed", children: "Connect a hardworking individual with a verified placement opportunity. Once they are successfully placed and begin service, your ₹1,000 reward is guaranteed — no delays, no conditions." })
      ] }),
      /* @__PURE__ */ jsxs(
        "form",
        {
          onSubmit: handleSubmit,
          className: "bg-white rounded-3xl p-8 md:p-10 border border-borderLight shadow-sm space-y-8",
          children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("h4", { className: SECTION_HEAD_CLS, children: [
                /* @__PURE__ */ jsx("span", { className: "w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold", children: "1" }),
                "Your Information"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-5", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: LABEL_CLS, children: "Full Name" }),
                  /* @__PURE__ */ jsx("input", { type: "text", name: "referrerName", placeholder: "As per your Aadhar card", value: formData.referrerName, onChange: handleChange, required: true, className: INPUT_CLS })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: LABEL_CLS, children: "Mobile Number" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "tel",
                      name: "phone",
                      placeholder: "Your active 10-digit number",
                      value: formData.phone,
                      onChange: (e) => {
                        const v = e.target.value.replace(/\D/g, "");
                        if (v.length <= 10) setFormData((p) => ({ ...p, phone: v }));
                      },
                      required: true,
                      pattern: "[0-9]{10}",
                      maxLength: "10",
                      className: INPUT_CLS
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: LABEL_CLS, children: "UPI ID" }),
                  /* @__PURE__ */ jsx("input", { type: "text", name: "upi", placeholder: "Reward will be sent here", value: formData.upi, onChange: handleChange, required: true, className: INPUT_CLS })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "h-px bg-borderLight" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("h4", { className: SECTION_HEAD_CLS, children: [
                /* @__PURE__ */ jsx("span", { className: "w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold", children: "2" }),
                "Helper's Details"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-5", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: LABEL_CLS, children: "Helper's Full Name" }),
                  /* @__PURE__ */ jsx("input", { type: "text", name: "helperName", placeholder: "As per their Aadhar card", value: formData.helperName, onChange: handleChange, required: true, className: INPUT_CLS })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: LABEL_CLS, children: "Helper's Mobile Number" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "tel",
                      name: "helperPhone",
                      placeholder: "Their active 10-digit number",
                      value: formData.helperPhone,
                      onChange: (e) => {
                        const v = e.target.value.replace(/\D/g, "");
                        if (v.length <= 10) setFormData((p) => ({ ...p, helperPhone: v }));
                      },
                      required: true,
                      pattern: "[0-9]{10}",
                      maxLength: "10",
                      className: INPUT_CLS
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: LABEL_CLS, children: "Work Experience" }),
                  /* @__PURE__ */ jsxs("select", { name: "experience", value: formData.experience, onChange: handleChange, required: true, className: INPUT_CLS, children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "How long have they worked?" }),
                    /* @__PURE__ */ jsx("option", { children: "6 - 12 Months" }),
                    /* @__PURE__ */ jsx("option", { children: "1+ Year" }),
                    /* @__PURE__ */ jsx("option", { children: "2+ Years" }),
                    /* @__PURE__ */ jsx("option", { children: "5+ Years" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "md:col-span-3", children: [
                  /* @__PURE__ */ jsx("label", { className: LABEL_CLS, children: "Preferred Work Type" }),
                  /* @__PURE__ */ jsx("div", { className: "flex gap-6 text-sm flex-wrap", children: ["Live-In", "Substitute"].map((type) => /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 cursor-pointer select-none", children: [
                    /* @__PURE__ */ jsx("input", { type: "checkbox", checked: formData.workType.includes(type), onChange: () => handleCheckbox(type), className: "accent-primary w-4 h-4" }),
                    /* @__PURE__ */ jsx("span", { className: "text-textLight", children: type })
                  ] }, type)) })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "md:col-span-3 grid md:grid-cols-2 gap-5", children: [
                  /* @__PURE__ */ jsx(
                    FileField,
                    {
                      label: "Aadhar Card — Front Side",
                      name: "aadharFront",
                      onChange: (e) => setFormData((p) => ({ ...p, aadharFront: e.target.files[0] }))
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    FileField,
                    {
                      label: "Aadhar Card — Back Side",
                      name: "aadharBack",
                      onChange: (e) => setFormData((p) => ({ ...p, aadharBack: e.target.files[0] }))
                    }
                  )
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 bg-primary/5 border border-primary/20 rounded-xl p-4", children: [
              /* @__PURE__ */ jsx(Gift, { size: 16, className: "text-primary flex-shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-primary font-semibold leading-relaxed", children: "Your ₹1,000 reward is transferred directly to your UPI ID once the helper completes their first month of service. Guaranteed. No hidden conditions." })
            ] }),
            /* @__PURE__ */ jsx(SubmitButton, { label: "Submit Referral & Claim Reward", isSubmitting })
          ]
        },
        `form1-${formKey}`
      )
    ] }) }),
    showPopup && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-3xl p-10 max-w-sm w-full text-center shadow-2xl border border-borderLight", children: [
      /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-primary/10 border-2 border-primary/20 rounded-full flex items-center justify-center mx-auto mb-5", children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 20 20", fill: "#EC5F36", className: "w-8 h-8", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" }) }) }),
      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-textDark mb-2", children: "Referral Submitted!" }),
      /* @__PURE__ */ jsxs("p", { className: "text-textLight text-sm mb-7 leading-relaxed", children: [
        "You will receive ",
        /* @__PURE__ */ jsx("strong", { className: "text-textDark", children: "₹1,000" }),
        " after successful placement."
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            setShowPopup(false);
            resetForm();
          },
          className: "bg-primary hover:bg-primaryHover text-white px-8 py-2.5 rounded-xl font-bold transition-all duration-200 text-sm",
          children: "Close"
        }
      )
    ] }) })
  ] });
}
export {
  Referrals as default
};
