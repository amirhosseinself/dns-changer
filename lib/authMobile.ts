import { decode } from "next-auth/jwt";

export async function getMobileUserId(req: Request): Promise<string | null> {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;

  const token = authHeader.split(" ")[1];
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET is not defined");

  const session = (await decode({
    token,
    secret,
    salt: "authjs.session-token",
  })) as { id?: string } | null;

  return session?.id || null;
}
