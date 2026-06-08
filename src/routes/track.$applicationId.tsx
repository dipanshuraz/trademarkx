import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Circle, Clock } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_APPLICATIONS } from "@/lib/mock-data";

export const Route = createFileRoute("/track/$applicationId")({
  head: ({ params }) => ({ meta: [{ title: `Track ${params.applicationId} — TrademarkX` }] }),
  component: TrackPage,
});

function TrackPage() {
  const { applicationId } = Route.useParams();
  const app = MOCK_APPLICATIONS.find((a) => a.applicationNumber === applicationId) ?? MOCK_APPLICATIONS[0];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 bg-secondary/20">
        <div className="container mx-auto max-w-3xl px-4 py-8">
          <Button asChild variant="ghost" size="sm" className="mb-4">
            <Link to="/dashboard"><ArrowLeft className="mr-1.5 h-4 w-4" /> Back to Dashboard</Link>
          </Button>

          <Card className="mb-6" style={{ boxShadow: "var(--shadow-elegant)" }}>
            <CardHeader>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <CardTitle className="text-2xl">{app.trademarkName}</CardTitle>
                  <CardDescription>{app.applicationNumber} · {app.applicantName}</CardDescription>
                </div>
                <Badge className="bg-primary text-primary-foreground">{app.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
              <div><div className="text-xs text-muted-foreground">Applicant</div><div className="font-medium">{app.applicantType}</div></div>
              <div><div className="text-xs text-muted-foreground">Classes</div><div className="font-medium">{app.classes.join(", ")}</div></div>
              <div><div className="text-xs text-muted-foreground">Filed</div><div className="font-medium">{app.filedOn}</div></div>
              <div><div className="text-xs text-muted-foreground">Plan</div><div className="font-medium">{app.plan}</div></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Application Timeline</CardTitle></CardHeader>
            <CardContent>
              <ol className="relative space-y-6 border-l-2 border-border pl-6">
                {app.timeline.map((t, i) => {
                  const currentIdx = app.timeline.findIndex((x) => !x.done);
                  const isCurrent = i === currentIdx;
                  return (
                    <li key={i} className="relative">
                      <span className="absolute -left-[34px] flex h-7 w-7 items-center justify-center rounded-full ring-4 ring-background"
                        style={{ backgroundColor: t.done ? "oklch(0.62 0.16 155)" : isCurrent ? "oklch(0.55 0.18 260)" : "oklch(0.91 0.015 250)" }}>
                        {t.done ? <CheckCircle2 className="h-4 w-4 text-white" /> : isCurrent ? <Clock className="h-4 w-4 text-white" /> : <Circle className="h-3 w-3 text-muted-foreground" />}
                      </span>
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="font-semibold">{t.stage}</div>
                        {t.done && <Badge variant="secondary" className="text-xs">Completed</Badge>}
                        {isCurrent && <Badge className="bg-primary/15 text-primary text-xs">In Progress</Badge>}
                      </div>
                      <div className="text-xs text-muted-foreground">{t.date}</div>
                      <p className="mt-1 text-sm text-muted-foreground">{t.note}</p>
                    </li>
                  );
                })}
              </ol>
            </CardContent>
          </Card>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
