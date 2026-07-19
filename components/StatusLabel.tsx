import type { ProjectStatus } from "@/content/project";

export function StatusLabel({ status }: { status: ProjectStatus }) {
  const tone = status === "COMPLETED" ? "complete" : status === "SIMULATED" ? "simulated" : status === "IN DEVELOPMENT" ? "development" : "planned";
  return <span className={`status-label status-${tone}`}><span aria-hidden="true" />{status}</span>;
}
