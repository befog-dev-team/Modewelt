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
      <main className="flex w-full justify-center gap-5 mt-6">
        <div className="flex flex-col justify-center min-w-[70vw] space-y-5">
          <div className="rounded-2xl min-w-[50vw] bg-card p-5 shadow-sm border">
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
