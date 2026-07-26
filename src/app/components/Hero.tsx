"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
  {
    title: "Learn Any Skill.",
    highlight: "Teach What You Know.",
    subtitle: "Connect with experts, share your knowledge, and grow together.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "From Beginner",
    highlight: "To Master.",
    subtitle: "Find mentors and learners in hundreds of skills worldwide.",
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Your Skills,",
    highlight: "Someone's Dream.",
    subtitle: "Turn what you know into a way to help others succeed.",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80",
  },
];

export default function Hero() {
  return (
    <section className="relative h-[70vh] overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="relative h-full w-full hero-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              {/* Background image */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover"
              />

              {/* Pink-purple gradient overlay for readability + theme */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-fuchsia-800/60 to-pink-600/50" />

              {/* Content */}
              <div className="relative h-full flex items-center justify-center px-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center max-w-2xl"
                >
                  <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-lg">
                    {slide.title}
                  </h1>
                  <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-pink-300 to-fuchsia-200 bg-clip-text text-transparent mb-4 drop-shadow-lg">
                    {slide.highlight}
                  </h1>
                  <p className="text-lg text-purple-50 mb-8 drop-shadow">
                    {slide.subtitle}
                  </p>
                  <div className="flex flex-col md:flex-row justify-center gap-4">
                    <Link
                      href="/browse-skills"
                      className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:from-pink-600 hover:to-purple-700 hover:scale-105 transition"
                    >
                      Explore Skills
                    </Link>
                    <Link
                      href="/dashboard/user/add-skills"
                      className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/50 text-white font-semibold rounded-full hover:bg-white/20 hover:scale-105 transition"
                    >
                      Start Teaching
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .hero-swiper .swiper-pagination-bullet {
          background: white;
          opacity: 0.5;
          width: 10px;
          height: 10px;
        }
        .hero-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          background: linear-gradient(to right, #ec4899, #a855f7);
          width: 28px;
          border-radius: 9999px;
        }
      `}</style>
    </section>
  );
}