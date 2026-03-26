import { useEffect, useState } from "react";
import { ShieldCheck, HeadphonesIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CSS = `
  section[data-section] { scroll-margin-top: 100px; }
  html { scroll-behavior: smooth; }
`;

const navItems = [
  { id: "nature", label: "Nature of Services" },
  { id: "relationship", label: "Client–Worker Relationship" },
  { id: "plans", label: "Plans & Service Scope" },
  { id: "payment", label: "Payment Terms" },
  { id: "guarantee", label: "No Placement Guarantee" },
  { id: "verification", label: "Verification & Checks" },
  { id: "replacement", label: "Replacement Policy" },
  { id: "liability", label: "Limitation of Liability" },
  { id: "obligations", label: "Client Obligations" },
  { id: "suspension", label: "Suspension & Termination" },
  { id: "confidentiality", label: "Confidentiality" },
  { id: "force", label: "Force Majeure" },
  { id: "law", label: "Governing Law" },
  { id: "acceptance", label: "Acceptance of Terms" },
];

const highlightCards = [
  { emoji: "📋", title: "14 Clauses", desc: "Comprehensive terms covering all aspects of our service engagement." },
  { emoji: "🔄", title: "Replacement Policy", desc: "Replacement provided within plan validity — subject to availability." },
  { emoji: "🚫", title: "No Refund Policy", desc: "All fees are final once profiles are shared. No monetary refunds." },
  { emoji: "🤝", title: "Mutual Obligations", desc: "Both parties are expected to act with fairness, dignity, and honesty." },
];

/* ── Reusable sub-components ── */
const SectionHeader = ({ number, emoji, title }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white font-bold text-base flex-shrink-0">{emoji}</div>
    <h2 className="text-2xl md:text-3xl font-bold text-textDark">{number}. {title}</h2>
  </div>
);

const SubHeading = ({ text }) => (
  <h3 className="font-bold text-textDark text-[15px] mb-2 mt-5">{text}</h3>
);

const Para = ({ children }) => (
  <p className="text-sm text-textLight leading-relaxed">{children}</p>
);

const BulletList = ({ items }) => (
  <ul className="space-y-2 mt-2">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-3 text-sm text-textLight">
        <span className="w-5 h-5 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-primary block" />
        </span>
        {item}
      </li>
    ))}
  </ul>
);

const Warning = ({ text }) => (
  <div className="flex items-start gap-3 bg-primary/5 border border-primary/20 rounded-xl p-4 mt-4">
    <span className="text-lg flex-shrink-0">📌</span>
    <p className="text-sm font-bold text-primary leading-relaxed">{text}</p>
  </div>
);

const StepCard = ({ number, text }) => (
  <div className="flex items-start gap-4 bg-bgLight border border-borderLight p-4 rounded-xl">
    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white font-bold text-sm flex-shrink-0">{number}</div>
    <p className="text-sm text-textLight leading-relaxed">{text}</p>
  </div>
);

const ExclusionCard = ({ title, desc }) => (
  <div className="bg-bgLight rounded-xl p-4 border-l-4 border-primary">
    <h4 className="font-bold text-textDark text-sm mb-1">{title}</h4>
    <p className="text-xs text-textLight">{desc}</p>
  </div>
);

const Quote = ({ text }) => (
  <div className="border-l-4 border-primary pl-4 py-1 mt-4">
    <p className="text-sm font-bold text-textDark italic leading-relaxed">"{text}"</p>
  </div>
);

