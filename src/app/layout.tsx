import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { LanguageProvider } from "@/components/LanguageProvider";
import { PageAtmosphere } from "@/components/PageAtmosphere";
import "./globals.css";

const arabic = localFont({
  src: [
    { path: "../fonts/ibm-plex-sans-arabic/IBMPlexSansArabic-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/ibm-plex-sans-arabic/IBMPlexSansArabic-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/ibm-plex-sans-arabic/IBMPlexSansArabic-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../fonts/ibm-plex-sans-arabic/IBMPlexSansArabic-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-arabic",
  display: "swap",
});

const latin = localFont({
  src: [
    { path: "../fonts/ibm-plex-sans/IBMPlexSans-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/ibm-plex-sans/IBMPlexSans-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/ibm-plex-sans/IBMPlexSans-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../fonts/ibm-plex-sans/IBMPlexSans-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-latin",
  display: "swap",
});

export const metadata: Metadata = {
  title: "تركي كار | ورشة صيانة وتشخيص السيارات",
  description:
    "تركي كار ورشة لصيانة وتشخيص السيارات: إصلاح المحرك والقير والعفشة، فحص أعطال الكمبيوتر، وفحص السيارة قبل الشراء.",
  openGraph: {
    title: "تركي كار | ورشة صيانة وتشخيص السيارات",
    description:
      "تركي كار ورشة لصيانة وتشخيص السيارات: إصلاح المحرك والقير والعفشة، فحص أعطال الكمبيوتر، وفحص السيارة قبل الشراء.",
    locale: "ar_SA",
    siteName: "تركي كار",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#07090d",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ar" dir="rtl" className={`${arabic.variable} ${latin.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#07090d] text-ink">
        <PageAtmosphere />
        <div className="relative z-10">
          <LanguageProvider>{children}</LanguageProvider>
        </div>
      </body>
    </html>
  );
}
