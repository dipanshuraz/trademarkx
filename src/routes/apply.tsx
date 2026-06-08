import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { ArrowLeft, ArrowRight, Check, FileText, Save, Upload, X, CreditCard, Sparkles, Building2, Shield } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useApplicationStore, type ApplicantType, type TMType } from "@/stores/application-store";
import { TM_CLASSES, generateApplicationNumber } from "@/lib/mock-data";

export const Route = createFileRoute("/apply")({
  head: () => ({ meta: [{ title: "Apply for Trademark Registration — TrademarkX" }, { name: "description", content: "8-step guided trademark application with autosave and instant submission." }] }),
  component: ApplyPage,
});

const STEPS = ["Applicant Type","Applicant Info","Trademark","Business & Classes","Documents","Review","Payment","Success"];

function ApplyPage() {
  const { draft, setStep, update, reset } = useApplicationStore();
  const step = draft.step;
  const pct = (step / STEPS.length) * 100;

  const next = () => setStep(Math.min(STEPS.length, step + 1));
  const back = () => setStep(Math.max(1, step - 1));

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 bg-secondary/20">
        <div className="container mx-auto max-w-4xl px-4 py-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <Badge variant="outline" className="mb-2">Step {step} of {STEPS.length}</Badge>
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{STEPS[step - 1]}</h1>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => toast.success("Draft saved")}>
                <Save className="mr-1.5 h-4 w-4" /> Save Draft
              </Button>
              {step < 8 && (
                <Button variant="ghost" size="sm" onClick={() => { reset(); toast.success("Application reset"); }}>
                  Reset
                </Button>
              )}
            </div>
          </div>
          <Progress value={pct} className="mb-8 h-2" />

          <Card style={{ boxShadow: "var(--shadow-card)" }}>
            <CardContent className="p-6 md:p-8">
              {step === 1 && <Step1 draft={draft} update={update} />}
              {step === 2 && <Step2 draft={draft} update={update} />}
              {step === 3 && <Step3 draft={draft} update={update} />}
              {step === 4 && <Step4 draft={draft} update={update} />}
              {step === 5 && <Step5 draft={draft} update={update} />}
              {step === 6 && <Step6 draft={draft} setStep={setStep} />}
              {step === 7 && <Step7 draft={draft} update={update} onPaid={next} />}
              {step === 8 && <Step8 draft={draft} reset={reset} />}
            </CardContent>
          </Card>

          {step < 8 && (
            <div className="mt-6 flex justify-between">
              <Button variant="outline" onClick={back} disabled={step === 1}>
                <ArrowLeft className="mr-1.5 h-4 w-4" /> Back
              </Button>
              {step < 7 && (
                <Button onClick={next}>
                  Continue <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

type DraftProps = { draft: ReturnType<typeof useApplicationStore.getState>["draft"]; update: ReturnType<typeof useApplicationStore.getState>["update"] };

function Step1({ draft, update }: DraftProps) {
  const types: ApplicantType[] = ["Individual","Proprietorship","Partnership","LLP","Private Limited","Startup","MSME"];
  return (
    <div className="space-y-6">
      <div>
        <Label className="mb-3 block text-base font-semibold">Choose applicant type</Label>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {types.map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => update({ applicantType: t })}
              className={`flex items-center gap-3 rounded-lg border p-4 text-left transition ${draft.applicantType === t ? "border-primary bg-accent" : "border-border hover:border-primary/50"}`}
            >
              <div className={`flex h-9 w-9 items-center justify-center rounded-md ${draft.applicantType === t ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>
                <Building2 className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium">{t}</span>
            </button>
          ))}
        </div>
      </div>
      {draft.applicantType && (
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>PAN <span className="text-destructive">*</span></Label>
            <Input maxLength={10} placeholder="ABCDE1234F" value={draft.pan ?? ""} onChange={(e) => update({ pan: e.target.value.toUpperCase() })} />
          </div>
          {["Proprietorship","Partnership","LLP","Private Limited","MSME"].includes(draft.applicantType) && (
            <div>
              <Label>GSTIN</Label>
              <Input maxLength={15} placeholder="22ABCDE1234F1Z5" value={draft.gstin ?? ""} onChange={(e) => update({ gstin: e.target.value.toUpperCase() })} />
            </div>
          )}
          {draft.applicantType === "Startup" && (
            <div>
              <Label>DPIIT Startup Certificate Number <span className="text-destructive">*</span></Label>
              <Input placeholder="DIPP12345" value={draft.startupCert ?? ""} onChange={(e) => update({ startupCert: e.target.value })} />
            </div>
          )}
          {draft.applicantType === "MSME" && (
            <div>
              <Label>MSME / Udyam Number <span className="text-destructive">*</span></Label>
              <Input placeholder="UDYAM-MH-00-0000000" value={draft.msmeNumber ?? ""} onChange={(e) => update({ msmeNumber: e.target.value })} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Step2({ draft, update }: DraftProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="md:col-span-2"><Label>Full Name <span className="text-destructive">*</span></Label><Input value={draft.fullName ?? ""} onChange={(e) => update({ fullName: e.target.value })} /></div>
      <div><Label>Company Name</Label><Input value={draft.companyName ?? ""} onChange={(e) => update({ companyName: e.target.value })} /></div>
      <div><Label>Email <span className="text-destructive">*</span></Label><Input type="email" value={draft.email ?? ""} onChange={(e) => update({ email: e.target.value })} /></div>
      <div><Label>Mobile (10 digits) <span className="text-destructive">*</span></Label><Input maxLength={10} value={draft.mobile ?? ""} onChange={(e) => update({ mobile: e.target.value.replace(/\D/g, "") })} /></div>
      <div><Label>Pincode</Label><Input maxLength={6} value={draft.pincode ?? ""} onChange={(e) => update({ pincode: e.target.value.replace(/\D/g, "") })} /></div>
      <div className="md:col-span-2"><Label>Address</Label><Textarea value={draft.address ?? ""} onChange={(e) => update({ address: e.target.value })} /></div>
      <div><Label>City</Label><Input value={draft.city ?? ""} onChange={(e) => update({ city: e.target.value })} /></div>
      <div>
        <Label>State</Label>
        <Select value={draft.state ?? ""} onValueChange={(v) => update({ state: v })}>
          <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
          <SelectContent className="max-h-72">
            {["Maharashtra","Delhi","Karnataka","Tamil Nadu","Telangana","Gujarat","West Bengal","Rajasthan","Uttar Pradesh","Kerala","Punjab","Haryana","Madhya Pradesh","Andhra Pradesh","Odisha"].map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

function Step3({ draft, update }: DraftProps) {
  const tmTypes: TMType[] = ["Wordmark","Logo","Device Mark","Combined Mark"];
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <div><Label>Trademark Name <span className="text-destructive">*</span></Label><Input value={draft.trademarkName ?? ""} onChange={(e) => update({ trademarkName: e.target.value })} /></div>
        <div><Label>Tagline</Label><Input value={draft.tagline ?? ""} onChange={(e) => update({ tagline: e.target.value })} /></div>
        <div><Label>Description</Label><Textarea rows={3} value={draft.description ?? ""} onChange={(e) => update({ description: e.target.value })} /></div>
        <div><Label>First Use Date</Label><Input type="date" value={draft.firstUseDate ?? ""} onChange={(e) => update({ firstUseDate: e.target.value })} /></div>
        <div>
          <Label>Trademark Type</Label>
          <RadioGroup value={draft.trademarkType} onValueChange={(v) => update({ trademarkType: v as TMType })} className="mt-2 grid grid-cols-2 gap-2">
            {tmTypes.map((t) => (
              <label key={t} className={`flex cursor-pointer items-center gap-2 rounded-md border p-3 text-sm ${draft.trademarkType === t ? "border-primary bg-accent" : "border-border"}`}>
                <RadioGroupItem value={t} /> {t}
              </label>
            ))}
          </RadioGroup>
        </div>
      </div>
      <Card className="border-border/60 bg-secondary/30">
        <CardHeader><CardTitle className="text-sm">Preview</CardTitle></CardHeader>
        <CardContent className="space-y-3 text-center">
          <div className="rounded-lg border bg-background p-8">
            <div className="text-3xl font-bold tracking-tight">{draft.trademarkName || "Your Brand"}</div>
            {draft.tagline && <div className="mt-1 text-sm text-muted-foreground">{draft.tagline}</div>}
            <Badge className="mt-3" variant="secondary">™</Badge>
          </div>
          <p className="text-xs text-muted-foreground">{draft.trademarkType ?? "Choose a type"} · {draft.description || "Description will appear here"}</p>
        </CardContent>
      </Card>
    </div>
  );
}

function Step4({ draft, update }: DraftProps) {
  const [search, setSearch] = useState("");
  const filtered = TM_CLASSES.filter((c) => `${c.id} ${c.name} ${c.desc}`.toLowerCase().includes(search.toLowerCase()));
  const toggle = (id: number) => {
    const set = new Set(draft.classes);
    if (set.has(id)) set.delete(id);
    else set.add(id);
    update({ classes: Array.from(set).sort((a, b) => a - b) });
  };
  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label>Industry</Label>
          <Select value={draft.industry ?? ""} onValueChange={(v) => update({ industry: v })}>
            <SelectTrigger><SelectValue placeholder="Select industry" /></SelectTrigger>
            <SelectContent>
              {["Technology","Food & Beverage","Healthcare","Retail","Education","Finance","Manufacturing","Hospitality","Fashion"].map((i) => (
                <SelectItem key={i} value={i}>{i}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div><Label>Business Description</Label><Input value={draft.businessDescription ?? ""} onChange={(e) => update({ businessDescription: e.target.value })} /></div>
      </div>
      <div>
        <div className="mb-3 flex items-center justify-between">
          <Label>Trademark Classes ({draft.classes.length} selected)</Label>
          <Badge variant="secondary">Classes 1-34 Goods · 35-45 Services</Badge>
        </div>
        <Input placeholder="Search classes..." value={search} onChange={(e) => setSearch(e.target.value)} className="mb-3" />
        <div className="max-h-96 space-y-2 overflow-y-auto rounded-lg border p-2">
          {filtered.map((c) => {
            const checked = draft.classes.includes(c.id);
            return (
              <label key={c.id} className={`flex cursor-pointer items-start gap-3 rounded-md border p-3 transition ${checked ? "border-primary bg-accent" : "border-transparent hover:bg-secondary/50"}`}>
                <Checkbox checked={checked} onCheckedChange={() => toggle(c.id)} className="mt-0.5" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">Class {c.id}</span>
                    <span className="text-sm">{c.name}</span>
                    <Badge variant="outline" className="text-xs">{c.type}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{c.desc}</p>
                </div>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Step5({ draft, update }: DraftProps) {
  const reqs = draft.applicantType === "Individual"
    ? ["PAN Card","Aadhaar Card"]
    : draft.applicantType === "Startup"
    ? ["DPIIT Certificate","PAN Card","Logo (PNG/JPG/SVG)"]
    : ["Business PAN","GST Certificate","Certificate of Incorporation","Logo (PNG/JPG/SVG)"];

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    for (const f of files) {
      if (f.size > 10 * 1024 * 1024) {
        toast.error(`${f.name} exceeds 10MB`);
        continue;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = typeof reader.result === "string" ? reader.result : undefined;
        update({ documents: [...draft.documents, { name: f.name, size: f.size, type: f.type, dataUrl: f.type.startsWith("image/") ? dataUrl : undefined }] });
      };
      reader.readAsDataURL(f);
    }
    e.target.value = "";
  };

  const remove = (i: number) => update({ documents: draft.documents.filter((_, idx) => idx !== i) });

  return (
    <div className="space-y-5">
      <Card className="border-dashed bg-secondary/30">
        <CardContent className="p-5">
          <div className="mb-2 text-sm font-semibold">Required for {draft.applicantType ?? "your"} applicant</div>
          <ul className="grid gap-1 text-sm text-muted-foreground sm:grid-cols-2">
            {reqs.map((r) => <li key={r} className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-success" /> {r}</li>)}
          </ul>
        </CardContent>
      </Card>
      <label className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-border bg-background p-8 transition hover:border-primary">
        <Upload className="h-8 w-8 text-muted-foreground" />
        <span className="text-sm font-medium">Click to upload (max 10MB each)</span>
        <span className="text-xs text-muted-foreground">PNG, JPG, SVG, PDF supported</span>
        <input type="file" multiple className="hidden" onChange={onUpload} accept="image/*,application/pdf" />
      </label>
      {draft.documents.length > 0 && (
        <div className="space-y-2">
          {draft.documents.map((d, i) => (
            <div key={i} className="flex items-center gap-3 rounded-md border p-3">
              {d.dataUrl ? <img src={d.dataUrl} alt={d.name} className="h-12 w-12 rounded object-cover" /> : <FileText className="h-8 w-8 text-muted-foreground" />}
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium">{d.name}</div>
                <div className="text-xs text-muted-foreground">{(d.size / 1024).toFixed(1)} KB</div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => remove(i)}><X className="h-4 w-4" /></Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Step6({ draft, setStep }: { draft: DraftProps["draft"]; setStep: (s: number) => void }) {
  const Section = ({ title, step, children }: { title: string; step: number; children: React.ReactNode }) => (
    <div className="rounded-lg border p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="font-semibold">{title}</div>
        <Button variant="ghost" size="sm" onClick={() => setStep(step)}>Edit</Button>
      </div>
      <div className="space-y-1 text-sm text-muted-foreground">{children}</div>
    </div>
  );
  return (
    <div className="space-y-4">
      <Section title="Applicant" step={1}>
        <div><span className="text-foreground">{draft.applicantType ?? "—"}</span> · PAN: {draft.pan ?? "—"}</div>
        {draft.gstin && <div>GSTIN: {draft.gstin}</div>}
      </Section>
      <Section title="Contact" step={2}>
        <div><span className="text-foreground">{draft.fullName ?? "—"}</span> · {draft.email ?? "—"} · {draft.mobile ?? "—"}</div>
        <div>{draft.address ?? "—"}, {draft.city ?? "—"}, {draft.state ?? "—"} {draft.pincode ?? ""}</div>
      </Section>
      <Section title="Trademark" step={3}>
        <div><span className="text-foreground">{draft.trademarkName ?? "—"}</span> · {draft.trademarkType ?? "—"}</div>
        {draft.tagline && <div>"{draft.tagline}"</div>}
      </Section>
      <Section title="Classes" step={4}>
        <div className="flex flex-wrap gap-1.5">
          {draft.classes.length === 0 && "No classes selected"}
          {draft.classes.map((c) => {
            const cl = TM_CLASSES.find((x) => x.id === c);
            return <Badge key={c} variant="secondary">Class {c} · {cl?.name}</Badge>;
          })}
        </div>
      </Section>
      <Section title="Documents" step={5}>
        {draft.documents.length === 0 ? "No documents uploaded" : draft.documents.map((d) => <div key={d.name}>{d.name}</div>)}
      </Section>
    </div>
  );
}

function Step7({ draft, update, onPaid }: DraftProps & { onPaid: () => void }) {
  const [processing, setProcessing] = useState(false);
  const plans = [
    { id: "Starter" as const, price: 1499, features: ["1 Class","Search Report","Email Support"] },
    { id: "Professional" as const, price: 3499, features: ["Up to 2 Classes","Objection Response","Dedicated Manager"] },
    { id: "Premium" as const, price: 6999, features: ["Up to 5 Classes","Hearing Representation","Priority Support"] },
  ];
  const govtFee = (draft.classes.length || 1) * 4500;
  const planPrice = plans.find((p) => p.id === draft.plan)?.price ?? 0;
  const total = planPrice + govtFee;

  const pay = () => {
    if (!draft.plan) return toast.error("Choose a plan");
    setProcessing(true);
    setTimeout(() => {
      const success = Math.random() > 0.05;
      if (success) {
        update({ paymentStatus: "Success", transactionId: `pay_${Math.random().toString(36).slice(2, 12)}`, applicationNumber: generateApplicationNumber(Math.random) });
        toast.success("Payment successful");
        onPaid();
      } else {
        update({ paymentStatus: "Failed" });
        toast.error("Payment failed, please retry");
      }
      setProcessing(false);
    }, 1500);
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-3 md:grid-cols-3">
        {plans.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => update({ plan: p.id })}
            className={`rounded-lg border p-4 text-left transition ${draft.plan === p.id ? "border-primary bg-accent" : "border-border hover:border-primary/40"}`}
          >
            <div className="font-semibold">{p.id}</div>
            <div className="text-2xl font-bold">₹{p.price.toLocaleString("en-IN")}</div>
            <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
              {p.features.map((f) => <li key={f} className="flex gap-1.5"><Check className="h-3 w-3 text-success" /> {f}</li>)}
            </ul>
          </button>
        ))}
      </div>
      <Card className="bg-secondary/30">
        <CardContent className="space-y-2 p-5 text-sm">
          <div className="flex justify-between"><span>Service fee ({draft.plan ?? "—"})</span><span>₹{planPrice.toLocaleString("en-IN")}</span></div>
          <div className="flex justify-between"><span>Government fee ({draft.classes.length || 0} × ₹4,500)</span><span>₹{govtFee.toLocaleString("en-IN")}</span></div>
          <div className="border-t pt-2 flex justify-between text-base font-bold"><span>Total</span><span>₹{total.toLocaleString("en-IN")}</span></div>
        </CardContent>
      </Card>
      <Button className="w-full" size="lg" onClick={pay} disabled={processing}>
        <CreditCard className="mr-1.5 h-4 w-4" />
        {processing ? "Processing..." : `Pay ₹${total.toLocaleString("en-IN")} via Razorpay`}
      </Button>
      {draft.paymentStatus === "Failed" && <p className="text-center text-sm text-destructive">Payment failed. Try again.</p>}
    </div>
  );
}

function Step8({ draft, reset }: { draft: DraftProps["draft"]; reset: () => void }) {
  useEffect(() => {
    confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 } });
  }, []);
  return (
    <div className="space-y-6 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/15">
        <Sparkles className="h-8 w-8 text-success" />
      </div>
      <div>
        <h2 className="text-2xl font-bold">Application Submitted!</h2>
        <p className="mt-1 text-muted-foreground">Your trademark application has been filed successfully.</p>
      </div>
      <Card className="bg-secondary/30">
        <CardContent className="space-y-2 p-5 text-sm">
          <div className="text-xs uppercase text-muted-foreground">Application Number</div>
          <div className="text-2xl font-bold tracking-tight">{draft.applicationNumber}</div>
          <div className="text-xs text-muted-foreground">Transaction ID: {draft.transactionId}</div>
        </CardContent>
      </Card>
      <div className="flex flex-wrap justify-center gap-3">
        <Button variant="outline" onClick={() => toast.success("Receipt downloaded")}><FileText className="mr-1.5 h-4 w-4" /> Download Receipt</Button>
        <Button asChild variant="outline"><Link to="/track/$applicationId" params={{ applicationId: draft.applicationNumber ?? "TM-2026-100000" }}>Track Application</Link></Button>
        <Button asChild onClick={() => reset()}><Link to="/dashboard">Go to Dashboard <ArrowRight className="ml-1.5 h-4 w-4" /></Link></Button>
      </div>
      <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <Shield className="h-3 w-3" /> Filed with Indian Trade Marks Registry
      </div>
    </div>
  );
}
