import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import { offers } from "./offersData";
import OfferCard from "./OfferCard";

const OfferCarousel = ({ isDarkMode }) => {
  return (
    <section id="offers" className={`scroll-mt-24 py-24 transition-colors duration-300 ${isDarkMode ? "bg-slate-950" : "bg-slate-50"}`}>
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-12 text-center">

          <span className={`rounded-full px-5 py-2 text-sm font-semibold ${isDarkMode ? "bg-blue-900 text-blue-100" : "bg-blue-100 text-blue-900"}`}>
            % BEST OFFERS
          </span>

          <h2 className={`mt-5 text-4xl font-bold ${isDarkMode ? "text-slate-100" : "text-gray-900"}`}>
            Explore deals, offers,
            <br />
            health updates & more
          </h2>

          <p className={`mx-auto mt-5 max-w-2xl text-lg ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
            Save more on consultations, medicines, diagnostics,
            and healthcare packages.
          </p>

        </div>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 1,
            },
            1024: {
              slidesPerView: 2,
            },
          }}
        >
          {offers.map((offer) => (
            <SwiperSlide key={offer.id}>
              <OfferCard {...offer} />
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
};

export default OfferCarousel;