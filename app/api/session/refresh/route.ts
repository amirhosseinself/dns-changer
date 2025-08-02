import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { successResponse, errorResponse } from "@/utils/apiResponses";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    console.log("[api/session/refresh-session] Request Body:", body);

    const { userId, sessionToken } = body;

    if (!userId) {
      return NextResponse.json(errorResponse([], "userId is required.", 3), {
        status: 400,
      });
    }

    // 🟡 بررسی وجود کاربر
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json(errorResponse([], "User not found.", 4), {
        status: 404,
      });
    }

    // 🟡 اگر sessionToken داده شده بررسی شود
    if (sessionToken) {
      const existingSession = await prisma.session.findUnique({
        where: { sessionToken },
      });

      if (existingSession) {
        // اگر session هنوز معتبر باشد، فقط expire را تمدید می‌کنیم
        const expires = new Date();
        expires.setDate(expires.getDate() + 30);

        const updatedSession = await prisma.session.update({
          where: { sessionToken },
          data: { expires },
        });

        return NextResponse.json(
          successResponse(
            {
              userId: user.id,
              sessionToken: updatedSession.sessionToken,
              expires: updatedSession.expires,
            },
            "Session refreshed successfully."
          ),
          { status: 200 }
        );
      }
    }

    // 🟡 اگر session وجود نداشت، session جدید بسازیم
    const expires = new Date();
    expires.setDate(expires.getDate() + 30);

    const newSession = await prisma.session.create({
      data: {
        sessionToken: crypto.randomUUID(),
        userId: user.id,
        expires,
      },
    });

    return NextResponse.json(
      successResponse(
        {
          userId: user.id,
          sessionToken: newSession.sessionToken,
          expires: newSession.expires,
        },
        "New session created successfully."
      ),
      { status: 201 }
    );
  } catch (error) {
    console.error("[api/session/refresh-session] Error:", error);
    return NextResponse.json(
      errorResponse(
        [],
        "Internal server error occurred while refreshing session.",
        10
      ),
      { status: 500 }
    );
  }
};
