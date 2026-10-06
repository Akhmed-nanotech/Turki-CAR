/**
 * Confirmed workshop details. Do not add address, hours, or other facts here
 * unless they are supplied by the business.
 */
export const business = {
  phoneDisplay: "+966 54 008 7150",
  phoneTel: "+966540087150",
  whatsappUrl: "https://wa.me/966540087150",
  mapsUrl: "https://maps.app.goo.gl/QCNzQW51NhFV4pPb7?g_st=ac",
  workshopImage: "/images/turki-car-workshop.png",
  mechanicImage: "/images/mechanic.png",
} as const;

export function callHref(): string {
  return `tel:${business.phoneTel}`;
}

export function whatsappHref(): string {
  return business.whatsappUrl;
}

export function isExternal(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}
