import { NextRequest, NextResponse } from "next/server";

import { signIn } from "@/auth";
import {
  successResponse,
  errorResponse,
  validatePhoneNumber,
  validateOtpCode,
} from "@/utils";
import { validateOTP } from "@/services/auth/validateOtp";

export async function POST(req: NextRequest) {
  try {
    const { phoneNumber, otpCode } = await req.json();

    const phoneNumberValidation = validatePhoneNumber(phoneNumber);
    if (!phoneNumberValidation.success) {
      return NextResponse.json(
        errorResponse(
          [
            {
              field: "phoneNumber",
              message: phoneNumberValidation.error.errors[0].message,
            },
          ],
          "Invalid phone number.",
          1
        ),
        { status: 400 }
      );
    }

    const otpValidation = validateOtpCode(otpCode);
    if (!otpValidation.success) {
      return NextResponse.json(
        errorResponse(
          [
            {
              field: "otpCode",
              message: otpValidation.error.errors[0].message,
            },
          ],
          "Invalid OTP code.",
          2
        ),
        { status: 400 }
      );
    }

    const otpResult = await validateOTP(phoneNumber, otpCode);

    if (!otpResult.success) {
      return NextResponse.json(
        errorResponse([], otpResult.error, otpResult.code),
        { status: 401 }
      );
    }

    const session = await signIn("credentials", {
      phoneNumber,
      otpCode,
      redirect: false,
    });

    if (!session) {
      return NextResponse.json(
        errorResponse([], "Error while generating user.", 5),
        { status: 401 }
      );
    }

    return NextResponse.json(successResponse(session, "Login successful."));
  } catch (error) {
    console.error("[api/auth/verify-otp] ", error);
    return NextResponse.json(errorResponse([], "Internal server error.", 10), {
      status: 500,
    });
  }
}
