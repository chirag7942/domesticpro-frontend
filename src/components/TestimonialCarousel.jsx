import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Noida",
    image: "https://i.pravatar.cc/150?img=11",
    review:
      "Exceptional service. Found a full-time cook within 24 hours. Extremely professional process.",
  },
  {
    name: "Neha Verma",
    role: "Delhi",
    image: "https://i.pravatar.cc/150?img=32",
    review:
      "Very trustworthy nanny. Background verification gave complete peace of mind.",
  },
  {
    name: "Amit Singh",
    role: "Gurgaon",
    image: "https://i.pravatar.cc/150?img=53",
    review: "Premium experience. Dedicated support team helped throughout.",
  },
  {
    name: "Priya Kapoor",
    role: "Noida",
    image: "https://i.pravatar.cc/150?img=24",
    review: "Fast hiring and excellent candidate quality.",
  },
  {
    name: "Rohit Mehta",
    role: "Delhi",
    image: "https://i.pravatar.cc/150?img=15",
    review: "Driver was very professional and experienced.",
  },
  {
    name: "Sneha Gupta",
    role: "Gurgaon",
    image: "https://i.pravatar.cc/150?img=45",
    review: "Best platform for hiring verified domestic help.",
  },
  {
    name: "Karan Malhotra",
    role: "Noida",
    image: "https://i.pravatar.cc/150?img=61",
    review: "Smooth process and excellent service quality.",
  },
  {
    name: "Simran Kaur",
    role: "Delhi",
    image: "https://i.pravatar.cc/150?img=47",
    review: "Highly reliable and professional team.",
  },
];

export default function TestimonialCarousel() {
  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        loop={true}
        centeredSlides={false}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        spaceBetween={30}
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {testimonials.map((item, index) => (
          <SwiperSlide key={index} className="flex">
            <div
              className="
              bg-white
              rounded-3xl
              p-8
              shadow-sm
              hover:shadow-xl
              transition
              duration-500
              flex flex-col
              justify-between
              h-[320px]
              w-full
            "
            >
              {/* Top Section */}
              <div>
                <div className="flex mb-4 text-primary text-lg">★★★★★</div>

                <p className="text-textLight leading-relaxed line-clamp-4">
                  "{item.review}"
                </p>
              </div>

              {/* Bottom Section */}
              <div className="flex items-center gap-4 mt-6">
                <img
                  src={item.image}
                  alt={item.name}
                  className="
                    w-14 h-14
                    rounded-full
                    object-cover
                    border-2 border-primary/20
                  "
                />

                <div>
                  <h4 className="font-semibold text-textDark">{item.name}</h4>
                  <p className="text-sm text-textLight">{item.role}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Arrow Styling */}
      <style>
        {`
          .swiper-button-next,
          .swiper-button-prev {
            color: #eb6037;
          }

          .swiper-pagination-bullet-active {
            background: #eb6037;
          }
        `}
      </style>
    </div>
  );
}
