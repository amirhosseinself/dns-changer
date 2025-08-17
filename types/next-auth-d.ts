// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { DefaultSession } from "next-auth";
import { Role } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      email?: string | null;
      role: Role;
    } & DefaultSession["user"];
  }

  interface User {
    id?: string;
    role: Role;
    email?: string | null;
    fullName?: string | null;
    profilePic?: string | null;
    createdAt: string;
    updatedAt: string;
  }
}

declare module "next-auth" {
  interface JWT {
    id?: string;
    email?: string | null;
    role: Role;
  }
}
