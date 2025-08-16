import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";

export const findUserByEmail = async (email: string): Promise<User | null> => {
  if (!email) {
    throw new Error("Phone number is required");
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  return user || null;
};
