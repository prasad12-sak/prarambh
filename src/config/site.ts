// ============================================================
// EDIT THIS FILE to update academy contact details & media.
// ============================================================
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";

export const site = {
  name: "Prarambh Physical Academy",
  // WhatsApp number with country code, digits only (e.g. "919876543210")
  whatsappNumber: "910000000000",
  phone: "[Phone Number]",
  email: "[Email]",
  address: "[Academy Address]",
  trainingLocation: "[Training Ground Location]",
  hours: "Mon–Sat · 5:30 AM – 8:30 AM · 5:00 PM – 7:30 PM",
  mapsQuery: "Prarambh Physical Academy",
  director: {
    name: "[Director Name]",
    qualification: "[Qualification]",
    photo: "" as string, // put an image URL/import here
  },
  social: {
    facebook: "#",
    instagram: "#",
    youtube: "#",
  },
  heroImages: [hero1, hero2, hero3, hero4],
  gallery: [
    { type: "image" as const, src: hero1, alt: "Sprint training on track" },
    { type: "image" as const, src: hero2, alt: "Pull-up practice at dawn" },
    { type: "video" as const, src: hero3, alt: "Gola Fek technique session", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { type: "image" as const, src: hero4, alt: "Group physical training drill" },
    { type: "image" as const, src: hero3, alt: "Shot put practice" },
    { type: "video" as const, src: hero1, alt: "Morning running session", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  ],
};

export const defaultWhatsappMessage =
  "Hello Prarambh Physical Academy, I am interested in joining your physical training program. Please share the batch and admission details.";

export function whatsappLink(message: string = defaultWhatsappMessage) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
