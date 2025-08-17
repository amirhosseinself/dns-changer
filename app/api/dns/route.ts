// src/app/api/dns/route.ts
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { DnsType } from "@prisma/client";
import { successResponse, errorResponse } from "@/utils/apiResponses";
import { DnsSchema, DnsQuerySchema } from "@/validations/dns.schema";
import { validateBody } from "@/lib/validateRequest";

export const POST = async (req: NextRequest) => {
  const validation = await validateBody(req, DnsSchema);
  if (!validation.success) return validation.response;

  const { label, ip1, ip2, type } = validation.data;

  const newDns = await prisma.dnsRecord.create({
    data: { label, ip1, ip2, type: type as DnsType },
  });

  return NextResponse.json(
    successResponse(newDns, "DNS record added successfully."),
    { status: 201 }
  );
};

export const GET = async (req: NextRequest) => {
  const searchParams = Object.fromEntries(
    new URL(req.url).searchParams.entries()
  );
  const parsed = DnsQuerySchema.safeParse(searchParams);

  if (!parsed.success) {
    return NextResponse.json(
      errorResponse([], "پارامترهای query نامعتبر هستند.", 3),
      { status: 400 }
    );
  }

  const { type, offset = "0", limit = "20" } = parsed.data;

  // ✅ تبدیل offset و limit به عدد
  const skip = parseInt(offset as string, 10) || 0;
  const take = parseInt(limit as string, 10) || 20;

  const where =
    type && Object.values(DnsType).includes(type)
      ? { type: type as DnsType }
      : {};

  const dnsList = await prisma.dnsRecord.findMany({
    where,
    orderBy: { createdAt: "desc" },
    skip, // شروع از رکورد مشخص
    take, // تعداد رکوردهای محدود
  });

  return NextResponse.json(
    successResponse(dnsList, "DNS records fetched successfully."),
    { status: 200 }
  );
};
