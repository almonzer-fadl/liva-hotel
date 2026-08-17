import type { Metadata } from "next";
import { Nunito, Quicksand } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://livahotel.vercel.app"),
  title: "Liva Hotel Sapanca | Aileler İçin Butik Otel",
  description:
    "Sapanca'da teleferiğe yürüme mesafesinde, merkezi konumda aile dostu butik otel. Ücretsiz kahvaltı, evcil hayvan dostu konaklama ve güler yüzlü personel. WhatsApp'tan rezervasyon yapın.",
  keywords: [
    "Liva Hotel Sapanca",
    "Sapanca aile oteli",
    "Sapanca butik otel",
    "Sapanca teleferik yakını otel",
    "Sapanca evcil hayvan dostu otel",
    "Sapanca kahvaltılı otel",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "/",
    siteName: "Liva Hotel Sapanca",
    title: "Liva Hotel Sapanca | Aileler İçin Butik Otel",
    description:
      "Teleferiğe yürüme mesafesinde, merkezi konumda aile dostu butik otel. Ücretsiz kahvaltı ve sıcak karşılama.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Liva Hotel Sapanca",
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="tr"
      className={`${quicksand.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#f6fafc] font-body text-[#1e3a49]">
        {children}
      </body>
    </html>
  );
}
