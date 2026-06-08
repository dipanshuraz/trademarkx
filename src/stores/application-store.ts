import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ApplicantType = "Individual" | "Proprietorship" | "Partnership" | "LLP" | "Private Limited" | "Startup" | "MSME";
export type TMType = "Wordmark" | "Logo" | "Device Mark" | "Combined Mark";

export type AppDraft = {
  step: number;
  applicantType?: ApplicantType;
  pan?: string;
  gstin?: string;
  startupCert?: string;
  msmeNumber?: string;

  fullName?: string;
  companyName?: string;
  email?: string;
  mobile?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;

  trademarkName?: string;
  tagline?: string;
  description?: string;
  firstUseDate?: string;
  trademarkType?: TMType;

  industry?: string;
  businessDescription?: string;
  classes: number[];

  documents: { name: string; size: number; type: string; dataUrl?: string }[];

  plan?: "Starter" | "Professional" | "Premium";
  paymentStatus?: "Pending" | "Success" | "Failed";
  transactionId?: string;
  applicationNumber?: string;
};

type Store = {
  draft: AppDraft;
  setStep: (step: number) => void;
  update: (patch: Partial<AppDraft>) => void;
  reset: () => void;
};

const initial: AppDraft = { step: 1, classes: [], documents: [] };

export const useApplicationStore = create<Store>()(
  persist(
    (set) => ({
      draft: initial,
      setStep: (step) => set((s) => ({ draft: { ...s.draft, step } })),
      update: (patch) => set((s) => ({ draft: { ...s.draft, ...patch } })),
      reset: () => set({ draft: initial }),
    }),
    { name: "tm-application-draft" },
  ),
);
