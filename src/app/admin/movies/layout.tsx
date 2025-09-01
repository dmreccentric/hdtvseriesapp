// File: src/app/admin/Movies/layout.tsx
import React from "react";

export default function MoviesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-3 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-black">
        Movie Administration
      </h1>
      <div className="bg-white p-2 rounded shadow">{children}</div>
    </div>
  );
}
