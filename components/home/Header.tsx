// components/Header.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 ${
        scrolled ? "bg-black/70 backdrop-blur-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-xl font-bold">🔥 Fire DNS</h1>
        <nav className="hidden md:flex gap-6">
          <Link href="#home" className="hover:text-red-400">
            خانه
          </Link>
          <Link href="#features" className="hover:text-red-400">
            ویژگی‌ها
          </Link>
          <Link href="#download" className="hover:text-red-400">
            دانلود
          </Link>
          <Link href="#faq" className="hover:text-red-400">
            سوالات
          </Link>
        </nav>
        <Button className="bg-gradient-to-r from-red-500 to-orange-500">
          دانلود
        </Button>
      </div>
    </motion.header>
  );
}
