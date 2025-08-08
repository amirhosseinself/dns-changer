"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Smartphone, Monitor } from "lucide-react";
import Link from "next/link";

export default function DownloadModal() {
  // const downloadOptions = [
  //   {
  //     label: "نسخه اندروید",
  //     subtext: "فایل APK مستقیم",
  //     href: "/downloads/fire-dns-android.apk",
  //     icon: Smartphone,
  //     gradient: "from-green-400 via-emerald-500 to-green-600",
  //   },
  //   {
  //     label: "نسخه ویندوز",
  //     subtext: "فایل EXE نصبی",
  //     href: "/downloads/fire-dns-windows.exe",
  //     icon: Monitor,
  //     gradient: "from-blue-400 via-indigo-500 to-blue-700",
  //   },
  // ];

  return (
    <Dialog>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:scale-105 hover:shadow-lg transition-all duration-300 text-white flex items-center gap-2">
          <Download size={18} />
          دانلود
        </Button>
      </DialogTrigger>

      {/* Modal */}
      <DialogContent className="!bg-black/70 backdrop-blur-2xl text-white border border-white/10 p-6 rounded-2xl max-w-xs md:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-center">
            دانلود Fire DNS
          </DialogTitle>
        </DialogHeader>

        {/* Download Buttons */}
        <div className="mt-8 flex flex-col flex-wrap gap-4">
          <Link
            href="#download"
            className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold shadow-lg hover:scale-[1.02] transition-transform"
          >
            <Smartphone className="w-5 h-5" />
            دانلود اندروید
          </Link>

          <Link
            href="#download"
            className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-gray-700 text-white hover:bg-white/5 transition"
          >
            <Monitor className="w-5 h-5" />
            دانلود ویندوز
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
