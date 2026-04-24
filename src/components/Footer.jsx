import { Link } from "react-router-dom";

export default function Footer() {
  const WhatsAppIcon = () => (
    <svg viewBox="0 0 448 512" width="24" height="24" fill="currentColor">
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-23.2-115-67.1-157z" />
    </svg>
  )
  return (
    <>
      {/* MAIN FOOTER */}
      <footer className="bg-textDark text-white">
        <div className="max-w-7xl mx-auto px-6 pt-[4rem] pb-[1rem] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
          {/* BRAND */}
          <div>
            {/* <img src="./logoOnly.webp" alt="" width={90} height={112} /> */}
            <span className="text-2xl font-bold text-primary mb-4">
              Domestic Pro
            </span>

            <p className="text-gray-300 text-sm leading-relaxed">
              Hire verified baby caretakers, live-in support, cooking help,
              drivers, patient care and japa Help with
              confidence. Fast hiring. Background-checked professionals.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3 mt-5">
              <span className="bg-primary text-white text-xs px-3 py-1 rounded-full">
                Verified Staff
              </span>

              <span className="bg-primary text-white text-xs px-3 py-1 rounded-full">
                Trusted Platform
              </span>
            </div>
          </div>

          {/* SERVICES */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Services</h3>

            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <Link
                  to="/services/baby-caretaker"
                  className="hover:text-primary transition"
                >
                  Baby Caretaker
                </Link>
              </li>

              <li>
                <Link
                  to="/services/live-in-support"
                  className="hover:text-primary transition"
                >
                  Live-in Support
                </Link>
              </li>

              <li>
                <Link
                  to="/services/cooking-help"
                  className="hover:text-primary transition"
                >
                  Cooking Help
                </Link>
              </li>

              <li>
                <Link to="/services/drivers" className="hover:text-primary transition">
                  Drivers
                </Link>
              </li>
              <li>
                <Link
                  to="/services/patient-care"
                  className="hover:text-primary transition"
                >
                  Patient Care
                </Link>
              </li>
              <li>
                <Link
                  to="/services/japa"
                  className="hover:text-primary transition"
                >
                  Japa
                </Link>
              </li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Company</h3>

            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <Link to="/about" className="hover:text-primary transition">
                  About Us
                </Link>
              </li>

              <li>
                <Link to="/contact" className="hover:text-primary transition">
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:text-primary transition"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/refund-policy"
                  className="hover:text-primary transition"
                >
                  Refund Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/terms-and-conditions"
                  className="hover:text-primary transition"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Contact</h3>

            <ul className="space-y-3 text-sm text-gray-300">
              <li>support@domesticpro.in</li>
              <li>+91 92112 98139</li>
              <li>Gurugram, Haryana</li>
            </ul>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/+919211298139"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex
                max-w-[12.4rem]
                justify-center
                items-center
                mt-5
                bg-primary
                hover:bg-primaryHover
                text-white
                px-5
                py-2
                rounded-xl
                text-sm
                font-semibold
                transition
              "
            >
              <img src="./whatsapp.svg" alt="whatsapp icon" width={25} height={25} className="mr-2" /> Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-borderLight/20">
          <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>
              © {new Date().getFullYear()} DomesticPro. All rights reserved.
            </p>

            <div className="flex gap-6 mt-3 md:mt-0">
              <Link
                to="/privacy-policy"
                className="hover:text-primary transition"
              >
                Privacy Policy
              </Link>

              <Link
                to="/refund-policy"
                className="hover:text-primary transition"
              >
                Refund Policy
              </Link>
              <Link
                to="/terms-and-conditions"
                className="hover:text-primary transition"
              >
                Terms & Condition
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
      <a
        href="https://wa.me/+919211298139"
        target="_blank"
        rel="noopener noreferrer"
        className="
          fixed
          bottom-12
          right-6
          bg-[#25D366]
          hover:bg-[#25D366]
          text-white
          px-2
          py-3
          rounded-full
          shadow-lg
          font-semibold
          transition
          hover:scale-110
          z-50
        "
      >
        <img src="./whatsapp.svg" alt="whatsapp icon" width={40} height={40} />
      </a>
    </>
  );
}
