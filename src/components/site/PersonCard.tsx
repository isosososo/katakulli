import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Person } from "@/data/people";
import { Portrait } from "./Portrait";

type Props = {
  person: Person;
  kind: "cast" | "crew";
  compact?: boolean;
  index?: number;
};

export function PersonCard({ person, kind, compact = false, index = 0 }: Props) {
  const to = kind === "cast" ? "/oyuncular/$slug" : "/ekip/$slug";

  return (
    <Link
      to={to}
      params={{ slug: person.slug }}
      style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
      className="card-lift reveal group relative block overflow-hidden rounded-xl bg-card shadow-[var(--shadow-card)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      <div className={`relative ${compact ? "aspect-[3/4]" : "aspect-[4/5]"} overflow-hidden`}>
        <Portrait
          person={person}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="photo-fade absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
          <p className="text-[0.62rem] font-semibold tracking-[0.3em] text-gold uppercase">
            {kind === "cast" ? "Katakulli'de" : "Görevi"}
          </p>
          <p className="font-display mt-1 text-lg leading-tight text-cream md:text-xl">{person.role}</p>
        </div>
      </div>

      <div className="flex items-start justify-between gap-3 p-4 md:p-5">
        <div className="min-w-0">
          <h3 className="font-display truncate text-xl text-cream md:text-2xl">{person.name}</h3>
          {!compact && (
            <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{person.short}</p>
          )}
        </div>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border text-gold transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-accent-foreground">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>

      {!compact && (
        <span className="absolute inset-x-4 bottom-0 hidden text-[0.62rem] tracking-[0.3em] uppercase md:block">
          <span className="sr-only">Profili Görüntüle</span>
        </span>
      )}
    </Link>
  );
}
