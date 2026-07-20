"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { authClient } from "@/src/lib/auth-client";

type Skill = {
    _id: string;
    title: string;
    category: string;
    level: string;
    userEmail: string;
};

export default function MySkillsPage() {
    const { data: session, isPending: sessionLoading } = authClient.useSession();
    const [skills, setSkills] = useState<Skill[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);

    useEffect(() => {
        if (session?.user?.email) {
            fetch(`http://localhost:5000/api/skills?limit=100`)
                .then((res) => res.json())
                .then((resData) => {
                    const allSkills = resData.data || [];
                    const filteredSkills = allSkills.filter(
                        (skill: Skill) => skill.userEmail === session.user.email
                    );
                    setSkills(filteredSkills);
                })
                .catch((err) => {
                    console.error(err);
                    toast.error("Failed to load skills");
                })
                .finally(() => setIsLoading(false));
        } else if (!sessionLoading) {
            setIsLoading(false);
        }
    }, [session, sessionLoading]);

    const openDeleteModal = (id: string) => {
        setSelectedSkillId(id);
    };

    const closeDeleteModal = () => {
        setSelectedSkillId(null);
    };

    const handleDelete = async () => {
        if (!selectedSkillId) return;
        setIsDeleting(true);

        try {
            const res = await fetch(`http://localhost:5000/api/skills/${selectedSkillId}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setSkills(skills.filter((skill) => skill._id !== selectedSkillId));
                toast.success("Skill deleted successfully");
            } else {
                toast.error("Failed to delete skill");
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong");
        } finally {
            setIsDeleting(false);
            setSelectedSkillId(null);
        }
    };

    if (sessionLoading || isLoading) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-pink-500"></div>
            </div>
        );
    }

    if (!session?.user) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center text-gray-400">
                Please log in to view your skills.
            </div>
        );
    }

    return (
        <div className="min-h-screen text-white p-6 sm:p-12 relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                        My Skills
                    </h1>
                    <p className="text-sm text-gray-400 mt-2">
                        Manage the skills you are currently teaching.
                    </p>
                </div>

                <div className="w-full overflow-x-auto bg-gray-900/40 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-2xl">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-800 bg-gray-900/80">
                                <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-400">Title</th>
                                <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-400">Category</th>
                                <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-400">Level</th>
                                <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800/60">
                            {skills.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="p-8 text-center text-sm text-gray-500">
                                        No skills added yet.
                                    </td>
                                </tr>
                            ) : (
                                skills.map((skill) => (
                                    <tr key={skill._id} className="hover:bg-gray-800/30 transition-colors">
                                        <td className="p-4 text-sm font-medium text-white">{skill.title}</td>
                                        <td className="p-4 text-sm text-gray-300">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
                                                {skill.category}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-gray-300">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-500/10 text-pink-400 border border-pink-500/20">
                                                {skill.level}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-right">
                                            <button
                                                onClick={() => openDeleteModal(skill._id)}
                                                className="inline-flex items-center justify-center p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white border border-red-500/20 transition-all shadow-sm"
                                            >
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="w-4 h-4"
                                                >
                                                    <path d="M3 6h18" />
                                                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedSkillId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/80 backdrop-blur-sm animate-fadeIn">
                    <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-2xl scale-100 transition-transform">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500/10 text-red-400 mb-4 mx-auto border border-red-500/20">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-6 h-6"
                            >
                                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                                <line x1="12" y1="9" x2="12" y2="13" />
                                <line x1="12" y1="17" x2="12.01" y2="17" />
                            </svg>
                        </div>

                        <h3 className="text-xl font-bold text-center text-white mb-2">Delete Skill</h3>
                        <p className="text-sm text-center text-gray-400 mb-6">
                            Are you sure you want to delete this skill? This action cannot be undone.
                        </p>

                        <div className="flex space-x-3">
                            <button
                                onClick={closeDeleteModal}
                                disabled={isDeleting}
                                className="flex-1 rounded-xl border border-gray-800 bg-gray-950 py-3 text-sm font-semibold text-gray-300 hover:bg-gray-800 transition-all disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="flex-1 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 py-3 text-sm font-semibold text-white hover:opacity-90 transition-all shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {isDeleting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                                        Deleting...
                                    </>
                                ) : (
                                    "Delete"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}