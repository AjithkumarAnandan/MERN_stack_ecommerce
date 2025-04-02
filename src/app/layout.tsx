import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionProviderWrapper from "@/Component/SessionProviderGoogle/SessionProviderWrapper";
import ReduxProvider from "@/Redux/Store/ReduxProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ajee Foods",
  description: "Hygineic food essential to our healthy life. You and your family health is our periority!.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>            
            <SessionProviderWrapper>
              <ReduxProvider>
                 {children}
              </ReduxProvider>
            </SessionProviderWrapper>   
      </body>
    </html>
  );
}
 