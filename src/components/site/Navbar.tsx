import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { whatsappLink } from "@/config/site";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

export const sectionIds = ["home", "about", "programs", "why", "batches", "achievers", "testimonials", "gallery", "contact"] as const;

export function Logo() {
  return (
    <a href="#home" className="flex items-center gap-2.5">
      <img src={logo} alt="Prarambh logo" className="h-10 w-10 rounded-md object-cover ring-1 ring-white/10" />
      <span className="font-display leading-none">
        <span className="block text-lg font-bold uppercase tracking-wide">Prarambh</span>
        <span className="block text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground">Physical Academy</span>
      </span>
    </a>
  );
}

export function Navbar() {
  const { d, lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sectionIds.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);

  const LangToggle = () => (
    <div className="flex overflow-hidden rounded-md border text-xs font-semibold">
      {(["en", "mr"] as const).map((l) => (
        <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l}
          className={cn("px-2.5 py-1.5 transition-colors", lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground")}>
          {l === "en" ? "EN" : "मराठी"}
        </button>
      ))}
    </div>
  );

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all", scrolled ? "border-b bg-ink/90 backdrop-blur-md" : "bg-transparent")}>
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-6">
        <Logo />
        <nav className="hidden items-center gap-1 xl:flex" aria-label="Main">
          {sectionIds.map((id) => (
            <a key={id} href={`#${id}`}
              className={cn("relative px-2.5 py-2 text-sm font-medium transition-colors hover:text-primary", active === id ? "text-primary" : "text-foreground/80")}>
              {d.nav[id]}
              {active === id && <span className="absolute inset-x-2.5 -bottom-0.5 h-0.5 bg-primary" />}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LangToggle />
          <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn-primary hidden !px-4 !py-2 text-sm sm:inline-flex">{d.join}</a>
          <button className="xl:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t bg-ink/95 backdrop-blur-md xl:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-4">
            {sectionIds.map((id) => (
              <a key={id} href={`#${id}`} onClick={() => setOpen(false)}
                className={cn("border-b py-3 font-display text-lg uppercase tracking-wide", active === id ? "text-primary" : "")}>
                {d.nav[id]}
              </a>
            ))}
            <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn-primary mt-4 w-full">{d.join}</a>
          </nav>
        </div>
      )}
    </header>
  );
}
