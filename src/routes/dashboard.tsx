import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { FileText, Clock, CheckCircle2, AlertCircle, Plus, Search } from "lucide-react";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from "recharts";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MOCK_APPLICATIONS, type ApplicationStatus } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — TrademarkX" }] }),
  component: Dashboard,
});

const STATUS_STYLE: Record<ApplicationStatus, string> = {
  Draft: "bg-secondary text-secondary-foreground",
  Submitted: "bg-accent text-accent-foreground",
  "Under Examination": "bg-warning text-warning-foreground",
  Published: "bg-primary/15 text-primary",
  Registered: "bg-success text-success-foreground",
  Objected: "bg-destructive text-destructive-foreground",
};

function Dashboard() {
  const apps = MOCK_APPLICATIONS.slice(0, 24);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<string>("all");

  const filtered = useMemo(() =>
    apps.filter((a) =>
      (filter === "all" || a.status === filter) &&
      (q === "" || a.trademarkName.toLowerCase().includes(q.toLowerCase()) || a.applicationNumber.includes(q)),
    ), [q, filter, apps]);

  const counts = MOCK_APPLICATIONS.reduce((acc, a) => {
    acc[a.status] = (acc[a.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(counts).map(([name, value]) => ({ name, value }));
  const COLORS = ["oklch(0.55 0.18 260)","oklch(0.62 0.16 155)","oklch(0.75 0.16 75)","oklch(0.6 0.22 25)","oklch(0.5 0.04 250)","oklch(0.7 0.15 200)"];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 bg-secondary/20">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">My Dashboard</h1>
              <p className="text-sm text-muted-foreground">Track all your trademark applications in one place.</p>
            </div>
            <Button asChild><Link to="/apply"><Plus className="mr-1.5 h-4 w-4" /> New Application</Link></Button>
          </div>

          <div className="mb-6 grid gap-4 md:grid-cols-4">
            {[
              { label: "Total Applications", value: MOCK_APPLICATIONS.length, icon: FileText, color: "text-primary" },
              { label: "Pending", value: counts["Submitted"] || 0, icon: Clock, color: "text-warning" },
              { label: "Registered", value: counts["Registered"] || 0, icon: CheckCircle2, color: "text-success" },
              { label: "Objected", value: counts["Objected"] || 0, icon: AlertCircle, color: "text-destructive" },
            ].map((s) => (
              <Card key={s.label} style={{ boxShadow: "var(--shadow-card)" }}>
                <CardContent className="flex items-center gap-4 p-5">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-lg bg-secondary ${s.color}`}>
                    <s.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{s.value}</div>
                    <div className="text-xs text-muted-foreground">{s.label}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mb-6 grid gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader><CardTitle className="text-base">Applications by Status</CardTitle></CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="name" fontSize={11} />
                    <YAxis fontSize={11} />
                    <Tooltip />
                    <Bar dataKey="value" fill="oklch(0.55 0.18 260)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-base">Distribution</CardTitle></CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={40} outerRadius={75}>
                      {chartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="mb-4 flex flex-wrap gap-2">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-9" placeholder="Search trademark or application number" value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-56"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                {(["Draft","Submitted","Under Examination","Published","Registered","Objected"] as ApplicationStatus[]).map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((a) => (
              <Card key={a.id} className="transition hover:border-primary/40" style={{ boxShadow: "var(--shadow-card)" }}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <CardTitle className="truncate text-base">{a.trademarkName}</CardTitle>
                      <CardDescription className="text-xs">{a.applicationNumber}</CardDescription>
                    </div>
                    <Badge className={STATUS_STYLE[a.status]}>{a.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex flex-wrap gap-1">
                    {a.classes.map((c) => <Badge key={c} variant="outline" className="text-xs">Class {c}</Badge>)}
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Filed {a.filedOn}</span>
                    <span>{a.plan} · ₹{a.amount.toLocaleString("en-IN")}</span>
                  </div>
                  <Button asChild size="sm" variant="outline" className="w-full">
                    <Link to="/track/$applicationId" params={{ applicationId: a.applicationNumber }}>View Timeline</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
