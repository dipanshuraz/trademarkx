import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Users, FileText, IndianRupee, Briefcase, Search, ShieldAlert } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MOCK_LEADS, MOCK_APPLICATIONS, MOCK_PAYMENTS, MOCK_USERS, MOCK_SERVICE_INQUIRIES, EXECUTIVES, type Lead, type ServiceInquiry } from "@/lib/mock-data";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — TrademarkX" }] }),
  component: AdminPage,
});

const LEAD_COLORS: Record<Lead["status"], string> = {
  New: "bg-primary/15 text-primary",
  Contacted: "bg-warning text-warning-foreground",
  Qualified: "bg-accent text-accent-foreground",
  Converted: "bg-success text-success-foreground",
  Lost: "bg-destructive text-destructive-foreground",
};

function AdminPage() {
  const totalRevenue = MOCK_PAYMENTS.filter((p) => p.status === "Success").reduce((s, p) => s + p.amount, 0);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 bg-secondary/20">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground"><ShieldAlert className="h-5 w-5" /></div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Admin Console</h1>
              <p className="text-sm text-muted-foreground">Internal CRM for leads, applications, payments and users.</p>
            </div>
          </div>

          <div className="mb-6 grid gap-4 md:grid-cols-4">
            {[
              { label: "Total Leads", value: MOCK_LEADS.length, icon: Briefcase },
              { label: "Applications", value: MOCK_APPLICATIONS.length, icon: FileText },
              { label: "Revenue", value: `₹${(totalRevenue / 100000).toFixed(1)}L`, icon: IndianRupee },
              { label: "Active Users", value: MOCK_USERS.length, icon: Users },
            ].map((s) => (
              <Card key={s.label} style={{ boxShadow: "var(--shadow-card)" }}>
                <CardContent className="flex items-center gap-3 p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-primary"><s.icon className="h-5 w-5" /></div>
                  <div>
                    <div className="text-xl font-bold">{s.value}</div>
                    <div className="text-xs text-muted-foreground">{s.label}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="leads">
            <TabsList>
              <TabsTrigger value="leads">Leads</TabsTrigger>
              <TabsTrigger value="inquiries">Service Inquiries</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
            </TabsList>

            <TabsContent value="leads"><LeadsTable /></TabsContent>
            <TabsContent value="inquiries"><InquiriesTable /></TabsContent>
            <TabsContent value="applications"><AppsTable /></TabsContent>
            <TabsContent value="payments"><PaymentsTable /></TabsContent>
            <TabsContent value="users"><UsersTable /></TabsContent>
          </Tabs>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function LeadsTable() {
  const [q, setQ] = useState("");
  const [s, setS] = useState("all");
  const rows = MOCK_LEADS.filter((l) =>
    (s === "all" || l.status === s) &&
    (q === "" || l.name.toLowerCase().includes(q.toLowerCase()) || l.trademarkName.toLowerCase().includes(q.toLowerCase())),
  ).slice(0, 50);
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-3 space-y-0">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search leads..." className="pl-9" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <Select value={s} onValueChange={setS}>
          <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {["New","Contacted","Qualified","Converted","Lost"].map((x) => <SelectItem key={x} value={x}>{x}</SelectItem>)}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Lead ID</TableHead><TableHead>Name</TableHead><TableHead>Mobile</TableHead><TableHead>Email</TableHead><TableHead>Trademark</TableHead><TableHead>Status</TableHead><TableHead>Source</TableHead><TableHead>Created</TableHead><TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((l) => (
              <TableRow key={l.id}>
                <TableCell className="font-mono text-xs">{l.id}</TableCell>
                <TableCell className="font-medium">{l.name}</TableCell>
                <TableCell className="text-sm">{l.mobile}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{l.email}</TableCell>
                <TableCell>{l.trademarkName}</TableCell>
                <TableCell><Badge className={LEAD_COLORS[l.status]}>{l.status}</Badge></TableCell>
                <TableCell className="text-sm text-muted-foreground">{l.source}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{l.createdAt}</TableCell>
                <TableCell><Button size="sm" variant="ghost">Notes</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function AppsTable() {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow><TableHead>Application No.</TableHead><TableHead>Applicant</TableHead><TableHead>Trademark</TableHead><TableHead>Classes</TableHead><TableHead>Payment</TableHead><TableHead>Status</TableHead><TableHead>Filed</TableHead></TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_APPLICATIONS.slice(0, 50).map((a) => (
              <TableRow key={a.id}>
                <TableCell className="font-mono text-xs">{a.applicationNumber}</TableCell>
                <TableCell>{a.applicantName}</TableCell>
                <TableCell className="font-medium">{a.trademarkName}</TableCell>
                <TableCell>{a.classes.join(", ")}</TableCell>
                <TableCell><Badge variant={a.paymentStatus === "Success" ? "default" : a.paymentStatus === "Pending" ? "secondary" : "destructive"}>{a.paymentStatus}</Badge></TableCell>
                <TableCell>{a.status}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{a.filedOn}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function PaymentsTable() {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow><TableHead>Payment ID</TableHead><TableHead>Txn ID</TableHead><TableHead>Applicant</TableHead><TableHead>Application</TableHead><TableHead>Plan</TableHead><TableHead>Amount</TableHead><TableHead>Status</TableHead><TableHead>Date</TableHead></TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_PAYMENTS.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-mono text-xs">{p.id}</TableCell>
                <TableCell className="font-mono text-xs">{p.txnId}</TableCell>
                <TableCell>{p.applicantName}</TableCell>
                <TableCell className="font-mono text-xs">{p.applicationNumber}</TableCell>
                <TableCell><Badge variant="outline">{p.plan}</Badge></TableCell>
                <TableCell>₹{p.amount.toLocaleString("en-IN")}</TableCell>
                <TableCell><Badge variant={p.status === "Success" ? "default" : p.status === "Pending" ? "secondary" : "destructive"}>{p.status}</Badge></TableCell>
                <TableCell className="text-sm text-muted-foreground">{p.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function UsersTable() {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow><TableHead>User ID</TableHead><TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Mobile</TableHead><TableHead>City</TableHead><TableHead>Joined</TableHead><TableHead>Apps</TableHead></TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_USERS.slice(0, 50).map((u) => (
              <TableRow key={u.id}>
                <TableCell className="font-mono text-xs">{u.id}</TableCell>
                <TableCell className="font-medium">{u.name}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{u.email}</TableCell>
                <TableCell>{u.mobile}</TableCell>
                <TableCell>{u.city}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{u.joinedAt}</TableCell>
                <TableCell><Badge variant="secondary">{u.applications}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

const CATEGORY_OPTIONS = ["Trademark","Patent","Copyright","Design Registration","International Trademark"] as const;
const COUNTRY_FILTER = ["India","USA","UK","Europe (EUIPO)","Australia","Canada"] as const;
const INQ_STATUS = ["New","Contacted","Quoted","Converted","Lost"] as const;

const INQ_STATUS_COLORS: Record<ServiceInquiry["status"], string> = {
  New: "bg-primary/15 text-primary",
  Contacted: "bg-warning text-warning-foreground",
  Quoted: "bg-accent text-accent-foreground",
  Converted: "bg-success text-success-foreground",
  Lost: "bg-destructive text-destructive-foreground",
};

function InquiriesTable() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [country, setCountry] = useState("all");
  const [status, setStatus] = useState("all");
  const [exec, setExec] = useState("all");

  const rows = MOCK_SERVICE_INQUIRIES.filter((i) =>
    (cat === "all" || i.category === cat) &&
    (country === "all" || i.country === country) &&
    (status === "all" || i.status === status) &&
    (exec === "all" || i.assignedTo === exec) &&
    (q === "" || i.brandName.toLowerCase().includes(q.toLowerCase()) || i.businessName.toLowerCase().includes(q.toLowerCase()) || i.contactName.toLowerCase().includes(q.toLowerCase())),
  ).slice(0, 60);

  return (
    <Card>
      <CardHeader className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search by brand, business or contact..." className="pl-9" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <Select value={cat} onValueChange={setCat}>
            <SelectTrigger><SelectValue placeholder="Service Type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All service types</SelectItem>
              {CATEGORY_OPTIONS.map((x) => <SelectItem key={x} value={x}>{x}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={country} onValueChange={setCountry}>
            <SelectTrigger><SelectValue placeholder="Country" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All countries</SelectItem>
              {COUNTRY_FILTER.map((x) => <SelectItem key={x} value={x}>{x}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {INQ_STATUS.map((x) => <SelectItem key={x} value={x}>{x}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={exec} onValueChange={setExec}>
            <SelectTrigger><SelectValue placeholder="Assigned Executive" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All executives</SelectItem>
              {EXECUTIVES.map((x) => <SelectItem key={x} value={x}>{x}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Inquiry ID</TableHead><TableHead>Category</TableHead><TableHead>Service</TableHead><TableHead>Country</TableHead><TableHead>Business</TableHead><TableHead>Brand</TableHead><TableHead>Contact</TableHead><TableHead>Assigned</TableHead><TableHead>Status</TableHead><TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((i) => (
              <TableRow key={i.id}>
                <TableCell className="font-mono text-xs">{i.id}</TableCell>
                <TableCell><Badge variant="outline">{i.category}</Badge></TableCell>
                <TableCell className="text-sm">{i.serviceName}</TableCell>
                <TableCell className="text-sm">{i.country}</TableCell>
                <TableCell className="text-sm">{i.businessName}</TableCell>
                <TableCell className="font-medium">{i.brandName}</TableCell>
                <TableCell className="text-sm">
                  <div>{i.contactName}</div>
                  <div className="text-xs text-muted-foreground">{i.email}</div>
                </TableCell>
                <TableCell className="text-sm">{i.assignedTo}</TableCell>
                <TableCell><Badge className={INQ_STATUS_COLORS[i.status]}>{i.status}</Badge></TableCell>
                <TableCell className="text-sm text-muted-foreground">{i.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
