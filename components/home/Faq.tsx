"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/public/data";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="container mx-auto py-20 px-6">
      <h3 className="text-2xl font-bold mb-6">سوالات متداول</h3>

      <div className="space-y-3 max-w-4xl mx-auto">
        {faqs.map((f, i) => (
          <div
            key={i}
            className="bg-white/5 rounded-2xl p-4 border border-white/10 shadow-sm"
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
              <p className="text-sm leading-relaxed">{f.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
