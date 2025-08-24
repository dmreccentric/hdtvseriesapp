import Link from "next/link";
import { ReactNode } from "react";
import { FaHome, FaTv, FaChevronLeft } from "react-icons/fa";
import Footer from "../../components/Footer";
import Image from "next/image";
import BackButton from "../common/BackButton";

interface MovieLayoutProps {
  children: ReactNode;
}

export default function MovieLayout({ children }: MovieLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#2d0202]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-[#2d0202]/60 backdrop-blur-md border-b border-white/10 text-white p-4 shadow-lg">
        {/* Back button */}
        <BackButton />

        {/* Logo + Title */}
        <div className="flex items-center space-x-3">
          <Link href="/">
            <Image src="/hdtvseries.ico" alt="Logo" width={40} height={40} />
          </Link>

          <h1 className="text-2xl font-bold">HdTvSeries</h1>
        </div>

        {/* Right Icons */}
        <div className="flex space-x-7">
          <Link href="/search" className="text-2xl hover:text-gray-300 p-1">
            <FaTv />
          </Link>
          <Link href="/" className="text-2xl hover:text-gray-300 p-1">
            <FaHome />
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 pt-20">{children}</main>
      {/* added pt-20 so content isn't hidden under the fixed header */}

      {/* Footer */}
      <Footer />
    </div>
  );
}
