export function SectionHeading({
  title,
  intro,
  kicker,
  rule = true,
}: {
  title: string;
  intro?: string;
  kicker?: string;
  rule?: boolean;
}) {
  return (
    <div className="max-w-2xl">
      {rule ? <div className="mb-4 h-0.5 w-10 bg-accent" /> : null}
      {kicker ? (
        <p className="mb-2 text-sm font-medium text-accent">{kicker}</p>
      ) : null}
      <h2 className="text-3xl font-semibold text-ink sm:text-4xl">{title}</h2>
      {intro ? (
        <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
          {intro}
        </p>
      ) : null}
    </div>
  );
}
