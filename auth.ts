import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";

import { prisma } from "@/lib/prisma";
import authConfig from "@/auth.config";

declare module "@auth/core/adapters" {
  interface AdapterUser {
    phoneNumber: string;
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter, // استفاده از آداپتور Prisma برای اتصال به دیتابیس
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt", // استفاده از JWT برای مدیریت سشن
  },
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.phoneNumber = user.phoneNumber;
      }
      return token;
    },
    async session({ session, token }) {
      // افزودن اطلاعات توکن به سشن کاربر
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.phoneNumber = token.phoneNumber as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login", // مسیر صفحه لاگین
  },
  ...authConfig,
});
