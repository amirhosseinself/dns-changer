import { NextResponse } from "next/server";
import { signIn } from "@/auth";
import type { SignInResponse } from "next-auth/react"; // ✅ type import

export const POST = async () => {
  try {
    const result = (await signIn("guest", { redirect: false })) as
      | SignInResponse
      | undefined;

    if (!result || result.error) {
      return NextResponse.json(
        { success: false, message: "Guest login failed" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Guest logged in", data: result },
      { status: 200 }
    );
  } catch (error) {
    console.error("[api/auth/guest] Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
};
