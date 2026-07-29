"use client";

import { authClient } from "@/src/lib/auth-client";
import { useEffect, useState } from "react";
import {
    FaGraduationCap, FaClock, FaExchangeAlt, FaStar,
    FaBookOpen, FaBolt, FaChartLine
} from "react-icons/fa";
import {
    ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis,
    AreaChart, Area, Tooltip, XAxis, YAxis, CartesianGrid
} from "recharts";

interface Session {
    _id: string;
    skillName: string;
    partnerName: string;
    partnerEmail: string;
    userEmail: string;
    role?: "Teaching" | "Learning";
    timeString: string;
    status: "Confirmed" | "Pending";
}

interface ActiveTrack {
    _id: string;
    title: string;
    category: string;
}

interface UserData {
    name: string;
    avatarUrl: string;
    skillsToTeach: string[];
    skillsToLearn: string[];
    learningBalanceMinutes: number;
    rating: number;
    reviewCount: number;
}

interface WeeklyStatPoint {
    date: string;
    label: string;
    count: number;
}

export default function UserDashboardHome() {
    const [user, setUser] = useState<UserData | null>(null);
    const [activeTracks, setActiveTracks] = useState<ActiveTrack[]>([]);
    const [weeklyStats, setWeeklyStats] = useState<WeeklyStatPoint[]>([]);
    const [weeklyTotal, setWeeklyTotal] = useState(0);
    const [statsLoading, setStatsLoading] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchDashboardData() {
            try {
                setLoading(true);

                const { data: authData } = await authClient.getSession();

                if (!authData || !authData.user || !authData.user.email) {
                    setError("Unauthorized access. Please login.");
                    return;
                }

                const userEmail = authData.user.email;

                const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/dashboard/info?email=${encodeURIComponent(userEmail)}`);
                if (!response.ok) throw new Error("Failed to load dashboard statistics");

                const jsonResponse = await response.json();

                if (jsonResponse.success && jsonResponse.data) {
                    const { user: dbUser, activeTracks: dbTracks } = jsonResponse.data;

                    setUser(dbUser);
                    setActiveTracks(dbTracks || []);
                } else {
                    throw new Error(jsonResponse.message || "Failed to fetch data");
                }
                try {
                    setStatsLoading(true);
                    const statsRes = await fetch(
                        `${process.env.NEXT_PUBLIC_URL}/api/skills/stats/weekly?email=${encodeURIComponent(userEmail)}`
                    );
                    if (statsRes.ok) {
                        const statsJson = await statsRes.json();
                        if (statsJson.success) {
                            setWeeklyStats(statsJson.data || []);
                            setWeeklyTotal(statsJson.total || 0);
                        }
                    }
                } catch (statsErr) {
                    console.error("Failed to load weekly stats:", statsErr);
                } finally {
                    setStatsLoading(false);
                }

            } catch (err: any) {
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        }

        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center">
                <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 font-medium">Loading your SkillSwap Workspace...</p>
            </div>
        );
    }

    if (error || !user) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
                <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 p-6 rounded-2xl max-w-md text-center">
                    <p className="text-red-600 dark:text-red-400 font-bold mb-2">Data Fetching Error</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{error || "User data could not be retrieved."}</p>
                    <button onClick={() => window.location.reload()} className="px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl text-xs font-bold transition-transform active:scale-95">
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    const ratingValue = user.rating ?? 0;
    const ratingChartData = [{ name: "Trust Score", value: ratingValue, fill: "#f59e0b" }];

    return (
        <main className="min-h-screen p-4 sm:p-6 lg:p-8 text-slate-900 dark:text-slate-100 transition-colors">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Top Welcome Banner */}
                <section className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-6 md:p-8 shadow-2xl border border-slate-800">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-indigo-500/30 to-fuchsia-500/30 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="flex items-center gap-5">
                            <div className="relative">
                                <img
                                    src={user.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}`}
                                    alt={user.name}
                                    className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover ring-4 ring-indigo-500/30 shadow-md"
                                />
                                <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-slate-900"></span>
                                </span>
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                                    Welcome back, {user.name}
                                </h1>
                                <p className="text-slate-400 text-sm mt-1 flex items-center gap-1.5">
                                    <FaBolt className="text-amber-400 text-xs" /> Active Skill Swapper
                                </p>
                            </div>
                        </div>

                        <div className="w-full md:w-auto bg-slate-800/60 border border-slate-700/50 backdrop-blur-xl p-4 rounded-2xl flex items-center gap-4">
                            <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
                                <FaClock className="text-xl" />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">Wallet Balance</p>
                                <p className="text-2xl font-black font-mono tracking-tight">{user.learningBalanceMinutes ?? 0} <span className="text-xs text-slate-400 font-normal">Mins</span></p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Grid - now powered by recharts */}
                <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm">
                        <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400 mb-4">
                            <div className="p-2 bg-indigo-50 dark:bg-indigo-950/40 rounded-lg"><FaGraduationCap size={20} /></div>
                            <h3 className="font-bold text-sm tracking-wide uppercase text-slate-500 dark:text-slate-400">Skills I Offer</h3>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                            {user.skillsToTeach.length === 0 ? (
                                <p className="text-xs text-slate-400">No teaching skills listed.</p>
                            ) : (
                                user.skillsToTeach.map((skill) => (
                                    <span key={skill} className="px-3 py-1 bg-indigo-500/5 dark:bg-indigo-400/5 text-indigo-600 dark:text-indigo-400 border border-indigo-500/10 dark:border-indigo-400/10 rounded-xl text-xs font-semibold">{skill}</span>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm">
                        <div className="flex items-center gap-3 text-fuchsia-600 dark:text-fuchsia-400 mb-4">
                            <div className="p-2 bg-fuchsia-50 dark:bg-fuchsia-950/40 rounded-lg"><FaBookOpen size={18} /></div>
                            <h3 className="font-bold text-sm tracking-wide uppercase text-slate-500 dark:text-slate-400">Skills I Want</h3>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                            {user.skillsToLearn.length === 0 ? (
                                <p className="text-xs text-slate-400">No learning skills listed.</p>
                            ) : (
                                user.skillsToLearn.map((skill) => (
                                    <span key={skill} className="px-3 py-1 bg-fuchsia-500/5 dark:bg-fuchsia-400/5 text-fuchsia-600 dark:text-fuchsia-400 border border-fuchsia-500/10 dark:border-fuchsia-400/10 rounded-xl text-xs font-semibold">{skill}</span>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Trust Score - RadialBarChart gauge */}
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm flex flex-col">
                        <div className="flex items-center gap-3 text-amber-500 mb-2">
                            <div className="p-2 bg-amber-50 dark:bg-amber-950/40 rounded-lg"><FaStar size={18} /></div>
                            <h3 className="font-bold text-sm tracking-wide uppercase text-slate-500 dark:text-slate-400">Trust Score</h3>
                        </div>
                        <div className="relative flex-1 flex items-center justify-center min-h-[120px]">
                            <ResponsiveContainer width="100%" height={120}>
                                <RadialBarChart
                                    innerRadius="70%"
                                    outerRadius="100%"
                                    data={ratingChartData}
                                    startAngle={90}
                                    endAngle={-270}
                                    barSize={10}
                                >
                                    <PolarAngleAxis
                                        type="number"
                                        domain={[0, 5]}
                                        angleAxisId={0}
                                        tick={false}
                                    />
                                    <RadialBar
                                        background={{ fill: "#f1f5f9" }}
                                        dataKey="value"
                                        cornerRadius={8}
                                    />
                                </RadialBarChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-2xl font-black font-mono">{ratingValue.toFixed(1)}</span>
                                <span className="text-[10px] text-slate-400 font-medium">/ 5.0</span>
                            </div>
                        </div>
                        <p className="text-center text-xs text-slate-400 font-medium mt-1">
                            {user.reviewCount || 0} review{user.reviewCount === 1 ? "" : "s"}
                        </p>
                    </div>

                    
                </section>

                {/* Core Dashboard Data Grid */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Weekly Activity - sparkline */}
                    <div className="bg-white col-span-2 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm flex flex-col">
                        <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400 mb-2">
                            <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg"><FaChartLine size={18} /></div>
                            <h3 className="font-bold text-sm tracking-wide uppercase text-slate-500 dark:text-slate-400">Weekly Activity</h3>
                        </div>
                        <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-2xl font-black font-mono">{weeklyTotal}</span>
                            <span className="text-xs text-slate-400 font-medium">skill{weeklyTotal === 1 ? "" : "s"} posted / 7d</span>
                        </div>
                        <div className="flex-1 min-h-[90px]">
                            {statsLoading ? (
                                <div className="h-full flex items-center justify-center">
                                    <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            ) : weeklyStats.length === 0 ? (
                                <p className="text-xs text-slate-400 h-full flex items-center justify-center">No data yet.</p>
                            ) : (
                                <ResponsiveContainer width="100%" height={90}>
                                    <AreaChart data={weeklyStats} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="weeklySparklineFill" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" strokeOpacity={0.5} />
                                        <XAxis
                                            dataKey="label"
                                            tickLine={false}
                                            axisLine={false}
                                            tick={{ fontSize: 10, fill: "#94a3b8" }}
                                        />
                                        <YAxis
                                            allowDecimals={false}
                                            tickLine={false}
                                            axisLine={false}
                                            width={28}
                                            tick={{ fontSize: 10, fill: "#94a3b8" }}
                                        />
                                        <Tooltip
                                            contentStyle={{ borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 11, padding: "4px 8px" }}
                                            labelFormatter={(label, payload) => payload?.[0]?.payload?.date ?? label}
                                            formatter={(value: number) => [`${value}`, "Posted"]}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="count"
                                            stroke="#10b981"
                                            strokeWidth={2}
                                            fill="url(#weeklySparklineFill)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            )}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200/60 dark:border-slate-800/60 space-y-4">
                        <h2 className="text-lg font-black flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                            <FaExchangeAlt className="text-slate-400" size={16} /> My Active Skill Posts
                        </h2>
                        <div className="space-y-5">
                            {activeTracks.length === 0 ? (
                                <p className="text-sm text-slate-400 py-6 text-center">No active skills published yet.</p>
                            ) : (
                                activeTracks.map((track) => (
                                    <div key={track._id} className="space-y-2 p-3 bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800 rounded-2xl">
                                        <div className="flex justify-between items-center text-xs">
                                            <div>
                                                <h4 className="font-bold tracking-tight text-slate-800 dark:text-slate-200">{track.title}</h4>
                                                <p className="text-[11px] text-slate-400 mt-0.5">Category: {track.category}</p>
                                            </div>
                                            <span className="font-mono font-bold text-xs text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-1 rounded border border-indigo-100 dark:border-indigo-900">Active</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}