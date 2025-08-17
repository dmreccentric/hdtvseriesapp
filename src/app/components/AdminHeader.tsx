"use client";

import { Menu } from "lucide-react";

interface AdminHeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

export default function AdminHeader({ setSidebarOpen }: AdminHeaderProps) {
  return (
    <header className="flex items-center justify-between bg-white px-6 py-4 shadow">
      <button
        className="md:hidden text-black"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open sidebar"
      >
        <Menu size={24} />
      </button>
      <h1 className="text-lg text-black font-semibold">Admin Dashboard</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-black">Welcome, Admin</span>
      </div>
    </header>
  );
}
