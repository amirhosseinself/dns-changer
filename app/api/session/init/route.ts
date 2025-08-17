import { NextResponse } from "next/server";
import { encode } from "next-auth/jwt";
import { successResponse, errorResponse } from "@/utils/apiResponses";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";

interface GuestUser {
  id: string;
  email: string;
  role: string;
  fullName: string | null;
  profilePic: string | null;
  createdAt: string;
  updatedAt: string;
}

// متد authorize مهمان به صورت دستی اجرا می‌کنیم
async function createGuestUser(): Promise<GuestUser> {
  const randomID = randomUUID();
  const email = `guest_${randomID}@example.com`;
  const fullName = `Guest User ${randomID}`;

  const guest = await prisma.user.create({
    data: {
      isGuest: true,
      email,
      fullName,
      role: "GUEST",
    },
  });

  return {
    id: guest.id,
    role: guest.role,
    email: guest.email,
    fullName: guest.fullName,
    profilePic: guest.profilePic,
    createdAt: guest.createdAt.toISOString(),
    updatedAt: guest.updatedAt.toISOString(),
  };
}

export const POST = async () => {
  try {
    // 1️⃣ ایجاد کاربر مهمان
    const guestUser = await createGuestUser();

    // 2️⃣ ساخت JWT
    const jwt = await encode({
      token: {
        id: guestUser.id,
        email: guestUser.email,
        role: guestUser.role,
      },
      secret: process.env.AUTH_SECRET!,
      salt: "authjs.session-token",
    });

    // 3️⃣ برگرداندن خروجی
    return NextResponse.json(
      successResponse(
        {
          jwt,
          user: guestUser,
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
