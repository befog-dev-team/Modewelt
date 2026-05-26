import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import streamServerClient from "@/lib/stream";

export async function DELETE() {
  try {
    const { user: loggedInUser } = await validateRequest();

    if (!loggedInUser) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Permanently delete user from Prisma
    // Note: If you want soft delete, you should update isDeleted to true instead
    // But based on the settings page description "Permanently delete your account and all associated data"
    // we will do a hard delete.
    
    await prisma.$transaction(async (tx) => {
      // 1. Delete from Stream
      await streamServerClient.deleteUser(loggedInUser.id, {
        delete_conversation_channels: true,
      });

      // 2. Delete from Prisma (Cascade delete should handle related models if configured)
      await tx.user.delete({
        where: { id: loggedInUser.id },
      });
    });

    return Response.json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Delete account error:", error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
