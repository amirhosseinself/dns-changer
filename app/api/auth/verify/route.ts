import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { token } = await req.json();

  const record = await prisma.verificationToken.findUnique({
    where: { token },
  });
  if (!record || record.expires < new Date()) {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 400 }
    );
  }

  // ✅ Mark user as verified
  await prisma.user.update({
    where: { email: record.identifier },
    data: { isVerified: true },
  });

  // ✅ Delete token after use
  await prisma.verificationToken.delete({ where: { token } });

  return NextResponse.json({ message: "Email verified successfully" });
}
