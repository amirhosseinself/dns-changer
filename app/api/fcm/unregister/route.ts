// app/api/fcm/unregister/route.ts
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { successResponse, errorResponse } from "@/utils/apiResponses";

export const DELETE = async (req: NextRequest) => {
  try {
    const body = await req.json();
    console.log("[api/fcm/unregister] Body:", body);

    const { token } = body;
    if (!token) {
      return NextResponse.json(errorResponse([], "token is required.", 3), {
        status: 400,
      });
    }

    await prisma.fCMToken.deleteMany({ where: { token } });

    return NextResponse.json(
      successResponse([], "FCM token unregistered successfully."),
      { status: 200 }
    );
  } catch (error) {
    console.error("[api/fcm/unregister] Error:", error);
    return NextResponse.json(
      errorResponse([], "Internal server error while unregistering token.", 10),
      { status: 500 }
    );
  }
};
