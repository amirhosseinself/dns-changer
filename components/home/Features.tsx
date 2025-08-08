// components/Features.tsx
"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, EyeOff, Cpu } from "lucide-react";

/**
 * Features list - 4 cards
 */

const features = [
  {
    title: "سرعت فوق‌العاده",
    desc: "پاسخ‌دهی سریع DNS برای بارگذاری سریع صفحات.",
    icon: Zap,
  },
  {
    title: "حفاظت و امنیت",
    desc: "فیلتر تهدیدات و حفظ حریم خصوصی DNS.",
    icon: ShieldCheck,
  },
  {
    title: "بدون تبلیغ",
    desc: "مسدودسازی تبلیغات و ردیاب‌ها در سطح DNS.",
    icon: EyeOff,
  },
  {
    title: "مصرف پایین منابع",
    desc: "سبک و بهینه برای موبایل و دسکتاپ.",
    icon: Cpu,
  },
];

export default function Features() {
  return (
    <section id="features" className="container mx-auto py-20 px-6">
      <motion.h3
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold text-white mb-8"
      >
        چرا Fire DNS؟
      </motion.h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, idx) => {
          const Icon = f.icon;
          return (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.45 }}
              className="bg-white/3 p-6 rounded-2xl border border-white/6 backdrop-blur-sm"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-white/6">
                <Icon className="w-6 h-6 text-red-400" />
              </div>

              <h4 className="mt-4 font-semibold text-lg">{f.title}</h4>
              <p className="mt-2 text-sm text-gray-300">{f.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
