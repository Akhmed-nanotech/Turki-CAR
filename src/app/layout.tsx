import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { LanguageProvider } from "@/components/LanguageProvider";
import "./globals.css";

const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
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
  themeColor: "#0e1013",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ar" dir="rtl" className={`${arabic.variable} h-full antialiased`}>
      <body className="min-h-full bg-bg text-ink">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
