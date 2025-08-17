// app/api/admin/users/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // <- make sure this points to your Prisma setup
import { auth } from "@/auth"; // <- make sure to check admin access here

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";

  // OPTIONAL: check if user is admin
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    console.log("Unauthorized: ", session);
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const users = await prisma.user.findMany({
    where: {
      OR: [
        { fullName: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ],
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      profilePic: true,
    },
    take: 20, // limit for performance
  });

  return NextResponse.json(users);
}
