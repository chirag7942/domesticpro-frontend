import React, { useState, useEffect } from "react";

const Referrals = () => {
  const [formData, setFormData] = useState({
    referrerName: "",
    phone: "",

    upi: "",
    helperName: "",
    helperPhone: "",
    experience: "",
    workType: [],
    aadharFront: null,
    aadharBack: null,
  });

  const resetForm = () => {
    setFormData({
      referrerName: "",
      phone: "",
      upi: "",
      helperName: "",
      helperPhone: "",
      experience: "",
      workType: [],
      aadharFront: null,
      aadharBack: null,
    });

    // Reset file inputs manually
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach((input) => (input.value = ""));
  };

  const [formKey, setFormKey] = useState(0);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCheckboxChange = (value) => {
    const updated = formData.workType.includes(value)
      ? formData.workType.filter((item) => item !== value)
      : [...formData.workType, value];

    setFormData({ ...formData, workType: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    // 1️⃣ Let browser validate all required inputs first
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // 2️⃣ Validate work type (FIRST FORM)
    if (
      formData.workType.length === 0 &&
      form.querySelector(
        'input[type="checkbox"]:not([name="workTypeRequired"])',
      )
    ) {
      alert("Please select at least one Work Type.");
      return;
    }

    // 3️⃣ Validate work type (SECOND FORM)
    const requiredCheckboxes = form.querySelectorAll(
      'input[name="workTypeRequired"]:checked',
    );

    if (
      form.querySelector('input[name="workTypeRequired"]') &&
      requiredCheckboxes.length === 0
    ) {
      alert("Please select at least one Work Type.");
      return;
    }

    // 4️⃣ If everything valid
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setShowPopup(true);
      setFormKey((prev) => prev + 1);
      resetForm();
    }, 2000);
  };

  useEffect(() => {
    const sections = document.querySelectorAll(".scroll-section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.15 },
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <>
      <section className="bg-[#FFF7F4] py-20">
        {/* Increased width */}
        <div className="max-w-6xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center justify-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
              💰 Referral Reward Program
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-textDark mb-4">
              Refer a Helper & <span className="text-primary">Earn ₹1000</span>
            </h2>

            <p className="text-textLight max-w-2xl mx-auto leading-relaxed">
              Help someone find a verified job opportunity and earn a guaranteed
              referral reward once the helper is successfully placed.
            </p>
          </div>

          {/* Form */}
          <form
            key={`form1-${formKey}`}
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-10 shadow-xl border border-orange-100 space-y-8 transition duration-500"
          >
            {/* Referrer Details */}
            {/* Your Details */}
            <div>
              <h4 className="text-lg font-semibold text-textDark mb-4">
                Your Details
              </h4>

              <div className="grid md:grid-cols-3 gap-6">
                <input
                  type="text"
                  name="referrerName"
                  placeholder="Full Name"
                  value={formData.referrerName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:border-primary"
                />

                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Mobile No."
                    value={formData.phone}
                    onChange={(e) => {
                      const onlyNums = e.target.value.replace(/\D/g, "");
                      if (onlyNums.length <= 10) {
                        setFormData({ ...formData, phone: onlyNums });
                      }
                    }}
                    required
                    pattern="[0-9]{10}"
                    maxLength="10"
                    className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:border-primary"
                  />
                </div>

                <input
                  type="text"
                  name="upi"
                  placeholder="Your UPI ID"
                  value={formData.upi}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Helper Details */}
            <div>
              <h4 className="text-lg font-semibold text-textDark mb-4">
                Helper Details
              </h4>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Smaller Name */}
                <input
                  type="text"
                  name="helperName"
                  placeholder="Helper Full Name"
                  value={formData.helperName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:border-primary"
                />

                <div>
                  <input
                    type="tel"
                    name="helperPhone"
                    placeholder="Helper Mobile No."
                    value={formData.helperPhone}
                    onChange={(e) => {
                      const onlyNums = e.target.value.replace(/\D/g, "");
                      if (onlyNums.length <= 10) {
                        setFormData({ ...formData, helperPhone: onlyNums });
                      }
                    }}
                    required
                    pattern="[0-9]{10}"
                    maxLength="10"
                    className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:border-primary"
                  />
                </div>

                {/* Experience Dropdown */}
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:border-primary"
                >
                  <option value="">Select Experience</option>
                  <option value="6-12 Months"> 6 - 12 Months</option>
                  <option value="1+ Year">1+ Year</option>
                  <option value="2+ Years">2+ Years</option>
                  <option value="5+ Years">5+ Years</option>
                </select>

                {/* Work Type Multi */}
                <div className="md:col-span-3">
                  <label className="block text-sm font-semibold text-textDark mb-2">
                    Work Type
                  </label>

                  <div className="flex gap-6 text-sm flex-wrap">
                    {["Live-In", "Substitute"].map((type) => (
                      <label key={type} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.workType.includes(type)}
                          onChange={() => handleCheckboxChange(type)}
                          className="accent-primary"
                        />
                        {type}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Aadhar Upload */}
                <div className="md:col-span-3 grid md:grid-cols-2 gap-6">
                  {/* Aadhar Front */}
                  <div>
                    <label className="block text-sm font-semibold text-textDark mb-2">
                      Aadhar Card Front <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      name="aadharFront"
                      required
                      accept="image/*,.pdf"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          aadharFront: e.target.files[0],
                        })
                      }
                      className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:border-primary"
                    />
                  </div>

                  {/* Aadhar Back */}
                  <div>
                    <label className="block text-sm font-semibold text-textDark mb-2">
                      Aadhar Card Back <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      name="aadharBack"
                      required
                      accept="image/*,.pdf"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          aadharBack: e.target.files[0],
                        })
                      }
                      className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Box */}
            <div className="bg-orange-50 border border-orange-200 p-4 rounded-xl text-sm text-orange-700">
              🔒 Reward transferred after successful placement & service
              duration.
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-xl font-semibold transition duration-300 shadow-md 
              ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-primaryHover hover:-translate-y-1 hover:shadow-lg"
              } text-white`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </div>
              ) : (
                "Submit Referral"
              )}
            </button>
          </form>

          {/* Popup */}
          {showPopup && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                  ✓
                </div>

                <h3 className="text-2xl font-bold text-textDark mb-2">
                  Referral Submitted!
                </h3>

                <p className="text-textLight mb-6">
                  You will receive ₹1000 after successful placement.
                </p>

                <button
                  onClick={() => {
                    setShowPopup(false);
                    resetForm();
                  }}
                  className="bg-primary hover:bg-primaryHover text-white px-6 py-2 rounded-xl transition"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="bg-bgLight py-20 ">
        <div className="max-w-6xl mx-auto px-6 scroll-section">
          {/* Heading */}
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-textDark mb-4">
              Refer Someone Who Needs a Helper &
              <span className="text-primary"> Earn ₹1000</span>
            </h2>

            <p className="text-textLight max-w-2xl mx-auto leading-relaxed">
              Know a family looking for a trusted helper? Refer them to us and
              earn a reward after successful hiring.
            </p>
          </div>

          {/* Form */}
          <form
            key={`form1-${formKey}`}
            onSubmit={handleSubmit}
            className="bg-[#FFF7F4] rounded-3xl p-10 shadow-xl border border-orange-100 space-y-8 bg-white"
          >
            {/* Your Details */}
            <div>
              <h4 className="text-lg font-semibold text-textDark mb-4">
                Your Details
              </h4>

              <div className="grid md:grid-cols-3 gap-6">
                <input
                  type="text"
                  placeholder="Your Full Name"
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:border-primary"
                />
                <div>
                  <input
                    type="tel"
                    name="employerPhone"
                    placeholder="Your Mobile No."
                    required
                    pattern="[0-9]{10}"
                    maxLength="10"
                    onInput={(e) => {
                      e.target.value = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 10);
                    }}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:border-primary"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Your UPI ID"
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Employer Details */}
            <div>
              <h4 className="text-lg font-semibold text-textDark mb-4">
                Household Details
              </h4>
              {/* Name + Mobile + Experience in SAME ROW */}
              <div className="grid md:grid-cols-3 gap-6">
                <input
                  type="text"
                  placeholder="Employer Full Name"
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:border-primary"
                />

                <input
                  type="tel"
                  name="employerPhone"
                  placeholder="Employer Mobile No."
                  required
                  pattern="[0-9]{10}"
                  maxLength="10"
                  onInput={(e) => {
                    e.target.value = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 10);
                  }}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:border-primary"
                />

                <select
                  name="experienceRequired"
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:border-primary"
                >
                  <option value="">Experience Required</option>
                  <option value="6-12 Months">6 - 12 Months</option>
                  <option value="1+ Year">1+ Year</option>
                  <option value="2+ Years">2+ Years</option>
                  <option value="5+ Years">5+ Years</option>
                </select>
              </div>

              {/* Work Type Checkboxes */}
              <div className="md:col-span-3 mt-6">
                <label className="block text-sm font-semibold text-textDark mb-2">
                  Work Type Required
                </label>

                <div className="flex gap-6 text-sm flex-wrap">
                  {["Live-In", "Substitute"].map((type) => (
                    <label key={type} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="workTypeRequired"
                        value={type}
                        className="accent-primary"
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>

              {/* Aadhar Upload */}
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-semibold text-textDark mb-2">
                    Aadhar Card Front <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-2 bg-white focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-textDark mb-2">
                    Aadhar Card Back <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-2 bg-white focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* Trust Box */}
            <div className="bg-orange-50 border border-orange-200 p-4 rounded-xl text-sm text-orange-700">
              🔒 Referral reward will be credited after successful hiring and
              service confirmation.
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-xl font-semibold transition duration-300 shadow-md 
    ${
      isSubmitting
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-primary hover:bg-primaryHover hover:-translate-y-1 hover:shadow-lg"
    } text-white`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </div>
              ) : (
                "Submit Referral"
              )}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Referrals;
