export const repairStages = [
  "diagnosis",
  "customer_approval",
  "parts_ordering",
  "repair",
  "washing",
  "delivery",
] as const;

export type RepairStage = (typeof repairStages)[number];

export function isRepairStage(value: string): value is RepairStage {
  return (repairStages as readonly string[]).includes(value);
}
