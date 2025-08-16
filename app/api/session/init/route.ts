import { NextResponse } from "next/server";
import { encode } from "next-auth/jwt";
import { successResponse, errorResponse } from "@/utils/apiResponses";
import guestProviderConfig from "@/auth.config"; // فرض: provider "guest" جداگانه export شده
import type { Role } from "@prisma/client";

interface GuestUser {
  id: string;
  email: string;
  role: Role;
  userName?: string | null;
  fullName?: string | null;
  profilePic?: string | null;
  bio?: string | null;
  createdAt: string;
  updatedAt: string;
}

export const POST = async () => {
  try {
    // 1️⃣ اجرای authorize مستقیم از provider "guest"
    const guestProvider = guestProviderConfig.providers.find(
      (p) => p.id === "guest"
    );

    if (!guestProvider || !guestProvider.authorize) {
      return NextResponse.json(
        errorResponse([], "Guest provider not configured correctly", 2),
        { status: 500 }
      );
    }

    const result = (await guestProvider.authorize(
      {},
      new Request("")
    )) as GuestUser | null;

    if (!result) {
      return NextResponse.json(errorResponse([], "Guest login failed", 1), {
        status: 400,
      });
    }

    // 2️⃣ ساخت JWT
    const jwt = await encode({
      token: {
        id: result.id,
        email: result.email,
        role: result.role,
      },
      secret: process.env.AUTH_SECRET!,
      salt: "authjs.session-token",
    });

    // 3️⃣ برگردوندن JWT و اطلاعات کاربر
    return NextResponse.json(
      successResponse(
        {
          jwt,
          user: result,
        },
        "Guest session initialized"
      ),
      { status: 200 }
    );
  } catch (error) {
    console.error("[api/session/init] Error:", error);
    return NextResponse.json(errorResponse([], "Internal server error", 10), {
      status: 500,
    });
  }
};
