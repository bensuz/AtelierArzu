type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  as?: "h1" | "h2";
  align?: "left" | "center";
  size?: "md" | "lg";
};

export function SectionHeading({ eyebrow, title, description, as: Heading = "h2", align = "left", size = "md" }: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div className={`max-w-3xl ${centered ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <Heading
        className={`font-serif leading-[1.05] text-charcoal ${
          size === "lg" ? "text-5xl sm:text-6xl lg:text-7xl" : "text-4xl sm:text-5xl"
        }`}
      >
        {title}
      </Heading>
      {description ? (
        <p className={`mt-5 text-base leading-7 text-charcoal/70 sm:text-lg sm:leading-8 ${centered ? "mx-auto" : ""} max-w-2xl`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
