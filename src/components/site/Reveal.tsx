import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={cn("reveal", shown && "reveal-in", className)}>
      {children}
    </div>
  );
}

export function SectionHead({ eyebrow, title, center = true }: { eyebrow: string; title: string; center?: boolean }) {
  return (
    <Reveal className={cn("mb-12", center && "text-center")}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight md:text-5xl">{title}</h2>
      <div className={cn("mt-4 h-1 w-16 bg-primary", center && "mx-auto")} />
    </Reveal>
  );
}
