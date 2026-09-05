import { createFileRoute } from "@tanstack/react-router";
import { usePeopleData } from "@/hooks/use-people";
import { PersonCard } from "@/components/site/PersonCard";
import { PageIntro } from "@/components/site/PageIntro";

const TITLE = "Yapım Ekibi — Katakulli";
const DESC = "Katakulli'nin perde arkası: yönetmen, dramaturg, sahne, ışık, ses ve kostüm tasarımcıları ve tüm yapım ekibi.";

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
  return (
    <>
      <PageIntro
        eyebrow="Yapım Ekibi"
        title="Perde arkası"
        description="Işığı, sesi, kostümü ve hikâyeyi bir araya getiren ekip."
        count={crew.length}
      />
      <section className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
          {crew.map((p, i) => (
            <PersonCard key={p.slug} person={p} kind="crew" compact index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
