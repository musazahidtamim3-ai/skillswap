"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Skill = {
    _id: string;
    title: string;
    category: string;
    level: string;
    image: string;
    userEmail: string;
    description?: string;
    creatorName?: string;
    creatorImage?: string;
};

export default function AllSkillsPage() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedLevel, setSelectedLevel] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_URL}/api/skills?limit=500`)
            .then((res) => res.json())
            .then((resData) => {
                const fetchedSkills = resData.data || [];
                setSkills(fetchedSkills);

                const uniqueCategories: string[] = Array.from(
                    new Set(fetchedSkills.map((s: Skill) => s.category).filter(Boolean))
                );
                setCategories(uniqueCategories);
            })
            .catch((err) => {
                console.error(err);
                toast.error("Failed to load skills marketplace");
            })
            .finally(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [search, selectedCategory, selectedLevel]);

    const filteredSkills = skills.filter((skill) => {
        const matchesSearch =
            skill.title.toLowerCase().includes(search.toLowerCase()) ||
            (skill.description && skill.description.toLowerCase().includes(search.toLowerCase())) ||
            (skill.creatorName && skill.creatorName.toLowerCase().includes(search.toLowerCase()));

        const matchesCategory = selectedCategory === "" || skill.category === selectedCategory;
        const matchesLevel = selectedLevel === "" || skill.level === selectedLevel;

        return matchesSearch && matchesCategory && matchesLevel;
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredSkills.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredSkills.length / itemsPerPage);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-pink-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-950 text-white p-6 sm:p-12 relative overflow-hidden">
            <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-pink-600/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10 space-y-10">
                <div className="text-center max-w-2xl mx-auto space-y-3">
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                        Skills Marketplace
                    </h1>
                    <p className="text-sm sm:text-base text-gray-400">
                        Discover experts offering knowledge sharing across development, design, languages, and more.
                    </p>
                </div>

                <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 shadow-2xl grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search skills, keywords, authors..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-xl border border-gray-800 bg-gray-950/60 pl-11 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 transition-all"
                        />
                        <span className="absolute left-4 top-3.5 text-gray-500">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        </span>
                    </div>

                    <div>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full rounded-xl border border-gray-800 bg-gray-950/60 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 transition-all appearance-none cursor-pointer"
                        >
                            <option value="">All Categories</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <select
                            value={selectedLevel}
                            onChange={(e) => setSelectedLevel(e.target.value)}
                            className="w-full rounded-xl border border-gray-800 bg-gray-950/60 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-pink-500/40 focus:border-pink-500 transition-all appearance-none cursor-pointer"
                        >
                            <option value="">All Experience Levels</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Expert">Expert</option>
                        </select>
                    </div>
                </div>

                {currentItems.length === 0 ? (
                    <div className="text-center py-20 bg-gray-900/20 rounded-2xl border border-gray-800/50">
                        <p className="text-gray-500 text-sm">No items match your selected filtering metrics.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentItems.map((skill) => (
                            <div
                                key={skill._id}
                                className="group bg-gray-900/30 backdrop-blur-md border border-gray-800/80 rounded-2xl p-6 shadow-xl hover:border-purple-500/40 hover:bg-gray-900/50 transition-all flex flex-col justify-between duration-300 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-500/5 to-transparent rounded-bl-full pointer-events-none group-hover:from-purple-500/10 transition-all" />

                                <div>
                                    <Image src={skill.image} alt={skill.title} width={500} height={200} className="w-full h-40 rounded-xl object-cover" />
                                    <h3 className="text-lg font-bold pt-5 text-white group-hover:text-purple-300 transition-colors line-clamp-1">
                                        {skill.title}
                                    </h3>
                                    <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed">
                                        {skill.description || "Explore this specialized domain setup to trade dynamic hours, scale technical capacity, and unlock target achievements."}
                                    </p>
                                    <div className="flex flex-wrap items-center gap-2 my-4">
                                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
                                            {skill.category}
                                        </span>
                                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-pink-500/10 text-pink-400 border border-pink-500/20">
                                            {skill.level}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-800/60 flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-2.5 overflow-hidden">
                                        <img
                                            src={skill.creatorImage || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop"}
                                            alt={skill.creatorName || "Creator"}
                                            className="w-7 h-7 rounded-full object-cover ring-1 ring-gray-800 shrink-0"
                                        />
                                        <div className="flex flex-col min-w-0">
                                            <span className="text-xs font-semibold text-gray-200 truncate">
                                                {skill.creatorName || "Anonymous User"}
                                            </span>
                                            <span className="text-[10px] text-gray-500 truncate">
                                                {skill.userEmail}
                                            </span>
                                        </div>
                                    </div>

                                    <Link href={`/browse-skills/${skill._id}`}>
                                        <button className="text-xs font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text hover:opacity-80 transition-opacity flex items-center gap-1 shrink-0">
                                            View Track
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-pink-400"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 pt-6">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="p-2.5 rounded-xl border border-gray-800 bg-gray-900/60 text-gray-400 hover:text-white hover:bg-gray-800 disabled:opacity-40 disabled:hover:bg-gray-900/60 disabled:hover:text-gray-400 transition-all"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                        </button>

                        <div className="flex items-center gap-1.5 px-4 text-xs font-semibold text-gray-400">
                            Page <span className="text-purple-400">{currentPage}</span> of <span>{totalPages}</span>
                        </div>

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="p-2.5 rounded-xl border border-gray-800 bg-gray-900/60 text-gray-400 hover:text-white hover:bg-gray-800 disabled:opacity-40 disabled:hover:bg-gray-900/60 disabled:hover:text-gray-400 transition-all"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}