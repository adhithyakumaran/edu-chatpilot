import "./globals.css";
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const fontDisplay = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ['400', '500', '600', '700', '800'],
  display: "swap",
});

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  title: "Edu ChatPilot | Pre-Placement Technical Training",
  description: "Master coding, aptitude, and interview skills in 30 days. Join the January 2026 batch now!",
};

import { AuthProvider } from '@/context/AuthContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-white font-sans antialiased text-brand-dark scroll-smooth",
          fontDisplay.variable,
          fontSans.variable
        )}
        suppressHydrationWarning
      >
        <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
