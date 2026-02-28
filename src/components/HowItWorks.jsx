import { useEffect } from "react";

export default function HowItWorks() {
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
  const steps = [
    {
      title: "Enquiry & Requirement Call",
      description:
        "We understand your exact household requirements — role, timing, expectations, and preferences.",
    },
    {
      title: "Plan Selection",
      description:
        "Choose Connect, Care, or Complete based on the level of verification and support you prefer.",
    },
    {
      title: "Advance Activation Payment",
      description:
        "₹3,000 / ₹5,000 / ₹7,000 advance payment. Service is officially activated.",
    },
    {
      title: "Profile Sharing & Interviews",
      description:
        "Verified profiles are shared as per your selected plan. Interviews are coordinated accordingly.",
    },
    {
      title: "Candidate Confirmation",
      description:
        "You finalize the most suitable candidate after review and discussion.",
    },
    {
      title: "Balance Payment",
      description:
        "Remaining amount is payable immediately upon candidate confirmation.",
    },
    {
      title: "Joining & Structured Support",
      description:
        "Post-joining assistance and follow-up support are provided as per your selected plan.",
    },
  ];

  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto scroll-section">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#011b31] mb-4">
            How the Process Works
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            A structured and transparent hiring journey designed for clarity and
            confidence.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-12 relative">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-6">
              {/* Step Number */}
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-[#eb6037] text-white flex items-center justify-center font-semibold">
                  {index + 1}
                </div>
              </div>

              {/* Step Content */}
              <div>
                <h3 className="text-lg font-semibold text-[#011b31] mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Authority Footer Line */}
        <div className="mt-16 text-center text-sm text-gray-500 max-w-3xl mx-auto leading-relaxed">
          Advance payment is adjustable in the final plan amount. Full
          transparency is maintained at every stage of the hiring process.
        </div>
      </div>
    </section>
  );
}
