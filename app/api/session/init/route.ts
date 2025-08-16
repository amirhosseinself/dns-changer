import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { successResponse, errorResponse } from "@/utils/apiResponses";

const JWT_SECRET =
  process.env.JWT_SECRET || "WkVk1YMeziFBlljSRtG15IClHKYNbBZ3nbR4KLsx41Q="; // باید در .env ست بشه

export const POST = async () => {
  try {
    // Create guest user
    const newUser = await prisma.user.create({
      data: {
        isGuest: true,
        role: "GUEST",
      },
    });

    // Create JWT token for guest
    const token = jwt.sign(
      {
        id: newUser.id,
        role: newUser.role,
        guest: true,
      },
      JWT_SECRET,
      { expiresIn: "30d" }
    );

    return NextResponse.json(
      successResponse(
        {
          userId: newUser.id,
          token,
        },
        "Guest user created and JWT issued successfully."
      ),
      { status: 200 }
    );
  } catch (error) {
    console.error("[api/session/init] Error:", error);
    return NextResponse.json(
      errorResponse([], "Internal server error while creating guest.", 10),
      { status: 500 }
    );
  }
};
