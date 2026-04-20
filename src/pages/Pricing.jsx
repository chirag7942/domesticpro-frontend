import { useEffect, useState } from "react";
import HeroWizard from "../components/HeroWizard";
import PricingSection from "../components/PricingSection";
import { Check } from "lucide-react";

/* ── only what Tailwind cannot do ── */
const CSS = `
  .table-highlight-col { background: rgba(236,95,54,0.04); }
  .faq-card { transition: border-color 0.2s, box-shadow 0.2s; }
  .faq-card:hover { border-color: #EC5F36; box-shadow: 0 4px 20px rgba(236,95,54,0.10); }
  .cta-shimmer::before {
    content:''; position:absolute; inset:0;
    background:linear-gradient(135deg,rgba(255,255,255,0.14) 0%,transparent 60%);
    opacity:0; transition:opacity 0.2s; border-radius:inherit;
  }
  .cta-shimmer:hover::before { opacity:1; }
`;

const tableRows = [
  { feature: "Verified Profiles", connect: "5", care: "7", complete: "10" },
  { feature: "ID & Address Check", connect: true, care: true, complete: true },
  { feature: "Police Verification", connect: false, care: true, complete: true },
  { feature: "Trial Period", connect: "3 Days", care: "5 Days", complete: "10 Days" },
  { feature: "Free Lookup Period", connect: "5 Days", care: "7 Days", complete: "10 Days" },
  { feature: "Replacement Window", connect: false, care: "1 Replacement", complete: "2 Replacements" },
  { feature: "Priority Matching", connect: false, care: false, complete: true },
  { feature: "Background & Reference", connect: false, care: false, complete: true },
  { feature: "Ongoing Support", connect: false, care: false, complete: true },
  { feature: "Periodic Check-ins", connect: false, care: false, complete: true },
];

function CellValue({ value }) {
  if (value === true)
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10">
        <Check size={13} className="text-primary" strokeWidth={3} />
      </span>
    );
  if (value === false)
    return <span className="text-borderLight text-lg font-light">—</span>;
  return <span className="text-textDark font-semibold text-sm">{value}</span>;
}

export default function PricingPage() {
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
      <div className="bg-bgLight text-textDark">

        {/* ── PRICING CARDS ── */}
        <PricingSection />

        {/* ── COMPARISON TABLE ── */}
        <section className="bg-white border-y border-borderLight py-24">
          <div className="max-w-5xl mx-auto px-6 scroll-section">

            <div className="text-center mb-14">
              <span className="inline-block bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">
                Side by Side
              </span>
              <h2 className="text-4xl font-bold text-textDark mb-3">
                Compare Plans
              </h2>
              <p className="text-textLight">
                Everything included — so you can choose with confidence.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-borderLight shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-bgLight border-b border-borderLight">
                    <th className="p-4 text-left text-textDark font-bold w-1/3">Feature</th>
                    <th className="p-4 text-center text-textDark font-bold">Connect</th>
                    <th className="p-4 text-center text-textDark font-bold">Care</th>
                    <th className="p-4 text-center text-primary font-bold table-highlight-col">Complete ⭐</th>
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row, i) => (
                    <tr key={i} className={`border-t border-borderLight ${i % 2 === 0 ? "bg-white" : "bg-bgLight/40"}`}>
                      <td className="p-4 text-textDark font-medium">{row.feature}</td>
                      <td className="p-4 text-center"><CellValue value={row.connect} /></td>
                      <td className="p-4 text-center"><CellValue value={row.care} /></td>
                      <td className="p-4 text-center table-highlight-col"><CellValue value={row.complete} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* available plan row */}
            {/* <div className="grid grid-cols-4 border-x border-b border-borderLight rounded-b-2xl overflow-hidden -mt-px">
              <div className="p-4 bg-bgLight border-r border-borderLight flex items-center">
                <span className="text-sm font-bold text-textDark">Available Plan</span>
              </div>
              {[
                { label: "Connect", tag: "Basic", tagColor: "bg-blue-50 text-blue-600 border-blue-200" },
                { label: "Care", tag: "Standard", tagColor: "bg-amber-50 text-amber-600 border-amber-200" },
                { label: "Complete", tag: "Recommended", tagColor: "bg-primary/10 text-primary border-primary/30", highlight: true },
              ].map((p, i) => (
                <div key={i} className={`p-4 border-r border-borderLight last:border-r-0 text-center flex flex-col items-center justify-center gap-2 ${p.highlight ? "table-highlight-col" : "bg-white"}`}>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className={`text-xs font-bold px-4 py-1.5 rounded-lg transition-all duration-200 ${p.highlight
                      ? "bg-primary text-white hover:bg-primaryHover shadow-sm hover:shadow-md"
                      : "bg-bgLight text-textDark border border-borderLight hover:border-primary hover:text-primary"
                      }`}
                  >
                    Get {p.label}
                  </button>
                </div>
              ))}
            </div> */}
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section style={{ background: "linear-gradient(135deg, #EC5F36 0%, #C94520 100%)" }}>
          <div className="max-w-4xl mx-auto px-6 py-24 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Ready to hire with
              <br />
              <em className="not-italic text-white/80">confidence?</em>
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Get verified, professional domestic help with structured support — starting at ₹11,000.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="cta-shimmer relative overflow-hidden bg-white text-primary px-8 py-3.5 rounded-xl font-bold hover:bg-bgLight transition-all duration-200 shadow-md hover:shadow-lg text-sm"
            >
              Get Started →
            </button>

            <div className="mt-14 flex flex-wrap items-center justify-center gap-8 text-white/70 text-sm">
              {["Verified Professionals", "Police-Checked Staff", "Dedicated Support", "Replacement Guaranteed"].map((t) => (
                <span key={t} className="flex items-center gap-2">
                  <Check size={13} className="text-white/60" strokeWidth={3} />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>

      <HeroWizard asModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}