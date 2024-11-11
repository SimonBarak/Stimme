import { auth, signOut } from "@/server/auth";
import { Cross2Icon, AvatarIcon } from "@radix-ui/react-icons";
import * as Popover from "@radix-ui/react-popover";
import AccountBoard from "./AccountBoard";
import Link from "next/link";
import Image from "next/image";
import personIcon from "../../../public/img/person-circle.svg";

export default async function Authentication() {
  const session = await auth();
  const email = session?.user?.email ?? "";
  const subscription: SubscriptionType = "Free";
  //@ts-ignore
  const isPro = session?.user?.isPro;

  if (session) {
    return (
      <Popover.Root>
        <Popover.Trigger asChild>
          <button
            className="flex gap-4 cursor-pointer items-center"
            aria-label="Update dimensions"
          >
            <div className=" bg-black rounded-full px-4 py-1 text-white text-xs">
              {isPro ? "PRO" : "FREE"}
            </div>
            <Image priority src={personIcon} alt="user" width={20} />
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content className="PopoverContent" sideOffset={5}>
            <p className="label text-sm mb-4"></p>
            <AccountBoard email={email} subscriptionType={subscription} />
            <Popover.Close className="PopoverClose" aria-label="Close">
              <Cross2Icon />
            </Popover.Close>
            <Popover.Arrow className="PopoverArrow" />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
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
