import { Link } from "@tanstack/react-router";
import { Check, ArrowRight } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SERVICE_CATEGORIES, type ServiceCategoryKey } from "@/lib/mock-data";

export function ServiceCategoryPage({ categoryKey, accentBadge }: { categoryKey: ServiceCategoryKey; accentBadge: string }) {
  const cat = SERVICE_CATEGORIES.find((c) => c.key === categoryKey)!;
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-border/60">
          <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-subtle)" }} />
          <div className="container mx-auto px-4 py-16 md:py-20">
            <Badge variant="secondary" className="mb-4 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">{accentBadge}</Badge>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">{cat.title}</h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{cat.tagline}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link to="/global-trademark">Talk to an Expert <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/apply">Start Application</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <Badge variant="outline" className="mb-3">What we offer</Badge>
            <h2 className="text-3xl font-bold tracking-tight">All {cat.title.replace(" Services", "")} Services</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {cat.items.map((item) => (
              <Card key={item.name} className="border-border/60 transition hover:border-primary/40" style={{ boxShadow: "var(--shadow-card)" }}>
                <CardHeader>
                  <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <CardDescription>{item.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link to="/global-trademark">Request Quote</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}