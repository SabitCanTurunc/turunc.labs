import type { Metadata } from "next";
import { locales, hasLocale, rtlLocales, type Locale } from "@/dictionaries";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isEn = lang === "en";
  const isAr = lang === "ar";

  const titles = {
    tr: "turunc.labs | Yazılım & Dijital Dönüşüm Çözümleri",
    en: "turunc.labs | Software & Digital Transformation",
    ar: "turunc.labs | حلول البرمجيات والتحول الرقمي",
  };

  const descriptions = {
    tr: "Esnaftan kurumsal şirketlere kadar her ölçekteki işletme için özel yazılım, e-ticaret, mobil uygulama ve otomasyon çözümleri. Hatay merkezli, Türkiye geneli hizmet.",
    en: "Custom software, e-commerce, mobile apps, and automation solutions for businesses of all sizes. Hatay-based, serving all of Turkey and beyond.",
    ar: "حلول برمجية مخصصة وتجارة إلكترونية وتطبيقات جوال وأتمتة للأعمال بجميع أحجامها. نعمل من هاتاي ونخدم تركيا والعالم.",
  };

  const currentTitle = titles[lang as keyof typeof titles] ?? titles.tr;
  const currentDesc = descriptions[lang as keyof typeof descriptions] ?? descriptions.tr;

  const ogLocale = isEn ? "en_US" : isAr ? "ar_SA" : "tr_TR";

  return {
    metadataBase: new URL("https://turunc.labs"),
    title: {
      default: currentTitle,
      template: "%s | turunc.labs",
    },
    description: currentDesc,
    keywords: isEn
      ? ["software development", "e-commerce", "mobile app development", "enterprise software", "business automation", "web development", "turunc labs"]
      : isAr
      ? ["تطوير البرمجيات", "التجارة الإلكترونية", "تطوير تطبيقات الجوال", "برمجيات الشركات", "أتمتة الأعمال", "تطوير مواقع الويب", "turunc labs"]
      : ["yazılım geliştirme", "e-ticaret sitesi", "mobil uygulama geliştirme", "kurumsal yazılım", "esnaf dijitalleşme", "otomasyon", "web sitesi", "Hatay yazılım", "turunc labs"],
    authors: [{ name: "turunc.labs" }],
    creator: "turunc.labs",
    openGraph: {
      type: "website",
      locale: ogLocale,
      url: `https://turunc.labs/${lang}`,
      siteName: "turunc.labs",
      title: currentTitle,
      description: currentDesc,
    },
    twitter: {
      card: "summary_large_image",
      title: currentTitle,
      description: currentDesc,
    },
    alternates: {
      canonical: `https://turunc.labs/${lang}`,
      languages: {
        tr: "https://turunc.labs/tr",
        en: "https://turunc.labs/en",
        ar: "https://turunc.labs/ar",
      },
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
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: langParam } = await params;
  const lang: Locale = langParam in { tr: 1, en: 1, ar: 1 } ? (langParam as Locale) : "tr";
  const isRtl = (rtlLocales as string[]).includes(lang);

  return (
    <>
      {/* Set lang and dir attributes on the root html element */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang="${lang}";document.documentElement.dir="${isRtl ? "rtl" : "ltr"}";${isRtl ? 'document.documentElement.classList.add("font-arabic");' : ""}`,
        }}
      />
      <div className={`w-full max-w-[100vw] overflow-x-hidden flex flex-col min-h-screen relative`}>
        {children}
      </div>
    </>
  );
}
