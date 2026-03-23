import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Elite Animation Studio - Cinematic Web Experiences with GSAP",
  description: "High-performance web animations with GSAP 3.14+. Brutalist-modern UI/UX design with scroll-driven narratives, micro-interactions, and 60fps guaranteed.",
  keywords: ["GSAP", "Next.js", "TypeScript", "Animation", "Motion Design", "ScrollTrigger", "Brutalist Design", "React", "Web Animation"],
  authors: [{ name: "Elite Animation Studio" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Elite Animation Studio",
    description: "Cinematic web experiences with GSAP - Brutalist-Modern UI/UX",
    url: "https://marktantongco.github.io/elite-animation-studio",
    siteName: "Elite Animation Studio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elite Animation Studio",
    description: "Cinematic web experiences with GSAP - 60fps guaranteed",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
