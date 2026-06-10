import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ServiceType } from "@/lib/mock-data";

export type ConsultationLead = {
  id: string;
  name: string;
  email: string;
  mobile: string;
  company?: string;
  serviceType: ServiceType;
  message?: string;
  source: string;
  status: "New" | "Contacted" | "Qualified" | "Converted" | "Lost";
  createdAt: string;
};

type LeadsStore = {
  leads: ConsultationLead[];
  addLead: (lead: Omit<ConsultationLead, "id" | "status" | "createdAt">) => ConsultationLead;
};

export const useLeadsStore = create<LeadsStore>()(
  persist(
    (set, get) => ({
      leads: [],
      addLead: (lead) => {
        const entry: ConsultationLead = {
          ...lead,
          id: `LD-${Date.now()}`,
          status: "New",
          createdAt: new Date().toISOString().slice(0, 10),
        };
        set({ leads: [entry, ...get().leads] });
        return entry;
      },
    }),
    { name: "tm-consultation-leads" },
  ),
);
