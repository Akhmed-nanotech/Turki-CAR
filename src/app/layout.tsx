import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, IBM_Plex_Sans_Arabic } from "next/font/google";
import { LanguageProvider } from "@/components/LanguageProvider";
import { PageAtmosphere } from "@/components/PageAtmosphere";
import "./globals.css";

const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

const latin = IBM_Plex_Sans({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600", "700"],
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
