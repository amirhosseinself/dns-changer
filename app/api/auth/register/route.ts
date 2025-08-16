import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password, userName, fullName } = await req.json();

    // ✅ Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // ✅ Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create user
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        userName,
        fullName,
        role: "USER",
        isGuest: false,
      },
    });

    return NextResponse.json({
      message: "User registered successfully",
      user: {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
        userName: newUser.userName,
        fullName: newUser.fullName,
      },
    });
  } catch (error) {
    console.error("[REGISTER_ERROR]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
