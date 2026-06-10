import { createFileRoute } from "@tanstack/react-router";
import { ServiceCategoryPage } from "@/components/service-category-page";

export const Route = createFileRoute("/services/patents")({
  head: () => ({ meta: [
    { title: "Patent Services — TrademarkX" },
    { name: "description", content: "Patent search, drafting, provisional & complete filing, prosecution and PCT international filing." },
  ]}),
  component: () => <ServiceCategoryPage categoryKey="Patent" accentBadge="Patent Services" />,
});