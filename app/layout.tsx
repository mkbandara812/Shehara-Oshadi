import type { Metadata } from "next";
import { Playfair_Display, Montserrat, Great_Vibes } from "next/font/google";
import "./globals.css";

const heading = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
});

const body = Montserrat({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500"],
});

const script = Great_Vibes({
  subsets: ["latin"],
  variable: "--font-script",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Shehara & Oshadi | Royal Wedding Invitation",
  description: "A breathtaking digital wedding invitation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} ${script.variable} font-[family-name:var(--font-body)] antialiased`}>
        {children}
      </body>
    </html>
  );
}
