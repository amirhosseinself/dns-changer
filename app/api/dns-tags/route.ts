import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { successResponse, errorResponse } from "@/utils/apiResponses";

// 🟢 GET: لیست همه تگ‌ها
export const GET = async () => {
  try {
    const tags = await prisma.dnsTag.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      successResponse(tags, "DNS tags fetched successfully."),
      { status: 200 }
    );
  } catch (error) {
    console.error("[api/dns-tags/list] Error:", error);
    return NextResponse.json(
      errorResponse([], "Internal server error while fetching DNS tags.", 10),
      { status: 500 }
    );
  }
};

// 🟢 POST: ایجاد تگ جدید
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    console.log("[api/dns-tags/add] Request Body:", body);

    const { name } = body;

    if (!name) {
      return NextResponse.json(errorResponse([], "Tag name is required.", 3), {
        status: 400,
      });
    }

    // ایجاد تگ جدید
    const newTag = await prisma.dnsTag.create({
      data: { name },
    });

    return NextResponse.json(
      successResponse(newTag, "DNS tag created successfully."),
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("[api/dns-tags/add] Error:", error);

    // بررسی خطای unique constraint
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: string }).code === "P2002"
    ) {
      return NextResponse.json(
        errorResponse([], "Tag name already exists.", 2),
        { status: 400 }
      );
    }

    return NextResponse.json(
      errorResponse([], "Internal server error while creating DNS tag.", 10),
      { status: 500 }
    );
  }
};
