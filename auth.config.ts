import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

import { validateOtpAndLogin } from "@/services/auth/validateOtpAndLogin";

export default {
  providers: [
    Credentials({
      name: "OTP",
      credentials: {
        phoneNumber: { label: "Phone Number", type: "text" },
        otpCode: { label: "OTP", type: "text" },
      },
      async authorize(credentials) {
        const { phoneNumber, otpCode } = credentials as {
          phoneNumber: string;
          otpCode: string;
        };

        if (!phoneNumber || !otpCode) {
          console.log("[auth.config.ts] Phone number or OTP code is missing.");
          return null;
        }

        // Validate OTP from the database
        const user = await validateOtpAndLogin(phoneNumber, otpCode);

        if (!user) {
          console.log("[auth.config.ts] Invalid or expired OTP code.");
          return null;
        }

        // **Ensure returning a full User object**
        return {
          id: user.id,
          phoneNumber: user.phoneNumber || "", // Ensure it's always a string
          email: user.email || null,
          userName: user.userName || null,
          fullName: user.fullName || null,
          profilePic: user.profilePic || null,
          bio: user.bio || null,
          createdAt: user.createdAt || new Date().toISOString(),
          updatedAt: user.updatedAt || new Date().toISOString(),
        };
      },
    }),
  ],
} satisfies NextAuthConfig;
