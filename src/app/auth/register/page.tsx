"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/src/lib/auth-client";

export default function SignUpPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        image: "",
        password: "",
    });
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const saveUserToDB = async (finalImage: string) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    image: finalImage,
                }),
            });

            if (!res.ok) {
                console.error("Failed to save user to primary database");
            }
        } catch (error) {
            console.error("Database save error:", error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.password) {
            toast.error("Please fill in all fields");
            return;
        }
        if (formData.password.length < 8) {
            toast.error("Password must be at least 8 characters");
            return;
        }
        if (!agreedToTerms) {
            toast.error("You must accept the terms");
            return;
        }

        setIsLoading(true);

        const userImage = formData.image || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(formData.name)}`;

        await authClient.signUp.email({
            email: formData.email,
            password: formData.password,
            name: formData.name,
            image: userImage,
            fetchOptions: {
                onSuccess: async () => {
                    await saveUserToDB(userImage);
                    toast.success("Account created successfully!");
                    router.push("/auth/login");
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message || "Something went wrong. Try again.");
                    setIsLoading(false);
                },
            },
        });
    };

    const handleGoogleSignUp = async () => {
        setIsGoogleLoading(true);
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/dashboard/user",
            });
        } catch (err) {
            toast.error("Google sign up failed. Try again.");
            setIsGoogleLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex bg-gray-950">
            {/* Left: Branding Panel */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-purple-900 via-fuchsia-900 to-pink-900 items-center justify-center p-14">
                <div className="pointer-events-none absolute -top-20 -left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-25" />
                <div className="pointer-events-none absolute -bottom-20 -right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-25" />
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.08]"
                    style={{
                        backgroundImage:
                            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
                        backgroundSize: "48px 48px",
                        maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
                    }}
                />
                <div className="relative max-w-md">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1.5 mb-6 shadow-sm">
                        <span className="flex -space-x-1.5">
                            <span className="h-5 w-5 rounded-full bg-pink-400 border-2 border-purple-900" />
                            <span className="h-5 w-5 rounded-full bg-purple-400 border-2 border-purple-900" />
                            <span className="h-5 w-5 rounded-full bg-fuchsia-400 border-2 border-purple-900" />
                        </span>
                        <span className="text-xs font-semibold text-purple-100">
                            Trusted by 5,000+ learners
                        </span>
                    </div>
                    <h1 className="text-3xl font-extrabold text-white leading-tight mb-4">
                        Join the SkillSwap community.
                    </h1>
                    <p className="text-sm text-purple-200 leading-relaxed mb-10">
                        List a skill, find a mentor, and start exchanging knowledge with
                        people around the world.
                    </p>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-4 py-3 hover:bg-white/10 transition-all">
                            <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white flex-shrink-0">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                    <path d="M12 21s-7-6.2-7-11.2A7 7 0 0 1 19 9.8C19 14.8 12 21 12 21Z" />
                                    <circle cx="12" cy="9.5" r="2.3" />
                                </svg>
                            </span>
                            <p className="text-sm text-purple-50 font-medium">Teach any skill you know</p>
                        </div>
                        <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-4 py-3 hover:bg-white/10 transition-all">
                            <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white flex-shrink-0">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                    <circle cx="12" cy="12" r="9" />
                                    <path d="M12 7v5l3.5 2" />
                                </svg>
                            </span>
                            <p className="text-sm text-purple-50 font-medium">Track your learning progress</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: Form Panel */}
            <div className="flex w-full lg:w-1/2 items-center justify-center p-6 sm:p-12 bg-gray-950">
                <div className="w-full p-8 sm:p-10">
                    <h2 className="text-2xl font-bold text-white mb-2">
                        Create your account
                    </h2>
                    <p className="text-sm text-gray-400 mb-8">
                        Already have an account?{" "}
                        <Link href="/auth/login" className="font-semibold text-pink-400 hover:text-pink-300">
                            Log in
                        </Link>
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                                Full name
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                                Email address
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                                Profile Image (Optional)
                            </label>
                            <input
                                type="text"
                                name="image"
                                placeholder="https://example.com/profile.jpg"
                                value={formData.image}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500/40 focus:border-pink-500 transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Create a password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-gray-800 bg-gray-900 pl-4 pr-11 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500/40 focus:border-pink-500 transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                                    tabIndex={-1}
                                >
                                    {showPassword ? (
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5">
                                            <path d="M3 3l18 18" />
                                            <path d="M10.58 10.58a2 2 0 0 0 2.83 2.83" />
                                            <path d="M9.88 4.24A9.5 9.5 0 0 1 12 4c5 0 9 4 10 8-.3 1.15-.86 2.28-1.6 3.29M6.61 6.61C4.6 7.9 3.1 9.8 2 12c1 4 5 8 10 8 1.35 0 2.62-.29 3.75-.8" />
                                        </svg>
                                    ) : (
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5">
                                            <path d="M2 12c1-4 5-8 10-8s9 4 10 8c-1 4-5 8-10 8s-9-4-10-8Z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            <p className="text-[11px] text-gray-500 mt-1.5">
                                Must be at least 8 characters
                            </p>
                        </div>

                        <div className="flex items-start gap-2.5 pt-1">
                            <input
                                type="checkbox"
                                id="terms"
                                checked={agreedToTerms}
                                onChange={(e) => setAgreedToTerms(e.target.checked)}
                                className="mt-0.5 h-4 w-4 rounded border-gray-700 bg-gray-900 text-pink-500 focus:ring-pink-500/40"
                            />
                            <label htmlFor="terms" className="text-xs text-gray-400 leading-relaxed">
                                I agree to the{" "}
                                <Link href="/terms" className="font-semibold text-gray-200 hover:text-pink-400">
                                    Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link href="/privacy" className="font-semibold text-gray-200 hover:text-pink-400">
                                    Privacy Policy
                                </Link>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 py-3 text-sm font-bold text-white hover:opacity-90 transition-all transform hover:-translate-y-0.5 shadow-md mt-2 disabled:opacity-60 disabled:hover:translate-y-0"
                        >
                            {isLoading ? "Creating account..." : "Create account"}
                        </button>
                    </form>

                    <div className="flex items-center gap-3 my-6">
                        <div className="h-px flex-1 bg-gray-800" />
                        <span className="text-xs text-gray-500">or continue with</span>
                        <div className="h-px flex-1 bg-gray-800" />
                    </div>

                    <button
                        type="button"
                        onClick={handleGoogleSignUp}
                        disabled={isGoogleLoading}
                        className="w-full flex items-center justify-center gap-2 rounded-xl border border-gray-800 bg-gray-900 py-3 text-sm font-semibold text-gray-200 hover:bg-gray-800 transition-colors disabled:opacity-60"
                    >
                        <svg viewBox="0 0 24 24" className="h-4 w-4">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.85A11 11 0 0 0 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.43.34-2.09V7.06H2.18A11 11 0 0 0 1 12c0 1.77.43 3.45 1.18 4.94l3.66-2.85z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1a11 11 0 0 0-9.82 6.06l3.66 2.85C6.71 7.31 9.14 5.38 12 5.38z" />
                        </svg>
                        {isGoogleLoading ? "Redirecting..." : "Sign up with Google"}
                    </button>
                </div>
            </div>
        </div>
    );
}