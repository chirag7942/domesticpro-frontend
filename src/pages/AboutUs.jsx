import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldHalved, faStar, faHandshake, faHeart, faHouse, faBaby, faBed, faUserNurse, faUtensils, faCircleCheck, faClock, faArrowsRotate, faCheck, faUmbrellaBeach, faSun, faMountain, faCar, faGlobe, faEnvelope, faPhone, faLeaf
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
    "Skilled in Home Management, Elder Care, Child Care & Cooking",
    "Structured Screening and Careful Matching Process",
    "Replacement Assistance for Continued Peace of Mind",
    "Dedicated Support Team for Ongoing Client Assistance",
  ];

  const OTHERS = [
    "Not properly registered or traceable",
    "Advance payment required before service",
    "Small database of limited helpers",
    "Renewal charges after 1 year",
    "No guaranteed replacement support",
    "Weak or fake background verification",
    "Operated by small unstructured teams",
  ];

  const DOMESTIC_PRO = [
    "Professionally registered and trusted platform",
    "No advance payment — Pay after finalization",
    "Large and growing verified helper database",
    "No hidden or renewal charges",
    "Immediate replacement support",
    "Proper document & identity verification",
    "Dedicated professional support team",
  ];

  const CORE_VALUES = [
    { icon: faShieldHalved, title: "Trust & Safety", desc: "Security comes first with police-verified and background-checked maids." },
    { icon: faStar, title: "Professional Excellence", desc: "Delivering trained and skilled domestic helpers for all needs." },
    { icon: faHandshake, title: "Customer-Centricity", desc: "Every service is tailored to your family's lifestyle and requirements." },
    { icon: faHeart, title: "Compassion & Care", desc: "Beyond work, we bring kindness, respect, and empathy to your home." },
  ];

  const SERVICES = [
    { icon: faHouse, title: "House Help", desc: "Full household support including cleaning, laundry, and daily chores." },
    { icon: faBaby, title: "Babysitter", desc: "Professional nannies for infants, toddlers, and young children." },
    { icon: faUtensils, title: "Cook", desc: "Dedicated cooks for hygienic, home-style meals." },
    { icon: faUserNurse, title: "Elderly Care", desc: "Compassionate care for elderly or recovering patients." },
    { icon: faCar, title: "Driver", desc: "Experienced and reliable drivers for daily commuting, school drops, office travel, and family outings." },
    { icon: faBed, title: "House Manager", desc: "24x7 assistance for all household management needs." },
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

  return (
    <div>

      {/* ── HERO ── */}
      <section className="relative h-[75vh] md:h-[85vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://res.cloudinary.com/dhtzknkdr/image/upload/v1773031893/about-hero_zhrrxa.webp)` }} />
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
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl bg-primary/10 border-2 border-primary/20 -z-10" />
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

      {/* ── CORE VALUES — centered large circle icon matching Maidvy ── */}
      <section className="py-24 bg-white border-b border-borderLight">
        <div className="max-w-7xl mx-auto px-6 scroll-section">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-textDark mb-4">Our Core Values</h2>
            <p className="text-textLight max-w-xl mx-auto">The foundation of everything we do at Domestic Pro.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CORE_VALUES.map(({ icon, title, desc }) => (
              <div key={title} className="group bg-bgLight rounded-2xl p-8 border border-borderLight hover:border-primary hover:shadow-[0_8px_32px_rgba(236,95,54,0.10)] transition-all duration-300 text-center">
                {/* large circle icon — matches Maidvy's card style */}
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary transition-colors duration-300">
                  <FontAwesomeIcon icon={icon} className="text-primary group-hover:text-white transition-colors duration-300" style={{ fontSize: 28 }} />
                </div>
                <h3 className="text-lg font-bold text-textDark mb-3">{title}</h3>
                <p className="text-sm text-textLight leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR SERVICES — circle icon top-left matching Maidvy ── */}
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
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                  <FontAwesomeIcon icon={icon} className="text-primary" style={{ fontSize: 26 }} />
                </div>
                <h3 className="text-lg font-bold text-textDark mb-2">{title}</h3>
                <p className="text-sm text-textLight leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON ── */}
      {/* <section className="py-24 bg-white border-b border-borderLight">
        <div className="max-w-7xl mx-auto px-6 scroll-section">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold text-textDark mb-4">Us vs. Other Agencies</h2>
            <p className="text-textLight max-w-2xl mx-auto">
              See why thousands of families trust DomesticPro for reliable and verified domestic helpers.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-bgLight rounded-2xl p-8 border border-borderLight">
              <h3 className="text-xl font-bold text-textDark mb-2 text-center">Other Maid Agencies</h3>
              <div className="w-10 h-0.5 bg-borderLight rounded-full mx-auto mb-6" />
              <ul className="space-y-3">
                {OTHERS.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-textLight">
                    <span className="w-5 h-5 rounded-md bg-red-50 border border-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FontAwesomeIcon icon={faXmark} className="text-red-400" style={{ fontSize: 11 }} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-8 border-2 border-primary shadow-[0_8px_40px_rgba(236,95,54,0.12)]">
              <div className="flex items-center justify-center gap-2 mb-2">
                <h3 className="text-xl font-bold text-textDark text-center">Domestic Pro</h3>
                <span className="text-xs bg-primary text-white font-bold px-2 py-0.5 rounded-full">Recommended</span>
              </div>
              <div className="w-10 h-0.5 bg-primary rounded-full mx-auto mb-6" />
              <ul className="space-y-3">
                {DOMESTIC_PRO.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-textLight">
                    <span className="w-5 h-5 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FontAwesomeIcon icon={faCheck} className="text-primary" style={{ fontSize: 10 }} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section> */}

      {/* ── MISSION & VISION ── */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 scroll-section">
          <div className="mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Our Mission <br /> & Vision
            </h2>
            <div className="flex gap-1 mt-4">
              <div className="w-16 h-1 bg-primary" />
              <div className="w-16 h-1 bg-textDark" />
            </div>
          </div>
          <div className="flex flex-col gap-16">
            <div className="relative flex flex-col md:flex-row items-center">
              <div className="relative z-20 w-64 h-64 md:w-80 md:h-80 flex-shrink-0 -mb-10 md:mb-0 md:-mr-16">
                <div className="relative w-full h-full rounded-full border-[12px] border-white shadow-xl overflow-hidden bg-white">
                  <img
                    src="https://res.cloudinary.com/dhtzknkdr/image/upload/v1773031902/mission_vds4rn.jpg"
                    alt="Mission"
                    className="w-full h-full object-cover grayscale"
                  />
                  <div className="absolute inset-0 opacity-0 mix-blend-multiply" style={{ backgroundColor: "#EC5F36" }} />
                </div>
              </div>
              <div className="relative z-10 bg-bgLight py-12 pl-12 pr-12 md:pl-24 md:pr-20 w-full rounded-r-full shadow-sm">
                <h3 className="text-3xl font-bold text-textDark mb-4">Mission</h3>
                <p className="text-textLight text-lg leading-relaxed max-w-xl">
                  To provide trusted, verified, and professionally trained domestic helpers to families across India
                  while ensuring dignity, fair opportunities, and long-term reliability for our workforce. We aim to
                  simplify household staffing with transparency and care.
                </p>
              </div>
            </div>
            <div className="relative flex flex-col md:flex-row-reverse items-center">
              <div className="relative z-20 w-64 h-64 md:w-80 md:h-80 flex-shrink-0 -mb-10 md:mb-0 md:-ml-16">
                <div className="w-full h-full rounded-full border-[12px] border-white shadow-xl overflow-hidden">
                  <img
                    src="https://res.cloudinary.com/dhtzknkdr/image/upload/v1773031912/vision_tmoi0n.avif"
                    alt="Vision"
                    className="w-full h-full object-cover grayscale sepia-[.2] hue-rotate-[60deg] saturate-200"
                  />
                </div>
              </div>
              <div className="relative z-10 bg-bgLight py-12 pr-12 pl-12 md:pr-24 md:pl-20 w-full rounded-l-full shadow-sm text-right flex flex-col items-end">
                <h3 className="text-3xl font-bold text-textDark mb-4">Vision</h3>
                <p className="text-textLight text-lg leading-relaxed max-w-xl">
                  To become India's most reliable and respected domestic staffing platform by building a structured
                  ecosystem where households feel secure and domestic professionals receive recognition, stability,
                  and growth opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY FAMILIES TRUST US — solid filled circle icon like Maidvy ── */}
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
                  <FontAwesomeIcon icon={icon} style={{ fontSize: 28, color: "#fff" }} />
                </div>
                <h3 className="text-lg font-bold text-textDark mb-3">{title}</h3>
                <p className="text-sm text-textLight leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICE AREAS — pill badges + top colored border like Maidvy ── */}
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
                {/* cities as pill badges */}
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

          {/* expanding banner — left accent bar like Maidvy */}
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

      {/* ── COMMITMENT — dark section like Maidvy ── */}
      <section className="py-24 bg-[#2d2d2d]">
        <div className="max-w-4xl mx-auto px-6 text-center scroll-section">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Commitment to You</h2>
          <p className="text-white/80 text-lg font-medium mb-8">
            At Domestic Pro, we treat every home with respect, care, and responsibility.
          </p>
          <p className="text-white/70 text-base leading-relaxed mb-6">
            We know that a well-managed home creates a stress-free and happy family life, and our
            mission is to be your trusted partner in achieving that balance.
          </p>
          <p className="text-white/70 text-base leading-relaxed">
            From daily household chores to specialized baby care or patient assistance, our helpers are
            trained, reliable, and compassionate — so you can focus on what truly matters, your family
            and your peace of mind.
          </p>
        </div>
      </section>

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

      {/* ── CONTACT INFO STRIP — dark bar below CTA ── */}
      <section className="bg-[#2d2d2d] border-t border-white/10 px-6 py-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <a href="tel:+919315669704" className="flex items-center justify-center gap-3 text-white/80 hover:text-white transition-colors duration-200 text-sm">
            <FontAwesomeIcon icon={faPhone} className="text-primary" />
            Call Us: +91-93156 69704
          </a>
          <a href="mailto:support@domesticpro.in" className="flex items-center justify-center gap-3 text-white/80 hover:text-white transition-colors duration-200 text-sm">
            <FontAwesomeIcon icon={faEnvelope} className="text-primary" />
            Email: support@domesticpro.in
          </a>
          <a href="https://domesticpro.in" className="flex items-center justify-center gap-3 text-white/80 hover:text-white transition-colors duration-200 text-sm">
            <FontAwesomeIcon icon={faGlobe} className="text-primary" />
            Website: www.domesticpro.in
          </a>
        </div>
      </section>

    </div>
  );
}