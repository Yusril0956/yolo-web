type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  descriptionMarginClassName?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  titleClassName = "md:text-3xl",
  descriptionClassName = "",
  descriptionMarginClassName = "mt-3",
}: SectionHeadingProps) {
  return (
    <div>
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#006399]">
        {eyebrow}
      </p>

      <h2
        className={`max-w-xl text-2xl font-bold leading-tight text-[#000767] ${titleClassName}`}
      >
        {title}
      </h2>

      {description ? (
        <p
          className={`${descriptionMarginClassName} max-w-xl leading-7 text-[#3f4851] ${descriptionClassName}`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
