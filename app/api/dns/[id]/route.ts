import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { successResponse, errorResponse } from "@/utils/apiResponses"; // 🟡 Import response helper functions

export const DELETE = async (req: NextRequest) => {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop(); // استخراج id از آدرس URL

  if (!id) {
    return NextResponse.json(errorResponse([], "Missing ID", 3), {
      status: 400,
    });
  }

  try {
    // حذف رکورد DNS با استفاده از ID
    const deletedDns = await prisma.dnsRecord.delete({
      where: { id },
    });

    // پاسخ موفقیت‌آمیز در صورت حذف رکورد
    return NextResponse.json(
      successResponse(deletedDns, "DNS record deleted successfully."),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting DNS record:", error);
    return NextResponse.json(errorResponse([], "Delete failed", 10), {
      status: 500,
    });
  }
};
