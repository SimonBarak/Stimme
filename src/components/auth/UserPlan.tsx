import { auth, signOut } from "@/server/auth";
import { Cross2Icon, AvatarIcon } from "@radix-ui/react-icons";
import * as Popover from "@radix-ui/react-popover";

export default async function UserPlan() {
  const session = await auth();

  if (session) {
    return (
      <Popover.Root>
        <Popover.Trigger asChild>
          <button
            className="flex gap-1 cursor-pointer items-center"
            aria-label="Update dimensions"
          >
            HEllo
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content className="PopoverContent" sideOffset={5}>
            <p className="label text-sm mb-4"></p>
            <div className="-">Hi</div>
            <Popover.Close className="PopoverClose" aria-label="Close">
              <Cross2Icon />
            </Popover.Close>
            <Popover.Arrow className="PopoverArrow" />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    );
  }
}
