import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/QueryProvider";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Ganti nilai-nilai placeholder di bawah ini dengan informasi aplikasi Anda
const APP_NAME = "Heavy Equipment Inspection";
const APP_DESCRIPTION =
  "A web-based platform for mechanics to conduct, verify, and manage heavy equipment inspections efficiently.";
const APP_URL = "https://aplikasi-inspeksi-anda.com"; // Ganti dengan domain Anda

export const metadata: Metadata = {
  // metadataBase digunakan untuk URL absolut di Open Graph & Twitter
  metadataBase: new URL(APP_URL),

  // Title akan menggunakan template, misal: "Dashboard | Heavy Equipment Inspection"
  title: {
    template: `%s | ${APP_NAME}`,
    default: APP_NAME,
  },
  description: APP_DESCRIPTION,

  // Untuk SEO dan mesin pencari
  keywords: [
    "heavy equipment",
    "inspection",
    "mechanic",
    "maintenance",
    "inspeksi alat berat",
  ],
  authors: [{ name: "Your Company Name" }], // Ganti nama perusahaan Anda
  creator: "Your Company Name",

  // Untuk social media sharing (Facebook, LinkedIn, dll.)
  openGraph: {
    title: APP_NAME,
    description: APP_DESCRIPTION,
    url: APP_URL,
    siteName: APP_NAME,
    images: [
      {
        url: "/og-image.png", // Letakkan gambar ini di folder /public
        width: 1200,
        height: 630,
        alt: `Logo of ${APP_NAME}`,
      },
    ],
    locale: "id_ID",
    type: "website",
  },

  // Untuk Twitter Cards
  twitter: {
    card: "summary_large_image",
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: ["/og-image.png"], // Letakkan gambar ini di folder /public
    creator: "@handleTwitterAnda", // Ganti dengan handle Twitter Anda
  },

  // Untuk ikon di tab browser (favicon)
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
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
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
          <Toaster richColors position="top-right" />
        </QueryProvider>
      </body>
    </html>
  );
}
