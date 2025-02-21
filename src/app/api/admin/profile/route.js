import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const user = await prisma.user.findUnique({
      where: { email: "abc@gmail.com" }, // Replace with authentication logic
    });

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    return Response.json(user, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { name, email, phone } = await req.json();

    const updatedUser = await prisma.user.upsert({
      where: { email },
      update: { name, phone },
      create: { name, email, phone },
    });

    return Response.json({ message: "Profile Updated", user: updatedUser }, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
