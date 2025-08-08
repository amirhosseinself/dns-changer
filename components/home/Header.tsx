"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import DownloadModal from "@/components/home/DownloadModal"; // The modal we built earlier

const navLinks = [
  { label: "خانه", href: "#home" },
  { label: "ویژگی‌ها", href: "#features" },
  { label: "دانلود", href: "#download" },
  { label: "سوالات", href: "#faq" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("#home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      // Track active section
      const sections = navLinks.map((l) => document.querySelector(l.href));
      let current = "#home";
      sections.forEach((section, i) => {
        if (section) {
          const top = section.getBoundingClientRect().top;
          if (top <= 100) current = navLinks[i].href;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gradient-to-r from-black/70 via-black/50 to-black/70 backdrop-blur-lg shadow-lg"
          : "bg-transparent"
      } ${menuOpen ? "bg-black" : ""}`}
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <motion.h1
          animate={{ scale: scrolled ? 0.9 : 1 }}
          transition={{ duration: 0.2 }}
          className="text-xl font-bold flex items-center gap-2"
        >
          <span>🔥</span> Fire DNS
        </motion.h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-red-500 after:transition-all after:duration-300 ${
                activeSection === link.href
                  ? "after:w-full text-red-400"
                  : "after:w-0"
              } hover:after:w-full`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <DownloadModal />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-black/50 backdrop-blur-lg px-6 py-4"
          >
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block py-2 ${
                      activeSection === link.href ? "text-red-400" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <DownloadModal />
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
