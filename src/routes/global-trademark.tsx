import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Globe, ArrowRight, Check, MapPin } from "lucide-react";
import { toast } from "sonner";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GLOBAL_JURISDICTIONS, COUNTRY_OPTIONS } from "@/lib/mock-data";

export const Route = createFileRoute("/global-trademark")({
  head: () => ({ meta: [
    { title: "Global Trademark Registration — TrademarkX" },
    { name: "description", content: "International trademark filing across India, USA, UK, Europe (EUIPO), Australia, Canada and other major jurisdictions." },
    { property: "og:title", content: "Global Trademark Registration — TrademarkX" },
    { property: "og:description", content: "Protect your brand globally with end-to-end international trademark services." },
  ]}),
  component: GlobalTrademarkPage,
});

function GlobalTrademarkPage() {
  const [form, setForm] = useState({
    country: "",
    businessName: "",
    brandName: "",
    goodsDescription: "",
    contactName: "",
    email: "",
    mobile: "",
  });

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.country || !form.businessName || !form.brandName || !form.contactName || !form.email) {
      toast.error("Please fill all required fields.");
      return;
    }
    toast.success("Quote request received. Our team will reach out within 24 hours.");
    setForm({ country: "", businessName: "", brandName: "", goodsDescription: "", contactName: "", email: "", mobile: "" });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        {/* HERO */}
        <section className="relative overflow-hidden border-b border-border/60">
          <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-subtle)" }} />
          <div className="container mx-auto px-4 py-16 md:py-20">
            <Badge variant="secondary" className="mb-4 gap-1.5 rounded-full bg-accent px-3 py-1">
              <Globe className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium text-accent-foreground">Worldwide IP Protection</span>
            </Badge>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">Global Trademark Registration</h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Protect your brand globally with trademark registration services across India, USA, UK, Europe, Australia, Canada, and other major jurisdictions.
            </p>
            <div className="mt-6">
              <Button size="lg" asChild>
                <a href="#quote">Get International Trademark Quote <ArrowRight className="ml-1.5 h-4 w-4" /></a>
              </Button>
            </div>
          </div>
        </section>

        {/* COUNTRY CARDS */}
        <section className="container mx-auto px-4 py-16">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <Badge variant="outline" className="mb-3">Jurisdictions</Badge>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">File in the markets that matter to you</h2>
            <p className="mt-3 text-muted-foreground">Indicative service fees. Government fees are billed separately at actuals.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {GLOBAL_JURISDICTIONS.map((j) => {
              const fixedPrice = j.price.includes("Request") ? null : j.price;
              return (
                <Card key={j.code} className="border-border/60 transition hover:border-primary/40" style={{ boxShadow: "var(--shadow-card)" }}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-sm font-bold text-primary">{j.code}</span>
                        <div>
                          <CardTitle className="text-lg">{j.name}</CardTitle>
                          <CardDescription className="flex items-center gap-1 text-xs"><MapPin className="h-3 w-3" /> {j.office}</CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      {fixedPrice ? (
                        <div>
                          <div className="text-2xl font-bold tracking-tight">{fixedPrice}</div>
                          <div className="text-xs text-muted-foreground">All-inclusive professional fee</div>
                        </div>
                      ) : (
                        <div>
                          <div className="text-base font-semibold text-primary">Request Custom Quote</div>
                          <div className="text-xs text-muted-foreground">Tailored to jurisdiction & classes</div>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Typical timeline</span>
                      <span className="font-medium text-foreground">{j.turnaround}</span>
                    </div>
                    <Button asChild variant={fixedPrice ? "outline" : "default"} size="sm" className="w-full">
                      <a href="#quote">{fixedPrice ? "Start Filing" : "Request Quote"}</a>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* WHY GLOBAL */}
        <section className="bg-secondary/30 py-16">
          <div className="container mx-auto grid gap-6 px-4 md:grid-cols-3">
            {[
              { title: "Local Agents Worldwide", desc: "Vetted attorneys in every jurisdiction we file in." },
              { title: "Single Point of Contact", desc: "One project manager handles every country in your portfolio." },
              { title: "Transparent Pricing", desc: "Flat service fees with government fees passed through at cost." },
            ].map((b) => (
              <Card key={b.title} className="border-border/60">
                <CardHeader>
                  <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent"><Check className="h-4 w-4 text-primary" /></div>
                  <CardTitle className="text-lg">{b.title}</CardTitle>
                  <CardDescription>{b.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* QUOTE FORM */}
        <section id="quote" className="container mx-auto px-4 py-16">
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <Badge variant="outline" className="mb-3">Free Consultation</Badge>
              <h2 className="text-3xl font-bold tracking-tight">Get an International Trademark Quote</h2>
              <p className="mt-3 text-muted-foreground">Share a few details and our IP team will respond with a tailored fee estimate within 24 hours.</p>
              <ul className="mt-6 space-y-2.5 text-sm">
                {["Coverage across 150+ jurisdictions","Madrid Protocol & national filings","Expert class consultation included","Dedicated project manager"].map((f) => (
                  <li key={f} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-success" />{f}</li>
                ))}
              </ul>
            </div>
            <Card style={{ boxShadow: "var(--shadow-elegant)" }}>
              <CardHeader>
                <CardTitle>International Trademark Enquiry</CardTitle>
                <CardDescription>All fields marked * are required.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="grid gap-4" onSubmit={submit}>
                  <div>
                    <Label htmlFor="country">Country of Registration *</Label>
                    <Select value={form.country} onValueChange={set("country")}>
                      <SelectTrigger id="country" className="mt-1.5"><SelectValue placeholder="Select country" /></SelectTrigger>
                      <SelectContent>
                        {COUNTRY_OPTIONS.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="businessName">Business Name *</Label>
                      <Input id="businessName" className="mt-1.5" value={form.businessName} onChange={(e) => set("businessName")(e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="brandName">Brand Name *</Label>
                      <Input id="brandName" className="mt-1.5" value={form.brandName} onChange={(e) => set("brandName")(e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="goods">Goods / Services Description</Label>
                    <Textarea id="goods" rows={3} className="mt-1.5" placeholder="Describe what your brand sells or offers" value={form.goodsDescription} onChange={(e) => set("goodsDescription")(e.target.value)} />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="contact">Your Name *</Label>
                      <Input id="contact" className="mt-1.5" value={form.contactName} onChange={(e) => set("contactName")(e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="mobile">Mobile</Label>
                      <Input id="mobile" className="mt-1.5" value={form.mobile} onChange={(e) => set("mobile")(e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" className="mt-1.5" value={form.email} onChange={(e) => set("email")(e.target.value)} />
                  </div>
                  <Button type="submit" size="lg" className="w-full">Get International Trademark Quote <ArrowRight className="ml-1.5 h-4 w-4" /></Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}