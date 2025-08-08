import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { errorResponse, successResponse } from "@/utils/apiResponses";

export const DELETE = async (
  req: NextRequest,
  context: { params: { id: string } }
) => {
  try {
    const { id } = context.params;

    const existingTag = await prisma.dnsTag.findUnique({ where: { id } });

    if (!existingTag) {
      return NextResponse.json(errorResponse([], "Tag not found.", 4), {
        status: 404,
      });
    }

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
