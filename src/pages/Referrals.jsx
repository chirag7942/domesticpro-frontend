import React, { useState, useEffect } from "react";
import { ArrowRight, Gift, Users } from "lucide-react";

/* ── spinner for submit button — keyframe only ── */
const CSS = `
  @keyframes dp-spin { to { transform: rotate(360deg); } }
  .dp-spin { animation: dp-spin 0.7s linear infinite; }
`;

const INPUT_CLS = "w-full border border-borderLight rounded-xl px-4 py-2.5 text-sm text-textDark bg-white placeholder:text-textLight focus:outline-none focus:border-primary transition-colors duration-150";
const LABEL_CLS = "block text-xs font-bold text-textDark uppercase tracking-wider mb-1.5";
const SECTION_HEAD_CLS = "text-base font-bold text-textDark mb-4 flex items-center gap-2";

const EMPTY = {
  referrerName: "", phone: "", upi: "",
  helperName: "", helperPhone: "", experience: "",
  workType: [], aadharFront: null, aadharBack: null,
};

export default function Referrals() {
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
      workType: prev.workType.includes(value)
        ? prev.workType.filter((x) => x !== value)
        : [...prev.workType, value],
    }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    if (formData.workType.length === 0) { alert("Please select at least one Work Type."); return; }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowPopup(true);
      setFormKey((k) => k + 1);
      resetForm();
    }, 2000);
  };

  useEffect(() => {
    const sections = document.querySelectorAll(".scroll-section");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("show")),
      { threshold: 0.15 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => sections.forEach((s) => observer.unobserve(s));
  }, []);

  const SubmitButton = ({ label }) => (
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
          {label} <ArrowRight size={14} strokeWidth={2.5} />
        </span>
      )}
    </button>
  );

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

  return (
    <>
      <style>{CSS}</style>

      {/* ── FORM 1: Refer a Helper ── */}
      <section className="bg-bgLight py-20 scroll-section">
        <div className="max-w-4xl mx-auto px-6">

          {/* heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-textDark mb-4">
              Refer a Helper &{" "}
              <span className="text-primary">Earn ₹1,000</span>
            </h2>
            <p className="text-textLight max-w-2xl mx-auto leading-relaxed">
              Help someone find a verified job opportunity and earn a guaranteed referral reward once the helper is successfully placed.
            </p>
          </div>

          {/* form card */}
          <form
            key={`form1-${formKey}`}
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-8 md:p-10 border border-borderLight shadow-sm space-y-8"
          >
            {/* your details */}
            <div>
              <h4 className={SECTION_HEAD_CLS}>
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">1</span>
                Your Details
              </h4>
              <div className="grid md:grid-cols-3 gap-5">
                <div>
                  <label className={LABEL_CLS}>Full Name</label>
                  <input type="text" name="referrerName" placeholder="Your full name" value={formData.referrerName} onChange={handleChange} required className={INPUT_CLS} />
                </div>
                <div>
                  <label className={LABEL_CLS}>Mobile No.</label>
                  <input type="tel" name="phone" placeholder="10-digit number" value={formData.phone}
                    onChange={(e) => { const v = e.target.value.replace(/\D/g, ""); if (v.length <= 10) setFormData((p) => ({ ...p, phone: v })); }}
                    required pattern="[0-9]{10}" maxLength="10" className={INPUT_CLS} />
                </div>
                <div>
                  <label className={LABEL_CLS}>UPI ID</label>
                  <input type="text" name="upi" placeholder="yourname@upi" value={formData.upi} onChange={handleChange} required className={INPUT_CLS} />
                </div>
              </div>
            </div>

            <div className="h-px bg-borderLight" />

            {/* helper details */}
            <div>
              <h4 className={SECTION_HEAD_CLS}>
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">2</span>
                Helper Details
              </h4>
              <div className="grid md:grid-cols-3 gap-5">
                <div>
                  <label className={LABEL_CLS}>Helper Full Name</label>
                  <input type="text" name="helperName" placeholder="Helper's full name" value={formData.helperName} onChange={handleChange} required className={INPUT_CLS} />
                </div>
                <div>
                  <label className={LABEL_CLS}>Helper Mobile No.</label>
                  <input type="tel" name="helperPhone" placeholder="10-digit number" value={formData.helperPhone}
                    onChange={(e) => { const v = e.target.value.replace(/\D/g, ""); if (v.length <= 10) setFormData((p) => ({ ...p, helperPhone: v })); }}
                    required pattern="[0-9]{10}" maxLength="10" className={INPUT_CLS} />
                </div>
                <div>
                  <label className={LABEL_CLS}>Experience</label>
                  <select name="experience" value={formData.experience} onChange={handleChange} required className={INPUT_CLS}>
                    <option value="">Select experience</option>
                    <option>6 - 12 Months</option>
                    <option>1+ Year</option>
                    <option>2+ Years</option>
                    <option>5+ Years</option>
                  </select>
                </div>

                <div className="md:col-span-3">
                  <label className={LABEL_CLS}>Work Type</label>
                  <div className="flex gap-6 text-sm flex-wrap">
                    {["Live-In", "Substitute"].map((type) => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer select-none">
                        <input type="checkbox" checked={formData.workType.includes(type)} onChange={() => handleCheckbox(type)} className="accent-primary w-4 h-4" />
                        <span className="text-textLight">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-3 grid md:grid-cols-2 gap-5">
                  <FileField label="Aadhar Card Front" name="aadharFront"
                    onChange={(e) => setFormData((p) => ({ ...p, aadharFront: e.target.files[0] }))} />
                  <FileField label="Aadhar Card Back" name="aadharBack"
                    onChange={(e) => setFormData((p) => ({ ...p, aadharBack: e.target.files[0] }))} />
                </div>
              </div>
            </div>

            {/* trust note */}
            <div className="flex items-start gap-3 bg-primary/5 border border-primary/20 rounded-xl p-4">
              <Gift size={16} className="text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-primary font-semibold leading-relaxed">
                Reward transferred after successful placement & service duration.
              </p>
            </div>

            <SubmitButton label="Submit Referral" />
          </form>
        </div>
      </section>

      {/* ── FORM 2: Refer a Household ── */}
      <section className="bg-white border-t border-borderLight py-20 scroll-section">
        <div className="max-w-4xl mx-auto px-6">

          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-textDark mb-4">
              Refer Someone Who Needs a Helper &{" "}
              <span className="text-primary">Earn ₹1,000</span>
            </h2>
            <p className="text-textLight max-w-2xl mx-auto leading-relaxed">
              Know a family looking for a trusted helper? Refer them to us and earn a reward after successful hiring.
            </p>
          </div>

          <form
            key={`form2-${formKey}`}
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target;
              if (!form.checkValidity()) { form.reportValidity(); return; }
              const checked = form.querySelectorAll('input[name="workTypeRequired"]:checked');
              if (checked.length === 0) { alert("Please select at least one Work Type."); return; }
              setIsSubmitting(true);
              setTimeout(() => { setIsSubmitting(false); setShowPopup(true); setFormKey((k) => k + 1); }, 2000);
            }}
            className="bg-bgLight rounded-3xl p-8 md:p-10 border border-borderLight shadow-sm space-y-8"
          >
            {/* your details */}
            <div>
              <h4 className={SECTION_HEAD_CLS}>
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">1</span>
                Your Details
              </h4>
              <div className="grid md:grid-cols-3 gap-5">
                <div>
                  <label className={LABEL_CLS}>Full Name</label>
                  <input type="text" placeholder="Your full name" required className={INPUT_CLS} />
                </div>
                <div>
                  <label className={LABEL_CLS}>Mobile No.</label>
                  <input type="tel" name="yourPhone" placeholder="10-digit number" required pattern="[0-9]{10}" maxLength="10"
                    onInput={(e) => { e.target.value = e.target.value.replace(/\D/g, "").slice(0, 10); }} className={INPUT_CLS} />
                </div>
                <div>
                  <label className={LABEL_CLS}>UPI ID</label>
                  <input type="text" placeholder="yourname@upi" required className={INPUT_CLS} />
                </div>
              </div>
            </div>

            <div className="h-px bg-borderLight" />

            {/* household details */}
            <div>
              <h4 className={SECTION_HEAD_CLS}>
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">2</span>
                Household Details
              </h4>
              <div className="grid md:grid-cols-3 gap-5">
                <div>
                  <label className={LABEL_CLS}>Employer Full Name</label>
                  <input type="text" placeholder="Employer's full name" required className={INPUT_CLS} />
                </div>
                <div>
                  <label className={LABEL_CLS}>Employer Mobile No.</label>
                  <input type="tel" name="employerPhone" placeholder="10-digit number" required pattern="[0-9]{10}" maxLength="10"
                    onInput={(e) => { e.target.value = e.target.value.replace(/\D/g, "").slice(0, 10); }} className={INPUT_CLS} />
                </div>
                <div>
                  <label className={LABEL_CLS}>Experience Required</label>
                  <select name="experienceRequired" required className={INPUT_CLS}>
                    <option value="">Select experience</option>
                    <option>6 - 12 Months</option>
                    <option>1+ Year</option>
                    <option>2+ Years</option>
                    <option>5+ Years</option>
                  </select>
                </div>

                <div className="md:col-span-3">
                  <label className={LABEL_CLS}>Work Type Required</label>
                  <div className="flex gap-6 text-sm flex-wrap">
                    {["Live-In", "Substitute"].map((type) => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer select-none">
                        <input type="checkbox" name="workTypeRequired" value={type} className="accent-primary w-4 h-4" />
                        <span className="text-textLight">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-3 grid md:grid-cols-2 gap-5">
                  <FileField label="Aadhar Card Front" name="aadharFrontEmp"
                    onChange={() => { }} />
                  <FileField label="Aadhar Card Back" name="aadharBackEmp"
                    onChange={() => { }} />
                </div>
              </div>
            </div>

            {/* trust note */}
            <div className="flex items-start gap-3 bg-primary/5 border border-primary/20 rounded-xl p-4">
              <Users size={16} className="text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-primary font-semibold leading-relaxed">
                Referral reward will be credited after successful hiring and service confirmation.
              </p>
            </div>

            <SubmitButton label="Submit Referral" />
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
              You will receive <strong className="text-textDark">₹1,000</strong> after successful placement.
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