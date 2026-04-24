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

          {/* spinner + logo */}
          <div className="relative w-16 h-16 flex items-center justify-center">
            {/* outer ring */}
            <div
              className="dp-spinner absolute inset-0 rounded-full"
              style={{
                border: "2.5px solid #F1E3DE",
                borderTopColor: "#EC5F36",
              }}
            />
            {/* logo in centre */}
            <img
              src="./logoOnly.webp"
              alt="Domestic Pro"
              className="w-9 h-9 object-contain"
            />
          </div>

          {/* label */}
          <p className="text-xs font-bold text-textLight tracking-widest uppercase">
            Loading…
          </p>
        </div>
      </div>
    </>
  );
}
