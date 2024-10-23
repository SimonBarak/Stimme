import { auth, signOut } from "@/server/auth";
import { Cross2Icon, ShadowIcon } from "@radix-ui/react-icons";
import * as Popover from "@radix-ui/react-popover";
import AccountBoard from "./auth/AccountBoard";
import Link from "next/link";
import CheckoutButton from "./CheckoutButton";

export default async function Authentication() {
  const session = await auth();
  const email = session?.user?.email ?? "";

  if (session) {
    return (
      <nav className="flex gap-6 items-center">
        <Popover.Root>
          <Popover.Trigger asChild>
            <button
              className="flex gap-1 cursor-pointer items-center"
              aria-label="Update dimensions"
            >
              <ShadowIcon />
              {session.user?.email}
            </button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content className="PopoverContent" sideOffset={5}>
              <p className="label text-sm mb-4"></p>
              <AccountBoard email={email} subscriptionType={"Beta tester"} />
              <Popover.Close className="PopoverClose" aria-label="Close">
                <Cross2Icon />
              </Popover.Close>
              <Popover.Arrow className="PopoverArrow" />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </nav>
    );
  }
  return (
    <>
      <Link href={"/pricing"}>Pricing</Link>
      <Link href={"/login"}>Sign in</Link>
      {/* <CheckoutButton /> */}
    </>
  );
}
