import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { successResponse, errorResponse } from "@/utils/apiResponses";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    console.log("[api/dns-usage/POST] Body:", body);

    const { fcm_token, dns, timestamp, connection_type, network_info } = body;

    // 🟢 Validation
    if (
      !fcm_token ||
      !dns?.label ||
      !dns?.ip1 ||
      !timestamp ||
      !connection_type
    ) {
      return NextResponse.json(
        errorResponse([], "Missing required fields.", 3),
        { status: 400 }
      );
    }

    // 🟢 Save to DB
    const newConnection = await prisma.userDnsConnection.create({
      data: {
        fcmToken: fcm_token,
        dnsLabel: dns.label,
        dnsIp1: dns.ip1,
        dnsIp2: dns.ip2 || null,
        timestamp: new Date(timestamp),
        connectionState: connection_type,
        networkInfo: network_info || {},
      },
    });

    return NextResponse.json(
      successResponse(newConnection, "DNS connection logged successfully."),
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

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const state = searchParams.get("state"); // connected / disconnected

    const where = state ? { connectionState: state } : {};

    const connections = await prisma.userDnsConnection.findMany({
      where,
      orderBy: { timestamp: "desc" },
    });

    return NextResponse.json(
      successResponse(connections, "DNS connection logs fetched successfully."),
      { status: 200 }
    );
  } catch (error) {
    console.error("[api/dns-usage/GET] Error:", error);
    return NextResponse.json(
      errorResponse([], "Internal server error while fetching DNS logs.", 10),
      { status: 500 }
    );
  }
};
