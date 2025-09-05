"use client";
import { createContext, useContext } from "react";
import { useRouter } from "next/navigation";

type ContentType = "recent" | "topRated" | "newRelease";

interface TabHistoryContextType {
  handleTabChange: (tab: ContentType, currentTab: ContentType) => void;
  handleBack: () => void;
}

const TabHistoryContext = createContext<TabHistoryContextType | null>(null);

export function TabHistoryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleTabChange = (tab: ContentType, currentTab: ContentType) => {
    if (tab === currentTab) return;
    // ✅ Use replace, so tabs don’t bloat browser history
    router.replace(`/series?tab=${tab}`, { scroll: false });
  };

  const handleBack = () => {
    // ✅ Just go back in browser history
    router.back();
  };

  return (
    <TabHistoryContext.Provider value={{ handleTabChange, handleBack }}>
      {children}
    </TabHistoryContext.Provider>
  );
}

export const useTabHistory = () => {
  const ctx = useContext(TabHistoryContext);
  if (!ctx)
    throw new Error("useTabHistory must be used within TabHistoryProvider");
  return ctx;
};
