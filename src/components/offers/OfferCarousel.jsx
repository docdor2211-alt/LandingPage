import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import { offers } from "./offersData";
import OfferCard from "./OfferCard";

const OfferCarousel = ({ isDarkMode }) => {
  return (
    <section
      id="offers"
      className={`scroll-mt-24 py-20 transition-colors duration-300 ${
        isDarkMode ? "bg-[#060B17]" : "bg-slate-50"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <span
            className={`inline-flex items-center rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-wider ${
              isDarkMode
                ? "border-sky-500/30 bg-sky-500/10 text-sky-300"
                : "border-sky-200 bg-sky-50 text-sky-700"
            }`}
          >
            Best Offers
          </span>

          <h2
            className={`mt-4 text-3xl sm:text-4xl font-extrabold ${
              isDarkMode ? "text-white" : "text-slate-900"
            }`}
          >
            Explore deals, offers, health updates &amp; more
          </h2>

          <p
            className={`mx-auto mt-4 max-w-2xl text-base sm:text-lg ${
              isDarkMode ? "text-slate-400" : "text-slate-600"
            }`}
          >
            Save more on consultations, medicines, diagnostics, and healthcare packages.
          </p>
        </div>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={24}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 1 },
            1024: { slidesPerView: 2 },
          }}
        >
          {offers.map((offer) => (
            <SwiperSlide key={offer.id}>
              <OfferCard {...offer} isDarkMode={isDarkMode} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default OfferCarousel;
