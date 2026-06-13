import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type ServiceOfferingItem = string | { name: string; desc?: string };

type ServiceOfferingListProps = {
  services: ServiceOfferingItem[];
  className?: string;
};

function normalize(items: ServiceOfferingItem[]) {
  return items.map((item) => (typeof item === "string" ? { name: item } : item));
}

export function ServiceOfferingList({ services, className }: ServiceOfferingListProps) {
  const items = normalize(services);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]",
        className,
      )}
    >
      <ul className="grid gap-px bg-border/70 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((service) => (
          <li key={service.name}>
            <div className="group flex h-full min-h-[4.25rem] items-start gap-3 bg-card px-4 py-4 transition-colors duration-200 hover:bg-section sm:px-5 sm:py-5">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-gold-subtle bg-section text-gold transition-colors group-hover:border-gold group-hover:bg-gold group-hover:text-white">
                <Check className="h-4 w-4" strokeWidth={2.5} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium leading-snug text-navy">{service.name}</p>
                {service.desc && (
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{service.desc}</p>
                )}
              </div>
              <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-gold opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
