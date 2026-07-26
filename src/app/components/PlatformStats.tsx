"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUserFriends, FaTools, FaRegClock } from "react-icons/fa";

interface Stat {
  label: string;
  value: number;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
}

const stats: Stat[] = [
  { label: "Active Users", value: 1243, Icon: FaUserFriends },
  { label: "Skills Listed", value: 578, Icon: FaTools },
  { label: "Sessions Completed", value: 3421, Icon: FaRegClock },
];

function Counter({ target }: { target: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target]);

  return <>{count.toLocaleString()}</>;
}

export default function PlatformStats() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-purple-700 via-fuchsia-700 to-pink-600 overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold text-white bg-white/15 backdrop-blur-sm mb-3">
            By The Numbers
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Our Growing Community
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="flex flex-col items-center text-center p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-colors"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/20 mb-4">
                <stat.Icon size={30} className="text-white" />
              </div>
              <span className="text-4xl md:text-5xl font-extrabold text-white">
                <Counter target={stat.value} />
              </span>
              <p className="mt-2 text-base text-purple-100 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}