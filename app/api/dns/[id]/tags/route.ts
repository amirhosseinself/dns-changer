// app/api/dns/[id]/tags/route.ts
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { successResponse, errorResponse } from "@/utils/apiResponses";

/**
 * GET: دریافت لیست تگ‌های DNS
 */
export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id: dnsRecordId } = await params;

    // بررسی وجود DNS
    const dnsRecord = await prisma.dnsRecord.findUnique({
      where: { id: dnsRecordId },
      include: {
        tags: {
          include: { dnsTag: true },
        },
      },
    });

    if (!dnsRecord) {
      return NextResponse.json(errorResponse([], "DNS record not found.", 4), {
        status: 404,
      });
    }

    const tags = dnsRecord.tags.map((rel) => rel.dnsTag);

    return NextResponse.json(
      successResponse(tags, "DNS tags fetched successfully."),
      { status: 200 }
    );
  } catch (error) {
    console.error("[api/dns/tags/GET] Error:", error);
    return NextResponse.json(
      errorResponse([], "Internal server error while fetching DNS tags.", 10),
      { status: 500 }
    );
  }
};

/**
 * PUT: جایگزینی کامل تگ‌های DNS
 */
export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id: dnsRecordId } = await params;
    const body = await req.json();
    const { tagIds } = body;

    if (!Array.isArray(tagIds)) {
      return NextResponse.json(
        errorResponse([], "tagIds must be an array.", 3),
        { status: 400 }
      );
    }

    // بررسی وجود DNS
    const dnsRecord = await prisma.dnsRecord.findUnique({
      where: { id: dnsRecordId },
    });
    if (!dnsRecord) {
      return NextResponse.json(errorResponse([], "DNS record not found.", 4), {
        status: 404,
      });
    }

    // بررسی وجود تگ‌ها
    const validTags = await prisma.dnsTag.findMany({
      where: { id: { in: tagIds } },
    });
    if (validTags.length !== tagIds.length) {
      return NextResponse.json(
        errorResponse([], "Some tagIds are invalid.", 5),
        { status: 400 }
      );
    }

    // حذف تگ‌های قبلی
    await prisma.dnsTagOnDnsRecord.deleteMany({ where: { dnsRecordId } });

    // ایجاد تگ‌های جدید
    await prisma.dnsTagOnDnsRecord.createMany({
      data: tagIds.map((tagId: string) => ({
        dnsRecordId,
        dnsTagId: tagId,
      })),
    });

    // برگرداندن لیست تگ‌های نهایی
    const updatedTags = await prisma.dnsTag.findMany({
      where: { id: { in: tagIds } },
    });

    return NextResponse.json(
      successResponse(updatedTags, "DNS tags updated successfully."),
      { status: 200 }
    );
  } catch (error) {
    console.error("[api/dns/tags/PUT] Error:", error);
    return NextResponse.json(
      errorResponse([], "Internal server error while updating DNS tags.", 10),
      { status: 500 }
    );
  }
};

/**
 * PATCH: افزودن یا حذف تگ‌ها بدون پاک کردن کامل
 */
export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id: dnsRecordId } = await params;
    const body = await req.json();
    const { addTagIds = [], removeTagIds = [] } = body;

    // بررسی وجود DNS
    const dnsRecord = await prisma.dnsRecord.findUnique({
      where: { id: dnsRecordId },
    });
    if (!dnsRecord) {
      return NextResponse.json(errorResponse([], "DNS record not found.", 4), {
        status: 404,
      });
    }

    // حذف تگ‌های مشخص شده
    if (removeTagIds.length > 0) {
      await prisma.dnsTagOnDnsRecord.deleteMany({
        where: {
          dnsRecordId,
          dnsTagId: { in: removeTagIds },
        },
      });
    }

    // افزودن تگ‌های جدید
    if (addTagIds.length > 0) {
      // بررسی وجود تگ‌ها
      const validTags = await prisma.dnsTag.findMany({
        where: { id: { in: addTagIds } },
      });
      if (validTags.length !== addTagIds.length) {
        return NextResponse.json(
          errorResponse([], "Some addTagIds are invalid.", 5),
          { status: 400 }
        );
      }

      // فیلتر کردن تگ‌های جدیدی که قبلاً ثبت نشده‌اند
      const existingRelations = await prisma.dnsTagOnDnsRecord.findMany({
        where: {
          dnsRecordId,
          dnsTagId: { in: addTagIds },
        },
        select: { dnsTagId: true },
      });

      const existingTagIds = existingRelations.map((rel) => rel.dnsTagId);
      const newTagIds = addTagIds.filter(
        (id: string) => !existingTagIds.includes(id)
      );

      // فقط تگ‌های جدید را اضافه کن
      if (newTagIds.length > 0) {
        await prisma.dnsTagOnDnsRecord.createMany({
          data: newTagIds.map((tagId: string) => ({
            dnsRecordId,
            dnsTagId: tagId,
          })),
        });
      }
    }

    // برگرداندن لیست نهایی تگ‌ها
    const finalTags = await prisma.dnsTagOnDnsRecord.findMany({
      where: { dnsRecordId },
      include: { dnsTag: true },
    });

    return NextResponse.json(
      successResponse(
        finalTags.map((rel) => rel.dnsTag),
        "DNS tags updated successfully via PATCH."
      ),
      { status: 200 }
    );
  } catch (error) {
    console.error("[api/dns/tags/PATCH] Error:", error);
    return NextResponse.json(
      errorResponse([], "Internal server error while patching DNS tags.", 10),
      { status: 500 }
    );
  }
};

/**
 * DELETE: حذف همه تگ‌های DNS
 */
export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id: dnsRecordId } = await params;

    const dnsRecord = await prisma.dnsRecord.findUnique({
      where: { id: dnsRecordId },
    });
    if (!dnsRecord) {
      return NextResponse.json(errorResponse([], "DNS record not found.", 4), {
        status: 404,
      });
    }

    const deleted = await prisma.dnsTagOnDnsRecord.deleteMany({
      where: { dnsRecordId },
    });

    return NextResponse.json(
      successResponse(
        { deletedCount: deleted.count },
        "All DNS tags deleted successfully."
      ),
      { status: 200 }
    );
  } catch (error) {
    console.error("[api/dns/tags/DELETE] Error:", error);
    return NextResponse.json(
      errorResponse([], "Internal server error while deleting DNS tags.", 10),
      { status: 500 }
    );
  }
};
