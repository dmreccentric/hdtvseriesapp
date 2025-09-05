"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import SearchLayout from "../components/layout/SearchLayout";
import RecentlyAdded from "../components/card/seriesCard/Recent";
import TopRated from "../components/card/seriesCard/TopRated";
import NewlyReleased from "../components/card/seriesCard/NewlyReleased";
import { useTabHistory } from "../context/TabHistoryContext";

// type ContentType = "recent" | "toprated" | "newrelease"; // 👈 all lowercase

// const validTabs: ContentType[] = ["recent", "toprated", "newrelease"];

// const DashboardPage = () => {
//   const searchParams = useSearchParams();
//   const { handleTabChange } = useTabHistory();

//   const tabFromUrl = (
//     searchParams.get("tab") || ""
//   ).toLowerCase() as ContentType;

//   const tabParam: ContentType = validTabs.includes(tabFromUrl)
//     ? tabFromUrl
//     : "recent";

//   const [activeTab, setActiveTab] = useState<ContentType>(tabParam);

//   useEffect(() => {
//     setActiveTab(tabParam);
//   }, [tabParam]);

//   const changeTab = (newTab: ContentType) => {
//     if (newTab === activeTab) return;
//     handleTabChange(newTab, activeTab);
//     setActiveTab(newTab);
//   };

//   const renderContent = () => {
//     switch (activeTab) {
//       case "recent":
//         return <RecentlyAdded />;
//       case "toprated":
//         return <TopRated />;
//       case "newrelease":
//         return <NewlyReleased />;
//       default:
//         return null;
//     }
//   };

type ContentType = "recent" | "topRated" | "newRelease";

const DashboardPage = () => {
  const searchParams = useSearchParams();
  const { handleTabChange } = useTabHistory();

  const tabFromUrl = searchParams.get("tab") as ContentType | null;
  const tabParam: ContentType =
    tabFromUrl && ["recent", "topRated", "newRelease"].includes(tabFromUrl)
      ? (tabFromUrl as ContentType)
      : "newRelease";

  const [activeTab, setActiveTab] = useState<ContentType>(tabParam);

  // ✅ Keep state in sync with URL
  useEffect(() => {
    setActiveTab(tabParam);
  }, [tabParam]);

  const changeTab = (newTab: ContentType) => {
    if (newTab === activeTab) return;
    handleTabChange(newTab, activeTab);
    setActiveTab(newTab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "recent":
        return <RecentlyAdded />;
      case "topRated":
        return <TopRated />;
      case "newRelease":
        return <NewlyReleased />;
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
            onClick={() => changeTab("recent")}
          >
            Recently Added
          </button>
          <button
            className={`px-4 py-2 rounded-4xl whitespace-nowrap ${
              activeTab === "topRated"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => changeTab("topRated")}
          >
            Top Rated
          </button>
          <button
            className={`px-4 py-2 rounded-4xl whitespace-nowrap ${
              activeTab === "newRelease"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => changeTab("newRelease")}
          >
            Newly Released
          </button>
        </div>

        {/* Content */}
        <div className="border rounded text-black bg-[#1a0000]">
          {renderContent()}
        </div>
      </div>
    </SearchLayout>
  );
};

export default DashboardPage;
