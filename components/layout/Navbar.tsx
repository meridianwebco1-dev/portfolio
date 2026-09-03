"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Services", href: "#services" },
  { name: "Work", href: "#work" },
  { name: "Process", href: "#process" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const { setTheme, theme, systemTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentTheme = theme === "system" ? systemTheme : theme;
  const toggleTheme = () => {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "py-4" : "py-6"
      )}
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <nav
          className={cn(
            "flex items-center justify-between rounded-full px-6 py-3 transition-all duration-300",
            isScrolled ? "glass shadow-lg" : "bg-transparent"
          )}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 z-50">
            <div className="relative w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden">
              <Image src="/logo.jpg" alt="Meridian Web Co. Logo" fill className="object-cover" />
            </div>
            <span className="font-bold text-lg tracking-tight hidden sm:block">Meridian</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex gap-6 items-center">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium hover:text-[var(--color-meridian-blue)] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="flex items-center gap-4 border-l border-[var(--color-meridian-muted)]/30 pl-4">
              {mounted && (
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-[var(--foreground)]/10 transition-colors"
                  aria-label="Toggle theme"
                >
                  {currentTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              )}
              <Link
                href="#contact"
                className="px-5 py-2 rounded-full bg-[var(--foreground)] text-[var(--background)] font-medium text-sm hover:scale-105 transition-transform active:scale-95"
              >
                Let's Talk
              </Link>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden z-50 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[var(--background)] glass"
          >
            <ul className="flex flex-col gap-8 items-center text-2xl font-medium">
              {navLinks.map((link) => (
                <motion.li
                  key={link.name}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-[var(--color-meridian-blue)] transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mt-12 flex items-center gap-6">
              {mounted && (
                <button
                  onClick={toggleTheme}
                  className="p-3 rounded-full bg-[var(--foreground)]/10"
                >
                  {currentTheme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
                </button>
              )}
              <Link
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-8 py-3 rounded-full bg-[var(--foreground)] text-[var(--background)] font-medium text-lg"
              >
                Let's Talk
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
