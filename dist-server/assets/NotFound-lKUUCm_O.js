import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "react-router-dom";
const quickLinks = [
  { icon: "🏠", label: "House Help", href: "/services/live-in-support" },
  { icon: "👨‍🍳", label: "Cook", href: "/services/cooking-help" },
  { icon: "👶", label: "Baby Care", href: "/services/baby-caretaker" },
  { icon: "🧓", label: "Patient Care", href: "/services/patient-care" },
  { icon: "🚗", label: "Driver", href: "/services/drivers" },
  { icon: "📞", label: "Contact", href: "/services/contact" }
];
function NotFound() {
  return /* @__PURE__ */ jsxs("div", { className: "h-screen w-screen bg-bgLight flex items-center justify-center px-4 overflow-hidden relative", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute rounded-full pointer-events-none",
        style: {
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(236,95,54,0.08) 0%, transparent 70%)",
          top: -160,
          left: -180,
          filter: "blur(80px)",
          animation: "blobFloat1 9s ease-in-out infinite"
        }
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute rounded-full pointer-events-none",
        style: {
          width: 380,
          height: 380,
          background: "radial-gradient(circle, rgba(236,95,54,0.06) 0%, transparent 70%)",
          bottom: -100,
          right: -120,
          filter: "blur(80px)",
          animation: "blobFloat2 11s ease-in-out infinite"
        }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 w-full max-w-md bg-white border border-borderLight rounded-3xl shadow-sm px-7 py-8 flex flex-col items-center text-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 bg-[#FFF2EE] border border-[#F5D8CF] rounded-full px-3 py-1 mb-5", children: [
        /* @__PURE__ */ jsx("span", { className: "text-[10px] font-extrabold text-primary tracking-widest uppercase", children: "Domestic Pro" }),
        /* @__PURE__ */ jsx("span", { className: "w-1 h-1 rounded-full bg-[#F5D8CF] inline-block" }),
        /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-textLight", children: "404" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative select-none mb-1", style: { lineHeight: 1 }, children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            className: "absolute font-black",
            style: {
              fontFamily: "'Fraunces', serif",
              fontSize: "clamp(80px, 16vw, 124px)",
              color: "#F1E3DE",
              top: 5,
              left: 5,
              zIndex: 0,
              letterSpacing: "-4px"
            },
            children: "404"
          }
        ),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: "relative font-black",
            style: {
              fontFamily: "'Fraunces', serif",
              fontSize: "clamp(80px, 16vw, 124px)",
              background: "linear-gradient(135deg, #EC5F36 0%, #F5A07A 55%, #D84E28 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              zIndex: 1,
              letterSpacing: "-4px",
              display: "block"
            },
            children: "404"
          }
        ),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: "absolute text-xl",
            style: {
              top: 6,
              right: -28,
              animation: "emojiFloat 3.5s ease-in-out infinite"
            },
            children: "🧹"
          }
        ),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: "absolute text-lg",
            style: {
              bottom: 2,
              left: -24,
              animation: "emojiFloat 4s 0.8s ease-in-out infinite"
            },
            children: "🏡"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        "h1",
        {
          className: "text-2xl font-extrabold text-textDark leading-snug mb-1.5",
          style: { fontFamily: "'Fraunces', serif" },
          children: [
            "We couldn’t find that page",
            " ",
            /* @__PURE__ */ jsx("em", { className: "text-primary not-italic", children: "Oops!" })
          ]
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "text-[13px] font-medium text-textLight leading-relaxed max-w-xs mb-6", children: "This page doesn't exist or was moved. Our helpers couldn't find it either." }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5 flex-wrap justify-center mb-6 w-full", children: [
        /* @__PURE__ */ jsxs(
          Link,
          {
            to: "/",
            className: "flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-extrabold text-[13px] no-underline transition-all duration-200 hover:-translate-y-0.5",
            style: {
              background: "linear-gradient(135deg, #EC5F36, #D84E28)",
              boxShadow: "0 5px 16px rgba(236,95,54,0.28)",
              fontFamily: "'Plus Jakarta Sans', sans-serif"
            },
            children: [
              /* @__PURE__ */ jsxs(
                "svg",
                {
                  width: "13",
                  height: "13",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2.5",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  children: [
                    /* @__PURE__ */ jsx("path", { d: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" }),
                    /* @__PURE__ */ jsx("polyline", { points: "9 22 9 12 15 12 15 22" })
                  ]
                }
              ),
              "Back to Home"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          Link,
          {
            to: "/contact",
            className: "flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-[13px] no-underline bg-white border-2 border-borderLight text-textDark transition-all duration-200 hover:border-primary hover:text-primary hover:-translate-y-0.5",
            style: {
              boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
              fontFamily: "'Plus Jakarta Sans', sans-serif"
            },
            children: [
              /* @__PURE__ */ jsx(
                "svg",
                {
                  width: "13",
                  height: "13",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2.5",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  children: /* @__PURE__ */ jsx("path", { d: "M22 16.92V19a2 2 0 01-2.18 2A19.79 19.79 0 013 5.18 2 2 0 015 3h2.09a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 10.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 17.92z" })
                }
              ),
              "Contact Us"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "w-full flex items-center gap-3 mb-4", children: [
        /* @__PURE__ */ jsx("div", { className: "flex-1 h-px bg-borderLight" }),
        /* @__PURE__ */ jsx("span", { className: "text-[10px] font-extrabold text-textLight uppercase tracking-widest whitespace-nowrap", children: "Browse services" }),
        /* @__PURE__ */ jsx("div", { className: "flex-1 h-px bg-borderLight" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-2 w-full", children: quickLinks.map((link) => /* @__PURE__ */ jsxs(
        Link,
        {
          to: link.href,
          className: "flex flex-col items-center gap-1 py-2.5 px-1 rounded-xl border-2 border-borderLight bg-bgLight text-textDark no-underline font-semibold text-[11px] transition-all duration-200 hover:border-primary hover:text-primary hover:-translate-y-0.5 hover:bg-white hover:shadow-sm",
          children: [
            /* @__PURE__ */ jsx("span", { className: "text-lg", children: link.icon }),
            link.label
          ]
        },
        link.label
      )) })
    ] }),
    /* @__PURE__ */ jsx("style", { children: `
        @keyframes blobFloat1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(28px,20px)} }
        @keyframes blobFloat2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-20px,-26px)} }
        @keyframes emojiFloat { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-8px) rotate(10deg)} }
      ` })
  ] });
}
export {
  NotFound as default
};
