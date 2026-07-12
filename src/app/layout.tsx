import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://turunc.labs"),
  title: {
    default: "turunc.labs | Yazılım & Dijital Dönüşüm Çözümleri",
    template: "%s | turunc.labs",
  },
  description:
    "Esnaftan kurumsal şirketlere kadar her ölçekteki işletme için özel yazılım, e-ticaret, mobil uygulama ve otomasyon çözümleri. Hatay merkezli, Türkiye geneli hizmet.",
  keywords: [
    "yazılım geliştirme",
    "e-ticaret sitesi",
    "mobil uygulama geliştirme",
    "kurumsal yazılım",
    "esnaf dijitalleşme",
    "otomasyon",
    "web sitesi",
    "Hatay yazılım",
    "turunc labs",
  ],
  authors: [{ name: "turunc.labs" }],
  creator: "turunc.labs",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://turunc.labs",
    siteName: "turunc.labs",
    title: "turunc.labs | Yazılım & Dijital Dönüşüm Çözümleri",
    description:
      "Esnaftan kurumsal şirketlere kadar her ölçekteki işletme için özel yazılım çözümleri. Hızlı teslimat, şeffaf fiyatlandırma, 7/24 destek.",
  },
  twitter: {
    card: "summary_large_image",
    title: "turunc.labs | Yazılım & Dijital Dönüşüm Çözümleri",
    description:
      "Esnaftan kurumsal şirketlere kadar her ölçekteki işletme için özel yazılım çözümleri.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`dark scroll-smooth ${geistSans.variable} ${geistMono.variable} antialiased h-full overflow-x-hidden max-w-full`}>
      <body className="bg-[#05080F] text-[#dbe2fd] overflow-x-hidden w-full max-w-full font-sans min-h-screen flex flex-col selection:bg-[#ff5625] selection:text-white">
        <div className="w-full max-w-[100vw] overflow-x-hidden flex flex-col min-h-screen relative">
          {children}
        </div>
      </body>
    </html>
  );
}
