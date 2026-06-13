import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Users, FileText, IndianRupee, Briefcase, ShieldAlert } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import { AdminDataGrid, type ColumnDef } from "@/components/admin-data-grid";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  MOCK_LEADS,
  MOCK_APPLICATIONS,
  MOCK_PAYMENTS,
  MOCK_USERS,
  MOCK_SERVICE_INQUIRIES,
  EXECUTIVES,
  SERVICE_TYPE_OPTIONS,
  type Lead,
  type ServiceInquiry,
  type Application,
} from "@/lib/mock-data";
import { useLeadsStore, type ConsultationLead } from "@/stores/leads-store";

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

const INQ_STATUS_COLORS: Record<ServiceInquiry["status"], string> = {
  New: "bg-primary/15 text-primary",
  Contacted: "bg-warning text-warning-foreground",
  Quoted: "bg-accent text-accent-foreground",
  Converted: "bg-success text-success-foreground",
  Lost: "bg-destructive text-destructive-foreground",
};

const CATEGORY_OPTIONS = [
  "Trademark",
  "Patent",
  "Copyright",
  "Design Registration",
  "International Trademark",
  "IPR Consultation",
  "Licensing & Technology Transfer",
  "IP Enforcement & Litigation Support",
] as const;

const COUNTRY_FILTER = ["India", "USA", "UK", "Europe (EUIPO)", "Australia", "Canada"] as const;
const INQ_STATUS = ["New", "Contacted", "Quoted", "Converted", "Lost"] as const;

type LeadRow = Lead | (ConsultationLead & { trademarkName?: string });

