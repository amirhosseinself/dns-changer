import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/utils/apiResponses";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const currentVersion = searchParams.get("currentVersion") || "unknown";

    // ✅ گرفتن آخرین آپدیت (جدیدترین رکورد)
    const latestUpdate = await prisma.updateInfo.findFirst({
      orderBy: { createdAt: "desc" },
    });

    if (!latestUpdate) {
      return NextResponse.json(
        errorResponse([], "No update information found", 404),
        { status: 404 }
      );
    }

    return NextResponse.json(
      successResponse(
        {
          currentVersion,
          latestVersion: latestUpdate.latestVersion,
          updateUrl: latestUpdate.updateUrl,
          description: latestUpdate.description,
          features: latestUpdate.features,
          changes: latestUpdate.changes,
        },
        "Operation successful"
      ),
      { status: 200 }
    );
  } catch (error) {
    console.error("[UPDATE_INFO_ERROR]", error);
    return NextResponse.json(
      errorResponse(
        [{ message: "Internal server error" }],
        "Something went wrong",
        500
      ),
      { status: 500 }
    );
  }
}
