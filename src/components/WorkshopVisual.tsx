import Image from "next/image";
import { business } from "@/content/business";

export function WorkshopVisual({ alt }: { alt: string }) {
  return (
    <figure className="overflow-hidden rounded-lg border border-line bg-surface">
      <Image
        src={business.workshopImage}
        alt={alt}
        width={1672}
        height={941}
        priority
        sizes="(min-width: 1024px) 540px, 100vw"
        className="h-auto w-full object-cover"
        style={{ width: "100%", height: "auto" }}
      />
    </figure>
  );
}
