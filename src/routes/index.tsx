import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  Globe,
  Mail,
  Phone,
  Scale,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import { HeroIllustration } from "@/components/hero-illustration";
import { IprServicesCarousel } from "@/components/ipr-services-carousel";
import { IprConsultationForm } from "@/components/ipr-consultation-form";
import { FAQS, TESTIMONIALS } from "@/lib/mock-data";
import { featureFlags } from "@/lib/feature-flags";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TrademarkX — Premium Trademark & IP Registration in India" },
      {
        name: "description",
        content:
          "Register your trademark in minutes with expert attorneys, transparent pricing, and global brand protection. Trusted by 5,000+ businesses across India.",
      },
      { property: "og:title", content: "TrademarkX — Premium Trademark & IP Registration" },
      {
        property: "og:description",
        content: "Protect your brand globally. Premium legal-tech trademark filing with end-to-end expert support.",
      },
    ],
  }),
  component: Index,
});

const CLIENT_LOGOS = ["BloomBeauty", "Vertex Tech", "NovaCare", "Mehta Foods", "Lumina Labs", "OrbitAI"];

const WHY_US = [
  { icon: Scale, title: "Expert Attorneys", desc: "Registered IP professionals guide every application with legal precision." },
  { icon: Zap, title: "Fast Filing", desc: "Streamlined digital workflows get your application submitted in days, not weeks." },
  { icon: Globe, title: "Global Coverage", desc: "Domestic and international trademark protection under one trusted platform." },
  { icon: BadgeCheck, title: "Transparent Pricing", desc: "Clear service fees with no hidden charges. Government fees shown upfront." },
  { icon: Sparkles, title: "AI-Powered Trademark Search", desc: "Intelligent phonetic and visual matching to reduce rejection risk before filing." },
];

const PROCESS = [
  { num: 1, title: "Trademark Search", duration: "2–3 weeks" },
  { num: 2, title: "Class Selection", duration: "4–6 weeks" },
  { num: 3, title: "Application Filing", duration: "6–9 weeks" },
  { num: 4, title: "Examination", duration: "8–12 weeks" },
  { num: 5, title: "Journal Publication", duration: "10–15 weeks" },
  { num: 6, title: "Registration Certificate", duration: "10–18 months" },
];

const PRICING = [
  {
    name: "Starter",
    price: 2499,
    features: ["1 Class Filing", "Trademark Search Report", "Application Drafting", "Email Support"],
    cta: "Choose Starter",
  },
  {
    name: "Standard",
    price: 4499,
    features: [
      "Trademark Search Report",
      "Trademark Filing (Up to 1 Class)",
      "Examination Report Response Support",
      "Application Filing",
      "Application Tracking",
      "Dedicated Support",
    ],
    highlight: "Examination Report Response Support",
    cta: "Choose Standard",
    popular: true,
  },
  {
    name: "Premium",
    price: 6999,
    features: [
      "Up to 5 Classes",
      "Comprehensive Search",
      "Application Drafting",
      "Examination Response",
      "Opposition Defence",
      "Hearing Representation",
      "Dedicated Manager",
    ],
    cta: "Choose Premium",
  },
];

function SectionReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const { ref, className: revealClass } = useScrollReveal();
  return (
    <div ref={ref} className={`${revealClass} ${className}`}>
      {children}
    </div>
  );
}

