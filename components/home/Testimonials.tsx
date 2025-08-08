// components/Testimonials.tsx
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

/**
 * Testimonials slider using Swiper.
 * - small set of demo testimonials
 */

const items = [
  {
    name: "سارا",
    text: "Fire DNS سرعت اینترنت منو به طرز چشمگیری بهتر کرد. عالیه!",
  },
  { name: "مهدی", text: "سادگی نصب و مصرف کم CPU باعث شد همیشه روش باشه." },
  { name: "نگار", text: "تبلیغ‌ها حذف شدن و سایت‌ها سریع‌تر باز میشن." },
];

export default function Testimonials() {
  return (
    <section className="container mx-auto py-20 px-6">
      <h3 className="text-2xl font-bold text-white mb-8">نظر کاربران</h3>

      <div className="max-w-3xl mx-auto">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 3500 }}
          pagination={{ clickable: true }}
          loop
        >
          {items.map((it, idx) => (
            <SwiperSlide key={idx}>
              <div className="p-6 rounded-2xl bg-white/3 border border-white/6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-orange-400 flex items-center justify-center text-black font-bold">
                    {it.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold">{it.name}</div>
                    <div className="text-sm text-gray-300">کاربر Fire DNS</div>
                  </div>
                </div>

                <p className="mt-4 text-gray-200">{it.text}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
