import { business } from "@/content/business";

export function PageAtmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div
        className="workshop-bg absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${business.workshopImage})` }}
      />
      <div className="absolute inset-0 bg-[#07090d]/62" />
      <div className="absolute inset-0 bg-[radial-gradient(130%_90%_at_50%_30%,transparent_0%,rgb(7_9_13/0.45)_70%,rgb(7_9_13/0.78)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#07090d]/55 via-transparent to-[#07090d]/72" />
    </div>
  );
}
