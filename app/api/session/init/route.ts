import { NextResponse } from "next/server";
import { encode } from "next-auth/jwt"; // ✅ ساخت JWT دستی
import { Role } from "@prisma/client";

export const POST = async () => {
  try {
    // 1️⃣ شبیه‌سازی ورود کاربر مهمان
    const guestUser = {
      id: crypto.randomUUID(), // شناسه یکتا
      email: `guest_${Date.now()}@example.com`, // ایمیل فیک
      role: "GUEST" as Role,
    };

    // 2️⃣ ساخت JWT با سیستم داخلی Auth.js
    const token = await encode({
      token: {
        id: guestUser.id,
        email: guestUser.email,
        role: guestUser.role,
      },
      secret: process.env.AUTH_SECRET!, // باید همونی باشه که توی auth.ts هست
      salt: "authjs.session-token", // مقدار ثابت برای سازگاری با Auth.js
    });

    // 3️⃣ برگردوندن JWT و اطلاعات کاربر
    return NextResponse.json(
      {
        success: true,
        message: "Guest session initialized",
        jwt: token,
        user: guestUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[api/session/init] Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
};
