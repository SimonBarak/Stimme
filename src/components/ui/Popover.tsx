import React from "react";
import * as Popover from "@radix-ui/react-popover";
import {
  MixerHorizontalIcon,
  PlusIcon,
  Cross2Icon,
} from "@radix-ui/react-icons";
import PopoverBody from "./PopoverBody";

interface PopoverDemoProps {
  type: "create" | "update";
  children: React.ReactNode;
  // item?: MenuItem;
  // setItem: (item: MenuItem) => void;
  // fields: Field[];
}

const PopoverDemo: React.FC<PopoverDemoProps> = ({ children, type }) => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        {type === "create" ? (
          <button
            className="IconButton cursor-pointer settings"
            aria-label="Update dimensions"
          >
            <PlusIcon />
          </button>
        ) : (
          <button
            className="IconButton cursor-pointer settings"
            aria-label="Update dimensions"
          >
            <MixerHorizontalIcon />
          </button>
        )}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="PopoverContent" sideOffset={5}>
          <p className="label text-sm mb-4">
            {/* {type === "create" ? "Add item" : "Update item"} */}
          </p>
          {children}
          <Popover.Close className="PopoverClose" aria-label="Close">
            <Cross2Icon />
          </Popover.Close>
          <Popover.Arrow className="PopoverArrow" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default PopoverDemo;
