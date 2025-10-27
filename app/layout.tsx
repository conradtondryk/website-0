import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ctondryk.dev'),
  title: "ctondryk.dev",
  description: "conrad tondryk's personal website",
  icons: {
    icon: [{ url: "/oaktree.svg", type: "image/svg+xml" }],
    shortcut: [{ url: "/oaktree.svg", type: "image/svg+xml" }],
    apple: [{ url: "/oaktree.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: "ctondryk.dev",
    description: "conrad tondryk's personal website",
    images: [{
      url: '/preview.jpg',
      width: 1200,
      height: 630,
    }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "ctondryk.dev",
    description: "conrad tondryk's personal website",
    images: ['/preview.jpg'],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
