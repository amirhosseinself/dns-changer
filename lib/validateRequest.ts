import { NextRequest, NextResponse } from "next/server";
import { ZodTypeAny, z } from "zod";
import { errorResponse } from "@/utils/apiResponses";
import { formatZodErrors } from "@/utils/formatZodErrors";

// Generic validateBody that infers type from the given schema
export async function validateBody<Schema extends ZodTypeAny>(
  req: NextRequest,
  schema: Schema
): Promise<
  | { success: true; data: z.infer<Schema> }
  | { success: false; response: NextResponse }
> {
  const json = await req.json();
  const parsed = schema.safeParse(json);

  if (!parsed.success) {
    return {
      success: false,
      response: NextResponse.json(
        errorResponse(formatZodErrors(parsed.error), "Validation failed", 3),
        { status: 400 }
      ),
    };
  }

  // Now parsed.data is automatically inferred as z.infer<Schema>
  return { success: true, data: parsed.data };
}
