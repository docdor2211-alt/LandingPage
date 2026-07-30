import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { offers } from "./offersData";
import OfferCard from "./OfferCard";

const OfferCarousel = ({ isDarkMode }) => {
  return (
    <section className={`py-24 transition-colors duration-300 ${isDarkMode ? "bg-slate-950" : "bg-slate-50"}`}>
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-12 text-center">

          <span className={`rounded-full px-5 py-2 text-sm font-semibold ${isDarkMode ? "bg-slate-800 text-slate-200" : "bg-slate-100 text-slate-700"}`}>
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
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
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