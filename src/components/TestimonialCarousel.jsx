import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Harpreet from "../assets/photo-1567532939604-b6b5b0db2604.avif"

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const CSS = `
  .swiper-button-next,
  .swiper-button-prev {
    color: #EC5F36 !important;
    width: 36px !important;
    height: 36px !important;
    
    border-radius: 50%;
   
  }
  .swiper-button-next::after,
  .swiper-button-prev::after {
    font-size: 13px !important;
    font-weight: 900;
  }
  .custom-pagination {
    display: flex !important;
    justify-content: center !important;
    margin-top: 24px !important;
    gap: 6px;
  }
  .custom-pagination .swiper-pagination-bullet {
    background: #F1E3DE !important;
    opacity: 1 !important;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    cursor: pointer;
  }
  .custom-pagination .swiper-pagination-bullet-active {
    background: #EC5F36 !important;
  }
`;

const testimonials = [
  { name: "Neelam", role: "Noida", rating: 5, image: "https://res.cloudinary.com/dto7bji6b/image/upload/f_auto,w_100/v1774349319/ChatGPT_Image_Mar_24_2026_04_14_13_PM_u4mgvt.webp", review: "Got a good cook within one day. They shared her full details before sending her. Very happy with the service." },
  { name: "Shweta", role: "Gurugram", rating: 5, image: "https://res.cloudinary.com/dto7bji6b/image/upload/f_auto,w_100/v1774350307/shweta_na7wnm.webp", review: "The nanny they sent is very caring and honest. They checked her background before sending. I feel safe leaving my child with her." },
  { name: "Vaishali", role: "Delhi", rating: 4, image: "https://res.cloudinary.com/dto7bji6b/image/upload/f_auto,w_100/v1774348576/ChatGPT_Image_Mar_24_2026_04_04_59_PMi_yw73ip.webp", review: "I told them my needs and they found the right maid for me. She cooks well and keeps the house clean. No complaints at all." },
  { name: "Lovina", role: "Delhi", rating: 5, image: "https://res.cloudinary.com/dto7bji6b/image/upload/f_auto,w_100/v1774349352/ChatGPT_Image_Mar_24_2026_04_14_13_PM_1_qkfs6r.webp", review: "Domestic Pro shared profiles with photos and work history. Easy to choose. Their team helped at every step. Hired in 2 days." },
  { name: "Nikita", role: "Noida", rating: 4, image: "https://res.cloudinary.com/dto7bji6b/image/upload/f_auto,w_100/v1774350236/nikita_z76hg7.webp", review: "Needed help quickly after shifting to a new house. They arranged a helper the same evening. She is still with us after 3 months." },
  { name: "Kavya", role: "Gurugram", rating: 5, image: "https://res.cloudinary.com/dto7bji6b/image/upload/f_auto,w_100/v1774350528/kavya_cotxbk.webp", review: "They sent a PDF with the helper's ID proof, past work, and skills. Very clear and easy to understand. Trusted the process fully." },
  { name: "Ruchika", role: "Noida", rating: 4, image: "https://res.cloudinary.com/dto7bji6b/image/upload/f_auto,w_100/v1774350497/ruchika_qgycrj.webp", review: "Had a bad experience with a local agent before. Domestic Pro was totally different — proper ID check, agreement, everything in writing. Very reliable." },
  { name: "Angel", role: "Delhi", rating: 5, image: "https://res.cloudinary.com/dto7bji6b/image/upload/f_auto,w_100/v1774350794/u_kaxpqp.webp", review: "I needed someone who is okay with pets and early mornings. They understood and sent the right match. Saved me a lot of time." },
  { name: "Harpreet", role: "Delhi", rating: 5, image: Harpreet, review: "My mother-in-law needed a helper for daily care. Domestic Pro sent someone with experience in looking after old people. She is very gentle and helpful." },
  { name: "Armaan Malik", role: "Gurugram", rating: 4, image: "https://res.cloudinary.com/dto7bji6b/image/upload/f_auto,w_100/v1774348004/photo-1500648767791-00dcc994a43e_xksnqy.jpg", review: "Did not have time to meet many candidates. They shortlisted 3 good profiles, set up calls in one day, and the cook joined within a week. Very smooth." },
  { name: "Ritika", role: "Delhi", rating: 5, image: "https://res.cloudinary.com/dto7bji6b/image/upload/f_auto,w_100/v1774348101/photo-1607746882042-944635dfe10e_tvptd9.jpg", review: "Our maid had to leave suddenly. Domestic Pro sent a replacement in 3 days. That is the kind of support every family needs." },
  { name: "Urvashi", role: "Noida", rating: 4, image: "https://res.cloudinary.com/dto7bji6b/image/upload/f_auto,w_100/v1774350671/ChatGPT_Image_Mar_24_2026_04_40_12_PM_kjvigh.webp", review: "Took their Japa Maid service after delivery. The helper was trained and knew how to handle a newborn. I could rest and recover without worry." },
];



export default function TestimonialCarousel() {
  const swiperRef = useRef(null);

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
      <div
        className="max-w-7xl mx-auto relative"
        onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
        onMouseLeave={() => swiperRef.current?.autoplay?.start()}
      >
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          loop={true}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{ clickable: true, el: ".custom-pagination" }}
          navigation={true}
          spaceBetween={24}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          onSwiper={(swiper) => { swiperRef.current = swiper; }}

          className="pb-0"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index} className="flex h-auto">
              <div className="bg-white rounded-2xl p-7 border border-borderLight hover:border-primary/30 hover:shadow-[0_8px_32px_rgba(236,95,54,0.10)] transition-all duration-300 flex flex-col justify-between h-full min-h-[280px] w-full">
                {/* stars */}
                <div className="flex items-center gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} viewBox="0 0 20 20" fill={i < item.rating ? "#EC5F36" : "#E5E7EB"} className="w-4 h-4">
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

        {/* pagination dots — rendered outside swiper so they never overlap cards */}
        <div className="custom-pagination mt-6" />
      </div>
    </section>
  );
}