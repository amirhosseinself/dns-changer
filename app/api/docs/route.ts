import { schema, components } from "@/validations/dns.schema";
import { NextResponse } from "next/server";
import { createDocument } from "zod-openapi";
// import type { ZodOpenApiComponentsObject } from "zod-openapi";

export const GET = async () => {
  // console.log(
  //   "[api/docs] Generating OpenAPI documentation ",
  //   schema,
  //   "cmp: ",
  //   components
  // );

  const openApiDoc = createDocument({
    openapi: "3.1.0",
    info: { title: "DNS API", version: "1.0.0" },
    paths: {
      "/api/dns": {
        post: {
          requestBody: {
            content: {
              "application/json": { schema: schema, encoding: components },
            },
          },
          responses: {
            201: {
              description: "DNS record added",
              content: { "application/json": { schema: schema } },
            },
          },
        },
      },
    },
    // components: {
    //   // Cast to satisfy type checker
    //   schemas: components as unknown as Record<string, unknown>,
    // } as ZodOpenApiComponentsObject,
  });

  return NextResponse.json(openApiDoc);
};
