'use client'
import Image from "next/image";
import { FaGithub, FaLinkedinIn, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

export default function AboutPage() {
    return (
        <main className="bg-white dark:bg-gray-900 py-20">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* About the website */}
                <motion.section
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6">
                        About <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">SkillSwap</span>
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                        SkillSwap is a platform where people can learn new skills and teach what they already know. Instead of paying for expensive courses, users connect directly with each other — a guitarist can teach music while learning to code, a developer can teach web development while learning a new language.
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        Our goal is to make learning accessible, community‑driven, and free from unnecessary barriers. Anyone can list a skill, find a mentor, or start teaching in just a few clicks.
                    </p>
                </motion.section>

                {/* Divider */}
                <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-500 mx-auto rounded-full mb-20" />

                {/* About the developer */}
                <motion.section
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-8">
                        About the Developer
                    </h2>

                    <div className="flex justify-center mb-6">
                        <Image
                            src="/image.png"
                            alt="MD. Jahidul Islam"
                            width={180}
                            height={180}
                            className="w-44 h-44 rounded-full object-cover border-4 border-purple-200"
                        />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        MD. Jahidul Islam
                    </h3>
                    <p className="text-purple-600 dark:text-pink-400 font-semibold mb-6">
                        Full‑Stack Developer
                    </p>

                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                        I&apos;m a full‑stack developer who built SkillSwap from the ground up. I worked on both the frontend and backend of this project using React, Next.js, Node.js, and MongoDB.
                    </p>

                    <div className="flex justify-center gap-4">
                        <a
                            href="https://github.com/yourusername"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100 dark:bg-gray-800 text-purple-600 dark:text-pink-400"
                        >
                            <FaGithub size={18} />
                        </a>
                        <a
                            href="https://linkedin.com/in/yourusername"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100 dark:bg-gray-800 text-purple-600 dark:text-pink-400"
                        >
                            <FaLinkedinIn size={18} />
                        </a>
                        <a
                            href="mailto:you@example.com"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100 dark:bg-gray-800 text-purple-600 dark:text-pink-400"
                        >
                            <FaEnvelope size={18} />
                        </a>
                    </div>
                </motion.section>
            </div>
        </main>
    );
}