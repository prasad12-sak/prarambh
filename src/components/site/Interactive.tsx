import { useEffect, useRef, useState } from "react";
import { ArrowUp, Facebook, Instagram, Mail, MapPin, MessageCircle, Phone, Play, Quote, Clock, Youtube, Navigation } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLang } from "@/lib/i18n";
import { site, whatsappLink } from "@/config/site";
import { Reveal, SectionHead } from "./Reveal";
import { Stars } from "./Sections";
import { Logo, sectionIds } from "./Navbar";
import { cn } from "@/lib/utils";

type Review = { name: string; force: string; rating: number; review: string };
const STORE = "ppa-reviews";
// Replace these two functions to connect a real backend later.
const loadReviews = (): Review[] => { try { return JSON.parse(localStorage.getItem(STORE) || "[]"); } catch { return []; } };
const saveReviews = (r: Review[]) => localStorage.setItem(STORE, JSON.stringify(r));

export function Testimonials() {
  const { d } = useLang();
  const f = d.testimonials.form;
  const [extra, setExtra] = useState<Review[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Review>({ name: "", force: "", rating: 5, review: "" });
  const [err, setErr] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  useEffect(() => setExtra(loadReviews()), []);

  const all = [...extra, ...d.testimonials.items];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.4 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!all.length || !isVisible) return;
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % all.length);
    }, 3000);
    return () => window.clearInterval(id);
  }, [all.length, isVisible]);

  useEffect(() => {
    const activeItem = itemRefs.current[activeIndex];
    if (!activeItem) return;
    activeItem.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [activeIndex, all.length]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = { ...form, name: form.name.trim().slice(0, 60), force: form.force.trim().slice(0, 60), review: form.review.trim().slice(0, 500) };
    if (!clean.name || !clean.force || !clean.review) return setErr(f.error);
    const next = [clean, ...extra];
    setExtra(next); saveReviews(next);
    setForm({ name: "", force: "", rating: 5, review: "" }); setErr(""); setOpen(false);
    toast.success(f.thanks);
  };

  const input = "w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary";

  return (
    <section ref={sectionRef} id="testimonials" className="py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <SectionHead eyebrow={d.testimonials.eyebrow} title={d.testimonials.title} />
        <div ref={trackRef} className="relative overflow-hidden">
          <div className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 md:mx-0 md:gap-8 md:px-0 [&::-webkit-scrollbar]:hidden">
            {all.map((r, idx) => {
              const isActive = idx === activeIndex;
              const isNearby = Math.abs((idx - activeIndex + all.length) % all.length) <= 1;

              return (
                <Reveal key={idx} delay={(idx % 3) * 100} className={cn("w-[85%] shrink-0 snap-center transition-all duration-500 ease-out md:w-[30rem]", isActive ? "scale-100 opacity-100" : isNearby ? "scale-90 opacity-80" : "scale-75 opacity-60") }>
                  <div ref={(el) => { itemRefs.current[idx] = el; }} className="h-full">
                    <figure className="card-pro flex h-full flex-col p-7">
                      <Quote className="h-8 w-8 text-primary/60" />
                      <Stars n={r.rating} />
                      <blockquote className="mt-4 flex-1 text-foreground/90">“{r.review}”</blockquote>
                      <figcaption className="mt-6 border-t pt-4">
                        <div className="font-display text-lg font-bold uppercase">— {r.name}</div>
                        <div className="text-xs text-muted-foreground">{r.force}</div>
                      </figcaption>
                    </figure>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
        <div className="mt-10 text-center">
          <button onClick={() => setOpen(true)} className="btn-outline">{d.testimonials.write}</button>
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-popover">
          <DialogHeader><DialogTitle className="font-display text-2xl uppercase">{d.testimonials.write}</DialogTitle></DialogHeader>
          <form onSubmit={submit} className="space-y-4">
            <input className={input} placeholder={f.name} value={form.name} maxLength={60} onChange={(e) => setForm({ ...form, name: e.target.value })} aria-label={f.name} />
            <input className={input} placeholder={f.force} value={form.force} maxLength={60} onChange={(e) => setForm({ ...form, force: e.target.value })} aria-label={f.force} />
            <div>
              <p className="mb-1 text-sm text-muted-foreground">{f.rating}</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((k) => (
                  <button type="button" key={k} onClick={() => setForm({ ...form, rating: k })} aria-label={`${k} stars`}
                    className={cn("text-2xl", k <= form.rating ? "text-primary" : "text-muted-foreground")}>★</button>
                ))}
              </div>
            </div>
            <textarea className={cn(input, "min-h-28")} placeholder={f.review} value={form.review} maxLength={500} onChange={(e) => setForm({ ...form, review: e.target.value })} aria-label={f.review} />
            {err && <p className="text-sm text-destructive">{err}</p>}
            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setOpen(false)} className="btn-outline !py-2">{f.cancel}</button>
              <button type="submit" className="btn-primary !py-2">{f.submit}</button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}

const getVideoThumbnail = async (videoUrl: string) => {
  if (typeof document === "undefined") return videoUrl;

  return await new Promise<string>((resolve) => {
    const media = document.createElement("video");
    media.preload = "metadata";
    media.muted = true;
    media.playsInline = true;
    media.src = videoUrl;

    const fallback = () => resolve(videoUrl);
    media.onloadeddata = () => {
      try {
        media.currentTime = 0.1;
      } catch {
        fallback();
      }
    };

    media.onseeked = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 640;
      canvas.height = 360;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        fallback();
        return;
      }

      ctx.drawImage(media, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", 0.85));
    };

    media.onerror = fallback;
  });
};

export function Gallery() {
  const { d } = useLang();
  const [filter, setFilter] = useState<"all" | "image" | "video">("all");
  const [showAll, setShowAll] = useState(false);
  const [video, setVideo] = useState<string | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [videoThumbs, setVideoThumbs] = useState<Record<string, string>>({});
  const items = site.gallery.filter((g) => filter === "all" || g.type === filter);
  const shown = showAll ? items : items.slice(0, 6);

  useEffect(() => {
    let cancelled = false;

    const loadThumbs = async () => {
      const videoItems = site.gallery.filter((g): g is typeof g & { type: "video"; videoUrl: string } => g.type === "video" && !!g.videoUrl);
      const nextThumbs: Record<string, string> = {};

      for (const item of videoItems) {
        const thumb = await getVideoThumbnail(item.videoUrl);
        if (!cancelled) nextThumbs[item.videoUrl] = thumb;
      }

      if (!cancelled) setVideoThumbs(nextThumbs);
    };

    void loadThumbs();
    return () => { cancelled = true; };
  }, []);

  return (
    <section id="gallery" className="bg-ink py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <SectionHead eyebrow={d.gallery.eyebrow} title={d.gallery.title} />
        <div className="mb-8 flex justify-center gap-2">
          {([["all", "All"], ["image", d.gallery.photos], ["video", d.gallery.videos]] as const).map(([k, l]) => (
            <button key={k} onClick={() => setFilter(k)}
              className={cn("rounded-md px-4 py-2 text-sm font-semibold transition-colors", filter === k ? "bg-primary text-primary-foreground" : "bg-surface text-muted-foreground hover:text-foreground")}>{l}</button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {shown.map((g, idx) => {
            const mediaSrc = g.type === "video" ? (videoThumbs[g.videoUrl ?? ""] ?? g.src) : g.src;

            return (
              <button key={idx} onClick={() => (g.type === "video" ? setVideo(g.videoUrl!) : setPhoto(g.src))}
                className={cn("group relative overflow-hidden rounded-lg", idx === 0 && "md:col-span-2 md:row-span-2")}>
                <img src={mediaSrc} alt={g.alt} loading="lazy" className="aspect-[4/3] h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent opacity-70" />
                {g.type === "video" && (
                  <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gradient-primary text-primary-foreground shadow-lg"><Play className="ml-0.5 h-6 w-6 fill-current" /></span>
                )}
                <span className="absolute bottom-3 left-3 text-left text-sm font-medium">{g.alt}</span>
              </button>
            );
          })}
        </div>
        {items.length > 6 && !showAll && (
          <div className="mt-10 text-center"><button onClick={() => setShowAll(true)} className="btn-outline">{d.gallery.all}</button></div>
        )}
        {items.length <= 6 && (
          <div className="mt-10 text-center"><a href={site.social.instagram} className="btn-outline">{d.gallery.all}</a></div>
        )}
      </div>
      <Dialog open={!!video} onOpenChange={(o) => !o && setVideo(null)}>
        <DialogContent className="max-w-3xl bg-popover p-2">
          <DialogTitle className="sr-only">Video</DialogTitle>
          {video && (
            <video key={video} controls autoPlay playsInline poster={videoThumbs[video] ?? undefined} className="aspect-video w-full rounded bg-black" preload="metadata">
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </DialogContent>
      </Dialog>
      <Dialog open={!!photo} onOpenChange={(o) => !o && setPhoto(null)}>
        <DialogContent className="max-w-4xl bg-popover p-2">
          <DialogTitle className="sr-only">Photo</DialogTitle>
          {photo && <img src={photo} alt="Gallery" className="w-full rounded" />}
        </DialogContent>
      </Dialog>
    </section>
  );
}

export function Contact() {
  const { d } = useLang();
  const c = d.contact;
  const rows = [
    [MapPin, c.address, site.address], [Phone, c.phone, site.phone], [MessageCircle, c.whatsapp, `+${site.whatsappNumber}`],
    [Mail, c.email, site.email], [Clock, c.hours, site.hours],
  ] as const;
  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <SectionHead eyebrow={c.eyebrow} title={c.title} />
        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="card-pro grid gap-5 p-7 sm:grid-cols-2">
              {rows.map(([I, l, v]) => (
                <div key={l} className="flex gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-primary/12 text-primary"><I className="h-5 w-5" /></span>
                  <div><div className="text-xs uppercase tracking-wider text-muted-foreground">{l}</div><div className="mt-0.5 font-medium">{v}</div></div>
                </div>
              ))}
              <div className="flex gap-3 sm:col-span-2">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-primary/12 text-primary"><Navigation className="h-5 w-5" /></span>
                <div className="min-w-0 flex-1">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{c.location}</div>
                  <div className="mt-1 flex flex-col gap-1.5">
                    {site.trainingLocations.map((loc) => (
                      <a key={loc.label} href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.query)}`} target="_blank" rel="noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                        <MapPin className="h-3.5 w-3.5" />
                        {loc.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row">
                <a href={site.directionsUrl} target="_blank" rel="noreferrer" className="btn-outline flex-1 !px-3">{c.directions}</a>
                <a href={`tel:${site.phone}`} className="btn-outline flex-1 !px-3">{c.call}</a>
                <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn-primary flex-1 !px-3">{c.wa}</a>
              </div>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <iframe title="Academy location map" loading="lazy" className="h-full min-h-80 w-full rounded-xl border grayscale-[60%] invert-[90%] hue-rotate-180"
              src={site.mapEmbedUrl} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  const { d } = useLang();
  return (
    <section className="bg-gradient-primary py-16 text-primary-foreground">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 text-center md:flex-row md:text-left lg:px-6">
        <h2 className="font-display text-3xl font-bold uppercase md:text-4xl">{d.final.title}</h2>
        <a href={whatsappLink()} target="_blank" rel="noreferrer"
          className="inline-flex shrink-0 items-center rounded-md bg-ink px-6 py-3.5 font-display font-bold uppercase tracking-wider text-foreground transition-transform hover:-translate-y-0.5">{d.final.cta}</a>
      </div>
    </section>
  );
}

export function Footer() {
  const { d } = useLang();
  const quick = ["home", "about", "programs", "batches", "achievers", "gallery", "contact"] as const;
  return (
    <footer className="bg-ink pt-16">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-6">
        <div>
          <Logo />
          <p className="mt-4 text-sm text-muted-foreground">{d.tagline}</p>
          <div className="mt-5 flex gap-3">
            {[[Facebook, site.social.facebook, "Facebook"], [Instagram, site.social.instagram, "Instagram"], [MessageCircle, whatsappLink(), "WhatsApp"], [Youtube, site.social.youtube, "YouTube"]].map(([I, h, l]) => {
              const Ic = I as typeof Facebook;
              return <a key={l as string} href={h as string} aria-label={l as string} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-md border text-muted-foreground transition-colors hover:border-primary hover:text-primary"><Ic className="h-4 w-4" /></a>;
            })}
          </div>
        </div>
        <div>
          <h4 className="font-display text-lg font-bold uppercase">{d.footer.quick}</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">{quick.map((q) => <li key={q}><a href={`#${q}`} className="hover:text-primary">{d.nav[q]}</a></li>)}</ul>
        </div>
        <div>
          <h4 className="font-display text-lg font-bold uppercase">{d.footer.programs}</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">{d.programs.items.filter((_, i) => i !== 3).map((p) => <li key={p.name}><a href="#programs" className="hover:text-primary">{p.name}</a></li>)}</ul>
        </div>
        <div>
          <h4 className="font-display text-lg font-bold uppercase">{d.footer.contact}</h4>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2"><Phone className="h-4 w-4 text-primary" />{site.phone}</li>
            <li className="flex gap-2"><MessageCircle className="h-4 w-4 text-primary" />+{site.whatsappNumber}</li>
            <li className="flex gap-2"><Mail className="h-4 w-4 text-primary" />{site.email}</li>
            <li className="flex gap-2"><MapPin className="h-4 w-4 text-primary" />{site.address}</li>
          </ul>
        </div>
      </div>
      <div className="mt-14 border-t">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row lg:px-6">
          <span>{d.footer.rights}</span><span>{d.footer.made}</span>
        </div>
      </div>
    </footer>
  );
}

export function ScrollTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const f = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <button onClick={() => window.scrollTo({ top: 0 })} aria-label="Scroll to top"
      className={cn("fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-gradient-primary text-primary-foreground shadow-lg transition-all", show ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0")}>
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}

export { sectionIds };
