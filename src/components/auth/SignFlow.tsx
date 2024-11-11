"use server";
import { auth } from "@/server/auth";
import { SignIn } from "./SignIn";
import Success from "./Success";

// TODO: how to solve signIn flow?
export default async function SignFlow() {
  const session = await auth();

  if (session) {
    //@ts-ignore
    const { email } = session.user;
    //@ts-ignore

    return <Success email={email} />;
  } else {
    return <SignIn />;
  }
}
