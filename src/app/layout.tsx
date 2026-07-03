import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "turunc.labs | İşinizi Geleceğe Taşıyan Yazılım Çözümleri",
  description: "Mahallenin esnafından, plazadaki dev şirketlere kadar herkese uygun, anlaşılabilir ve müşteri kazandıran yazılım çözümleri üretiyoruz.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`scroll-smooth snap-y snap-mandatory ${poppins.variable} antialiased h-full`}>
      <body className="bg-slate-50 text-slate-800 overflow-x-hidden pt-20 font-sans min-h-screen flex flex-col selection:bg-turunc/30">
        {children}
      </body>
    </html>
  );
}
