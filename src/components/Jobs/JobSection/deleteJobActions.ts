"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

export async function deleteJob(id: string) {
    const { user } = await validateRequest();

    if (!user) throw new Error("Unauthorized");

    const job = await prisma.job.findUnique({
        where: { id },
        select: {
            userId: true,
            user: { select: { username: true } }, // Include username
            applications: { select: { id: true } } // Fetch applications
        }
    });

    if (!job) throw new Error("Job not found");

    if (job.userId !== user.id) throw new Error("Unauthorized");

    // Use a transaction to ensure both deletions happen correctly
    const deletedJob = await prisma.$transaction(async (tx) => {
        // Delete related job applications
        if (job.applications.length > 0) {
            await tx.jobApplication.deleteMany({ where: { jobId: id } });
        }

        // Delete the job itself
        return await tx.job.delete({
            where: { id },
            select: {
                id: true,
                jobTitle: true,
                company: true,
                user: { select: { username: true } } // Include username in response
            }
        });
    });

    return deletedJob;
}
