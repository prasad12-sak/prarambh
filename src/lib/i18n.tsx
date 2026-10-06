import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { t, type Dict, type Lang } from "@/content/translations";

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; d: Dict }>({ lang: "en", setLang: () => {}, d: t.en });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => {
    const s = localStorage.getItem("ppa-lang");
    if (s === "mr" || s === "en") setLangState(s);
  }, []);
  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("ppa-lang", l);
    document.documentElement.lang = l;
  };
  return <Ctx.Provider value={{ lang, setLang, d: t[lang] as Dict }}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);
