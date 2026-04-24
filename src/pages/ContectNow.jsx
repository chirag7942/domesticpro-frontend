import { useState, useEffect } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Check,
  MessageSquare,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import SEO from "../components/SEO";
import useScrollReveal from "../hooks/useScrollReveal";

const contactChannels = [
  {
    icon: Phone,
    label: "Call Us",
    value: "+91 92112 98139",
    sub: "Mon – Sat, 9am – 7pm",
    action: "tel:+919211298139",
    cta: "Call Now",
  },
  {
    icon: MessageSquare,
    label: "WhatsApp",
    value: "+91 92112 98139",
    sub: "Usually replies in minutes",
    action: "https://wa.me/919211298139",
    cta: "Message",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "support@domesticpro.in",
    sub: "We respond within 24 hrs",
    action: "mailto:hello@domesticpro.in",
    cta: "Send Email",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "LG-006, DLF Grand Mall, Mehrauli, Gurugram Road",
    sub: "Gurugram – 122001",
    action: "https://maps.app.goo.gl/3N9oreM2qpmUsjdE7",
    cta: "Get Directions",
  },
];

const reasons = [
  "Hire a nanny or household help",
  "Learn about our plans & pricing",
  "Get a replacement quickly",
  "Ask a question before signing up",
  "Looking for a job",
  "Something else",
];

const hours = [
  { day: "Monday – Friday", time: "9:00 am – 8:00 pm" },
  { day: "Saturday", time: "9:00 am – 6:00 pm" },
];

const promises = [
  "Callback within 1 hour during working hours",
  "No pushy sales — we listen first",
  "Verified profiles shared within 24–48 hrs",
  "Full support until your hire is settled",
  "Transparent pricing, no hidden fees",
];

