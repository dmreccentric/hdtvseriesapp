"use client";

import Link from "next/link";
import { X } from "lucide-react";

interface AdminSidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function AdminSidebar({ open, setOpen }: AdminSidebarProps) {
  return (
    <div
      className={`fixed md:static inset-y-0 left-0 bg-white shadow-lg w-64 transform transition-transform ${
        open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-bold text-black">Admin</h2>
        <button
          className="md:hidden text-black"
          onClick={() => setOpen(false)}
          aria-label="Close sidebar"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="p-4 space-y-2">
        <Link
          href="/admin"
          className="block px-3 py-2 rounded hover:bg-gray-200 text-black"
        >
          Dashboard
        </Link>
        <Link
          href="/admin/movies"
          className="block px-3 py-2 rounded hover:bg-gray-200 text-black"
        >
          Manage Movies
        </Link>
        <Link
          href="/admin/users"
          className="block px-3 py-2 rounded hover:bg-gray-200 text-black"
        >
          Manage Users
        </Link>
        <Link
          href="/admin/settings"
          className="block px-3 py-2 rounded hover:bg-gray-200 text-black"
        >
          Settings
        </Link>
      </nav>
    </div>
  );
}
