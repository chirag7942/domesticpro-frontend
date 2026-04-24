import React, { useState, useEffect } from "react";
import { Users } from "lucide-react";
import SEO from "../components/SEO";
import useScrollReveal from "../hooks/useScrollReveal";

/* ── spinner keyframe ── */
const CSS = `
  @keyframes dp-spin { to { transform: rotate(360deg); } }
  .dp-spin { animation: dp-spin 0.7s linear infinite; }
`;

const INPUT_CLS = "w-full border border-borderLight rounded-xl px-4 py-2.5 text-sm text-textDark bg-white placeholder:text-textLight focus:outline-none focus:border-primary transition-colors duration-150";
const LABEL_CLS = "block text-xs font-bold text-textDark uppercase tracking-wider mb-1.5";
const SECTION_HEAD_CLS = "text-base font-bold text-textDark mb-4 flex items-center gap-2";

const EMPTY = {
    referrerName: "", phone: "",
    employerName: "", employerPhone: "", experienceRequired: "",
    workTypeRequired: [], aadharFrontEmp: null, aadharBackEmp: null,
};

/* ── defined OUTSIDE — isSubmitting passed as prop ── */
const SubmitButton = ({ label, isSubmitting }) => (
    <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-200 shadow-[0_4px_14px_rgba(236,95,54,0.25)]
      ${isSubmitting
                ? "bg-borderLight text-textLight cursor-not-allowed"
                : "bg-primary hover:bg-primaryHover text-white hover:shadow-[0_6px_20px_rgba(236,95,54,0.35)] hover:-translate-y-0.5"
            }`}
    >
        {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
                <span className="dp-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full inline-block" />
                Submitting…
            </span>
        ) : (
            <span className="flex items-center justify-center gap-2">
                {label}   <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
            </span>
        )}
    </button>
);

/* ── defined OUTSIDE — no state dependency ── */
const FileField = ({ label, name, onChange }) => (
    <div>
        <label className={LABEL_CLS}>{label} <span className="text-primary">*</span></label>
        <input
            type="file"
            name={name}
            required
            accept="image/*,.pdf"
            onChange={onChange}
            className="w-full border border-borderLight rounded-xl px-4 py-2 text-sm text-textLight bg-bgLight focus:outline-none focus:border-primary transition-colors duration-150 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-primary/10 file:text-primary"
        />
    </div>
);

export default function ReferHousehold() {
    const [formData, setFormData] = useState(EMPTY);
    const [formKey, setFormKey] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    const resetForm = () => {
        setFormData(EMPTY);
        document.querySelectorAll('input[type="file"]').forEach((el) => (el.value = ""));
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData((prev) => ({ ...prev, [name]: type === "file" ? files[0] : value }));
    };

    const handleCheckbox = (value) =>
        setFormData((prev) => ({
            ...prev,
            workTypeRequired: prev.workTypeRequired.includes(value)
                ? prev.workTypeRequired.filter((x) => x !== value)
                : [...prev.workTypeRequired, value],
        }));

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        if (!form.checkValidity()) { form.reportValidity(); return; }
        if (formData.workTypeRequired.length === 0) { alert("Please select at least one Work Type."); return; }
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setShowPopup(true);
            setFormKey((k) => k + 1);
            resetForm();
        }, 2000);
    };

    useScrollReveal();

    return (
        <>
            <SEO title="Refer a Household & Get Trusted Domestic Help | Verified Staff Matching"
                description="Help a family find the right domestic helper. Refer a household and our experts will match them with verified, experienced staff quickly and reliably."
                canonical="/refer-a-household" />
            <style>{CSS}</style>

            {/* ── FORM 2: Refer a Household ── */}
            <section className="bg-bgLight border-t border-borderLight py-20">
                <div className="max-w-4xl mx-auto px-6">

                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-textDark mb-4">
                            Refer a Household &{" "}
                            <span className="text-primary">Be Their Genie</span>
                        </h2>
                        <p className="text-textLight max-w-2xl mx-auto leading-relaxed">
                            Know a family searching for a trusted domestic helper? Your genie is here — refer them to us and we'll make the perfect match happen.
                        </p>
                    </div>

                    <form
                        key={`form2-${formKey}`}
                        onSubmit={handleSubmit}
                        className="bg-white rounded-3xl p-8 md:p-10 border border-borderLight shadow-sm space-y-8"
                    >
                        {/* referrer details */}
                        <div>
                            <h4 className={SECTION_HEAD_CLS}>
                                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">1</span>
                                Referrer's Information
                            </h4>
                            <div className="grid md:grid-cols-2 gap-5">
                                <div>
                                    <label className={LABEL_CLS}>Full Name</label>
                                    <input
                                        type="text"
                                        name="referrerName"
                                        placeholder="Enter your full name"
                                        value={formData.referrerName}
                                        onChange={handleChange}
                                        required
                                        className={INPUT_CLS}
                                    />
                                </div>
                                <div>
                                    <label className={LABEL_CLS}>Mobile Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="10-digit mobile number"
                                        value={formData.phone}
                                        onChange={(e) => { const v = e.target.value.replace(/\D/g, ""); if (v.length <= 10) setFormData((p) => ({ ...p, phone: v })); }}
                                        required
                                        pattern="[0-9]{10}"
                                        maxLength="10"
                                        className={INPUT_CLS}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="h-px bg-borderLight" />

                        {/* employer details */}
                        <div>
                            <h4 className={SECTION_HEAD_CLS}>
                                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">2</span>
                                Employer's Information
                            </h4>
                            <div className="grid md:grid-cols-3 gap-5">
                                <div>
                                    <label className={LABEL_CLS}>Employer's Full Name</label>
                                    <input
                                        type="text"
                                        name="employerName"
                                        placeholder="Enter employer's full name"
                                        value={formData.employerName}
                                        onChange={handleChange}
                                        required
                                        className={INPUT_CLS}
                                    />
                                </div>
                                <div>
                                    <label className={LABEL_CLS}>Employer's Mobile Number</label>
                                    <input
                                        type="tel"
                                        name="employerPhone"
                                        placeholder="10-digit mobile number"
                                        value={formData.employerPhone}
                                        onChange={(e) => { const v = e.target.value.replace(/\D/g, ""); if (v.length <= 10) setFormData((p) => ({ ...p, employerPhone: v })); }}
                                        required
                                        pattern="[0-9]{10}"
                                        maxLength="10"
                                        className={INPUT_CLS}
                                    />
                                </div>
                                <div>
                                    <label className={LABEL_CLS}>Experience Required</label>
                                    <select
                                        name="experienceRequired"
                                        value={formData.experienceRequired}
                                        onChange={handleChange}
                                        required
                                        className={INPUT_CLS}
                                    >
                                        <option value="">Select preferred experience</option>
                                        <option>6 – 12 Months</option>
                                        <option>1+ Year</option>
                                        <option>2+ Years</option>
                                        <option>5+ Years</option>
                                    </select>
                                </div>

                                <div className="md:col-span-3">
                                    <label className={LABEL_CLS}>Type of Engagement Required</label>
                                    <div className="flex gap-6 text-sm flex-wrap">
                                        {["Live-In", "Substitute"].map((type) => (
                                            <label key={type} className="flex items-center gap-2 cursor-pointer select-none">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.workTypeRequired.includes(type)}
                                                    onChange={() => handleCheckbox(type)}
                                                    className="accent-primary w-4 h-4"
                                                />
                                                <span className="text-textLight">{type}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="md:col-span-3 grid md:grid-cols-2 gap-5">
                                    <FileField
                                        label="Aadhaar Card (Front)"
                                        name="aadharFrontEmp"
                                        onChange={(e) => setFormData((p) => ({ ...p, aadharFrontEmp: e.target.files[0] }))}
                                    />
                                    <FileField
                                        label="Aadhaar Card (Back)"
                                        name="aadharBackEmp"
                                        onChange={(e) => setFormData((p) => ({ ...p, aadharBackEmp: e.target.files[0] }))}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* trust note */}
                        <div className="flex items-start gap-3 bg-primary/5 border border-primary/20 rounded-xl p-4">
                            <Users size={16} className="text-primary flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-primary font-semibold leading-relaxed">
                                Once referred, our team will personally reach out to the household and ensure they find their ideal helper — swiftly and seamlessly.
                            </p>
                        </div>

                        <SubmitButton label="Submit Referral" isSubmitting={isSubmitting} />
                    </form>
                </div>
            </section>

            {/* ── SUCCESS POPUP ── */}
            {showPopup && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
                    <div className="bg-white rounded-3xl p-10 max-w-sm w-full text-center shadow-2xl border border-borderLight">
                        <div className="w-16 h-16 bg-primary/10 border-2 border-primary/20 rounded-full flex items-center justify-center mx-auto mb-5">
                            <svg viewBox="0 0 20 20" fill="#EC5F36" className="w-8 h-8">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-textDark mb-2">Referral Submitted!</h3>
                        <p className="text-textLight text-sm mb-7 leading-relaxed">
                            Our team will reach out to the household shortly and find them the perfect helper.
                        </p>
                        <button
                            onClick={() => { setShowPopup(false); resetForm(); }}
                            className="bg-primary hover:bg-primaryHover text-white px-8 py-2.5 rounded-xl font-bold transition-all duration-200 text-sm"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}