export { auth as middleware } from "@/auth";

export const config = {
  matcher: ["/admin/:path*"], // فقط مسیرهای /admin و زیرمسیرها
};
