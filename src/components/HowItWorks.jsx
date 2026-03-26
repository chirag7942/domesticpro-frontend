import { useEffect, useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Plan Selection",
    description:
      "Choose Connect, Care, or Complete based on the level of verification and support you prefer.",
    image: "https://res.cloudinary.com/dto7bji6b/image/upload/v1774335046/d8d65fe2-617e-45c9-900b-93e7bc9be92c_spy8bn.png",
  },
  {
    number: "02",
    title: "Profile Sharing & Interviews",
    description:
      "Verified profiles are shared as per your selected plan. Interviews are coordinated accordingly.",
    image: "https://res.cloudinary.com/dto7bji6b/image/upload/v1774335643/Virtual_interview_in_progress_jdzrjv.png",
  },
  {
    number: "03",
    title: "Candidate Confirmation",
    description:
      "You finalize the most suitable candidate after review and discussion.",
    image: "https://res.cloudinary.com/dto7bji6b/image/upload/v1774336700/Successful_candidate_confirmation_moment_xpidww.png",
  },
  {
    number: "04",
    title: "Joining & Structured Support",
    description:
      "Post-joining assistance and follow-up support are provided as per your selected plan.",
    image: "https://res.cloudinary.com/dto7bji6b/image/upload/v1774336141/Professional_handshake_with_friendly_exchange_ivn6qz.png",
  },
];

const CSS = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes lineGrow {
    from { width: 0%; }
    to   { width: 100%; }
  }
  .hiw-card {
    opacity: 0;
    transform: translateY(28px);
    transition: box-shadow 0.3s ease, transform 0.3s ease;
  }
  .hiw-card:hover {
    box-shadow: 0 20px 48px rgba(236,95,54,0.13);
    transform: translateY(-4px) !important;
  }
  .hiw-section.show .hiw-card {
    animation: fadeUp 0.55s ease forwards;
  }
  .hiw-section.show .hiw-card:nth-child(1) { animation-delay: 0.05s; }
  .hiw-section.show .hiw-card:nth-child(2) { animation-delay: 0.17s; }
  .hiw-section.show .hiw-card:nth-child(3) { animation-delay: 0.29s; }
  .hiw-section.show .hiw-card:nth-child(4) { animation-delay: 0.41s; }
  .hiw-section.show .hiw-line {
    animation: lineGrow 0.9s ease 0.1s forwards;
  }
  .hiw-line { width: 0%; }

  .hiw-icon-ring {
    transition: all 0.2s ease;
  }

  /* Updated hover for images */
  .hiw-card:hover .hiw-icon-ring {
    background: rgba(236,95,54,0.12);
    transform: scale(1.05);
  }
`;

export default function HowItWorks() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add("show");
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return (
    <>
      <style>{CSS}</style>

      <section className="bg-white py-24 px-6">
        <div className="max-w-6xl mx-auto">

          {/* ── HEADING ── */}
          <div className="text-center mb-16">
            <span className="inline-block bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">
              Our Process
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-textDark mb-4">
              How the Process Works
            </h2>
            <p className="text-textLight text-lg max-w-2xl mx-auto leading-relaxed">
              A structured and transparent hiring journey designed for clarity and confidence.
            </p>
          </div>

          {/* ── TIMELINE ── */}
          <div ref={sectionRef} className="hiw-section">

            {/* Top connecting line */}
            <div className="hidden md:block relative mb-0 mx-4">
              <div className="absolute top-0 left-0 h-0.5 bg-borderLight w-full" />
              <div className="hiw-line absolute top-0 left-0 h-0.5 bg-primary" />
            </div>

            {/* Cards */}
            <div className="flex flex-col md:flex-row items-stretch pt-8 gap-6">
              {steps.map((step, i) => (
                <div key={i} className="flex items-stretch flex-1 min-w-0">

                  {/* CARD */}
                  <div className="hiw-card flex-1 min-w-0 bg-white border border-borderLight rounded-2xl p-5 flex flex-col gap-3 h-full">

                    {/* Image + Step */}
                    <div className="flex items-center justify-between">
                      <div className="hiw-icon-ring w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden">
                        <img
                          src={step.image}
                          alt={step.title}
                          className="w-14 h-14 object-cover"
                        />
                      </div>

                      {/* Step Number (ORANGE) */}
                      <span
                        className="text-2xl font-black leading-none select-none text-primary !important"
                        style={{ opacity: 1 }}
                      >
                        {step.number}
                      </span>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-borderLight" />

                    {/* Text */}
                    <div>
                      <h3 className="text-sm font-bold text-textDark mb-1.5 leading-snug">
                        {step.title}
                      </h3>
                      <p className="text-xs text-textLight leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Bottom indicator */}
                    <div className="mt-auto pt-1 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary/40" />
                      <span className="w-8 h-0.5 bg-primary/20 rounded-full" />
                    </div>
                  </div>

                  {/* Arrow */}
                  {i < steps.length - 1 && (
                    <div className="hidden md:flex items-center justify-center flex-shrink-0 w-8">
                      <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
                        <line x1="0" y1="10" x2="18" y2="10" stroke="#EC5F36" strokeWidth="1.6" strokeDasharray="3 2.5" />
                        <path d="M15 4L23 10L15 16" stroke="#EC5F36" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* FOOTER NOTE */}
          <div className="mt-12 bg-bgLight border border-borderLight rounded-2xl px-6 py-4 text-center">
            <p className="text-sm text-textLight leading-relaxed">
              <span className="font-semibold text-textDark">Note: </span>
              Advance payment is adjustable in the final plan amount.
              Full transparency is maintained at every stage of the hiring process.
            </p>
          </div>

        </div>
      </section>
    </>
  );
}