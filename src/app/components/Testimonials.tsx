"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Alice Johnson",
    role: "Learned Guitar",
    quote:
      "SkillSwap helped me master guitar in just a few weeks! The community is amazing.",
    image:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=200&q=80",
    rating: 5,
  },
  {
    name: "Mark Patel",
    role: "Web Developer",
    quote:
      "I found a great mentor for web development and landed my first freelance job.",
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=200&q=80",
    rating: 5,
  },
  {
    name: "Sara Liu",
    role: "Language Tutor",
    quote:
      "Teaching my language skills on SkillSwap was rewarding and expanded my network.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
    rating: 4,
  },
];

export default function Testimonials() {
  return (
    <section
      className="py-20 bg-gradient-to-b from-gray-900 to-gray-900"
      id="testimonials"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold  bg-purple-500/10 text-purple-400 mb-3">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            What Our{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Users Say
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative flex flex-col items-center text-center p-8 pt-14 bg-gray-800 rounded-2xl shadow-md hover:shadow-2xl transition-shadow"
            >
              {/* Quote icon badge */}
              <div className="absolute -top-6 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-500 shadow-md">
                <FaQuoteLeft className="text-white" size={18} />
              </div>

              {/* Avatar with gradient ring */}
              <div className="p-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mb-4">
                <Image
                  src={t.image}
                  alt={t.name}
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-full object-cover border-4 border-gray-800"
                />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    size={14}
                    className={
                      i < t.rating
                        ? "text-pink-500"
                        : "text-gray-600"
                    }
                  />
                ))}
              </div>

              <p className="text-gray-300 italic mb-5 leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>

              <span className="text-lg font-bold text-gray-100">
                {t.name}
              </span>
              <span className="text-sm text-purple-600 dark:text-pink-400 font-medium">
                {t.role}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}