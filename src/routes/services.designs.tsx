import { createFileRoute } from "@tanstack/react-router";
import { ServiceCategoryPage } from "@/components/service-category-page";

export const Route = createFileRoute("/services/designs")({
  head: () => ({ meta: [
    { title: "Design Registration Services — TrademarkX" },
    { name: "description", content: "Industrial design registration, product design protection, packaging design and renewals." },
  ]}),
  component: () => <ServiceCategoryPage categoryKey="Design Registration" accentBadge="Design Registration" />,
});