/* ─── Only CSS that Tailwind genuinely cannot express ─── */
const styles = `
  /* multi-stop gradient buttons */
  .btn-gradient {
    background: linear-gradient(135deg, #EC5F36, #D84E28);
    transition: box-shadow .25s, transform .2s;
  }
  .btn-gradient:hover:not(:disabled) {
    box-shadow: 0 10px 30px rgba(236,95,54,.42);
    transform: translateY(-1px);
  }
  .btn-gradient:disabled { opacity: .45; cursor: not-allowed; }

  .card-orange   { background: linear-gradient(135deg, #EC5F36, #D84E28); }
  .strip-orange  { background: linear-gradient(135deg, #EC5F36, #C94520); }

  /* Tailwind's focus-visible ring colour doesn't map to an arbitrary hex easily */
  .field-focus:focus {
    border-color: #EC5F36 !important;
    background: #fff !important;
    box-shadow: 0 0 0 4px rgba(236,95,54,.12);
    outline: none;
  }

  /* remove native select arrow */
  .select-reset { appearance: none; }

  /* channel card hover – box-shadow + border + lift together */
  .channel-card { transition: border-color .25s, box-shadow .25s, transform .22s; }
  .channel-card:hover {
    border-color: #EC5F36;
    box-shadow: 0 8px 28px rgba(236,95,54,.13);
    transform: translateY(-3px);
  }

  .strip-btn { transition: background .2s, box-shadow .2s, transform .2s; }
  .strip-btn:hover {
    background: #FFF7F4;
    box-shadow: 0 10px 28px rgba(0,0,0,.20);
    transform: translateY(-1px);
  }
`;

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    reason: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  useScrollReveal();

  const set = (f) => (e) => setForm((p) => ({ ...p, [f]: e.target.value }));
  const reset = () => {
    setSubmitted(false);
    setForm({ name: "", phone: "", reason: "", message: "" });
  };
  const submit = (e) => {
    e.preventDefault();
    if (form.name && form.phone.length === 10) setSubmitted(true);
  };

  /* shared input classes */
  const inputCls =
    "field-focus font-body w-full text-[15px] text-textDark bg-bgLight " +
    "border-2 border-borderLight rounded-xl transition-colors duration-200";

  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with DomesticPro for domestic helper hiring. Call +91 92112 98139 or WhatsApp us for fast response."
        canonical="/contact"
      />
      <style>{styles}</style>

      <div className="font-body bg-bgLight text-textDark min-h-screen">
        {/* ── HERO ── */}
        <section className="hero-bg text-center px-4 sm:px-6 pt-20 pb-20">
          <span className="inline-block bg-primary/10 text-primary text-[11px] font-bold tracking-[2px] uppercase px-4 py-1.5 rounded-full mb-5">
            We're Here for You
          </span>
          <h1 className="font-display text-[clamp(36px,5vw,54px)] font-extrabold leading-[1.1] text-textDark mb-4">
            Let's get your home
            <br />
            <em className="not-italic text-primary">sorted today.</em>
          </h1>
          <p className="text-textLight text-lg max-w-[480px] mx-auto leading-relaxed">
            Reach out any way you like — our team responds fast and helps you
            find the right professional for your home.
          </p>
        </section>

        {/* ── CHANNEL CARDS ── */}
        <div className="max-w-5xl mb-5 mx-auto px-4 sm:px-6 -translate-y-9 scroll-section">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
            {contactChannels.map(
              ({ icon: Icon, label, value, sub, action, cta }) => (
                <a
                  key={label}
                  href={action}
                  className="channel-card bg-white border-[1.5px] border-borderLight rounded-2xl
                  p-5 flex flex-col gap-3 no-underline text-inherit"
                >
                  <div className="w-11 h-11 rounded-xl bg-bgLight flex items-center justify-center">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-textLight tracking-widest uppercase mb-0.5">
                      {label}
                    </p>
                    <p className="text-[15px] font-bold text-textDark leading-snug">
                      {value}
                    </p>
                    <p className="text-xs text-textLight mt-0.5">{sub}</p>
                  </div>
                  <p className="flex items-center gap-1.5 text-[13px] font-bold text-primary">
                    {cta}
                    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </p>
                </a>
              ),
            )}
          </div>
        </div>

        {/* ── TWO-COL BODY ── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* ── LEFT: Contact Form ── */}
          <div className="bg-white border-[1.5px] border-borderLight rounded-3xl p-8 shadow-sm scroll-section">
            {!submitted ? (
              <>
                <h2 className="font-display text-[22px] font-extrabold text-textDark mb-1.5">
                  Send Us a Message
                </h2>
                <p className="text-sm text-textLight mb-7 leading-relaxed">
                  Fill in your details and we'll call you back within the hour
                  during working hours.
                </p>

                <form onSubmit={submit} className="flex flex-col gap-[18px]">
                  {/* Name */}
                  <div>
                    <label className="block text-[11px] font-bold text-textDark uppercase tracking-[0.5px] mb-2">
                      Your Name *
                    </label>
                    <input
                      className={`${inputCls} h-[50px] px-4`}
                      placeholder="e.g. Priya Sharma"
                      value={form.name}
                      onChange={set("name")}
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-[11px] font-bold text-textDark uppercase tracking-[0.5px] mb-2">
                      Mobile Number *
                    </label>
                    <div className="relative flex items-center">
                      {/* +91 prefix */}
                      <div
                        className="absolute left-0 top-0 h-[50px] w-14 flex items-center justify-center
                        text-[14px] font-bold text-textLight border-r-2 border-borderLight pointer-events-none z-10"
                      >
                        +91
                      </div>
                      <input
                        className={`${inputCls} h-[50px] pl-[68px] pr-4`}
                        type="tel"
                        maxLength={10}
                        placeholder="Enter 10-digit number"
                        value={form.phone}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            phone: e.target.value.replace(/\D/g, ""),
                          }))
                        }
                        required
                      />
                    </div>
                    {form.phone.length > 0 && form.phone.length < 10 && (
                      <p className="text-xs text-primary font-semibold mt-1.5">
                        Please enter a valid 10-digit number
                      </p>
                    )}
                  </div>

                  {/* Reason */}
                  <div>
                    <label className="block text-[11px] font-bold text-textDark uppercase tracking-[0.5px] mb-2">
                      Reason for Contact
                    </label>
                    <div className="relative">
                      <select
                        className={`select-reset ${inputCls} h-[50px] px-4 cursor-pointer`}
                        value={form.reason}
                        onChange={set("reason")}
                      >
                        <option value="">Select a reason…</option>
                        {reasons.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-textLight text-[11px] pointer-events-none">
                        ▼
                      </span>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[11px] font-bold text-textDark uppercase tracking-[0.5px] mb-2">
                      Message{" "}
                      <span className="font-normal normal-case tracking-normal text-textLight">
                        (optional)
                      </span>
                    </label>
                    <textarea
                      className={`${inputCls} px-4 py-3.5 resize-y min-h-[110px]`}
                      placeholder="Tell us a bit more about what you need…"
                      value={form.message}
                      onChange={set("message")}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={!form.name || form.phone.length !== 10}
                    className="btn-gradient w-full h-[52px] flex items-center justify-center gap-2
                      text-white text-[16px] font-bold rounded-2xl border-none cursor-pointer
                      shadow-[0_6px_20px_rgba(236,95,54,0.32)]"
                  >
                    <Send size={16} />
                    Send Message
                  </button>
                </form>
              </>
            ) : (
              /* Success */
              <div className="flex flex-col items-center text-center py-12 gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check size={28} className="text-primary" strokeWidth={2.5} />
                </div>
                <h3 className="font-display text-[22px] font-extrabold text-textDark">
                  Message Received!
                </h3>
                <p className="text-sm text-textLight leading-relaxed max-w-[280px]">
                  Thank you,{" "}
                  <strong className="text-textDark">{form.name}</strong>. Our
                  team will call you on{" "}
                  <strong className="text-textDark">+91 {form.phone}</strong>{" "}
                  within the hour.
                </p>
                <button
                  onClick={reset}
                  className="mt-2 px-6 py-2.5 border-2 border-borderLight rounded-xl text-sm font-bold
                    text-textLight bg-transparent cursor-pointer transition-colors duration-200
                    hover:border-primary hover:text-primary"
                >
                  Submit Another
                </button>
              </div>
            )}
          </div>

          {/* ── RIGHT: Info panel ── */}
          <div className="flex flex-col gap-5 scroll-section">
            {/* Hours */}
            <div className="bg-white border-[1.5px] border-borderLight rounded-2xl p-7">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-bgLight flex items-center justify-center flex-shrink-0">
                  <Clock size={18} className="text-primary" />
                </div>
                <h3 className="text-[17px] font-bold text-textDark">
                  Working Hours
                </h3>
              </div>
              {hours.map((r, i) => (
                <div
                  key={r.day}
                  className={`flex justify-between text-[13px] py-2.5 text-textLight
                    ${i < hours.length - 1 ? "border-b border-borderLight" : ""}`}
                >
                  <span>{r.day}</span>
                  <strong className="text-textDark font-semibold">
                    {r.time}
                  </strong>
                </div>
              ))}
            </div>

            {/* Promises */}
            <div className="bg-white border-[1.5px] border-borderLight rounded-2xl p-7">
              <h3 className="text-[17px] font-bold text-textDark mb-4">
                Our Promise to You
              </h3>
              <div className="flex flex-col gap-3">
                {promises.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 text-sm text-textLight leading-snug"
                  >
                    <div className="w-5 h-5 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check
                        size={12}
                        className="text-primary"
                        strokeWidth={3}
                      />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Direct call card */}
            <div className="card-orange rounded-2xl p-7 text-white">
              <h3 className="font-display text-[18px] font-extrabold mb-2">
                Prefer to talk directly?
              </h3>
              <p className="text-sm text-white/85 mb-5 leading-relaxed">
                Call or WhatsApp us right now — no forms, no wait.
              </p>
              <a
                href="tel:+919211298139"
                className="inline-flex items-center gap-2 bg-white text-primary
                  px-5 py-3 rounded-xl text-sm font-bold no-underline
                  shadow-md hover:bg-bgLight transition-colors duration-200"
              >
                <Phone size={15} />
                +91 92112 98139
              </a>
            </div>
          </div>
        </div>

        {/* ── BOTTOM CTA ── */}
        <section className="strip-orange px-4 py-20 text-center scroll-section">
          <h2 className="font-display text-[clamp(26px,4vw,38px)] font-extrabold text-white mb-3">
            Ready to hire with confidence?
          </h2>
          <p className="text-white/80 text-base mb-8">
            Get matched with verified domestic professionals — starting at
            ₹11,000.
          </p>
          <button
            onClick={() => navigate("/pricing")}
            className="strip-btn inline-flex items-center gap-2 bg-white text-primary
  px-8 py-3.5 rounded-2xl text-[15px] font-bold border-none cursor-pointer shadow-md"
          >
            View Our Plans
            <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </section>
      </div>
    </>
  );
}
