// app/api/fcm/send/route.ts
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { admin } from "@/lib/firebaseAdmin";
import { successResponse, errorResponse } from "@/utils/apiResponses";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    console.log("[api/fcm/send] Body:", body);

    const { title, body: message, userId, data } = body;

    if (!title || !message) {
      return NextResponse.json(
        errorResponse([], "title and body are required.", 3),
        { status: 400 }
      );
    }

    // دریافت توکن‌ها
    let tokens: string[] = [];
    if (userId) {
      const userTokens = await prisma.fCMToken.findMany({
        where: { userId },
        select: { token: true },
      });
      tokens = userTokens.map((t) => t.token);
    } else {
      // ارسال به همه کاربران
      const allTokens = await prisma.fCMToken.findMany({
        select: { token: true },
      });
      tokens = allTokens.map((t) => t.token);
    }

    if (tokens.length === 0) {
      return NextResponse.json(
        errorResponse([], "No FCM tokens found for sending notification.", 5),
        { status: 404 }
      );
    }

    // ارسال نوتیفیکیشن
    const messagePayload: admin.messaging.MulticastMessage = {
      tokens,
      notification: { title, body: message },
      data: data || {},
    };

    const response = await admin
      .messaging()
      .sendEachForMulticast(messagePayload);

    // پاکسازی توکن‌های منقضی شده
    const invalidTokens: string[] = [];
    response.responses.forEach((res, idx) => {
      if (!res.success) {
        const err = res.error?.message || "";
        if (err.includes("registration-token-not-registered")) {
          invalidTokens.push(tokens[idx]);
        }
      }
    });

    if (invalidTokens.length > 0) {
      await prisma.fCMToken.deleteMany({
        where: { token: { in: invalidTokens } },
      });
      console.log(
        "[api/fcm/send] Removed invalid tokens:",
        invalidTokens.length
      );
    }

    return NextResponse.json(
      successResponse(
        {
          successCount: response.successCount,
          failureCount: response.failureCount,
        },
        "Notifications sent successfully."
      ),
      { status: 200 }
    );
  } catch (error) {
    console.error("[api/fcm/send] Error:", error);
    return NextResponse.json(
      errorResponse(
        [],
        "Internal server error while sending notifications.",
        10
      ),
      { status: 500 }
    );
  }
};
