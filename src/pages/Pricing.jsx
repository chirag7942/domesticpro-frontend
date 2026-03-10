import { useEffect, useRef, useState } from "react";
import HeroWizard from "../components/HeroWizard";
import PricingSection from "../components/PricingSection";
import { Check, ChevronDown } from "lucide-react";

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
  { feature: "Verified Profiles", connect: "1–2", care: "3", complete: "5" },
  { feature: "ID & Address Check", connect: true, care: true, complete: true },
  { feature: "Police Verification", connect: false, care: true, complete: true },
  { feature: "Trial Period", connect: "7 Days", care: "7 Days", complete: "7 Days" },
  { feature: "Replacement Window", connect: "10 Days", care: "10 Days", complete: "15 Days" },
  { feature: "Replacement Guarantee", connect: false, care: false, complete: "30 Days" },
  { feature: "Priority Matching", connect: false, care: false, complete: true },
  { feature: "Background & Reference", connect: false, care: false, complete: true },
  { feature: "Ongoing Support", connect: false, care: false, complete: true },
  { feature: "Periodic Check-ins", connect: false, care: false, complete: true },
];

const faqs = [
  {
    q: "Are there any hidden charges?",
    a: "No. All fees are clearly mentioned. GST is added as per government regulations — you'll always see the full amount before confirming.",
  },
  {
    q: "What happens if the staff leaves?",
    a: "Replacement is provided within the plan's validity period as per your selected package — up to 30 days with the Complete plan.",
  },
  {
    q: "How long does hiring take?",
    a: "Most clients receive suitable profiles within 24–48 hours of confirming their requirement.",
  },
  {
    q: "Can I upgrade my plan later?",
    a: "Yes. Role upgrade support is available within the validity of the Complete plan.",
  },
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
  const [openIndexes, setOpenIndexes] = useState([]);

  useEffect(() => {
    const sections = document.querySelectorAll(".scroll-section");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("show")),
      { threshold: 0.15 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => sections.forEach((s) => observer.unobserve(s));
  }, []);

  const toggleFAQ = (i) =>
    setOpenIndexes((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );

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

            {/* pricing row */}
            <div className="grid grid-cols-4 border-x border-b border-borderLight rounded-b-2xl overflow-hidden -mt-px">
              <div className="p-4 bg-bgLight border-r border-borderLight flex items-center">
                <span className="text-sm font-bold text-textDark">Price (+ GST)</span>
              </div>
              {[
                { price: "₹11,000", gst: "₹12,980 incl. GST" },
                { price: "₹15,000", gst: "₹17,700 incl. GST" },
                { price: "₹20,000", gst: "₹23,600 incl. GST", highlight: true },
              ].map((p, i) => (
                <div key={i} className={`p-4 border-r border-borderLight last:border-r-0 text-center ${p.highlight ? "table-highlight-col" : "bg-white"}`}>
                  <div className={`font-bold text-base ${p.highlight ? "text-primary" : "text-textDark"}`}>{p.price}</div>
                  <div className="text-xs text-textLight mt-0.5">{p.gst}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

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
                    <div className={`transition-all duration-400 ease-in-out overflow-hidden ${isOpen ? "max-h-32 opacity-100" : "max-h-0 opacity-0"}`}>
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