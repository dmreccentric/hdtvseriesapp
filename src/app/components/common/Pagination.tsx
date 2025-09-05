"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  // 🔄 Keep query param in sync with currentPage
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", currentPage.toString());
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [currentPage, router, searchParams]);

  const renderPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 4) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 3) pages.push("...");
      pages.push(totalPages);
    }

    return pages.map((p, idx) =>
      typeof p === "number" ? (
        <button
          type="button"
          key={idx}
          onClick={() => onPageChange(p)}
          aria-current={currentPage === p ? "page" : undefined}
          className={`px-3 py-1 rounded ${
            currentPage === p
              ? "bg-red-600 text-white font-bold"
              : "bg-gray-300 text-black hover:bg-gray-400"
          }`}
        >
          {p}
        </button>
      ) : (
        <span key={idx} className="px-3 py-1">
          {p}
        </span>
      )
    );
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      <button
        type="button"
        className="bg-gray-600 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>

      {renderPageNumbers()}

      <button
        type="button"
        className="bg-gray-600 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}
