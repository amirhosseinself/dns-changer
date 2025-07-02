import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { successResponse, errorResponse } from "@/utils/apiResponses"; // 🟡 Import response helper functions
import { DnsType } from "@prisma/client";

// DELETE request: حذف رکورد DNS
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

// GET request: گرفتن اطلاعات تنها یک رکورد DNS
export const GET = async (req: NextRequest) => {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop(); // استخراج id از آدرس URL

  if (!id) {
    return NextResponse.json(errorResponse([], "Missing ID", 3), {
      status: 400,
    });
  }

  try {
    // جستجوی رکورد DNS با استفاده از ID
    const dnsRecord = await prisma.dnsRecord.findUnique({
      where: { id },
    });

    if (!dnsRecord) {
      return NextResponse.json(errorResponse([], "DNS record not found.", 4), {
        status: 404,
      });
    }

    // پاسخ موفقیت‌آمیز با اطلاعات رکورد DNS
    return NextResponse.json(
      successResponse(dnsRecord, "DNS record fetched successfully."),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching DNS record:", error);
    return NextResponse.json(
      errorResponse([], "Failed to fetch DNS record.", 10),
      {
        status: 500,
      }
    );
  }
};

// PATCH request: ویرایش رکورد DNS
export const PATCH = async (req: NextRequest) => {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop(); // استخراج id از آدرس URL

  if (!id) {
    return NextResponse.json(errorResponse([], "Missing ID", 3), {
      status: 400,
    });
  }

  const body = await req.json();
  const { label, ip1, ip2, type } = body;

  // اعتبارسنجی ورودی‌ها
  if (!label && !ip1 && !type) {
    return NextResponse.json(
      errorResponse(
        [],
        "At least one field (label, ip1, or type) must be provided to update.",
        3
      ),
      { status: 400 }
    );
  }

  try {
    // ویرایش رکورد DNS با استفاده از ID
    const updatedDns = await prisma.dnsRecord.update({
      where: { id },
      data: {
        label: label || undefined,
        ip1: ip1 || undefined,
        ip2: ip2 || undefined,
        type: type ? (type as DnsType) : undefined,
      },
    });

    return NextResponse.json(
      successResponse(updatedDns, "DNS record updated successfully."),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating DNS record:", error);
    return NextResponse.json(
      errorResponse([], "Failed to update DNS record.", 10),
      {
        status: 500,
      }
    );
  }
};
