"use client";

// pages/dashboard.tsx
import { useState } from "react";
import SearchLayout from "../components/layout/SearchLayout";
import RecentlyAdded from "../components/card/seriesCard/Recent";
import TopRated from "../components/card/seriesCard/TopRated";

type ContentType = "recent" | "topRated" | "newRelease";

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState<ContentType>("recent");

  const renderContent = () => {
    switch (activeTab) {
      case "recent":
        return (
          <div className="grid gap-4 grid-cols-2 bg-[#1a0000] ">
            <RecentlyAdded />
          </div>
        );
      case "topRated":
        return (
          <div className=" bg-[#1a0000] ">
            <TopRated />
          </div>
        );
      case "newRelease":
        return <p>Showing newly released items...</p>;
      default:
        return null;
    }
  };

  return (
    <SearchLayout>
      <div className="min-h-screen p-6">
        <h1 className="text-2xl font-bold mb-4">Browse Series</h1>

        {/* Buttons */}
        <div className="flex gap-4 mb-6 overflow-x-auto scrollbar-hide scroll-smooth no-scrollbar">
          <button
            className={`px-4 py-2 rounded-4xl whitespace-nowrap ${
              activeTab === "recent"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => setActiveTab("recent")}
          >
            Recently Added
          </button>
          <button
            className={`px-4 py-2 rounded-4xl whitespace-nowrap ${
              activeTab === "topRated"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => setActiveTab("topRated")}
          >
            Top Rated
          </button>
          <button
            className={`px-4 py-2 rounded-4xl whitespace-nowrap ${
              activeTab === "newRelease"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => setActiveTab("newRelease")}
          >
            Newly Released
          </button>
        </div>

        {/* Content */}
        <div className="border rounded text-black  bg-[#1a0000]">
          {renderContent()}
        </div>
      </div>
    </SearchLayout>
  );
};

export default DashboardPage;
