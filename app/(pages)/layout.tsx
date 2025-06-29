"use client";

import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, [setIsClient]);

  if (!isClient) return null;
  return (
    <SessionProvider>
      <div>{children}</div>
    </SessionProvider>
  );
}
