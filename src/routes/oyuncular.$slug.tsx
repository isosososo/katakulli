import { createFileRoute } from "@tanstack/react-router";
import { usePerson } from "@/hooks/use-people";
import { ProfilePage } from "@/components/site/ProfilePage";

export const Route = createFileRoute("/oyuncular/$slug")({
  loader: ({ params }) => ({ slug: params.slug }),
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Oyuncu bulunamadı — Katakulli" }, { name: "robots", content: "noindex" }] };
    }
    const title = `Oyuncu — Katakulli`;
    const desc = "Katakulli oyuncu biyografisi.";
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
            name: "Katakulli oyuncusu",
            jobTitle: "Oyuncu",
            performerIn: { "@type": "TheaterEvent", name: "Katakulli" },
          }),
        },
      ],
    };
  },
  notFoundComponent: CastNotFound,
  component: CastProfile,
});

function CastNotFound() {
  return (
    <div className="mx-auto max-w-6xl px-5 pt-40 pb-20 text-center md:px-8">
      <p className="eyebrow">Oyuncu bulunamadı</p>
      <h1 className="font-display mt-4 text-4xl text-cream">Bu isimde bir oyuncu yok.</h1>
    </div>
  );
}

function CastProfile() {
  const { slug } = Route.useLoaderData();
  const { person, others } = usePerson("cast", slug);
  if (!person) return <CastNotFound />;
  return <ProfilePage person={person} kind="cast" others={others} />;
}
