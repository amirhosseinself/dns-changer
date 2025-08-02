// app/api/dns-tags/[id]/route.ts
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { successResponse, errorResponse } from "@/utils/apiResponses";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;

    // بررسی وجود تگ
    const existingTag = await prisma.dnsTag.findUnique({ where: { id } });
    if (!existingTag) {
      return NextResponse.json(errorResponse([], "Tag not found.", 4), {
        status: 404,
      });
    }

    // حذف تگ
    await prisma.dnsTag.delete({ where: { id } });

    return NextResponse.json(
      successResponse([], "DNS tag deleted successfully."),
      { status: 200 }
    );
  } catch (error) {
    console.error("[api/dns-tags/delete] Error:", error);
    return NextResponse.json(
      errorResponse([], "Internal server error while deleting DNS tag.", 10),
      { status: 500 }
    );
  }
};
