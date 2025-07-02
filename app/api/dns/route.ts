import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { DnsType } from "@prisma/client"; // 🟡 Import enum type
import { successResponse, errorResponse } from "@/utils/apiResponses"; // 🟡 Import response helper functions

// POST request: Add new DNS record
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    console.log("[api/dns/add] Request Body:", body);

    const { label, ip1, ip2, type } = body;

    // اعتبارسنجی ورودی‌ها
    if (!label || !ip1 || !type) {
      return NextResponse.json(
        errorResponse([], "Label, IP1, and Type are required.", 3),
        { status: 400 }
      );
    }

    // تبدیل نوع ورودی به نوع معتبر DnsType
    if (!Object.values(DnsType).includes(type as DnsType)) {
      return NextResponse.json(errorResponse([], "Invalid DNS Type.", 1), {
        status: 400,
      });
    }

    // ایجاد رکورد جدید DNS در پایگاه داده
    const newDns = await prisma.dnsRecord.create({
      data: {
        label,
        ip1,
        ip2,
        type: type as DnsType, // 🟡 Cast to enum type
      },
    });

    return NextResponse.json(
      successResponse(newDns, "DNS record added successfully."),
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("[api/dns/add] Error:", error);
    return NextResponse.json(
      errorResponse(
        [],
        "Internal server error occurred while adding DNS record.",
        10
      ),
      { status: 500 }
    );
  }
};

// GET request: Get DNS records
export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    let where = undefined;

    if (type && Object.values(DnsType).includes(type as DnsType)) {
      where = { type: type as DnsType }; // 🟡 فقط اگر معتبر بود، cast کن
    }

    const dnsList = await prisma.dnsRecord.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      successResponse(dnsList, "DNS records fetched successfully."),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("[api/dns/list] Error:", error);
    return NextResponse.json(
      errorResponse(
        [],
        "Internal server error occurred while fetching DNS records.",
        10
      ),
      { status: 500 }
    );
  }
};
