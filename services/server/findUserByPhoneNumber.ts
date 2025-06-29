import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";

export const findUserByPhoneNumber = async (
  phoneNumber: string
): Promise<User | null> => {
  if (!phoneNumber) {
    throw new Error("Phone number is required");
  }

  const user = await prisma.user.findUnique({
    where: { phoneNumber },
  });

  return user || null;
};
