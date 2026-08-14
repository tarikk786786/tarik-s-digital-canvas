import { createFileRoute } from "@tanstack/react-router";
import { WowPortfolio } from "@/components/portfolio/WowPortfolio";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return <WowPortfolio />;
}
