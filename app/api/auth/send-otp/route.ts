import { NextRequest, NextResponse } from "next/server";
import { generateAndSendOTP } from "@/services/auth/generateAndSendOtp";
import { successResponse, errorResponse } from "@/utils/apiResponses";
import { validatePhoneNumber } from "@/utils/phoneValidation";
import { prisma } from "@/lib/prisma";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    console.log("[api/auth/send-otp] Request Body:", body);

    const { phoneNumber } = body || {};
    if (!phoneNumber) {
      return NextResponse.json(
        errorResponse([], "Phone number is required.", 3),
        { status: 400 }
      );
    }

    const result = validatePhoneNumber(phoneNumber);
    if (!result.success) {
      const errors = result.error?.errors || [];
      return NextResponse.json(
        errorResponse(
          errors.map((err) => ({
            field: String(err.path?.[0] || "unknown"),
            message: err.message || "Invalid input",
          })),
          "Invalid phone number.",
          1
        ),
        { status: 400 }
      );
    }

    // بررسی OTP در 1 دقیقه گذشته
    const recentOtp = await prisma.otp.findFirst({
      where: {
        phoneNumber, // ✅ مستقیماً از فیلد جدید استفاده کنید
        sentAt: {
          gte: new Date(Date.now() - 60 * 1000),
        },
      },
    });

    if (recentOtp) {
      return NextResponse.json(
        errorResponse([], "You can only request a new OTP after 1 minute.", 2),
        { status: 429 }
      );
    }

    // تولید و ارسال OTP
    try {
      await generateAndSendOTP(phoneNumber);
    } catch (err) {
      console.error("[api/auth/send-otp] OTP Generation Error:", err);
      return NextResponse.json(
        errorResponse([], "Failed to generate OTP.", 4),
        { status: 500 }
      );
    }

    return NextResponse.json(successResponse(null, "OTP sent successfully."), {
      status: 200,
    });
  } catch (error) {
    console.error("[api/auth/send-otp] Error:", error);
    return NextResponse.json(
      errorResponse(
        [],
        "Internal server Error. An error occurred while sending OTP.",
        10
      ),
      { status: 500 }
    );
  }
};
