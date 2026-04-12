import type { Metadata } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const dmSerif = DM_Serif_Display({
  weight: "400",
  variable: "--font-dm-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Salut Lentera | Universitas Terbuka",
  description: "Learn, grow, and succeed with our world-class faculties and modern learning platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSerif.variable} h-full antialiased scroll-smooth`}>
      <body className={`min-h-full flex flex-col font-sans bg-white text-gray-900`}>
        {children}
      </body>
    </html>
  );
}
