import { type ReactNode } from "react";
import clsx from "clsx";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <span className="tracked text-[11px] text-brass-deep">{eyebrow}</span>
      )}
      <h2 className="font-serif text-3xl md:text-5xl leading-[1.05] tracking-tight text-charcoal">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-2xl text-base md:text-lg text-charcoal-soft/80 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
