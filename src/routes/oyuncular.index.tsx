import { createFileRoute } from "@tanstack/react-router";
import { usePeopleData } from "@/hooks/use-people";
import { PersonCard } from "@/components/site/PersonCard";
import { PageIntro } from "@/components/site/PageIntro";

const TITLE = "Oyuncular — Katakulli";
const DESC = "Katakulli oyununun oyuncu kadrosu. Her oyuncunun karakteri, biyografisi ve sahne yolculuğu.";

export const Route = createFileRoute("/oyuncular/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: CastPage,
});

function CastPage() {
  const { cast } = usePeopleData();
  return (
    <>
      <PageIntro
        eyebrow="Oyuncular"
        title="Sahnedekiler"
        description="Katakulli'ye hayat veren kadro. Bir karta dokunarak oyuncunun hikâyesini keşfedin."
        count={cast.length}
      />
      <section className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cast.map((p, i) => (
            <PersonCard key={p.slug} person={p} kind="cast" index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
