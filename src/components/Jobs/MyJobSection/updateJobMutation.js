import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateJob } from "@/app/(main)/jobDescriptionSetting/actions";
import toast from "react-hot-toast";

export function useUpdateJobMutation() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: ({ jobId, formData }) => updateJob(jobId, formData),
        onSuccess: async (updatedJob) => {
            // Update the cache for job feeds
            await queryClient.cancelQueries(["job-feed"]);
            
            queryClient.setQueriesData(["job-feed"], (oldData) => {
                if (!oldData || !oldData.pages) return oldData;

                return {
                    ...oldData,
                    pages: oldData.pages.map((page) => ({
                        ...page,
                        jobs: page.jobs ? page.jobs.map((j) => j.id === updatedJob.id ? updatedJob : j) : [],
                    })),
                };
            });

            // Handle user-specific job queries if they exist
            queryClient.invalidateQueries(["user-jobs"]);

            toast.success("Job post updated successfully.");
        },
        onError(error) {
            console.error("Update Job Error:", error);
            toast.error("Failed to update job post. Please try again.");
        },
    });

    return mutation;
}
