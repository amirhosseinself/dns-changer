// app/api/dns-usage/[userDnsId]/route.ts
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { successResponse, errorResponse } from "@/utils/apiResponses";

export const GET = async (
  req: NextRequest,
  { params }: { params: { userDnsId: string } }
) => {
  try {
    const { userDnsId } = params;

    // دریافت اطلاعات اتصال DNS
    const usage = await prisma.userDnsUsage.findUnique({
      where: { userDnsId },
    });

    if (!usage) {
      return NextResponse.json(
        errorResponse([], "No usage found for this DNS.", 4),
        { status: 404 }
      );
    }

    return NextResponse.json(
      successResponse(usage, "User list fetched successfully."),
      { status: 200 }
    );
  } catch (error) {
    console.error("[api/dns-usage/:userDnsId GET] Error:", error);
    return NextResponse.json(
      errorResponse([], "Internal server error while fetching DNS usage.", 10),
      { status: 500 }
    );
  }
};