function Index() {
  const heroReveal = useScrollReveal();
  const trustedReveal = useScrollReveal();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        {/* 1. HERO */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,rgba(171,128,1,0.12),transparent)]" />
          <div className="container mx-auto grid gap-14 px-4 py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-6 lg:py-28">
            <div ref={heroReveal.ref} className={heroReveal.className}>
              <Badge variant="outline" className="mb-6 rounded-full border-gold-subtle bg-accent px-4 py-1.5 text-xs font-medium text-navy">
                Trusted by 5,000+ businesses
              </Badge>
              <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight md:text-5xl lg:text-[3.5rem]">
                Trademark registration in minutes.{" "}
                <span className="text-gradient-gold">Protect your brand globally.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-charcoal">
                Premium legal-tech platform combining expert attorneys with modern filing workflows. Register your
                trademark with confidence, clarity, and complete transparency.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link to="/apply">
                    Start Registration <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                {featureFlags.trademarkSearch && (
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/trademark-search">Free Trademark Search</Link>
                  </Button>
                )}
              </div>
              <div className="mt-10 grid grid-cols-2 gap-6 border-t border-border pt-8 sm:grid-cols-4">
                {[
                  { value: "10,000+", label: "Applications Filed" },
                  { value: "98%", label: "Success Rate" },
                  { value: "45", label: "NICE Classes" },
                  { value: "24/7", label: "Case Tracking" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="font-serif text-2xl font-semibold text-navy md:text-3xl">{stat.value}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:block">
              <HeroIllustration />
            </div>
          </div>
        </section>

        {/* 2. TRUSTED BY */}
        <section className="section-alt border-y border-border py-14">
          <div ref={trustedReveal.ref} className={`container mx-auto px-4 lg:px-6 ${trustedReveal.className}`}>
            <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Trusted by leading brands
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
              {CLIENT_LOGOS.map((name) => (
                <div
                  key={name}
                  className="flex h-14 min-w-[8.5rem] items-center justify-center rounded-xl border border-gold-subtle bg-card px-6 text-sm font-semibold tracking-tight text-navy/70 transition-all duration-300 hover:border-gold hover:shadow-[0_4px_20px_rgba(171,128,1,0.15)] hover:text-navy"
                >
                  {name}
                </div>
              ))}
            </div>
            <div className="mx-auto mt-12 grid max-w-3xl grid-cols-3 gap-6 text-center">
              {[
                { value: "₹500Cr+", label: "Brand value protected" },
                { value: "12 mo", label: "Avg. registration time" },
                { value: "4.9/5", label: "Client satisfaction" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-serif text-xl font-semibold text-navy md:text-2xl">{s.value}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. OUR SERVICES — IPR carousel */}
        <section id="services" className="section-alt border-y border-border py-24">
          <div className="container mx-auto px-4 lg:px-6">
            <SectionReveal className="mx-auto mb-10 max-w-2xl text-center">
              <Badge variant="outline" className="mb-4 border-gold-subtle text-navy">
                Our Services
              </Badge>
              <h2 className="font-serif text-3xl font-semibold text-navy md:text-4xl">
                Complete IP Protection, Under One Roof
              </h2>
              <p className="mt-4 text-muted-foreground">
                Browse trademark, patent, copyright, design, and full IP lifecycle support — all handled by registered
                IP professionals.
              </p>
            </SectionReveal>
            <SectionReveal>
              <IprServicesCarousel />
            </SectionReveal>
          </div>
        </section>

        {/* 4. WHY CHOOSE US */}
        <section className="section-alt py-24">
          <div className="container mx-auto px-4 lg:px-6">
            <SectionReveal className="mx-auto mb-14 max-w-2xl text-center">
              <Badge variant="outline" className="mb-4 border-gold-subtle text-navy">
                Why Choose Us
              </Badge>
              <h2 className="text-3xl font-semibold md:text-4xl lg:text-[2.75rem]">Authority you can trust. Experience you'll feel.</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                The precision of a top-tier law firm, powered by the simplicity of modern SaaS.
              </p>
            </SectionReveal>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {WHY_US.map((item, i) => (
                <SectionReveal key={item.title}>
                  <div
                    className={`premium-card rounded-2xl p-8 ${i === WHY_US.length - 1 ? "md:col-span-2 lg:col-span-1" : ""}`}
                  >
                    <item.icon className="mb-5 h-7 w-7 text-gold" />
                    <h3 className="font-serif text-xl font-semibold">{item.title}</h3>
                    <p className="mt-3 leading-relaxed text-muted-foreground">{item.desc}</p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>

        {/* 5. PROCESS TIMELINE */}
        <section id="process" className="section-alt border-y border-border py-24">
          <div className="container mx-auto px-4 lg:px-6">
            <SectionReveal className="mx-auto mb-14 max-w-2xl text-center">
              <Badge variant="outline" className="mb-4 border-gold-subtle text-navy">
                Process
              </Badge>
              <h2 className="font-serif text-3xl font-semibold text-navy md:text-4xl">The Registration Process</h2>
              <p className="mt-4 text-muted-foreground">
                From search to certificate, here&apos;s exactly what happens.
              </p>
            </SectionReveal>
            <div className="relative">
              <div className="absolute left-0 right-0 top-7 hidden h-px bg-border lg:block" aria-hidden="true" />
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-6">
                {PROCESS.map((step) => (
                  <SectionReveal key={step.title}>
                    <div className="relative text-center">
                      <div className="relative z-10 mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-navy font-serif text-base font-semibold text-white shadow-[0_6px_20px_rgba(17,34,64,0.2)]">
                        {step.num}
                      </div>
                      <h3 className="text-sm font-semibold text-navy">{step.title}</h3>
                      <p className="mt-2 text-xs text-muted-foreground">{step.duration}</p>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 6. TESTIMONIALS */}
        <section className="section-alt py-24">
          <div className="container mx-auto px-4 lg:px-6">
            <SectionReveal className="mx-auto mb-14 max-w-2xl text-center">
              <Badge variant="outline" className="mb-4 border-gold-subtle text-navy">
                Testimonials
              </Badge>
              <h2 className="font-serif text-3xl font-semibold text-navy md:text-4xl">Loved by founders across India</h2>
            </SectionReveal>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {TESTIMONIALS.map((t) => (
                <SectionReveal key={t.name}>
                  <Card className="premium-card h-full border-gold-subtle bg-card">
                    <CardContent className="flex h-full flex-col pt-7 pb-6">
                      <div className="mb-4 flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "h-4 w-4",
                              i < t.rating ? "fill-gold text-gold" : "fill-border text-border",
                            )}
                          />
                        ))}
                      </div>
                      <p className="flex-1 text-sm leading-relaxed text-charcoal">&ldquo;{t.text}&rdquo;</p>
                      <div className="mt-5 border-t border-gold-subtle pt-4">
                        <div className="text-sm font-semibold text-navy">{t.name}</div>
                        <div className="mt-0.5 text-xs text-muted-foreground">{t.role}</div>
                      </div>
                    </CardContent>
                  </Card>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>

        {/* 7. PRICING */}
        <section id="pricing" className="container mx-auto px-4 py-24 lg:px-6">
          <SectionReveal className="mx-auto mb-14 max-w-2xl text-center">
            <Badge variant="outline" className="mb-4 border-gold-subtle text-navy">
              Pricing
            </Badge>
            <h2 className="font-serif text-3xl font-semibold text-navy md:text-4xl">
              Transparent, All-Inclusive Pricing
            </h2>
            <p className="mt-4 text-muted-foreground">
              Government fees billed separately at actuals. No hidden surprises.
            </p>
          </SectionReveal>
          <div className="grid gap-8 pt-4 lg:grid-cols-3 lg:items-stretch">
            {PRICING.map((plan) => (
              <SectionReveal key={plan.name} className="flex h-full min-h-0">
                <div className="relative flex min-h-full w-full flex-1 flex-col">
                  {plan.popular && (
                    <Badge className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-navy px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white shadow-sm">
                      Most Popular
                    </Badge>
                  )}
                  <Card
                    className={cn(
                      "flex min-h-full flex-1 flex-col bg-card",
                      plan.popular
                        ? "border-gold shadow-[0_24px_48px_-12px_rgba(171,128,1,0.3)] ring-1 ring-gold/30 premium-accent-top"
                        : "premium-card border-gold-subtle",
                    )}
                  >
                    <CardHeader className={cn("shrink-0 pb-4", plan.popular && "pt-8")}>
                      <CardTitle className="font-serif text-2xl text-navy">{plan.name}</CardTitle>
                      <div className="mt-4 flex flex-wrap items-baseline gap-x-1 gap-y-1">
                        <span className="font-serif text-4xl font-semibold tracking-tight text-navy">
                          ₹{plan.price.toLocaleString("en-IN")}
                        </span>
                        <span className="text-sm text-muted-foreground">+ Government Fees</span>
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-1 flex-col pt-0">
                      <ul className="space-y-3">
                        {plan.features.map((f) => {
                          const highlighted = "highlight" in plan && plan.highlight === f;
                          return (
                            <li
                              key={f}
                              className={cn(
                                "flex items-start gap-2 text-sm text-charcoal",
                                highlighted && "rounded-lg bg-section px-3 py-2 -mx-1 font-medium",
                              )}
                            >
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                              <span>
                                {f}
                                {highlighted && (
                                  <Badge variant="secondary" className="ml-2 bg-gold/10 text-[10px] uppercase text-gold">
                                    Value Added
                                  </Badge>
                                )}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </CardContent>
                    <CardFooter className="mt-auto shrink-0 flex-col pt-6">
                      <Button
                        className={cn("w-full", plan.popular && "border-gold hover:bg-gold/5")}
                        variant="outline"
                        size="lg"
                        asChild
                      >
                        <Link to="/apply">{plan.cta}</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </SectionReveal>
            ))}
          </div>
        </section>

        {/* 8. FAQ */}
        <section id="faq" className="bg-card py-24">
          <div className="container mx-auto px-4 lg:px-6">
            <SectionReveal className="mx-auto mb-12 max-w-2xl text-center">
              <Badge variant="outline" className="mb-4 border-gold-subtle text-navy">
                FAQ
              </Badge>
              <h2 className="font-serif text-3xl font-semibold text-navy md:text-4xl">Frequently asked questions</h2>
            </SectionReveal>
            <SectionReveal className="mx-auto max-w-3xl">
              <Accordion type="single" collapsible className="w-full border-t border-border">
                {FAQS.slice(0, 6).map((f, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-border px-1">
                    <AccordionTrigger className="py-5 text-left text-base font-medium text-navy hover:no-underline [&[data-state=open]]:text-navy">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </SectionReveal>
          </div>
        </section>

        {/* 9. CONTACT CTA */}
        <section id="contact" className="container mx-auto px-4 py-20 lg:px-6">
          <SectionReveal>
            <div
              className="relative overflow-hidden rounded-[1.25rem] px-6 py-12 md:px-12 md:py-16"
              style={{ background: "var(--gradient-hero)" }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(171,128,1,0.18),transparent_50%)]" />
              <div className="relative mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-14">
                <div className="text-center lg:text-left">
                  <Badge className="mb-4 border-white/20 bg-white/10 text-white hover:bg-white/10">
                    Contact Us
                  </Badge>
                  <h2 className="font-serif text-3xl font-semibold text-white md:text-4xl">
                    Speak with an IP expert today
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-white/75">
                    Whether you need a trademark, patent, or full IP strategy — our registered professionals will
                    respond with tailored guidance within 24 hours.
                  </p>
                  <ul className="mt-8 space-y-3 text-sm text-white/80">
                    <li className="flex items-center justify-center gap-2 lg:justify-start">
                      <Mail className="h-4 w-4 shrink-0 text-gold-light" />
                      <a href="mailto:hello@trademarkx.in" className="hover:text-white hover:underline">
                        hello@trademarkx.in
                      </a>
                    </li>
                    <li className="flex items-center justify-center gap-2 lg:justify-start">
                      <Phone className="h-4 w-4 shrink-0 text-gold-light" />
                      <a href="tel:+918047123400" className="hover:text-white hover:underline">
                        +91 80 4712 3400
                      </a>
                    </li>
                  </ul>
                </div>
                <Card className="border-none bg-card shadow-[0_24px_48px_-12px_rgba(17,34,64,0.35)]">
                  <CardHeader className="pb-2">
                    <CardTitle className="font-serif text-xl text-navy">Free consultation enquiry</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <IprConsultationForm source="Homepage Contact" compact />
                  </CardContent>
                </Card>
              </div>
            </div>
          </SectionReveal>
        </section>
      </main>

      {/* 10. FOOTER */}
      <SiteFooter />
    </div>
  );
}
