import { Award, BadgeCheck, Calendar, CheckCircle2, Clock, Flame, HeartHandshake, IndianRupee, MapPin, Medal, ShieldCheck, Sparkles, Target, Timer, TrendingUp, Trophy, User, UserCheck, Zap, Activity, Mountain, Trees, Swords, Flag, Crosshair, Star } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { site, whatsappLink } from "@/config/site";
import { Reveal, SectionHead } from "./Reveal";

export function About() {
  const { d } = useLang();
  return (
    <section id="about" className="py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-[5fr_7fr] lg:px-6">
        <Reveal>
          <div className="relative mx-auto max-w-sm">
            <div className="absolute -inset-3 -z-0 rounded-2xl border-2 border-primary/40 translate-x-4 translate-y-4" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface shadow-lg ring-1 ring-primary/10">
              {site.director.photo ? (
                <img src={site.director.photo} alt={site.director.name} className="h-full w-full object-cover object-center" loading="lazy" />
              ) : (
                <div className="grid h-full place-items-center text-muted-foreground"><User className="h-28 w-28" strokeWidth={1} /></div>
              )}
            </div>
            <div className="absolute -bottom-5 left-5 right-5 rounded-lg bg-gradient-primary p-4 text-primary-foreground shadow-lg">
              <div className="font-display text-xl font-bold uppercase">{site.director.name}</div>
              <div className="text-sm font-medium">{d.director.role}</div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <p className="eyebrow">{d.director.eyebrow}</p>
          <h2 className="mt-3 font-display text-4xl font-bold uppercase md:text-5xl">{d.director.title}</h2>
          <div className="mt-4 h-1 w-16 bg-primary" />
          <blockquote className="mt-6 border-l-4 border-primary pl-6 text-lg leading-relaxed text-foreground/90">“{d.director.message}”</blockquote>
          <div className="mt-8">
            <div className="font-display text-3xl italic text-primary">{site.director.name}</div>
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{d.director.sign}</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const programIcons = [ShieldCheck, Swords, Trees, UserCheck, Flag, Crosshair, Mountain, Flame, Medal];

export function Programs() {
  const { d } = useLang();
  return (
    <section id="programs" className="bg-ink py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <SectionHead eyebrow={d.programs.eyebrow} title={d.programs.title} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {d.programs.items.map((p, idx) => {
            const Icon = programIcons[idx] ?? Medal;
            return (
              <Reveal key={idx} delay={(idx % 3) * 100}>
                <article className="card-pro group flex h-full flex-col p-7">
                  <div className="flex items-center justify-between">
                    <span className="grid h-14 w-14 place-items-center rounded-lg bg-primary/12 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="h-7 w-7" />
                    </span>
                    <span className="font-display text-4xl font-bold text-foreground/10">0{idx + 1}</span>
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold uppercase">{p.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-foreground/60">{d.programs.activities}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {d.programs.activityList.map((a) => (
                      <span key={a} className="inline-flex items-center gap-1 rounded-md border bg-surface px-2.5 py-1 text-xs">
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary" />{a}
                      </span>
                    ))}
                  </div>
                  <a href={whatsappLink(`Hello Prarambh Physical Academy, I am interested in the ${p.name} training program. Please share details.`)}
                    target="_blank" rel="noreferrer" className="mt-auto pt-6 text-sm font-semibold uppercase tracking-wider text-primary hover:underline">
                    {d.programs.enquire} →
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const stepIcons = [Target, Activity, Timer, TrendingUp, Trophy];

export function Approach() {
  const { d } = useLang();
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <SectionHead eyebrow={d.approach.eyebrow} title={d.approach.title} />
        <div className="relative grid gap-8 md:grid-cols-5">
          <div className="absolute left-0 right-0 top-8 hidden h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent md:block" />
          {d.approach.steps.map((s, idx) => {
            const Icon = stepIcons[idx] ?? Target;
            return (
              <Reveal key={idx} delay={idx * 120} className="relative text-center">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border-2 border-primary bg-background text-primary">
                  <Icon className="h-7 w-7" />
                </div>
                <div className="mt-2 font-display text-sm text-muted-foreground">0{idx + 1}</div>
                <h3 className="mt-1 font-display text-2xl font-bold uppercase">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const whyIcons = [Award, Zap, HeartHandshake, Sparkles, TrendingUp, Flame, ShieldCheck, Trophy];

export function WhyUs() {
  const { d } = useLang();
  return (
    <section id="why" className="bg-ink py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <SectionHead eyebrow={d.why.eyebrow} title={d.why.title} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {d.why.items.map((w, idx) => {
            const Icon = whyIcons[idx] ?? Award;
            return (
              <Reveal key={idx} delay={(idx % 4) * 90}>
                <div className="card-pro h-full p-6">
                  <Icon className="h-9 w-9 text-primary" />
                  <h3 className="mt-4 font-display text-xl font-bold uppercase">{w.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{w.d}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Batches() {
  const { d } = useLang();
  const b = d.batches;
  return (
    <section id="batches" className="py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <SectionHead eyebrow={b.eyebrow} title={b.title} />
        <div className="grid gap-6 lg:grid-cols-3">
          {b.items.map((x, idx) => (
            <Reveal key={idx} delay={idx * 120}>
              <div className="card-pro flex h-full flex-col overflow-hidden">
                <div className="flex items-center justify-between border-b bg-surface px-6 py-4">
                  <h3 className="font-display text-2xl font-bold uppercase">{x.name}</h3>
                  <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">{x.status}</span>
                </div>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-4 p-6 text-sm">
                  {[
                    [ShieldCheck, b.program, x.program], [Calendar, b.reg, x.reg], [Calendar, b.start, x.start], [Clock, b.time, x.time],
                    [Timer, b.duration, x.duration], [IndianRupee, b.fees, x.fees], [MapPin, b.location, x.location],
                  ].map(([I, label, val], k) => {
                    const Ic = I as typeof Clock;
                    return (
                      <div key={k}>
                        <dt className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground"><Ic className="h-3.5 w-3.5 text-primary" />{label as string}</dt>
                        <dd className="mt-1 font-semibold">{val as string}</dd>
                      </div>
                    );
                  })}
                </dl>
                <div className="mt-auto p-6 pt-0">
                  <a href={whatsappLink(`Hello Prarambh Physical Academy, I want to join the "${x.name}" (${x.program}). Please share admission details.`)}
                    target="_blank" rel="noreferrer" className="btn-primary w-full">{b.cta}</a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaBand() {
  const { d } = useLang();
  return (
    <section className="relative overflow-hidden">
      <img src={site.heroImages[3]} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-overlay" />
      <div className="relative mx-auto max-w-4xl px-4 py-24 text-center">
        <Reveal>
          <h2 className="font-display text-4xl font-bold uppercase md:text-6xl">{d.cta.title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-foreground/80">{d.cta.sub}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn-primary">{d.cta.join}</a>
            <a href="#contact" className="btn-outline">{d.cta.contact}</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Achievers() {
  const { d } = useLang();
  const a = d.achievers;
  return (
    <section id="achievers" className="bg-ink py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <SectionHead eyebrow={a.eyebrow} title={a.title} />
        <div className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-4">
          {a.items.map((s, idx) => (
            <Reveal key={idx} delay={idx * 100} className="w-[78%] shrink-0 snap-center md:w-auto">
              <div className="card-pro h-full overflow-hidden text-center">
                <div className="relative grid aspect-square place-items-center overflow-hidden bg-surface text-muted-foreground">
                  {s.image ? (
                    <img src={s.image} alt={s.name} className="h-full w-full object-cover" loading="lazy" />
                  ) : (
                    <User className="h-24 w-24" strokeWidth={1} />
                  )}
                  <span className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-gradient-primary text-primary-foreground"><BadgeCheck className="h-5 w-5" /></span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl font-bold uppercase">{s.name}</h3>
                  <p className="mt-1 text-sm">{a.selected}: <strong className="text-primary">{s.force}</strong></p>
                  <p className="mt-1 text-xs text-muted-foreground">{a.year}: {s.year} · {a.posting}: {s.posting}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${n} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((k) => <Star key={k} className={k <= n ? "h-4 w-4 fill-primary text-primary" : "h-4 w-4 text-muted-foreground"} />)}
    </div>
  );
}
