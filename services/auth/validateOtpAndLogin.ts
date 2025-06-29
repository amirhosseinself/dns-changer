import { findUserByPhoneNumber } from "@/services/server/findUserByPhoneNumber";
import { prisma } from "@/lib/prisma";

export async function validateOtpAndLogin(phoneNumber: string, otp: string) {
  const user = await findUserByPhoneNumber(phoneNumber);

  if (!user) {
    console.log("[validateOtp] User not found");
    return null;
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
    return null;
  }

  // به‌روزرسانی وضعیت Otp به تأیید شده
  await prisma.otp.update({
    where: { id: otpRecord.id },
    data: { isVerified: true },
  });

  return user;
}
