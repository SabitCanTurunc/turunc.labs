import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kurumsal Yazılım & KOBİ Otomasyon Çözümleri",
  description:
    "Excel'den kurtulun. Çalışan takibi, stok yönetimi, süreç otomasyonu ve özel kurumsal yazılım çözümleri. KOBİ'ler ve büyük şirketler için Türkiye geneli hizmet.",
  keywords: [
    "kurumsal yazılım",
    "KOBİ yazılım",
    "iş süreçleri otomasyonu",
    "çalışan takip sistemi",
    "stok yönetimi yazılımı",
    "ERP yazılım",
    "şirket içi uygulama",
  ],
  openGraph: {
    title: "Kurumsal Yazılım & KOBİ Otomasyon | turunc.labs",
    description:
      "Excel'den kurtulun. Süreç otomasyonu, çalışan & stok takibi ve entegre kurumsal çözümler.",
    url: "https://turunc.labs/kurumsal-yazilim",
  },
  alternates: {
    canonical: "https://turunc.labs/kurumsal-yazilim",
  },
};

export default function KurumsalYazilimLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
