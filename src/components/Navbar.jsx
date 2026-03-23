import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import {
  Phone,
  Mail,
  Facebook,
  Instagram,
  Linkedin,
  Home,
  Baby,
  Heart,
  ChefHat,
  BedDouble,
  Stethoscope,
  Clock,
  Car,
} from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };
  const closeServices = () => {
    setServicesOpen(false);
  };

  return (
    <>
      {/* TOP STRIP */}
      <div className="bg-primary sticky top-0  z-50 text-white text-sm hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-2">
          {/* LEFT SIDE */}
          <div className="flex items-center gap-6">
            <a
              href="tel:+919211298139"
              className="flex items-center gap-2 hover:opacity-80 transition"
            >
              <Phone size={16} />
              +91 92112 98139
            </a>

            <a
              href="mailto:info@domesticpro.in"
              className="flex items-center gap-2 hover:opacity-80 transition"
            >
              <Mail size={16} />
              support@domesticpro.in
            </a>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">
            <a href="#" className="hover:opacity-80 transition">
              <Facebook size={16} />
            </a>
            <a href="#" className="hover:opacity-80 transition">
              <Instagram size={16} />
            </a>
            <a href="#" className="hover:opacity-80 transition">
              <Linkedin size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <nav className="bg-white sticky md:top-[2.25rem] top-0 z-50 border-b border-borderLight">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-20 px-4 sm:px-6">
          {/* LOGO */}
          <Link to="/" className="flex items-center h-full">
            <img
              src="/updatedLogo.png"
              alt="Domestic Pro Logo"
              className="h-full w-[11rem]"
            />
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex gap-8 items-center font-medium">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:text-primary transition-colors duration-200 ${isActive ? "text-primary font-semibold" : ""
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `hover:text-primary transition-colors duration-200 ${isActive ? "text-primary font-semibold" : ""
                }`
              }
            >
              About Us
            </NavLink>

            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className="hover:text-primary transition-colors duration-200 font-medium">
                Our Services
              </button>

              {/* DROPDOWN MENU */}
              <div
                className={`absolute left-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-borderLight transition-all duration-200 ${servicesOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2"
                  }`}
              >
                <div className="flex flex-col py-3 text-sm">
                  <NavLink
                    to="/all-rounder"
                    onClick={closeServices}
                    className={({ isActive }) =>
                      `px-4 py-2 transition-all duration-300 
         hover:bg-bgLight hover:scale-105 hover:shadow-md 
         mx-2 rounded-lg flex items-center gap-2 group
         ${isActive
                        ? "text-primary font-semibold bg-bgLight"
                        : "hover:text-primary"
                      }`
                    }
                  >
                    <Home
                      size={16}
                      className="transition-colors duration-300 group-hover:text-primary"
                    />
                    All-rounder Help
                  </NavLink>

                  <NavLink
                    to="/baby-caretaker"
                    onClick={closeServices}
                    className={({ isActive }) =>
                      `px-4 py-2 transition-all duration-300 
         hover:bg-bgLight hover:scale-105 hover:shadow-md 
         mx-2 rounded-lg flex items-center gap-2 group
         ${isActive
                        ? "text-primary font-semibold bg-bgLight"
                        : "hover:text-primary"
                      }`
                    }
                  >
                    <Baby
                      size={16}
                      className="transition-colors duration-300 group-hover:text-primary"
                    />
                    Baby Caretaker
                  </NavLink>

                  <NavLink
                    to="/japa"
                    onClick={closeServices}
                    className={({ isActive }) =>
                      `px-4 py-2 transition-all duration-300 
         hover:bg-bgLight hover:scale-105 hover:shadow-md 
         mx-2 rounded-lg flex items-center gap-2 group
         ${isActive
                        ? "text-primary font-semibold bg-bgLight"
                        : "hover:text-primary"
                      }`
                    }
                  >
                    <Heart
                      size={16}
                      className="transition-colors duration-300 group-hover:text-primary"
                    />
                    Japa
                  </NavLink>

                  <NavLink
                    to="/cooking-help"
                    onClick={closeServices}
                    className={({ isActive }) =>
                      `px-4 py-2 transition-all duration-300 
         hover:bg-bgLight hover:scale-105 hover:shadow-md 
         mx-2 rounded-lg flex items-center gap-2 group
         ${isActive
                        ? "text-primary font-semibold bg-bgLight"
                        : "hover:text-primary"
                      }`
                    }
                  >
                    <ChefHat
                      size={16}
                      className="transition-colors duration-300 group-hover:text-primary"
                    />
                    Cooking Help
                  </NavLink>

                  <NavLink
                    to="/live-in-support"
                    onClick={closeServices}
                    className={({ isActive }) =>
                      `px-4 py-2 transition-all duration-300 
         hover:bg-bgLight hover:scale-105 hover:shadow-md 
         mx-2 rounded-lg flex items-center gap-2 group
         ${isActive
                        ? "text-primary font-semibold bg-bgLight"
                        : "hover:text-primary"
                      }`
                    }
                  >
                    <BedDouble
                      size={16}
                      className="transition-colors duration-300 group-hover:text-primary"
                    />
                    Live-in Support
                  </NavLink>

                  <NavLink
                    to="/patient-care"
                    onClick={closeServices}
                    className={({ isActive }) =>
                      `px-4 py-2 transition-all duration-300 
         hover:bg-bgLight hover:scale-105 hover:shadow-md 
         mx-2 rounded-lg flex items-center gap-2 group
         ${isActive
                        ? "text-primary font-semibold bg-bgLight"
                        : "hover:text-primary"
                      }`
                    }
                  >
                    <Stethoscope
                      size={16}
                      className="transition-colors duration-300 group-hover:text-primary"
                    />
                    Patient Care
                  </NavLink>

                  <NavLink
                    to="/on-demand"
                    onClick={closeServices}
                    className={({ isActive }) =>
                      `px-4 py-2 transition-all duration-300 
         hover:bg-bgLight hover:scale-105 hover:shadow-md 
         mx-2 rounded-lg flex items-center gap-2 group
         ${isActive
                        ? "text-primary font-semibold bg-bgLight"
                        : "hover:text-primary"
                      }`
                    }
                  >
                    <Clock
                      size={16}
                      className="transition-colors duration-300 group-hover:text-primary"
                    />
                    On Demand
                  </NavLink>

                  <NavLink
                    to="/drivers"
                    onClick={closeServices}
                    className={({ isActive }) =>
                      `px-4 py-2 transition-all duration-300 
         hover:bg-bgLight hover:scale-105 hover:shadow-md 
         mx-2 rounded-lg flex items-center gap-2 group
         ${isActive
                        ? "text-primary font-semibold bg-bgLight"
                        : "hover:text-primary"
                      }`
                    }
                  >
                    <Car
                      size={16}
                      className="transition-colors duration-300 group-hover:text-primary"
                    />
                    Drivers
                  </NavLink>
                </div>
              </div>
            </div>

            <NavLink
              to="/refer"
              className={({ isActive }) =>
                `hover:text-primary transition-colors duration-200 ${isActive ? "text-primary font-semibold" : ""
                }`
              }
            >
              Refer Us
            </NavLink>

            <NavLink
              to="/pricing"
              className={({ isActive }) =>
                `hover:text-primary transition-colors duration-200 ${isActive ? "text-primary font-semibold" : ""
                }`
              }
            >
              Pricing
            </NavLink>

            <Link to="/contact" className="btn-primary">
              Contact Now
            </Link>
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-bgLight transition"
          >
            {!open ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </button>
        </div>

        {/* MOBILE SIDEBAR */}
        <div
          className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50
              transform transition-transform duration-300 ease-in-out
              ${open ? "translate-x-0" : "translate-x-full"}
              md:hidden`}
        >
          <div className="p-6 flex flex-col h-full">
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="self-end mb-6 text-xl"
            >
              ✕
            </button>

            <div className="flex flex-col space-y-4 font-medium">
              <NavLink
                to="/"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 group hover:text-primary transition-colors duration-300"
              >
                Home
              </NavLink>

              <NavLink
                to="/about"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 group hover:text-primary transition-colors duration-300"
              >
                About Us
              </NavLink>

              <div>
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className="w-full text-left flex items-center gap-2 hover:text-primary transition-colors duration-300"
                >
                  Our Services
                </button>

                {servicesOpen && (
                  <div className="ml-4 mt-3 flex flex-col space-y-3 text-sm">
                    <NavLink
                      to="/all-rounder"
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-2 transition-colors duration-300 ${isActive
                          ? "text-primary font-semibold"
                          : "hover:text-primary"
                        }`
                      }
                    >
                      <Home size={16} />
                      All-rounder Help
                    </NavLink>

                    <NavLink
                      to="/baby-caretaker"
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-2 transition-colors duration-300 ${isActive
                          ? "text-primary font-semibold"
                          : "hover:text-primary"
                        }`
                      }
                    >
                      <Baby size={16} />
                      Baby Caretaker
                    </NavLink>

                    <NavLink
                      to="/japa"
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-2 transition-colors duration-300 ${isActive
                          ? "text-primary font-semibold"
                          : "hover:text-primary"
                        }`
                      }
                    >
                      <Heart size={16} />
                      Japa
                    </NavLink>

                    <NavLink
                      to="/cooking-help"
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-2 transition-colors duration-300 ${isActive
                          ? "text-primary font-semibold"
                          : "hover:text-primary"
                        }`
                      }
                    >
                      <ChefHat size={16} />
                      Cooking Help
                    </NavLink>

                    <NavLink
                      to="/live-in-support"
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-2 transition-colors duration-300 ${isActive
                          ? "text-primary font-semibold"
                          : "hover:text-primary"
                        }`
                      }
                    >
                      <BedDouble size={16} />
                      Live-in Support
                    </NavLink>

                    <NavLink
                      to="/patient-care"
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-2 transition-colors duration-300 ${isActive
                          ? "text-primary font-semibold"
                          : "hover:text-primary"
                        }`
                      }
                    >
                      <Stethoscope size={16} />
                      Patient Care
                    </NavLink>

                    <NavLink
                      to="/on-demand"
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-2 transition-colors duration-300 ${isActive
                          ? "text-primary font-semibold"
                          : "hover:text-primary"
                        }`
                      }
                    >
                      <Clock size={16} />
                      On Demand
                    </NavLink>

                    <NavLink
                      to="/drivers"
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-2 transition-colors duration-300 ${isActive
                          ? "text-primary font-semibold"
                          : "hover:text-primary"
                        }`
                      }
                    >
                      <Car size={16} />
                      Drivers
                    </NavLink>
                  </div>
                )}
              </div>

              <NavLink
                to="/refer"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 group hover:text-primary transition-colors duration-300"
              >
                Refer Us
              </NavLink>

              <NavLink
                to="/pricing"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 group hover:text-primary transition-colors duration-300"
              >
                Pricing
              </NavLink>

              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="btn-primary w-full mt-6 text-center"
              >
                Contact Now
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
