import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/utils/apiResponses";

// GET request: گرفتن اطلاعات کانفیگ v2ray برای یک کاربر بر اساس ID
export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params; // پارامتر id از مسیر URL

    if (!id) {
      return NextResponse.json(errorResponse([], "Missing ID", 3), {
        status: 400,
      });
    }

    // جستجو برای دریافت کانفیگ کاربر از دیتابیس
    const userConfig = await prisma.v2RayConfig.findFirst({
      where: { userId: id },
    });

    if (!userConfig) {
      return NextResponse.json(errorResponse([], "User config not found.", 4), {
        status: 404,
      });
    }

    // تبدیل داده‌های کاربر به فرمت کانفیگ V2Ray
    const v2rayConfig = {
      inbounds: [
        {
          port: 1080,
          listen: "127.0.0.1",
          protocol: "socks",
          settings: {
            auth: "noauth",
            udp: true,
          },
        },
      ],
      outbounds: [
        {
          protocol: "vmess",
          settings: {
            vnext: [
              {
                address: userConfig.server,
                port: userConfig.port,
                users: [
                  {
                    id: userConfig.uuid,
                    alterId: userConfig.alterId,
                    security: "auto",
                  },
                ],
              },
            ],
          },
        },
      ],
      dns: {
        servers: [userConfig.dns],
      },
    };

    // ارسال پاسخ موفق با تنظیمات V2Ray
    return NextResponse.json(
      successResponse(v2rayConfig, "Config fetched successfully."),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user config:", error);
    return NextResponse.json(
      errorResponse([], "Failed to fetch user config.", 10),
      { status: 500 }
    );
  }
};
