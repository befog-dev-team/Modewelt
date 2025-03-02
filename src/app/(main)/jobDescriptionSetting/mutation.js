import { useSession } from "@/app/(main)/SessionProvider";
import toast  from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitJob } from "./actions";

export function useSubmitJobMutation() {
    const queryClient = useQueryClient();
    const { user } = useSession();

    const mutation = useMutation({
        mutationFn: submitJob,
        onSuccess: async (newJob) => {
            const queryFilter = {
                queryKey: ["job-feed"],
                predicate(query) {
                    return (
                        query.queryKey.includes("for-you") ||
                        (query.queryKey.includes("user-jobs") &&
                            query.queryKey.includes(user.id))
                    );
                },
            };

            await queryClient.cancelQueries(queryFilter);

            queryClient.setQueriesData(
                queryFilter,
                (oldData) => {
                    const firstPage = oldData?.pages[0];

                    if (firstPage) {
                        return {
                            pageParams: oldData.pageParams,
                            pages: [
                                {
                                    jobs: [{ ...newJob }, ...firstPage.jobs],
                                    nextCursor: firstPage.nextCursor,
                                },
                                ...oldData.pages.slice(1),
                            ],
                        };
                    }
                }
            );

            queryClient.invalidateQueries({
                queryKey: queryFilter.queryKey,
                predicate(query) {
                    return (
                        queryFilter.predicate(query) && !query.state.data
                    );
                },
            });

            toast.success("Job posted successfully!");
        },
       
    });

    return mutation;
}
