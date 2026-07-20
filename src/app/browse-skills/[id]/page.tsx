"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

type Skill = {
    _id: string;
    title: string;
    category: string;
    description: string;
    level: string;
    image: string;
    userEmail: string;
    creatorName?: string;
    creatorImage?: string;
    createdAt?: string;
};

export default function SkillDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const [skill, setSkill] = useState<Skill | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!params?.id) return;

        fetch(`${process.env.NEXT_PUBLIC_URL}/api/skills/${params.id}`)
            .then((res) => res.json())
            .then((resData) => {
                if (resData.success && resData.data) {
                    setSkill(resData.data);
                } else if (resData.title) {
                    setSkill(resData);
                } else {
                    toast.error("Skill details not found");
                }
            })
            .catch((err) => {
                console.error(err);
                toast.error("Failed to load skill details");
            })
            .finally(() => setIsLoading(false));
    }, [params?.id]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-pink-500"></div>
            </div>
        );
    }

    if (!skill) {
        return (
            <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-white space-y-4">
                <p className="text-gray-400 text-sm">No skill data available.</p>
                <button
                    onClick={() => router.back()}
                    className="px-4 py-2 text-xs font-bold bg-gray-900 border border-gray-800 rounded-xl hover:bg-gray-800 transition-colors"
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-950 text-white p-6 sm:p-12 relative overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-pink-600/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10 space-y-8">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                    Back to Marketplace
                </button>

                <div className="relative w-full h-64 sm:h-96 rounded-2xl overflow-hidden border border-gray-800/80 shadow-2xl">
                    <img
                        src={skill.image}
                        alt={skill.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent" />

                    <div className="absolute bottom-6 left-6 right-6 space-y-3">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-purple-500/20 text-purple-400 border border-purple-500/30 backdrop-blur-md">
                                {skill.category}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-pink-500/20 text-pink-400 border border-pink-500/30 backdrop-blur-md">
                                {skill.level}
                            </span>
                        </div>
                        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white drop-shadow-md">
                            {skill.title}
                        </h1>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-4">
                            <h2 className="text-xl font-bold text-gray-100 border-b border-gray-800 pb-3">
                                Skill Description
                            </h2>
                            <p className="text-sm text-gray-400 leading-relaxed whitespace-pre-wrap">
                                {skill.description}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 shadow-xl space-y-6">
                            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                                Offered By
                            </h2>

                            <div className="flex items-center gap-3">
                                <img
                                    src={skill.creatorImage || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop"}
                                    alt={skill.creatorName || "Creator"}
                                    className="w-12 h-12 rounded-xl object-cover ring-1 ring-gray-800 shrink-0"
                                />
                                <div className="flex flex-col min-w-0">
                                    <span className="text-sm font-bold text-white truncate">
                                        {skill.creatorName || "Anonymous User"}
                                    </span>
                                    <span className="text-xs text-gray-500 truncate">
                                        {skill.userEmail}
                                    </span>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-800/60 space-y-3 text-xs">
                                <div className="flex justify-between items-center text-gray-400">
                                    <span>Experience Level</span>
                                    <span className="font-semibold text-pink-400">{skill.level}</span>
                                </div>
                                {skill.createdAt && (
                                    <div className="flex justify-between items-center text-gray-400">
                                        <span>Published</span>
                                        <span className="font-medium text-gray-300">
                                            {new Date(skill.createdAt).toLocaleDateString(undefined, {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <button className="w-full rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-500 py-3 text-sm font-bold text-white hover:opacity-90 transition-all transform hover:-translate-y-0.5 shadow-lg shadow-purple-500/20">
                                Connect for Swap
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}