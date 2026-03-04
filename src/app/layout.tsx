import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "CalcyRaja | Modern Financial & Career Calculators",
    template: "%s | CalcyRaja"
  },
  description: "Accurate salary calculators, income tax estimators, and career tools for India. Calculate in-hand salary, PF, HRA, EMI and more.",
  keywords: ["salary calculator", "income tax calculator", "PF calculator", "HRA exemption", "EMI calculator India", "career tools"],
  authors: [{ name: "CalcyRaja Team" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://calcyraja.com",
    siteName: "CalcyRaja",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CalcyRaja | Modern Financial & Career Calculators",
    description: "Accurate salary calculators and career tools for professionals.",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-adsense-account" content="ca-pub-1213830257600237" />
        {/* AdSense Script - Replace with actual client ID */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1213830257600237"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {/* Google Analytics Script - Replace with actual ID */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
