import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { FiChevronLeft, FiChevronRight, FiPercent } from "react-icons/fi";

import "swiper/css";

import { healthHighlights } from "./highlightsData";
import HighlightCard from "./HighlightCard";

const HealthHighlights = ({ isDarkMode, onOpenCarePlan }) => {
  const [swiperRef, setSwiperRef] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      id="health-packages"
      className={`scroll-mt-20 py-20 sm:py-24 transition-colors duration-300 ${
        isDarkMode ? "bg-[#060B17]" : "bg-slate-50/70"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] ${
                isDarkMode
                  ? "border-sky-500/30 bg-sky-500/10 text-sky-300"
                  : "border-sky-200 bg-sky-50 text-sky-700"
              }`}
            >
              <FiPercent size={12} className="text-sky-500" />
              <span>Best Care Offers</span>
            </span>

            <h2
              className={`mt-4 text-3xl font-extrabold sm:text-4xl ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}
            >
              Explore Deals, Diagnostics &amp; Care Packages
            </h2>

            <p
              className={`mt-3 max-w-xl text-base leading-relaxed ${
                isDarkMode ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Save on first-time consultations, doorstep NABL diagnostics, authentic medicines,
              and family health plans.
            </p>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center gap-2.5 self-start md:self-auto">
            <button
              type="button"
              onClick={() => swiperRef?.slidePrev()}
              aria-label="Previous offer"
              className={`flex h-11 w-11 items-center justify-center rounded-xl border transition ${
                isDarkMode
                  ? "border-slate-700 bg-slate-900 text-slate-200 hover:border-sky-500/50 hover:text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-sky-400 shadow-xs"
              }`}
            >
              <FiChevronLeft size={19} />
            </button>
            <button
              type="button"
              onClick={() => swiperRef?.slideNext()}
              aria-label="Next offer"
              className={`flex h-11 w-11 items-center justify-center rounded-xl border transition ${
                isDarkMode
                  ? "border-slate-700 bg-slate-900 text-slate-200 hover:border-sky-500/50 hover:text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-sky-400 shadow-xs"
              }`}
            >
              <FiChevronRight size={19} />
            </button>
          </div>
        </div>

        <Swiper
          onSwiper={setSwiperRef}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          modules={[Autoplay]}
          spaceBetween={24}
          autoplay={{
            delay: 4200,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 1 },
            1024: { slidesPerView: 2 },
          }}
        >
          {healthHighlights.map((item) => (
            <SwiperSlide key={item.id}>
              <HighlightCard
                {...item}
                isDarkMode={isDarkMode}
                onOpenCarePlan={onOpenCarePlan}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Slide Progress Bars */}
        <div className="mt-7 flex items-center justify-center gap-2">
          {healthHighlights.map((item, idx) => {
            const active = idx === activeIndex;
            return (
              <button
                key={item.id}
                type="button"
                aria-label={`View offer ${idx + 1}: ${item.title}`}
                onClick={() => swiperRef?.slideToLoop(idx)}
                className={`h-1 rounded-sm transition-all duration-300 ${
                  active
                    ? "w-10 bg-sky-500"
                    : isDarkMode
                      ? "w-4 bg-slate-700 hover:bg-slate-600"
                      : "w-4 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HealthHighlights;
