import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="font-display mt-3 text-3xl leading-[1.05] text-cream md:text-5xl">{title}</h2>
      {description && (
        <p className={`mt-4 max-w-xl text-base leading-relaxed text-muted-foreground ${align === "center" ? "mx-auto" : ""}`}>
          {description}
        </p>
      )}
    </div>
  );
}

export function ProfileSection({ title, children, number }: { title: string; children: ReactNode; number: string }) {
  return (
    <section className="grid gap-4 border-t border-border py-8 md:grid-cols-[220px_1fr] md:gap-10 md:py-10">
      <div className="flex items-baseline gap-3 md:block">
        <span className="font-display text-sm text-gold/70">{number}</span>
        <h2 className="font-sans text-xs font-semibold tracking-[0.32em] text-gold uppercase md:mt-2">{title}</h2>
      </div>
      <div className="text-base leading-relaxed text-cream/85">{children}</div>
    </section>
  );
}

export function List({ items }: { items: string[] }) {
  if (items.length === 0) return <p className="text-muted-foreground italic">Yakında eklenecek.</p>;
  const normalizedItems = items.flatMap((item) => {
    const parts = item.split(/(?=\d{4}(?:-\d{2,4})?\s*[-–])/).map((part) => part.trim()).filter(Boolean);
    return parts.length > 1 ? parts : [item];
  });
  return (
    <ul className="space-y-2">
      {normalizedItems.map((it, index) => (
        <li key={`${it}-${index}`} className="flex min-w-0 gap-4">
          <span className="mt-3 h-px w-6 shrink-0 bg-gold/60" />
          <span className="min-w-0 break-words">{it}</span>
        </li>
      ))}
    </ul>
  );
}
