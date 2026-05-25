import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteJob } from "./deleteJobActions";
import toast from "react-hot-toast";

export function useDeleteJobMutation() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: deleteJob,
        onSuccess: async (deletedJob) => {
            await queryClient.cancelQueries(["job-feed"]);
            await queryClient.cancelQueries(["userJobs"]);

            queryClient.setQueriesData(["job-feed"], (oldData) => {
                if (!oldData || !oldData.pages) return oldData;

                return {
                    ...oldData,
                    pages: oldData.pages.map((page) => ({
                        ...page,
                        jobs: page.jobs ? page.jobs.filter((j) => j.id !== deletedJob.id) : [],
                    })),
                };
            });

            queryClient.invalidateQueries(["userJobs"]);

            toast.success("Job post deleted successfully.");
        },
        onError(error) {
            console.error("Delete Job Error:", error);
            toast.error("Failed to delete job post. Please try again.");
        },
    });

    return mutation;
}