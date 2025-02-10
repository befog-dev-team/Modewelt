"use client";

import InfiniteScrollContainer from "@/components/InfiniteScrollContainer"; // Import the InfiniteScrollContainer component
import kyInstance from "@/lib/ky"; // Import the ky instance
import { useInfiniteQuery } from "@tanstack/react-query"; // Import the useInfiniteQuery hook
import { Loader2 } from "lucide-react"; // Import the Loader2 component
import JobPost from './JobPost'; // Import the JobPost component

export default function ForYouJobFeed() {
  const {
    data, // The data from the query
    fetchNextPage, // The function to fetch the next page of jobs
    hasNextPage, // Whether there is a next page of jobs
    isFetching, // Whether the query is fetching
    isFetchingNextPage, // Whether the next page is fetching
    status, // The status of the query
  } = useInfiniteQuery({ // Use the useInfiniteQuery hook to fetch the jobs
    queryKey: ["job-feed", "for-you"], // The query key and the query type
    queryFn: ({ pageParam }) => // The query function that fetches the jobs
      kyInstance // Use the ky instance to fetch the jobs from the for-you feed endpoint. It gives error automatically like 404, 401, 500 etc. We dont need to handle it manually like we did for the axios and fetch api.
        .get(
          "/api/jobs/for-you-job-feed", // Fetch the jobs from the for-you feed endpoint
          pageParam ? { searchParams: { cursor: pageParam } } : {}, // Use the cursor to fetch the next page of jobs
        )
        .json(), // Parse the JSON response
    initialPageParam: null, // The initial page parameter
    getNextPageParam: (lastPage) => lastPage.nextCursor, // Get the next page parameter
  });

  // The jobs from the data
  const jobs = data?.pages.flatMap((page) => page.jobs) || []; // Flatmap is used to flatten the array of jobs. It gives one dimensional data array instead of the two dimensional array. 

  if (status === "pending") { // If the status is pending, show the loading skeleton
    return <Loader2 className="mx-auto text-[#A45286]" />; // Show the JobsLoadingSkeleton component
  }

  if (status === "success" && !jobs.length && !hasNextPage) { // If the status is success and there are no jobs and no next page
    return ( // Show a message that no one has posted anything yet
      <p className="text-center text-muted-foreground">
        No one has posted anything yet.
      </p>
    );
  }

  if (status === "error") { // If the status is error, show an error message
    return ( // Show an error message that an error occurred while loading jobs
      <p className="text-center text-destructive">
        An error occurred while loading jobs.
      </p>
    );
  }

  return (
    <InfiniteScrollContainer
      className="space-y-8 w-full px-4 sm:px-6 lg:px-8 mt-6 mb-12" // Add space between the jobs
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()} // Trigger this if we have next page and we are not fetching the data or the next page then call the fetchNextPage function to fetch the next page
    >
      {jobs.map((job) => (
        <JobPost key={job.id} jobs={job} />
      ))}
      {/* Show a loading spinner when fetching the next page */}
      {isFetchingNextPage && <Loader2 className="mx-auto my-3 animate-spin" />}
    </InfiniteScrollContainer>
  );
}