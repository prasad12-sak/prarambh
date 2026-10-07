// ============================================================
// EDIT THIS FILE to update academy contact details & media.
// ============================================================
import hero1 from "@/assets/hero-1.jpeg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";

export const site = {
  name: "Prarambh Physical Academy",
  // WhatsApp number with country code, digits only (e.g. "919876543210")
  whatsappNumber: "919021544761",
  phone: "+91 90215 44761",
  email: "pawanrathod295@gmail.com",
  address: "Near Jagat Mandir, Sankat Mochan Road, Umarsara, Yavatmal, Maharashtra",
  trainingLocations: [
    { label: "Hellypad", query: "Hellypad Yavatmal Maharashtra" },
    { label: "Bypass", query: "Bypass Yavatmal Maharashtra" },
    { label: "Prayasvan", query: "Prayasvan Yavatmal Maharashtra" },
  ],
  hours: "Mon–Sat · 5:30 AM – 8:30 AM · 5:00 PM – 7:30 PM",
  mapsQuery: "Jagat Mandir Yavatmal Maharashtra",
  directionsUrl: "https://maps.app.goo.gl/WPuLiTHBagQtxaPs7",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4075.8251464443503!2d78.130119!3d20.393458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4a5f2f3d39f3b%3A0x4f0aa1b4c2d1a7d8!2sJagat%20Mandir!5e0!3m2!1sen!2sin!4v1720000000000!5m2!1sen!2sin",
  director: {
    name: "Pawan Rathod",
    photo: "/images/director.jpeg" as string,
  },
  social: {
    facebook: "#",
    instagram: "https://www.instagram.com/pawan_physical_trainner9021/",
    youtube: "#",
  },
  heroImages: [hero1, hero2, hero3, hero4],
  gallery: [
    { type: "image" as const, src: hero1, alt: "Evening Sunset" },
    { type: "image" as const, src: hero2, alt: "Sprint training on track" },
    { type: "video" as const, src: hero3, alt: "Stretching Activities", videoUrl: "/videos/prarambh-academy-1.mp4" },
    { type: "image" as const, src: hero4, alt: "Celebration" },
    { type: "image" as const, src: hero3, alt: "Occasional Tracking Session" },
    { type: "video" as const, src: hero1, alt: "Morning running session", videoUrl: "/videos/prarambh-academy-2.mp4" },
  ],
};

export const defaultWhatsappMessage =
  "Hello Prarambh Physical Academy, I am interested in joining your physical training program. Please share the batch and admission details.";

export function whatsappLink(message: string = defaultWhatsappMessage) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
