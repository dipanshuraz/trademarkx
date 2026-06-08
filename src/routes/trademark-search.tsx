import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { Search, Filter, ArrowRight, ShieldCheck, AlertTriangle, AlertCircle } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TM_CLASSES, MOCK_SEARCH_RESULTS, type TrademarkStatus } from "@/lib/mock-data";

type Search = { q?: string; class?: string };

export const Route = createFileRoute("/trademark-search")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    q: typeof s.q === "string" ? s.q : undefined,
    class: typeof s.class === "string" ? s.class : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Free Trademark Search — TrademarkX" },
      { name: "description", content: "Search the Indian Trademark Registry across all 45 NICE classes. Wordmark, logo and phonetic search." },
    ],
  }),
  component: TrademarkSearch,
});

const STATUS_META: Record<TrademarkStatus, { color: string; icon: typeof ShieldCheck }> = {
  Available: { color: "bg-success text-success-foreground", icon: ShieldCheck },
  "Similar Found": { color: "bg-warning text-warning-foreground", icon: AlertTriangle },
  "High Risk": { color: "bg-destructive text-destructive-foreground", icon: AlertCircle },
};

function TrademarkSearch() {
  const sp = Route.useSearch();
  const [brand, setBrand] = useState(sp.q ?? "");
  const [cls, setCls] = useState(sp.class ?? "all");
  const [searchType, setSearchType] = useState("wordmark");
  const [industry, setIndustry] = useState("all");
  const [submitted, setSubmitted] = useState(!!sp.q);

  const filtered = useMemo(() => {
    let r = MOCK_SEARCH_RESULTS;
    if (brand && submitted) {
      const q = brand.toLowerCase();
      r = r
        .map((x) => {
          const overlap = x.name.toLowerCase().includes(q) || q.includes(x.name.toLowerCase().split(" ")[0]);
          return { ...x, similarity: overlap ? Math.min(100, x.similarity + 30) : x.similarity };
        })
        .sort((a, b) => b.similarity - a.similarity);
    }
    if (cls !== "all") r = r.filter((x) => x.classId === Number(cls));
    return r.slice(0, 30);
  }, [brand, cls, submitted]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-border/60 bg-secondary/30">
          <div className="container mx-auto px-4 py-12">
            <div className="mb-6 max-w-2xl">
              <Badge variant="outline" className="mb-3">Public Search</Badge>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Trademark Availability Search</h1>
              <p className="mt-2 text-muted-foreground">Search 1M+ records from the Indian Trademark Registry.</p>
            </div>

            <Card style={{ boxShadow: "var(--shadow-elegant)" }}>
              <CardHeader>
                <Tabs value={searchType} onValueChange={setSearchType}>
                  <TabsList>
                    <TabsTrigger value="wordmark">Wordmark</TabsTrigger>
                    <TabsTrigger value="logo">Logo</TabsTrigger>
                    <TabsTrigger value="phonetic">Phonetic</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-[1fr_220px_220px_auto]">
                  <Input placeholder="Enter brand name" value={brand} onChange={(e) => setBrand(e.target.value)} onKeyDown={(e) => e.key === "Enter" && setSubmitted(true)} />
                  <Select value={cls} onValueChange={setCls}>
                    <SelectTrigger><SelectValue placeholder="Class" /></SelectTrigger>
                    <SelectContent className="max-h-72">
                      <SelectItem value="all">All classes</SelectItem>
                      {TM_CLASSES.map((c) => (
                        <SelectItem key={c.id} value={String(c.id)}>Class {c.id} — {c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={industry} onValueChange={setIndustry}>
                    <SelectTrigger><SelectValue placeholder="Industry" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All industries</SelectItem>
                      {["Technology","Food & Beverage","Healthcare","Retail","Education","Finance","Manufacturing"].map((i) => (
                        <SelectItem key={i} value={i}>{i}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button size="lg" onClick={() => setSubmitted(true)}>
                    <Search className="mr-1.5 h-4 w-4" /> Search
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="container mx-auto px-4 py-8">
          {submitted ? (
            <>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Results for "{brand}"</h2>
                  <p className="text-sm text-muted-foreground">Showing {filtered.length} of 1,00,000+ records</p>
                </div>
                <Button asChild>
                  <Link to="/apply">Proceed to File <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
                </Button>
              </div>
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Trademark</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Filed</TableHead>
                      <TableHead>Similarity</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((r) => {
                      const meta = STATUS_META[r.status];
                      const Icon = meta.icon;
                      const cl = TM_CLASSES.find((c) => c.id === r.classId);
                      return (
                        <TableRow key={r.id}>
                          <TableCell className="font-medium">{r.name}</TableCell>
                          <TableCell><span className="text-xs text-muted-foreground">Class {r.classId}</span><br /><span className="text-sm">{cl?.name}</span></TableCell>
                          <TableCell className="text-sm text-muted-foreground">{r.owner}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{r.filedOn}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="h-1.5 w-20 overflow-hidden rounded-full bg-secondary">
                                <div className="h-full" style={{ width: `${r.similarity}%`, backgroundColor: r.similarity > 70 ? "oklch(0.6 0.22 25)" : r.similarity > 30 ? "oklch(0.75 0.16 75)" : "oklch(0.62 0.16 155)" }} />
                              </div>
                              <span className="text-xs">{r.similarity}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={meta.color}>
                              <Icon className="mr-1 h-3 w-3" /> {r.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Card>
            </>
          ) : (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
                <Filter className="h-10 w-10 text-muted-foreground" />
                <CardTitle>Start a search</CardTitle>
                <CardDescription>Enter your brand name and class to see availability.</CardDescription>
              </CardContent>
            </Card>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
