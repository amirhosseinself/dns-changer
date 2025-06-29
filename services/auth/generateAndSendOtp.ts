import { findUserByPhoneNumber } from "@/services/server/findUserByPhoneNumber";
import { prisma } from "@/lib/prisma";

export async function generateAndSendOTP(phoneNumber: string) {
  const code = "151515"; // ثابت برای تست
  const sentAt = new Date();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  try {
    // ۱. پیدا کردن کاربر یا ایجاد کاربر جدید
    let user = null;
    try {
      user = await findUserByPhoneNumber(phoneNumber);
    } catch (error) {
      console.error("[generateAndSendOTP] Error finding user:", error);
      throw new Error("Database error while finding user.");
    }

    if (!user) {
      user = await prisma.user.upsert({
        where: { phoneNumber },
        update: {},
        create: { phoneNumber, createdAt: new Date() },
      });
    }

    // ۲. بررسی مقدار `user.id`
    if (!user || !user.id) {
      throw new Error("User ID is missing or invalid.");
    }

    // ۳. ایجاد OTP در دیتابیس
    await prisma.otp.create({
      data: {
        userId: user.id,
        phoneNumber,
        code,
        sentAt,
        expiresAt,
      },
    });

    // TODO: ارسال OTP به کاربر
    // await sendSMS(phoneNumber, `Your OTP is: ${code}`);
  } catch (error) {
    console.error("[generateAndSendOTP] Unexpected error:", error);
    throw new Error("An error occurred while generating OTP.");
  }
}
