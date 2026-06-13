import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Shield,
  Lightbulb,
  Copyright,
  Palette,
  Briefcase,
  Handshake,
  Gavel,
  ArrowRight,
} from "lucide-react";
import { ServiceOfferingList } from "@/components/service-offering-list";
import { Button } from "@/components/ui/button";
import { featureFlags } from "@/lib/feature-flags";
import { IPR_SERVICE_SECTIONS, type IprServiceSection } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const SECTION_ICONS: Record<string, LucideIcon> = {
  "trademark-services": Shield,
  "patent-services": Lightbulb,
  "copyright-services": Copyright,
  "industrial-design-services": Palette,
  "ip-due-diligence": Briefcase,
  "licensing-technology-transfer": Handshake,
  "ip-enforcement": Gavel,
};

const TAB_LABELS: Record<string, string> = {
  "trademark-services": "Trademark",
  "patent-services": "Patent",
  "copyright-services": "Copyright",
  "industrial-design-services": "Design",
  "ip-due-diligence": "Due Diligence",
  "licensing-technology-transfer": "Licensing",
  "ip-enforcement": "Enforcement",
};

const TOTAL = IPR_SERVICE_SECTIONS.length;

function sectionActions(section: IprServiceSection) {
  const actions: (
    | { label: string; kind: "anchor"; href: string; outline?: boolean }
    | { label: string; kind: "link"; to: string; outline?: boolean }
  )[] = [{ label: "Request a Quote", kind: "anchor", href: "#contact" }];

  if (section.id === "trademark-services" && featureFlags.trademarkSearch) {
    actions.push({ label: "Free Trademark Search", kind: "link", to: "/trademark-search", outline: true });
  }
  if (section.id === "patent-services") {
    actions.push({ label: "View Patent Services", kind: "link", to: "/services/patents", outline: true });
  }
  if (section.id === "copyright-services") {
    actions.push({ label: "View Copyright Services", kind: "link", to: "/services/copyrights", outline: true });
  }
  if (section.id === "industrial-design-services") {
    actions.push({ label: "View Design Services", kind: "link", to: "/services/designs", outline: true });
  }

  return actions;
}

function ServiceBody({ section }: { section: IprServiceSection }) {
  const Icon = SECTION_ICONS[section.id] ?? Shield;
  const actions = sectionActions(section);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,20rem)_1fr] lg:items-start lg:gap-10">
      <div>
        <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gold text-white">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="font-serif text-2xl font-semibold tracking-tight text-navy md:text-3xl">{section.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-charcoal md:text-base">{section.description}</p>
        {section.extraDescription && (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{section.extraDescription}</p>
        )}
        <div className="mt-5 flex flex-wrap gap-2">
          {actions.map((action) =>
            action.kind === "anchor" ? (
              <Button key={action.label} asChild size="sm" variant={action.outline ? "outline" : "default"}>
                <a href={action.href}>{action.label}</a>
              </Button>
            ) : (
              <Button key={action.label} asChild size="sm" variant={action.outline ? "outline" : "default"}>
                <Link to={action.to}>{action.label}</Link>
              </Button>
            ),
          )}
        </div>
      </div>
      <ServiceOfferingList services={section.services} />
    </div>
  );
}

export function IprServicesCarousel() {
  const [active, setActive] = useState(0);
  const section = IPR_SERVICE_SECTIONS[active];

  const goTo = (index: number) => setActive((index + TOTAL) % TOTAL);
  const goPrev = () => goTo(active - 1);
  const goNext = () => goTo(active + 1);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const index = IPR_SERVICE_SECTIONS.findIndex((s) => s.id === hash);
    if (index >= 0) {
      document.getElementById("services")?.scrollIntoView({ behavior: "smooth", block: "start" });
      setActive(index);
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Fixed header tabs */}
      <div
        className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="IP service categories"
      >
        {IPR_SERVICE_SECTIONS.map((item, index) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={active === index}
            aria-controls={`ipr-panel-${item.id}`}
            onClick={() => setActive(index)}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-colors duration-200 sm:text-sm",
              active === index
                ? "bg-navy text-white shadow-[0_4px_16px_rgba(17,34,64,0.2)]"
                : "border border-border bg-card text-charcoal hover:border-gold/50 hover:text-navy",
            )}
          >
            {TAB_LABELS[item.id] ?? item.title}
          </button>
        ))}
      </div>

      {/* Shell card — footer fixed, body swaps */}
      <div className="overflow-hidden rounded-2xl border border-gold-subtle bg-card shadow-[var(--shadow-card)]">
        <div
          id={`ipr-panel-${section.id}`}
          role="tabpanel"
          className="p-5 md:p-8"
        >
          <div
            key={section.id}
            className="animate-in fade-in duration-300"
          >
            <ServiceBody section={section} />
          </div>
        </div>

        {/* Fixed footer */}
        <div className="flex items-center justify-between border-t border-border px-5 py-4 md:px-8">
          <span className="text-xs font-medium text-muted-foreground">
            {active + 1} / {TOTAL}
          </span>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 px-3 text-xs"
              onClick={goPrev}
            >
              Previous
            </Button>
            <Button
              type="button"
              size="sm"
              className="h-8 gap-1 px-3 text-xs"
              onClick={goNext}
            >
              Next
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2">
        {IPR_SERVICE_SECTIONS.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-label={`Go to ${item.title}`}
            onClick={() => setActive(index)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              active === index ? "w-8 bg-gold" : "w-1.5 bg-border hover:bg-gold/50",
            )}
          />
        ))}
      </div>
    </div>
  );
}
