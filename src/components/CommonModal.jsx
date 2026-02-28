import { useEffect } from "react";

export default function CommonModal({
  isOpen,
  onClose,
  children,
  title,
  maxWidth = "max-w-xl",
}) {
  // Close on ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      {/* BACKDROP */}
      <div
        onClick={onClose}
        className="
          absolute inset-0
          bg-black/50
          backdrop-blur-sm
          opacity-100
          animate-fadeIn
        "
      />

      {/* MODAL */}
      <div
        className={`
          relative
          bg-white
          rounded-2xl
          shadow-2xl
          w-full
          ${maxWidth}
          mx-4
          animate-slideUp
        `}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center p-5 border-b border-borderLight">
          <h2 className="text-lg font-semibold text-textDark">{title}</h2>

          <button
            onClick={onClose}
            className="
              text-textLight
              hover:text-textDark
              text-xl
              transition
            "
          >
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="p-5">{children}</div>
      </div>

      {/* ANIMATION STYLES */}
      <style>
        {`
          @keyframes fadeIn {
            from {opacity:0}
            to {opacity:1}
          }

          @keyframes slideUp {
            from {
              transform: translateY(40px);
              opacity:0;
            }
            to {
              transform: translateY(0);
              opacity:1;
            }
          }

          .animate-fadeIn {
            animation: fadeIn 0.25s ease;
          }

          .animate-slideUp {
            animation: slideUp 0.3s ease;
          }
        `}
      </style>
    </div>
  );
}
