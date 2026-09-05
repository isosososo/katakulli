import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import heroPoster from "@/assets/hero-poster.jpg";
import fes from "@/assets/fes.png";
import { PageIntro } from "@/components/site/PageIntro";
import { usePeopleData } from "@/hooks/use-people";

const TITLE = "Oyun Hakkında — Katakulli";
const DESC =
  "Katakulli, 1920'lerin başında geçen, evlilikler ve borçlar etrafında gelişen 70 dakikalık müzikli bir komedidir.";

export const Route = createFileRoute("/oyun-hakkinda")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: AboutPage,
});

const facts = [
  { k: "Tür", v: "Komedi" },
  { k: "Süre", v: "70 dakika" },
  { k: "Sezon", v: "2026" },
  { k: "Sahne", v: "Boğaziçi Kültür Merkezi" },
];

function AboutPage() {
  const { cast, crew } = usePeopleData();
  return (
    <>
      <PageIntro
        eyebrow="Oyun Hakkında"
        title="Bir aile, bin bir hesap."
        description="1920'lerin başında geçen müzikli bir komedi."
      />

      <section className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grain relative overflow-hidden rounded-2xl">
          <img
            src={heroPoster}
            alt="Katakulli sahnesi"
            width={1024}
            height={1280}
            loading="lazy"
            className="aspect-[4/5] w-full object-cover sm:aspect-[16/9]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="mt-12 grid gap-12 md:grid-cols-[1fr_320px] md:gap-16">
          <div className="space-y-6 text-base leading-relaxed text-cream/85 md:text-lg">
            <p className="font-display text-2xl leading-snug text-cream md:text-3xl">
              "Katakulli" — evliliklerin henüz resmî nikâhla yapılmadığı bir dönemde, aile hesaplarının birbirine
              karıştığı müzikli ve bol kahkahalı bir hikâye.
            </p>
            <p>
              Hafize'nin iki oğlu vardır: Hafız Servet ve Ali Osman. Büyük oğul Hafız Servet hafızlık yapmak için
              Katar'a gitmiştir. Küçük oğul Ali Osman ise çalışıp borçlarını ödemek yerine, abisinin kazanıp getireceği
              parayla kurtulmanın hesabını yapmaktadır.
            </p>
            <p>
              Ali Osman'ın çevirdiği türlü katakulliler; abisi Hafız Servet ile Melek'in evliliğinden, Kambur Hasan'ın
              hesaplarına ve Mahidevran Hanım ile Gonca'nın beklentilerine kadar herkesi içine çeken büyük bir
              karmaşaya dönüşür. Bir sorun çözülmeden yenisi çıkar; her hesap başka bir hesabı bozar.
            </p>
          </div>

          <aside className="h-fit rounded-2xl border border-border bg-card p-6">
            <img src={fes} alt="" width={72} height={72} loading="lazy" className="h-16 w-16" />
            <dl className="mt-6 space-y-4">
              {facts.map((f) => (
                <div key={f.k} className="border-b border-border pb-4 last:border-0">
                  <dt className="text-[0.62rem] tracking-[0.3em] text-gold uppercase">{f.k}</dt>
                  <dd className="font-display mt-1 text-lg text-cream">{f.v}</dd>
                </div>
              ))}
              <div>
                <dt className="text-[0.62rem] tracking-[0.3em] text-gold uppercase">Kadro</dt>
                <dd className="font-display mt-1 text-lg text-cream">
                  {cast.length} oyuncu · {crew.length} ekip üyesi
                </dd>
              </div>
            </dl>
            <div className="mt-6 flex flex-col gap-2">
              <Link
                to="/oyuncular"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary text-sm font-semibold text-primary-foreground"
              >
                Oyuncular <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/ekip"
                className="inline-flex h-12 items-center justify-center rounded-full border border-gold/50 text-sm font-semibold text-gold"
              >
                Yapım Ekibi
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
