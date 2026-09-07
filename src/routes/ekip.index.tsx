import { Search, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { usePeopleData } from "@/hooks/use-people";
import { PersonCard } from "@/components/site/PersonCard";
import { PageIntro } from "@/components/site/PageIntro";

const TITLE = "Yapım Ekibi — Katakulli";
const DESC =
  "Katakulli'nin perde arkası: yönetmen, dramaturg, sahne, ışık, ses ve kostüm tasarımcıları ve tüm yapım ekibi.";

export const Route = createFileRoute("/ekip/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: CrewPage,
});

function CrewPage() {
  const { crew } = usePeopleData();
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLocaleLowerCase("tr-TR");
  const filteredCrew = crew.filter((person) => {
    if (!normalizedQuery) return true;
    return `${person.name} ${person.role} ${person.short}`
      .toLocaleLowerCase("tr-TR")
      .includes(normalizedQuery);
  });

  return (
    <>
      <PageIntro
        eyebrow="Yapım Ekibi"
        title="Perde arkası"
        description="Işığı, sesi, kostümü ve hikâyeyi bir araya getiren ekip."
        count={crew.length}
      />
      <section className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mb-8 flex flex-col gap-4 border-y border-border py-4 sm:flex-row sm:items-center sm:justify-between">
          <label className="relative flex min-w-0 flex-1 items-center gap-3">
            <Search className="h-5 w-5 shrink-0 text-gold" />
            <span className="sr-only">Yapım ekibinde ara</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="İsim veya görev ara"
              className="min-w-0 flex-1 bg-transparent py-2 text-sm text-cream outline-none placeholder:text-muted-foreground"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Aramayı temizle"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-gold hover:text-gold"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </label>
          <p className="flex items-center gap-2 text-xs tracking-[0.12em] text-muted-foreground uppercase">
            <SlidersHorizontal className="h-4 w-4 text-gold" />
            {filteredCrew.length} / {crew.length} kişi
          </p>
        </div>

        {filteredCrew.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCrew.map((p, i) => (
              <PersonCard key={p.slug} person={p} kind="crew" index={i} />
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-border px-6 py-16 text-center">
            <p className="font-display text-2xl text-cream">Aradığın kişi bulunamadı.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              İsim veya görev adını farklı yazmayı deneyebilirsin.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
