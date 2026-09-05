export function PageIntro({
  eyebrow,
  title,
  description,
  count,
}: {
  eyebrow: string;
  title: string;
  description: string;
  count?: number;
}) {
  return (
    <section className="relative overflow-hidden pt-28 pb-12 md:pt-40 md:pb-16">
      <div className="spotlight opacity-50" />
      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <div className="reveal flex items-center gap-3">
          <span className="h-px w-10 bg-gold" />
          <p className="eyebrow">{eyebrow}</p>
          {count !== undefined && (
            <span className="rounded-full border border-gold/40 px-2 py-0.5 font-mono text-[0.65rem] text-gold">
              {count}
            </span>
          )}
        </div>
        <h1 className="font-display reveal delay-1 mt-4 text-5xl leading-[0.95] font-semibold text-cream md:text-7xl">
          {title}
        </h1>
        <p className="reveal delay-2 mt-5 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
          {description}
        </p>
      </div>
    </section>
  );
}
