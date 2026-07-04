import type { Metadata } from "next";
import { Gilda_Display, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const gildaDisplay = Gilda_Display({
  variable: "--font-gilda",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Klaas: Dentist website Webflow template",
  description:
    "We are excellent in dental care and treatments for all patients. We take care of you and your family.",
  icons: {
    icon: "https://cdn.prod.website-files.com/633daa121f1308def083b05d/635efe931407d84bc7cd9fa5_favicon-klaas.png",
    apple:
      "https://cdn.prod.website-files.com/633daa121f1308def083b05d/635efdfab165566135f41da3_webclip-klaas.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${gildaDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
