import { useEffect, useRef, useState } from "react";
import { ArrowRight, Dumbbell, Target, TrendingUp, Users } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { site, whatsappLink } from "@/config/site";
import { cn } from "@/lib/utils";

export function Hero() {
  const { d } = useLang();
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % site.heroImages.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="home" className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink">
      {site.heroImages.map((src, idx) => (
        <img key={idx} src={src} alt="Academy training" width={1920} height={1088}
          loading={idx === 0 ? "eager" : "lazy"}
          className={cn("absolute inset-0 h-full w-full object-cover transition-opacity duration-1000", idx === i ? "opacity-100 animate-kenburns" : "opacity-0")} />
      ))}
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="relative mx-auto w-full max-w-7xl px-4 pt-28 pb-20 lg:px-6">
        <div className="max-w-3xl">
          <p className="eyebrow">Prarambh Physical Academy</p>
          <h1 key={`q-${i}-${d.heroQuotes[0]}`} className="animate-quote mt-5 font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight md:text-7xl">
            {d.heroQuotes[i]}
          </h1>
          <p className="mt-6 text-xl font-semibold text-primary">{d.tagline}</p>
          <p className="mt-3 max-w-xl text-base text-foreground/80 md:text-lg">{d.heroSub}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#programs" className="btn-primary">{d.explore} <ArrowRight className="h-4 w-4" /></a>
            <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn-outline">{d.join}</a>
          </div>
          <div className="mt-12 flex gap-2">
            {site.heroImages.map((_, idx) => (
              <button key={idx} onClick={() => setI(idx)} aria-label={`Slide ${idx + 1}`}
                className={cn("h-1 rounded-full transition-all", idx === i ? "w-10 bg-primary" : "w-5 bg-foreground/30")} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => { const p = Math.min(1, (t - start) / 1200); setN(Math.round(p * to)); if (p < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    });
    io.observe(el); return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{n}</span>;
}

const statIcons = [Dumbbell, Users, TrendingUp, Target];

export function Stats() {
  const { d } = useLang();
  return (
    <section className="relative z-10 border-y bg-surface">
      <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
        {d.stats.map((s, idx) => {
          const Icon = statIcons[idx] ?? Target;
          return (
            <div key={idx} className="flex items-center gap-4 border-r px-5 py-7 last:border-r-0 [&:nth-child(2)]:border-r-0 lg:[&:nth-child(2)]:border-r">
              <Icon className="h-8 w-8 shrink-0 text-primary" />
              <div>
                <div className="font-display text-3xl font-bold text-foreground">
                  {"text" in s && s.text ? s.text : <><Counter to={s.value} />{s.suffix}</>}
                </div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
