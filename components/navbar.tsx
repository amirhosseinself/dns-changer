"use client";

import { ModeToggle } from "@/components/ThemeToggle";
import Link from "next/link";
import { useEffect, useState } from "react";

const navbarData = [
  { title: "داشبورد", href: "/admin/dashboard" },
  { title: "ارسال نوتیفیکیشن", href: "/admin/dashboard/send-notification" },
  { title: "تنظیمات", href: "/admin/dashboard/settings" },
];

const Navbar = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, [setIsClient]);

  if (!isClient) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm">
      <div className="flex justify-between container items-center h-12 shadow-md border-b">
        <div className="font-medium flex items-center">
          {navbarData.map((item) => (
            <div className="mx-2 text-sm hover:underline px-2" key={item.href}>
              <Link href={item.href}>{item.title}</Link>
            </div>
          ))}
        </div>
        <div className="text-center">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
