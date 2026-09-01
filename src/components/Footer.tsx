import Link from "next/link";
import { Compass, Globe2, MessageCircle, AtSign } from "lucide-react";
import { navLinks } from "@/data/content";

const footerColumns = [
  {
    title: "Services",
    links: [
      "Brand & Identity",
      "Web Design",
      "Web Development",
      "Product Design",
      "Digital Marketing",
    ],
  },
  {
    title: "Company",
    links: ["About Us", "Careers", "Our Work", "Contact"],
  },
  {
    title: "Resources",
    links: ["Insights", "Case Studies", "Playbook", "FAQ"],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background-alt/60">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_repeat(3,1fr)]">
          <div>
            <Link
              href="#top"
              className="flex items-center gap-2 text-base font-semibold tracking-tight text-foreground"
            >
              <span className="flex size-8 items-center justify-center rounded-lg bg-accent/15 text-accent-light">
                <Compass className="size-4.5" aria-hidden="true" />
              </span>
              Northstar Digital
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              A London-based digital agency designing and building brands and
              products for ambitious companies.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[
                { icon: Globe2, label: "LinkedIn" },
                { icon: MessageCircle, label: "Twitter" },
                { icon: AtSign, label: "Instagram" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-full border border-white/10 text-muted transition-colors duration-200 hover:border-accent/40 hover:text-accent-light"
                >
                  <Icon className="size-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="text-sm font-semibold text-foreground">
                {column.title}
              </h3>
              <ul className="mt-5 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted transition-colors duration-200 hover:text-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Northstar Digital Ltd. All
            rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs text-muted transition-colors duration-200 hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#"
              className="text-xs text-muted transition-colors duration-200 hover:text-foreground"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
