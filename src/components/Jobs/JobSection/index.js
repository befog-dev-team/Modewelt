"use client";

import InfiniteScrollContainer from "@/components/InfiniteScrollContainer";
import kyInstance from "@/lib/ky";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import JobPost from "./JobPost";

export default function JobSection({ searchQuery }) {

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["job-feed", "for-you"],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          "/api/jobs/for-you-job-feed",
          pageParam ? { searchParams: { cursor: pageParam } } : {}
        )
        .json(),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Flatten the jobs array
  const jobs = data?.pages.flatMap((page) => page.jobs) || [];

  // Filter jobs based on search input
  const filteredJobsList = searchQuery
    ? jobs.filter((job) =>
        job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : jobs;

  if (status === "pending") {
    return <Loader2 className="mx-auto animate-spin text-[#fc3fb4]" />;
  }

  if (status === "success" && !filteredJobsList.length && !hasNextPage) {
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

  return (
    <InfiniteScrollContainer
      className="space-y-8 w-full px-4 sm:px-6 lg:px-8 mt-6 mb-12"
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      {filteredJobsList.map((job) => (
        <JobPost key={job.id} job={job} />
      ))}
      {isFetchingNextPage && <Loader2 className="mx-auto my-3 animate-spin" />}
    </InfiniteScrollContainer>
  );
}