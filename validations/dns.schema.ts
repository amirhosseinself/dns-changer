import * as z from "zod/v4";
import "zod-openapi"; // فعال‌سازی تایپ‌ها برای .meta()
import { createSchema } from "zod-openapi";
import { DnsType } from "@prisma/client";

export const DnsSchema = z
  .object({
    label: z
      .string()
      .min(1)
      .meta({ description: "Label for DNS record", example: "Google DNS" }),
    ip1: z.string().min(1).meta({ example: "8.8.8.8" }),
    ip2: z.string().optional().meta({ example: "8.8.4.4" }),
    type: z.enum(DnsType).meta({ description: "Type of DNS", example: "IPV4" }),
  })
  .meta({ id: "CreateDns", description: "Create DNS record input" });

export const { schema, components } = createSchema(DnsSchema);

export type CreateDnsInput = z.infer<typeof DnsSchema>;
