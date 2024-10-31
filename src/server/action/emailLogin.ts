"use server";

import { signIn } from "@/server/auth";

export default async function sendEmailLog(email: string) {
  const response = await signIn("resend", { email });
}
