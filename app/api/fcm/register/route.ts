// app/api/fcm/register/route.ts
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { successResponse, errorResponse } from "@/utils/apiResponses";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    console.log("[api/fcm/register] Body:", body);

    const { userId, deviceId, token, platform } = body;

    // اعتبارسنجی
    if (!userId || !token || !platform) {
      return NextResponse.json(
        errorResponse([], "userId, token and platform are required.", 3),
        { status: 400 }
      );
    }

    // بررسی کاربر
    const userExists = await prisma.user.findUnique({ where: { id: userId } });
    if (!userExists) {
      return NextResponse.json(errorResponse([], "User not found.", 4), {
        status: 404,
      });
    }

    // اگر توکن موجود بود، آپدیت کن
    const existingToken = await prisma.fCMToken.findUnique({
      where: { token },
    });

    let savedToken;
    if (existingToken) {
      savedToken = await prisma.fCMToken.update({
        where: { token },
        data: { deviceId, platform, userId },
      });
    } else {
      savedToken = await prisma.fCMToken.create({
        data: { userId, deviceId, token, platform },
      });
    }

    return NextResponse.json(
      successResponse(savedToken, "FCM token registered successfully."),
      { status: 201 }
    );
  } catch (error) {
    console.error("[api/fcm/register] Error:", error);
    return NextResponse.json(
      errorResponse([], "Internal server error while registering token.", 10),
      { status: 500 }
    );
  }
};
