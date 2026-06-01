import { google, lucia } from "@/auth";
import prisma from "@/lib/prisma";
import { OAuth2RequestError } from "arctic";
import { cookies } from "next/headers";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");

    const cookieStore = await cookies();
    const storedState = cookieStore.get("state")?.value ?? null;
    const storedCodeVerifier = cookieStore.get("code_verifier")?.value ?? null;

    if (!code || !state || !storedState || state !== storedState || !storedCodeVerifier) {
        return new Response("Invalid request", {
            status: 400,
        });
    }

    try {
        const tokens = await google.validateAuthorizationCode(code, storedCodeVerifier);
        const googleUserResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: {
                Authorization: `Bearer ${tokens.accessToken}`,
            },
        });
        const googleUser = await googleUserResponse.json();

        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { googleId: googleUser.sub },
                    { email: googleUser.email }
                ]
            },
        });

        if (existingUser) {
            // Update googleId if it's missing (link account)
            if (!existingUser.googleId) {
                await prisma.user.update({
                    where: { id: existingUser.id },
                    data: { googleId: googleUser.sub }
                });
            }
            const session = await lucia.createSession(existingUser.id, {});
            const sessionCookie = lucia.createSessionCookie(session.id);
            cookieStore.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
            return new Response(null, {
                status: 302,
                headers: {
                    Location: "/feed",
                },
            });
        }

        // Create new user
        const newUser = await prisma.user.create({
            data: {
                username: googleUser.name.replace(/\s+/g, "_").toLowerCase(),
                email: googleUser.email,
                googleId: googleUser.sub,
                displayName: googleUser.name,
                avatarUrl: googleUser.picture,
            },
        });

        const session = await lucia.createSession(newUser.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookieStore.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/feed",
            },
        });
    } catch (e) {
        if (e instanceof OAuth2RequestError) {
            return new Response("Invalid code", {
                status: 400,
            });
        }
        console.error(e);
        return new Response("Internal server error", {
            status: 500,
        });
    }
}
