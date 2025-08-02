// app/api/dns-usage/route.ts
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { successResponse, errorResponse } from "@/utils/apiResponses";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    console.log("[api/dns-usage/POST] Body:", body);

    const { userDnsId, internetTag, destination, userId } = body;

    // 🟢 اعتبارسنجی
    if (!userDnsId || !internetTag || !destination || !userId) {
      return NextResponse.json(
        errorResponse(
          [],
          "All fields are required: userDnsId, internetTag, destination, userId",
          3
        ),
        { status: 400 }
      );
    }

    // بررسی وجود DNS کاربر
    const userDns = await prisma.userDnsRecord.findUnique({
      where: { id: userDnsId },
    });
    if (!userDns) {
      return NextResponse.json(
        errorResponse([], "User DNS record not found.", 4),
        { status: 404 }
      );
    }

    // بررسی اینکه usage وجود دارد یا نه
    let usage = await prisma.userDnsUsage.findUnique({
      where: { userDnsId },
    });

    if (usage) {
      // اگر وجود دارد، userId جدید رو اضافه کن اگر قبلاً اضافه نشده باشد
      if (!usage.userIds.includes(userId)) {
        usage = await prisma.userDnsUsage.update({
          where: { userDnsId },
          data: {
            userIds: { push: userId },
          },
        });
      }
    } else {
      // اگر وجود ندارد، رکورد جدید بساز
      usage = await prisma.userDnsUsage.create({
        data: {
          userDnsId,
          internetTag,
          destination,
          userIds: [userId],
        },
      });
    }

    return NextResponse.json(
      successResponse(usage, "User DNS usage recorded successfully."),
      { status: 201 }
    );
  } catch (error) {
    console.error("[api/dns-usage/POST] Error:", error);
    return NextResponse.json(
      errorResponse([], "Internal server error while recording DNS usage.", 10),
      { status: 500 }
    );
  }
};

// admin

// app/api/dns-usage/route.ts
// 🔹 این فایل همزمان GET و POST را مدیریت می‌کند

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const internetTag = searchParams.get("internetTag");

    // فیلتر اختیاری براساس اینترنت‌تگ
    const where = internetTag ? { internetTag } : {};

    const usages = await prisma.userDnsUsage.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      successResponse(usages, "DNS usage report fetched successfully."),
      { status: 200 }
    );
  } catch (error) {
    console.error("[api/dns-usage/GET] Error:", error);
    return NextResponse.json(
      errorResponse(
        [],
        "Internal server error while fetching usage report.",
        10
      ),
      { status: 500 }
    );
  }
};
