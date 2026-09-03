import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meridian Web Co. | Premium Web Design & Development",
  description: "Crafting digital solutions that drive results. We build premium, high-converting websites for top tier brands.",
  openGraph: {
    title: "Meridian Web Co.",
    description: "Crafting digital solutions that drive results.",
    url: "https://meridianweb.co",
    siteName: "Meridian Web Co.",
    images: [
      {
        url: "https://meridianweb.co/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Meridian Web Co. Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meridian Web Co.",
    description: "Crafting digital solutions that drive results.",
    images: ["https://meridianweb.co/og-image.jpg"],
  },
  alternates: {
    canonical: "https://meridianweb.co",
  },
};

import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-[var(--color-meridian-blue)] selection:text-white`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <CustomCursor />
          <Navbar />
          <main className="min-h-screen pt-24">{children}</main>
          <Footer />
          <Toaster richColors position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
