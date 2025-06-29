import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { DnsType } from "@prisma/client"; // 🟡 Import enum type

export async function POST(req: Request) {
  const body = await req.json();

  const newDns = await prisma.dnsRecord.create({
    data: {
      label: body.label,
      ip1: body.ip1,
      ip2: body.ip2,
      type: body.type as DnsType, // 🟡 cast to enum type
    },
  });

  return NextResponse.json(newDns);
}

export async function GET(req: Request) {
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

  return NextResponse.json(dnsList);
}
