import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldHalved, faStar, faHandshake, faHeart, faHouse, faBaby, faBed, faUserNurse, faUtensils, faCircleCheck, faClock, faArrowsRotate, faCheck, faUmbrellaBeach, faSun, faMountain, faCar, faGlobe, faEnvelope, faPhone, faLeaf,
  faAward,
  faHandHoldingHand,
  faHandHoldingHeart,
  faPersonBreastfeeding
} from "@fortawesome/free-solid-svg-icons";

export default function AboutUs() {
  useEffect(() => {
    const sections = document.querySelectorAll(".scroll-section");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("show")),
      { threshold: 0.15 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => sections.forEach((s) => observer.unobserve(s));
  }, []);

  const WHO_WE_ARE = [
    "Background-Verified and Identity-Checked Domestic Helpers",
    "Skilled in Live-In Support, Patient Care, Child Care & Cooking",
    "Structured Screening and Careful Matching Process",
    "Replacement Assistance for Continued Peace of Mind",
    "Dedicated Support Team for Ongoing Client Assistance",
  ];

  const CORE_VALUES = [
    { image: "https://res.cloudinary.com/dto7bji6b/image/upload/v1774416765/trust_and_safety__about_yk2ijo.png", title: "Trust & Safety", desc: "Security comes first with police-verified and background-checked maids." },
    { image: "https://res.cloudinary.com/dto7bji6b/image/upload/v1774417914/professional-excellence_about_cxyxxb.png", title: "Professional Excellence", desc: "Delivering trained and skilled domestic helpers for all needs." },
    { image: "https://res.cloudinary.com/dto7bji6b/image/upload/v1774419096/customer-centricity_about_cqcbgg.png", title: "Customer-Centricity", desc: "Every service is tailored to your family's lifestyle and requirements." },
    { image: "https://res.cloudinary.com/dto7bji6b/image/upload/v1774418953/customer-centricity_about_hbxmay.png", title: "Compassion & Care", desc: "Beyond work, we bring kindness, respect, and empathy to your home." },
  ];

  const SERVICES = [
    { icon: faHouse, title: "Live-In Support", desc: "Full household support including cleaning, laundry, and daily chores." },
    { icon: faBaby, title: "Baby Caretaker", desc: "Professional nannies for infants, toddlers, and young children." },
    { icon: faPersonBreastfeeding, title: "Japa", desc: "Complete mother and child care right at your doorstep, offering round-the-clock support during the crucial postpartum phase" },
    { icon: faUtensils, title: "Cooking Help", desc: "Dedicated cooks for hygienic, home-style meals." },
    { icon: faUserNurse, title: "Patient Care", desc: "Compassionate care for elderly or recovering patients." },
    { icon: faCar, title: "Drivers", desc: "Experienced and reliable drivers for daily commuting, school drops, office travel, and family outings." },
  ];

  const WHY_US = [
    { icon: faCircleCheck, title: "Verified & Reliable", desc: "Police-verified, background-checked helpers with complete transparency." },
    { icon: faClock, title: "Quick Deployment", desc: "Get help within 2–4 working days with our efficient process." },
    { icon: faArrowsRotate, title: "Guaranteed Replacement", desc: "Free replacements if the helper doesn't meet your expectations." },
  ];

  const SERVICE_AREAS = [
    { region: "India", icon: faMountain, cities: ["Delhi-NCR", "Mumbai", "Bangalore", "Hyderabad", "Pune", "Chennai"] },
    { region: "Gulf & Middle East", icon: faSun, cities: ["Dubai", "Abu Dhabi", "Riyadh", "Doha", "Kuwait City", "Muscat"] },
    { region: "Southeast Asia", icon: faLeaf, cities: ["Singapore", "Hong Kong", "Kuala Lumpur"] },
    { region: "UK & North America", icon: faUmbrellaBeach, cities: ["London", "New York", "Toronto", "New Jersey"] },
  ];

  const FOUNDER_MISSION = [
    "Provide families with dependable, verified, and suitable household support",
    "Ensure domestic workers are placed in respectful, safe, and fair-paying homes",
    "Keep services accessible — starting at ₹11,000, unlike brokers who charge ₹25,000–₹30,000+",
  ];

  return (
    <div>

      {/* ── HERO ── */}
      <section className="relative h-[75vh] md:h-[85vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://res.cloudinary.com/dto7bji6b/image/upload/v1774413666/about_hero_nibkui.png)` }} />
        <div className="absolute inset-0 bg-black/80" />
        <div className="relative z-10 text-center px-5 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Welcome to{" "}
            <em className="not-italic text-primary">Domestic Pro</em>
          </h1>
          <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            India's trusted platform for verified, trained, and reliable 24-hour
            live-in domestic helpers. We connect households with skilled
            professionals, ensuring safety, dignity, and dependable support for
            every home.
          </p>
        </div>
      </section>

      {/* ── WHO WE ARE ── */}
      <section className="py-24 bg-bgLight border-b border-borderLight">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center scroll-section">
          <div className="relative">
            <img
              src="https://res.cloudinary.com/dhtzknkdr/image/upload/v1773031915/who-we-are_eqmnrq.avif"
              alt="DomesticPro Team"
              className="rounded-2xl shadow-xl w-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-textDark mb-3">Who We Are</h2>
            <p className="text-primary font-bold text-sm mb-5 uppercase tracking-wider">
              Trusted 24-Hour Live-In Domestic Helper Platform
            </p>
            <p className="text-textLight leading-relaxed mb-7">
              DomesticPro is a fast-growing household staffing platform dedicated to connecting
              families with verified, trained, and dependable domestic helpers across India. We
              focus on professionalism, transparency, and long-term reliability to ensure every
              home receives trusted support.
            </p>
            <ul className="space-y-3">
              {WHO_WE_ARE.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-textLight group">
                  <span className="w-5 h-5 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary transition-colors duration-200">
                    <FontAwesomeIcon icon={faCheck} className="text-primary group-hover:text-white transition-colors duration-200" style={{ fontSize: 10 }} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ── */}
      <section className="py-24 bg-white border-b border-borderLight">
        <div className="max-w-7xl mx-auto px-6 scroll-section">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-textDark mb-4">Our Core Values</h2>
            <p className="text-textLight max-w-xl mx-auto">The foundation of everything we do at Domestic Pro.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CORE_VALUES.map(({ image, title, desc }) => (
              <div key={title} className="group bg-bgLight rounded-2xl p-8 border border-borderLight hover:border-primary hover:shadow-[0_8px_32px_rgba(236,95,54,0.10)] transition-all duration-300 text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <img src={image} alt={title} className="w-20 h-20 object-cover rounded-full" />
                </div>
                <h3 className="text-lg font-bold text-textDark mb-3">{title}</h3>
                <p className="text-sm text-textLight leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR SERVICES ── */}
      <section className="py-24 bg-bgLight border-b border-borderLight">
        <div className="max-w-7xl mx-auto px-6 scroll-section">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-textDark mb-4">Our Services</h2>
            <p className="text-textLight max-w-2xl mx-auto">
              A complete range of domestic help services designed for modern households and diverse requirements.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map(({ icon, title, desc }) => (
              <div key={title} className="group bg-white rounded-2xl p-8 border border-borderLight hover:border-primary hover:shadow-[0_8px_32px_rgba(236,95,54,0.10)] transition-all duration-300">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                  <FontAwesomeIcon icon={icon} className="text-primary" style={{ fontSize: "3rem" }} />
                </div>
                <h3 className="text-lg font-bold text-textDark mb-2">{title}</h3>
                <p className="text-sm text-textLight leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY FAMILIES TRUST US ── */}
      <section className="py-24 bg-bgLight border-t border-borderLight">
        <div className="max-w-7xl mx-auto px-6 scroll-section">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-textDark mb-4">Why Families Trust Us</h2>
            <p className="text-textLight max-w-xl mx-auto">The Domestic Pro difference that keeps families coming back.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {WHY_US.map(({ icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-10 border border-borderLight text-center hover:border-primary hover:shadow-[0_8px_32px_rgba(236,95,54,0.10)] transition-all duration-300 group">
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FontAwesomeIcon icon={icon} style={{ fontSize: "3rem", color: "#fff" }} />
                </div>
                <h3 className="text-lg font-bold text-textDark mb-3">{title}</h3>
                <p className="text-sm text-textLight leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICE AREAS ── */}
      <section className="py-24 bg-white border-t border-borderLight">
        <div className="max-w-7xl mx-auto px-6 scroll-section">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-textDark mb-4">Our Service Areas</h2>
            <p className="text-textLight max-w-2xl mx-auto">
              Serving families across India and internationally with trusted domestic help services.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {SERVICE_AREAS.map(({ region, icon, cities }) => (
              <div key={region} className="bg-white rounded-2xl p-6 border border-borderLight hover:border-primary transition-colors duration-300 border-t-4 border-t-primary">
                <h3 className="font-bold text-textDark text-base mb-5 flex items-center gap-2">
                  <FontAwesomeIcon icon={icon} className="text-primary" style={{ fontSize: 16 }} /> {region}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cities.map((city) => (
                    <span key={city} className="text-xs font-semibold text-textLight bg-bgLight border border-borderLight rounded-full px-3 py-1">
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="bg-[#FAFAF0] border border-[#E8E8D0] rounded-xl p-6 border-l-4 border-l-primary text-center">
            <p className="font-bold text-textDark text-lg mb-2">🚀 Expanding Rapidly!</p>
            <p className="text-sm text-textLight">
              We're continuously expanding our services to new cities. Don't see your city listed?{" "}
              <a href="/contact" className="text-primary font-semibold hover:underline">Contact us</a>
              {" "}to find out when we're coming to your area!
            </p>
          </div>
        </div>
      </section>

      {/* ── FOUNDER'S MESSAGE ── */}
      <section className="py-24 bg-bgLight border-t border-borderLight">
        <div className="max-w-7xl mx-auto px-6 scroll-section">

          {/* Section heading — matches site pattern */}
          <div className="text-center mb-16">
            <span className="inline-block bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">
              ✍️ Founder's Message
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-textDark mb-4">
              The Story Behind Domestic Pro
            </h2>
            <p className="text-textLight max-w-xl mx-auto">
              Built from lived experience, designed for every home.
            </p>
          </div>

          {/* Two-column layout — mirrors "Who We Are" pattern */}
          <div className="grid lg:grid-cols-[360px_1fr] gap-14 items-start">

            {/* LEFT — founder identity card, sticky on scroll */}
            <div className="lg:sticky lg:top-28 self-start">
              <div className="bg-white rounded-2xl border border-borderLight p-8 hover:border-primary hover:shadow-[0_8px_32px_rgba(236,95,54,0.10)] transition-all duration-300">

                {/* Founder photo */}
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-borderLight mb-5">
                  <img
                    src="https://res.cloudinary.com/dhtzknkdr/image/upload/v1773031893/about-hero_zhrrxa.webp"
                    alt="Founder, Domestic Pro"
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-xl font-bold text-textDark mb-1" style={{ fontFamily: "'Fraunces', serif" }}>
                  Gunjan Kapoor
                </h3>
                <p className="text-primary font-bold text-sm uppercase tracking-wider mb-5">
                  Domestic Pro
                </p>

                <div className="h-px bg-borderLight mb-6" />

                {/* Stats — same style used across the site */}
                <div className="space-y-5 mb-6">
                  {[
                    { value: "20+", label: "Years combined in the services industry" },
                    { value: "2021", label: "Founded in Gurgaon" },
                    { value: "₹11K", label: "Transparent starting price" },
                  ].map(({ value, label }) => (
                    <div key={label}>
                      <p className="text-2xl font-bold text-textDark leading-none mb-1" style={{ fontFamily: "'Fraunces', serif" }}>
                        {value}
                      </p>
                      <p className="text-xs text-textLight font-medium leading-snug">{label}</p>
                    </div>
                  ))}
                </div>

                <div className="h-px bg-borderLight mb-5" />

                {/* Origin tag */}
                <div className="flex items-start gap-3 text-sm text-textLight">
                  <span className="w-5 h-5 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FontAwesomeIcon icon={faHeart} className="text-primary" style={{ fontSize: 9 }} />
                  </span>
                  Rooted in Siliguri, building for every home in India
                </div>
              </div>
            </div>

            {/* RIGHT — letter body */}
            <div>

              {/* Opening blockquote — pull quote */}
              <blockquote className="mb-8 pl-5 border-l-4 border-primary">
                <p className="text-xl md:text-2xl font-bold text-textDark leading-snug" style={{ fontFamily: "'Fraunces', serif" }}>
                  "Domestic Pro was not born out of a business idea — it was born out of a very real, very personal struggle."
                </p>
              </blockquote>

              {/* Body copy */}
              <div className="space-y-5 text-textLight text-base leading-relaxed mb-8">
                <p>
                  In 2021, when I became a mother, I experienced firsthand how challenging it is to find the right household
                  support. The first two months were overwhelming, filled with uncertainty and constant adjustments. Then came
                  someone who changed everything — reliable, sincere, and committed. She stayed with us for{" "}
                  <span className="font-semibold text-textDark">four and a half years</span> and became an integral part of our home.
                </p>
                <p>
                  When she had to leave due to a personal family situation — despite giving me three months' notice — I suddenly
                  found myself in the same difficult position many others face. Despite multiple trials over several months,
                  I couldn't find the right fit. In a span of six months, I went through{" "}
                  <span className="font-semibold text-textDark">nearly ten changes</span>. It was exhausting, emotionally draining,
                  and deeply unsettling.
                </p>
                <p>
                  Through all of this, my husband <span className="font-semibold text-textDark">Nakul</span> stood by me as a
                  constant support. As he witnessed these challenges unfold, he realized this wasn't just our personal struggle —
                  it was something countless families must be going through every day. Together, we began to see this not as an
                  isolated issue, but as a larger gap that needed to be addressed.
                </p>
                <p>
                  Both of us come with over 20 years of experience in the services industry. Client servicing, understanding
                  people's needs, and managing operational complexities have been at the core of our professional journeys —
                  giving us the confidence to build something meaningful in a space that deeply needed structure, reliability,
                  and empathy.
                </p>
              </div>

              {/* Mission highlight card — matches the checklist pattern used in "Who We Are" */}
              <div className="bg-white rounded-2xl border border-borderLight p-6 mb-8 hover:border-primary hover:shadow-[0_8px_32px_rgba(236,95,54,0.10)] transition-all duration-300">
                <p className="text-primary font-bold text-xs uppercase tracking-widest mb-5">
                  Our Clear Intention
                </p>
                <ul className="space-y-3">
                  {FOUNDER_MISSION.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-textLight group">
                      <span className="w-5 h-5 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary transition-colors duration-200">
                        <FontAwesomeIcon icon={faCheck} className="text-primary group-hover:text-white transition-colors duration-200" style={{ fontSize: 9 }} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Closing paragraphs */}
              <div className="space-y-5 text-textLight text-base leading-relaxed mb-10">
                <p>
                  Starting from Gurgaon, we began building Domestic Pro with a simple yet meaningful vision — to create a
                  reliable bridge between households and domestic workers, built on trust, fairness, and respect. Coming from
                  Siliguri, with roots in the Northeast, I leveraged my personal networks to build a dependable database of
                  domestic workers. The idea was simple —{" "}
                  <span className="font-semibold text-textDark">start small, stay honest, and solve a real problem.</span>
                </p>
                <p>
                  This is not just a service — it's a commitment to improving lives on both sides of the equation. As we grow,
                  our focus remains clear: steady, thoughtful growth with strong foundations of trust, integrity, and accountability.
                </p>
                <p className="italic text-textDark font-medium">
                  Because at the heart of every home is the support system that keeps it running — and that support deserves
                  to be reliable, respected, and right.
                </p>
              </div>

              {/* Signature block */}
              <div className="pt-8 border-t border-borderLight flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm" style={{ fontFamily: "'Fraunces', serif" }}>DP</span>
                </div>
                <div>
                  <p className="font-bold text-textDark text-base" style={{ fontFamily: "'Fraunces', serif" }}>Warmly,</p>
                  <p className="text-sm text-textLight">Gunjan Kapoor, Domestic Pro</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="bg-primary px-6 py-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
              Ready to Experience the Domestic Pro Difference?
            </h2>
            <p className="text-white/80 text-sm md:text-base">
              Join thousands of satisfied families who trust us for their domestic help needs.
            </p>
          </div>
          <a
            href="/contact"
            className="flex-shrink-0 bg-textDark text-white font-bold text-sm md:text-base px-8 py-4 rounded-xl hover:bg-black transition-colors duration-200 whitespace-nowrap"
          >
            Contact Us Today
          </a>
        </div>
      </section>

    </div>
  );
}