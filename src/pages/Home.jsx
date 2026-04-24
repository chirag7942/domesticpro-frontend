import HeroWizard from "../components/HeroWizard";
import { lazy, Suspense, useEffect, useState } from "react";
import PricingSection from "../components/PricingSection";
import HowItWorks from "../components/HowItWorks";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Zap, Headphones, Check, ChevronDown } from "lucide-react";
import MatchedProfilesPreview from "../components/MatchedProfilesPreview";
import SEO from "../components/SEO";
import useScrollReveal from "../hooks/useScrollReveal";
const TestimonialsSection = lazy(() => import('../components/TestimonialCarousel'))

const WHY_CARDS = [
  {
    image: "https://res.cloudinary.com/dto7bji6b/image/upload/f_auto,w_100/v1774330222/unnamed_jn88vo.jpg",   // save your image here
    title: "Verified Staff",
    desc: "Every candidate undergoes strict background verification for your safety.",
  },
  {
    image: "https://res.cloudinary.com/dto7bji6b/image/upload/f_auto,w_100/v1774330704/clock_qplc39.webp",
    title: "Fast Hiring",
    desc: "Get suitable staff within 24–48 hours based on your requirements.",
  },
  {
    image: "https://res.cloudinary.com/dto7bji6b/image/upload/f_auto,w_100/v1774330769/New_housemaid_transition_in_home_setting_rdss8s.webp",
    title: "Substitute Guarantee",
    desc: "Replacement staff provided instantly if your regular staff is unavailable.",
  },
  {
    image: "https://res.cloudinary.com/dto7bji6b/image/upload/f_auto,w_100/v1774330874/ChatGPT_Image_Mar_24_2026_11_10_46_AM_hwbydu.webp",
    title: "Dedicated Support",
    desc: "Our team assists you throughout hiring and after placement.",
  },
];

