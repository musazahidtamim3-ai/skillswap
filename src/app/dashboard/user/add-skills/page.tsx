"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/src/lib/auth-client";

const CATEGORIES = [
    "Web Development",
    "Mobile App Development",
    "UI/UX Design",
    "Graphic Design",
    "Digital Marketing",
    "Language & Communication",
    "Data Science & AI",
    "Photography & Videography",
    "Music & Arts",
    "Business & Finance",
];

const FALLBACK_IMAGES: Record<string, string> = {
    "Web Development": "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    "Mobile App Development": "https://images.unsplash.com/photo-1633250391894-397930e3f5f2",
    "UI/UX Design": "https://images.unsplash.com/photo-1559028012-481c04fa702d",
    "Graphic Design": "https://images.unsplash.com/photo-1626785774573-4b799315345d",
    "Digital Marketing": "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    "Language & Communication": "https://images.unsplash.com/photo-1546410531-bb4caa6b424d",
    "Data Science & AI": "https://images.unsplash.com/photo-1527474305487-b87b222841cc",
    "Photography & Videography": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
    "Music & Arts": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
    "Business & Finance": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
};

export default function AddSkillPage() {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    const [formData, setFormData] = useState({
        title: "",
        category: CATEGORIES[0],
        description: "",
        level: "Beginner",
        image: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!session?.user?.email) {
            toast.error("You must be logged in to add a skill");
            return;
        }

        if (!formData.title || !formData.category || !formData.description) {
            toast.error("Please fill in all required fields");
            return;
        }

        setIsLoading(true);

        const skillImage = formData.image.trim() || FALLBACK_IMAGES[formData.category] || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop";

        try {
            const res = await fetch("http://localhost:5000/api/skills", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: formData.title,
                    category: formData.category,
                    description: formData.description,
                    level: formData.level,
                    image: skillImage,
                    userEmail: session.user.email,
                    creatorName: session.user.name || "Anonymous User",
                    creatorImage: session.user.image || "",
                }),
            });

            const data = await res.json();

            if (res.ok && data.acknowledged) {
                toast.success("Skill added successfully!");
                setFormData({ title: "", category: CATEGORIES[0], description: "", level: "Beginner", image: "" });
                router.push("/dashboard/user");
            } else {
                toast.error(data.message || "Failed to add skill");
            }
        } catch (error) {
            console.error("Error adding skill:", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (isPending) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-pink-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-8 relative overflow-hidden bg-gray-950 text-white">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="w-full max-w-3xl bg-gray-900/60 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 sm:p-10 shadow-2xl relative z-10">

                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent mb-2">
                        Share a New Skill
                    </h2>
                    <p className="text-sm text-gray-400">
                        Add a skill you want to teach and help others grow in the SkillSwap community.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Skill Title */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">Skill Title *</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="e.g., React.js Development, Basic Photography"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 transition-all"
                        />
                    </div>

                    {/* Category Dropdown */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">Category *</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 transition-all cursor-pointer [&>option]:bg-gray-900"
                        >
                            {CATEGORIES.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Skill Image URL */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">Skill Banner Image URL (Optional)</label>
                        <input
                            type="text"
                            name="image"
                            placeholder="https://example.com/skill-image.jpg"
                            value={formData.image}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 transition-all"
                        />
                        <p className="text-[10px] text-gray-500 mt-1">If image field is empty, then category based image will be set automatically!</p>
                    </div>

                    {/* Experience/Expertise Level */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">Your Expertise Level</label>
                        <select
                            name="level"
                            value={formData.level}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-pink-500/40 focus:border-pink-500 transition-all cursor-pointer [&>option]:bg-gray-900"
                        >
                            <option value="Beginner">Beginner (1+ Years)</option>
                            <option value="Intermediate">Intermediate (2+ Years)</option>
                            <option value="Expert">Expert (5+ Years)</option>
                        </select>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">Description *</label>
                        <textarea
                            name="description"
                            rows={4}
                            placeholder="Briefly describe what you will teach, topics covered, or any prerequisites..."
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500/40 focus:border-pink-500 transition-all resize-none"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-500 py-3 text-sm font-bold text-white hover:opacity-90 transition-all transform hover:-translate-y-0.5 shadow-lg shadow-purple-500/20 mt-4 disabled:opacity-60 disabled:hover:translate-y-0"
                    >
                        {isLoading ? "Adding Skill..." : "Add Skill to Profile"}
                    </button>
                </form>
            </div>
        </div>
    );
}