import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";

import "./globals.css";

// Define local fonts with CSS variables
const charismaExtraBold = localFont({
  src: "../public/fonts/CharismaTF-ExtraBold.woff2",
  weight: "800",
  style: "normal",
  variable: "--font-charisma-extra-bold",
});

const charismaRegular = localFont({
  src: "../public/fonts/CharismaTF-Regular.woff2",
  weight: "400",
  style: "normal",
  variable: "--font-charisma-regular",
});

const irSansXRegular = localFont({
  src: "../public/fonts/Woff2/IRSansXFaNum-Regular.woff2",
  weight: "400",
  style: "normal",
  variable: "--font-irsansx-regular",
});

const irSansXMedium = localFont({
  src: "../public/fonts/Woff2/IRSansXFaNum-Medium.woff2",
  weight: "500",
  style: "normal",
  variable: "--font-irsansx-medium",
});

const irSansXBold = localFont({
  src: "../public/fonts/Woff2/IRSansXFaNum-Bold.woff2",
  weight: "700",
  style: "normal",
  variable: "--font-irsansx-bold",
});

const montserrat = localFont({
  src: "../public/fonts/Montserrat-VariableFont.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "fire dns!",
  description: "created with love",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" suppressHydrationWarning>
      <body
        className={`${charismaExtraBold.variable} ${charismaRegular.variable} ${irSansXRegular.variable} ${irSansXMedium.variable} ${irSansXBold.variable} ${montserrat.variable} rtl font-sm`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          enableColorScheme
        >
          {children}
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              style: {
                fontSize: "14px",
                direction: "rtl",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