export default function TermsAndCondition() {
  const [activeSection, setActiveSection] = useState("nature");
  const navigate = useNavigate();

  useEffect(() => {
    const sections = document.querySelectorAll("section[data-section]");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveSection(e.target.dataset.section)),
      { rootMargin: "-50% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => sections.forEach((s) => observer.unobserve(s));
  }, []);

  return (
    <>
      <style>{CSS}</style>
      <div className="bg-bgLight text-textDark min-h-screen">

        {/* ── HERO ── */}
        <section className="relative h-[75vh] md:h-[85vh] flex items-center justify-center">
          <div className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(https://res.cloudinary.com/dto7bji6b/image/upload/v1774429745/terma_and_conditions_oneo24.jpg)` }} />
          <div className="absolute inset-0 bg-black/80" />
          <div className="relative z-10 text-center px-5 max-w-4xl mx-auto">
            <h1 className="text-[clamp(32px,5vw,52px)] font-extrabold text-white leading-tight mb-4">
              Terms &amp; <em className="not-italic text-primary">Conditions</em>
            </h1>
            <p className="text-white/80 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-8">
              These terms govern all services provided by Domestic Pro. By engaging our services or making any payment, you agree to be bound by the terms set forth below.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
              {[
                { label: "Jurisdiction", value: "India" },
                { label: "Clauses", value: "14 Sections" },
                { label: "Operated by", value: "Domestic Pro" },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white border border-borderLight rounded-full px-4 py-1.5 text-textLight flex items-center gap-2">
                  <span className="font-bold text-textDark">{value}</span>
                  <span className="text-borderLight">·</span>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HIGHLIGHTS ── */}
        <section className="bg-white border-b border-borderLight">
          <div className="max-w-6xl mx-auto px-6 py-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-textDark mb-2">Policy Highlights</h2>
              <p className="text-textLight max-w-xl mx-auto text-sm leading-relaxed">
                Clear policies designed to ensure transparency, fairness, and dependable service.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {highlightCards.map(({ emoji, title, desc }) => (
                <div key={title}
                  className="bg-bgLight rounded-2xl p-6 text-center border border-borderLight hover:border-primary hover:shadow-[0_8px_32px_rgba(236,95,54,0.10)] transition-all duration-300">
                  <div className="w-14 h-14 bg-primary/10 flex items-center justify-center rounded-full text-2xl mx-auto mb-4">{emoji}</div>
                  <h3 className="font-bold text-textDark text-sm mb-2">{title}</h3>
                  <p className="text-textLight text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MAIN: sidebar + sections ── */}
        <div className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

            {/* SIDEBAR */}
            <div className="md:col-span-1">
              <div className="sticky top-[8rem] bg-bgLight p-5 rounded-2xl border border-borderLight shadow-sm">
                <h3 className="font-bold text-sm uppercase tracking-widest text-textDark mb-5">Quick Navigation</h3>
                <ul className="space-y-2.5">
                  {navItems.map((item) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`}
                        className={`flex items-center gap-2 text-sm font-medium transition-all duration-150 ${activeSection === item.id ? "text-primary" : "text-textLight hover:text-textDark"}`}>
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors duration-150 ${activeSection === item.id ? "bg-primary" : "bg-borderLight"}`} />
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 bg-primary/5 border border-primary/20 p-4 rounded-xl text-center">
                  <HeadphonesIcon size={18} className="text-primary mx-auto mb-2" />
                  <p className="font-bold text-textDark text-sm mb-1">Need Help?</p>
                  <p className="text-xs text-textLight mb-3 leading-relaxed">Our team can clarify any policy questions before you commit.</p>
                  <button onClick={() => navigate("/contact")}
                    className="block bg-primary hover:bg-primaryHover text-white text-xs font-bold py-2 px-4 rounded-lg transition-colors duration-200 w-full">
                    Contact Support
                  </button>
                </div>
              </div>
            </div>

            {/* SECTIONS */}
            <div className="md:col-span-3 space-y-16">

              <section id="nature" data-section="nature">
                <SectionHeader number="1" emoji="📋" title="Nature of Services" />
                <div className="space-y-3">
                  <Para>Domestic Pro is a facilitation and placement support service that assists clients in identifying, screening, and onboarding domestic help including but not limited to maids, cooks, nannies, and elderly care providers.</Para>
                  <Para>Domestic Pro <strong className="text-textDark font-bold">does not employ, supervise, or control</strong> the domestic help and does not act as an employer, contractor, or guarantor.</Para>
                </div>
              </section>

              <section id="relationship" data-section="relationship">
                <SectionHeader number="2" emoji="🤝" title="Client–Worker Relationship" />
                <div className="space-y-3">
                  <Para>The employment relationship exists <strong className="text-textDark font-bold">solely between the Client and the domestic help</strong>. All matters relating to salary, working hours, duties, leaves, discipline, termination, accommodation, and statutory compliance are the Client's responsibility.</Para>
                  <Para>Domestic Pro shall not be liable for any disputes, claims, damages, losses, or legal actions arising out of this relationship.</Para>
                </div>
                <Quote text="The employment relationship exists solely between the Client and the domestic help." />
              </section>

              <section id="plans" data-section="plans">
                <SectionHeader number="3" emoji="⚡" title="Plans & Service Scope" />
                <div className="space-y-3">
                  <Para>Services are offered under defined plans (<strong className="text-textDark font-bold">Connect / Care / Complete</strong>) with specific inclusions, replacement support, and validity periods as communicated at the time of enrolment.</Para>
                  <Para>Any service outside the selected plan scope may attract additional charges.</Para>
                </div>
                <div className="grid grid-cols-3 gap-3 mt-5">
                  {[
                    { name: "Connect", advance: "₹3,000", cls: "border-borderLight bg-bgLight" },
                    { name: "Care", advance: "₹5,000", cls: "border-borderLight bg-bgLight" },
                    { name: "Complete", advance: "₹7,000", cls: "border-primary/30 bg-primary/5" },
                  ].map((p) => (
                    <div key={p.name} className={`border rounded-xl p-4 text-center ${p.cls}`}>
                      <p className="text-[10px] font-bold text-textLight uppercase tracking-wider mb-1">{p.name}</p>
                      <p className="text-xl font-extrabold text-textDark">{p.advance}</p>
                      <p className="text-[10px] text-textLight mt-1">Advance Fee</p>
                    </div>
                  ))}
                </div>
              </section>

              <section id="payment" data-section="payment">
                <SectionHeader number="4" emoji="💳" title="Payment Terms" />
                <div>
                  <SubHeading text="4.1 Profile Sharing Fee (Advance)" />
                  <Para>An advance fee is payable prior to the commencement of services and profile sharing. This fee covers requirement assessment, sourcing, screening, verification, and profile sharing.</Para>
                  <Warning text="Once profiles are shared, the advance fee is strictly non-refundable." />
                </div>
                <div>
                  <SubHeading text="4.2 Balance Payment" />
                  <Para>The balance service fee is payable <strong className="text-textDark font-bold">upon confirmation of a candidate</strong> or before the candidate's joining date, whichever is earlier. Failure to pay the balance may result in suspension or termination of services.</Para>
                </div>
              </section>

              <section id="guarantee" data-section="guarantee">
                <SectionHeader number="5" emoji="⚠️" title="No Placement Guarantee" />
                <div className="space-y-3">
                  <Para>Domestic Pro does <strong className="text-textDark font-bold">not guarantee placement</strong>, availability, continuity, or performance of any domestic help.</Para>
                  <Para>Fees paid are for professional services rendered and efforts made, not for guaranteed outcomes.</Para>
                </div>
                <Warning text="Fees are for professional services rendered and efforts made — not for guaranteed outcomes." />
              </section>

              <section id="verification" data-section="verification">
                <SectionHeader number="6" emoji="🛡️" title="Verification & Background Checks" />
                <div className="space-y-3">
                  <Para>Domestic Pro conducts reasonable checks based on documents and information provided by the domestic help, which may include ID verification and basic reference checks.</Para>
                  <Para>Domestic Pro <strong className="text-textDark font-bold">does not warrant or guarantee</strong> the authenticity, accuracy, or completeness of such information and shall not be liable for misrepresentation, misconduct, or criminal acts by the domestic help.</Para>
                  <Para>Clients are advised to exercise independent judgment and supervision.</Para>
                </div>
              </section>

              <section id="replacement" data-section="replacement">
                <SectionHeader number="7" emoji="🔁" title="Replacement Policy" />
                <Para>Replacement support is provided strictly as per the selected plan and within the specified validity period.</Para>
                <div className="mt-5"><SubHeading text="7.1 Eligibility for Replacement" /><BulletList items={["The maid resigns or discontinues the service for reasons not caused by the client.", "The maid is unsuitable for the assigned household tasks or does not meet service expectations.", "Performance or compatibility issues are reported promptly to Domestic Pro by the client."]} /></div>
                <div className="mt-6">
                  <SubHeading text="7.2 Replacement Process" />
                  <div className="space-y-3 mt-2">
                    <StepCard number="1" text="The client must inform Domestic Pro immediately regarding the need for a replacement." />
                    <StepCard number="2" text="A new profile will be shortlisted and shared within 2–4 working days, subject to availability." />
                    <StepCard number="3" text="The client is entitled to replacement strictly as per the number specified in their active service plan." />
                  </div>
                </div>
                <div className="mt-6">
                  <SubHeading text="7.3 Replacement Not Applicable If" />
                  <div className="space-y-3 mt-2">
                    <ExclusionCard title="Maid Resigns Due to Client Actions" desc="Harassment, unsafe conditions, or delayed salary payments by the client." />
                    <ExclusionCard title="Direct Hiring Outside Domestic Pro" desc="Client directly hires the maid outside the Domestic Pro platform." />
                    <ExclusionCard title="Tasks Beyond Agreed Scope" desc="Maid is required to work outside the agreed service scope." />
                    <ExclusionCard title="All Replacements Used" desc="Client has already utilized all the replacements allowed under the contract." />
                    <ExclusionCard title="No Monetary Refund in Lieu" desc="No monetary refunds are provided in lieu of replacements. Replacement does not reset plan validity." />
                  </div>
                </div>
              </section>

              <section id="liability" data-section="liability">
                <SectionHeader number="8" emoji="⚖️" title="Limitation of Liability" />
                <Para>The Client agrees to indemnify and hold Domestic Pro harmless from any claims or legal actions arising out of the engagement. Domestic Pro shall not be liable for:</Para>
                <div className="bg-red-50 border border-red-100 rounded-xl p-5 mt-4">
                  <p className="text-xs font-bold text-red-500 uppercase tracking-wider mb-3">Not Liable For:</p>
                  <div className="space-y-2">
                    {["Theft, injury, negligence, misconduct, or accidents", "Loss or damage to property", "Absconding or discontinuation of domestic help", "Any direct, indirect, incidental, or consequential damages"].map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-sm text-textLight">
                        <span className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 mt-0.5 bg-red-100">
                          <span className="text-red-400 text-[10px] font-bold">✕</span>
                        </span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section id="obligations" data-section="obligations">
                <SectionHeader number="9" emoji="✅" title="Client Obligations" />
                <Para>Domestic Pro reserves the right to discontinue services in case of abuse, misrepresentation, or unethical conduct by the Client. The Client agrees to:</Para>
                <BulletList items={["Provide accurate job requirements", "Treat domestic help with dignity and fairness", "Ensure a safe working environment", "Promptly communicate issues or concerns"]} />
              </section>

              <section id="suspension" data-section="suspension">
                <SectionHeader number="10" emoji="🚫" title="Service Suspension or Termination" />
                <Para>Domestic Pro may suspend or terminate services <strong className="text-textDark font-bold">without refund</strong> if:</Para>
                <BulletList items={["Payments are delayed", "Terms are violated", "The Client engages in unlawful or unethical conduct"]} />
              </section>

              <section id="confidentiality" data-section="confidentiality">
                <SectionHeader number="11" emoji="🔒" title="Confidentiality" />
                <Para>Client and domestic help information shared during the process shall be treated as confidential and used solely for service delivery.</Para>
              </section>

              <section id="force" data-section="force">
                <SectionHeader number="12" emoji="🌐" title="Force Majeure" />
                <Para>Domestic Pro shall not be liable for delays or failure to perform due to events beyond reasonable control including strikes, natural calamities, or regulatory restrictions.</Para>
              </section>

              <section id="law" data-section="law">
                <SectionHeader number="13" emoji="⚖️" title="Governing Law & Jurisdiction" />
                <div className="space-y-3">
                  <Para>These Terms & Conditions shall be governed by the laws of India.</Para>
                  <Para>All disputes shall be subject to the exclusive jurisdiction of courts in the relevant city/state.</Para>
                </div>
              </section>

              <section id="acceptance" data-section="acceptance">
                <SectionHeader number="14" emoji="📝" title="Acceptance of Terms" />
                <Para>Engaging services or making payment constitutes full and unconditional acceptance of these Terms & Conditions.</Para>
                <Quote text="Engaging services or making payment constitutes full and unconditional acceptance of these Terms & Conditions." />
              </section>

              {/* closing card */}
              <div style={{ background: "linear-gradient(135deg, #EC5F36 0%, #C94520 100%)" }} className="rounded-2xl p-8 text-center text-white">
                <div className="w-14 h-14 rounded-full bg-white/15 flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-extrabold mb-3">Ethical Placement. Professional Support.</h3>
                <p className="text-white/85 text-sm leading-relaxed max-w-md mx-auto mb-6">
                  These terms exist to protect both you and our professionals. If you have questions, our support team is always here to help.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button onClick={() => navigate("/contact")}
                    className="bg-white text-primary px-6 py-3 rounded-xl text-sm font-bold hover:bg-bgLight transition-colors duration-200 shadow-md">
                    Contact Support
                  </button>
                  <button onClick={() => navigate("/pricing")}
                    className="border-2 border-white/40 text-white px-6 py-3 rounded-xl text-sm font-bold hover:border-white transition-colors duration-200">
                    View Our Plans
                  </button>
                </div>
              </div>

              <p className="text-center text-sm text-textLight pb-4">
                <strong className="text-textDark">Domestic Pro</strong> — Ethical Placement. Professional Support. Peace of Mind.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}