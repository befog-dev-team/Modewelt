"use client";

import InfiniteScrollContainer from "@/components/InfiniteScrollContainer";
import kyInstance from "@/lib/ky";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useSession } from "@/app/(main)/SessionProvider";

export default function ForYouJobFeed() {
    const { user } = useSession();
    console.log("User:", user);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ["userJobs", user.id, cursor],
        queryFn: ({ pageParam }) =>
            kyInstance
                .get(
                    `/api/jobs/${user.id}/my-job-feed`,
                    pageParam ? { searchParams: { cursor: pageParam } } : {}
                )
                .json(),
        initialPageParam: null,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

    console.log("Fetched job pages:", data?.pages);

    // Flatten the jobs array
    const jobs = data?.pages.flatMap((page) => page.jobs) || [];

    if (status === "pending") {
        return <Loader2 className="mx-auto animate-spin text-[#A45286]" />;
    }

    if (status === "success" && !jobs.length && !hasNextPage) {
        return (
            <p className="text-center text-muted-foreground">
                No jobs found matching your search.
            </p>
        );
    }

    if (status === "error") {
        return (
            <p className="text-center text-destructive">
                An error occurred while loading jobs.
            </p>
        );
    }

    console.log("Jobs:", jobs);

    return (
        // <InfiniteScrollContainer
        //     className="space-y-8 w-full px-4 sm:px-6 lg:px-8 mt-6 mb-12"
        //     onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
        // >
        //     {filteredJobsList.map((job) => (
        //         <JobPost key={job.id} jobs={job} />
        //     ))}
        //     {isFetchingNextPage && <Loader2 className="mx-auto my-3 animate-spin" />}
        // </InfiniteScrollContainer>
    );
}
