import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mobil Uygulama Geliştirme — iOS & Android",
  description:
    "iOS ve Android için özel mobil uygulama geliştirme. Randevu, sipariş, takip uygulamaları. React Native ile hızlı teslimat. Türkiye geneli hizmet.",
  keywords: [
    "mobil uygulama geliştirme",
    "iOS uygulama",
    "Android uygulama",
    "React Native",
    "randevu uygulaması",
    "sipariş uygulaması",
    "özel mobil yazılım",
  ],
  openGraph: {
    title: "Mobil Uygulama Geliştirme iOS & Android | turunc.labs",
    description: "iOS ve Android için özel mobil uygulama. Hızlı teslimat, modern tasarım.",
    url: "https://turunc.labs/mobil-uygulama",
  },
  alternates: { canonical: "https://turunc.labs/mobil-uygulama" },
};

export default function MobilUygulamaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
