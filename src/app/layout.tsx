import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import { AosInit } from "@/components/aos-init";
import { Header } from "@/components/header";
import { Toast } from "@/components/toast";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin", "cyrillic-ext"],
  variable: "--font-jakarta",
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={fontSans.variable}>
      <body className="min-h-dvh bg-background text-foreground font-sans">
        <AosInit />
        <Toast />
        <div className="min-h-dvh px-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
