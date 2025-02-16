import prisma from '@/lib/prisma';
import { validateRequest } from "@/auth"; // Import the validateRequest function

export async function GET() {
    const user = await validateRequest(); // Fetch the logged-in user
    if (!user) return new Response('Unauthorized', { status: 401 });

    const appliedJobs = await prisma.jobApplication.findMany({
        where: { userId: user.id },
        include: {
            job: true,
        },
    });

    return Response.json(appliedJobs);
}
