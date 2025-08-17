"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

export default function VerifyPageClient() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("توکن وریفای یافت نشد.");
      return;
    }

    fetch("/api/auth/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setStatus("error");
          setMessage("توکن نامعتبر یا منقضی شده است.");
        } else {
          setStatus("success");
          setMessage("ایمیل شما با موفقیت تایید شد! 🎉");
          setTimeout(() => {
            window.location.href = "myapp://fire-dns";
          }, 3000);
        }
      })
      .catch((err) => {
        console.error(err);
        setStatus("error");
        setMessage("مشکلی پیش آمد. دوباره تلاش کنید.");
      });
  }, [token]);

  const getMessageColor = () => {
    switch (status) {
      case "success":
        return "text-green-400";
      case "error":
        return "text-red-400";
      default:
        return "text-gray-300";
    }
  };

  const getIcon = () => {
    switch (status) {
      case "success":
        return (
          <CheckCircle className="w-16 h-16 text-green-400 mb-4 mx-auto" />
        );
      case "error":
        return <XCircle className="w-16 h-16 text-red-400 mb-4 mx-auto" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-purple-900 via-indigo-900 to-black px-4">
      <div className="max-w-md w-full text-center p-10 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-3xl shadow-2xl border border-gray-700">
        <AnimatePresence mode="wait">
          <motion.div
            key={status}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            {getIcon()}
            <p className={`font-bold text-lg sm:text-xl ${getMessageColor()}`}>
              {status === "loading" ? "در حال بررسی ایمیل..." : message}
            </p>
            {status === "success" && (
              <p className="mt-4 text-gray-400 text-sm">
                در حال انتقال به اپلیکیشن شما...
              </p>
            )}
            {status === "error" && (
              <button
                onClick={() => window.location.reload()}
                className="mt-6 px-6 py-2 bg-red-600 text-white rounded-full shadow hover:bg-red-700 transition"
              >
                تلاش مجدد
              </button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
