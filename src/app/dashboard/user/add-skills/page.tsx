'use client'
import { authClient } from "@/src/lib/auth-client";
import React, { useState } from "react";
import { toast } from "react-toastify";
export interface AISuggestionResponse {
    success: boolean;
    data: {
        category: string;
        description: string;
    };
}

const DEFAULT_IMAGES_BY_CATEGORY: Record<string, string> = {
    "Web Development": "https://images.unsplash.com/photo-1547658719-da2b81166b58?w=600",
    "UI/UX Design": "https://images.unsplash.com/photo-1561070791-26c113006238?w=600",
    "Digital Marketing": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600",
    "Language": "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600",
    "General": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600"
};

export default function CreateSkillFormPremium() {
    const { data: session, isPending } = authClient.useSession();

    const [title, setTitle] = useState<string>("");
    const [image, setImage] = useState<string>("");
    const [level, setLevel] = useState<string>("Beginner");
    const [category, setCategory] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const typeWriterEffect = (fullText: string, setFieldState: React.Dispatch<React.SetStateAction<string>>) => {
        let currentText = "";
        let index = 0;
        setFieldState("");
        const interval = setInterval(() => {
            if (index < fullText.length) {
                currentText += fullText[index];
                setFieldState(currentText);
                index++;
            } else {
                clearInterval(interval);
            }
        }, 10);
    };

    const handleAiGenerate = async () => {
        if (!title.trim()) {
            alert("Please enter a skill title first!");
            return;
        }

        setIsGenerating(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/skills/suggest-content`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title }),
            });
            const result: AISuggestionResponse = await res.json();

            if (result.success) {
                const aiCategory = result.data.category;
                setCategory(aiCategory);
                typeWriterEffect(result.data.description, setDescription);

                if (!image.trim()) {
                    setImage(DEFAULT_IMAGES_BY_CATEGORY[aiCategory] || DEFAULT_IMAGES_BY_CATEGORY["General"]);
                }
            }
        } catch (err) {
            console.error("AI Generation failed:", err);
            alert("AI Service is temporarily unavailable.");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!session?.user) {
            alert("You must be logged in to publish a skill!");
            return;
        }

        if (!title.trim() || !category.trim() || !description.trim()) {
            alert("Please fill all required fields before publishing!");
            return;
        }

        setIsSubmitting(true);

        const skillPayload = {
            title,
            category,
            description,
            level,
            image: image.trim() !== "" ? image : (DEFAULT_IMAGES_BY_CATEGORY[category] || DEFAULT_IMAGES_BY_CATEGORY["General"]),
            userEmail: session.user.email,
            creatorName: session.user.name || "Anonymous User",
            creatorImage: session.user.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"
        };

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/skills/ai-generate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(skillPayload),
            });

            const result = await res.json();

            if (result.success) {
                toast.success(" Skill Track Published Successfully!");
                setTitle("");
                setImage("");
                setCategory("");
                setDescription("");
                setLevel("Beginner");
            } else {
                alert(`Failed to save: ${result.message}`);
            }
        } catch (err) {
            console.error("Submission Error:", err);
            alert("Server error occurred while publishing.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isPending) {
        return (
            <div className="max-w-xl mx-auto p-8 bg-[#121420]/80 border border-[#1f2335] rounded-2xl h-[400px] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-pink-500/30 border-t-pink-500 rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto p-8 bg-[#121420]/80 border border-[#1f2335] rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.3)] mt-6 text-slate-200 backdrop-blur-md">

            {/* Header */}
            <div className="mb-8 text-center sm:text-left">
                <h2 className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-2 justify-center sm:justify-start">
                    Create Premium Skill Session
                </h2>
                <p className="text-xs text-slate-400 mt-1.5">Connected as: <span className="text-pink-400 font-medium">{session?.user?.name || "Guest"}</span></p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Title Field */}
                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Skill Title <span className="text-pink-500">*</span></label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g., Advanced Next.js Architecture"
                        className="w-full bg-[#0d0f17] border border-[#23283d] focus:border-pink-500 focus:ring-1 focus:ring-pink-500 rounded-xl p-3.5 text-slate-200 placeholder-slate-600 focus:outline-none transition-all duration-200 shadow-inner"
                        required
                    />
                    <button
                        type="button"
                        onClick={handleAiGenerate}
                        disabled={isGenerating || isSubmitting}
                        className="mt-3 w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-purple-900/20 disabled:opacity-40"
                    >
                        {isGenerating ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                AI is Texting...
                            </>
                        ) : "✨ Autofill with AI"}
                    </button>
                </div>

                {/* Level Dropdown */}
                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Difficulty Level</label>
                    <div className="relative">
                        <select
                            value={level}
                            onChange={(e) => setLevel(e.target.value)}
                            className="w-full bg-[#0d0f17] border border-[#23283d] focus:border-pink-500 rounded-xl p-3.5 text-slate-200 focus:outline-none transition-all appearance-none cursor-pointer"
                        >
                            <option value="Beginner" className="bg-[#0d0f17]">🟢 Beginner</option>
                            <option value="Intermediate" className="bg-[#0d0f17]">🟡 Intermediate</option>
                            <option value="Advanced" className="bg-[#0d0f17]">🔴 Advanced</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                            ▼
                        </div>
                    </div>
                </div>

                {/* Image Input */}
                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Cover Image URL (Optional)</label>
                    <input
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="Leave blank for smart AI image mapping"
                        className="w-full bg-[#0d0f17] border border-[#23283d] focus:border-pink-500 rounded-xl p-3.5 text-slate-300 font-mono text-xs focus:outline-none transition-all"
                    />
                    {image && (
                        <div className="mt-3 border border-[#23283d] rounded-xl overflow-hidden h-40 w-full relative shadow-md">
                            <img src={image} alt="Preview" className="w-full h-full object-cover" />
                            <span className="absolute bottom-2 left-2 text-[10px] bg-slate-950/80 px-2 py-0.5 rounded text-slate-400 border border-slate-800">Preview Layout</span>
                        </div>
                    )}
                </div>

                {/* AI Preview Section */}
                <div className="pt-4 border-t border-[#1f2335] space-y-4">
                    <div className="flex items-center gap-2">
                        <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
                        </span>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-pink-400">AI Engine Preview</h3>
                    </div>

                    {/* Category Input */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Detected Category *</label>
                        <input
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full bg-[#161224]/40 border border-purple-900/30 focus:border-pink-500 rounded-xl p-3.5 text-pink-400 placeholder-slate-700 focus:outline-none transition-all"
                            placeholder="Waiting for AI categorization..."
                            required
                        />
                    </div>

                    {/* Description Textarea */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Generated Description *</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full bg-[#161224]/40 border border-purple-900/30 focus:border-pink-500 rounded-xl p-3.5 h-32 text-slate-300 placeholder-slate-700 focus:outline-none transition-all resize-none leading-relaxed"
                            placeholder="AI text typewriter effect output..."
                            required
                        />
                    </div>
                </div>

                {/* Publish Button */}
                <button
                    type="submit"
                    disabled={isSubmitting || isGenerating}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-95 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-xl uppercase tracking-wider text-xs mt-2 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    {isSubmitting ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Saving to Database...
                        </>
                    ) : (
                        <>🚀 Publish New Skill Track</>
                    )}
                </button>
            </form>
        </div>
    );
}