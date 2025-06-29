import { z } from "zod";

export const validatePhoneNumber = (phoneNumber: string) => {
  const phoneNumberSchema = z
    .string()
    .length(11, "Phone number must be exactly 11 digits.")
    .regex(
      /^09\d{9}$/,
      "Phone number must start with '09' and contain only digits."
    );

  return phoneNumberSchema.safeParse(phoneNumber);
};
