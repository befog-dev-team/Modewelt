import { validateRequest } from "@/auth"; // Import the validateRequest function from the auth module
import streamServerClient from "@/lib/stream"; // Import the Stream Chat client

export async function GET() {
    try {
        // Validate the request to ensure the user is authenticated
        const { user } = await validateRequest();

        // If the user is not authenticated, return an error
        if (!user) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Generate a token for the user with an expiration time of 1 hour
        const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60;

        // The token is valid for 60 seconds before it expires
        const issuedAt = Math.floor(Date.now() / 1000) - 60;

        console.log(`[Token API] Generating token for user: ${user.id}`);
        // Create a token for the user
        const token = streamServerClient.createToken( 
            user.id, // The user ID
            expirationTime, // The expiration time
            issuedAt, // The time the token was issued
        );

        console.log(`[Token API] Token generated successfully for user: ${user.id}`);
        // Return the token to the client
        return Response.json({ token });
    } catch (error) {
        console.error(error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}