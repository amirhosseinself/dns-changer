// components/Faq.tsx
"use client";

/**
 * FAQ - simple custom accordion if shadcn not available.
 * If you have shadcn UI accordion, you can replace this with that component.
 */

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "آیا Fire DNS امن است؟",
    a: "بله — Fire DNS از پروتکل‌های استاندارد DNS و فیلتر لیست‌های امن استفاده می‌کند.",
  },
  {
    q: "چطور می‌توانم نسخه اندروید نصب کنم؟",
    a: "کافیست فایل APK را دانلود و نصب کنید (ممکن است نیاز به مجوز نصب از منابع ناشناس باشد).",
  },
  {
    q: "آیا Fire DNS تبلیغات را مسدود می‌کند؟",
    a: "بله، یکی از قابلیت‌ها مسدودسازی ردیاب‌ها و تبلیغات در سطح DNS است.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="container mx-auto py-20 px-6">
      <h3 className="text-2xl font-bold mb-6">سوالات متداول</h3>

      <div className="space-y-3 max-w-3xl">
        {faqs.map((f, i) => (
          <div
            key={i}
            className="bg-white/3 rounded-2xl p-4 border border-white/6"
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between text-left"
            >
              <div>
                <div className="font-semibold">{f.q}</div>
              </div>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  open === i ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            <div
              className={`mt-3 text-gray-300 overflow-hidden transition-[max-height,opacity] duration-300 ${
                open === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-sm">{f.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
