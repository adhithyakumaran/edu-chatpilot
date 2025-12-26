import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "ChatPilot Education | Pre-Placement Training - January 2026 Batch",
    description: "Become interview-ready in 30 days. Structured live training covering coding, aptitude, resume building, and interview prep for Indian college students. Enroll for January 2026 batch at ₹499 (festive offer).",
    keywords: "pre-placement training, interview preparation, coding bootcamp, aptitude training, resume building, placement training India",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </head>
            <body className={inter.className}>{children}</body>
        </html>
    );
}
