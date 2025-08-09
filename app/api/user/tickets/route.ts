import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { successResponse, errorResponse } from "@/utils/apiResponses";
import { auth } from "@/auth"; // Auth check

export const GET = async () => {
  try {
    const session = await auth();

    // Check authentication
    if (!session?.user?.id) {
      return NextResponse.json(errorResponse([], "Unauthorized", 401), {
        status: 401,
      });
    }

    // Fetch user tickets
    const tickets = await prisma.userReport.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      successResponse(tickets, "User tickets fetched successfully."),
      { status: 200 }
    );
  } catch (error) {
    console.error("[api/user/tickets] Error:", error);
    return NextResponse.json(
      errorResponse([], "Internal server error while fetching tickets.", 500),
      { status: 500 }
    );
  }
};
