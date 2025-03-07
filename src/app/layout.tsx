import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/Component/Navbar/page";
import Sidebar from "@/Component/Sidebar/page";
import Footer from "@/Component/Footer/page";
import LoginComponent from "./(portal)/login/page";
import NavDetails from "@/Component/NavDetails/NavDetails";

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
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
 