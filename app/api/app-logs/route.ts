import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { successResponse, errorResponse } from "@/utils/apiResponses";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    console.log("[api/app-logs] Request Body:", body);

    const { userId, deviceId, logType, message, metadata } = body;

    // Basic validation
    if (!logType || !message) {
      return NextResponse.json(
        errorResponse([], "logType and message are required.", 400),
        { status: 400 }
      );
    }

    // Allowed log types
    const allowedLogTypes = ["crash", "freeze", "custom"];
    if (!allowedLogTypes.includes(logType)) {
      return NextResponse.json(errorResponse([], "Invalid logType.", 422), {
        status: 422,
      });
    }

    // Save log in DB
    const log = await prisma.appLog.create({
      data: {
        userId: userId || null,
        deviceId: deviceId || null,
        logType,
        message,
        metadata: metadata || null,
      },
    });

    return NextResponse.json(
      successResponse(log, "App log saved successfully."),
      { status: 201 }
    );
  } catch (error) {
    console.error("[api/app-logs] Error:", error);
    return NextResponse.json(
      errorResponse([], "Internal server error while saving app log.", 500),
      { status: 500 }
    );
  }
};
