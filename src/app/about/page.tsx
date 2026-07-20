'use client';

import Image from "next/image";
import { FaGithub, FaLinkedinIn, FaEnvelope, FaCode, FaServer, FaDatabase, FaExchangeAlt } from "react-icons/fa";
import { motion } from "framer-motion";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-gray-950 text-white relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(evalue,rgba(255,255,255,0.01)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 w-full flex-1 flex flex-col justify-center space-y-20 lg:space-y-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                    <motion.section
                        className="lg:col-span-7 space-y-6 text-left"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-flex text-xs font-bold tracking-widest uppercase bg-purple-500/10 text-purple-400 px-3 py-1.5 rounded-full border border-purple-500/20 backdrop-blur-md">
                            Our Mission
                        </span>
                        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
                            About <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">SkillSwap</span>
                        </h1>
                        <div className="space-y-4 text-base sm:text-lg text-gray-400 leading-relaxed font-medium">
                            <p>
                                SkillSwap is a platform where people can learn new skills and teach what they already know. Instead of paying for expensive courses, users connect directly with each other — a guitarist can teach music while learning to code, a developer can teach web development while learning a new language.
                            </p>
                            <p>
                                Our goal is to make learning accessible, community‑driven, and free from unnecessary barriers. Anyone can list a skill, find a mentor, or start teaching in just a few clicks.
                            </p>
                        </div>
                    </motion.section>

                    <motion.div
                        className="lg:col-span-5 grid grid-cols-2 gap-4 relative"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl pointer-events-none" />

                        <div className="bg-gray-900/40 border border-gray-800/80 p-6 rounded-2xl backdrop-blur-xl flex flex-col justify-between h-40 transform hover:-translate-y-1 transition-transform">
                            <FaCode className="text-purple-400 text-3xl" />
                            <div>
                                <h3 className="font-bold text-sm">Frontend</h3>
                                <p className="text-xs text-gray-500 mt-1">Next.js & Tailwind</p>
                            </div>
                        </div>
                        <div className="bg-gray-900/40 border border-gray-800/80 p-6 rounded-2xl backdrop-blur-xl flex flex-col justify-between h-40 mt-6 transform hover:-translate-y-1 transition-transform">
                            <FaServer className="text-fuchsia-400 text-3xl" />
                            <div>
                                <h3 className="font-bold text-sm">Backend</h3>
                                <p className="text-xs text-gray-500 mt-1">Node.js & Express</p>
                            </div>
                        </div>
                        <div className="bg-gray-900/40 border border-gray-800/80 p-6 rounded-2xl backdrop-blur-xl flex flex-col justify-between h-40 -mt-6 transform hover:-translate-y-1 transition-transform">
                            <FaDatabase className="text-pink-400 text-3xl" />
                            <div>
                                <h3 className="font-bold text-sm">Database</h3>
                                <p className="text-xs text-gray-500 mt-1">MongoDB Atlas</p>
                            </div>
                        </div>
                        <div className="bg-gray-900/40 border border-gray-800/80 p-6 rounded-2xl backdrop-blur-xl flex flex-col justify-between h-40 transform hover:-translate-y-1 transition-transform">
                            <FaExchangeAlt className="text-indigo-400 text-3xl" />
                            <div>
                                <h3 className="font-bold text-sm">Exchange</h3>
                                <p className="text-xs text-gray-500 mt-1">Peer to Peer</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <motion.section
                    className="w-full"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <div className="bg-gradient-to-b from-gray-900/60 to-gray-900/20 backdrop-blur-xl border border-gray-800/60 rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center gap-8 md:gap-16 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />

                        <div className="relative shrink-0 group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-2xl blur opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                            <div className="relative w-48 h-48 rounded-2xl overflow-hidden border border-gray-700 bg-gray-950">
                                <Image
                                    src="/image.png"
                                    alt="MD. Jahidul Islam"
                                    width={192}
                                    height={192}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        </div>

                        <div className="flex-1 text-center md:text-left space-y-5">
                            <div className="space-y-1.5">
                                <span className="text-xs font-bold uppercase tracking-widest text-pink-400 bg-pink-500/10 px-2.5 py-1 rounded-md border border-pink-500/20">
                                    The Developer
                                </span>
                                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2">
                                    MD. Jahidul Islam
                                </h2>
                                <p className="text-base font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent inline-block">
                                    Full‑Stack Developer
                                </p>
                            </div>

                            <p className="text-gray-400 max-w-2xl leading-relaxed text-sm sm:text-base">
                                I&apos;m a full‑stack developer who built SkillSwap from the ground up. I worked on both the frontend and backend of this project using React, Next.js, Node.js, and MongoDB.
                            </p>

                            <div className="flex justify-center md:justify-start gap-3 pt-2">
                                <a
                                    href="https://github.com/yourusername"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-11 h-11 flex items-center justify-center rounded-xl bg-gray-950 border border-gray-800 text-gray-400 hover:text-white hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300"
                                >
                                    <FaGithub size={18} />
                                </a>
                                <a
                                    href="https://linkedin.com/in/yourusername"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-11 h-11 flex items-center justify-center rounded-xl bg-gray-950 border border-gray-800 text-gray-400 hover:text-white hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300"
                                >
                                    <FaLinkedinIn size={18} />
                                </a>
                                <a
                                    href="mailto:you@example.com"
                                    className="w-11 h-11 flex items-center justify-center rounded-xl bg-gray-950 border border-gray-800 text-gray-400 hover:text-white hover:border-pink-500/50 hover:bg-pink-500/10 transition-all duration-300"
                                >
                                    <FaEnvelope size={18} />
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.section>
            </div>
        </main>
    );
}