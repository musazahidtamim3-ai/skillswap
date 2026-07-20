"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { authClient } from "@/src/lib/auth-client";
import { useRouter } from "next/navigation";

export default function EditProfileTags() {
    const { data: session } = authClient.useSession();
    const [isLoading, setIsLoading] = useState(false);
    const [tags, setTags] = useState({
        skillsToTeach: "",
        skillsToLearn: ""
    });
    const router = useRouter();

    useEffect(() => {
        if (session?.user?.email) {
            fetch(`https://skillswap-server-ten.vercel.app/api/users/dashboard/info?email=${session.user.email}`)
                .then((res) => res.json())
                .then((resData) => {
                    if (resData.success && resData.data?.user) {
                        setTags({
                            skillsToTeach: (resData.data.user.skillsToTeach || []).join(", "),
                            skillsToLearn: (resData.data.user.skillsToLearn || []).join(", ")
                        });
                    }
                })
                .catch((err) => console.error(err));
        }
    }, [session]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!session?.user?.email) return;

        setIsLoading(true);

        const arrTeach = tags.skillsToTeach.split(",").map(s => s.trim()).filter(Boolean);
        const arrLearn = tags.skillsToLearn.split(",").map(s => s.trim()).filter(Boolean);

        try {
            const res = await fetch("https://skillswap-server-ten.vercel.app/api/users/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: session.user.email,
                    skillsToTeach: arrTeach,
                    skillsToLearn: arrLearn
                })
            });

            const data = await res.json();
            if (res.ok && data.success) {
                toast.success("Interests updated successfully!");
                router.push("/dashboard/user/profile");
            } else {
                toast.error("Failed to update profile tags");
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen text-white flex items-center justify-center p-6">
            <div className="w-full max-w-lg bg-gray-900/40 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 sm:p-10 shadow-2xl">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                        Update Profile Preferences
                    </h2>
                    <p className="text-xs text-gray-400 mt-1">Separate individual items with commas.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">Skills I Can Teach</label>
                        <input
                            type="text"
                            value={tags.skillsToTeach}
                            onChange={(e) => setTags({ ...tags, skillsToTeach: e.target.value })}
                            placeholder="Next.js, Tailwind CSS, Figma"
                            className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">Skills I Want to Learn</label>
                        <input
                            type="text"
                            value={tags.skillsToLearn}
                            onChange={(e) => setTags({ ...tags, skillsToLearn: e.target.value })}
                            placeholder="Python, Machine Learning, German"
                            className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-pink-500/40 focus:border-pink-500 transition-all"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 py-3 text-sm font-bold text-white hover:opacity-90 transition-all shadow-md disabled:opacity-60"
                    >
                        {isLoading ? "Saving Settings..." : "Save Preferences"}
                    </button>
                </form>
            </div>
        </div>
    );
}