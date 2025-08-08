// components/Footer.tsx
"use client";

import { Mail, Instagram, MessageSquare } from "lucide-react";
import Link from "next/link";

/**
 * Simple footer with contact and social links
 */

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-white/6 mt-12">
      <div className="container mx-auto py-10 px-6 flex flex-col md:flex-row justify-between items-start gap-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="text-2xl">🔥</div>
            <div>
              <div className="font-bold">Fire DNS</div>
              <div className="text-sm text-gray-400">
                امنیت و سرعت برای اینترنت شما
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-sm text-gray-300">پشتیبانی</div>
          <Link
            href="mailto:support@firedns.example"
            className="flex items-center gap-2 text-gray-300"
          >
            <Mail className="w-4 h-4" /> support@firedns.example
          </Link>
        </div>

        <div className="flex gap-3">
          <Link
            href="#"
            aria-label="telegram"
            className="p-2 rounded-md bg-white/3"
          >
            <MessageSquare className="w-5 h-5" />
          </Link>
          <Link
            href="#"
            aria-label="instagram"
            className="p-2 rounded-md bg-white/3"
          >
            <Instagram className="w-5 h-5" />
          </Link>
        </div>
      </div>

      <div className="text-center text-sm text-gray-600 py-4 border-t border-white/4">
        © {new Date().getFullYear()} Fire DNS — All rights reserved.
      </div>
    </footer>
  );
}
