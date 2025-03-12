import Footer from "@/Component/Footer/page";
import Navbar from "@/Component/Navbar/page";
import NavDetails from "@/Component/NavBarTextBar/NavDetails";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`flex flex-col min-h-screen bg-white`}>    
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full z-20 bg-gray-800 text-white">
        <Navbar />
      </header>

      {/* NavDetails */}
      <div className="fixed  left-0 w-full bg-gray-800 text-white py-4 z-10 ">
        <NavDetails />
      </div>

      {/* Main content with Sidebar */}
      <div className="flex flex-1 pt-32 overflow-hidden">
        {/* Sidebar (Uncomment if needed) */}
        {/* <aside className="bg-gray-900 text-white w-64 p-4 sticky top-16 h-screen">
          <Sidebar />
        </aside> */}

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center mt-auto">
        <Footer />
      </footer>
    </div>
  );
}
