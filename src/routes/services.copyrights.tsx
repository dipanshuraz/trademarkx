import { createFileRoute } from "@tanstack/react-router";
import { ServiceCategoryPage } from "@/components/service-category-page";

export const Route = createFileRoute("/services/copyrights")({
  head: () => ({ meta: [
    { title: "Copyright Services — TrademarkX" },
    { name: "description", content: "Copyright registration for software, websites, literary, artistic and music works." },
  ]}),
  component: () => <ServiceCategoryPage categoryKey="Copyright" accentBadge="Copyright Services" />,
});