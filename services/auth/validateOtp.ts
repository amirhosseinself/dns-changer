import { findUserByPhoneNumber } from "@/services/server/findUserByPhoneNumber";
import { prisma } from "@/lib/prisma";

export async function validateOTP(phoneNumber: string, otp: string) {
  const user = await findUserByPhoneNumber(phoneNumber);

  if (!user) {
    console.log("[validateOtp] User not found");
    return {
      success: false,
      error: "User not found",
      code: 3, // کد خطا برای مدیریت بهتر
    };
  }

  // بررسی Otp مرتبط با کاربر
  const otpRecord = await prisma.otp.findFirst({
    where: {
      userId: user.id,
      code: otp,
      expiresAt: {
        gte: new Date(),
      },
      isVerified: false,
    },
  });

  if (!otpRecord) {
    console.log("[validateOtp] Invalid OTP");
    return {
      success: false,
      error: "Invalid or expired OTP",
      code: 4,
    };
  }

  return {
    success: true,
  };
}
