import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import fes from "@/assets/fes.png";
import type { Person } from "@/data/people";
import { PersonCard } from "./PersonCard";
import { Portrait } from "./Portrait";
import { QrShare } from "./QrShare";
import { List, ProfileSection } from "./Section";
import { SocialIcon, socialLabel } from "./SocialIcon";

type Props = {
  person: Person;
  kind: "cast" | "crew";
  others: Person[];
};

export function ProfilePage({ person, kind, others }: Props) {
  const isCast = kind === "cast";
  const backTo = isCast ? "/oyuncular" : "/ekip";
  const backLabel = isCast ? "Tüm Oyuncular" : "Yapım Ekibi";
  let sectionNumber = 1;
  const nextSectionNumber = () => String(sectionNumber++).padStart(2, "0");

  return (
    <article>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="relative mx-auto max-w-6xl md:grid md:min-h-[88vh] md:grid-cols-[1fr_1.05fr] md:items-end md:gap-10 md:px-8 md:pt-28">
          {/* Photo */}
          <div className="relative aspect-[4/5] w-full sm:aspect-[5/6] md:aspect-[3/4] md:overflow-hidden md:rounded-2xl">
            <Portrait person={person} eager className="h-full w-full object-cover" />
            <div className="photo-fade absolute inset-0 md:hidden" />
            <img
              src={fes}
              alt=""
              width={64}
              height={64}
              className="absolute top-20 right-5 h-14 w-14 opacity-80 drop-shadow-lg md:top-5"
            />
          </div>

          {/* Text */}
          <div className="relative -mt-24 px-5 pb-12 md:mt-0 md:px-0 md:pb-20">
            <div className="spotlight hidden opacity-40 md:block" />
            <Link
              to={backTo}
              className="reveal inline-flex items-center gap-1 text-xs font-semibold tracking-[0.28em] text-gold uppercase"
            >
              <ChevronLeft className="h-4 w-4" />
              {backLabel}
            </Link>
            <h1 className="font-display reveal delay-1 mt-4 text-[2.75rem] leading-[0.95] font-semibold text-cream sm:text-6xl md:text-7xl">
              {person.name}
            </h1>
            <div className="reveal delay-2 mt-5 inline-flex flex-col gap-1 border-l-2 border-gold pl-4">
              <span className="text-[0.65rem] font-semibold tracking-[0.32em] text-gold uppercase">
                {isCast ? "Katakulli'de" : "Görevi"}
              </span>
              <span className="font-display text-2xl text-cream/90 md:text-3xl">{person.role}</span>
            </div>
            <p className="reveal delay-3 mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
              {person.short}
            </p>
            <div className="reveal delay-4 mt-8">
              <QrShare name={person.name} />
            </div>
          </div>
        </div>
      </section>

      {/* Sections */}
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <ProfileSection number={nextSectionNumber()} title="Biyografi">
          <div className="space-y-3">
            {person.bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </ProfileSection>

        {person.education.length > 0 && (
          <ProfileSection number={nextSectionNumber()} title="Eğitim">
            <List items={person.education} />
          </ProfileSection>
        )}

        {person.stage.length > 0 && (
          <ProfileSection number={nextSectionNumber()} title="Sahne Yolculuğu">
            <List items={person.stage} />
          </ProfileSection>
        )}

        {person.other.length > 0 && (
          <ProfileSection number={nextSectionNumber()} title="Diğer Çalışmalar">
            <List items={person.other} />
          </ProfileSection>
        )}

        <section className="grain relative my-6 overflow-hidden rounded-2xl bg-burgundy-deep p-6 md:my-10 md:p-12">
          <img
            src={fes}
            alt=""
            width={220}
            height={220}
            loading="lazy"
            className="pointer-events-none absolute -right-8 -bottom-10 h-48 w-48 opacity-15 md:h-64 md:w-64"
          />
          <p className="eyebrow">Katakulli</p>
          <h2 className="font-display mt-3 text-3xl text-cream md:text-4xl">
            {isCast ? `Katakulli'de: ${person.role}` : `Katakulli'deki görevi: ${person.role}`}
          </h2>
          <p className="relative mt-5 max-w-2xl text-base leading-relaxed text-cream/85">
            {person.katakulli}
          </p>
        </section>

        <ProfileSection number={nextSectionNumber()} title="Sosyal Medya">
          {person.socials.length === 0 ? (
            <p className="text-muted-foreground italic">Sosyal medya bağlantısı eklenmemiş.</p>
          ) : (
            <div className="flex flex-wrap gap-3">
              {person.socials.map((s) => (
                <a
                  key={s.url + s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-border px-5 text-sm font-semibold text-cream/85 transition-colors hover:border-gold hover:text-gold"
                >
                  <SocialIcon platform={s.platform} className="h-4 w-4" />
                  {socialLabel[s.platform]}
                </a>
              ))}
            </div>
          )}
        </ProfileSection>
      </div>

      {/* Others */}
      <section className="mx-auto mt-10 max-w-6xl px-5 md:px-8">
        <div className="hairline" />
        <div className="mt-10 flex items-end justify-between">
          <div>
            <p className="eyebrow">{isCast ? "Diğer Oyuncular" : "Diğer Ekip Üyeleri"}</p>
            <h2 className="font-display mt-2 text-3xl text-cream md:text-4xl">Sahneyi paylaşanlar</h2>
          </div>
          <Link to={backTo} className="hidden text-xs font-semibold tracking-[0.28em] text-gold uppercase sm:block">
            Tümü →
          </Link>
        </div>
        <div className="-mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0">
          {others.slice(0, 4).map((p, i) => (
            <div key={p.slug} className="w-[70vw] shrink-0 snap-start sm:w-[45vw] md:w-auto">
              <PersonCard person={p} kind={kind} compact index={i} />
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
