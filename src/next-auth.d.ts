// next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  // Extend the default User type
  interface User {
    stripeCustomerId?: string;
    isPro?: boolean;
  }

  interface Session extends DefaultSession {
    user?: User;
  }
}