const faqs = [
  { q: "Why should I hire through Domestic Pro instead of searching independently?", a: "Domestic Pro saves you time and uncertainty by shortlisting candidates that match your exact requirement. Instead of speaking with dozens of unsuitable profiles, you receive relevant candidates who are actively looking for work and ready to interview." },
  { q: "How soon can I receive profiles?", a: "Once the registration or commitment process is completed, Domestic Pro begins shortlisting immediately. Depending on the plan selected, clients typically receive profiles within 24 hours to 3–5 working days." },
  { q: "Can I speak to the candidate before finalizing?", a: "Yes. Clients can interview candidates over the phone or in person before making a decision. Many families also prefer arranging a trial day to ensure the candidate fits their household requirements." },
  { q: "What if the candidate does not work out?", a: "Domestic Pro provides replacement assistance within the replacement window mentioned in the selected plan, helping ensure clients eventually find a suitable match." },
  { q: "What kind of domestic staff can Domestic Pro help with?", a: "We assist with placements for Nannies / Babysitters, Female Cooks, All-Rounders (Cleaning + Kitchen support), Housekeepers, and 24-hour Live-in Staff." },
  { q: "How is the salary decided?", a: "Salary depends on experience, skills, working hours, and job responsibilities. Domestic Pro helps guide both sides toward a fair and market-appropriate salary range." },
  { q: "Why is a commitment or registration fee required?", a: "The commitment fee ensures that Domestic Pro dedicates resources to actively search, screen, and coordinate candidates for serious clients. It also helps prioritize your requirement and avoid unnecessary delays." },
  { q: "Is Domestic Pro responsible for the worker after placement?", a: "Domestic Pro acts as a placement service connecting clients with domestic workers. The employment relationship is directly between the client and the worker." },
  { q: "Can I hire a candidate immediately if I like them?", a: "Yes. Once both parties agree on salary, duties, and joining date, the placement can be finalized immediately and the candidate can join as mutually decided." },
  { q: "What is the first step to start the hiring process?", a: "Simply share your requirement with our team and complete the registration or commitment process. Our team will then begin shortlisting suitable candidates and coordinating interviews." },
];

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const [openIndexes, setOpenIndexes] = useState([]);
  const toggleFAQ = (i) => setOpenIndexes((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]);

  useScrollReveal();

  return (
    <>
      <SEO
        title="Hire Verified Live-In Domestic Helpers"
        description="DomesticPro connects families with verified, trained domestic helpers — nannies, cooks, drivers, and patient care. Fast hiring in Delhi-NCR, Mumbai, Bangalore."
        canonical="/"
        ogImage="https://domesticpro.in/hero-image.webp"
      />
      {/* ── HERO ── */}
      <section className="bg-bgLight">
        <div className="flex flex-wrap justify-center">
          {/* image  bg-[center_center] md:bg-[-94rem_center]*/}
          <div
            className="relative w-full h-[32vh] sm:h-[19vh] md:h-[39vh] lg:h-[38rem]"
          >
            <img
              src="/hero-image.webp"
              alt="Domestic Pro — Verified House Help"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              width={1440}
              height={608}
              className="absolute inset-0 w-full h-full object-center object-cover"
            />
            <div className="absolute lg:w-1/2 md:w-full top-0 lg:px-[4rem] px-4 pt-[3rem] pb-[2rem]">
              <div className="pt-4 hidden lg:block">
                <HeroWizard />
              </div>
              <h1 className="text-white text-3xl sm:text-4xl lg:hidden font-bold leading-tight mb-4">
                Hire Verified
                <span className="text-primary"> Domestic Professionals </span>
                instantly
              </h1>
              <p className="text-white text-sm sm:text-base lg:hidden opacity-90">
                Verified nanny, househelp, cooks and drivers. Fast hiring. Trusted professionals.
              </p>
            </div>
          </div>

          {/* tablet wizard */}
          <div className="w-full md:flex justify-center hidden lg:hidden">
            <HeroWizard />
          </div>

          {/* mobile wizard */}
          <div className="w-full mx-2 lg:hidden md:hidden">
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

          {/* features grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {WHY_CARDS.map(({ image, title, desc }) => (
              <div
                key={title}
                className="bg-bgLight border border-borderLight rounded-2xl p-6 text-center hover:border-primary hover:shadow-[0_8px_32px_rgba(236,95,54,0.10)] transition-all duration-300 group"
              >
                {/* image circle */}
                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 border-2 border-borderLight group-hover:border-primary transition-colors duration-300">
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-textDark text-base mb-2">{title}</h3>
                <p className="text-textLight text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* trust bar */}
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
              Hire Now   <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <PricingSection />

      <HowItWorks />

      <Suspense fallback={<div className="h-64 bg-bgLight animate-pulse rounded-2xl" />}>
        <TestimonialsSection />
      </Suspense>

      <MatchedProfilesPreview />

      {/* ── FAQ ── */}
      <section className="bg-bgLight py-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">
              Got Questions?
            </span>
            <h2 className="text-4xl font-bold text-textDark">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => {
              const isOpen = openIndexes.includes(i);
              return (
                <div key={i}
                  className={`faq-card bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? "border-primary shadow-[0_4px_20px_rgba(236,95,54,0.10)]" : "border-borderLight"}`}>
                  <button
                    onClick={() => toggleFAQ(i)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <div className="flex items-start gap-4">
                      <span className={`w-7 h-7 flex-shrink-0 rounded-lg flex items-center justify-center mt-0.5 transition-colors duration-200 ${isOpen ? "bg-primary" : "bg-primary/10"}`}>
                        <span className={`font-bold text-xs ${isOpen ? "text-white" : "text-primary"}`}>Q</span>
                      </span>
                      <h3 className="font-bold text-textDark leading-snug text-sm md:text-base">{faq.q}</h3>
                    </div>
                    <ChevronDown size={20} className={`transition-transform duration-300 text-primary flex-shrink-0 ml-4 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`transition-all duration-400 ease-in-out overflow-hidden ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                    <div className="px-6 pb-6 pl-[3.25rem]">
                      <p className="text-textLight text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
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
    </>
  );
}