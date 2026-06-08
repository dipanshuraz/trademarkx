import { createFileRoute } from "@tanstack/react-router";
import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, ShieldCheck, Award, Users, Building2, Search, Sparkles, Lock, Globe, BadgeIndianRupee, FileCheck, Star, Check, Scale, Briefcase, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import { TM_CLASSES, TESTIMONIALS, FAQS } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TrademarkX — Protect Your Brand With Trademark Registration in India" },
      { name: "description", content: "File your trademark online with expert assistance, end-to-end support and government compliant filing across all 45 NICE classes." },
      { property: "og:title", content: "TrademarkX — India's Modern Trademark Filing Platform" },
      { property: "og:description", content: "10,000+ applications filed. 98% success rate. Start your trademark journey today." },
    ],
  }),
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const [brand, setBrand] = useState("");
  const [cls, setCls] = useState("");

  const goSearch = () => {
    const params = new URLSearchParams();
    if (brand) params.set("q", brand);
    if (cls) params.set("class", cls);
    navigate({ to: "/trademark-search", search: Object.fromEntries(params) as never });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-subtle)" }} />
          <div className="absolute right-0 top-0 -z-10 h-[480px] w-[480px] rounded-full opacity-30 blur-3xl" style={{ background: "var(--gradient-hero)" }} />
          <div className="container mx-auto grid gap-12 px-4 py-16 md:py-24 lg:grid-cols-2 lg:items-center">
            <div>
              <Badge variant="secondary" className="mb-5 gap-1.5 rounded-full bg-accent px-3 py-1">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-medium text-accent-foreground">Government Compliant Filing</span>
              </Badge>
              <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-foreground md:text-6xl">
                Protect Your Brand With{" "}
                <span className="bg-gradient-to-r from-primary to-[oklch(0.55_0.18_260)] bg-clip-text text-transparent">Trademark Registration</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg text-muted-foreground">
                File your trademark online with expert assistance and end-to-end support across all 45 NICE classes.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button size="lg" asChild>
                  <Link to="/trademark-search">
                    Check Trademark Availability <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/apply">Start Registration</Link>
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5"><Check className="h-4 w-4 text-success" /> No hidden fees</div>
                <div className="flex items-center gap-1.5"><Check className="h-4 w-4 text-success" /> Lifetime support</div>
                <div className="flex items-center gap-1.5"><Check className="h-4 w-4 text-success" /> Money-back guarantee</div>
              </div>
            </div>

            {/* SEARCH WIDGET */}
            <Card className="border-border/60" style={{ boxShadow: "var(--shadow-elegant)" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-primary" />
                  Free Trademark Search
                </CardTitle>
                <CardDescription>Instantly check if your brand name is available</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Brand Name</label>
                  <Input placeholder="e.g. Saffron Cafe" value={brand} onChange={(e) => setBrand(e.target.value)} onKeyDown={(e) => e.key === "Enter" && goSearch()} />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Trademark Class</label>
                  <Select value={cls} onValueChange={setCls}>
                    <SelectTrigger><SelectValue placeholder="All 45 classes" /></SelectTrigger>
                    <SelectContent className="max-h-72">
                      {TM_CLASSES.map((c) => (
                        <SelectItem key={c.id} value={String(c.id)}>
                          Class {c.id} — {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full" size="lg" onClick={goSearch}>
                  <Search className="mr-1.5 h-4 w-4" /> Search Trademark
                </Button>
                <p className="text-center text-xs text-muted-foreground">100% free · No login required</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* TRUST */}
        <section className="border-y border-border/60 bg-secondary/30 py-12">
          <div className="container mx-auto grid grid-cols-2 gap-6 px-4 md:grid-cols-4">
            {[
              { icon: FileCheck, label: "10,000+", sub: "Applications Filed" },
              { icon: Award, label: "98%", sub: "Success Rate" },
              { icon: Users, label: "5000+", sub: "Businesses Served" },
              { icon: ShieldCheck, label: "100%", sub: "Government Compliant" },
            ].map((t) => (
              <div key={t.sub} className="text-center">
                <t.icon className="mx-auto mb-2 h-7 w-7 text-primary" />
                <div className="text-2xl font-bold tracking-tight md:text-3xl">{t.label}</div>
                <div className="text-sm text-muted-foreground">{t.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* WHY */}
        <section className="container mx-auto px-4 py-20">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Badge variant="outline" className="mb-3">Why Register</Badge>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Why Trademark Registration Matters</h2>
            <p className="mt-3 text-muted-foreground">Owning a registered trademark gives your business hard legal protection and tangible market value.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Scale, title: "Legal Protection", desc: "Take infringers to court with the full weight of the Trademarks Act, 1999." },
              { icon: Sparkles, title: "Brand Exclusivity", desc: "Exclusive nationwide right to use your brand for the chosen class of goods/services." },
              { icon: Lock, title: "Prevent Copycats", desc: "Block competitors from registering or using deceptively similar marks." },
              { icon: BadgeIndianRupee, title: "Business Valuation", desc: "Registered trademarks are intangible assets investors actively value." },
              { icon: Briefcase, title: "Licensing Opportunities", desc: "License or franchise your brand for an additional revenue stream." },
              { icon: Globe, title: "Nationwide Rights", desc: "Protection across all of India, including the Madrid Protocol for international filing." },
            ].map((b) => (
              <Card key={b.title} className="border-border/60 transition-all hover:border-primary/40" style={{ boxShadow: "var(--shadow-card)" }}>
                <CardHeader>
                  <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                    <b.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{b.title}</CardTitle>
                  <CardDescription>{b.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* TIMELINE */}
        <section className="bg-secondary/30 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <Badge variant="outline" className="mb-3">Process</Badge>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">The Registration Process</h2>
              <p className="mt-3 text-muted-foreground">From search to certificate, here's exactly what happens.</p>
            </div>
            <div className="relative">
              <div className="absolute left-0 right-0 top-7 hidden h-px bg-border md:block" />
              <div className="grid gap-6 md:grid-cols-6">
                {["Trademark Search","Class Selection","Application Filing","Examination","Journal Publication","Registration Certificate"].map((step, i) => (
                  <div key={step} className="relative text-center">
                    <div className="relative z-10 mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-base font-bold text-primary-foreground" style={{ boxShadow: "var(--shadow-elegant)" }}>
                      {i + 1}
                    </div>
                    <div className="text-sm font-semibold">{step}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{i === 5 ? "10-18 months" : `${(i + 1) * 2}-${(i + 1) * 3} weeks`}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section className="container mx-auto px-4 py-20">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Badge variant="outline" className="mb-3">Pricing</Badge>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Transparent, All-Inclusive Pricing</h2>
            <p className="mt-3 text-muted-foreground">Government fees billed separately at actuals. No hidden surprises.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { name: "Starter", price: 1499, features: ["1 Class Filing","Trademark Search Report","Application Drafting","Email Support"], cta: "Choose Starter" },
              { name: "Professional", price: 3499, popular: true, features: ["Up to 2 Classes","Priority Search Report","Application Drafting","Examination Response","Dedicated Manager","Phone + Email Support"], cta: "Choose Professional" },
              { name: "Premium", price: 6999, features: ["Up to 5 Classes","Comprehensive Search","Application Drafting","Examination Response","Opposition Defence","Hearing Representation","Dedicated Manager"], cta: "Choose Premium" },
            ].map((p) => (
              <Card key={p.name} className={`relative border-border/60 ${p.popular ? "border-primary shadow-lg" : ""}`} style={!p.popular ? { boxShadow: "var(--shadow-card)" } : { boxShadow: "var(--shadow-elegant)" }}>
                {p.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>
                )}
                <CardHeader>
                  <CardTitle>{p.name}</CardTitle>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-4xl font-bold tracking-tight">₹{p.price.toLocaleString("en-IN")}</span>
                    <span className="text-sm text-muted-foreground">+ govt. fees</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2.5 text-sm">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={p.popular ? "default" : "outline"} asChild>
                    <Link to="/apply">{p.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="bg-secondary/30 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <Badge variant="outline" className="mb-3">Testimonials</Badge>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Loved by founders across India</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {TESTIMONIALS.map((t) => (
                <Card key={t.name} className="border-border/60">
                  <CardContent className="pt-6">
                    <div className="mb-3 flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                      ))}
                    </div>
                    <p className="text-sm leading-relaxed text-foreground">"{t.text}"</p>
                    <div className="mt-4 border-t border-border/60 pt-3">
                      <div className="text-sm font-semibold">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="container mx-auto px-4 py-20">
          <div className="mx-auto max-w-3xl">
            <div className="mb-10 text-center">
              <Badge variant="outline" className="mb-3">FAQ</Badge>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Frequently asked questions</h2>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 pb-20">
          <Card className="relative overflow-hidden border-none text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>
            <CardContent className="flex flex-col items-center gap-5 px-6 py-12 text-center md:px-12">
              <Megaphone className="h-10 w-10" />
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Ready to protect your brand?</h2>
              <p className="max-w-xl text-base opacity-90">Join 5,000+ Indian businesses that trust TrademarkX. Start your application in minutes.</p>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/apply">Start Registration <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white/40 bg-transparent text-primary-foreground hover:bg-white/10 hover:text-primary-foreground" asChild>
                  <Link to="/trademark-search">Free Search</Link>
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
