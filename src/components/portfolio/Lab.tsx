import { PendingEvidence } from "./PendingEvidence";

export function Lab() {
  return (
    <PendingEvidence
      sectionId="lab"
      num="04"
      label="Research & AI Lab"
      headline="Experiments publish only with method, dataset, and results."
      note="Research notes appear here once each experiment has a documented question, method, dataset, result, and reproducibility path. Performance numbers are not published without the methodology behind them. Contact me for current work in progress."
    />
  );
}
