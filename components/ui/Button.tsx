import { type ButtonHTMLAttributes, type ReactNode } from "react";
import clsx from "clsx";

type Variant = "primary" | "ghost" | "link";

export function Button({
  variant = "primary",
  className,
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: ReactNode;
}) {
  return (
    <button
      {...rest}
      className={clsx(
        "tracked inline-flex items-center justify-center text-[11px] font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
        variant === "primary" &&
          "border border-charcoal bg-charcoal text-ivory px-7 py-3.5 hover:bg-charcoal-soft",
        variant === "ghost" &&
          "border border-charcoal/80 text-charcoal px-7 py-3.5 hover:bg-charcoal hover:text-ivory",
        variant === "link" &&
          "border-b border-brass text-charcoal pb-1 hover:text-brass-deep",
        className,
      )}
    >
      {children}
    </button>
  );
}
