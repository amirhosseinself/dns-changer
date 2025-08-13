import { ZodSchema } from "zod";

export function validate<T>(schema: ZodSchema<T>, data: unknown) {
  return schema.parse(data);
}
