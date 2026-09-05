import { Link } from "@tanstack/react-router";
import fes from "@/assets/fes.png";
import { SITE } from "@/data/people";
import { SocialIcon } from "./SocialIcon";

export function SiteFooter() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-border">
      <div className="velvet absolute inset-x-0 top-0 h-1" />
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img src={fes} alt="" width={44} height={44} loading="lazy" className="h-11 w-11 object-contain" />
              <div>
                <p className="font-display text-2xl font-semibold tracking-[0.18em] text-cream">KATAKULLİ</p>
                <p className="text-xs tracking-[0.28em] text-gold uppercase">{SITE.company}</p>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              1920'lerin başında geçen, evlilikleri ve hesapları birbirine karıştıran müzikli bir komedi.
            </p>
          </div>

          <div>
            <p className="eyebrow">Keşfet</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link to="/oyuncular" className="text-cream/80 hover:text-gold">Oyuncular</Link></li>
              <li><Link to="/ekip" className="text-cream/80 hover:text-gold">Yapım Ekibi</Link></li>
              <li><Link to="/oyun-hakkinda" className="text-cream/80 hover:text-gold">Oyun Hakkında</Link></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow">Takip Et</p>
            <div className="mt-5 flex gap-3">
              {SITE.socials.map((s) => (
                <a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.platform}
                  className="grid h-11 w-11 place-items-center rounded-full border border-border text-cream/80 transition-colors hover:border-gold hover:text-gold"
                >
                  <SocialIcon platform={s.platform} className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="hairline mt-14" />
        <p className="mt-6 text-center text-xs tracking-[0.2em] text-muted-foreground">
          © {SITE.year} Katakulli – Tüm Hakları Saklıdır.
        </p>
        <p className="mt-3 text-center text-xs tracking-[0.16em] text-muted-foreground/70">
          Design by İsmial Sait Erdoğan
        </p>
      </div>
    </footer>
  );
}
