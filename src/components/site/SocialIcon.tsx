import { Globe, Instagram, Youtube } from "lucide-react";
import type { Social } from "@/data/people";

function XIcon({ className }: { className?: string | undefined }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.244 2H21.5l-7.5 8.57L22.8 22h-6.9l-5.4-7.06L4.3 22H1.04l8.02-9.17L1.2 2h7.07l4.88 6.45L18.24 2Zm-1.21 18h1.8L7.05 3.9H5.12L17.03 20Z" />
    </svg>
  );
}

export function SocialIcon({ platform, className }: { platform: Social["platform"]; className?: string }) {
  switch (platform) {
    case "instagram":
      return <Instagram className={className} />;
    case "youtube":
      return <Youtube className={className} />;
    case "x":
      return <XIcon className={className} />;
    default:
      return <Globe className={className} />;
  }
}

export const socialLabel: Record<Social["platform"], string> = {
  instagram: "Instagram",
  youtube: "YouTube",
  x: "X",
  web: "Web Sitesi",
};
