import Link from "next/link";
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope,
} from "react-icons/fa";

export default function Footer() {
    const quickLinks = [
        { href: "/", label: "Home" },
        { href: "/skills", label: "Explore Skills" },
        { href: "/skills/add", label: "Start Teaching" },
        { href: "/about", label: "About Us" },
        { href: "/contact", label: "Contact" },
    ];

    const categories = [
        { href: "/skills?category=music", label: "Music" },
        { href: "/skills?category=technology", label: "Technology" },
        { href: "/skills?category=art", label: "Art & Design" },
        { href: "/skills?category=language", label: "Languages" },
        { href: "/skills?category=business", label: "Business" },
    ];

    const socials = [
        { href: "https://facebook.com", icon: FaFacebookF, label: "Facebook" },
        { href: "https://twitter.com", icon: FaTwitter, label: "Twitter" },
        { href: "https://instagram.com", icon: FaInstagram, label: "Instagram" },
        { href: "https://linkedin.com", icon: FaLinkedinIn, label: "LinkedIn" },
    ];

    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="h-1 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    <div>
                        <h3 className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                            SkillSwap
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">
                            A community where people learn any skill and teach what they
                            know. Connect with mentors and learners from around the world.
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
                                        className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 text-gray-300 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-500 hover:text-white transition"
                                    >
                                        <Icon size={16} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                <div>
                    <h4 className="text-lg font-semibold text-white mb-4">
                        Quick Links
                    </h4>
                    <ul className="space-y-2 text-sm">
                        {quickLinks.map((l) => (
                            <li key={l.href}>
                                <Link
                                    href={l.href}
                                    className="text-gray-400 hover:text-pink-400 transition-colors"
                                >
                                    {l.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg font-semibold text-white mb-4">
                        Categories
                    </h4>
                    <ul className="space-y-2 text-sm">
                        {categories.map((c) => (
                            <li key={c.href}>
                                <Link
                                    href={c.href}
                                    className="text-gray-400 hover:text-pink-400 transition-colors"
                                >
                                    {c.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg font-semibold text-white mb-4">
                        Contact Us
                    </h4>
                    <ul className="space-y-3 text-sm text-gray-400">
                        <li className="flex items-start gap-2">
                            <FaMapMarkerAlt className="mt-1 text-pink-400 shrink-0" />
                            <span>123 Learning Street, Dhaka, Bangladesh</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <FaPhoneAlt className="text-pink-400 shrink-0" />
                            <span>+880 1234-567890</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <FaEnvelope className="text-pink-400 shrink-0" />
                            <span>support@skillswap.com</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
                <p>© {new Date().getFullYear()} SkillSwap. All rights reserved.</p>
                <div className="flex gap-6">
                    <Link href="/privacy" className="hover:text-pink-400 transition-colors">
                        Privacy Policy
                    </Link>
                    <Link href="/terms" className="hover:text-pink-400 transition-colors">
                        Terms of Service
                    </Link>
                </div>
            </div>
        </div>
    </footer >
  );
}