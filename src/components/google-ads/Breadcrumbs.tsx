import Link from "next/link";
import { ChevronRight } from "lucide-react";

const items = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Google Ads Management", href: "/services/google-ads" },
];

export default function Breadcrumbs() {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-white/8 bg-background/60">
      <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-1.5 px-6 py-3 text-xs text-muted lg:px-8">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {i > 0 && (
                <ChevronRight className="size-3 text-muted/60" aria-hidden="true" />
              )}
              {isLast ? (
                <span aria-current="page" className="text-foreground">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
