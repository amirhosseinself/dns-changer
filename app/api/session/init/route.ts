import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { successResponse, errorResponse } from "@/utils/apiResponses";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json().catch(() => ({}));
    console.log("[api/session/init] Request Body:", body);

    // 🟡 ایجاد یک کاربر مهمان
    const newUser = await prisma.user.create({
      data: {
        isGuest: true,
      },
    });

    // 🟡 ایجاد session اولیه برای کاربر
    const expires = new Date();
    expires.setDate(expires.getDate() + 30); // اعتبار ۳۰ روزه

    const newSession = await prisma.session.create({
      data: {
        sessionToken: crypto.randomUUID(),
        userId: newUser.id,
        expires,
      },
    });

    return NextResponse.json(
      successResponse(
        {
          userId: newUser.id,
          sessionToken: newSession.sessionToken,
          expires: newSession.expires,
        },
        "Guest user created and session initialized successfully."
      ),
      { status: 200 }
    );
  } catch (error) {
    console.error("[api/session/init] Error:", error);
    return NextResponse.json(
      errorResponse(
        [],
        "Internal server error occurred while initializing guest session.",
        10
      ),
      { status: 500 }
    );
  }
};
