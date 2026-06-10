import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Shield,
  ArrowRight,
  Check,
  Scale,
  Lightbulb,
  Copyright,
  Palette,
  Briefcase,
  Handshake,
  Gavel,
} from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import { IprConsultationForm } from "@/components/ipr-consultation-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IPR_SERVICE_SECTIONS } from "@/lib/mock-data";

const SECTION_ICONS: Record<string, typeof Shield> = {
  "trademark-services": Shield,
  "patent-services": Lightbulb,
  "copyright-services": Copyright,
  "industrial-design-services": Palette,
  "ip-due-diligence": Briefcase,
  "licensing-technology-transfer": Handshake,
  "ip-enforcement": Gavel,
};

const IPR_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "Intellectual Property Rights (IPR) Services",
      description:
        "Comprehensive Intellectual Property Rights services including trademark, patent, copyright, industrial design registration, IP due diligence, technology transfer, and litigation support in India.",
      url: "https://trademarkx.in/services/ipr",
    },
    {
      "@type": "LegalService",
      name: "TrademarkX IPR Services",
      description:
        "End-to-end intellectual property protection for individuals, startups, SMEs, and multinational companies.",
      serviceType: [
        "Trademark Services",
        "Patent Services",
        "Copyright Services",
        "Industrial Design Registration",
        "IP Due Diligence",
        "Technology Transfer Services",
        "IP Litigation Support",
      ],
      areaServed: { "@type": "Country", name: "India" },
      provider: {
        "@type": "Organization",
        name: "TrademarkX Legal Tech Pvt. Ltd.",
      },
    },
    ...IPR_SERVICE_SECTIONS.map((section) => ({
      "@type": "Service",
      name: section.title,
      description: section.description,
      serviceOutput: section.services,
      provider: {
        "@type": "Organization",
        name: "TrademarkX Legal Tech Pvt. Ltd.",
      },
    })),
  ],
};

export const Route = createFileRoute("/services/ipr")({
  head: () => ({
    meta: [
      {
        title: "Intellectual Property Rights (IPR) Services — TrademarkX",
      },
      {
        name: "description",
        content:
          "Comprehensive IPR services in India: trademark registration, patent filing, copyright protection, industrial design registration, IP due diligence, technology transfer, and IP litigation support.",
      },
      {
        name: "keywords",
        content:
          "intellectual property rights services, trademark services, patent services, copyright services, industrial design registration, IP due diligence, technology transfer, IP litigation support, India",
      },
      {
        property: "og:title",
        content: "Intellectual Property Rights (IPR) Services — TrademarkX",
      },
      {
        property: "og:description",
        content:
          "Protect innovation, creativity, and brand value with comprehensive IPR services for startups, SMEs, and enterprises.",
      },
      { property: "og:type", content: "website" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(IPR_SCHEMA),
      },
    ],
  }),
  component: IprServicesPage,
});

function IprServicesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        {/* HERO */}
        <section className="relative overflow-hidden border-b border-border/60">
          <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-subtle)" }} />
          <div className="absolute right-0 top-0 -z-10 h-[480px] w-[480px] rounded-full opacity-30 blur-3xl" style={{ background: "var(--gradient-hero)" }} />
          <div className="container mx-auto px-4 py-16 md:py-24">
            <Badge variant="secondary" className="mb-5 gap-1.5 rounded-full bg-accent px-3 py-1">
              <Scale className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium text-accent-foreground">Full-Spectrum IP Protection</span>
            </Badge>
            <h1 className="max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
              Intellectual Property Rights (IPR) Services
            </h1>
            <p className="mt-5 max-w-3xl text-lg text-muted-foreground">
              Protecting innovation, creativity, and brand value is essential in today's competitive business environment. We provide comprehensive Intellectual Property Rights (IPR) services to help individuals, startups, SMEs, and multinational companies secure, manage, and enforce their intellectual assets.
            </p>
            <p className="mt-4 max-w-3xl text-base text-muted-foreground">
              Intellectual property commonly includes patents, trademarks, copyrights, industrial designs, trade secrets, and related rights.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <a href="#consultation">
                  Talk to an IP Expert <ArrowRight className="ml-1.5 h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#consultation">Get Free Consultation</a>
              </Button>
            </div>
          </div>
        </section>

        {/* SERVICE SECTIONS */}
        {IPR_SERVICE_SECTIONS.map((section, index) => {
          const Icon = SECTION_ICONS[section.id] ?? Shield;
          const isAlt = index % 2 === 1;
          return (
            <section
              key={section.id}
              id={section.id}
              className={isAlt ? "bg-secondary/30 py-20" : "container mx-auto px-4 py-20"}
            >
              <div className={isAlt ? "container mx-auto px-4" : ""}>
                <div className="mx-auto mb-10 max-w-3xl">
                  <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-accent">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{section.title}</h2>
                  <p className="mt-3 text-lg text-muted-foreground">{section.description}</p>
                  {section.extraDescription && (
                    <p className="mt-2 text-muted-foreground">{section.extraDescription}</p>
                  )}
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {section.services.map((service) => (
                    <Card
                      key={service}
                      className="border-border/60 transition hover:border-primary/40"
                      style={{ boxShadow: "var(--shadow-card)" }}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start gap-3">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                          <CardTitle className="text-base font-semibold leading-snug">{service}</CardTitle>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button variant="outline" asChild>
                    <a href="#consultation">Request a Quote</a>
                  </Button>
                  {section.id === "trademark-services" && (
                    <Button variant="ghost" asChild>
                      <Link to="/trademark-search">Free Trademark Search</Link>
                    </Button>
                  )}
                  {section.id === "patent-services" && (
                    <Button variant="ghost" asChild>
                      <Link to="/services/patents">View Patent Services</Link>
                    </Button>
                  )}
                  {section.id === "copyright-services" && (
                    <Button variant="ghost" asChild>
                      <Link to="/services/copyrights">View Copyright Services</Link>
                    </Button>
                  )}
                  {section.id === "industrial-design-services" && (
                    <Button variant="ghost" asChild>
                      <Link to="/services/designs">View Design Services</Link>
                    </Button>
                  )}
                </div>
              </div>
            </section>
          );
        })}

        {/* WHY CHOOSE US */}
        <section className="container mx-auto px-4 py-20">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Badge variant="outline" className="mb-3">Why TrademarkX</Badge>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Trusted IP Advisors for Growing Businesses</h2>
            <p className="mt-3 text-muted-foreground">
              From first filing to portfolio management and enforcement, our legal-tech platform combines expert counsel with transparent, technology-driven workflows.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                title: "Registered IP Professionals",
                desc: "Trademark agents, patent agents, and legal experts with deep experience across Indian and international IP law.",
              },
              {
                title: "End-to-End Lifecycle Support",
                desc: "Search, filing, prosecution, renewal, licensing, due diligence, and dispute resolution under one roof.",
              },
              {
                title: "Transparent & Compliant",
                desc: "Government-compliant filings with clear fee structures and real-time status tracking via our platform.",
              },
            ].map((b) => (
              <Card key={b.title} className="border-border/60" style={{ boxShadow: "var(--shadow-card)" }}>
                <CardHeader>
                  <CardTitle className="text-lg">{b.title}</CardTitle>
                  <CardDescription>{b.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* CONSULTATION FORM */}
        <section id="consultation" className="border-t border-border/60 bg-secondary/30 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <Badge variant="outline" className="mb-3">Free Consultation</Badge>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Speak with an IP Expert Today</h2>
            </div>
            <IprConsultationForm />
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 py-20">
          <Card className="relative overflow-hidden border-none text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>
            <CardContent className="flex flex-col items-center gap-5 px-6 py-12 text-center md:px-12">
              <Scale className="h-10 w-10" />
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Ready to protect your intellectual property?</h2>
              <p className="max-w-xl text-base opacity-90">
                Whether you need a trademark, patent, copyright, or a full IP portfolio strategy — our team is here to help.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button size="lg" variant="secondary" asChild>
                  <a href="#consultation">
                    Get Free Consultation <ArrowRight className="ml-1.5 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/40 bg-transparent text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
                  asChild
                >
                  <Link to="/apply">Start Trademark Application</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
