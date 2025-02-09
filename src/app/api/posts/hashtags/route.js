// app/api/posts/hashtags/route.js

import prisma from "@/lib/prisma";
import { extractHashtags } from "@/lib/utils";

export async function GET() {
    try {
        // Fetch posts from the database
        const posts = await prisma.post.findMany({
            select: {
                content: true, // Fetch only the content field
            },
        });

        // Extract hashtags from the post content
        const hashtags = posts.reduce((acc, post) => {
            const postHashtags = extractHashtags(post.content);
            acc.push(...postHashtags); // accumulate hashtags
            return acc;
        }, []);

        // Remove duplicates using a Set
        const uniqueHashtags = [...new Set(hashtags)];

        // Send back the unique hashtags
        return new Response(JSON.stringify(uniqueHashtags), { status: 200 });
    } catch (error) {
        console.error("Error fetching hashtags:", error);
        return new Response(
            JSON.stringify({ error: "Error fetching hashtags" }),
            { status: 500 }
        );
    }
}
