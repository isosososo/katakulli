import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import fes from "@/assets/fes.png";

const nav = [
  { to: "/", label: "Ana Sayfa" },
  { to: "/oyuncular", label: "Oyuncular" },
  { to: "/ekip", label: "Yapım Ekibi" },
  { to: "/oyun-hakkinda", label: "Oyun Hakkında" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="bg-background/70 border-b border-border/60 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-20 md:px-8">
          <Link to="/" className="flex items-center gap-3" aria-label="Katakulli ana sayfa">
            <img src={fes} alt="" width={36} height={36} className="h-9 w-9 object-contain drop-shadow" />
            <span className="font-display text-xl font-semibold tracking-[0.18em] text-cream md:text-2xl">
              KATAKULLİ
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Ana menü">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="text-[0.72rem] font-semibold tracking-[0.28em] text-muted-foreground uppercase transition-colors hover:text-gold"
                activeProps={{ className: "text-gold" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            className="grid h-11 w-11 place-items-center rounded-full border border-border text-cream transition-colors hover:border-gold hover:text-gold md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile curtain menu */}
      <div
        className={`fixed inset-0 top-16 z-40 flex flex-col bg-background transition-all duration-500 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="velvet h-1.5 w-full" />
        <div className="spotlight opacity-40" />
        <nav className="relative flex flex-1 flex-col justify-center gap-2 px-8" aria-label="Mobil menü">
          {nav.map((n, i) => (
            <Link
              key={n.to}
              to={n.to}
              style={{ transitionDelay: open ? `${i * 70 + 100}ms` : "0ms" }}
              className={`font-display border-b border-border/70 py-5 text-4xl text-cream transition-all duration-500 ${
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              activeProps={{ className: "text-gold" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              <span className="mr-4 font-sans text-xs tracking-[0.3em] text-gold/70">0{i + 1}</span>
              {n.label}
            </Link>
          ))}
        </nav>
        <p className="relative px-8 pb-10 text-xs tracking-[0.3em] text-muted-foreground uppercase">
          Sarıyer Belediyesi Tiyatrosu
        </p>
      </div>
    </header>
  );
}
