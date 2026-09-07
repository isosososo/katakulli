import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, MapPin, Music2 } from "lucide-react";
import heroPoster from "@/assets/hero-poster.jpg";
import fes from "@/assets/fes.png";
import { SITE } from "@/data/people";
import { usePeopleData } from "@/hooks/use-people";
import { PersonCard } from "@/components/site/PersonCard";
import { SectionHeading } from "@/components/site/Section";
import { MusicPlayerControls } from "@/components/site/MusicPlayer";

const TITLE = "Katakulli — Sarıyer Belediyesi Tiyatrosu";
const DESC =
  "Katakulli: 1920'lerin başında geçen, evlilikler, borçlar ve hesaplarla iç içe müzikli bir komedi. Oyuncular ve yapım ekibiyle tanışın.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: Index,
});

function Index() {
  const { cast, crew } = usePeopleData();
  const featured = cast.slice(0, 4);
  const featuredCrew = crew.slice(0, 4);

  return (
    <>
      {/* HERO */}
      <section className="grain relative min-h-[100svh] overflow-hidden">
        <img
          src={heroPoster}
          alt="Katakulli afişi — sahnede spot ışığı altında bir fes"
          width={1024}
          height={1280}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/20 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/40" />
        <div className="spotlight" />

        {/* Curtain edges (desktop) */}
        <div className="velvet absolute inset-y-0 left-0 hidden w-10 opacity-60 lg:block" />
        <div className="velvet absolute inset-y-0 right-0 hidden w-10 opacity-60 lg:block" />

        <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pt-32 pb-16 md:justify-center md:px-8 md:pb-24">
          <div className="reveal flex items-center gap-3">
            <span className="h-px w-10 bg-gold" />
            <p className="eyebrow">Komedi · 70 Dakika</p>
          </div>

          <h1 className="font-display reveal delay-1 mt-6 text-[clamp(3.5rem,17vw,11rem)] leading-[0.85] font-semibold tracking-tight text-cream">
            KATA
            <br className="md:hidden" />
            KULLİ
          </h1>

          <p className="font-display reveal delay-2 mt-5 text-2xl text-gold-gradient italic md:text-3xl">
            {SITE.company}
          </p>

          <p className="reveal delay-3 mt-6 max-w-md text-base leading-relaxed text-cream/75 md:text-lg">
            1920'lerin başında, resmî nikâhın henüz hayatımıza girmediği günlerde; bir ailenin
            bitmeyen hesabı, bol kahkahayla sahnede.
          </p>

          <div className="reveal delay-4 mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/oyuncular"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-primary px-8 text-sm font-bold tracking-[0.2em] text-primary-foreground uppercase shadow-[var(--shadow-red)] transition-transform hover:scale-[1.02]"
            >
              Oyuncularımız
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/ekip"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-gold/60 px-8 text-sm font-bold tracking-[0.2em] text-gold uppercase backdrop-blur transition-colors hover:bg-gold hover:text-accent-foreground"
            >
              Yapım Ekibi
            </Link>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
          <span className="text-[0.6rem] tracking-[0.4em] text-muted-foreground uppercase">
            Kaydır
          </span>
          <span className="h-10 w-px bg-gradient-to-b from-gold to-transparent" />
        </div>
      </section>

      {/* SHOW INFO */}
      <section className="border-y border-gold/20 bg-burgundy-deep/70">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-7 md:grid-cols-[1fr_auto_auto_auto] md:items-center md:gap-8 md:px-8 md:py-8">
          <div>
            <p className="eyebrow">Perde Açılıyor</p>
            <h2 className="font-display mt-2 text-2xl text-cream md:text-3xl">
              Oyunu yerinde keşfedin.
            </h2>
          </div>
          <div className="flex items-center gap-3 text-sm text-cream/80">
            <CalendarDays className="h-5 w-5 text-gold" />
            <span>2026 sezonu · 70 dakika</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-cream/80">
            <MapPin className="h-5 w-5 text-gold" />
            <span>Boğaziçi Kültür Sanat Merkezi</span>
          </div>
          <a
            href="https://sariyer.bel.tr"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gold px-5 text-xs font-bold tracking-[0.16em] text-accent-foreground uppercase transition-colors hover:bg-gold-soft"
          >
            Gösterim bilgileri <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* ABOUT STRIP */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid items-center gap-10 md:grid-cols-[1fr_1.2fr] md:gap-16">
          <div className="relative">
            <img
              src={fes}
              alt="Katakulli'nin simgesi fes"
              width={512}
              height={512}
              loading="lazy"
              className="mx-auto w-48 drop-shadow-[0_30px_40px_rgba(0,0,0,0.6)] md:w-72"
            />
            <div className="absolute inset-0 -z-10 mx-auto w-48 rounded-full bg-burgundy/40 blur-3xl md:w-72" />
          </div>
          <div>
            <SectionHeading
              eyebrow="Oyun Hakkında"
              title="Bir aile, bin bir hesap."
              description="Katakulli, 1920'lerin başında geçen müzikli bir komedi. Hafize'nin oğulları Hafız Servet ve Ali Osman'ın etrafında büyüyen evlilikler, borçlar ve katakulliler herkesi bu büyük karmaşanın içine çeker."
            />
            <Link
              to="/oyun-hakkinda"
              className="mt-8 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.28em] text-gold uppercase"
            >
              Devamını oku <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* MUSIC */}
      <section id="oyun-muzigi" className="mx-auto mt-24 max-w-6xl px-5 md:px-8">
        <div className="grain relative overflow-hidden rounded-2xl border border-gold/20 bg-stage-elevated p-6 md:flex md:items-center md:justify-between md:gap-12 md:p-10">
          <div className="relative flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-burgundy text-gold">
              <Music2 className="h-5 w-5" />
            </span>
            <div>
              <p className="eyebrow">Oyunun Sesi</p>
              <h2 className="font-display mt-2 text-3xl text-cream md:text-4xl">
                Perde açılmadan dinle.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                Katakulli'nin müziğiyle oyunun dünyasına biraz daha yaklaş. Sağ alttaki oynatıcıyla
                sayfayı gezerken de dinlemeye devam edebilirsin.
              </p>
            </div>
          </div>
          <MusicPlayerControls />
        </div>
      </section>

      {/* CAST */}
      <section className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex items-end justify-between gap-6">
          <SectionHeading eyebrow="Oyuncular" title="Sahnedekiler" />
          <Link
            to="/oyuncular"
            className="hidden shrink-0 text-xs font-semibold tracking-[0.28em] text-gold uppercase sm:block"
          >
            Tümünü gör →
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => (
            <PersonCard key={p.slug} person={p} kind="cast" index={i} />
          ))}
        </div>
        <Link
          to="/oyuncular"
          className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-full border border-border text-sm font-semibold text-cream/80 sm:hidden"
        >
          Tüm oyuncuları gör
        </Link>
      </section>

      {/* CREW */}
      <section className="mx-auto mt-24 max-w-6xl px-5 md:px-8">
        <div className="flex items-end justify-between gap-6">
          <SectionHeading eyebrow="Yapım Ekibi" title="Perde arkası" />
          <Link
            to="/ekip"
            className="hidden shrink-0 text-xs font-semibold tracking-[0.28em] text-gold uppercase sm:block"
          >
            Tümünü gör →
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {featuredCrew.map((p, i) => (
            <PersonCard key={p.slug} person={p} kind="crew" compact index={i} />
          ))}
        </div>
        <Link
          to="/ekip"
          className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-full border border-border text-sm font-semibold text-cream/80 sm:hidden"
        >
          Tüm ekibi gör
        </Link>
      </section>
    </>
  );
}
