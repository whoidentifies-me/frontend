import { chainedTranslator, flatten, translator } from "@solid-primitives/i18n";
import { en } from "./en";
import { createContext, useContext, createSignal } from "solid-js";

const defaultDict = en;

type Dict = typeof defaultDict;

type Locale = "en";

export type Translator = ReturnType<typeof chainedTranslator<Dict, string>>;

export const defaultLocale: Locale = "en";

// Pre-flatten at module load time (happens once per process)
const flattenedDicts: Record<Locale, ReturnType<typeof flatten<Dict>>> = {
  en: flatten(en),
};

const I18nContext = createContext<{
  locale: () => Locale;
  setLocale: (locale: Locale) => void;
  t: Translator;
}>();

export function I18nProvider(props: { children: any; initialLocale?: Locale }) {
  const [locale, setLocale] = createSignal<Locale>(props.initialLocale || "en");
  const t = chainedTranslator(
    defaultDict,
    translator(() => flattenedDicts[locale()] as Dict)
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {props.children}
    </I18nContext.Provider>
  );
}

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
};

export const useTranslate = () => {
  const context = useContext(I18nContext);
  if (!context?.t) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context.t;
};
