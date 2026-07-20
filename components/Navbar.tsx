"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowChevronDown, Bars, Xmark, ArrowRightFromSquare } from "@gravity-ui/icons";
import Image from "next/image";
import { toast } from "react-toastify";
import { authClient, useSession } from "@/src/lib/auth-client";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = useSession();
  const user = session?.user;

  const navLinks = !user
    ? [
      { label: "Home", href: "/" },
      { label: "Explore Skills", href: "/browse-skills" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ]
    : [
      { label: "Home", href: "/" },
      { label: "Explore Skills", href: "/browse-skills" },
      { label: "Add Skill", href: "/dashboard/user/add-skills" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      setIsDropdownOpen(false);
      setIsMenuOpen(false);
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Logged out successfully");
            router.push("/auth/login");
            router.refresh();
          }
        }
      });
    } catch (err) {
      toast.error("Failed to logout. Try again.");
      console.error(err);
    }
  };

  const initials = user?.name
    ? user.name.trim().split(/\s+/).slice(0, 2).map((n) => n[0]).join("").toUpperCase()
    : "U";

  const dashboardHref = "/dashboard/user";

  return (
    <nav className="sticky top-0 z-50 w-full bg-gray-900/95 backdrop-blur-md border-b border-gray-800">
      <div className="px-4 sm:px-6 lg:px-12">
        <div className="flex h-20 items-center justify-between">

          {/* Left: Mobile Hamburger + Brand */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsMenuOpen((v) => !v)}
              className="inline-flex items-center justify-center rounded-xl p-2 text-gray-400 hover:bg-gray-800 sm:hidden transition-colors"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <Xmark className="h-6 w-6" /> : <Bars className="h-6 w-6" />}
            </button>

            <div className="flex items-center gap-2">
              <p className="text-lg font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                SkillSwap
              </p>
            </div>
          </div>

          {/* Center: Desktop Nav Links */}
          <div className="hidden sm:flex sm:items-center sm:gap-1 bg-gray-800 p-1.5 rounded-full border border-gray-700">
            {navLinks.map((item, index) => {
              const isActive = item.href === pathname;
              return (
                <Link
                  key={index}
                  href={item.href}
                  className={`text-xs font-semibold px-4 py-2 rounded-full transition-all duration-300 ${isActive
                    ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-sm"
                    : "text-gray-300 hover:text-white"
                    }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right: Auth */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center">
              {isPending ? (
                <div className="h-9 w-24 rounded-full bg-gray-800 animate-pulse" />
              ) : user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen((v) => !v)}
                    className="flex items-center gap-2 rounded-full pl-1 pr-3 py-1 border border-gray-700 hover:bg-gray-800 transition-colors"
                  >
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name || "User"}
                        width={500}
                        height={500}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white text-[11px] font-bold">
                        {initials}
                      </span>
                    )}
                    <span className="text-xs font-semibold text-gray-200 max-w-[100px] truncate">
                      {user.name || "Account"}
                    </span>
                    <ArrowChevronDown
                      className={`h-3.5 w-3.5 text-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-52 rounded-2xl border border-gray-700 bg-gray-800 shadow-xl p-1.5 overflow-hidden">
                      <Link
                        href="/"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block rounded-xl px-3 py-2 text-xs font-semibold text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                      >
                        Home
                      </Link>
                      <Link
                        href={dashboardHref}
                        onClick={() => setIsDropdownOpen(false)}
                        className="block rounded-xl px-3 py-2 text-xs font-semibold text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/skills/manage"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block rounded-xl px-3 py-2 text-xs font-semibold text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                      >
                        Manage Skills
                      </Link>
                      <div className="my-1 border-t border-gray-700" />
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <ArrowRightFromSquare className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    href="/auth/login"
                    className="border border-purple-500 px-4 text-sm text-purple-400 py-2 rounded-full hover:bg-purple-500/10 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    className="rounded-full bg-gradient-to-r from-purple-600 to-pink-500 font-semibold px-4 py-2 text-sm text-white hover:opacity-90 transition-all transform hover:-translate-y-0.5"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="sm:hidden border-t border-gray-800 bg-gray-900 px-4 pt-4 pb-6 space-y-4"
        >
          <div className="space-y-1.5">
            {navLinks.map((item, index) => {
              const isActive = item.href === pathname;
              return (
                <Link
                  key={index}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block rounded-xl px-4 py-3 text-sm font-semibold transition-all ${isActive
                    ? "text-purple-400 bg-purple-500/10 border border-purple-500/30"
                    : "text-gray-300 hover:bg-gray-800 border border-transparent"
                    }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="border-t border-gray-800 pt-4 space-y-2">
            {isPending ? (
              <div className="h-10 w-full rounded-xl bg-gray-800 animate-pulse" />
            ) : user ? (
              <>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-800 border border-gray-700">
                  {user.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={user.image}
                      alt={user.name || "User"}
                      className="h-9 w-9 rounded-full object-cover"
                    />
                  ) : (
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs font-bold">
                      {initials}
                    </span>
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-white truncate">
                      {user.name || "Account"}
                    </p>
                    <p className="text-[11px] text-gray-400 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>

                <Link
                  href={dashboardHref}
                  onClick={() => setIsMenuOpen(false)}
                  className="block rounded-xl border border-gray-700 px-4 py-3 text-sm font-bold text-gray-200 hover:bg-gray-800 transition-colors"
                >
                  Dashboard
                </Link>

                <Link
                  href="/skills/manage"
                  onClick={() => setIsMenuOpen(false)}
                  className="block rounded-xl border border-gray-700 px-4 py-3 text-sm font-bold text-gray-200 hover:bg-gray-800 transition-colors"
                >
                  Manage Skills
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-500/10 px-4 py-3 text-sm font-bold text-red-400 hover:bg-red-500/20 transition-colors"
                >
                  <ArrowRightFromSquare className="h-4 w-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center rounded-xl border border-purple-500 px-4 py-3 text-sm font-bold text-purple-400 hover:bg-purple-500/10 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 px-4 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 shadow-md"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}