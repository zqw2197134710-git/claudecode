import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "姜胖胖韩式自助烤肉 | 驻马店烤肉自助好评榜第1名",
  description: "匠心烤肉，极致美味。韩式自助烤肉，人均¥60，5,142条好评。包厢、免费停车、宝宝椅。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="relative flex min-h-full flex-col bg-bg text-text font-sans">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
