"use client";

import { ModeToggle } from "@/components/ThemeToggle";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, [setIsClient]);

  if (!isClient) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm">
      <div className="flex justify-center items-center h-12 shadow-md border-b">
        <div className="text-center">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
