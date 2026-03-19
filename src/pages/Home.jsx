import HeroWizard from "../components/HeroWizard";
import TestimonialCarousel from "../components/TestimonialCarousel";
import { useEffect, useState } from "react";
import PricingSection from "../components/PricingSection";
import HowItWorks from "../components/HowItWorks";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Zap, RefreshCw, Headphones, ArrowRight, Check } from "lucide-react";

const WHY_CARDS = [
  {
    icon: ShieldCheck,
    title: "Verified Staff",
    desc: "Every candidate undergoes strict background verification for your safety.",
  },
  {
    icon: Zap,
    title: "Fast Hiring",
    desc: "Get suitable staff within 24–48 hours based on your requirements.",
  },
  {
    icon: RefreshCw,
    title: "Substitute Guarantee",
    desc: "Replacement staff provided instantly if your regular staff is unavailable.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    desc: "Our team assists you throughout hiring and after placement.",
  },
];

const TERMS = [
  {
    text: (
      <>
        <strong className="text-textDark">Advance payment is for service initiation only,</strong>{" "}
        and does not guarantee placement. It allows us to begin the sourcing and verification process.
      </>
    ),
  },
  {
    text: (
      <>
        <strong className="text-textDark">The balance amount is payable</strong>{" "}
        once a suitable candidate is finalized and confirmed by the client.
      </>
    ),
  },
  {
    text: (
      <>
        <strong className="text-textDark">Salary is paid directly by the client</strong>{" "}
        to the domestic professional. We do not handle monthly salary transactions.
      </>
    ),
  },
  {
    text: (
      <>
        <strong className="text-textDark">No cash refunds are provided.</strong>{" "}
        Service continuity is maintained through replacements within the scope of your selected plan.
      </>
    ),
  },
];

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

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
    <div>
      {/* ── HERO ── */}
      <section className="bg-bgLight">
        <div className="flex flex-wrap justify-center">

          <div className="relative w-full">
            <img
              src="https://res.cloudinary.com/dhtzknkdr/image/upload/v1773031900/hero_wfmtrh.png"
              loading="eager"
              alt="Home Services"
              className="w-full shadow-sm block"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />

            <div className="absolute inset-y-0 left-0 lg:w-[68%] md:w-full lg:px-[4rem] px-4 py-6 flex flex-col overflow-hidden">

              <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-3">
                Hire Verified
                <span className="text-primary"> Domestic Professionals </span>
                instantly
              </h1>
              <p className="text-white text-sm sm:text-base opacity-90 mb-0">
                Verified nanny, househelp, cooks and drivers. Fast hiring. Trusted professionals.
              </p>
              <div className="pt-3 hidden lg:flex flex-col flex-1 min-h-0 max-w-[32rem]">
                <HeroWizard />
              </div>
            </div>
          </div>

          {/* tablet wizard — shown below the image on md screens */}
          <div className="w-full md:flex justify-center hidden lg:hidden">
            <HeroWizard />
          </div>

          {/* mobile wizard */}
          <div className="w-full h-[32rem] mx-2 lg:hidden md:hidden">
            <HeroWizard />
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="bg-white border-y border-borderLight">
        <div className="max-w-7xl mx-auto px-6 py-20 scroll-section">

          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-textDark mb-3">
              Why Choose Domestic Pro
            </h2>
            <p className="text-textLight max-w-2xl mx-auto">
              We provide reliable, verified, and professional household staff with a seamless hiring experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {WHY_CARDS.map(({ icon: Icon, title, desc }) => (
              <div key={title}
                className="bg-bgLight border border-borderLight rounded-2xl p-6 text-center hover:border-primary hover:shadow-[0_8px_32px_rgba(236,95,54,0.10)] transition-all duration-300 group">
                <div className="w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full mx-auto mb-4 group-hover:bg-primary transition-colors duration-300">
                  <Icon size={22} className="text-primary group-hover:text-white transition-colors duration-300" strokeWidth={2} />
                </div>
                <h3 className="font-bold text-textDark text-base mb-2">{title}</h3>
                <p className="text-textLight text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 bg-bgLight border border-borderLight rounded-2xl p-8 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <div>
              <h3 className="text-lg font-bold text-textDark mb-1">
                Trusted by Families Across the City
              </h3>
              <p className="text-textLight text-sm">
                Reliable hiring platform for nanny, househelp, cooks, and drivers.
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-primary hover:bg-primaryHover text-white px-6 py-3 rounded-xl font-bold transition-all duration-200 shadow-[0_4px_14px_rgba(236,95,54,0.30)] hover:shadow-[0_6px_20px_rgba(236,95,54,0.40)] hover:-translate-y-0.5 whitespace-nowrap flex items-center gap-2"
            >
              Hire Now <ArrowRight size={15} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </section>

      <PricingSection />

      <HowItWorks />

      {/* ── TESTIMONIALS ── */}
      <TestimonialCarousel />

      {/* ── IMPORTANT TERMS ── */}
      <section className="bg-white border-t border-borderLight">
        <div className="max-w-5xl mx-auto px-6 py-20 scroll-section">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-textDark mb-3">
              Please Read Before Booking
            </h2>
            <p className="text-textLight max-w-2xl mx-auto">
              Transparent service terms to ensure clarity, trust, and smooth hiring.
            </p>
          </div>

          <div className="bg-bgLight border border-borderLight rounded-3xl p-8 md:p-10 space-y-5">
            {TERMS.map((term, i) => (
              <div key={i} className="flex gap-4 items-start group">
                <div className="w-9 h-9 bg-primary/10 border border-primary/20 text-primary rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors duration-200">
                  {i + 1}
                </div>
                <p className="text-sm text-textLight leading-relaxed pt-1.5">{term.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "linear-gradient(135deg, #EC5F36 0%, #C94520 100%)" }}>
        <div className="max-w-7xl mx-auto px-6 py-16 text-center text-white scroll-section">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Ready to Hire Trusted Help?
          </h2>
          <p className="mb-8 text-white/85 text-lg">
            Get verified professionals within 24 hours
          </p>
          <button
            onClick={() => navigate("/contact")}
            className="bg-white text-primary px-8 py-3.5 rounded-xl font-bold hover:bg-bgLight transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 text-sm"
          >
            Contact Now →
          </button>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-white/70 text-sm">
            {["Verified Professionals", "Police-Checked Staff", "Dedicated Support", "Replacement Guaranteed"].map((t) => (
              <span key={t} className="flex items-center gap-2">
                <Check size={13} className="text-white/60" strokeWidth={3} />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <HeroWizard asModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}