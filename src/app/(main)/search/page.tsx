"use client";

import { useSearchParams } from "next/navigation";
import SearchResults from "./SearchResults";
import Navbar from "@/components/Navbar";

export default function Page() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  return (
    <div>
      <Navbar unreadNotificationCount={undefined} />
      <main className="flex w-full min-w-0 gap-5 mt-6">
        <div className="w-full min-w-0 space-y-5">
          <div className="rounded-2xl bg-card p-5 shadow-sm">
            <h1 className="line-clamp-2 break-all text-center text-2xl font-bold">
              Search results for &quot;{query}&quot;
            </h1>
          </div>
          <SearchResults query={query} />
        </div>
      </main>
    </div>
  );
}
