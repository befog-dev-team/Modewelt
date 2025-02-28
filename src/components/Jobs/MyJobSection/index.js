"use client";

import kyInstance from "@/lib/ky";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useSession } from "@/app/(main)/SessionProvider";
import MyJobPost from "./MyJobPost";

export default function MyJobSection() {
    const { user } = useSession();

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
        // error,
    } = useInfiniteQuery({
        queryKey: ["userJobs", user?.id],
        queryFn: ({ pageParam = null }) =>
            kyInstance
                .get("/api/jobs/posted", {
                    searchParams: pageParam ? { cursor: pageParam } : {},
                })
                .json(),
        initialPageParam: null,
        getNextPageParam: (lastPage) => lastPage?.nextCursor || null,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    // Flatten paginated results
    const jobs = data?.pages.flatMap((page) => page.jobs) || [];

    console.log("Jobs Sec:", jobs);

    if (status === "pending") {
        return <Loader2 className="mx-auto animate-spin text-[#A45286]" />;
    }

    if (status === "error") {
        return (
            <p className="text-center text-destructive">
              Something went wrong. Please try again later.
            </p>
        );
    }

    if (status === "success" && jobs.length === 0) {
        return (
            <p className="text-center text-muted-foreground">
                No jobs found matching your search.
            </p>
        );
    }

    return (
        <div className="space-y-8 w-full px-4 sm:px-6 lg:px-8 mt-6 mb-12">
            {/* Render Job Posts */}
            {jobs.map((job) => (
                <MyJobPost key={job.id} job={job} />
            ))}

            {/* Show More Button */}
            {hasNextPage && (
                <div className="flex justify-center mt-6">
                    <button
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                        className="px-6 py-2 bg-[#ba669d] text-white rounded-full hover:bg-[#9d4f80] transition disabled:opacity-50"
                    >
                        {isFetchingNextPage ? (
                            <Loader2 className="animate-spin w-5 h-5 mx-auto" />
                        ) : (
                            "Show More"
                        )}
                    </button>
                </div>
            )}
        </div>
    );
}