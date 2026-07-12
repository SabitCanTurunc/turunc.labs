import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Esnaf & Küçük İşletme Dijitalleşme Paketi",
  description:
    "Dükkanınızı dijitale taşıyın. Google Haritalar, web sitesi, online sipariş, QR menü ve randevu sistemi. Uygun fiyat, hızlı kurulum. Hatay'dan Türkiye'ye hizmet.",
  keywords: [
    "esnaf web sitesi",
    "küçük işletme dijitalleşme",
    "Google haritalar esnaf",
    "online sipariş sistemi",
    "QR menü",
    "Hatay web sitesi",
    "esnaf yazılım",
  ],
  openGraph: {
    title: "Esnaf & Küçük İşletme Dijitalleşme Paketi | turunc.labs",
    description:
      "Dükkanınızı dijitale taşıyın. Web sitesi, Google SEO, online sipariş ve daha fazlası.",
    url: "https://turunc.labs/esnaf-paketi",
  },
  alternates: {
    canonical: "https://turunc.labs/esnaf-paketi",
  },
};

export default function EsnafPaketiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
