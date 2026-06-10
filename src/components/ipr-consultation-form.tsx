import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SERVICE_TYPE_OPTIONS, type ServiceType } from "@/lib/mock-data";
import { useLeadsStore } from "@/stores/leads-store";

type FormState = {
  serviceType: ServiceType | "";
  name: string;
  email: string;
  mobile: string;
  company: string;
  message: string;
};

const INITIAL: FormState = {
  serviceType: "",
  name: "",
  email: "",
  mobile: "",
  company: "",
  message: "",
};

export function IprConsultationForm({
  source = "IPR Services Page",
  defaultServiceType,
  compact,
}: {
  source?: string;
  defaultServiceType?: ServiceType;
  compact?: boolean;
}) {
  const addLead = useLeadsStore((s) => s.addLead);
  const [form, setForm] = useState<FormState>({
    ...INITIAL,
    serviceType: defaultServiceType ?? "",
  });

  const set = (key: keyof FormState) => (value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.serviceType || !form.name || !form.email) {
      toast.error("Please fill all required fields.");
      return;
    }
    addLead({
      name: form.name,
      email: form.email,
      mobile: form.mobile,
      company: form.company || undefined,
      serviceType: form.serviceType,
      message: form.message || undefined,
      source,
    });
    toast.success("Consultation request received. Our IP team will reach out within 24 hours.");
    setForm({ ...INITIAL, serviceType: defaultServiceType ?? "" });
  };

  if (compact) {
    return (
      <form className="grid gap-4" onSubmit={submit}>
        <div>
          <Label htmlFor="serviceType">Service Type *</Label>
          <Select value={form.serviceType} onValueChange={set("serviceType")}>
            <SelectTrigger id="serviceType" className="mt-1.5">
              <SelectValue placeholder="Select service type" />
            </SelectTrigger>
            <SelectContent>
              {SERVICE_TYPE_OPTIONS.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="name">Your Name *</Label>
            <Input id="name" className="mt-1.5" value={form.name} onChange={(e) => set("name")(e.target.value)} />
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
        <Button type="submit" size="lg" className="w-full">
          Get Free Consultation <ArrowRight className="ml-1.5 h-4 w-4" />
        </Button>
      </form>
    );
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_1.2fr]">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Get Free IPR Consultation</h2>
        <p className="mt-3 text-muted-foreground">
          Tell us about your intellectual property needs. Our registered IP professionals will respond with tailored guidance within 24 hours.
        </p>
        <ul className="mt-6 space-y-2.5 text-sm">
          {[
            "Confidential assessment of your IP requirements",
            "Transparent fee estimates with no hidden costs",
            "Dedicated IP expert assigned to your enquiry",
            "Support for startups, SMEs and enterprises",
          ].map((f) => (
            <li key={f} className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
              {f}
            </li>
          ))}
        </ul>
      </div>
      <Card style={{ boxShadow: "var(--shadow-elegant)" }}>
        <CardHeader>
          <CardTitle>IPR Consultation Enquiry</CardTitle>
          <CardDescription>All fields marked * are required.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={submit}>
            <div>
              <Label htmlFor="serviceType">Service Type *</Label>
              <Select value={form.serviceType} onValueChange={set("serviceType")}>
                <SelectTrigger id="serviceType" className="mt-1.5">
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  {SERVICE_TYPE_OPTIONS.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">Your Name *</Label>
                <Input id="name" className="mt-1.5" value={form.name} onChange={(e) => set("name")(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="company">Company / Organisation</Label>
                <Input id="company" className="mt-1.5" value={form.company} onChange={(e) => set("company")(e.target.value)} />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" className="mt-1.5" value={form.email} onChange={(e) => set("email")(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="mobile">Mobile</Label>
                <Input id="mobile" className="mt-1.5" value={form.mobile} onChange={(e) => set("mobile")(e.target.value)} />
              </div>
            </div>
            <div>
              <Label htmlFor="message">Brief Description of Your Requirement</Label>
              <Textarea
                id="message"
                rows={3}
                className="mt-1.5"
                placeholder="Describe your IP asset, invention, brand, or legal concern"
                value={form.message}
                onChange={(e) => set("message")(e.target.value)}
              />
            </div>
            <Button type="submit" size="lg" className="w-full">
              Get Free Consultation <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
