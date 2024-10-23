"use server";
import { auth } from "@/server/auth";
import { SignIn } from "./SignIn";
import Success from "./Success";
// import Button from "../ui/Button";

export default async function SignFlow() {
  const session = await auth();
  const email = session?.user?.email ?? "";

  return <>{session ? <Success email={email} /> : <SignIn />}</>;
}
