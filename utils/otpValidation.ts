import { z } from "zod";

export const validateOtpCode = (otpCode: string) => {
  const otpSchema = z
    .string()
    .length(6, "OTP code must be exactly 6 digits.")
    .regex(/^\d+$/, "OTP code must contain only digits.");

  return otpSchema.safeParse(otpCode);
};
