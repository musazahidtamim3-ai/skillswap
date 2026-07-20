"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import {
    FaEnvelope,
    FaPhoneAlt,
    FaMapMarkerAlt,
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
} from "react-icons/fa";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.message) {
            toast.error("Please fill in all required fields");
            return;
        }

        setIsLoading(true);

        try {
            // Replace with your actual backend endpoint
            await fetch("https://skillswap-server-ten.vercel.app/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            toast.success("Message sent! We'll get back to you soon.");
            setFormData({ name: "", email: "", subject: "", message: "" });
        } catch (err) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const contactInfo = [
        {
            icon: FaMapMarkerAlt,
            title: "Our Location",
            detail: "123 Learning Street, Dhaka, Bangladesh",
        },
        {
            icon: FaPhoneAlt,
            title: "Phone Number",
            detail: "+880 1234-567890",
        },
        {
            icon: FaEnvelope,
            title: "Email Address",
            detail: "support@skillswap.com",
        },
    ];

    const socials = [
        { href: "https://facebook.com", icon: FaFacebookF, label: "Facebook" },
        { href: "https://twitter.com", icon: FaTwitter, label: "Twitter" },
        { href: "https://instagram.com", icon: FaInstagram, label: "Instagram" },
        { href: "https://linkedin.com", icon: FaLinkedinIn, label: "LinkedIn" },
    ];

    return (
        <main className="bg-gray-900">
            {/* Hero */}
            <section className="relative py-20 bg-gradient-to-br from-purple-700 via-fuchsia-700 to-pink-600 overflow-hidden">
                <div className="absolute -top-20 -left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
                <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold text-white bg-white/15 backdrop-blur-sm mb-4">
                        Contact Us
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                        We&apos;d Love to Hear From You
                    </h1>
                    <p className="text-lg text-purple-50 max-w-xl mx-auto">
                        Have a question, feedback, or just want to say hi? Reach out and
                        our team will get back to you soon.
                    </p>
                </div>
            </section>

            {/* Contact info cards */}
            <section className="py-16 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {contactInfo.map((item) => (
                            <div
                                key={item.title}
                                className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
                            >
                                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-500 mb-4">
                                    <item.icon className="text-white" size={22} />
                                </div>
                                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {item.detail}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Form + Socials */}
            <section className="pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Form */}
                        <div className="lg:col-span-2 bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
                            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-6">
                                Send Us a Message
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1.5">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-sm text-gray-800 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-400 transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1.5">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="you@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-sm text-gray-800 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400/40 focus:border-pink-400 transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1.5">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        placeholder="How can we help?"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-sm text-gray-800 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-400 transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1.5">
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        rows={5}
                                        placeholder="Write your message here..."
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-sm text-gray-800 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400/40 focus:border-pink-400 transition-all resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full sm:w-auto px-8 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 py-3 text-sm font-bold text-white hover:opacity-90 transition-all transform hover:-translate-y-0.5 shadow-md disabled:opacity-60 disabled:hover:translate-y-0"
                                >
                                    {isLoading ? "Sending..." : "Send Message"}
                                </button>
                            </form>
                        </div>

                        {/* Socials / extra info */}
                        <div className="flex flex-col justify-between bg-gradient-to-br from-purple-700 via-fuchsia-700 to-pink-600 rounded-2xl p-8 text-white">
                            <div>
                                <h3 className="text-xl font-bold mb-3">Let&apos;s Connect</h3>
                                <p className="text-sm text-purple-50 leading-relaxed mb-8">
                                    Follow us on social media for updates, tips, and community
                                    highlights.
                                </p>
                                <div className="flex gap-3">
                                    {socials.map((s) => {
                                        const Icon = s.icon;
                                        return (
                                            <a
                                                key={s.label}
                                                href={s.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={s.label}
                                                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/15 hover:bg-white/25 transition-colors"
                                            >
                                                <Icon size={16} />
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="mt-10 pt-6 border-t border-white/20">
                                <p className="text-sm text-purple-50">
                                    <span className="font-semibold">Support Hours:</span>
                                    <br />
                                    Mon – Fri, 9:00 AM – 6:00 PM
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}