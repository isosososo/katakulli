import { createFileRoute } from "@tanstack/react-router";
import { usePerson } from "@/hooks/use-people";
import { ProfilePage } from "@/components/site/ProfilePage";

export const Route = createFileRoute("/ekip/$slug")({
  loader: ({ params }) => ({ slug: params.slug }),
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Ekip üyesi bulunamadı — Katakulli" }, { name: "robots", content: "noindex" }] };
    }
    const title = `Yapım Ekibi — Katakulli`;
    const desc = "Katakulli yapım ekibi biyografisi.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "profile" },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Katakulli yapım ekibi üyesi",
            jobTitle: "Yapım Ekibi",
            worksFor: { "@type": "Organization", name: "Sarıyer Belediyesi Tiyatrosu" },
          }),
        },
      ],
    };
  },
  notFoundComponent: CrewNotFound,
  component: CrewProfile,
});

function CrewNotFound() {
  return (
    <div className="mx-auto max-w-6xl px-5 pt-40 pb-20 text-center md:px-8">
      <p className="eyebrow">Ekip üyesi bulunamadı</p>
      <h1 className="font-display mt-4 text-4xl text-cream">Bu isimde bir ekip üyesi yok.</h1>
    </div>
  );
}

function CrewProfile() {
  const { slug } = Route.useLoaderData();
  const { person, others } = usePerson("crew", slug);
  if (!person) return <CrewNotFound />;
  return <ProfilePage person={person} kind="crew" others={others} />;
}
