import { Check, Shield, Star, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import HeroWizard from "./HeroWizard";

/* ── only pseudo-elements Tailwind can't do ── */
const CSS = `
  .plan-card-hover { transition: box-shadow 0.3s ease, transform 0.3s ease; }
  .plan-card-hover:hover { box-shadow: 0 16px 48px rgba(236,95,54,0.12); transform: translateY(-3px); }
  .plan-highlighted { box-shadow: 0 20px 60px rgba(236,95,54,0.20); }
  .badge-gradient { background: linear-gradient(135deg, #EC5F36 0%, #D84E28 100%); }
  .cta-shimmer::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.14) 0%, transparent 60%);
    opacity: 0; transition: opacity 0.2s;
    border-radius: inherit;
  }
  .cta-shimmer:hover::before { opacity: 1; }
`;

const plans = [
  {
    name: "Connect",
    price: 11000,
    gstPrice: 12980,
    tagline: "Structured support to help you hire verified domestic help.",
    profiles: "5 verified profiles",
    icon: Zap,
    badge: "🚀 Most Popular & Quickest",
    features: [
      "Requirement understanding (role, hours, expectations)",
      "ID & address verification",
      "7-day trial period",
      "5-day free lookup period",
      "Profile finalization assistance (Audio/Video interview)",
      "One-time placement support",
    ],
    highlighted: false,
  },
  {
    name: "Care",
    price: 15000,
    gstPrice: 17700,
    tagline: "Enhanced verification and screening for added confidence.",
    profiles: "7 verified profiles",
    icon: Shield,
    features: [
      "Includes everything in Connect",
      "10-day trial period",
      "7-day free lookup period",
      "1 Replacement in 11 months",
      "Police verification",
      "Enhanced screening review",
    ],
    highlighted: false,
  },
  {
    name: "Complete",
    price: 20000,
    gstPrice: 23600,
    tagline: "End-to-end protection with priority support.",
    profiles: "10 verified profiles",
    icon: Star,
    features: [
      "Includes everything in Care",
      "15-day trial period",
      "10-day free lookup period",
      "2 Replacement in 11 months",
      "Priority matching",
      "Detailed background & reference verification",
      "Ongoing support & mediation",
      "Periodic check-ins (30 / 60 days)",
      "Role upgrade support (within plan validity)",
    ],
    highlighted: true,
  },
];

export default function PricingSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <>
      <style>{CSS}</style>

      <section className="bg-bgLight py-20">
        {/* ── HEADING ── */}
        <div className="max-w-5xl mx-auto px-6 text-center mb-14">
          <span className="inline-block bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
            Transparent Pricing
          </span>
          <h2 className="text-5xl md:text-6xl font-bold text-textDark leading-tight mb-5">
            Simple plans for
            <br />
            <em className="text-primary not-italic">every household.</em>
          </h2>
          <p className="text-textLight text-lg max-w-xl mx-auto leading-relaxed">
            No hidden charges. Structured hiring. Verified professionals —
            choose the level of care that fits your home.
          </p>
        </div>

        {/* ── CARDS ── */}
        <div className="max-w-7xl mx-auto px-6 scroll-section">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-center">
            {plans.map((plan) => {
              const Icon = plan.icon;
              return (
                <div
                  key={plan.name}
                  className={`relative bg-white rounded-3xl p-8 flex flex-col
                    ${plan.highlighted
                      ? "border-2 border-primary plan-highlighted md:-translate-y-5"
                      : "border border-borderLight plan-card-hover"
                    }`}
                  style={{ minHeight: 680 }}
                >
                  {/* Recommended badge for Complete */}
                  {plan.highlighted && (
                    <div className="badge-gradient absolute -top-4 left-1/2 -translate-x-1/2 text-white text-xs font-bold tracking-widest px-5 py-1.5 rounded-full uppercase whitespace-nowrap shadow-[0_4px_14px_rgba(236,95,54,0.40)]">
                      ⭐ Recommended
                    </div>
                  )}

                  {/* Most Popular & Quickest badge for Connect */}
                  {plan.badge && !plan.highlighted && (
                    <div className="badge-gradient absolute -top-4 left-1/2 -translate-x-1/2 text-white text-xs font-bold tracking-widest px-5 py-1.5 rounded-full uppercase whitespace-nowrap shadow-[0_4px_14px_rgba(236,95,54,0.40)]">
                      {plan.badge}
                    </div>
                  )}

                  {/* Icon */}
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${plan.highlighted ? "bg-primary/10" : "bg-bgLight"}`}>
                    <Icon size={20} className="text-primary" />
                  </div>

                  {/* Name */}
                  <h3 className="text-2xl font-bold text-textDark mb-1">
                    Domestic Pro –{" "}
                    <span className={plan.highlighted ? "text-primary" : ""}>{plan.name}</span>
                  </h3>

                  {/* Tagline */}
                  <p className="text-sm text-textLight leading-relaxed mb-6">{plan.tagline}</p>

                  {/* Price block */}
                  <div className={`rounded-2xl px-5 py-4 mb-6 ${plan.highlighted ? "bg-primary/5 border border-primary/10" : "bg-bgLight"}`}>
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-bold text-textDark">
                        ₹{plan.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-textLight mb-1">+ GST</span>
                    </div>
                  </div>

                  <div className="border-t border-borderLight mb-5" />

                  {/* Profiles */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-sm font-semibold text-primary">{plan.profiles}</span>
                  </div>

                  {/* Features */}
                  <ul className="flex-1 space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-textLight leading-snug">
                        <span className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 ${plan.highlighted ? "bg-primary/10" : "bg-bgLight"}`}>
                          <Check size={12} className="text-primary" strokeWidth={3} />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className={`cta-shimmer relative overflow-hidden w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200
                      ${plan.highlighted
                        ? "bg-primary hover:bg-primaryHover text-white shadow-[0_4px_14px_rgba(236,95,54,0.30)] hover:shadow-[0_6px_20px_rgba(236,95,54,0.40)] hover:-translate-y-0.5"
                        : "bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white"
                      }`}
                  >
                    Choose {plan.name} →
                  </button>
                </div>
              );
            })}
          </div>

          {/* Footer pill */}
          <div className="mt-16 flex justify-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-3 bg-white border border-borderLight rounded-full px-8 py-4 text-sm text-textLight shadow-sm">
              <span><strong className="text-textDark">Connect</strong> → We help you find</span>
              <span className="text-borderLight text-lg">•</span>
              <span><strong className="text-textDark">Care</strong> → We help you settle</span>
              <span className="text-borderLight text-lg">•</span>
              <span><strong className="text-textDark">Complete</strong> → We help you stay stress-free</span>
            </div>
          </div>
        </div>
      </section>

      <HeroWizard asModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}