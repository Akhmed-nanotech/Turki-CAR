"use client";

import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";

const brands = [
  { name: "Toyota", src: "/images/car-brands/toyota.svg" },
  { name: "Lexus", src: "/images/car-brands/lexus.svg", light: true },
  { name: "Hyundai", src: "/images/car-brands/hyundai.svg?v=emblem" },
  { name: "Nissan", src: "/images/car-brands/nissan.svg", light: true },
  { name: "Kia", src: "/images/car-brands/kia.svg", light: true },
  { name: "Honda", src: "/images/car-brands/honda.svg" },
  { name: "Ford", src: "/images/car-brands/ford.svg" },
  { name: "Chevrolet", src: "/images/car-brands/chevrolet.svg" },
  { name: "GMC", src: "/images/car-brands/gmc.svg" },
  { name: "Mercedes-Benz", src: "/images/car-brands/mercedes.svg" },
  { name: "BMW", src: "/images/car-brands/bmw.svg" },
  { name: "Mitsubishi", src: "/images/car-brands/mitsubishi.svg" },
] as const;

function BrandList({ clone = false }: { clone?: boolean }) {
  return (
    <ul
      className="flex items-center"
      aria-hidden={clone ? true : undefined}
      {...(clone ? { "data-marquee-clone": true } : {})}
    >
      {brands.map((brand) => (
        <li key={`${clone ? "clone" : "brand"}-${brand.name}`} className="flex shrink-0 items-center px-6 sm:px-8">
          <Image
            src={brand.src}
            alt={clone ? "" : brand.name}
            width={96}
            height={32}
            unoptimized
            draggable={false}
            className={`h-7 w-auto max-w-20 object-contain opacity-80 transition duration-200 hover:opacity-100 sm:h-8 sm:max-w-24 motion-reduce:transition-none ${"light" in brand ? "brightness-0 invert" : ""}`}
          />
        </li>
      ))}
    </ul>
  );
}

export function BrandMarquee() {
  const { locale } = useLanguage();
  const label =
    locale === "ar" ? "ماركات سيارات" : locale === "ru" ? "Марки автомобилей" : "Vehicle brands";

  return (
    <section aria-label={label} className="overflow-hidden py-5">
      <div className="marquee">
        <div className="marquee-track" dir="ltr">
          <BrandList />
          <BrandList clone />
        </div>
      </div>
    </section>
  );
}
