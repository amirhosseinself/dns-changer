// components/Versions.tsx
"use client";

import { Check } from "lucide-react";
import Link from "next/link";

/**
 * Versions comparison / download cards for Android & Windows
 */

const androidFeatures = [
  "نصب آسان (APK)",
  "خودکار روشن شدن پس از راه‌اندازی",
  "پشتیبانی از VPN mode",
];

const windowsFeatures = [
  "ران‌تایم سبک برای ویندوز",
  "استارت آپ خودکار",
  "پروفایل‌های DNS قابل تنظیم",
];

function FeatureItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3 text-sm text-gray-300">
      <Check className="w-4 h-4 mt-1 text-green-400" />
      <span>{text}</span>
    </li>
  );
}

export default function Versions() {
  return (
    <section id="download" className="container mx-auto py-20 px-6">
      <h3 className="text-2xl font-bold mb-8">دانلود Fire DNS</h3>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white/3 border border-white/6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-semibold">Android</h4>
              <p className="text-sm text-gray-300">نسخه موبایل - APK</p>
            </div>
            <div className="text-red-400 font-bold">v2.0.0</div>
          </div>

          <ul className="mt-6 space-y-3">
            {androidFeatures.map((f) => (
              <FeatureItem key={f} text={f} />
            ))}
          </ul>

          <div className="mt-6 flex gap-3">
            <Link
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-black font-semibold"
              href={
                "https://github.com/isina-nej/FireDNS/releases/download/v2.0.0/FireDNS.apk"
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              دانلود APK
            </Link>

            <Link
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-700"
              href="#faq"
            >
              راهنما نصب
            </Link>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white/3 border border-white/6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-semibold">Windows</h4>
              <p className="text-sm text-gray-300">نسخه دسکتاپ - Installer</p>
            </div>
            <div className="text-red-400 font-bold">v1.0.0</div>
          </div>

          <ul className="mt-6 space-y-3">
            {windowsFeatures.map((f) => (
              <FeatureItem key={f} text={f} />
            ))}
          </ul>

          <div className="mt-6 flex gap-3">
            <Link
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-black font-semibold"
              href="#"
            >
              دانلود ویندوز (به زودی)
            </Link>

            <Link
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-700"
              href="#faq"
            >
              راهنما نصب
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
