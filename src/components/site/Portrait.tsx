import type { Person } from "@/data/people";

/** Fotoğraf varsa gösterir; yoksa baş harflerden şık bir yer tutucu üretir. */
export function Portrait({
  person,
  className = "",
  eager = false,
}: {
  person: Person;
  className?: string;
  eager?: boolean;
}) {
  if (person.photo) {
    const siteBase = import.meta.env.DEV ? "/" : "/katakulli/";
    const photoSrc = person.photo.startsWith("/")
      ? `${siteBase}${person.photo.slice(1)}`
      : person.photo;
    return (
      <img
        src={photoSrc}
        alt={person.name}
        width={768}
        height={1024}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className={className}
      />
    );
  }
  const initials = person.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  return (
    <div className={`grid place-items-center bg-gradient-to-br from-burgundy-deep via-stage-elevated to-stage ${className}`}>
      <span className="font-display text-6xl text-gold/70 md:text-8xl">{initials}</span>
    </div>
  );
}
