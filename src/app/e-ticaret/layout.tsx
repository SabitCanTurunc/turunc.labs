import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-Ticaret Sitesi & Online Satış Sistemleri",
  description:
    "Komisyonsuz kendi e-ticaret sitenizi açın. Ürün yönetimi, ödeme entegrasyonu, kargo takibi ve müşteri paneli. Yerel işletmeden ulusal markaya kadar her ölçek için.",
  keywords: [
    "e-ticaret sitesi kurma",
    "online mağaza açma",
    "e-ticaret yazılımı",
    "komisyonsuz satış",
    "ödeme entegrasyonu",
    "Türkiye e-ticaret",
    "online sipariş sistemi",
  ],
  openGraph: {
    title: "E-Ticaret Sitesi & Online Satış Sistemleri | turunc.labs",
    description: "Komisyonsuz kendi e-ticaret sitenizi açın. Her ölçek için özel çözümler.",
    url: "https://turunc.labs/e-ticaret",
  },
  alternates: { canonical: "https://turunc.labs/e-ticaret" },
};

export default function ETicaretLayout({ children }: { children: React.ReactNode }) {
  return children;
}
