import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PWAInstaller from "./components/PWAInstaller";
import PWARefreshBackButton from "./components/PWARefreshBackButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "My App",
  description: "Next.js + Firebase PWA",
  manifest: "/manifest.json",
  themeColor: "#11BC0D",
  icons: {
    icon: "/pwa.svg",
    apple: "/pwa.svg",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#11BC0D" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="My App" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/globe.svg" />
        <link rel="apple-touch-icon" href="/globe.svg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased pt-14`}
      >
        <PWAInstaller />
        <PWARefreshBackButton />
        {children}
      </body>
    </html>
  );
}
