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
      errorResponse([], "Invalid query parameters.", 3),
      { status: 400 }
    );
  }

  const where =
    parsed.data.type && Object.values(DnsType).includes(parsed.data.type)
      ? { type: parsed.data.type }
      : {};

  const dnsList = await prisma.dnsRecord.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(
    successResponse(dnsList, "DNS records fetched successfully."),
    { status: 200 }
  );
};
