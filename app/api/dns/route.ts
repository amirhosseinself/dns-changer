// src/app/api/dns/route.ts
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { DnsType } from "@prisma/client";
import { successResponse, errorResponse } from "@/utils/apiResponses";
import { DnsSchema } from "@/validations/dns.schema"; // Import your schema
import { formatZodErrors } from "@/utils/formatZodErrors";

export const POST = async (req: NextRequest) => {
  try {
    const json = await req.json();

    // ✅ Validate request body with Zod schema
    const parsed = DnsSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        errorResponse(
          formatZodErrors(parsed.error as unknown as import("zod").ZodError),
          "Validation failed",
          3
        ),
        { status: 400 }
      );
    }

    const { label, ip1, ip2, type } = parsed.data;

    // ✅ Create DNS record
    const newDns = await prisma.dnsRecord.create({
      data: { label, ip1, ip2, type: type as DnsType },
    });

    return NextResponse.json(
      successResponse(newDns, "DNS record added successfully."),
      { status: 201 }
    );
  } catch (error) {
    console.error("[api/dns/add] Error:", error);
    return NextResponse.json(errorResponse([], "Internal server error.", 10), {
      status: 500,
    });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    const where =
      type && Object.values(DnsType).includes(type as DnsType)
        ? { type: type as DnsType }
        : {};

    const dnsList = await prisma.dnsRecord.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      successResponse(dnsList, "DNS records fetched successfully."),
      { status: 200 }
    );
  } catch (error) {
    console.error("[api/dns/list] Error:", error);
    return NextResponse.json(errorResponse([], "Internal server error.", 10), {
      status: 500,
    });
  }
};
