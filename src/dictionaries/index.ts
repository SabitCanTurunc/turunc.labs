import tr from "./tr";
import en from "./en";
import ar from "./ar";

export type { Dictionary } from "./tr";

const dictionaries = {
  tr,
  en,
  ar,
} as const;

export type Locale = keyof typeof dictionaries;

export const locales: Locale[] = ["tr", "en", "ar"];
export const defaultLocale: Locale = "tr";

/** Locales that use right-to-left text direction */
export const rtlLocales: Locale[] = ["ar"];

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export const getDictionary = (locale: Locale) => dictionaries[locale];
