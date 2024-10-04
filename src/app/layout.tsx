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
  metadataBase: new URL(`${process.env.APP_BASE_URL}`),
  title: {
    default: "Developers Blog",
    template: "%s - For Developers by Developers | Developers blog",
  },
  description:
    "Developers Blog brings developers together to share ideas, stay updated with the latest tech trends, and build better solutions. Be part of a thriving community of like-minded professionals.",
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    images: "/opengraph-image.png",
  },
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
