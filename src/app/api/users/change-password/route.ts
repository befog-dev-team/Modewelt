import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { hash, verify } from "@node-rs/argon2";

export async function PATCH(req: Request) {
    try {
        const { user: loggedInUser } = await validateRequest();

        if (!loggedInUser) {
            return Response.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { currentPassword, newPassword } = await req.json();

        if (!currentPassword || !newPassword) {
            return Response.json({ message: "Missing current or new password" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { id: loggedInUser.id },
            select: { passwordHash: true }
        });

        if (!user || !user.passwordHash) {
            return Response.json({ message: "User not found or password not set" }, { status: 404 });
        }

        // Verify current password
        const validPassword = await verify(user.passwordHash, currentPassword, {
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1
        });

        if (!validPassword) {
            return Response.json({ message: "Incorrect current password" }, { status: 400 });
        }

        // Hash new password
        const newPasswordHash = await hash(newPassword, {
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1
        });

        // Update password in DB
        await prisma.user.update({
            where: { id: loggedInUser.id },
            data: { passwordHash: newPasswordHash }
        });

        return Response.json({ message: "Password updated successfully" });

    } catch (error) {
        console.error("Change password error:", error);
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
