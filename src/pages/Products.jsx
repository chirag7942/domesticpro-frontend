// import { useState } from "react";
// import ProductCard from "../components/ProductCard";

// import aboutHero from "../assets/nanny.webp";
// import whoWeAre from "../assets/house-keeper.jpg";
// import logoImg from "../assets/cook.jpg";
// import missionImg from "../assets/driver.jpg";
// import helper1 from "../assets/cook.jpg";
// import helper2 from "../assets/driver.jpg";
// import helper3 from "../assets/house-keeper.jpg";
// import HeroWizard from "../components/HeroWizard";

// export default function Products() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <>
//       {/* ================= PRODUCTS SECTION ================= */}
//       <section className="py-24 bg-bglight">
//         <div className="max-w-7xl mx-auto px-6">
//           {/* Heading */}
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold text-heading mb-4">
//               Our Professional Services
//             </h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               Trusted and verified domestic professionals for every household
//               need.
//             </p>
//           </div>

//           {/* 2x2 Grid */}
//           <div className="grid md:grid-cols-2 gap-14">
//             <ProductCard
//               image={aboutHero}
//               title="Verified Professional Nannies"
//               subtitle="(Female Only)"
//               points={[
//                 "Infant & newborn care",
//                 "Child supervision & safety",
//                 "Feeding, bathing & hygiene support",
//                 "Engaging learning & play activities",
//               ]}
//               description="Experienced and background-verified nannies providing loving, attentive, and safe childcare support for your family."
//               link="/products/nanny"
//             />

//             <ProductCard
//               image={whoWeAre}
//               title="24-Hour Live-In Housekeepers"
//               subtitle="(Male / Female Available)"
//               points={[
//                 "Complete home cleaning & maintenance",
//                 "Kitchen assistance & utensil care",
//                 "Laundry, ironing & wardrobe management",
//                 "Daily organization & hygiene upkeep",
//               ]}
//               description="Trusted and background-verified live-in housekeepers ensuring round-the-clock cleanliness, comfort, and smooth household management."
//               link="/products/househelp"
//             />

//             <ProductCard
//               image={logoImg}
//               title="Professional Home Cooks"
//               subtitle="(Male / Female Available)"
//               points={[
//                 "Veg & non-veg meal preparation",
//                 "Customized diet & nutrition plans",
//                 "Kitchen hygiene & ingredient management",
//                 "Special occasion & family event cooking",
//               ]}
//               description="Experienced and verified cooks delivering fresh, hygienic, and delicious meals tailored to your family's taste and dietary needs."
//               link="/products/cook"
//             />

//             <ProductCard
//               image={missionImg}
//               title="Professional Drivers"
//               subtitle="(Male Only)"
//               points={[
//                 "Personal & family driving services",
//                 "Safe school drop & pick-up",
//                 "Outstation & long-distance travel",
//                 "Vehicle maintenance & basic upkeep",
//               ]}
//               description="Verified and experienced drivers ensuring safe, punctual, and comfortable travel for your family and business needs."
//               link="/products/driver"
//             />
//           </div>
//         </div>
//       </section>

//       {/* ================= HIRE SECTION ================= */}
//       <section className="w-full pb-20 pt-10">
//         <div
//           className="relative w-full min-h-[500px] md:min-h-[400px] flex items-center overflow-hidden shadow-inner"
//           style={{
//             backgroundImage: `url(https://res.cloudinary.com/dhtzknkdr/image/upload/v1773031893/assisstance_funr5n.avif)`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             backgroundRepeat: "no-repeat",
//           }}
//         >
//           <div className="absolute inset-0 bg-white/10 md:bg-transparent"></div>

//           <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-end">
//             <div className="md:w-[60%] text-center md:text-left mb-8 md:mb-0 md:pr-16">
//               <h2 className="text-3xl md:text-5xl font-bold text-[#0A2E5C] mb-5 leading-tight">
//                 Hire Verified <br className="hidden md:block" /> Helpers with
//                 Confidence
//               </h2>

//               <p className="text-gray-700 font-medium leading-relaxed text-lg">
//                 At DomesticPro, we carefully verify, screen, and manage every
//                 helper before placement. We match you with trusted professionals
//                 from our network — ensuring safety, reliability, and complete
//                 peace of mind.
//               </p>
//             </div>

//             <div className="flex flex-col items-center gap-8 bg-white/60 md:bg-transparent p-6 md:p-0 rounded-2xl backdrop-blur-sm md:backdrop-blur-none">
//               {/* Helper Avatars */}
//               <div className="flex -space-x-4">
//                 <div className="w-14 h-14 rounded-full border-2 border-white overflow-hidden shadow-md">
//                   <img
//                     src={helper1}
//                     alt="Helper"
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <div className="w-14 h-14 rounded-full border-2 border-white overflow-hidden shadow-md">
//                   <img
//                     src={helper2}
//                     alt="Helper"
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <div className="w-14 h-14 rounded-full border-2 border-white overflow-hidden shadow-md">
//                   <img
//                     src={helper3}
//                     alt="Helper"
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               </div>

//               {/* Modal Trigger Button */}
//               <button onClick={() => setIsOpen(true)} className="btn-primary">
//                 Hire Now
//                 <span className="text-2xl ml-2 leading-none">›</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       <HeroWizard asModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
//     </>
//   );
// }
