// import ServiceCard from "../components/ServiceCard";
// import HeroForm from "../components/HeroForm";
import HeroWizard from "../components/HeroWizard";
import TestimonialCarousel from "../components/TestimonialCarousel";
import { useEffect, useState } from "react";
import PricingSection from "../components/PricingSection";
import HowItWorks from "../components/HowItWorks";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
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
    <div>
      {/* HERO SECTION */}
      <section className="bg-bgLight">
        <div className="flex flex-wrap justify-center">
          {/* LEFT SIDE → IMAGE WITH FLOATING FORM */}
          <div className="relative">
            {/* HERO IMAGE */}
            <img
              src="https://res.cloudinary.com/dhtzknkdr/image/upload/v1773031900/hero_wfmtrh.png"
              loading="eager"
              alt="Home Services"
              className="w-full shadow-sm"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent"></div>

            <div className="absolute lg:w-1/2 md:w-full top-0 lg:px-[4rem] px-4 py-8">
              {/* HERO TEXT */}
              <div className="h-full">
                <h1 className=" text-black text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
                  Hire Verified
                  <span className="text-primary"> Domestic Professionals </span>
                  instantly
                </h1>

                <p className="text-white text-sm sm:text-base opacity-90">
                  Verified nanny, househelp, cooks and drivers. Fast hiring.
                  Trusted professionals.
                </p>
              </div>

              {/* FLOATING FORM → DESKTOP ONLY absolute md:top-[22rem] md:left-[8rem] top-[85%] left-1/2 -translate-x-1/2 w-[92%] md:w-[380px] */}
              <div className="pt-4 hidden md:hidden lg:block">
                <HeroWizard />
              </div>
            </div>
          </div>

          <div className="w-full md:flex justify-center hidden lg:hidden">
            <HeroWizard />
          </div>

          {/* MOBILE FORM → BELOW IMAGE */}
          <div className="w-full mx-2 lg:hidden md:hidden">
            <HeroWizard />
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-white border-y border-borderLight">
        <div className="max-w-7xl mx-auto px-6 py-20 scroll-section">
          {/* Heading */}
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-textDark mb-3">
              Why Choose Domestic Pro
            </h2>

            <p className="text-textLight max-w-2xl mx-auto">
              We provide reliable, verified, and professional household staff
              with a seamless hiring experience.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* VERIFIED */}
            <div className="bg-bgLight rounded-2xl p-6 text-center hover:shadow-lg transition">
              <div className="w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-2xl mx-auto mb-4">
                ✓
              </div>

              <h3 className="font-semibold text-textDark text-lg mb-2">
                Verified Staff
              </h3>

              <p className="text-textLight text-sm">
                Every candidate undergoes strict background verification for
                your safety.
              </p>
            </div>

            {/* FAST HIRING */}
            <div className="bg-bgLight rounded-2xl p-6 text-center hover:shadow-lg transition">
              <div className="w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-2xl mx-auto mb-4">
                ⚡
              </div>

              <h3 className="font-semibold text-textDark text-lg mb-2">
                Fast Hiring
              </h3>

              <p className="text-textLight text-sm">
                Get suitable staff within 24–48 hours based on your
                requirements.
              </p>
            </div>

            {/* SUBSTITUTE GUARANTEE */}
            <div className="bg-bgLight rounded-2xl p-6 text-center hover:shadow-lg transition">
              <div className="w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-2xl mx-auto mb-4">
                🔄
              </div>

              <h3 className="font-semibold text-textDark text-lg mb-2">
                Substitute Guarantee
              </h3>

              <p className="text-textLight text-sm">
                Replacement staff provided instantly if your regular staff is
                unavailable.
              </p>
            </div>

            {/* TRUST & SUPPORT */}
            <div className="bg-bgLight rounded-2xl p-6 text-center hover:shadow-lg transition">
              <div className="w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-full text-2xl mx-auto mb-4">
                🤝
              </div>

              <h3 className="font-semibold text-textDark text-lg mb-2">
                Dedicated Support
              </h3>

              <p className="text-textLight text-sm">
                Our team assists you throughout hiring and after placement.
              </p>
            </div>
          </div>

          {/* EXTRA TRUST BAR */}
          <div className="mt-16 bg-bgLight rounded-2xl p-8 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <div>
              <h3 className="text-xl font-semibold text-textDark mb-1">
                Trusted by Families Across the City
              </h3>

              <p className="text-textLight text-sm">
                Reliable hiring platform for nanny, househelp, cooks, and
                drivers.
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-primary hover:bg-primaryHover text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              Hire Now
            </button>
          </div>
        </div>
      </section>

      <PricingSection />

      <HowItWorks />

      {/* TESTIMONIALS */}
      <section className="bg-bgLight">
        <div className="max-w-7xl mx-auto px-6 py-24 scroll-section">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-textDark mb-3">
              Trusted by Hundreds of Happy Families
            </h2>

            <p className="text-textLight">
              Real experiences from our valued customers
            </p>
          </div>

          <TestimonialCarousel />
        </div>
      </section>

      {/* IMPORTANT TERMS */}
      <section className="bg-white border-t border-borderLight">
        <div className="max-w-5xl mx-auto px-6 py-20 scroll-section">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
              🔐 Important Terms & Conditions
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-textDark mb-3">
              Please Read Before Booking
            </h2>

            <p className="text-textLight max-w-2xl mx-auto">
              Transparent service terms to ensure clarity, trust, and smooth
              hiring.
            </p>
          </div>

          <div className="bg-bgLight rounded-3xl p-8 md:p-10 shadow-sm space-y-6">
            {/* Term 1 */}
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <p className="text-textDark">
                <span className="font-semibold">
                  Advance payment is for service initiation only,
                </span>{" "}
                and does not guarantee placement. It allows us to begin the
                sourcing and verification process.
              </p>
            </div>

            {/* Term 2 */}
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <p className="text-textDark">
                <span className="font-semibold">
                  The balance amount is payable
                </span>{" "}
                once a suitable candidate is finalized and confirmed by the
                client.
              </p>
            </div>

            {/* Term 3 */}
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <p className="text-textDark">
                <span className="font-semibold">
                  Salary is paid directly by the client
                </span>{" "}
                to the domestic professional. We do not handle monthly salary
                transactions.
              </p>
            </div>

            {/* Term 4 */}
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <p className="text-textDark">
                <span className="font-semibold">
                  No cash refunds are provided.
                </span>{" "}
                Service continuity is maintained through replacements within the
                scope of your selected plan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-primary">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center text-white scroll-section">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Hire Trusted Help?
          </h2>

          <p className="mb-6 opacity-90">
            Get verified professionals within 24 hours
          </p>

          <button
            onClick={() => navigate("/contact")}
            className="bg-white text-primary px-8 py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            Contact Now
          </button>
        </div>
      </section>

      {/* REUSABLE HIRE MODAL */}
      <HeroWizard
        asModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
