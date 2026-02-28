import { useEffect } from "react";
import heroImage from "../assets/about-hero.jpg";
import whoImage from "../assets/who-we-are.png";
import missionImage from "../assets/mission.jpg";
import visionImage from "../assets/vision.avif";

export default function AboutUs() {
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
      {/* Hero Section */}
      <section
        className="relative h-[75vh] md:h-[85vh]
 flex items-center justify-center"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        ></div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/80"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-5 pt-1 max-w-4xl mx-auto">
          <p className="text-white text-sm md:text-base tracking-wider mb-4"></p>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Welcome to DomesticPro
          </h1>

          <p className="text-white/90 text-lg md:text-xl leading-relaxed">
            India’s trusted platform for verified, trained, and reliable 24-hour
            live-in domestic helpers. We connect households with skilled
            professionals, ensuring safety, dignity, and dependable support for
            every home.
          </p>
        </div>
      </section>

      {/* Who we Are Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center scroll-section">
          {/* Left Image */}
          <div className="relative">
            <img
              src={whoImage}
              alt="DomesticPro Team"
              className="rounded-2xl shadow-xl w-full object-cover"
            />
          </div>

          {/* Right Content */}
          <div>
            <h2 className="text-4xl font-bold text-heading mb-4">Who We Are</h2>

            <p className="text-primary font-semibold mb-4">
              Trusted 24-Hour Live-In Domestic Helper Platform
            </p>

            <p className="text-gray-600 mb-6 leading-relaxed">
              DomesticPro is a fast-growing household staffing platform
              dedicated to connecting families with verified, trained, and
              dependable domestic helpers across India. We focus on
              professionalism, transparency, and long-term reliability to ensure
              every home receives trusted support.
            </p>

            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-primary text-xl">✔</span>
                Background-Verified and Identity-Checked Domestic Helpers
              </li>

              <li className="flex items-start gap-3">
                <span className="text-primary text-xl">✔</span>
                Skilled in Home Management, Elder Care, Child Care & Cooking
              </li>

              <li className="flex items-start gap-3">
                <span className="text-primary text-xl">✔</span>
                Structured Screening and Careful Matching Process
              </li>

              <li className="flex items-start gap-3">
                <span className="text-primary text-xl">✔</span>
                Replacement Assistance for Continued Peace of Mind
              </li>

              <li className="flex items-start gap-3">
                <span className="text-primary text-xl">✔</span>
                Dedicated Support Team for Ongoing Client Assistance
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Difference Section */}
      <section className="py-24 bg-bglight">
        <div className="max-w-7xl mx-auto px-6 scroll-section">
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Difference Between Other Agencies & DomesticPro
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See why thousands of families trust DomesticPro for reliable and
              verified domestic helpers.
            </p>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-2 gap-10">
            {/* Other Agencies */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                Other Maid Agencies
              </h3>

              <ul className="space-y-4 text-gray-700">
                <li className="flex gap-3">
                  <span className="text-red-500 text-xl">✖</span>
                  Not properly registered or traceable
                </li>

                <li className="flex gap-3">
                  <span className="text-red-500 text-xl">✖</span>
                  Advance payment required before service
                </li>

                <li className="flex gap-3">
                  <span className="text-red-500 text-xl">✖</span>
                  Small database of limited helpers
                </li>

                <li className="flex gap-3">
                  <span className="text-red-500 text-xl">✖</span>
                  Renewal charges after 1 year
                </li>

                <li className="flex gap-3">
                  <span className="text-red-500 text-xl">✖</span>
                  No guaranteed replacement support
                </li>

                <li className="flex gap-3">
                  <span className="text-red-500 text-xl">✖</span>
                  Weak or fake background verification
                </li>

                <li className="flex gap-3">
                  <span className="text-red-500 text-xl">✖</span>
                  Operated by small unstructured teams
                </li>
              </ul>
            </div>

            {/* DomesticPro */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                DomesticPro
              </h3>

              <ul className="space-y-4 text-gray-700">
                <li className="flex gap-3">
                  <span className="text-green-600 text-xl">✔</span>
                  Professionally registered and trusted platform
                </li>

                <li className="flex gap-3">
                  <span className="text-green-600 text-xl">✔</span>
                  No advance payment — Pay after finalization
                </li>

                <li className="flex gap-3">
                  <span className="text-green-600 text-xl">✔</span>
                  Large and growing verified helper database
                </li>

                <li className="flex gap-3">
                  <span className="text-green-600 text-xl">✔</span>
                  No hidden or renewal charges
                </li>

                <li className="flex gap-3">
                  <span className="text-green-600 text-xl">✔</span>
                  Immediate replacement support
                </li>

                <li className="flex gap-3">
                  <span className="text-green-600 text-xl">✔</span>
                  Proper document & identity verification
                </li>

                <li className="flex gap-3">
                  <span className="text-green-600 text-xl">✔</span>
                  Dedicated professional support team
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}

      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 scroll-section">
          {/* Page Title */}
          <div className="mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Our Mission <br /> & Vision
            </h2>
            <div className="flex gap-1 mt-4">
              <div className="w-16 h-1 bg-primary"></div>
              <div className="w-16 h-1 bg-textDark"></div>
            </div>
          </div>

          <div className="flex flex-col gap-16">
            {/* Mission Row */}
            <div className="relative flex flex-col md:flex-row items-center">
              {/* Mission Image */}
              <div className="relative z-20 w-64 h-64 md:w-80 md:h-80 flex-shrink-0 -mb-10 md:mb-0 md:-mr-16">
                <div className="relative w-full h-full rounded-full border-[12px] border-white shadow-xl overflow-hidden bg-white">
                  <img
                    src={missionImage}
                    alt="Mission"
                    className="w-full h-full object-cover grayscale"
                  />

                  <div
                    className="absolute inset-0 opacity-0 mix-blend-multiply"
                    style={{ backgroundColor: "#EC5F36" }}
                  ></div>
                </div>
              </div>

              {/* Updated Background Color Here */}
              <div className="relative z-10 bg-bgLight py-12 pl-12 pr-12 md:pl-24 md:pr-20 w-full rounded-r-full shadow-sm">
                <h3 className="text-3xl font-bold text-textDark mb-4">
                  Mission
                </h3>
                <p className="text-textLight text-lg leading-relaxed max-w-xl">
                  To provide trusted, verified, and professionally trained
                  domestic helpers to families across India while ensuring
                  dignity, fair opportunities, and long-term reliability for our
                  workforce. We aim to simplify household staffing with
                  transparency and care.
                </p>
              </div>
            </div>

            {/* Vision Row */}
            <div className="relative flex flex-col md:flex-row-reverse items-center">
              {/* Vision Image */}
              <div className="relative z-20 w-64 h-64 md:w-80 md:h-80 flex-shrink-0 -mb-10 md:mb-0 md:-ml-16">
                <div className="w-full h-full rounded-full border-[12px] border-white shadow-xl overflow-hidden">
                  <img
                    src={visionImage}
                    alt="Vision"
                    className="w-full h-full object-cover grayscale sepia-[.2] hue-rotate-[60deg] saturate-200"
                  />
                </div>
              </div>

              {/* Updated Background Color Here */}
              <div className="relative z-10 bg-bgLight py-12 pr-12 pl-12 md:pr-24 md:pl-20 w-full rounded-l-full shadow-sm text-right flex flex-col items-end">
                <h3 className="text-3xl font-bold text-textDark mb-4">
                  Vision
                </h3>
                <p className="text-textLight text-lg leading-relaxed max-w-xl">
                  To become India’s most reliable and respected domestic
                  staffing platform by building a structured ecosystem where
                  households feel secure and domestic professionals receive
                  recognition, stability, and growth opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
