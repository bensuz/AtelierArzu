type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  as?: "h1" | "h2";
};

export function SectionHeading({ eyebrow, title, description, as: Heading = "h2" }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-clay">{eyebrow}</p>
      )}
      <Heading className="font-serif text-4xl font-semibold leading-tight text-ink sm:text-5xl">
        {title}
      </Heading>
      {description ? (
        <p className="mt-4 text-base leading-7 text-ink/68 sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
