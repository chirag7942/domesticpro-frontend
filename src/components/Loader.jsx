/**
 * Loader.jsx
 *
 * Full-screen loading overlay.
 *
 * IMPORTANT: Do NOT use this as a <Suspense fallback>.
 * It will cause hydration mismatches and the "homepage stays visible" bug.
 *
 * Use this only for:
 * - Explicit async operations (form submission, data fetching)
 * - Route-level loading states triggered by useNavigation()
 *
 * For Suspense fallback, use null to preserve SSG server HTML.
 */

const CSS = `
  @keyframes dp-spin {
    to { transform: rotate(360deg); }
  }
  .dp-spinner {
    animation: dp-spin 0.85s linear infinite;
  }
`;

export default function Loader() {
  return (
    <>
      <style>{CSS}</style>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-5">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <div
              className="dp-spinner absolute inset-0 rounded-full"
              style={{
                border: "2.5px solid #F1E3DE",
                borderTopColor: "#EC5F36",
              }}
            />
            <img
              src="/logoOnly.webp"
              alt="Domestic Pro"
              className="w-9 h-9 object-contain"
            />
          </div>
          <p className="text-xs font-bold text-textLight tracking-widest uppercase">
            Loading…
          </p>
        </div>
      </div>
    </>
  );
}