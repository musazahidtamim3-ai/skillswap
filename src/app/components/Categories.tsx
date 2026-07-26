"use client";

import React from "react";
import { motion } from "framer-motion";
import { SiJavascript, SiFigma } from "react-icons/si";
import { FaGuitar, FaLanguage, FaBriefcase, FaUtensils } from "react-icons/fa";

interface Category {
  name: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  count: string;
}

const categories: Category[] = [
  { name: "Programming", Icon: SiJavascript, count: "120+ skills" },
  { name: "Design", Icon: SiFigma, count: "85+ skills" },
  { name: "Music", Icon: FaGuitar, count: "60+ skills" },
  { name: "Languages", Icon: FaLanguage, count: "95+ skills" },
  { name: "Business", Icon: FaBriefcase, count: "70+ skills" },
  { name: "Cooking", Icon: FaUtensils, count: "45+ skills" },
];

export default function Categories() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900" id="categories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold text-purple-600 bg-purple-100 dark:bg-purple-500/10 dark:text-purple-400 mb-3">
            Categories
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
            Explore{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Skill Categories
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-800 border border-transparent hover:border-pink-300 dark:hover:border-purple-700 cursor-pointer overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10 flex flex-col items-center">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white dark:bg-gray-700 shadow-sm mb-3 group-hover:bg-white/20 group-hover:backdrop-blur-sm transition-colors">
                  <cat.Icon
                    size={26}
                    className="text-purple-600 dark:text-pink-400 group-hover:text-white transition-colors"
                  />
                </div>
                <span className="text-base font-semibold text-gray-800 dark:text-gray-100 group-hover:text-white transition-colors">
                  {cat.name}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-purple-100 mt-1 transition-colors">
                  {cat.count}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}