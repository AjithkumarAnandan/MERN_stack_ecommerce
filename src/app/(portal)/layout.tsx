import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/Component/Navbar/page";
import Sidebar from "@/Component/Sidebar/page";
import Footer from "@/Component/Footer/page";
import LoginComponent from "./login/page";
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
         <div className="flex flex-col h-screen">
          <div className="fixed top-0">
          <NavDetails/>
          </div>
      {/* Navbar */}
      <header className="bg-gray-800 text-white p-4 fixed top-26 left-0 w-full z-10">
        <Navbar />
      </header>
      {/* Main content area with sidebar */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        {/* <aside className="bg-gray-900 text-white w-64 p-4 h-full fixed left-0 top-16">
          <Sidebar />
        </aside> */}
        {/* Main content */}
        <main className="flex-1 p-6  overflow-auto mt-32">
          {children}
        </main>
      </div>
      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center fixed bottom-0 left-0 w-full">
        {/* <Footer /> */}
      </footer>
    </div>
  );
}
 