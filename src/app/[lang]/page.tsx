import { getDictionary, hasLocale, type Locale } from "@/dictionaries";
import { notFound } from "next/navigation";
import HomeClient from "./HomeClient";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: langParam } = await params;

  if (!hasLocale(langParam)) {
    notFound();
  }

  const lang = langParam as Locale;
  const dict = getDictionary(lang);

  return <HomeClient dict={dict} lang={lang} />;
}
