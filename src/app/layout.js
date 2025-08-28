// src/app/layout.js
import "./globals.css";
import { Inter, Manrope } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Заголовки / CTA
const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

// Базовый UI-шрифт
const inter = Inter({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ui",
  display: "swap",
});

export const metadata = {
  title: "HEF Service — закупка SIM",
  description:
    "Скупаем SIM-карты у поставщиков. Быстрый тест и оплата до 48 часов. Любые операторы и страны.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={`${manrope.variable} ${inter.variable}`}>
      <body className="antialiased bg-[var(--hef-bg)] text-[var(--hef-fg)]">
        <Header />
        {/* отступ под фиксированную шапку, если нужно */}
        <div className="h-14" />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}