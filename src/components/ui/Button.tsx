import Link from "next/link";
import { type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  showArrow?: boolean;
};

export default function Button({
  href,
  children,
  variant = "primary",
  className,
  showArrow = false,
}: ButtonProps) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-300 ease-out focus-visible:outline-2 focus-visible:outline-accent-light focus-visible:outline-offset-4";

  const variants = {
    primary:
      "bg-accent text-white shadow-[0_0_0_0_rgba(59,130,246,0.5)] hover:bg-accent-light hover:shadow-[0_8px_30px_-4px_rgba(59,130,246,0.55)] hover:-translate-y-0.5",
    secondary:
      "glass text-foreground hover:border-white/20 hover:bg-white/[0.07] hover:-translate-y-0.5",
  };

  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {children}
      {showArrow && (
        <ArrowRight
          className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
          aria-hidden="true"
        />
      )}
    </Link>
  );
}
