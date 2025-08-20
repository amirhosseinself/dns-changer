// components/Hero.tsx
"use client";

import { motion } from "framer-motion";
import { Smartphone, Monitor } from "lucide-react";
import Link from "next/link";

/**
 * Hero section for Fire DNS landing page.
 * - Left: title, subtitle, CTA buttons
 * - Right: mockups (simple svg/placeholder)
 */

export default function Hero() {
  return (
    <section id="home" className="container mx-auto py-28 px-6">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
            اتصال سریع و امن با{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
              Fire DNS
            </span>
          </h2>

          <p className="mt-6 text-gray-300 max-w-xl">
            DNS هوشمند برای مرور سریع‌تر، پایدارتر و بدون محدودیت — مناسب برای
            موبایل و دسکتاپ. نصب ساده، مصرف کم منابع و امنیت بالاتر.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={
                "https://github.com/isina-nej/FireDNS/releases/download/v2.0.0/FireDNS.apk"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-black font-semibold shadow-lg hover:scale-[1.02] transition-transform"
            >
              <Smartphone className="w-5 h-5" />
              دانلود اندروید
            </Link>

            <Link
              href="#download"
              className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-gray-700 text-white hover:bg-white/5 transition"
            >
              <Monitor className="w-5 h-5" />
              دانلود ویندوز (به زودی)
            </Link>
          </div>

          <div className="mt-6 text-sm text-gray-500">
            {/* <span className="inline-block mr-2">⭐ 4.8</span> */}
            {/* <span>• بیش از 50K نصب فعال</span> */}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center md:justify-end"
          viewport={{ once: true }}
        >
          {/* Simple mockup placeholders - replace with real images or svgs */}
          <div className="relative">
            <div className="w-64 h-44 md:w-72 md:h-52 bg-gradient-to-br from-[#111111] to-[#0b0b0b] rounded-2xl shadow-2xl flex items-center justify-center">
              <div className="text-center">
                <div className="text-sm text-gray-400">Fire DNS</div>
                <div className="mt-2 text-xs text-gray-500">
                  Android • connected
                </div>
              </div>
            </div>

            <div className="absolute right-[-30px] top-10 w-80 h-48 md:w-96 md:h-56 bg-gradient-to-br from-[#0b0b0b] to-[#060606] rounded-3xl shadow-2xl transform rotate-3 hidden sm:block">
              <div className="p-6">
                <div className="text-sm text-gray-400">Fire DNS</div>
                <div className="mt-3 text-xs text-gray-500">
                  Windows • running
                </div>
              </div>
            </div>

            <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-gradient-to-r from-red-500 to-orange-400 opacity-20 blur-3xl" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
