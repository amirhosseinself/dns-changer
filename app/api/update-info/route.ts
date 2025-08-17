import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/utils/apiResponses";

// ✅ Function to compare versions (semver)
function getImportance(current: string, latest: string): "mandatory" | "important" | "minor" {
  try {
    const [curMajor, curMinor, curPatch] = current.split(".").map(Number);
    const [latMajor, latMinor, latPatch] = latest.split(".").map(Number);

    if (latMajor > curMajor) return "mandatory";
    if (latMinor > curMinor) return "important";
    if (latPatch > curPatch) return "minor";

    return "minor"; // default fallback
  } catch {
    return "minor"; // اگر نسخه فرمت درست نداشت
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const currentVersion = searchParams.get("currentVersion") || "0.0.0";

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

    // ✅ محاسبه اهمیت آپدیت
    const importance = getImportance(currentVersion, latestUpdate.latestVersion);

    return NextResponse.json(
      successResponse(
        {
          currentVersion,
          latestVersion: latestUpdate.latestVersion,
          updateUrl: latestUpdate.updateUrl,
          description: latestUpdate.description,
          features: latestUpdate.features,
          changes: latestUpdate.changes,
          importance, // 🔥 فیلد جدید
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
