// src/validations/dns.schema.ts
import { z } from "zod";
import { DnsType } from "@prisma/client";

// Body Schema
export const DnsSchema = z.object({
  label: z.string().trim().min(1),
  ip1: z.string().trim().ip().min(1),
  ip2: z.string().ip().optional(),
  type: z.nativeEnum(DnsType),
});

// Query Schema
export const DnsQuerySchema = z.object({
  type: z.nativeEnum(DnsType).optional(),
});

export type CreateDnsInput = z.infer<typeof DnsSchema>;
export type DnsQueryInput = z.infer<typeof DnsQuerySchema>;
