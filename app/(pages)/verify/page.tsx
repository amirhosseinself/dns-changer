"use client";

import { Suspense } from "react";

import VerifyPageClient from "./VerifyPageClient";
import { AnimatePresence, motion } from "framer-motion";

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-purple-900 via-indigo-900 to-black px-4">
          <div className="max-w-md w-full text-center p-10 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-3xl shadow-2xl border border-gray-700">
            <AnimatePresence mode="wait">
              <motion.div
                key={"loading-s"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
              >
                <p className={`font-bold text-lg sm:text-xl}`}>
                  در حال بررسی ایمیل...
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      }
    >
      <VerifyPageClient />
    </Suspense>
  );
}
