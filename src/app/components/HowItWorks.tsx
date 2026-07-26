"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaUserPlus, FaSearch, FaComments } from "react-icons/fa";

interface Step {
  number: string;
  title: string;
  description: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Sign Up",
    description: "Create your free account in seconds and join our community.",
    Icon: FaUserPlus,
  },
  {
    number: "02",
    title: "List / Find a Skill",
    description: "Browse hundreds of skills or post one you want to teach.",
    Icon: FaSearch,
  },
  {
    number: "03",
    title: "Connect & Learn",
    description: "Message, schedule sessions, and start exchanging knowledge.",
    Icon: FaComments,
  },
];

export default function HowItWorks() {
  return (
    <section
      className="py-20 bg-gradient-to-b from-white to-purple-50 dark:from-gray-900 dark:to-gray-900"
      id="how-it-works"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold text-pink-600 bg-pink-100 dark:bg-pink-500/10 dark:text-pink-400 mb-3">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
            How It{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5">
            <div className="mx-[16.66%] h-full bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 dark:from-purple-800 dark:via-pink-800 dark:to-purple-800" />
          </div>

          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative flex flex-col items-center text-center"
            >
              {/* Icon circle with number badge */}
              <div className="relative mb-6">
                <div className="w-24 h-24 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-lg border-4 border-purple-100 dark:border-gray-700 relative z-10">
                  <step.Icon
                    size={36}
                    className="text-purple-600 dark:text-pink-400"
                  />
                </div>
                <span className="absolute -top-2 -right-2 w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs font-bold shadow-md z-20">
                  {step.number}
                </span>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-shadow w-full">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}