import prisma from "@/lib/prisma";
export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get("jobId");

    if (!jobId) {
        return Response.json({ error: "Invalid Job ID" }, { status: 400 });
    }

    try {
        const applications = await prisma.jobApplication.findMany({
            where: { jobId: jobId },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                        avatarUrl: true,
                        bio: true,
                        location: true,
                    },
                },
            },
        });

        return Response.json(applications, { status: 200 });
    } catch (error) {
        // Ensure error is a valid object
        const errorDetails = error instanceof Error ? {
            message: error.message,
            stack: error.stack,
        } : {
            message: "Unknown error occurred",
            details: error,
        };

        console.error("❌ Error submitting application:", errorDetails);

        // Return a valid error response
        return Response.json(
            { error: "Internal Server Error", details: errorDetails },
            { status: 500 }
        );
    }
}
