// types/next-auth.d.ts
import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      balance: number;
      address: string | null;
      role: string | null; 
    } & DefaultSession["user"];
  }

  interface User {
    id?: string;
    email?: string | null | undefined;
    firstName: string;
    lastName: string;
    balance: number;
    address: string | null;
    role: string | null; 
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    balance: number;
    address: string;
    role: string;
  }
}