import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { successResponse, errorResponse } from "@/utils/apiResponses";
import { getMobileUserId } from "@/lib/authMobile";

// GET: Fetch user's tickets
export const GET = async (req: NextRequest) => {
  try {
    const userId = await getMobileUserId(req);

    if (!userId) {
      return NextResponse.json(errorResponse([], "Unauthorized", 401), {
        status: 401,
      });
    }

    // Fetch user tickets
    const tickets = await prisma.userReport.findMany({
      where: { userId },
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

// POST: Create a new ticket
export const POST = async (req: NextRequest) => {
  try {
    const userId = await getMobileUserId(req);

    // Check authentication
    if (!userId) {
      return NextResponse.json(errorResponse([], "Unauthorized", 401), {
        status: 401,
      });
    }

    const body = await req.json();
    const { subject, type, message } = body;

    // Validate required fields
    if (!subject || !message || !type) {
      return NextResponse.json(
        errorResponse([], "subject and message and type are required.", 400),
        { status: 400 }
      );
    }

    // Create ticket
    const newTicket = await prisma.userReport.create({
      data: {
        subject,
        message,
        type,
        userId,
      },
    });

    return NextResponse.json(
      successResponse(newTicket, "Ticket created successfully."),
      { status: 201 }
    );
  } catch (error) {
    console.error("[api/user/tickets/POST] Error:", error);
    return NextResponse.json(
      errorResponse([], "Internal server error while creating ticket.", 500),
      { status: 500 }
    );
  }
};
