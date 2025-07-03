import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/utils/apiResponses";

// POST request: ذخیره DNS و اضافه کردن آیدی کاربر به آن
export const POST = async (
  req: NextRequest
) => {
  try {
    const { userId, ip1, ip2, type, internetTag, destination } = await req.json();

    if (!userId || !ip1 || !ip2 || !type || !internetTag || !destination) {
      return NextResponse.json(errorResponse([], "Missing required data", 3), {
        status: 400,
      });
    }

    // چک کردن اینکه آیا DNS قبلاً در مدل UserDnsRecord ثبت شده است یا خیر
    let userDnsRecord = await prisma.userDnsRecord.findFirst({
      where: {
        ip1: ip1,
        ip2: ip2,
        type: type,
      },
    });

    // اگر DNS وجود نداشته باشد، آن را در UserDnsRecord ذخیره می‌کنیم
    if (!userDnsRecord) {
      userDnsRecord = await prisma.userDnsRecord.create({
        data: {
          ip1,
          ip2,
          type,
        },
      });
    }

    // حالا باید بررسی کنیم که آیا این userId قبلاً در آرایه userIds مدل UserDnsUsage برای این DNS وجود دارد یا خیر
    let userDnsUsage = await prisma.userDnsUsage.findFirst({
      where: {
        userDnsId: userDnsRecord.id,
      },
    });

    // اگر DNS برای این کاربر وجود نداشت، آن را ایجاد می‌کنیم
    if (!userDnsUsage) {
      userDnsUsage = await prisma.userDnsUsage.create({
        data: {
          userDnsId: userDnsRecord.id,
          internetTag,
          destination,
          userIds: [userId], // اضافه کردن آیدی کاربر به آرایه userIds
        },
      });
    } else {
      // اگر DNS وجود داشت، بررسی می‌کنیم که آیا آیدی کاربر در آرایه userIds موجود است یا خیر
      if (!userDnsUsage.userIds.includes(userId)) {
        // اگر آیدی کاربر در آرایه نبود، آن را اضافه می‌کنیم
        userDnsUsage = await prisma.userDnsUsage.update({
          where: {
            id: userDnsUsage.id,
          },
          data: {
            userIds: {
              push: userId, // اضافه کردن آیدی کاربر به userIds
            },
          },
        });
      }
    }

    return NextResponse.json(successResponse(userDnsUsage, "User added to DNS successfully."), {
      status: 200,
    });
  } catch (error) {
    console.error("Error handling DNS and user data:", error);
    return NextResponse.json(errorResponse([], "Failed to handle DNS and user data.", 10), {
      status: 500,
    });
  }
};
