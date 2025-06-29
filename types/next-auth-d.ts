// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      phoneNumber: string;
    } & DefaultSession["user"];
  }

  interface User {
    phoneNumber: string;
  }
}

declare module "next-auth" {
  interface JWT {
    id: string;
    phoneNumber: string;
  }
}
