import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

/* ── only Swiper overrides — Tailwind has no API into Swiper's internal classes ── */
const CSS = `
  .swiper-button-next,
  .swiper-button-prev {
    color: #EC5F36 !important;
    width: 36px !important;
    height: 36px !important;
    background: white;
    border-radius: 50%;
    box-shadow: 0 2px 10px rgba(0,0,0,0.10);
  }
  .swiper-button-next::after,
  .swiper-button-prev::after {
    font-size: 13px !important;
    font-weight: 900;
  }
  .swiper-pagination-bullet { background: #F1E3DE !important; opacity: 1 !important; }
  .swiper-pagination-bullet-active { background: #EC5F36 !important; }
`;

const testimonials = [
  { name: "Rahul Sharma", role: "Noida", image: "https://i.pravatar.cc/150?img=11", review: "Exceptional service. Found a full-time cook within 24 hours. Extremely professional process." },
  { name: "Neha Verma", role: "Delhi", image: "https://i.pravatar.cc/150?img=32", review: "Very trustworthy nanny. Background verification gave complete peace of mind." },
  { name: "Amit Singh", role: "Gurugram", image: "https://i.pravatar.cc/150?img=53", review: "Premium experience. Dedicated support team helped throughout." },
  { name: "Priya Kapoor", role: "Noida", image: "https://i.pravatar.cc/150?img=24", review: "Fast hiring and excellent candidate quality." },
  { name: "Rohit Mehta", role: "Delhi", image: "https://i.pravatar.cc/150?img=15", review: "Driver was very professional and experienced." },
  { name: "Sneha Gupta", role: "Gurugram", image: "https://i.pravatar.cc/150?img=45", review: "Best platform for hiring verified domestic help." },
  { name: "Karan Malhotra", role: "Noida", image: "https://i.pravatar.cc/150?img=61", review: "Smooth process and excellent service quality." },
  { name: "Simran Kaur", role: "Delhi", image: "https://i.pravatar.cc/150?img=47", review: "Highly reliable and professional team." },
];

export default function TestimonialCarousel() {
  return (
    <section className="bg-bgLight py-20 px-6">
      <style>{CSS}</style>

      {/* ── HEADING ── */}
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-textDark mb-4">
          Trusted by hundreds of households
        </h2>
        <p className="text-textLight text-lg max-w-xl mx-auto leading-relaxed">
          Real stories from families who found their perfect helper through Domestic Pro.
        </p>
      </div>

      {/* ── CAROUSEL ── */}
      <div className="max-w-7xl mx-auto relative">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          loop={true}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          spaceBetween={24}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-10"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index} className="flex h-auto">
              <div className="bg-white rounded-2xl p-7 border border-borderLight hover:border-primary/30 hover:shadow-[0_8px_32px_rgba(236,95,54,0.10)] transition-all duration-300 flex flex-col justify-between h-full min-h-[280px] w-full">

                {/* stars */}
                <div className="flex items-center gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} viewBox="0 0 20 20" fill="#EC5F36" className="w-4 h-4">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* review */}
                <p className="text-sm text-textLight leading-relaxed line-clamp-4 flex-1 mb-5">
                  "{item.review}"
                </p>

                {/* author */}
                <div className="flex items-center gap-3 pt-4 border-t border-borderLight">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-primary/20 flex-shrink-0"
                  />
                  <div>
                    <p className="text-sm font-bold text-textDark">{item.name}</p>
                    <p className="text-xs text-textLight">{item.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}