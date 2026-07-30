"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutList, Plus, BookOpen, Person, Xmark, Bars } from "@gravity-ui/icons";
import { authClient } from "@/src/lib/auth-client";

interface MenuItem {
    label: string;
    href: string;
    icon: React.ReactNode;
}

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    const { data: sessionData } = authClient.useSession();
    const user = sessionData?.user;

    // sidebar khola thakle body scroll lock, ar route change hole auto close
    useEffect(() => {
        document.body.style.overflow = isSidebarOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isSidebarOpen]);

    useEffect(() => {
        setIsSidebarOpen(false);
    }, [pathname]);

    const menuItems: MenuItem[] = [
        { label: "Overview", href: "/dashboard/user", icon: <LayoutList className="w-5 h-5" /> },
        { label: "Add Skills", href: "/dashboard/user/add-skills", icon: <Plus className="w-5 h-5" /> },
        { label: "My Skills", href: "/dashboard/user/my-skills", icon: <BookOpen className="w-5 h-5" /> },
        { label: "Profile", href: "/dashboard/user/profile", icon: <Person className="w-5 h-5" /> },
    ];

    return (
        <div className="min-h-screen bg-gray-950 text-neutral-100 flex flex-col relative transition-colors duration-300 overflow-x-hidden">

            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />

            {/* Mobile menu toggle */}
            <div className="md:hidden fixed bottom-6 right-6 z-50">
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-xl shadow-orange-600/30 border border-orange-400/30 focus:outline-none active:scale-95 transition-transform"
                    aria-label="Toggle menu"
                >
                    {isSidebarOpen ? <Xmark className="h-6 w-6" /> : <Bars className="h-6 w-6" />}
                </button>
            </div>

            <div className="flex flex-1 relative">
                <aside
                    className={`
                              fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 pt-24 px-4
                              transition-transform duration-300 ease-in-out
                              md:sticky md:top-20 md:z-0 md:h-[calc(100vh-5rem)] md:translate-x-0 md:bg-gray-900 md:pt-6
                              ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                         `}
                >
                    <div className="flex items-center justify-between mb-6 md:hidden px-2">
                        <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase">
                            Dashboard Menu
                        </span>
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="p-1 rounded-lg text-neutral-500 hover:bg-neutral-800"
                        >
                            <Xmark className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="space-y-1">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive
                                        ? "bg-gradient-to-l from-pink-400 to-purple-600 text-white shadow-lg"
                                        : "text-neutral-400 hover:bg-neutral-800 hover:text-neutral-100"
                                        }`}
                                >
                                    {item.icon}
                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>
                </aside>

                {isSidebarOpen && (
                    <div
                        onClick={() => setIsSidebarOpen(false)}
                        className="md:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-sm transition-opacity"
                    />
                )}

                <div className="flex-1 md:pl-0 pt-20 md:pt-0 flex flex-col min-w-0">
                    <main className="flex-grow p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-24">
                        {children}
                    </main>
                </div>

            </div>
        </div>
    );
}