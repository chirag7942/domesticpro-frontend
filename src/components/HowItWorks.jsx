import { useEffect } from "react";

const steps = [
  {
    title: "Enquiry & Requirement Call",
    description: "We understand your exact household requirements — role, timing, expectations, and preferences.",
  },
  {
    title: "Plan Selection",
    description: "Choose Connect, Care, or Complete based on the level of verification and support you prefer.",
  },
  {
    title: "Advance Activation Payment",
    description: "₹3,000 / ₹5,000 / ₹7,000 advance payment. Service is officially activated.",
  },
  {
    title: "Profile Sharing & Interviews",
    description: "Verified profiles are shared as per your selected plan. Interviews are coordinated accordingly.",
  },
  {
    title: "Candidate Confirmation",
    description: "You finalize the most suitable candidate after review and discussion.",
  },
  {
    title: "Balance Payment",
    description: "Remaining amount is payable immediately upon candidate confirmation.",
  },
  {
    title: "Joining & Structured Support",
    description: "Post-joining assistance and follow-up support are provided as per your selected plan.",
  },
];

export default function HowItWorks() {
  useEffect(() => {
    const sections = document.querySelectorAll(".scroll-section");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("show")),
      { threshold: 0.15 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => sections.forEach((s) => observer.unobserve(s));
  }, []);

  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto scroll-section">

        {/* ── HEADING ── */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-textDark mb-4">
            How the Process Works
          </h2>
          <p className="text-textLight text-lg max-w-2xl mx-auto leading-relaxed">
            A structured and transparent hiring journey designed for clarity and confidence.
          </p>
        </div>

        {/* ── STEPS GRID ── */}
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex gap-5 group"
            >
              {/* Step number bubble */}
              <div className="flex-shrink-0 flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 border-2 border-primary/20 text-primary font-bold text-sm flex items-center justify-center group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors duration-200">
                  {index + 1}
                </div>
                {/* connector line — only between steps, not after last */}
                {index < steps.length - 1 && (
                  <div className="w-px flex-1 mt-2 bg-borderLight min-h-[24px]" />
                )}
              </div>

              {/* Content */}
              <div className="pb-8">
                <h3 className="text-base font-bold text-textDark mb-1.5 group-hover:text-primary transition-colors duration-200">
                  {step.title}
                </h3>
                <p className="text-sm text-textLight leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── FOOTER NOTE ── */}
        <div className="mt-12 bg-bgLight border border-borderLight rounded-2xl px-6 py-4 text-center">
          <p className="text-sm text-textLight leading-relaxed">
            <span className="font-semibold text-textDark">Note: </span>
            Advance payment is adjustable in the final plan amount.
            Full transparency is maintained at every stage of the hiring process.
          </p>
        </div>
      </div>
    </section>
  );
}