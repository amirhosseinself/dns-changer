import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";

import { prisma } from "@/lib/prisma"; // ✅ Make sure you have this Prisma client

export default {
  providers: [
    Credentials({
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        // ✅ Basic validation
        if (!email || !password) {
          console.log("[auth.config.ts] Email or password is missing.");
          return null;
        }

        // ✅ Find user by email
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !user.password) {
          console.log("[auth.config.ts] User not found or has no password.");
          return null;
        }

        // ✅ Compare hashed password
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          console.log("[auth.config.ts] Invalid password.");
          return null;
        }

        // ✅ Return user object for session
        return {
          id: user.id,
          role: user.role || "USER",
          email: user.email,
          userName: user.userName || null,
          fullName: user.fullName || null,
          profilePic: user.profilePic || null,
          bio: user.bio || null,
          createdAt: user.createdAt.toISOString(),
          updatedAt: user.updatedAt.toISOString(),
        };
      },
    }),
    // ✅ Login as Guest
    Credentials({
      id: "guest",
      name: "Guest Login",
      credentials: {},
      async authorize() {
        // Create guest user in DB
        const randomID = randomUUID();
        const email = `guest_${randomID}@example.com`;
        const fullName = `Guest User ${randomID}`;
        const userName = `guest_${randomID}`;

        const guest = await prisma.user.create({
          data: {
            isGuest: true,
            email,
            userName,
            fullName,
            role: "GUEST",
          },
        });

        return {
          id: guest.id,
          role: guest.role,
          email: guest.email || "",
          userName: guest.userName || null,
          fullName: guest.fullName || null,
          profilePic: guest.profilePic || null,
          bio: guest.bio || null,
          createdAt: guest.createdAt.toISOString(),
          updatedAt: guest.updatedAt.toISOString(),
        };
      },
    }),
  ],
} satisfies NextAuthConfig;
