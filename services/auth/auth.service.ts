import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { RegisterInput, LoginInput } from "@/validations/auth.schema";
import { Role } from "@prisma/client";

export async function registerUser(data: RegisterInput) {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (existingUser) throw new Error("Email already in use");

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newUser = await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      fullName: data.fullName,
      role: Role.USER,
      isGuest: false,
    },
  });

  return newUser;
}

export async function loginUser(data: LoginInput) {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (!user || !user.password) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(data.password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  return user;
}
