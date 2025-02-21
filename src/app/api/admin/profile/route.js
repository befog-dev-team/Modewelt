import { NextResponse } from "next/server";
import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(existingUser);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, phone } = await req.json();

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { displayName: name, phone },
    });

    return NextResponse.json({ message: "Profile updated successfully", user: updatedUser }, {status: 200});
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