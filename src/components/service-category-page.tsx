import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import { ServiceOfferingList } from "@/components/service-offering-list";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SERVICE_CATEGORIES, type ServiceCategoryKey } from "@/lib/mock-data";

export function ServiceCategoryPage({ categoryKey, accentBadge }: { categoryKey: ServiceCategoryKey; accentBadge: string }) {
  const cat = SERVICE_CATEGORIES.find((c) => c.key === categoryKey)!;
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-border bg-card">
          <div className="container mx-auto px-4 py-16 md:py-20 lg:px-6">
            <Badge variant="outline" className="mb-4 rounded-full border-gold-subtle px-3 py-1 text-xs font-medium text-navy">
              {accentBadge}
            </Badge>
            <h1 className="max-w-3xl font-serif text-4xl font-semibold tracking-tight text-navy md:text-5xl">{cat.title}</h1>
            <p className="mt-4 max-w-2xl text-lg text-charcoal">{cat.tagline}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link to="/global-trademark">
                  Talk to an Expert <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/apply">Start Application</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16 lg:px-6">
          <div className="mb-10 max-w-2xl">
            <Badge variant="outline" className="mb-3 border-gold-subtle text-navy">
              What we offer
            </Badge>
            <h2 className="font-serif text-3xl font-semibold tracking-tight text-navy">
              All {cat.title.replace(" Services", "")} Services
            </h2>
            <p className="mt-3 text-muted-foreground">
              Comprehensive protection delivered by registered IP professionals with transparent pricing.
            </p>
          </div>
          <ServiceOfferingList services={cat.items} />
          <div className="mt-8">
            <Button asChild>
              <Link to="/global-trademark">Request Quote</Link>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
