"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { authClient } from "@/src/lib/auth-client";
import Link from "next/link";

type UserProfile = {
    name: string;
    email: string;
    photo?: string;
    coverPhoto?: string;
    skillsToTeach?: string[];
    skillsToLearn?: string[];
    learningBalanceMinutes?: number;
    rating?: number;
    reviewCount?: number;
};

export default function ProfilePage() {
    const { data: session, isPending: sessionLoading } = authClient.useSession();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (session?.user?.email) {
            fetch(`http://localhost:5000/api/users/dashboard/info?email=${session.user.email}`)
                .then((res) => res.json())
                .then((resData) => {
                    if (resData.success && resData.data?.user) {
                        setProfile({
                            name: resData.data.user.name,
                            email: session.user.email,
                            photo: resData.data.user.avatarUrl,
                            coverPhoto: resData.data.user.coverPhoto || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop",
                            skillsToTeach: resData.data.user.skillsToTeach,
                            skillsToLearn: resData.data.user.skillsToLearn,
                            learningBalanceMinutes: resData.data.user.learningBalanceMinutes,
                            rating: resData.data.user.rating,
                            reviewCount: resData.data.user.reviewCount,
                        });
                    }
                })
                .catch((err) => {
                    console.error(err);
                    toast.error("Failed to load profile data");
                })
                .finally(() => setIsLoading(false));
        } else if (!sessionLoading) {
            setIsLoading(false);
        }
    }, [session, sessionLoading]);

    if (sessionLoading || isLoading) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-pink-500"></div>
            </div>
        );
    }

    if (!session?.user || !profile) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center text-gray-400">
                Please log in to view your profile.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-950 text-white pb-12 relative overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="w-full h-64 sm:h-80 relative overflow-hidden border-b border-gray-800">
                <img
                    src={profile.coverPhoto}
                    alt="Cover Banner"
                    className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent" />
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6 mb-8">
                    <div className="w-36 h-36 rounded-2xl overflow-hidden border-4 border-gray-950 bg-gray-900 shadow-2xl p-1 shrink-0">
                        <img
                            src={profile.photo}
                            alt={profile.name}
                            className="w-full h-full object-cover rounded-xl"
                        />
                    </div>
                    <Link href="/dashboard/user/profile/edit">
                        <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl font-semibold transition-all">
                            Edit Profile
                        </button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1 space-y-6">

                        <div className="mt-4 sm:mt-0 flex-1">
                            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                                {profile.name}
                            </h1>
                            <p className="text-sm text-gray-400 mt-1">{profile.email}</p>
                        </div>
                        <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 shadow-xl">
                            <h2 className="text-lg font-bold text-gray-200 mb-4 border-b border-gray-800 pb-2">Stats</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-400">Balance</span>
                                    <span className="text-sm font-semibold text-purple-400">{profile.learningBalanceMinutes} min</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-400">Rating</span>
                                    <span className="text-sm font-semibold text-amber-400 flex items-center gap-1">
                                        ★ {profile.rating?.toFixed(1)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-400">Reviews</span>
                                    <span className="text-sm font-semibold text-pink-400">{profile.reviewCount} total</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-2 space-y-6">

                        <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 shadow-xl">
                            <h2 className="text-lg font-bold text-gray-200 mb-4 border-b border-gray-800 pb-2">Skills to Teach</h2>
                            <div className="flex flex-wrap gap-2">
                                {profile.skillsToTeach && profile.skillsToTeach.length > 0 ? (
                                    profile.skillsToTeach.map((skill, index) => (
                                        <span key={index} className="px-3 py-1 text-xs font-medium rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                                            {skill}
                                        </span>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-500">No skills specified yet.</p>
                                )}
                            </div>
                        </div>

                        <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 shadow-xl">
                            <h2 className="text-lg font-bold text-gray-200 mb-4 border-b border-gray-800 pb-2">Skills to Learn</h2>
                            <div className="flex flex-wrap gap-2">
                                {profile.skillsToLearn && profile.skillsToLearn.length > 0 ? (
                                    profile.skillsToLearn.map((skill, index) => (
                                        <span key={index} className="px-3 py-1 text-xs font-medium rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20">
                                            {skill}
                                        </span>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-500">No interests specified yet.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}