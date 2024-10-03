import type { Metadata } from "next";
import "./globals.css";

import { Merriweather, Roboto, Poppins } from "next/font/google";
import AppLayout from "./AppLayout";

const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
});
const merriweather = Merriweather({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-merriweather",
});
const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Developers Blog",
  description: "For developers by developers | Developers blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${roboto.variable} ${merriweather.variable} font-poppins antialiased`}
      >
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
