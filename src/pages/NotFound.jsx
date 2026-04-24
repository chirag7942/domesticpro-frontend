import { Link } from "react-router-dom";

const quickLinks = [
  { icon: "🏠", label: "House Help", href: "/services/live-in-support" },
  { icon: "👨‍🍳", label: "Cook", href: "/services/cooking-help" },
  { icon: "👶", label: "Baby Care", href: "/services/baby-caretaker" },
  { icon: "🧓", label: "Patient Care", href: "/services/patient-care" },
  { icon: "🚗", label: "Driver", href: "/services/drivers" },
  { icon: "📞", label: "Contact", href: "/services/contact" },
];

export default function NotFound() {
  return (
    <div className="h-screen w-screen bg-bgLight flex items-center justify-center px-4 overflow-hidden relative">
      {/* bg blobs */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 500,
          height: 500,
          background:
            "radial-gradient(circle, rgba(236,95,54,0.08) 0%, transparent 70%)",
          top: -160,
          left: -180,
          filter: "blur(80px)",
          animation: "blobFloat1 9s ease-in-out infinite",
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 380,
          height: 380,
          background:
            "radial-gradient(circle, rgba(236,95,54,0.06) 0%, transparent 70%)",
          bottom: -100,
          right: -120,
          filter: "blur(80px)",
          animation: "blobFloat2 11s ease-in-out infinite",
        }}
      />

      {/* card */}
      <div className="relative z-10 w-full max-w-md bg-white border border-borderLight rounded-3xl shadow-sm px-7 py-8 flex flex-col items-center text-center">
        {/* brand badge */}
        <div className="inline-flex items-center gap-2 bg-[#FFF2EE] border border-[#F5D8CF] rounded-full px-3 py-1 mb-5">
          <span className="text-[10px] font-extrabold text-primary tracking-widest uppercase">
            Domestic Pro
          </span>
          <span className="w-1 h-1 rounded-full bg-[#F5D8CF] inline-block" />
          <span className="text-[10px] font-bold text-textLight">404</span>
        </div>

        {/* 404 display */}
        <div className="relative select-none mb-1" style={{ lineHeight: 1 }}>
          {/* shadow layer */}
          <span
            className="absolute font-black"
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: "clamp(80px, 16vw, 124px)",
              color: "#F1E3DE",
              top: 5,
              left: 5,
              zIndex: 0,
              letterSpacing: "-4px",
            }}
          >
            404
          </span>
          {/* gradient layer */}
          <span
            className="relative font-black"
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: "clamp(80px, 16vw, 124px)",
              background:
                "linear-gradient(135deg, #EC5F36 0%, #F5A07A 55%, #D84E28 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              zIndex: 1,
              letterSpacing: "-4px",
              display: "block",
            }}
          >
            404
          </span>

          <span
            className="absolute text-xl"
            style={{
              top: 6,
              right: -28,
              animation: "emojiFloat 3.5s ease-in-out infinite",
            }}
          >
            🧹
          </span>
          <span
            className="absolute text-lg"
            style={{
              bottom: 2,
              left: -24,
              animation: "emojiFloat 4s 0.8s ease-in-out infinite",
            }}
          >
            🏡
          </span>
        </div>

        {/* headline */}
        <h1
          className="text-2xl font-extrabold text-textDark leading-snug mb-1.5"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          We couldn’t find that page{" "}
          <em className="text-primary not-italic">Oops!</em>
        </h1>

        {/* subtext */}
        <p className="text-[13px] font-medium text-textLight leading-relaxed max-w-xs mb-6">
          This page doesn't exist or was moved. Our helpers couldn't find it
          either.
        </p>

        {/* CTAs */}
        <div className="flex items-center gap-2.5 flex-wrap justify-center mb-6 w-full">
          <Link
            to="/"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-extrabold text-[13px] no-underline transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #EC5F36, #D84E28)",
              boxShadow: "0 5px 16px rgba(236,95,54,0.28)",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Back to Home
          </Link>
          <Link
            to="/contact"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-[13px] no-underline bg-white border-2 border-borderLight text-textDark transition-all duration-200 hover:border-primary hover:text-primary hover:-translate-y-0.5"
            style={{
              boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92V19a2 2 0 01-2.18 2A19.79 19.79 0 013 5.18 2 2 0 015 3h2.09a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 10.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 17.92z" />
            </svg>
            Contact Us
          </Link>
        </div>

        {/* divider */}
        <div className="w-full flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-borderLight" />
          <span className="text-[10px] font-extrabold text-textLight uppercase tracking-widest whitespace-nowrap">
            Browse services
          </span>
          <div className="flex-1 h-px bg-borderLight" />
        </div>

        {/* quick links */}
        <div className="grid grid-cols-3 gap-2 w-full">
          {quickLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="flex flex-col items-center gap-1 py-2.5 px-1 rounded-xl border-2 border-borderLight bg-bgLight text-textDark no-underline font-semibold text-[11px] transition-all duration-200 hover:border-primary hover:text-primary hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
            >
              <span className="text-lg">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes blobFloat1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(28px,20px)} }
        @keyframes blobFloat2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-20px,-26px)} }
        @keyframes emojiFloat { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-8px) rotate(10deg)} }
      `}</style>
    </div>
  );
}
