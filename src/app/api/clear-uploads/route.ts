import prisma from "@/lib/prisma"; // Import the Prisma client
import { UTApi } from "uploadthing/server"; // Import the UploadThing API

export async function GET(req: Request) {
    try {
        // Get the Authorization header
        const authHeader = req.headers.get("Authorization");
        console.log(authHeader);

        // Check if the Authorization header is the same as the CRON_SECRET environment variable
        if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
            return Response.json( // Return an error if the Authorization header is invalid
                { message: "Invalid authorization header" }, // Return an error message
                { status: 401 }, // Return a 401 status code
            );
        }

        // Find all media that are not associated with a post and were created more than 24 hours ago
        const unusedMedia = await prisma.media.findMany({
            where: { // Find media that are not associated with a post and were created more than 24 hours ago
                postId: null, // If postId is null, the media is not associated with a post
                ...(process.env.NODE_ENV === "production" // If in production, only delete media that are more than 24 hours old
                    ? { 
                        createdAt: { // Find media that were created more than 24 hours ago
                            lte: new Date(Date.now() - 1000 * 60 * 60 * 24), // lte means less than or equal to the date provided (24 hours ago)
                        },
                    }
                    : {}), // If not in production, do not filter by date
            },
            select: { // Select the id and url of the media
                id: true, // Select the id of the media
                url: true, // Select the url of the media
            },
        });

        // Delete the files from UploadThing
        new UTApi().deleteFiles( 
            unusedMedia.map( // Map the media to the file path in UploadThing
                (m) =>
                    m.url.split(`/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/`)[1], // Get the file path in UploadThing by splitting the URL at the app ID and taking the second part of the split array (the file path)
            ),
        );

        // Delete the media from the database
        await prisma.media.deleteMany({ // Delete the media that were found in the previous query from the database 
            where: { // Delete the media that were found in the previous query from the database 
                id: { // id is the ID of the media
                    in: unusedMedia.map((m) => m.id), // Delete the media that were found in the previous query from the database
                },
            },
        });

        // Return an empty response
        return new Response(); 
    } catch (error) {
        console.error(error); // Log the error to the console
        return Response.json({ error: "Internal server error" }, { status: 500 }); // Return an error if there is an internal server error
    }
}