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
  title: "conrad tondryk",
  description: "conrad tondryk's personal website",
  alternates: {
    canonical: 'https://ctondryk.dev',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: "/oaktree.svg", type: "image/svg+xml" },
      { url: "/icon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" }
    ],
    shortcut: ["/icon-32.png"],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  openGraph: {
    title: "conrad tondryk",
    description: "conrad tondryk's personal website",
    url: 'https://ctondryk.dev',
    siteName: "conrad tondryk",
    images: [{
      url: 'https://ctondryk.dev/preview.jpg',
      width: 1200,
      height: 630,
      alt: "conrad tondryk's personal website",
    }],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: "conrad tondryk",
    description: "conrad tondryk's personal website",
    images: ['https://ctondryk.dev/preview.jpg'],
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