function AdminPage() {
  const totalRevenue = MOCK_PAYMENTS.filter((p) => p.status === "Success").reduce((s, p) => s + p.amount, 0);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 section-alt">
        <div className="container mx-auto px-4 py-8 lg:px-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold text-white">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-serif text-2xl font-semibold tracking-tight md:text-3xl">Admin Console</h1>
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
              <Card key={s.label} className="premium-card border-gold-subtle">
                <CardContent className="flex items-center gap-3 p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold-subtle bg-card text-gold">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-serif text-xl font-semibold text-navy">{s.value}</div>
                    <div className="text-xs text-muted-foreground">{s.label}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="leads">
            <TabsList className="mb-4 flex h-auto flex-wrap gap-1 bg-card p-1">
              <TabsTrigger value="leads">Leads</TabsTrigger>
              <TabsTrigger value="inquiries">Service Inquiries</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
            </TabsList>

            <TabsContent value="leads">
              <LeadsTable />
            </TabsContent>
            <TabsContent value="inquiries">
              <InquiriesTable />
            </TabsContent>
            <TabsContent value="applications">
              <AppsTable />
            </TabsContent>
            <TabsContent value="payments">
              <PaymentsTable />
            </TabsContent>
            <TabsContent value="users">
              <UsersTable />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

const leadColumns: ColumnDef<LeadRow>[] = [
  {
    id: "id",
    header: "Lead ID",
    sortable: true,
    sortValue: (l) => l.id,
    searchValue: (l) => l.id,
    cell: (l) => <span className="font-mono text-xs">{l.id}</span>,
  },
  {
    id: "name",
    header: "Name",
    sortable: true,
    sortValue: (l) => l.name,
    searchValue: (l) => l.name,
    cell: (l) => <span className="font-medium">{l.name}</span>,
  },
  {
    id: "mobile",
    header: "Mobile",
    sortable: true,
    sortValue: (l) => l.mobile,
    searchValue: (l) => l.mobile,
    cell: (l) => <span className="text-sm">{l.mobile || "—"}</span>,
  },
  {
    id: "email",
    header: "Email",
    sortable: true,
    sortValue: (l) => l.email,
    searchValue: (l) => l.email,
    cell: (l) => <span className="text-sm text-muted-foreground">{l.email}</span>,
  },
  {
    id: "serviceType",
    header: "Service Type",
    sortable: true,
    sortValue: (l) => ("serviceType" in l ? l.serviceType ?? "" : ""),
    searchValue: (l) => ("serviceType" in l ? l.serviceType ?? "" : ""),
    cell: (l) =>
      "serviceType" in l && l.serviceType ? (
        <Badge variant="outline">{l.serviceType}</Badge>
      ) : (
        <span className="text-sm text-muted-foreground">—</span>
      ),
  },
  {
    id: "trademarkName",
    header: "Company / Brand",
    sortable: true,
    sortValue: (l) => l.trademarkName ?? "",
    searchValue: (l) => l.trademarkName ?? "",
    cell: (l) => l.trademarkName ?? "—",
  },
  {
    id: "status",
    header: "Status",
    sortable: true,
    sortValue: (l) => l.status,
    searchValue: (l) => l.status,
    cell: (l) => <Badge className={LEAD_COLORS[l.status]}>{l.status}</Badge>,
  },
  {
    id: "source",
    header: "Source",
    sortable: true,
    sortValue: (l) => l.source,
    searchValue: (l) => l.source,
    cell: (l) => <span className="text-sm text-muted-foreground">{l.source}</span>,
  },
  {
    id: "createdAt",
    header: "Created",
    sortable: true,
    sortValue: (l) => l.createdAt,
    searchValue: (l) => l.createdAt,
    cell: (l) => <span className="text-sm text-muted-foreground">{l.createdAt}</span>,
  },
  {
    id: "actions",
    header: "",
    cell: () => (
      <Button size="sm" variant="ghost">
        Notes
      </Button>
    ),
  },
];

function LeadsTable() {
  const storedLeads = useLeadsStore((s) => s.leads);
  const [statusFilter, setStatusFilter] = useState("all");
  const [serviceTypeFilter, setServiceTypeFilter] = useState("all");

  const allLeads = useMemo<LeadRow[]>(() => {
    const consultationAsLeads: LeadRow[] = storedLeads.map((l) => ({
      ...l,
      trademarkName: l.company ?? "—",
    }));
    return [...consultationAsLeads, ...MOCK_LEADS];
  }, [storedLeads]);

  const filteredLeads = useMemo(
    () =>
      allLeads.filter((l) => {
        const leadServiceType = "serviceType" in l ? l.serviceType : undefined;
        return (
          (statusFilter === "all" || l.status === statusFilter) &&
          (serviceTypeFilter === "all" || leadServiceType === serviceTypeFilter)
        );
      }),
    [allLeads, serviceTypeFilter, statusFilter],
  );

  return (
    <AdminDataGrid
      data={filteredLeads}
      columns={leadColumns}
      getRowKey={(l) => l.id}
      searchPlaceholder="Search leads by name, email, brand..."
      toolbar={
        <div className="flex flex-wrap gap-2 lg:shrink-0">
          <Select value={serviceTypeFilter} onValueChange={setServiceTypeFilter}>
            <SelectTrigger className="w-52">
              <SelectValue placeholder="Service Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All service types</SelectItem>
              {SERVICE_TYPE_OPTIONS.map((x) => (
                <SelectItem key={x} value={x}>
                  {x}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {["New", "Contacted", "Qualified", "Converted", "Lost"].map((x) => (
                <SelectItem key={x} value={x}>
                  {x}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      }
    />
  );
}

const inquiryColumns: ColumnDef<ServiceInquiry>[] = [
  {
    id: "id",
    header: "Inquiry ID",
    sortable: true,
    sortValue: (i) => i.id,
    searchValue: (i) => i.id,
    cell: (i) => <span className="font-mono text-xs">{i.id}</span>,
  },
  {
    id: "category",
    header: "Category",
    sortable: true,
    sortValue: (i) => i.category,
    searchValue: (i) => i.category,
    cell: (i) => <Badge variant="outline">{i.category}</Badge>,
  },
  {
    id: "serviceName",
    header: "Service",
    sortable: true,
    sortValue: (i) => i.serviceName,
    searchValue: (i) => i.serviceName,
    cell: (i) => <span className="text-sm">{i.serviceName}</span>,
  },
  {
    id: "country",
    header: "Country",
    sortable: true,
    sortValue: (i) => i.country,
    searchValue: (i) => i.country,
    cell: (i) => <span className="text-sm">{i.country}</span>,
  },
  {
    id: "businessName",
    header: "Business",
    sortable: true,
    sortValue: (i) => i.businessName,
    searchValue: (i) => i.businessName,
    cell: (i) => <span className="text-sm">{i.businessName}</span>,
  },
  {
    id: "brandName",
    header: "Brand",
    sortable: true,
    sortValue: (i) => i.brandName,
    searchValue: (i) => i.brandName,
    cell: (i) => <span className="font-medium">{i.brandName}</span>,
  },
  {
    id: "contact",
    header: "Contact",
    sortable: true,
    sortValue: (i) => i.contactName,
    searchValue: (i) => `${i.contactName} ${i.email} ${i.mobile}`,
    cell: (i) => (
      <div className="text-sm">
        <div>{i.contactName}</div>
        <div className="text-xs text-muted-foreground">{i.email}</div>
      </div>
    ),
  },
  {
    id: "assignedTo",
    header: "Assigned",
    sortable: true,
    sortValue: (i) => i.assignedTo,
    searchValue: (i) => i.assignedTo,
    cell: (i) => <span className="text-sm">{i.assignedTo}</span>,
  },
  {
    id: "status",
    header: "Status",
    sortable: true,
    sortValue: (i) => i.status,
    searchValue: (i) => i.status,
    cell: (i) => <Badge className={INQ_STATUS_COLORS[i.status]}>{i.status}</Badge>,
  },
  {
    id: "createdAt",
    header: "Created",
    sortable: true,
    sortValue: (i) => i.createdAt,
    searchValue: (i) => i.createdAt,
    cell: (i) => <span className="text-sm text-muted-foreground">{i.createdAt}</span>,
  },
];

function InquiriesTable() {
  const [cat, setCat] = useState("all");
  const [country, setCountry] = useState("all");
  const [status, setStatus] = useState("all");
  const [exec, setExec] = useState("all");

  const filtered = useMemo(
    () =>
      MOCK_SERVICE_INQUIRIES.filter(
        (i) =>
          (cat === "all" || i.category === cat) &&
          (country === "all" || i.country === country) &&
          (status === "all" || i.status === status) &&
          (exec === "all" || i.assignedTo === exec),
      ),
    [cat, country, exec, status],
  );

  return (
    <AdminDataGrid
      data={filtered}
      columns={inquiryColumns}
      getRowKey={(i) => i.id}
      searchPlaceholder="Search by brand, business or contact..."
      toolbar={
        <div className="grid w-full gap-2 sm:grid-cols-2 xl:grid-cols-4 xl:w-auto">
          <Select value={cat} onValueChange={setCat}>
            <SelectTrigger>
              <SelectValue placeholder="Service Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All service types</SelectItem>
              {CATEGORY_OPTIONS.map((x) => (
                <SelectItem key={x} value={x}>
                  {x}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={country} onValueChange={setCountry}>
            <SelectTrigger>
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All countries</SelectItem>
              {COUNTRY_FILTER.map((x) => (
                <SelectItem key={x} value={x}>
                  {x}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {INQ_STATUS.map((x) => (
                <SelectItem key={x} value={x}>
                  {x}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={exec} onValueChange={setExec}>
            <SelectTrigger>
              <SelectValue placeholder="Assigned Executive" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All executives</SelectItem>
              {EXECUTIVES.map((x) => (
                <SelectItem key={x} value={x}>
                  {x}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      }
    />
  );
}

const appColumns: ColumnDef<Application>[] = [
  {
    id: "applicationNumber",
    header: "Application No.",
    sortable: true,
    sortValue: (a) => a.applicationNumber,
    searchValue: (a) => a.applicationNumber,
    cell: (a) => <span className="font-mono text-xs">{a.applicationNumber}</span>,
  },
  {
    id: "applicantName",
    header: "Applicant",
    sortable: true,
    sortValue: (a) => a.applicantName,
    searchValue: (a) => a.applicantName,
    cell: (a) => a.applicantName,
  },
  {
    id: "trademarkName",
    header: "Trademark",
    sortable: true,
    sortValue: (a) => a.trademarkName,
    searchValue: (a) => a.trademarkName,
    cell: (a) => <span className="font-medium">{a.trademarkName}</span>,
  },
  {
    id: "classes",
    header: "Classes",
    sortable: true,
    sortValue: (a) => a.classes.join(", "),
    searchValue: (a) => a.classes.join(" "),
    cell: (a) => a.classes.join(", "),
  },
  {
    id: "paymentStatus",
    header: "Payment",
    sortable: true,
    sortValue: (a) => a.paymentStatus,
    searchValue: (a) => a.paymentStatus,
    cell: (a) => (
      <Badge variant={a.paymentStatus === "Success" ? "default" : a.paymentStatus === "Pending" ? "secondary" : "destructive"}>
        {a.paymentStatus}
      </Badge>
    ),
  },
  {
    id: "status",
    header: "Status",
    sortable: true,
    sortValue: (a) => a.status,
    searchValue: (a) => a.status,
    cell: (a) => a.status,
  },
  {
    id: "filedOn",
    header: "Filed",
    sortable: true,
    sortValue: (a) => a.filedOn,
    searchValue: (a) => a.filedOn,
    cell: (a) => <span className="text-sm text-muted-foreground">{a.filedOn}</span>,
  },
];

function AppsTable() {
  return (
    <AdminDataGrid
      data={MOCK_APPLICATIONS}
      columns={appColumns}
      getRowKey={(a) => a.id}
      searchPlaceholder="Search applications..."
      defaultPageSize={25}
    />
  );
}

type PaymentRow = (typeof MOCK_PAYMENTS)[number];

const paymentColumns: ColumnDef<PaymentRow>[] = [
  {
    id: "id",
    header: "Payment ID",
    sortable: true,
    sortValue: (p) => p.id,
    searchValue: (p) => p.id,
    cell: (p) => <span className="font-mono text-xs">{p.id}</span>,
  },
  {
    id: "txnId",
    header: "Txn ID",
    sortable: true,
    sortValue: (p) => p.txnId,
    searchValue: (p) => p.txnId,
    cell: (p) => <span className="font-mono text-xs">{p.txnId}</span>,
  },
  {
    id: "applicantName",
    header: "Applicant",
    sortable: true,
    sortValue: (p) => p.applicantName,
    searchValue: (p) => p.applicantName,
    cell: (p) => p.applicantName,
  },
  {
    id: "applicationNumber",
    header: "Application",
    sortable: true,
    sortValue: (p) => p.applicationNumber,
    searchValue: (p) => p.applicationNumber,
    cell: (p) => <span className="font-mono text-xs">{p.applicationNumber}</span>,
  },
  {
    id: "plan",
    header: "Plan",
    sortable: true,
    sortValue: (p) => p.plan,
    searchValue: (p) => p.plan,
    cell: (p) => <Badge variant="outline">{p.plan}</Badge>,
  },
  {
    id: "amount",
    header: "Amount",
    sortable: true,
    sortValue: (p) => p.amount,
    searchValue: (p) => String(p.amount),
    cell: (p) => `₹${p.amount.toLocaleString("en-IN")}`,
  },
  {
    id: "status",
    header: "Status",
    sortable: true,
    sortValue: (p) => p.status,
    searchValue: (p) => p.status,
    cell: (p) => (
      <Badge variant={p.status === "Success" ? "default" : p.status === "Pending" ? "secondary" : "destructive"}>
        {p.status}
      </Badge>
    ),
  },
  {
    id: "date",
    header: "Date",
    sortable: true,
    sortValue: (p) => p.date,
    searchValue: (p) => p.date,
    cell: (p) => <span className="text-sm text-muted-foreground">{p.date}</span>,
  },
];

function PaymentsTable() {
  return (
    <AdminDataGrid
      data={MOCK_PAYMENTS}
      columns={paymentColumns}
      getRowKey={(p) => p.id}
      searchPlaceholder="Search payments..."
      defaultPageSize={25}
    />
  );
}

type UserRow = (typeof MOCK_USERS)[number];

const userColumns: ColumnDef<UserRow>[] = [
  {
    id: "id",
    header: "User ID",
    sortable: true,
    sortValue: (u) => u.id,
    searchValue: (u) => u.id,
    cell: (u) => <span className="font-mono text-xs">{u.id}</span>,
  },
  {
    id: "name",
    header: "Name",
    sortable: true,
    sortValue: (u) => u.name,
    searchValue: (u) => u.name,
    cell: (u) => <span className="font-medium">{u.name}</span>,
  },
  {
    id: "email",
    header: "Email",
    sortable: true,
    sortValue: (u) => u.email,
    searchValue: (u) => u.email,
    cell: (u) => <span className="text-sm text-muted-foreground">{u.email}</span>,
  },
  {
    id: "mobile",
    header: "Mobile",
    sortable: true,
    sortValue: (u) => u.mobile,
    searchValue: (u) => u.mobile,
    cell: (u) => u.mobile,
  },
  {
    id: "city",
    header: "City",
    sortable: true,
    sortValue: (u) => u.city,
    searchValue: (u) => u.city,
    cell: (u) => u.city,
  },
  {
    id: "joinedAt",
    header: "Joined",
    sortable: true,
    sortValue: (u) => u.joinedAt,
    searchValue: (u) => u.joinedAt,
    cell: (u) => <span className="text-sm text-muted-foreground">{u.joinedAt}</span>,
  },
  {
    id: "applications",
    header: "Apps",
    sortable: true,
    sortValue: (u) => u.applications,
    searchValue: (u) => String(u.applications),
    cell: (u) => <Badge variant="secondary">{u.applications}</Badge>,
  },
];

function UsersTable() {
  return (
    <AdminDataGrid
      data={MOCK_USERS}
      columns={userColumns}
      getRowKey={(u) => u.id}
      searchPlaceholder="Search users..."
      defaultPageSize={25}
    />
  );
}
