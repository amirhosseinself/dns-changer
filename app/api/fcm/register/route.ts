// app/api/fcm/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { decode } from "next-auth/jwt";
import { successResponse, errorResponse } from "@/utils/apiResponses";
import { fcmRegisterSchema } from "@/validations/fcm.schema";

export const POST = async (req: NextRequest) => {
  try {
    // 1️⃣ Authorization header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        errorResponse([], "Missing Authorization header", 401),
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.AUTH_SECRET;
    if (!secret) throw new Error("AUTH_SECRET is not defined");

    // 2️⃣ Decode JWT to get userId
    const session = (await decode({
      token,
      secret,
      salt: "authjs.session-token",
    })) as { id?: string } | null;

    if (!session?.id) {
      return NextResponse.json(
        errorResponse([], "Invalid token: userId missing", 401),
        { status: 401 }
      );
    }

    const userId: string = session.id;

    // 3️⃣ Parse body و validate با Zod
    const body = await req.json();
    const parseResult = fcmRegisterSchema.safeParse(body);
    if (!parseResult.success) {
      const errors = parseResult.error.errors.map((e) => ({
        message: e.message,
      }));
      return NextResponse.json(
        errorResponse(errors, "Validation failed", 400),
        { status: 400 }
      );
    }
    const { deviceId, fcmToken, platform } = parseResult.data;

    // 4️⃣ Check user exists
    const userExists = await prisma.user.findUnique({ where: { id: userId } });
    if (!userExists) {
      return NextResponse.json(errorResponse([], "User not found.", 404), {
        status: 404,
      });
    }

    // 5️⃣ Insert or update FCM token
    const existingToken = await prisma.fCMToken.findUnique({
      where: { token: fcmToken },
    });

    let savedToken;
    if (existingToken) {
      savedToken = await prisma.fCMToken.update({
        where: { token: fcmToken },
        data: { deviceId, platform, userId },
      });
      console.log("[api/fcm/register] Updated existing FCM token:", fcmToken);
    } else {
      savedToken = await prisma.fCMToken.create({
        data: { token: fcmToken, platform, deviceId, userId },
      });
      console.log("[api/fcm/register] Created new FCM token:", fcmToken);
    }

    // 6️⃣ Return success
    return NextResponse.json(
      successResponse(savedToken, "FCM token registered successfully."),
      { status: 201 }
    );
  } catch (error) {
    console.error("[api/fcm/register] Error:", error);
    return NextResponse.json(
      errorResponse([], "Internal server error while registering token.", 500),
      { status: 500 }
    );
  }
};
