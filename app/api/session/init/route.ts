import { NextResponse } from "next/server";
import { signIn } from "@/auth";
import { successResponse, errorResponse } from "@/utils/apiResponses";
import { encode } from "next-auth/jwt";

interface GuestUser {
  id: string;
  email: string;
  role: string;
}

export const POST = async () => {
  try {
    // 1️⃣ اجرای provider "guest"
    const result = (await signIn("guest", {
      redirect: false,
    })) as GuestUser | null;

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

    // 3️⃣ برگردوندن داده‌ها
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
