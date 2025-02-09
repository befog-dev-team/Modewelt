import prisma from "@/lib/prisma";

export async function POST(req) {
    try {
        const body = await req.json();
        const {
            jobTitle,
            company,
            workplaceType,
            location,
            jobType,
            description,
            skills,
            source,
            email,
            degree,
            illustratorExp,
            photoshopExp,
            mustHaveDegree,
            mustHaveIllustrator,
            mustHavePhotoshop,
        } = body;

        // Validate input
        if (!jobTitle || !company || !location || !email) {
            return new Response(JSON.stringify({ message: "Missing required fields" }), { status: 400 });
        }

        // Create job in the database
        const job = await prisma.job.create({
            data: {
                jobTitle,
                company,
                workplaceType,
                location,
                jobType,
                description,
                skills,
                source,
                email,
                degree,
                illustratorExp,
                photoshopExp,
                mustHaveDegree,
                mustHaveIllustrator,
                mustHavePhotoshop,
            },
        });

        return new Response(JSON.stringify(job), { status: 201 });
    } catch (error) {
        console.error("Error creating job:", error);
        return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
}

export async function GET() {
    try {
        const jobs = await prisma.job.findMany();
        return new Response(JSON.stringify(jobs), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        console.error("Error fetching jobs:", error);
        return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
}
