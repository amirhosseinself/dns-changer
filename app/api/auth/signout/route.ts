import { NextRequest, NextResponse } from "next/server";
import { signOut } from "@/auth"; // برای مدیریت سشن
import { successResponse, errorResponse } from "@/utils/apiResponses";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(req: NextRequest) {
  try {
    await signOut({ redirect: false });

    return NextResponse.json(successResponse({}, "Sign out successful."));
  } catch (error) {
    console.error("[api/auth/signout] ", error);
    return NextResponse.json(errorResponse([], "Internal server error.", 10), {
      status: 500,
    });
  }
}
