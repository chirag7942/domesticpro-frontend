import loader from "../assets/logoOnly.png";
export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-white/30 z-50">
      <div className="relative flex items-center justify-center">
        {/* Rotating Ring */}
        <div className="absolute w-16 h-16 border-2 border-black border-t-primary rounded-full animate-spin"></div>

        {/* Logo */}
        <img src={loader} alt="Logo" className="w-10 h-8 object-contain" />
      </div>
    </div>
  );
}
